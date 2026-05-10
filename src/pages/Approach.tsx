import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MetadataLabel } from "../components/ui/MetadataLabel";

const ServicesSection = () => {
  const { t } = useTranslation();
  const steps = [
    { num: t('approach.stages.s1'), title: t('approach.stages.s1_title'), desc: t('approach.stages.s1_desc') },
    { num: t('approach.stages.s2'), title: t('approach.stages.s2_title'), desc: t('approach.stages.s2_desc') },
    { num: t('approach.stages.s3'), title: t('approach.stages.s3_title'), desc: t('approach.stages.s3_desc') },
    { num: t('approach.stages.s4'), title: t('approach.stages.s4_title'), desc: t('approach.stages.s4_desc') },
    { num: t('approach.stages.s5'), title: t('approach.stages.s5_title'), desc: t('approach.stages.s5_desc') },
    { num: t('approach.stages.s6'), title: t('approach.stages.s6_title'), desc: t('approach.stages.s6_desc') },
  ];

  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <MetadataLabel text={t('approach.tag')} />
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tighter">{t('approach.title')}</h2>
        <p className="text-white/70 mb-12 md:mb-20 text-lg max-w-2xl font-light">{t('approach.desc')}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={`step-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col gap-2 group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mb-2 group-hover:border-white transition-colors">
                 <span className="font-mono text-xs text-white">{i + 1}</span>
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">{step.title}</span>
              <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
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
