import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';

const aboutSections = [
  {
    title: 'Unsere Mission',
    body: 'Wir glauben daran, dass jedes Unternehmen einen professionellen Online-Auftritt verdient – unabhängig von Größe oder Budget. Unsere Mission ist es, Websites zu schaffen, die nicht nur optisch überzeugen, sondern echten Mehrwert liefern: mehr Sichtbarkeit, mehr Vertrauen und mehr Kundenanfragen.',
  },
  {
    title: 'Wer wir sind',
    body: 'Wir sind ein kleines, engagiertes Team aus den Bereichen Webdesign und Webentwicklung. Durch kurze Abstimmungswege und direkte Kommunikation können wir flexibel und effizient auf Ihre Wünsche eingehen.',
  },
  {
    title: 'Unsere Arbeitsweise',
    body: 'Struktur und Transparenz stehen bei uns an erster Stelle. Jedes Projekt durchläuft klar definierte Phasen: vom Kennenlernen und der Konzeption über das Design bis hin zur technischen Umsetzung und dem Launch. So wissen Sie jederzeit, wo Ihr Projekt steht.',
  },
  {
    title: 'Qualität vor Quantität',
    body: 'Wir nehmen bewusst nur eine begrenzte Anzahl an Projekten gleichzeitig an. Das garantiert Ihnen unsere volle Aufmerksamkeit, sorgfältige Umsetzung und eine schnelle Projektlaufzeit von in der Regel 7 bis 14 Tagen.',
  },
  {
    title: 'Moderne Technologien',
    body: 'Wir setzen auf aktuelle Webtechnologien, die schnelle Ladezeiten, Sicherheit und einfache Wartbarkeit gewährleisten. Jede Website wird vollständig responsiv entwickelt – optimiert für Smartphone, Tablet und Desktop.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-slate-100 bg-slate-950 pt-16">
      <Navbar />
      <main>
        <section className="relative bg-slate-950 overflow-hidden py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center page-load">
              <p className="text-sm uppercase tracking-wider text-slate-400 page-load-item">About</p>
              <h1 className="mt-2 text-4xl font-extrabold text-slate-100 sm:text-5xl page-load-item">Über uns</h1>
              <p className="mt-4 text-lg text-slate-300 page-load-item">
                Erfahren Sie, wer hinter Mein Auftritt Online steckt und wie wir arbeiten.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 page-load-item">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-2 border border-slate-700 text-sm font-semibold rounded-md text-slate-100 bg-slate-900/70 hover:bg-slate-900 transition-colors transition-transform hover:scale-[1.06] shadow-sm hover:shadow-md glow-button"
                >
                  Zurück zur Startseite
                </Link>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors transition-transform hover:scale-[1.06] glow-button"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Section id="about-details" bg="gray">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 stagger-reveal">
            {aboutSections.map((section) => (
              <div key={section.title} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm glow-card transition-transform duration-300 hover:scale-[1.03] will-change-transform">
                <h2 className="text-xl font-semibold text-slate-100">{section.title}</h2>
                <p className="mt-3 text-slate-300">{section.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="about-cta" bg="white">
          <div className="text-center stagger-reveal">
            <h2 className="text-3xl font-extrabold text-slate-100">Bereit für Ihren neuen Webauftritt?</h2>
            <p className="mt-4 text-slate-300">Starten Sie jetzt Ihr Projekt – wir beraten Sie gerne unverbindlich.</p>
            <Link
              to="/kontakt"
              className="mt-6 inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors transition-transform hover:scale-[1.06] shadow-md hover:shadow-lg glow-button"
            >
              Projekt anfragen
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default AboutPage;
