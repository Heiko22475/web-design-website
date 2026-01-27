import React, { useState } from 'react';
import type { FAQItem } from '../data/landingContent';

interface AccordionProps {
  items: FAQItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `faq-item-${index}`;
        const contentId = `faq-content-${index}`;

        return (
          <div key={index} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <button
              id={id}
              aria-controls={contentId}
              aria-expanded={isOpen}
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
            >
              <span>{item.question}</span>
              <span className={`ml-4 transform transition-transform duration-200 text-blue-600 ${isOpen ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
            <div
              id={contentId}
              aria-labelledby={id}
              hidden={!isOpen}
              className={`text-slate-600 bg-slate-50 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-4 border-t border-slate-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
