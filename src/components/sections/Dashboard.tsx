import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HelpCircle, AlertTriangle, TrendingDown, Users } from 'lucide-react';

const POVERTY_DATA = [
  { name: 'Rural', value: 26.4 },
  { name: 'Urban', value: 18.9 },
];

const DIVISION_DATA = [
  { name: 'Rangpur', value: 47 },
  { name: 'Mymensingh', value: 32 },
  { name: 'Rajshahi', value: 29 },
  { name: 'Dhaka', value: 16 },
  { name: 'Chittagong', value: 18 },
];

const STREET_CHILDREN_CAUSES = [
  { name: 'Poverty', value: 45 },
  { name: 'Family Separation', value: 25 },
  { name: 'Abuse', value: 15 },
  { name: 'Disaster', value: 15 },
];

const COLORS = ['#F27D26', '#FFFFFF', '#444444', '#222222'];

export default function Dashboard() {
  return (
    <section className="py-32 px-6 bg-primary border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block">Data Disclosure '26</span>
            <h2 className="text-6xl md:text-8xl leading-none select-none">
              THE <span className="text-secondary italic font-serif lowercase">scale</span> OF<br/>
              CRISIS <span className="text-white/20 outline-text">2026.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed">
            Understanding the data behind the struggle is the first step toward effective change. These metrics guide our resource allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
          {/* Chart 1: Division Poverty */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-12 border-b md:border-r border-white/10 flex flex-col h-[500px]"
          >
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Poverty by Division (%)</h3>
              <TrendingDown size={14} className="text-white/20" />
            </div>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DIVISION_DATA}>
                  <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} tick={{ fill: '#444' }} />
                  <Bar dataKey="value" fill="#F27D26" radius={0} barSize={40} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#000', border: 'none', fontSize: '10px' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Chart 2: Street Children Causes */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-12 border-b lg:border-r border-white/10 flex flex-col h-[500px]"
          >
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Drivers of Displacement</h3>
              <AlertTriangle size={14} className="text-white/20" />
            </div>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STREET_CHILDREN_CAUSES}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {STREET_CHILDREN_CAUSES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {STREET_CHILDREN_CAUSES.map((item, i) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">{item.name}</span>
                  <span className="text-lg font-display text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stat Cards Column */}
          <div className="grid grid-cols-1 divide-y divide-white/10 h-[500px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-12 flex flex-col justify-center"
            >
              <span className="text-secondary text-[10px] font-bold uppercase tracking-widest block mb-4">Urgent Metric</span>
              <h4 className="text-7xl font-display text-white italic">1.5M+</h4>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-2">Street Children in Crisis</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-12 flex flex-col justify-center bg-white/5"
            >
              <span className="text-secondary text-[10px] font-bold uppercase tracking-widest block mb-4">Literacy Gap</span>
              <h4 className="text-7xl font-display text-white">58.9%</h4>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-2">Female Literacy Rate (Rural)</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
