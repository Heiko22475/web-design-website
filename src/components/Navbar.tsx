import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Start', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Leistungen', href: '#services' },
  { name: 'Beispiele', href: '#projects' },
  { name: 'Preise', href: '#packages' },
  { name: 'Ablauf', href: '#process' },
  { name: 'Produkte', href: '#products' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    closeMenu();
    if (isHome) return; // let default anchor scroll work
    e.preventDefault();
    navigate('/' + hash);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-4">
            <a href="/" onClick={handleLogoClick} className="flex items-center space-x-4">
              <img src="/MeinAuftrittOnline.png" alt="Logo" className="w-20 h-20 object-contain rounded" />
              <span className="font-bold text-xl text-slate-100 tracking-tight">
                Mein Auftritt <span className="text-sky-400">Online</span>
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-300 hover:text-sky-400 font-medium transition-colors transition-transform duration-200 hover:scale-105 text-sm uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/kontakt"
              onClick={(e) => { closeMenu(); e.preventDefault(); navigate('/kontakt'); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors transition-transform duration-200 hover:scale-105 shadow-sm hover:shadow-md text-sm glow-button"
            >
              Anfragen
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-slate-300 hover:text-white focus:outline-none focus:text-white p-2"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 absolute w-full" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg shadow-black/40">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-4 rounded-md text-base font-medium text-slate-200 hover:text-sky-400 hover:bg-slate-900/60 text-center border-b border-slate-900 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
