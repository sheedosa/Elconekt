import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SmoothImage } from "../components/ui/SmoothImage";
import { MetadataLabel } from "../components/ui/MetadataLabel";

const Viewfinder = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="absolute inset-0 z-30 pointer-events-none p-6 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white/30" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-white/30" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-white/30" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/30" />

      {/* Top HUD */}
      <div className="flex justify-between items-start font-mono text-[10px] tracking-widest text-white/40 uppercase">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            <span className="text-white/80 font-bold">{t('home.onset.roll')}</span>
          </div>
          <p>4K RAW / 24 FPS</p>
        </div>
        <div className="text-center hidden sm:block">
          <p className="text-white/60 mb-1">CENTER FOCUS</p>
          <div className="flex gap-2 justify-center">
            <span className="px-1 border border-white/20">ISO 400</span>
            <span className="px-1 border border-white/20">5600K</span>
          </div>
        </div>
        <div className="text-right">
          <p>CH1 <span className="text-green-500">|||||||||</span></p>
          <p>CH2 <span className="text-green-500">|||||||</span></p>
        </div>
      </div>

      {/* Center Focus Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center opacity-20">
        <div className="w-full h-px bg-white" />
        <div className="h-full w-px bg-white absolute" />
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end font-mono text-[10px] tracking-widest text-white/40 uppercase">
        <div className="space-y-1">
          <p className="text-white/60 font-bold">TC 00:14:23:08</p>
          <p>LUT: FENNEC_LOG_01</p>
        </div>
        <div className="text-right space-y-1">
          <p>BAT 84%</p>
          <p>SSD 1.2TB REM</p>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6 md:p-10 bg-[#050505]">
      {/* Background Image with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 z-10" />
        <motion.div
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="w-full h-full"
        >
          <SmoothImage 
            src="/Fennec-background.jpg" 
            alt="Cinematic background" 
            className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
            fetchPriority="high"
          />
        </motion.div>
        {/* Subtle Film Grain */}
        <div className="absolute inset-0 z-20 film-grain pointer-events-none opacity-[0.08]" />
      </div>

      <Viewfinder />

      <div className="relative z-40 text-center max-w-4xl pt-24 sm:pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.15em" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 text-[10px] sm:text-xs font-mono uppercase mb-4 tracking-[0.5em] rtl:tracking-normal"
        >
          {t('home.trust.tag')}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8 text-white"
        >
          {t('home.hero_quote')}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px bg-white/30 mx-auto mb-8"
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl rtl:font-medium mx-auto max-w-2xl font-light tracking-wide rtl:tracking-normal text-white/70 mb-12"
        >
          {t('home.hero_sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            to="/portfolio"
            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden border border-white/20 transition-all hover:border-white"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-300">
              {t('home.see_work')}
            </span>
          </Link>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-4 text-xs sm:text-sm uppercase font-bold tracking-[0.3em] text-white/60 hover:text-white transition-all"
          >
            {t('nav.contact')}
          </Link>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const clientLogos = [
  "/images/client-0.png",
  "/images/client-1.png",
  "/images/client-2.png",
  "/images/client-3.png",
  "/images/client-4.png",
  "/images/client-5.png",
  "/images/client-6.png",
  "/images/client-7.png",
  "/images/client-8.png",
  "/images/client-9.png",
  "/images/client-10.png"
];

const ClientsGrid = () => {
  const { t } = useTranslation();
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];
  return (
    <section className="py-16 md:py-32 border-b border-gray-900 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center md:text-left rtl:md:text-right">
        <MetadataLabel text={t('home.trust.tag')} />
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tighter text-white">{t('home.trust.title')}</h2>
        <p className="text-white text-sm sm:text-lg max-w-2xl font-light">{t('home.trust.desc')}</p>
      </div>
      
      <div className="overflow-hidden flex relative border-y border-white/5 bg-black py-12" dir="ltr">
        {/* Subtle gradient edges to fade out the scrolling logos */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
        
        <div className="w-fit flex animate-scroll whitespace-nowrap items-center">
          {duplicatedLogos.map((id, i) => (
            <div key={`client-${i}`} className="w-40 sm:w-48 md:w-56 px-8 flex-shrink-0 flex items-center justify-center group">
              <SmoothImage 
                src={id}
                alt={`Client Logo ${i}`}
                decoding="async"
                className="w-full h-auto max-h-16 md:max-h-20 object-contain transition-all duration-500 grayscale invert mix-blend-screen opacity-40 group-hover:opacity-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSnippet = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <MetadataLabel text={t('home.about.tag')} />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">{t('home.about.title')}</h2>
          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10">
            {t('home.about.desc')}
          </p>
          <Link 
            to="/about"
            className="inline-block px-8 py-3 text-xs border border-white/20 text-white uppercase font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all"
          >
            {t('home.about.btn')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const QuoteSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 md:py-40 px-6 border-b border-gray-900 bg-black">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <MetadataLabel text="CORE_PHILOSOPHY" />
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mt-8 rtl:leading-[1.4]"
        >
          {t('home.quote')}
        </motion.h2>
      </div>
    </section>
  );
};

const OnSetGrid = () => {
  const { t } = useTranslation();
  const projects = [
    { title: t('home.onset.p1_title'), thumbnail: "/images/car2.jpg", roll: "A04", scene: "12", take: "01" },
    { title: t('home.onset.p2_title'), thumbnail: "/images/field1.jpg", roll: "B02", scene: "45", take: "03" },
    { title: t('home.onset.p3_title'), thumbnail: "/images/woman3.jpg", roll: "A12", scene: "08", take: "05" },
  ];
  return (
    <section className="bg-black py-20 md:py-32 px-6 border-b border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20 text-center md:text-left rtl:md:text-right">
          <MetadataLabel text={t('home.onset.tag')} />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white">{t('home.onset.title')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={`stills-${i}`} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 mb-2">
                <span>{t('home.onset.roll')} {p.roll}</span>
                <span>{t('home.onset.sc')} {p.scene}</span>
                <span>{t('home.onset.tk')} {p.take}</span>
              </div>
              <div className="overflow-hidden bg-gray-900 aspect-video relative">
                <SmoothImage 
                  src={p.thumbnail} 
                  alt={p.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-white/5 group-hover:border-white/10 transition-colors pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <QuoteSection />
      <ClientsGrid />
      <OnSetGrid />
      <AboutSnippet />
    </>
  );
}
