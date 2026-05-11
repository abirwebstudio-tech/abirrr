import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sprout, Droplets, Stethoscope, Heart, ArrowRight, ShieldCheck, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_CAMPAIGNS = [
  {
    title: 'Education for All',
    desc: 'Empowering children with kits, tuition, and digital literacy tools across rural Bangladesh.',
    impact: '5,000+ Students',
    goal: '$50,000',
    raised: '$32,500',
    progress: 65,
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80',
    color: 'text-blue-500'
  },
  {
    title: 'Sustainable Farming',
    desc: 'Providing seeds, irrigation, and training to small-scale farmers in the northern chars.',
    impact: '1,200 Families',
    goal: '$30,000',
    raised: '$21,000',
    progress: 70,
    icon: Sprout,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
    color: 'text-green-600'
  },
  {
    title: 'Clean Water Initiative',
    desc: 'Building deep tube wells and rainwater harvesting systems in salt-affected coastal blocks.',
    impact: '150 Communities',
    goal: '$45,000',
    raised: '$12,000',
    progress: 26,
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80',
    color: 'text-cyan-500'
  }
];

export default function Campaigns() {
  return (
    <div className="pt-32 pb-24 bg-primary min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[180px] rounded-full translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 space-y-8">
          <div className="flex items-center gap-4">
            <Target className="text-secondary" size={24} />
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">Ground Operations</span>
          </div>
          <h1 className="text-6xl md:text-9xl text-white font-display uppercase tracking-tighter skew-x-[-6deg] leading-none">
            Our <br/><span className="text-secondary italic">Initiatives</span>.
          </h1>
          <p className="text-white/40 max-w-2xl font-medium text-xl leading-relaxed">
            Explore our ongoing projects and witness how your support transforms lives on the ground across Bangladesh. Mission in Action.
          </p>
        </div>

        <div className="grid gap-24">
          {ALL_CAMPAIGNS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 group"
            >
              <div className="relative overflow-hidden h-[400px] lg:h-[600px] border border-white/5 skew-x-[-2deg]">
                <img src={c.image} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt={c.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
                <div className="absolute top-8 left-8">
                  <div className="w-16 h-16 bg-secondary flex items-center justify-center skew-x-[-6deg] shadow-2xl">
                    <c.icon size={32} className="text-primary" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-10">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">{c.impact} REACHED</span>
                  <h2 className="text-4xl md:text-6xl font-display text-white uppercase leading-none skew-x-[-3deg]">{c.title}</h2>
                  <p className="text-white/60 text-lg leading-relaxed">{c.desc}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Funding Progress</div>
                      <div className="text-3xl font-display text-white">{c.progress}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Target Goal</div>
                      <div className="text-xl font-display text-secondary">{c.goal}</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/5 border border-white/10 skew-x-[-12deg] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-secondary"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to="/donate" className="flex-1">
                    <button className="w-full bg-white text-primary py-6 font-display text-2xl uppercase skew-x-[-6deg] hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-3">
                      Fund Project <Heart size={20} />
                    </button>
                  </Link>
                  <Link to="/newsletters" className="flex-1">
                    <button className="w-full bg-white/5 border border-white/10 text-white py-6 font-display text-2xl uppercase skew-x-[-6deg] hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3">
                      Impact Log <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
