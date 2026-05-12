import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { SmoothImage } from "../ui/SmoothImage";

export const Footer = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.portfolio'), path: '/portfolio' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.approach'), path: '/approach' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  return (
    <footer className="pt-24 pb-12 px-6 md:px-10 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link to="/" className="mb-8">
              <SmoothImage 
                src="/images/logo.png" 
                alt="Fennec Productions" 
                className="h-24 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/70 text-sm max-w-sm font-light leading-relaxed mb-8">
              {t('home.hero_sub')}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Studio</h4>
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className="text-white/80 hover:text-white text-sm transition-colors w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Contact</h4>
            <div className="space-y-6 text-white/90 text-sm font-light">
              <div className="space-y-2">
                <p className="text-[9px] font-mono uppercase text-white/40 tracking-widest">{t('contact.details.email')}</p>
                <a href="mailto:team@fennecprods.ly" className="hover:text-white transition-colors text-white">team@fennecprods.ly</a>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-mono uppercase text-white/40 tracking-widest">{t('contact.details.phone')}</p>
                <a href="tel:+218912637667" className="hover:text-white transition-colors text-white" dir="ltr">+218 91 263 7667</a>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-mono uppercase text-white/40 tracking-widest">{t('contact.details.location')}</p>
                <p className="text-white">{t('contact.details.address')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mb-12">
          {[
            { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/fennecprods?igsh=dDM2Nno3Nm0wcnJi" },
            { icon: Linkedin, label: "LinkedIn", href: "https://ly.linkedin.com/in/munther-elsaddig" },
            { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Fennec-Productions/61582344225077/" }
          ].map((social, i) => (
            <a key={`footer-social-${i}`} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group cursor-pointer">
              <social.icon size={16} className="text-white/50 group-hover:text-white transition-colors" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">{social.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
          <div className="flex items-center gap-4">
            <span className="text-white/60">{t('footer.copy')} {t('footer.company')}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60">{t('footer.made')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
