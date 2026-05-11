import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Users } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    title: 'Outreach & Awareness',
    desc: 'Identifying vulnerable communities and assessing urgent needs for immediate intervention.',
    icon: Users
  },
  {
    title: 'Empowerment & Training',
    desc: 'Providing targeted education and vocational skills to foster long-term self-reliance.',
    icon: CheckCircle2
  },
  {
    title: 'Sustain & Scale',
    desc: 'Setting up local infrastructure that thrives independently and inspires neighbors.',
    icon: ShieldCheck
  }
];

export default function AboutBrief() {
  return (
    <section className="py-32 px-6 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block">Our Core Mission</span>
            <h2 className="text-6xl md:text-8xl leading-none select-none">
              DIGNITY <br/>
              FOR <span className="text-secondary italic font-serif lowercase">all</span>.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed font-serif italic border-l-2 border-secondary/30 pl-8">
              "We believe that every child deserves a chance to thrive. Our work is an investment in human dignity."
            </p>
            <div className="space-y-6 text-white/60 text-sm leading-relaxed max-w-lg uppercase tracking-widest font-bold">
              <p>
                From remote river islands to urban slums, our footprint is guided by hope.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative -skew-x-6"
          >
            <div className="relative z-10 overflow-hidden border-8 border-primary grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
                className="w-full h-[600px] object-cover scale-110"
                alt="Our mission in action"
              />
            </div>
            {/* Magazine label */}
            <div className="absolute -bottom-8 -right-8 bg-secondary text-primary p-8 font-display text-4xl uppercase skew-x-12">
              Impact '26
            </div>
          </motion.div>
        </div>

        {/* 3-Step Journey Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-24 border-t border-white/5">
          {JOURNEY_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group p-10 border border-white/5 hover:border-white/20 transition-all skew-x-[-3deg]"
            >
              <div className="text-secondary font-display text-2xl mb-8">0{i + 1}</div>
              <h4 className="text-2xl font-display uppercase text-white mb-4 group-hover:text-secondary transition-colors">{step.title}</h4>
              <p className="text-xs text-white/40 uppercase tracking-[0.1em] leading-relaxed font-bold">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
