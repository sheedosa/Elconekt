import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SmoothImage } from "../components/ui/SmoothImage";
import { MetadataLabel } from "../components/ui/MetadataLabel";

const Portfolio = () => {
  const { t } = useTranslation();
  const projects = [
    { title: t('portfolio.p1_title'), type: t('portfolio.type_doc'), status: t('portfolio.status_in_dev'), thumbnail: "/images/portfolio-thumb.jpg", reel: "01", scene: "12", take: "04" },
    { title: t('portfolio.p2_title'), type: t('portfolio.type_comm'), status: t('portfolio.status_post'), thumbnail: "/images/portfolio-thumb.jpg", reel: "02", scene: "08", take: "01" },
    { title: t('portfolio.p3_title'), type: t('portfolio.type_short'), status: t('portfolio.status_in_dev'), thumbnail: "/images/portfolio-thumb.jpg", reel: "01", scene: "45", take: "12" },
    { title: t('portfolio.p4_title'), type: t('portfolio.type_music'), status: t('portfolio.status_post'), thumbnail: "/images/portfolio-thumb.jpg", reel: "03", scene: "22", take: "02" },
    { title: t('portfolio.p5_title'), type: t('portfolio.type_brand'), status: t('portfolio.status_in_dev'), thumbnail: "/images/portfolio-thumb.jpg", reel: "04", scene: "01", take: "09" },
    { title: t('portfolio.p6_title'), type: t('portfolio.type_doc'), status: t('portfolio.status_post'), thumbnail: "/images/portfolio-thumb.jpg", reel: "01", scene: "67", take: "03" },
  ];

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-b border-gray-900">
      <MetadataLabel text={t('portfolio.tag')} rec />
      <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tighter">{t('portfolio.title')}</h2>
      <p className="text-white/60 mb-16 max-w-2xl text-lg font-light leading-relaxed">
        {t('portfolio.desc')}
      </p>
      
      <div className="relative">
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 text-center rounded-sm">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white mb-2">{t('portfolio.incoming')}</h3>
            <p className="text-white/50 font-mono text-xs uppercase tracking-widest">{t('portfolio.updating')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 opacity-30 blur-sm pointer-events-none select-none">
          {projects.map((p, i) => (
            <motion.div 
              key={`portfolio-${i}`} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/40 mb-3 border-b border-white/10 pb-2">
                <div className="flex gap-4">
                  <span>{t('portfolio.roll')} <span className="text-white/70">{p.reel}</span></span>
                  <span>{t('portfolio.scene')} <span className="text-white/70">{p.scene}</span></span>
                  <span>{t('portfolio.take')} <span className="text-white/70">{p.take}</span></span>
                </div>
                <span className="px-2 py-0.5 rounded-full border border-white/20 text-white/40">
                  {p.status}
                </span>
              </div>

              <div className="relative overflow-hidden aspect-video mb-5 cursor-pointer">
                <div className="block">
                  <SmoothImage 
                    src={p.thumbnail} 
                    alt={p.title} 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer" 
                    className="w-full h-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-wider">{p.title}</h4>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">{p.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Works() {
  return (
    <div className="pt-20">
      <Portfolio />
    </div>
  );
}
