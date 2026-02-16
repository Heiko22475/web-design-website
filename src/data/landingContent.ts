export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export interface ProcessStep {
  step: number;
  slug: string;
  title: string;
  description: string;
}

export interface ProcessDetailSection {
  title: string;
  body: string;
}

export interface ProcessDetail {
  slug: string;
  title: string;
  sections: ProcessDetailSection[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const landingContent = {
  services: [
    {
      id: "lp",
      title: "One-Pager",
      description: "Perfekt für den schnellen Einstieg oder spezifische Kampagnen. Alles Wichtige auf einer Seite, optimiert für Konversion."
    },
    {
      id: "biz",
      title: "Business Website",
      description: "Der umfassende Online-Auftritt für Ihr Unternehmen. Individuelles Design, ausführliche Informationen und professionelle Darstellung."
    },
    {
      id: "maintenance",
      title: "Premium Paket",
      description: "Unsere Rundum-sorglos-Lösung für einen hochwertigen und zuverlässigen Internetauftritt. Alles Wichtige ist enthalten, damit Sie sich um nichts weiter kümmern müssen."
    }
  ] as Service[],
  packages: [
    {
      id: "starter",
      name: "Starter",
      price: "Bald verfügbar",
      features: ["One-Page Design", "Optimiert für Handy, Tablet und PC", "Basis Inhaltsverwaltung (CMS)", "Kontaktformular", "Impressum & Datenschutz", "Standard Sichtbarkeit"],
      isPopular: false
    },
    {
      id: "business",
      name: "Business",
      price: "Bald verfügbar",
      features: ["Alles von Starter", "Individuelles Design", "Google Maps Integration", "Mehrseitige Website", "Erweiterte Inhaltsverwaltung (CMS)", "Verbesserte Sichtbarkeit", "Content Banner (Cookies)", "Social Media Integration"],
      isPopular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "Bald verfügbar",
      features: ["Alles von Business", "Individuell angepasstes Webprojekt", "Umfassende Inhaltsverwaltung (CMS)", "Maximale Sichtbarkeit", "Zusätzliche Seitenfunktionen"],
      isPopular: false
    }
  ] as Package[],
  portfolio: [
    {
      id: "p1",
      title: "Salon Nordblick",
      category: "Starter",
      description: "Starter Beispiel: Moderne One-Page Website für einen Friseursalon.",
      imageUrl: "/SalonNordblick.png",
      linkUrl: "https://friseur-salon-nord-blick-vcvb.vercel.app/"
    },
    {
      id: "p2",
      title: "Praxis Aktivraum",
      category: "Business",
      description: "Business Beispiel: Mehrseitige Website mit individuellem Design für eine Physio-Praxis.",
      imageUrl: "/PraxisAktivraum.png",
      linkUrl: "https://praxis-aktiv-raum.vercel.app/"
    },
    {
      id: "p3",
      title: "Momentum Coaching",
      category: "Premium",
      description: "Premium Beispiel: Umfassende Website mit erweiterten Funktionen für ein Coaching-Unternehmen.",
      imageUrl: "/MomentumCoaching.png",
      linkUrl: "https://momentum-coaching.vercel.app/"
    },
    {
      id: "p4",
      title: "Dr. Med. Weber",
      category: "Praxis",
      description: "Patientenfreundliche Praxis-Homepage mit Terminbuchung.",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      linkUrl: "https://example.com/dr-med-weber"
    },
    {
      id: "p5",
      title: "Handwerk & Bau",
      category: "Handwerk",
      description: "Robuste Darstellung für ein lokales Bauunternehmen.",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      linkUrl: "https://example.com/handwerk-bau"
    },
    {
      id: "p6",
      title: "Fit & Active",
      category: "Sport",
      description: "Energudgeladenes Design für ein Fitnessstudio.",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      linkUrl: "https://example.com/fit-active"
    }
  ] as Project[],
  process: [
    { step: 1, slug: "kennenlernen", title: "Kennenlernen", description: "Wir besprechen Ihre Ziele, Wünsche und Anforderungen in einem unverbindlichen Erstgespräch per E-Mail." },
    { step: 2, slug: "design", title: "Design", description: "Wir erstellen einen modernen Entwurf, der Ihre Marke perfekt widerspiegelt." },
    { step: 3, slug: "umsetzung", title: "Umsetzung", description: "Nach Ihrer Freigabe programmieren wir die Website mit modernsten Technologien." },
    { step: 4, slug: "launch", title: "Launch", description: "Wir schalten Ihre neue Website live und sorgen für einen reibungslosen Start." }
  ] as ProcessStep[],
  processDetails: [
    {
      slug: "kennenlernen",
      title: "Kennenlernen",
      sections: [
        { title: "Ziele und Ausgangslage", body: "Wir klären, was Sie erreichen wollen, welche Zielgruppen wichtig sind und welche Inhalte schon vorhanden sind." },
        { title: "Inhalte & Funktionen", body: "Wir sammeln, welche Inhalte auf die Website sollen (Texte, Bilder, Leistungen, Referenzen) und welche Funktionen nötig sind (z. B. Kontakt, Anfrage, Downloads). So ist der Umfang von Anfang an klar." },
        { title: "Kommunikation & Feedback", body: "Wir vereinbaren feste Feedback-Schritte, damit Sie jederzeit den Überblick behalten. Sie bekommen klare Zwischenstände, geben Rückmeldung, und wir setzen Anpassungen strukturiert um – schnell, nachvollziehbar und ohne endlose Schleifen." },
        { title: "Nächster Schritt: Angebot", body: "Auf Basis unseres Gesprächs erhalten Sie eine transparente Zusammenfassung mit Aufwand, Zeitrahmen und einem klaren Vorschlag für das passende Paket. Erst danach entscheiden Sie, ob wir starten." }
      ]
    },
    {
      slug: "design",
      title: "Design",
      sections: [
        { title: "Visuelle Richtung", body: "Wir entwickeln eine moderne Gestaltung, die zu Ihrer Marke passt und Vertrauen schafft." },
        { title: "Layout und Struktur", body: "Wir legen fest, wie Inhalte sinnvoll aufgebaut sind, damit Besucher schnell finden, was sie suchen." },
        { title: "Feedback und Feinschliff", body: "Sie geben Feedback, wir optimieren Details und finalisieren das Design." },
        { title: "Freigabe", body: "Nach Ihrer Bestätigung starten wir direkt mit der Umsetzung." }
      ]
    },
    {
      slug: "umsetzung",
      title: "Umsetzung",
      sections: [
        { title: "Technische Umsetzung", body: "Wir setzen das Design sauber und performant um, responsiv für alle Geräte." },
        { title: "Inhalte einpflegen", body: "Texte, Bilder und Kontaktmöglichkeiten werden strukturiert eingebunden." },
        { title: "Qualitätssicherung", body: "Wir testen Darstellung, Performance und Funktionalität vor dem Go-Live." },
        { title: "Abnahme", body: "Sie prüfen die Website und geben die finale Freigabe." }
      ]
    },
    {
      slug: "launch",
      title: "Launch",
      sections: [
        { title: "Livegang", body: "Wir veröffentlichen die Website und prüfen, ob alles reibungslos läuft." },
        { title: "Letzter Check & Übergabe", body: "Vor dem Start gehen wir alles noch einmal gemeinsam durch: Inhalte, Links, CMS, Formulare und Darstellung auf allen Geräten. Danach erhalten Sie eine kurze Übergabe mit den wichtigsten Infos, damit Sie genau wissen, wie man alles bedient." },
        { title: "Performance & Sicherheit", body: "Zum Launch optimieren wir die wichtigsten technischen Details: Ladezeit, Bildgrößen, saubere Fehlerseiten und zuverlässige Formular-Übermittlung. So startet Ihre Website schnell, stabil und vertrauenswürdig." },
        { title: "Monitoring", body: "Wir behalten die ersten Tage im Blick und reagieren schnell, falls etwas auffällt." }
      ]
    }
  ] as ProcessDetail[],
  faq: [
    {
      question: "Wie lange dauert die Erstellung einer Website?",
      answer: "Je nach Umfang des Projekts dauert die Erstellung in der Regel zwischen 7 und 10 Werktage. Für einfache One-Pager geht es oft schneller, umfangreiche Business-Seiten benötigen etwas mehr Zeit für Konzeption und Abstimmung."
    },
    {
      question: "Kann ich Inhalte später selbst ändern?",
      answer: "Ja, wir binden auf Wunsch ein Content Management System (CMS) ein, mit dem Sie Texte und Bilder einfach selbst austauschen können, ohne programmieren zu müssen."
    },
    {
      question: "Ist die Website für Handys optimiert?",
      answer: "Absolut. Wir verfolgen einen 'Mobile-First'-Ansatz. Ihre Website sieht auf Smartphones, Tablets und Desktop-Computern gleichermaßen gut aus und ist perfekt bedienbar."
    },
    {
      question: "Bieten Sie auch Domains an?",
      answer: "Wir unterstützen Sie bei allen Fragen rund um das Thema Domains und erklären die nötigen Schritte verständlich. Die Domain wird von Ihnen selbst gekauft, damit sie jederzeit in Ihrem Besitz bleibt."
    },
    {
      question: "Welche Plattformen benutzen Sie?",
      answer: "Für das Hosting nutzen wir Vercel. Für den Versand von Kontaktanfragen per E-Mail verwenden wir Resend."
    },
    {
      question: "Muss ich dafür etwas einrichten oder Accounts erstellen?",
      answer: "Ja – für das Hosting und die Datenbank brauchen Sie eigene Accounts bei Vercel und Supabase. Zusätzlich benötigen Sie einen GitHub-Account: Dort liegt das Website-Projekt (Repository), und Vercel kann daraus automatisch deployen und Updates übernehmen. Wir schicken Ihnen dafür per E-Mail ein kurzes Schritt-für-Schritt-Tutorial, damit alles einfach bleibt. Die Accounts werden von Ihnen erstellt, damit Sie die volle Kontrolle behalten. Wenn Fragen auftauchen, unterstützen wir Sie selbstverständlich."
    }
  ] as FAQItem[]
};
