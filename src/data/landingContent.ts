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

export interface ServiceDetailSection {
  title: string;
  body: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  sections: ServiceDetailSection[];
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
      features: ["Alles von Starter", "Individuelles Design", "Google Maps Integration", "Mehrseitige Website", "Erweiterte Inhaltsverwaltung (CMS)", "Verbesserte Sichtbarkeit", "Consent Banner (Cookies)", "Social Media Integration"],
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
      answer: "Je nach Umfang des Projekts dauert die Erstellung in der Regel zwischen 7 und 14 Werktage."
    },
    {
      question: "Kann ich Inhalte später selbst ändern?",
      answer: "Ja, wir binden auf Wunsch ein Content Management System (CMS) ein, mit dem Sie Texte und Bilder einfach selbst austauschen können, ohne programmieren zu müssen."
    },
    {
      question: "Ist die Website für Handys optimiert?",
      answer: "Absolut. Ihre Website sieht auf Smartphones, Tablets und Desktop-Computern gleichermaßen gut aus und ist perfekt bedienbar."
    },
    {
      question: "Muss ich etwas extra kaufen oder monatlich bezahlen?",
      answer: "Ja – Sie benötigen eine eigene Domain, die in den meisten Fällen unter 1€ kostet. Außerdem brauchen Sie bei Webflow den CMS Plan für 23€ im Monat, der das Hosting und das Content Management System beinhaltet."
    },
    {
      question: "Muss ich dafür etwas einrichten oder Accounts erstellen?",
      answer: "Ja – Sie brauchen einen kostenlosen Account bei IONOS und bei Webflow. Sie erstellen die Accounts selbst, um die volle Kontrolle zu haben. Wir unterstützen Sie natürlich bei der Einrichtung und allen Fragen."
    }
  ] as FAQItem[],
  serviceDetails: [
    {
      slug: "one-pager",
      title: "One-Pager – Ihre kompakte Landing Page",
      subtitle: "Alles Wichtige auf einer Seite – optimiert für Conversions und maximale Wirkung.",
      sections: [
        {
          title: "Was ist ein One-Pager?",
          body: "Ein One-Pager ist eine moderne, einseitige Website, die alle relevanten Informationen kompakt und übersichtlich präsentiert. Ideal als Landing Page für Kampagnen, als digitale Visitenkarte oder für den schnellen Start Ihrer Online-Präsenz. Durch den klaren Aufbau führen Sie Besucher gezielt zur gewünschten Aktion – ob Kontaktanfrage, Terminbuchung oder Kaufentscheidung."
        },
        {
          title: "Für wen eignet sich ein One-Pager?",
          body: "Perfekt für Einzelunternehmer, Freelancer, Startups und kleine Unternehmen, die schnell und professionell online sichtbar sein wollen. Auch als ergänzende Landing Page für gezielte Werbekampagnen bei Google Ads oder Social Media Marketing ist ein One-Pager die ideale Wahl."
        },
        {
          title: "Responsive Webdesign & mobile Optimierung",
          body: "Ihr One-Pager wird vollständig responsiv entwickelt – das bedeutet, er sieht auf Smartphones, Tablets und Desktop-PCs gleichermaßen professionell aus. Mobile Optimierung ist heute nicht nur ein SEO-Rankingfaktor, sondern entscheidend für die Nutzererfahrung Ihrer Besucher."
        },
        {
          title: "Schnelle Ladezeiten & Performance",
          body: "Wir setzen auf modernste Webtechnologien, um blitzschnelle Ladezeiten zu garantieren. Eine performante Website verbessert Ihr Google-Ranking, reduziert die Absprungrate und sorgt dafür, dass potenzielle Kunden nicht abspringen, bevor sie Ihr Angebot sehen."
        },
        {
          title: "Suchmaschinenoptimierung (SEO) inklusive",
          body: "Jeder One-Pager wird mit grundlegender Suchmaschinenoptimierung ausgeliefert: saubere Seitenstruktur, optimierte Meta-Tags, schnelle Ladezeiten und eine technisch einwandfreie Basis für bessere Sichtbarkeit bei Google."
        },
        {
          title: "Kontaktformular & Datenschutz",
          body: "Ein integriertes Kontaktformular macht es Ihren Besuchern leicht, direkt mit Ihnen in Verbindung zu treten. Selbstverständlich DSGVO-konform mit Impressum und Datenschutzerklärung – damit Sie rechtlich auf der sicheren Seite sind."
        }
      ]
    },
    {
      slug: "business-website",
      title: "Business Website – Ihr professioneller Online-Auftritt",
      subtitle: "Mehrseitig, individuell und auf Wachstum ausgelegt – die perfekte Unternehmenswebsite.",
      sections: [
        {
          title: "Was bietet eine Business Website?",
          body: "Eine Business Website ist Ihr umfassender digitaler Auftritt im Internet. Mehrere Seiten bieten Platz für detaillierte Informationen zu Ihren Leistungen, Ihrem Team, Referenzen und Ihrem Unternehmen. Mit individuellem Webdesign und durchdachter Struktur schaffen Sie Vertrauen und überzeugen potenzielle Kunden."
        },
        {
          title: "Individuelles Design & Branding",
          body: "Wir entwickeln ein maßgeschneidertes Webdesign, das Ihre Marke perfekt widerspiegelt. Farben, Typografie, Layout und Bildsprache werden exakt auf Ihr Corporate Design abgestimmt – für einen einheitlichen und professionellen Markenauftritt, der sich von der Konkurrenz abhebt."
        },
        {
          title: "Content Management System (CMS)",
          body: "Mit einem leistungsfähigen CMS können Sie Texte, Bilder und Inhalte Ihrer Website jederzeit selbst aktualisieren – ganz ohne Programmierkenntnisse. So bleiben Sie flexibel und können Ihre Website kontinuierlich an neue Anforderungen anpassen."
        },
        {
          title: "SEO & lokale Sichtbarkeit",
          body: "Ihre Business Website wird mit erweiterter Suchmaschinenoptimierung ausgestattet: optimierte Seitenstruktur, relevante Keywords, Meta-Beschreibungen und technisches SEO. Ideal für lokale Unternehmen, die bei Google Maps und in der lokalen Suche gefunden werden wollen."
        },
        {
          title: "Google Maps & Social Media Integration",
          body: "Lassen Sie Kunden Ihren Standort direkt auf der Website finden – mit eingebetteter Google Maps Karte. Dazu verknüpfen wir Ihre Social Media Kanäle für maximale Reichweite und eine nahtlose Online-Präsenz auf allen Plattformen."
        },
        {
          title: "DSGVO-konform & Cookie Consent",
          body: "Ihre Website erfüllt alle Anforderungen der DSGVO: rechtskonformes Impressum, Datenschutzerklärung und ein Cookie Consent Banner, das Ihren Besuchern die Wahl lässt. So sind Sie rechtlich abgesichert und schaffen Vertrauen bei Ihren Kunden."
        }
      ]
    },
    {
      slug: "premium-paket",
      title: "Premium Paket – Die Rundum-sorglos-Lösung",
      subtitle: "Maximaler Umfang, individuelle Funktionen und höchste Qualität für Ihren Webauftritt.",
      sections: [
        {
          title: "Was macht das Premium Paket besonders?",
          body: "Das Premium Paket ist unsere umfassendste Lösung für Unternehmen, die keine Kompromisse eingehen wollen. Sie erhalten ein individuell angepasstes Webprojekt mit erweiterten Funktionen, maximaler Suchmaschinenoptimierung und einem professionellen Design, das Ihre Marke auf das nächste Level bringt."
        },
        {
          title: "Individuell angepasstes Webprojekt",
          body: "Jedes Premium-Projekt wird von Grund auf nach Ihren Anforderungen konzipiert und entwickelt. Ob spezielle Funktionen, komplexe Seitenstrukturen oder besondere Integrationen – wir setzen Ihre Vision technisch sauber und kreativ um. Ideal für mittelständische Unternehmen, Agenturen und anspruchsvolle Projekte."
        },
        {
          title: "Maximale Suchmaschinenoptimierung",
          body: "Im Premium Paket gehen wir bei der SEO-Optimierung in die Tiefe: umfassende Keyword-Recherche, optimierte Seitenstruktur, interne Verlinkung, Schema-Markup und technisches SEO auf höchstem Niveau. So erzielen Sie nachhaltig bessere Rankings bei Google und steigern Ihre organische Reichweite."
        },
        {
          title: "Umfassendes Content Management",
          body: "Mit dem erweiterten CMS haben Sie volle Kontrolle über alle Inhalte Ihrer Website. Verwalten Sie Blog-Beiträge, Landingpages, Teammitglieder, Referenzen und mehr – intuitiv und ohne technische Vorkenntnisse. Perfekt für Unternehmen, die regelmäßig neue Inhalte veröffentlichen."
        },
        {
          title: "Erweiterte Funktionen & Integrationen",
          body: "Von Terminbuchungssystemen über Newsletter-Anbindung bis hin zu individuellen Formularen und Automatisierungen – das Premium Paket bietet Ihnen alle Funktionen, die ein moderner Internetauftritt braucht. Wir integrieren genau die Tools, die Ihr Business voranbringen."
        },
        {
          title: "Performance, Sicherheit & Support",
          body: "Höchste Performance durch optimierte Ladezeiten, professionelles Hosting und regelmäßige Qualitätschecks. Dazu erhalten Sie eine ausführliche Übergabe und Dokumentation, damit Sie Ihre Website sicher und eigenständig betreiben können."
        }
      ]
    }
  ] as ServiceDetail[]
};
