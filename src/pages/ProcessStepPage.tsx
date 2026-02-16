import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import { landingContent } from '../data/landingContent';

const ProcessStepPage: React.FC = () => {
  const { stepSlug } = useParams<{ stepSlug: string }>();
  const detail = landingContent.processDetails.find((item) => item.slug === stepSlug);

  if (!detail) {
    return (
      <div className="min-h-screen font-sans text-slate-100 bg-slate-950 pt-16">
        <Navbar />
        <main>
          <Section id="process-not-found" bg="white">
            <div className="text-center page-load">
              <h1 className="text-3xl font-extrabold text-slate-100 sm:text-4xl page-load-item">Seite nicht gefunden</h1>
              <p className="mt-4 text-slate-300 page-load-item">Diese Unterseite existiert nicht.</p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-slate-700 text-sm font-semibold rounded-md text-slate-100 bg-slate-900/70 hover:bg-slate-900 transition-colors transition-transform hover:scale-[1.06] shadow-sm hover:shadow-md glow-button page-load-item"
              >
                Zurück zur Startseite
              </Link>
            </div>
          </Section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-100 bg-slate-950 pt-16">
      <Navbar />
      <main>
        <section className="relative bg-slate-950 overflow-hidden py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center page-load">
              <p className="text-sm uppercase tracking-wider text-slate-400 page-load-item">Projektablauf</p>
              <h1 className="mt-2 text-4xl font-extrabold text-slate-100 sm:text-5xl page-load-item">{detail.title}</h1>
              <p className="mt-4 text-lg text-slate-300 page-load-item">Hier sehen Sie die wichtigsten Punkte zu diesem Schritt.</p>
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

        <Section id="process-detail" bg="gray">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 stagger-reveal">
            {detail.sections.map((section) => (
              <div key={section.title} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm glow-card transition-transform duration-300 hover:scale-[1.03] will-change-transform">
                <h2 className="text-xl font-semibold text-slate-100">{section.title}</h2>
                <p className="mt-3 text-slate-300">{section.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="process-cta" bg="white">
          <div className="text-center stagger-reveal">
            <h2 className="text-3xl font-extrabold text-slate-100">Bereit für den nächsten Schritt?</h2>
            <p className="mt-4 text-slate-300">Wir freuen uns darauf, Ihr Projekt gemeinsam umzusetzen.</p>
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

export default ProcessStepPage;
