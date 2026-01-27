import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import Accordion from '../components/Accordion';
import { landingContent } from '../data/landingContent';

const LandingPage: React.FC = () => {
  const { hero, services, packages, portfolio, process, faq, contact } = landingContent;
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50 pt-16">
      <div className="fixed top-0 left-0 w-full z-50">
           <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-blue-600 focus:text-white z-[100]">
            Zum Inhalt springen
          </a>
      </div>
     
      <Navbar />

      <main id="main-content">
        {/* HERO SECTION */}
        <section id="hero" className="relative bg-white overflow-hidden py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">{hero.title}</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {hero.subtitle}
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    {hero.trust}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all"
                    >
                      {hero.ctaPrimary}
                    </a>
                    <a
                      href="#packages"
                      className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10 shadow-sm hover:shadow-md transition-all"
                    >
                      {hero.ctaSecondary}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden">
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                     <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                        alt="Team arbeitet am Projekt"
                        loading="eager"
                        decoding="async"
                      />
                     <div className="absolute bottom-0 bg-white/90 backdrop-blur p-6 w-full border-t border-slate-100">
                        <p className="font-bold text-slate-900 text-lg">Starten Sie Ihr Projekt</p>
                        <p className="text-slate-600 text-sm mt-1">Lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen.</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <Section id="services" bg="gray">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Unsere Leistungen
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              Maßgeschneiderte Lösungen für Ihren digitalen Erfolg.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                   {/* Simple Icon Placeholder */}
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* PACKAGES SECTION */}
        <Section id="packages" bg="white">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Transparente Preise
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              Wählen Sie das Paket, das zu Ihren Anforderungen passt.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`flex flex-col rounded-2xl shadow-lg overflow-hidden border ${pkg.isPopular ? 'border-blue-500 ring-4 ring-blue-50 relative' : 'border-slate-200'}`}>
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                    Beliebt
                  </div>
                )}
                <div className="p-8 bg-white flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">{pkg.name}</h3>
                  <div className="mt-4 flex items-baseline text-slate-900">
                    <span className="text-4xl font-extrabold tracking-tight">{pkg.price}</span>
                    {pkg.price.includes('€') && <span className="ml-1 text-xl font-semibold text-slate-500">/ einmalig</span>}
                  </div>
                  <ul className="mt-6 space-y-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-slate-500">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 bg-slate-50 border-t border-slate-100">
                  <a
                    href="#contact"
                    className={`w-full block text-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors ${pkg.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'}`}
                  >
                    Jetzt anfragen
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PORTFOLIO SECTION */}
        <Section id="portfolio" bg="gray">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ausgewählte Projekte
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              Ein Einblick in unsere bisherigen Arbeiten.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project) => (
              <div key={project.id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-slate-800 shadow-sm backdrop-blur">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4 flex-1">{project.description}</p>
                  <a href="#" className="hidden text-blue-600 font-medium hover:text-blue-800 md:inline-flex items-center mt-auto">
                    Details ansehen
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

         {/* PROCESS SECTION */}
         <Section id="process" bg="white">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Der Projektablauf
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              In wenigen Schritten zu Ihrer neuen Website.
            </p>
          </div>
          <div className="relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step) => (
                <div key={step.step} className="relative z-10 bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ring-4 ring-white shadow-md">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ SECTION */}
        <Section id="faq" bg="gray">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Häufige Fragen
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              Alles was Sie wissen müssen, bevor wir starten.
            </p>
          </div>
          <Accordion items={faq} />
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" bg="white">
          <div className="max-w-4xl mx-auto bg-blue-600 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
             <div className="md:w-1/2 p-10 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Kontaktieren Sie uns</h3>
                  <p className="text-blue-100 mb-8">Bereit für Ihr nächstes Projekt? Füllen Sie einfach das Formular aus und wir melden uns zeitnah bei Ihnen.</p>
                  
                  <div className="space-y-4 text-blue-50">
                     <p className="flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{contact.address}</span>
                     </p>
                     <p className="flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <span>{contact.email}</span>
                     </p>
                      <p className="flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <span>{contact.phone}</span>
                     </p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-blue-500/50 text-sm text-blue-200">
                    <p>{contact.legal}</p>
                </div>
             </div>

             <div className="md:w-1/2 p-10 bg-slate-50">
               {formStatus === 'success' ? (
                 <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-2">Vielen Dank!</h4>
                    <p className="text-slate-600">Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.</p>
                    <button onClick={() => setFormStatus('idle')} className="mt-6 text-blue-600 font-medium hover:underline">Neue Nachricht senden</button>
                 </div>
               ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                      placeholder="Ihr Name"
                    />
                  </div>
                   <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-Mail</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                      placeholder="name@beispiel.de"
                    />
                  </div>
                   <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Nachricht</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                      placeholder="Wie können wir Ihnen helfen?"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed transition-colors"
                    >
                      {formStatus === 'submitting' ? 'Sende...' : 'Nachricht senden'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                     Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu.
                  </p>
                </form>
               )}
             </div>
          </div>
        </Section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
               <h4 className="text-white text-lg font-bold mb-4">WebDesign<span className="text-blue-500">Pro</span></h4>
               <p className="text-sm">Wir erstellen professionelle Websites für Ihren Geschäftserfolg.</p>
            </div>
            <div>
               <h4 className="text-white text-lg font-bold mb-4">Rechtliches</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
               </ul>
            </div>
             <div>
               <h4 className="text-white text-lg font-bold mb-4">Social</h4>
               <div className="flex justify-center md:justify-start space-x-4">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                     <span className="sr-only">LinkedIn</span>
                     <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                   <a href="#" className="text-slate-400 hover:text-white transition-colors">
                     <span className="sr-only">Instagram</span>
                     <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
               </div>
            </div>
         </div>
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} WebDesignPro. Alle Rechte vorbehalten.
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
