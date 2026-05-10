import { Instagram, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MetadataLabel } from "../components/ui/MetadataLabel";
import { SmoothImage } from "../components/ui/SmoothImage";

const ContactSection = () => {
  const { t } = useTranslation();
  const contactDetails = [
    { 
      label: t('contact.details.phone'), 
      value: "+218 91 263 7667", 
      link: "https://wa.me/218912637667" 
    },
    { 
      label: t('contact.details.email'), 
      value: "team@fennecprods.ly", 
      link: "mailto:team@fennecprods.ly" 
    },
    { 
      label: t('contact.details.location'), 
      value: t('contact.details.address'), 
      link: "https://www.google.com/maps/search/?api=1&query=Highway+Street+Baloun+District+Benghazi+Libya" 
    }
  ];

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-black">
      {/* Left Column - Content */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 py-32 md:py-40 flex flex-col justify-center">
        <div className="max-w-xl w-full mx-auto lg:mx-0 rtl:lg:mr-auto rtl:lg:ml-0">
          <MetadataLabel text={t('contact.tag')} />
          
          <div className="mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-4">{t('contact.title')}</h2>
            <p className="text-white/60 text-lg sm:text-xl font-light">{t('contact.desc')}</p>
          </div>

          <div className="space-y-12">
            {/* Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder={t('contact.form.name')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white/30 transition-colors focus:outline-none rtl:font-sans rtl:text-sm" />
                <input type="email" placeholder={t('contact.form.email')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white/30 transition-colors focus:outline-none rtl:font-sans rtl:text-sm" />
              </div>
              <input type="text" placeholder={t('contact.form.subject')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white/30 transition-colors focus:outline-none rtl:font-sans rtl:text-sm" />
              <textarea placeholder={t('contact.form.details')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest h-32 focus:border-white/30 transition-colors focus:outline-none resize-none rtl:font-sans rtl:text-sm" />
              <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group text-[10px] sm:text-xs cursor-pointer">
                {t('contact.form.btn')} <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1 transition-transform rtl:-scale-x-100" />
              </button>
            </form>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-white/10">
              {contactDetails.map((detail, idx) => (
                <div key={`contact-${idx}`} className="group">
                  <h4 className="font-mono text-[10px] text-white/50 uppercase tracking-[0.3em] mb-2">{detail.label}</h4>
                  <a 
                    href={detail.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-medium hover:text-white/70 transition-colors block leading-tight"
                  >
                    {detail.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-8 pt-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" }
              ].map((social, i) => (
                <a key={`social-${i}`} href="#" className="flex items-center gap-2 group cursor-pointer">
                  <social.icon size={18} className="text-white group-hover:text-white/70 transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white group-hover:text-white/70 transition-colors hidden sm:inline">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Cinematic Image */}
      <div className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-[65vh] lg:max-h-screen lg:self-center relative overflow-hidden border-l border-white/5 lg:my-auto lg:rounded-sm">
        <SmoothImage 
          src="/images/hero-bg.jpg"
          alt="Cinematic Production Set"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        {/* Strong top-down dark overlay so navbar text above is always readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/80 via-black/10 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      <ContactSection />
    </div>
  );
}
