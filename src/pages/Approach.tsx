import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MetadataLabel } from "../components/ui/MetadataLabel";

const ServicesSection = () => {
  const { t } = useTranslation();
  const steps = [
    { title: t('approach.stages.s1_title'), desc: t('approach.stages.s1_desc') },
    { title: t('approach.stages.s2_title'), desc: t('approach.stages.s2_desc') },
    { title: t('approach.stages.s3_title'), desc: t('approach.stages.s3_desc') },
    { title: t('approach.stages.s4_title'), desc: t('approach.stages.s4_desc') },
    { title: t('approach.stages.s5_title'), desc: t('approach.stages.s5_desc') },
    { title: t('approach.stages.s6_title'), desc: t('approach.stages.s6_desc') },
  ];

  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-gray-900 bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <MetadataLabel text={t('approach.tag')} />
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6">{t('approach.title')}</h2>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest rtl:tracking-normal rtl:font-sans">
            {t('approach.desc')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute ltr:left-[3.25rem] rtl:right-[3.25rem] top-0 bottom-0 hidden md:block">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 0 }}
              className="w-px h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent"
            />
          </div>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <motion.div
                key={`step-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-0 md:gap-10 py-10 md:py-12 border-b border-white/5 last:border-0"
              >
                {/* Step number + dot */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3 w-24 rtl:items-end">
                  <div className="hidden md:flex w-3 h-3 rounded-full border border-white/30 bg-black group-hover:border-white group-hover:bg-white transition-all duration-300 mt-1 relative z-10" />
                  <span className="font-mono text-[10px] text-white/20 group-hover:text-white/60 transition-colors tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 ltr:pl-2 rtl:pr-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-white/70 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  {/* Description reveals on hover */}
                  <p className="text-sm text-white/40 font-light leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-in-out rtl:font-sans">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-40 transition-opacity duration-300 ltr:ml-4 rtl:mr-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" className="text-white rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 10h12M10 4l6 6-6 6"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default function Approach() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  );
}
