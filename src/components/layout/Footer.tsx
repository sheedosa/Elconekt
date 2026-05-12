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
                loading="lazy"
                decoding="async"
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
                <a href="https://wa.me/218912637667" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-green-400 transition-colors text-white group/wa" dir="ltr">
                  +218 91 263 7667
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500 group-hover/wa:scale-110 transition-transform flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
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
