import { motion } from 'motion/react';
import { BookOpen, Sprout, Droplets, Stethoscope, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CAMPAIGNS = [
  {
    title: 'Education for All',
    desc: 'Empowering children with kits, tuition, and digital literacy tools.',
    impact: '5,000+ Students',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80',
    color: 'bg-blue-500'
  },
  {
    title: 'Sustainable Farming',
    desc: 'Providing seeds, irrigation, and training to small-scale farmers.',
    impact: '1,200 Families',
    icon: Sprout,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
    color: 'bg-green-600'
  },
  {
    title: 'Clean Water Initiative',
    desc: 'Building deep tube wells and rainwater harvesting systems.',
    impact: '150 Communities',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80',
    color: 'bg-cyan-500'
  },
  {
    title: 'Healthcare for All',
    desc: 'Mobile clinics and emergency medical camps for remote islands.',
    impact: '15,000 Patients',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80',
    color: 'bg-rose-500'
  }
];

export default function CampaignsBrief() {
  return (
    <section className="py-32 px-6 bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-secondary" />
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block">Mission in Action</span>
            </div>
            <h2 className="text-6xl md:text-8xl leading-none select-none text-white font-display uppercase tracking-tighter">
              OUR <br/>
              <span className="text-secondary italic">initiatives</span>.
            </h2>
            <p className="text-white/40 font-medium text-lg leading-relaxed max-w-xl">
              Explore our ongoing projects and witness how your support transforms lives on the ground across Bangladesh.
            </p>
          </div>
          <Link to="/campaigns">
            <button className="px-12 py-6 bg-white text-primary font-display text-2xl uppercase skew-x-[-6deg] hover:bg-secondary hover:text-white transition-all flex items-center gap-3">
              View All Missions <ArrowRight size={24} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPAIGNS.map((campaign, i) => (
            <motion.div
              key={campaign.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[500px] border border-white/10 overflow-hidden skew-x-[-2deg]"
            >
              <img 
                src={campaign.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                alt={campaign.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">{campaign.impact}</span>
                <h3 className="text-3xl font-display uppercase text-white mb-3 leading-tight">{campaign.title}</h3>
                <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest leading-relaxed mb-6">
                  {campaign.desc}
                </p>
                
                <Link to="/donate">
                  <button className="w-full bg-secondary text-primary py-4 font-display text-lg uppercase flex items-center justify-center gap-2 hover:bg-white transition-all">
                    Support Mission
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
