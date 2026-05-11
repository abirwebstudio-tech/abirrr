import { ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { IMPACT_STATS } from '../../constants';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-primary">
      {/* Background with dramatic overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover grayscale brightness-50"
          alt="Community outreach"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="flex flex-col gap-12">
          {/* Magazine Style Title */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="title-wrapper -skew-x-12"
          >
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Alpha Omega Trust</span>
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] mb-8 select-none">
              BOLD <span className="text-secondary">CHANGE.</span><br/>
              REAL <span className="text-white/20 outline-text">IMPACT.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-md"
            >
              <p className="text-white/60 text-lg leading-snug border-l-2 border-secondary pl-6 mb-8 italic font-serif">
                We empower lives and build sustainable futures across Bangladesh through education, health, and dignity.
                <br/>
                <span className="text-sm mt-4 block text-secondary/50">জীবন ক্ষমতায়ন, টেকসই ভবিষ্যৎ নির্মাণ।</span>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/donate">
                  <button className="bg-secondary text-primary px-8 py-4 md:px-10 md:py-5 rounded-none font-display text-xl md:text-2xl uppercase skew-x-[-12deg] hover:skew-x-0 transition-transform">
                    Start Mission
                  </button>
                </Link>
                <Link to="/volunteer-form">
                  <button className="bg-white text-primary px-8 py-4 md:px-10 md:py-5 rounded-none font-display text-xl md:text-2xl uppercase skew-x-[-12deg] hover:bg-secondary transition-all">
                    Join Team
                  </button>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <button className="w-full border border-white/20 text-white px-8 py-4 md:px-10 md:py-5 rounded-none font-display text-xl md:text-2xl uppercase skew-x-[-12deg] hover:bg-white/10 transition-all">
                    Our Story
                  </button>
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {IMPACT_STATS.slice(0, 2).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (i * 0.1) }}
                  className="bg-white/5 border border-white/10 p-8 skew-x-[-6deg]"
                >
                  <span className="text-secondary text-[10px] font-bold uppercase tracking-widest block mb-2">{stat.label}</span>
                  <div className="text-4xl font-display text-white">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vertical rail text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="writing-mode-vertical rotate-180 text-[10px] font-bold uppercase tracking-[1em] text-white/20">
          Empowering the next generation since 2012
        </div>
      </div>
    </section>
  );
}
