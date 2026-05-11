import { motion } from 'motion/react';
import { Heart, Shovel, ShieldCheck, Users, Target, Rocket } from 'lucide-react';

const VALUES = [
  { title: 'Compassion', desc: 'At our heart lies an unwavering commitment to the suffering, guided by grace and empathy.', icon: Heart },
  { title: 'Transparency', desc: 'Every penny is a prayer entrusted to us. We honor that trust with radical openness.', icon: ShieldCheck },
  { title: 'Service', desc: 'We lead by serving. To be a part of Alpha Omega is to be a servant to the underserved.', icon: Shovel },
  { title: 'Unity', desc: 'We bridge denominations and divides, working as one body for a common good.', icon: Users },
];

export default function AboutUs() {
  return (
    <div className="bg-surface">
      {/* Header Section */}
      <section className="pt-40 pb-20 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white">Serving Bangladesh <br />Since <span className="text-secondary font-bold">2008</span>.</h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              From a small community gathering to a nationwide network of support, our journey is defined by the lives transformed along the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 space-y-6"
        >
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
            <Target className="text-secondary w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary">Our Mission</h2>
          <p className="text-primary/70 leading-relaxed italic">
            "To empower the marginalized communities of Bangladesh through holistic support, quality education, and sustainable development, reflecting the unconditional love of service."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-primary text-white p-12 rounded-[3rem] shadow-xl space-y-6"
        >
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <Rocket className="text-secondary w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">Our Vision</h2>
          <p className="text-white/80 leading-relaxed italic">
            "To see a transformed Bangladesh where every child is educated, every family is food-secure, and every community thrives in health and dignity."
          </p>
        </motion.div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl text-primary font-serif">The Values We Breathe.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-gray-100 hover:border-secondary transition-all hover:shadow-2xl text-center"
              >
                <div className="w-16 h-16 bg-surface rounded-full mx-auto flex items-center justify-center mb-6 group-hover:bg-secondary transition-all">
                  <value.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-sm text-primary/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl text-center text-primary font-serif mb-16">Our Journey Through Time</h2>
          <div className="space-y-12 relative before:absolute before:left-[-20px] md:before:left-1/2 before:w-px before:bg-gray-100 before:h-full">
            {[
              { year: '2008', title: 'The Seed is Sown', desc: 'Alpha Omega begins as a small prayer and aid group in a single village.' },
              { year: '2012', title: 'First School Opens', desc: 'The Bridge Academy is established to serve children of river erosion victims.' },
              { year: '2018', title: 'Nationwide Network', desc: 'Expanding to 12 divisions with specialized healthcare and farming wings.' },
              { year: '2026', title: 'Alpha Omega Today', desc: 'Impacted over 50,000 lives through technology and community service.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 group`}
              >
                <div className="w-full md:w-1/2 md:text-right group-odd:md:text-right group-even:md:text-left">
                  <div className={`p-8 bg-white rounded-3xl shadow-sm border border-gray-100 ${i % 2 === 0 ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'} transition-transform`}>
                    <span className="text-2xl font-bold text-secondary mb-2 block">{item.year}</span>
                    <h4 className="text-lg font-serif font-bold text-primary mb-2">{item.title}</h4>
                    <p className="text-sm text-primary/60">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 top-10 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-lg z-10" />
                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
