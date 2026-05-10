import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SmoothImage } from "../ui/SmoothImage";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.portfolio'), path: '/portfolio' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.approach'), path: '/approach' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-2 sm:py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center"
        >
          <Link to="/">
            <SmoothImage 
              src="/images/logo.png" 
              alt="Fennec Productions" 
              className="h-28 sm:h-32 md:h-40 xl:h-48 w-auto object-contain brightness-0 invert opacity-90 transition-opacity hover:opacity-100"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
            />
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-10">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                >
                  <Link
                    to={item.path}
                    className={`text-[10px] rtl:text-sm rtl:font-bold uppercase tracking-[0.2em] rtl:tracking-normal transition-colors ${isActive ? 'text-white' : 'text-white/40 hover:text-white/80 rtl:text-white/80 rtl:hover:text-white'}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
          
          <div className="w-px h-4 bg-white/20 mx-10"></div>
          
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[10px] rtl:text-sm rtl:font-bold uppercase tracking-[0.2em] rtl:tracking-normal font-medium text-white/40 hover:text-white/80 rtl:text-white/80 rtl:hover:text-white transition-colors"
          >
            <Globe size={14} />
            <span>{t('nav.language')}</span>
          </motion.button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="text-white/40 hover:text-white/80 transition-colors p-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
          >
            <Globe size={16} />
            <span className="sr-only">{t('nav.language')}</span>
          </button>
          <button 
            onClick={() => setIsOpen(true)}
            className="text-white p-2"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 rtl:left-8 rtl:right-auto text-white/50 p-2"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-8 text-center">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-bold uppercase tracking-tighter transition-colors ${isActive ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="text-xl mt-8 font-mono uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors flex items-center justify-center gap-3"
              >
                <Globe size={20} />
                {t('nav.language')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
