import { motion } from 'motion/react';
import { Users, HandHelping, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Volunteer() {
  return (
    <section className="py-24 px-6 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-none overflow-hidden relative min-h-[600px] flex items-center skew-x-[-3deg]">
          {/* Decorative image overlay */}
          <div className="absolute inset-0 opacity-10 grayscale brightness-0">
            <img 
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover"
              alt="Community service"
            />
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 p-12 md:p-24 scale-[1.03]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block">Call to Action</span>
              <h2 className="text-6xl md:text-8xl text-primary leading-none select-none">
                JOIN THE <br/>
                <span className="text-secondary italic font-serif lowercase">movement</span>.
              </h2>
              <p className="text-primary/60 text-lg leading-snug font-serif italic border-l-2 border-secondary/30 pl-8">
                Your skills are the engine of our impact. Become a catalyst for change in the lives of many.
              </p>
              
              <Link to="/volunteer-form">
                <button className="bg-primary text-secondary px-12 py-6 font-display text-2xl uppercase hover:bg-secondary hover:text-primary transition-all">
                  Apply Now
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center gap-8"
            >
              <div className="flex items-start gap-8 border-b border-primary/10 pb-8 group">
                <div className="text-4xl font-display text-secondary">01</div>
                <div>
                  <h4 className="text-xl font-display uppercase text-primary mb-2">FIELD OPS</h4>
                  <p className="text-[10px] text-primary/40 uppercase font-bold tracking-widest leading-relaxed">Direct engagement with communities in need across Bangladesh.</p>
                </div>
              </div>
              <div className="flex items-start gap-8 border-b border-primary/10 pb-8 group">
                <div className="text-4xl font-display text-secondary">02</div>
                <div>
                  <h4 className="text-xl font-display uppercase text-primary mb-2">DIGITAL ADVOCACY</h4>
                  <p className="text-[10px] text-primary/40 uppercase font-bold tracking-widest leading-relaxed">Amplifying stories of resilience to a global audience from anywhere.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
