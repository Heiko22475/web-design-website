import React from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  bg?: 'white' | 'gray';
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, bg = 'white' }) => {
  const bgClass = bg === 'gray' ? 'bg-slate-50' : 'bg-white';
  
  return (
    <section id={id} className={`py-16 md:py-24 ${bgClass} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
