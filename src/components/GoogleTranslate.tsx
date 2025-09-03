import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { Globe2, ChevronDown } from 'lucide-react';

// Memoized constants to prevent recreation
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];

const GoogleTranslate = memo(() => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Memoized cookie getter function
  const getCookie = useCallback((name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
  }, []);

  // Memoized language change handler
  const changeLanguage = useCallback((langCode: string) => {
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname};`;
    window.location.reload();
  }, []);

  // Memoized toggle handler
  const toggleDropdown = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  // Memoized close dropdown handler
  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  // Memoized selected label
  const selectedLabel = useMemo(() => 
    LANGUAGES.find(lang => lang.code === selectedLang)?.label || 'Select',
    [selectedLang]
  );

  // Memoized language click handler
  const handleLanguageClick = useCallback((langCode: string) => {
    changeLanguage(langCode);
    closeDropdown();
  }, [changeLanguage, closeDropdown]);

  // Memoized key down handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent, langCode: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLanguageClick(langCode);
    }
  }, [handleLanguageClick]);

  useEffect(() => {
    // Initialize selected language from cookie
    const googtrans = getCookie('googtrans') || '/en/en';
    const langCode = googtrans.split('/')[2] || 'en';
    setSelectedLang(langCode);

    // Initialize Google Translate
    if (!(window as any).google?.translate) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Cleanup function
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        delete (window as any).googleTranslateElementInit;
      };
    }
  }, [getCookie]);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, closeDropdown]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left sm:block">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center rounded-full bg-white/90 px-5 py-2 shadow-md text-pink-600 font-semibold hover:bg-pink-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1 select-none whitespace-nowrap"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe2 className="w-5 h-5 mr-2" />
        <span>{selectedLabel}</span>
        <ChevronDown 
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {LANGUAGES.map(lang => (
            <div
              key={lang.code}
              onClick={() => handleLanguageClick(lang.code)}
              className={`cursor-pointer px-4 py-2 text-sm font-semibold text-pink-600 hover:bg-pink-100 hover:text-pink-700 select-none ${
                lang.code === selectedLang ? 'bg-pink-100 text-pink-800' : ''
              }`}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, lang.code)}
              aria-label={`Switch to ${lang.label}`}
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
});

GoogleTranslate.displayName = 'GoogleTranslate';

export default GoogleTranslate;
