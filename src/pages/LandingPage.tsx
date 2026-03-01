import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import Accordion from '../components/Accordion';
import { landingContent } from '../data/landingContent';

const LandingPage: React.FC = () => {
  const GA_MEASUREMENT_ID = 'G-PERKG76JWQ';
  const { services, packages, process, faq, portfolio } = landingContent;
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [legalModal, setLegalModal] = useState<'impressum' | 'datenschutz' | null>(null);
  const [consentStatus, setConsentStatus] = useState<'unknown' | 'accepted' | 'declined'>('unknown');
  const projectHighlights = portfolio.slice(0, 3);

  const heroIntroText = 'IHR PARTNER FÜR PROFESSIONELLES WEBDESIGN';
  const heroReceiveTitle = 'WAS SIE ERHALTEN:';
  const heroReceiveItems = ['MEHR KUNDEN', 'SICHTBARKEIT', 'MEHR KONTROLLE', 'MEHR ANFRAGEN', 'MEHR VERTRAUEN', 'UMFASSENDES CMS', 'MEHR ERFOLG'];

  const legalInfo = {
    brand: 'Mein Auftritt Online',
    providerName: 'Heiko Scheffler',
    addressLines: ['Wilhelm-Leuschner-Straße 16', '35440 Linden', 'Deutschland'],
    email: 'kontakt@meinauftrittonline.de',
    phone: '',
    vatId: '',
    register: '',
    responsibleContent: 'Heiko Scheffler',
    responsibleContentAddressLines: ['Wilhelm-Leuschner-Straße 16', '35440 Linden', 'Deutschland'],
    lastUpdated: 'Februar 2026',
  };

  const [heroPhase, setHeroPhase] = useState<'intro' | 'receiveTitle' | 'receive'>('intro');
  const [heroDirection, setHeroDirection] = useState<'typing' | 'deleting'>('typing');
  const [heroCharIndex, setHeroCharIndex] = useState(0);
  const [heroItemIndex, setHeroItemIndex] = useState(0);
  const [heroHoldBeforeReceive, setHeroHoldBeforeReceive] = useState(false);
  const [heroHoldBeforeIntro, setHeroHoldBeforeIntro] = useState(false);

  const loadGtag = () => {
    if (document.getElementById('ga-gtag')) {
      console.log('[GA] Script already loaded');
      return;
    }

    console.log('[GA] Loading gtag script...');
    const script = document.createElement('script');
    script.id = 'ga-gtag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => console.log('[GA] gtag.js loaded successfully');
    script.onerror = () => console.error('[GA] FAILED to load gtag.js – blocked by adblocker?');
    document.head.appendChild(script);

    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    win.gtag = function() { win.dataLayer.push(arguments); };
    win.gtag('js', new Date());
    win.gtag('config', GA_MEASUREMENT_ID);
    console.log('[GA] Config sent for', GA_MEASUREMENT_ID);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem('cookieConsent');
    if (stored === 'accepted' || stored === 'declined') {
      setConsentStatus(stored);
      if (stored === 'accepted') {
        loadGtag();
      } else {
        (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      }
      return;
    }

    (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  }, []);

  useEffect(() => {
    if (!heroHoldBeforeReceive) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHeroPhase('receiveTitle');
      setHeroDirection('typing');
      setHeroCharIndex(0);
      setHeroHoldBeforeReceive(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [heroHoldBeforeReceive]);

  useEffect(() => {
    if (!heroHoldBeforeIntro) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHeroPhase('receiveTitle');
      setHeroDirection('typing');
      setHeroCharIndex(0);
      setHeroHoldBeforeIntro(false);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [heroHoldBeforeIntro]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    if (heroHoldBeforeReceive || heroHoldBeforeIntro) {
      return;
    }

    const typingSpeedMs = 30;
    const deletingSpeedMs = 18;
    const pauseAfterFullMs = 1800;

    const targetText = heroPhase === 'intro'
      ? heroIntroText
      : heroPhase === 'receiveTitle'
        ? heroReceiveTitle
        : (heroReceiveItems[heroItemIndex] ?? '');
    const isAtEnd = heroCharIndex >= targetText.length;
    const isAtStart = heroCharIndex <= 0;

    const timeoutId = window.setTimeout(
      () => {
        if (heroDirection === 'typing') {
          if (!isAtEnd) {
            setHeroCharIndex((prev) => prev + 1);
            return;
          }
          if (heroPhase === 'receiveTitle') {
            // Title fully typed, move to items
            setHeroPhase('receive');
            setHeroItemIndex(0);
            setHeroDirection('typing');
            setHeroCharIndex(0);
            return;
          }
          setHeroDirection('deleting');
          return;
        }

        if (heroDirection === 'deleting') {
          if (!isAtStart) {
            setHeroCharIndex((prev) => prev - 1);
            return;
          }

          if (heroPhase === 'intro') {
            setHeroHoldBeforeReceive(true);
            return;
          }

          const nextIndex = heroItemIndex + 1;
          if (nextIndex < heroReceiveItems.length) {
            setHeroItemIndex(nextIndex);
            setHeroDirection('typing');
            return;
          }

          // Loop back to first item (title stays visible)
          setHeroItemIndex(0);
          setHeroDirection('typing');
        }
      },
      heroDirection === 'typing'
        ? (isAtEnd ? (heroPhase === 'receiveTitle' ? 40 : pauseAfterFullMs) : typingSpeedMs)
        : (isAtStart ? 0 : deletingSpeedMs)
    );

    return () => window.clearTimeout(timeoutId);
  }, [heroCharIndex, heroDirection, heroItemIndex, heroPhase]);


  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormStatus('submitting');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const payload = {
        name: (formData.get('name') ?? '').toString(),
        email: (formData.get('email') ?? '').toString(),
        package: (formData.get('package') ?? '').toString(),
        message: (formData.get('message') ?? '').toString(),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setFormStatus('idle');
        setFormError('Senden fehlgeschlagen. Bitte versuchen Sie es erneut.');
        return;
      }

      setFormStatus('success');
      form.reset();
    } catch {
      setFormStatus('idle');
      setFormError('Senden fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-100 bg-slate-950 pt-16">
      <div className="fixed top-0 left-0 w-full z-50">
           <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-blue-600 focus:text-white z-[100]">
            Zum Inhalt springen
          </a>
      </div>
     
      <Navbar />

      <main id="main-content">
        {/* HERO SECTION */}
        <section id="hero" className="relative bg-slate-950 overflow-hidden py-20 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="min-w-0 w-full sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left page-load">
                <h1 className="w-full text-4xl tracking-tight font-extrabold text-slate-100 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-tight h-[8.5rem] sm:h-[11.5rem] md:h-[14rem] lg:h-[11.5rem] xl:h-[14rem] overflow-hidden flex flex-col justify-center page-load-item">
                  <span className="block w-full">
                    {heroPhase === 'intro'
                      ? heroIntroText.slice(0, Math.min(heroCharIndex, 'IHR PARTNER FÜR'.length))
                      : heroPhase === 'receiveTitle'
                        ? heroReceiveTitle.slice(0, heroCharIndex)
                        : heroReceiveTitle}
                  </span>
                  <span className="block w-full break-words h-[5.75rem] sm:h-[7.5rem] md:h-[9.5rem] lg:h-[7.5rem] xl:h-[9.5rem]">
                    {heroPhase === 'intro'
                      ? (heroCharIndex > 'IHR PARTNER FÜR'.length + 1
                        ? heroIntroText.slice('IHR PARTNER FÜR'.length + 1, heroCharIndex)
                        : '\u00A0')
                      : heroPhase === 'receiveTitle'
                        ? '\u00A0'
                        : ((heroReceiveItems[heroItemIndex] ?? '').slice(0, heroCharIndex) || '\u00A0')}
                  </span>
                </h1>
                <p className="mt-3 text-base text-slate-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 page-load-item">
                  Wir erstellen moderne, leistungsstarke Websites, die Ihr Unternehmen voranbringen. Maßgeschneidert, schnell und effektiv.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 page-load-item">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Starten Sie noch heute Ihr Projekt!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all transition-transform hover:scale-[1.05] will-change-transform glow-button glow-button-always glow-button-strong"
                    >
                      Projekt anfragen
                    </a>
                    <a
                      href="#packages"
                      className="inline-flex items-center justify-center px-8 py-3 border border-slate-700 text-base font-medium rounded-md text-slate-100 bg-slate-900/70 hover:bg-slate-900 md:py-4 md:text-lg md:px-10 shadow-sm hover:shadow-md transition-all transition-transform hover:scale-[1.05] will-change-transform"
                    >
                      Pakete ansehen
                    </a>
                  </div>
                </div>
              </div>
              <div className="min-w-0 w-full mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center page-load">
                <div className="relative mx-auto w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-lg glow-panel transition-transform duration-300 hover:scale-[1.03] will-change-transform page-load-item">
                  <p className="text-sm uppercase tracking-wider text-slate-400">Vertrauen</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Warum Kunden uns wählen</h3>
                  <ul className="mt-6 space-y-4">
                    {[
                      'DSGVO-konforme Umsetzung',
                      'Responsives Design auf allen Geräten',
                      'Schnelle Ladezeiten & Performance',
                      'Klarer Prozess & transparente Updates',
                      'Zuverlässig'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white">
                        <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <Section id="about" bg="white">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-wider text-slate-400">About</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-100 sm:text-4xl wipe-text">
                Wer wir sind und warum wir die Richtigen sind
              </h2>
              <p className="mt-5 text-base sm:text-lg text-slate-300">
                Wir sind ein kleines, fokussiertes Team aus Design und Entwicklung. Unser Ziel: Websites, die
                nicht nur gut aussehen, sondern messbar mehr Anfragen bringen.
              </p>
              <p className="mt-4 text-base text-slate-300">
                Wir arbeiten strukturiert, transparent und mit schnellen Abstimmungswegen. So entsteht ein
                professioneller Auftritt, der Ihre Marke klar positioniert und Vertrauen aufbaut.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 stagger-reveal">
                {[
                  { title: 'Klare Strategie', body: 'Wir planen Inhalte und Struktur entlang Ihrer Ziele.' },
                  { title: 'Modernes Design', body: 'Frisch, hochwertig und passend zu Ihrer Marke.' },
                  { title: 'Schnelle Umsetzung', body: 'Kurze Wege, klare Timelines, zügige Lieferung.' },
                  { title: 'Messbare Ergebnisse', body: 'Fokus auf Leads, Vertrauen und Sichtbarkeit.' }
                ].map((item) => (
                  <div key={item.title} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm glow-card transition-transform duration-300 hover:scale-[1.04] will-change-transform">
                    <h3 className="text-base font-semibold text-slate-100">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
<div className="grid grid-cols-2 gap-3 sm:gap-6 stagger-reveal"> {[ { value: '7–14 Tage', label: 'Typische Projektlaufzeit' }, { value: '100%', label: 'Mobil optimiert' }, { value: 'Kontakt', label: 'Direkter Ansprechpartner per E-Mail' }, { value: 'Zuverlässig', label: 'Klarer Prozess & Abstimmung' } ].map((stat) => ( <div key={stat.value} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 text-center shadow-sm glow-card transition-transform duration-300 hover:scale-[1.04] will-change-transform">
                  <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                  <div className="mt-2 text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
              <div className="col-span-2 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 p-4 sm:p-6 shadow-sm glow-panel transition-transform duration-300 hover:scale-[1.04] will-change-transform">
                <h3 className="text-lg font-semibold text-slate-100">Ihr Auftritt mit Substanz</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Wir verbinden klare Botschaften mit sauberer Technik. So entsteht eine Website, die Vertrauen
                  schafft und Ihre Kunden genau dort abholt, wo sie gerade stehen.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-wider text-slate-400">
                  <span className="rounded-full border border-slate-700 px-3 py-1">Beratung</span>
                  <span className="rounded-full border border-slate-700 px-3 py-1">Design</span>
                  <span className="rounded-full border border-slate-700 px-3 py-1">Entwicklung</span>
                  <span className="rounded-full border border-slate-700 px-3 py-1">Launch</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SERVICES SECTION */}
        <Section id="services" bg="gray">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl wipe-text">
              Unsere Leistungen
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-xl text-slate-300 mx-auto">
              Maßgeschneiderte Lösungen für Ihren digitalen Erfolg.
            </p>
          </div>
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto stagger-reveal"> {services.map((service) => ( <a key={service.id} href="#packages" className="bg-slate-900/60 rounded-xl shadow-sm hover:shadow-md transition-shadow transition-transform duration-300 hover:scale-[1.05] will-change-transform p-4 sm:p-6 border border-slate-800 glow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950" > <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-300 glow-icon">
                   {/* Simple Icon Placeholder */}
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-100 mb-2">{service.title}</h3>
                <p className="text-slate-300 text-base">{service.description}</p>
              </a>
            ))}
          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects" bg="white">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl wipe-text">
              Beispiele
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-xl text-slate-300 mx-auto">
              Wie Ihre Website aussehen könnte.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 stagger-reveal">
            {projectHighlights.map((project) => (
              <a
                key={project.id}
                href={project.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 shadow-sm hover:shadow-lg transition-all transition-transform duration-300 hover:scale-[1.10] will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 glow-card"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs uppercase tracking-wider bg-slate-950/80 text-slate-100 px-3 py-1 rounded-full border border-slate-700">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{project.title}</h3>
                  <p className="text-slate-300 text-sm">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </Section>

        {/* PACKAGES SECTION */}
        <Section id="packages" bg="white">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl wipe-text">
              Transparente Preise
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-xl text-slate-300 mx-auto">
              Wählen Sie das Paket, das zu Ihren Anforderungen passt.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-5xl mx-auto stagger-reveal">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`flex flex-col rounded-2xl shadow-lg overflow-hidden border transition-transform duration-300 hover:scale-[1.08] will-change-transform ${pkg.isPopular ? 'border-blue-500 ring-4 ring-blue-500/20 relative glow-card-strong' : ''} ${pkg.id === 'premium' ? 'border-amber-300 ring-4 ring-amber-300/20 relative glow-card-gold' : 'border-slate-800'}`}>
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                    Beliebt
                  </div>
                )}
                {pkg.id === 'premium' && (
                  <div className="absolute top-0 right-0 bg-amber-300/90 text-amber-950 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                    Maximaler Umfang
                  </div>
                )}
                <div className="p-6 sm:p-8 bg-slate-900/70 flex-1">
                  <h3 className="text-xl font-semibold text-slate-100">{pkg.name}</h3>
                  <div className="mt-4 flex items-baseline text-slate-100">
                    <span className="text-4xl font-extrabold tracking-tight">{pkg.price}</span>
                    {pkg.price.includes('€') && <span className="ml-1 text-xl font-semibold text-slate-400">/ einmalig</span>}
                  </div>
                  <ul className="mt-6 space-y-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-slate-300">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 sm:p-8 bg-slate-900/80 border-t border-slate-800">
                  <a
                    href="#contact"
                    className={`w-full block text-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium transition-colors glow-button ${pkg.id === 'starter' ? 'glow-button-gray' : pkg.id === 'premium' ? 'glow-button-gold' : ''} ${pkg.id === 'premium' ? 'bg-amber-300 text-amber-950 hover:bg-amber-200' : pkg.isPopular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                  >
                    Jetzt anfragen
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

         {/* PROCESS SECTION */}
        <Section id="process" bg="white">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl wipe-text">
              Der Projektablauf
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-xl text-slate-300 mx-auto">
              In wenigen Schritten zu Ihrer neuen Website.
            </p>
          </div>
          <div className="relative">
            <div className="process-arrow-wrap hidden lg:block">
              <div className="process-arrow-line" />
              <div className="process-arrow-head" />
            </div>

            <div className="space-y-10 stagger-reveal">
              {process.map((step, index) => (
                <div
                  key={step.step}
                  className={`relative z-10 bg-slate-900/70 p-4 sm:p-6 rounded-xl border border-slate-800 shadow-sm text-center glow-card transition-transform duration-300 hover:scale-[1.05] will-change-transform lg:w-[46%] ${index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}`}
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ring-4 ring-slate-950 shadow-md glow-icon">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm">{step.description}</p>
                  <a
                    href={`/projektablauf/${step.slug}`}
                    className="mt-6 inline-flex items-center justify-center text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    Mehr erfahren
                    <svg
                      className="ml-2 h-4 w-4 text-sky-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ SECTION */}
        <Section id="faq" bg="gray">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl wipe-text">
              Häufige Fragen
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-xl text-slate-300 mx-auto">
              Alles was Sie wissen müssen, bevor wir starten.
            </p>
          </div>
          <Accordion items={faq} />
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" bg="white">
          <div className="max-w-4xl mx-auto bg-blue-600 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row glow-panel transition-transform duration-300 hover:scale-[1.03] will-change-transform stagger-reveal">
             <div className="md:w-1/2 p-6 sm:p-10 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Kontaktieren Sie uns</h3>
                  <p className="text-blue-100 mb-8">Bereit für Ihr nächstes Projekt? Füllen Sie einfach das Formular aus und wir melden uns zeitnah bei Ihnen.</p>
                  
                  <div className="space-y-4 text-blue-50">
                     <p className="flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <span>kontakt@meinauftrittonline.de</span>
                     </p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-blue-500/50 text-sm text-blue-200">
                    <p>Wir verarbeiten Ihre Daten gemäß unserer Datenschutzerklärung.</p>
                </div>
             </div>

             <div className="md:w-1/2 p-6 sm:p-10 bg-slate-900/70">
               {formStatus === 'success' ? (
                 <div className="h-full flex flex-col items-center justify-center text-center">
                     <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mb-4 glow-icon">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-100 mb-2">Vielen Dank!</h4>
                    <p className="text-slate-300">Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.</p>
                    <button onClick={() => { setFormStatus('idle'); setFormError(null); }} className="mt-6 text-sky-400 font-medium hover:underline">Neue Nachricht senden</button>
                 </div>
               ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm p-3 border glow-input"
                      placeholder="Ihr Name"
                    />
                  </div>
                   <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200">E-Mail</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm p-3 border glow-input"
                      placeholder="name@beispiel.de"
                    />
                  </div>
                   <div>
                    <label htmlFor="package" className="block text-sm font-medium text-slate-200">Gewünschtes Paket</label>
                    <select
                      id="package"
                      name="package"
                      required
                      className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-100 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm p-3 border glow-input"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="starter">Starter</option>
                      <option value="business">Business</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                   <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-200">Nachricht</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm p-3 border glow-input"
                      placeholder="Wie können wir Ihnen helfen?"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-sky-400 disabled:opacity-75 disabled:cursor-not-allowed transition-colors glow-button"
                    >
                      {formStatus === 'submitting' ? 'Sende...' : 'Nachricht senden'}
                    </button>
                  </div>
                  {formError ? (
                    <p className="text-xs text-rose-300 text-center">{formError}</p>
                  ) : null}
                  <p className="text-xs text-slate-400 mt-4 text-center">
                     Mit dem Absenden werden Ihre Angaben zur Bearbeitung Ihrer Anfrage verarbeitet. Details finden Sie in der Datenschutzerklärung.
                  </p>
                </form>
               )}
             </div>
          </div>
        </Section>
      </main>

      <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row lg:flex-col items-center md:items-start md:space-x-6 lg:space-x-0">
               <img src="/MeinAuftrittOnline.png" alt="Logo" className="w-24 h-24 object-contain rounded border border-slate-600 bg-slate-800 flex-shrink-0 mb-4 md:mb-0 lg:mb-4" />
               <div>
                  <h4 className="text-white text-lg font-bold mb-4">Mein Auftritt <span className="text-sky-400">Online</span></h4>
                  <p className="text-sm">Wir erstellen professionelle Websites für Ihren Geschäftserfolg.</p>
               </div>
            </div>
            <div>
               <h4 className="text-white text-lg font-bold mb-4">Rechtliches</h4>
               <ul className="space-y-2 text-sm">
                  <li><button onClick={() => setLegalModal('impressum')} className="hover:text-white transition-colors">Impressum</button></li>
                  <li><button onClick={() => setLegalModal('datenschutz')} className="hover:text-white transition-colors">Datenschutz</button></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white text-lg font-bold mb-4">Kontakt</h4>
               <ul className="space-y-2 text-sm">
                  <li>
                    <a href="mailto:kontakt@meinauftrittonline.de" className="hover:text-white transition-colors">
                      kontakt@meinauftrittonline.de
                     </a>
                  </li>
               </ul>
            </div>
            <div>
               <h4 className="text-white text-lg font-bold mb-4">Navigation</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#hero" className="hover:text-white transition-colors">Start</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#services" className="hover:text-white transition-colors">Leistungen</a></li>
                  <li><a href="#projects" className="hover:text-white transition-colors">Beispiele</a></li>
                  <li><a href="#packages" className="hover:text-white transition-colors">Preise</a></li>
                  <li><a href="#process" className="hover:text-white transition-colors">Ablauf</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">Kontakt</a></li>
               </ul>
               <div className="mt-6 flex justify-center md:justify-start">
                 <a
                   href="https://www.instagram.com/meinauftrittonline/"
                   target="_blank"
                   rel="noreferrer"
                   aria-label="Instagram"
                   className="inline-flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                 >
                   <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                     <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Zm3.2 1.1c-.1-1.2-.4-2.3-1.3-3.2-.9-.9-2-1.2-3.2-1.3-1.3-.1-5.3-.1-6.6 0-1.2.1-2.3.4-3.2 1.3-.9.9-1.2 2-1.3 3.2-.1 1.3-.1 5.3 0 6.6.1 1.2.4 2.3 1.3 3.2.9.9 2 1.2 3.2 1.3 1.3.1 5.3.1 6.6 0 1.2-.1 2.3-.4 3.2-1.3.9-.9 1.2-2 1.3-3.2.1-1.3.1-5.3 0-6.6Zm-1.9 8c-.3.7-.9 1.3-1.6 1.6-1.1.4-3.6.3-4.8.3s-3.7.1-4.8-.3c-.7-.3-1.3-.9-1.6-1.6-.4-1.1-.3-3.6-.3-4.8s-.1-3.7.3-4.8c.3-.7.9-1.3 1.6-1.6 1.1-.4 3.6-.3 4.8-.3s3.7-.1 4.8.3c.7.3 1.3.9 1.6 1.6.4 1.1.3 3.6.3 4.8s.1 3.7-.3 4.8Z" />
                   </svg>
                 </a>
               </div>
            </div>
         </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} Mein Auftritt Online. Alle Rechte vorbehalten.
         </div>
      </footer>

      {/* Legal Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setLegalModal(null)}>
          <div className="bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-100">{legalModal === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}</h2>
              <button onClick={() => setLegalModal(null)} className="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
            </div>
            <div className="px-6 py-6">
              {legalModal === 'impressum' ? (
                <div className="space-y-6 text-slate-200">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Angaben gemäß § 5 DDG</h3>
                    <p className="text-sm">
                      <span className="font-semibold">{legalInfo.providerName}</span>
                      <br />
                      {legalInfo.addressLines.map((line) => (
                        <React.Fragment key={line}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Kontakt</h3>
                    <p className="text-sm">
                      E-Mail: <a className="text-sky-300 hover:text-sky-200 underline" href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a>
                      {legalInfo.phone ? (
                        <>
                          <br />Telefon: <span className="font-semibold">{legalInfo.phone}</span>
                        </>
                      ) : null}
                    </p>
                  </div>

                  {(legalInfo.vatId || legalInfo.register) && (
                    <div>
                      <h3 className="font-bold text-lg mb-2">Weitere Angaben</h3>
                      <p className="text-sm">
                        {legalInfo.vatId ? (
                          <>
                            USt-IdNr.: <span className="font-semibold">{legalInfo.vatId}</span>
                            <br />
                          </>
                        ) : null}
                        {legalInfo.register ? (
                          <>Register: <span className="font-semibold">{legalInfo.register}</span></>
                        ) : null}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-lg mb-2">Verantwortlich für Inhalte</h3>
                    <p className="text-sm">
                      Verantwortlich i.S.d. § 18 Abs. 2 MStV:
                      <br />
                      <span className="font-semibold">{legalInfo.responsibleContent}</span>
                      <br />
                      {legalInfo.responsibleContentAddressLines.map((line) => (
                        <React.Fragment key={line}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Streitbeilegung</h3>
                    <p className="text-sm">
                      Die Europäische Online-Streitbeilegungsplattform (OS) wurde zum 20. Juli 2025 eingestellt.
                      Informationen zur Verbraucherstreitbeilegung in der EU finden Sie unter:
                      <br />
                      <a className="text-sky-300 hover:text-sky-200 underline" href="https://consumer-redress.ec.europa.eu/" target="_blank" rel="noreferrer">https://consumer-redress.ec.europa.eu/</a>
                      <br />
                      Wir sind nicht verpflichtet und in der Regel nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Haftung für Inhalte</h3>
                    <p className="text-sm">
                      Wir sind für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                      Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-slate-200">
                  <div>
                    <h3 className="font-bold text-lg mb-2">1. Verantwortlicher</h3>
                    <p className="text-sm">
                      Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                      <br />
                      <span className="font-semibold">{legalInfo.providerName}</span>
                      <br />
                      {legalInfo.addressLines.map((line) => (
                        <React.Fragment key={line}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                      E-Mail: <a className="text-sky-300 hover:text-sky-200 underline" href={`mailto:${legalInfo.email}`}>{legalInfo.email}</a>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">2. Allgemeine Hinweise</h3>
                    <p className="text-sm">
                      Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                      Wir verarbeiten personenbezogene Daten nur, soweit dies erforderlich ist (z.B. zur Bereitstellung der Website oder zur Bearbeitung von Anfragen).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">3. Hosting & Server-Logfiles</h3>
                    <p className="text-sm">
                      Diese Website wird über Vercel bereitgestellt. Beim Aufruf der Website werden durch den Hostinganbieter bzw. den Webserver automatisch Informationen in sogenannten Server-Logfiles erhoben.
                      Das können u.a. sein: IP-Adresse (ggf. gekürzt), Datum/Uhrzeit, aufgerufene Seite, Referrer-URL, Browser/OS, und Statuscodes.
                    </p>
                    <p className="text-sm mt-2">
                      Zweck: Sicherer Betrieb, Fehleranalyse und Schutz vor Missbrauch.
                      Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                      Speicherdauer: Wir nutzen Logdaten nur, soweit erforderlich. Die Aufbewahrung erfolgt je nach Hostinganbieter/Service typischerweise für einen begrenzten Zeitraum (z.B. bis zu 30 Tage).
                    </p>
                    <p className="text-sm mt-2">
                      Empfänger/Dienstleister: Vercel (Hosting). Es kann dabei zu einer Verarbeitung in Ländern außerhalb der EU/des EWR kommen. In diesem Fall erfolgt die Übermittlung auf Grundlage geeigneter Garantien (z.B. Standardvertragsklauseln), soweit erforderlich.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">4. Kontaktaufnahme (E-Mail / Formular)</h3>
                    <p className="text-sm">
                      Wenn Sie uns kontaktieren, verarbeiten wir Ihre Angaben (z.B. Name, E-Mail, gewünschtes Paket, Nachricht), um Ihre Anfrage zu bearbeiten und zu beantworten.
                      Rechtsgrundlage ist in der Regel Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen/Vertrag) oder Art. 6 Abs. 1 lit. f DSGVO (allgemeine Kommunikation).
                    </p>
                    <p className="text-sm mt-2">
                      Speicherdauer: Kontaktanfragen ohne anschließenden Auftrag löschen wir in der Regel spätestens nach 6 Monaten.
                      Kommt es zu einem Auftrag, speichern wir relevante Kommunikation und Unterlagen so lange, wie dies für die Vertragsdurchführung erforderlich ist und solange gesetzliche Aufbewahrungspflichten bestehen (z.B. für Rechnungs- und Buchhaltungsunterlagen).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">5. E-Mail Versanddienst (Resend)</h3>
                    <p className="text-sm">
                      Für den Versand von Kontaktanfragen per E-Mail nutzen wir den Versanddienst Resend. Dabei werden die von Ihnen im Formular angegebenen Inhalte (z.B. Name, E-Mail-Adresse, Paket, Nachricht) an Resend übermittelt, um die E-Mail technisch zustellen zu können.
                    </p>
                    <p className="text-sm mt-2">
                      Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (effiziente Bearbeitung von Anfragen).
                      Speicherdauer: Wir verarbeiten die Inhalte zur Zustellung/Abwicklung der Anfrage. Die technische Protokollierung/Speicherung beim Dienstanbieter erfolgt entsprechend dessen Erforderlichkeit und Konfiguration.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">6. Datenbank/Backend (Supabase)</h3>
                    <p className="text-sm">
                      Auf dieser Website verwenden wir Supabase nicht. Supabase kann jedoch bei Kundenprojekten eingesetzt werden, um Daten der jeweiligen Kunden-Website zu speichern (z.B. Kontaktanfragen, Inhalte, Nutzer- oder Projektinformationen).
                    </p>
                    <p className="text-sm mt-2">
                      Wenn Supabase in einem Kundenprojekt eingesetzt wird, gelten die dortige Datenschutzerklaerung, Rechtsgrundlage und Speicherdauer des jeweiligen Website-Betreibers.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">7. Google Analytics</h3>
                    <p className="text-sm">
                      Wir nutzen Google Analytics, um die Nutzung unserer Website auszuwerten und Inhalte zu verbessern.
                      Die Verarbeitung erfolgt nur nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO i.V.m. § 25 Abs. 1 TDDDG).
                      Anbieter: Google Ireland Limited. Eine Uebermittlung in Drittländer (z.B. USA) kann nicht ausgeschlossen werden.
                      Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den Browser-Speicher löschen; beim nächsten Besuch erscheint das Banner erneut.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">8. Cookies</h3>
                    <p className="text-sm">
                      Wir setzen technisch notwendige Cookies ein. Analyse-Cookies werden nur nach Ihrer Einwilligung gesetzt.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">9. Ihre Rechte</h3>
                    <p className="text-sm">
                      Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten.
                      Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">10. Stand</h3>
                    <p className="text-sm">{legalInfo.lastUpdated}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {consentStatus === 'unknown' ? (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-950/95 p-4 sm:p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-200">
                Wir nutzen Cookies, um die Website zu verbessern und Google Analytics zu verwenden. Sie können zustimmen oder ablehnen.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  onClick={() => {
                    window.localStorage.setItem('cookieConsent', 'declined');
                    setConsentStatus('declined');
                    (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
                  }}
                  className="px-4 py-2 text-sm font-semibold text-slate-200 border border-slate-700 rounded-md hover:bg-slate-900 transition-colors"
                >
                  Ablehnen
                </button>
                <button
                  onClick={() => {
                    window.localStorage.setItem('cookieConsent', 'accepted');
                    setConsentStatus('accepted');
                    (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
                    loadGtag();
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
                >
                  Akzeptieren
                </button>
                <button
                  onClick={() => setLegalModal('datenschutz')}
                  className="px-4 py-2 text-sm font-semibold text-sky-300 border border-sky-400/60 rounded-md hover:bg-slate-900 transition-colors"
                >
                  Mehr erfahren
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LandingPage;
