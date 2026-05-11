import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Newspaper, Archive, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reportService } from '../../services/firebaseService';

export default function StayInformed() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const unsub = reportService.getReports((data) => {
      setReports(data.slice(0, 3)); // Only show latest 3
    });
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Archive className="text-secondary" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Trust & Transparency</span>
            </div>
            <h2 className="font-display text-5xl md:text-8xl text-white uppercase tracking-tighter skew-x-[-6deg] leading-none">
              Stay <span className="text-secondary">Informed</span>
            </h2>
            <p className="text-white/60 font-medium text-lg leading-relaxed max-w-xl">
              Access our archive of newsletters and impact reports to stay connected with the difference your support makes. Transparency is our core signature.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link to="/newsletters" className="bg-secondary text-primary px-10 py-5 font-display text-2xl uppercase skew-x-[-6deg] hover:bg-white hover:text-secondary transition-all flex items-center justify-center gap-3">
                Access Archive <Newspaper size={24} />
              </Link>
              <Link to="/about" className="bg-white/5 border border-white/10 px-10 py-5 text-white font-display text-2xl uppercase skew-x-[-6deg] hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3">
                Our Mission 
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-4 ml-2">Recent Dispatches</h3>
            </div>
            {reports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center justify-between p-8 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all skew-x-[-2deg]"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-secondary group-hover:text-primary transition-all border border-white/5">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-display text-xl uppercase tracking-tight group-hover:text-secondary transition-colors">{report.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-secondary">{report.tag}</span>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">•</span>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{report.date}</span>
                    </div>
                  </div>
                </div>
                <Link to="/newsletters" className="text-white/20 hover:text-secondary transition-colors">
                  <ExternalLink size={18} />
                </Link>
              </motion.div>
            ))}
            {reports.length === 0 && (
              <div className="py-12 text-center border border-dashed border-white/10 skew-x-[-3deg]">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">No recent reports logged</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
