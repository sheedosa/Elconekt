import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MetadataLabel } from "../components/ui/MetadataLabel";

const ServicesSection = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number | null>(null);

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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <MetadataLabel text={t('approach.tag')} />
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6">{t('approach.title')}</h2>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">
            {t('approach.desc')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[3.25rem] top-0 bottom-0 hidden md:block">
            <div className="w-px h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
          </div>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={`step-${i}`}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`group relative flex items-start gap-0 md:gap-10 py-10 md:py-12 border-b border-white/5 last:border-0 cursor-pointer ${activeStep === i ? 'is-active' : ''}`}
              >
                {/* Step number + dot */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3 w-24">
                  <div className={`hidden md:flex w-3 h-3 rounded-full border border-white/30 bg-black transition-all duration-300 mt-1 relative z-10 ${activeStep === i ? 'border-white bg-white' : 'group-hover:border-white group-hover:bg-white'}`} />
                  <span className={`font-mono text-[10px] transition-colors tracking-widest ${activeStep === i ? 'text-white/60' : 'text-white/20 group-hover:text-white/60'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pl-2">
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter transition-colors duration-300 ${activeStep === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {step.title}
                  </h3>
                  {/* Description reveals on hover or click */}
                  <div 
                    className={`text-sm text-white/40 font-light leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${
                      activeStep === i 
                      ? 'max-h-40 opacity-100 mt-3' 
                      : 'max-h-0 opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:mt-3'
                    }`}
                  >
                    {step.desc}
                  </div>
                </div>

                {/* Arrow */}
                <div className={`flex-shrink-0 self-center transition-all duration-300 ml-4 ${activeStep === i ? 'opacity-100 rotate-90' : 'opacity-0 md:group-hover:opacity-40'}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" className="text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 10h12M10 4l6 6-6 6"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
