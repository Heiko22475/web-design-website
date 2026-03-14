import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';

const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

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
      <Navbar />
      <main>
        {/* Hero header */}
        <section className="relative bg-slate-950 overflow-hidden py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center page-load">
              <p className="text-sm uppercase tracking-wider text-slate-400 page-load-item">Kontakt</p>
              <h1 className="mt-2 text-4xl font-extrabold text-slate-100 sm:text-5xl page-load-item">Projekt anfragen</h1>
              <p className="mt-4 text-lg text-slate-300 page-load-item">Erzählen Sie uns von Ihrem Projekt – wir melden uns zeitnah bei Ihnen.</p>
              <div className="mt-6 flex items-center justify-center gap-4 page-load-item">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-2 border border-slate-700 text-sm font-semibold rounded-md text-slate-100 bg-slate-900/70 hover:bg-slate-900 transition-colors transition-transform hover:scale-[1.06] shadow-sm hover:shadow-md glow-button"
                >
                  Zurück zur Startseite
                </Link>
                <Link
                  to="/#packages"
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors transition-transform hover:scale-[1.06] glow-button"
                >
                  Preise ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <Section id="contact-form" bg="gray">
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

        {/* CTA */}
        <Section id="contact-cta" bg="white">
          <div className="text-center stagger-reveal">
            <h2 className="text-3xl font-extrabold text-slate-100">Noch unsicher?</h2>
            <p className="mt-4 text-slate-300">Schauen Sie sich unsere Pakete an und finden Sie die passende Lösung.</p>
            <Link
              to="/#packages"
              className="mt-6 inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors transition-transform hover:scale-[1.06] shadow-md hover:shadow-lg glow-button"
            >
              Pakete ansehen
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default ContactPage;
