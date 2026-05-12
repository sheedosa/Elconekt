import { useState } from "react";
import { Instagram, Linkedin, Facebook, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MetadataLabel } from "../components/ui/MetadataLabel";
import { SmoothImage } from "../components/ui/SmoothImage";

const WEB3FORMS_KEY = "03f33a25-9062-4606-bba2-4401ec6ca53f";

const ContactSection = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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
        <div className="max-w-xl w-full mx-auto lg:mx-0">
          <MetadataLabel text={t('contact.tag')} />
          
          <div className="mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-4">{t('contact.title')}</h2>
            <p className="text-white/60 text-lg sm:text-xl font-light">{t('contact.desc')}</p>
          </div>

          <div className="space-y-12">
            {/* Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("sending");
                const form = e.currentTarget;
                const data = new FormData(form);
                data.append("access_key", WEB3FORMS_KEY);
                try {
                  const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: data,
                  });
                  if (res.ok) {
                    setStatus("success");
                    form.reset();
                  } else {
                    setStatus("error");
                  }
                } catch {
                  setStatus("error");
                }
              }}
              className="space-y-4"
            >
              <input type="hidden" name="subject" value="New inquiry from fennecprods.ly" />
              <input type="hidden" name="from_name" value="Fennec Productions Website" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" required placeholder={t('contact.form.name')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white/30 transition-colors focus:outline-none" />
                <input type="email" name="email" required placeholder={t('contact.form.email')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white/30 transition-colors focus:outline-none" />
              </div>
              <input type="text" name="subject_line" required placeholder={t('contact.form.subject')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white/30 transition-colors focus:outline-none" />
              <textarea name="message" required placeholder={t('contact.form.details')} className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest h-32 focus:border-white/30 transition-colors focus:outline-none resize-none" />
              {status === "success" ? (
                <div className="border border-white/10 p-8 text-center space-y-3">
                  <CheckCircle size={32} className="mx-auto text-white/80" />
                  <p className="text-white font-bold uppercase tracking-[0.2em] text-sm">Transmission Received</p>
                  <p className="text-white/50 font-mono text-xs leading-relaxed">
                    Thank you for reaching out. The Fennec team has received your message and will be in touch with you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group text-[10px] sm:text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <>{t('contact.form.btn')} <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 font-mono text-xs text-center">Something went wrong. Please try again or email us directly.</p>
                  )}
                </>
              )}
            </form>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-white/10">
              {contactDetails.map((detail, idx) => (
                <div key={`contact-${idx}`} className="group">
                  <h4 className="font-mono text-[10px] text-white/50 uppercase tracking-[0.3em] mb-2">{detail.label}</h4>
                  {idx === 0 ? (
                    <a
                      href={detail.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-base sm:text-lg font-medium hover:text-green-400 transition-colors leading-tight group/wa"
                    >
                      {detail.value}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500 group-hover/wa:scale-110 transition-transform">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  ) : (
                    <a
                      href={detail.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-medium hover:text-white/70 transition-colors block leading-tight"
                    >
                      {detail.value}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-8 pt-4">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/fennecprods?igsh=dDM2Nno3Nm0wcnJi" },
                { icon: Linkedin, label: "LinkedIn", href: "https://ly.linkedin.com/in/munther-elsaddig" },
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Fennec-Productions/61582344225077/" }
              ].map((social, i) => (
                <a key={`social-${i}`} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group cursor-pointer">
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
