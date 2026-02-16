import React, { useEffect, useRef } from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  bg?: 'white' | 'gray';
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, bg = 'white' }) => {
  const bgClass = bg === 'gray' ? 'bg-slate-900/60' : 'bg-slate-950';
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    const wipeTargets = () => Array.from(sectionEl.querySelectorAll<HTMLElement>('.wipe-text'));
    const staggerTargets = () => Array.from(sectionEl.querySelectorAll<HTMLElement>('.stagger-reveal'));
    const triggerWipe = (element: HTMLElement) => {
      element.classList.remove('wipe-animate');
      void element.offsetWidth;
      element.classList.add('wipe-animate');
    };

    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wipeTargets().forEach(triggerWipe);
            staggerTargets().forEach((el) => el.classList.add('stagger-visible'));
          } else {
            wipeTargets().forEach((el) => el.classList.remove('wipe-animate'));
            staggerTargets().forEach((el) => el.classList.remove('stagger-visible'));
          }
        });
      },
      { threshold: isSmallScreen ? 0.15 : 0.35, rootMargin: isSmallScreen ? '0px 0px -5% 0px' : '0px 0px -10% 0px' }
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, []);
  
  return (
    <section ref={sectionRef} id={id} className={`py-16 md:py-24 ${bgClass} section-animate ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
