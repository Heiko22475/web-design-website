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
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const landingContent = {
  hero: {
    title: "Ihr Partner für professionelles Webdesign",
    subtitle: "Wir erstellen moderne, leistungsstarke Websites, die Ihr Unternehmen voranbringen. Maßgeschneidert, schnell und effektiv.",
    ctaPrimary: "Projekt anfragen",
    ctaSecondary: "Pakete ansehen",
    trust: "Über 50 zufriedene Kunden vertrauen auf unsere Expertise."
  },
  services: [
    {
      id: "lp",
      title: "One-Pager",
      description: "Perfekt für den schnellen Einstieg oder spezifische Kampagnen. Alles Wichtige auf einer Seite, optimiert für Konversion."
    },
    {
      id: "biz",
      title: "Business Website",
      description: "Der umfassende Online-Auftritt für Ihr Unternehmen. Mehrere Unterseiten, ausführliche Informationen und professionelle Darstellung."
    },
    {
      id: "relaunch",
      title: "Website Relaunch",
      description: "Modernisierung Ihres bestehenden Auftritts. Frisches Design, verbesserte Technik und optimierte Inhalte."
    },
    {
      id: "maintenance",
      title: "Wartung & Pflege",
      description: "Regelmäßige Updates, Backups und Sicherheitschecks. Wir kümmern uns um die Technik, damit Sie sich auf Ihr Geschäft konzentrieren können."
    }
  ] as Service[],
  packages: [
    {
      id: "starter",
      name: "Starter",
      price: "ab 990€",
      features: ["One-Page Design", "Responsive & Mobile-First", "Kontaktformular", "Impressum & Datenschutz", "Basis SEO"],
      isPopular: false
    },
    {
      id: "business",
      name: "Business",
      price: "ab 1.890€",
      features: ["Bis zu 5 Unterseiten", "Individuelles Design", "CMS Integration", "Erweiterte SEO", "Google Maps Integration", "Performance Optimierung"],
      isPopular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "Auf Anfrage",
      features: ["Umfangreiches Webprojekt", "E-Commerce Funktionalität", "Mehrsprachigkeit", "Individuelle Funktionen", "Wartungsvertrag inklusive"],
      isPopular: false
    }
  ] as Package[],
  portfolio: [
    {
      id: "p1",
      title: "Kanzlei Müller",
      category: "Business",
      description: "Seriöser Auftritt für eine etablierte Anwaltskanzlei.",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p2",
      title: "Café Aroma",
      category: "Gastronomie",
      description: "Einladende Website mit Speisekarte und Reservierung.",
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p3",
      title: "TechStart",
      category: "Startup",
      description: "Moderne Landingpage für ein innovatives Tech-Startup.",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p4",
      title: "Dr. Med. Weber",
      category: "Praxis",
      description: "Patientenfreundliche Praxis-Homepage mit Terminbuchung.",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p5",
      title: "Handwerk & Bau",
      category: "Handwerk",
      description: "Robuste Darstellung für ein lokales Bauunternehmen.",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p6",
      title: "Fit & Active",
      category: "Sport",
      description: "Energudgeladenes Design für ein Fitnessstudio.",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    }
  ] as Project[],
  process: [
    { step: 1, title: "Kennenlernen", description: "Wir besprechen Ihre Ziele, Wünsche und Anforderungen in einem unverbindlichen Erstgespräch." },
    { step: 2, title: "Design", description: "Wir erstellen einen modernen Entwurf, der Ihre Marke perfekt widerspiegelt." },
    { step: 3, title: "Umsetzung", description: "Nach Ihrer Freigabe programmieren wir die Website mit modernsten Technologien." },
    { step: 4, title: "Launch", description: "Wir schalten Ihre neue Website live und sorgen für einen reibungslosen Start." }
  ],
  faq: [
    {
      question: "Wie lange dauert die Erstellung einer Website?",
      answer: "Je nach Umfang des Projekts dauert die Erstellung in der Regel zwischen 2 und 6 Wochen. Für einfache One-Pager geht es oft schneller, umfangreiche Business-Seiten benötigen etwas mehr Zeit für Konzeption und Abstimmung."
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
      question: "Was kostet eine Website?",
      answer: "Die Kosten hängen stark von den Anforderungen ab. Unsere Pakete beginnen bei 990€ für professionelle Einstiegslösungen. Für ein genaues Angebot führen wir gerne ein kostenloses Beratungsgespräch."
    },
    {
      question: "Bieten Sie auch Hosting und Domains an?",
      answer: "Wir beraten Sie gerne bei der Wahl des passenden Hostings und der Domainregistrierung. Auf Wunsch übernehmen wir auch die technische Einrichtung für Sie."
    }
  ] as FAQItem[],
  contact: {
    address: "Musterstraße 123, 10115 Berlin",
    email: "kontakt@webdesign-business.de",
    phone: "+49 (0) 30 12345678",
    legal: "Wir verarbeiten Ihre Daten gemäß unserer Datenschutzerklärung."
  }
};
