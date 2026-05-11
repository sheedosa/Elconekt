import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { SmoothImage } from "../components/ui/SmoothImage";
import { MetadataLabel } from "../components/ui/MetadataLabel";

const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MetadataLabel text={t('about_page.tag')} />
          <h2 className="text-3xl font-bold mb-8 tracking-tighter">{t('about_page.title')}</h2>
          <p className="text-xl md:text-3xl font-light leading-relaxed text-white mb-8">{t('about_page.subtitle')}</p>
          <div className="text-white space-y-6 text-lg">
              <p>{t('about_page.p1')}</p>
              <p>{t('about_page.p2')}</p>
              <p>{t('about_page.p3')}</p>
              <p className="border-t border-gray-800 pt-6 mt-6 italic">{t('about_page.p4')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <SmoothImage 
            src="/images/about-new.jpg" 
            alt="Fennec Production Set" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default function About() {
  return (
    <div className="pt-20">
      <AboutSection />
    </div>
  );
}
