import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';

const ProductsPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleGuideSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormStatus('submitting');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const payload = {
        name: (formData.get('name') ?? '').toString(),
        email: (formData.get('email') ?? '').toString(),
      };

      const response = await fetch('/api/guide', {
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
      <Navbar />
      <main>
        {/* Hero header */}
        <section className="relative bg-slate-950 overflow-hidden py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center page-load">
              <p className="text-sm uppercase tracking-wider text-slate-400 page-load-item">Ressourcen</p>
              <h1 className="mt-2 text-4xl font-extrabold text-slate-100 sm:text-5xl page-load-item">Unsere Produkte</h1>
              <p className="mt-4 text-lg text-slate-300 page-load-item">Kostenlose Guides und Ressourcen für Ihren Online-Erfolg.</p>
              <div className="mt-6 flex items-center justify-center gap-4 page-load-item">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-2 border border-slate-700 text-sm font-semibold rounded-md text-slate-100 bg-slate-900/70 hover:bg-slate-900 transition-colors transition-transform hover:scale-[1.06] shadow-sm hover:shadow-md glow-button"
                >
                  Zurück zur Startseite
                </Link>
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors transition-transform hover:scale-[1.06] glow-button"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Guide Product */}
        <Section id="guide-product" bg="gray">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start stagger-reveal">
            {/* Product info + image */}
            <div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-lg glow-card transition-transform duration-300 hover:scale-[1.03] will-change-transform">
                <img
                  src="/keintext.png"
                  alt="Guide Produkt"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-6">
                  <span className="inline-block text-xs uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full mb-3">Kostenlos</span>
                  <h2 className="text-2xl font-bold text-slate-100">Der Website-Blueprint für kleine und mittelständische Unternehmen</h2>
                  <p className="mt-3 text-slate-300">
                    Lernen Sie die wichtigsten Grundlagen für eine erfolgreiche Unternehmenswebsite und wie Sie mehr Kunden über Ihre Website gewinnen.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-lg glow-panel">
              <h3 className="text-xl font-bold text-slate-100 mb-2">Guide kostenlos erhalten</h3>
              <p className="text-slate-300 text-sm mb-6">
                Tragen Sie Ihren Namen und Ihre E-Mail-Adresse ein, um den Guide kostenlos zu erhalten.
              </p>

              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mb-4 mx-auto glow-icon">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-100 mb-2">Vielen Dank!</h4>
                  <p className="text-slate-300">Wir haben Ihnen eine E-Mail mit dem Guide zugesendet. Bitte prüfen Sie auch Ihren Spam-Ordner.</p>
                  <button
                    onClick={() => { setFormStatus('idle'); setFormError(null); }}
                    className="mt-6 text-sky-400 font-medium hover:underline"
                  >
                    Erneut anfordern
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGuideSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="guide-name" className="block text-sm font-medium text-slate-200">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="guide-name"
                      required
                      className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm p-3 border glow-input"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="guide-email" className="block text-sm font-medium text-slate-200">E-Mail</label>
                    <input
                      type="email"
                      name="email"
                      id="guide-email"
                      required
                      className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm p-3 border glow-input"
                      placeholder="name@beispiel.de"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-sky-400 disabled:opacity-75 disabled:cursor-not-allowed transition-colors glow-button"
                    >
                      {formStatus === 'submitting' ? 'Sende...' : 'Guide anfordern'}
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

        {/* CTA */}
        <Section id="products-cta" bg="white">
          <div className="text-center stagger-reveal">
            <h2 className="text-3xl font-extrabold text-slate-100">Noch Fragen?</h2>
            <p className="mt-4 text-slate-300">Wir helfen Ihnen gerne weiter – kontaktieren Sie uns jederzeit.</p>
            <Link
              to="/#contact"
              className="mt-6 inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors transition-transform hover:scale-[1.06] shadow-md hover:shadow-lg glow-button"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default ProductsPage;
