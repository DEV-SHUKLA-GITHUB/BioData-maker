import React, { useEffect, useState, useRef } from 'react';
import { Globe2, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];

const GoogleTranslate: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return decodeURIComponent(match[2]);
      return null;
    };

    const googtrans = getCookie('googtrans') || '/en/en';
    const langCode = googtrans.split('/')[2] || 'en';
    setSelectedLang(langCode);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.removeChild(script);
      delete (window as any).googleTranslateElementInit;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname};`;
    window.location.reload();
  };

  const selectedLabel = LANGUAGES.find(lang => lang.code === selectedLang)?.label || 'Select';

  return (
    <div ref={dropdownRef} className="relative inline-block text-left sm:block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          inline-flex items-center rounded-full bg-white/90 px-5 py-2 shadow-md text-pink-600 font-semibold
          hover:bg-pink-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1
          select-none whitespace-nowrap
        "
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Globe2 className="w-5 h-5 mr-2" />
        <span>{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
            focus:outline-none z-50
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {LANGUAGES.map(lang => (
            <div
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setOpen(false);
              }}
              className={`
                cursor-pointer px-4 py-2 text-sm font-semibold text-pink-600 
                hover:bg-pink-100 hover:text-pink-700 select-none
                ${lang.code === selectedLang ? 'bg-pink-100 text-pink-800' : ''}
              `}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  changeLanguage(lang.code);
                  setOpen(false);
                }
              }}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
};

export default GoogleTranslate;
