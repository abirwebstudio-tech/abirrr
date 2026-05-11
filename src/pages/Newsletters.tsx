import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reportService } from '../services/firebaseService';
import { generateImpactReportPDF } from '../lib/pdfGenerator';

export default function Newsletters() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = reportService.getReports(setReports);
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return (
    <div className="pt-32 pb-24 bg-primary min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-secondary mb-12 transition-colors">
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Newspaper className="text-secondary" size={24} />
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">Audit Archive</span>
            </div>
            <h1 className="text-6xl md:text-9xl text-white font-display uppercase tracking-tighter skew-x-[-6deg] leading-none">
              Trust & <br/><span className="text-secondary italic">Transparency</span>.
            </h1>
            <p className="text-white/40 max-w-xl font-medium text-lg leading-relaxed">
              Access our archive of newsletters and impact reports. We believe in absolute clarity regarding every signature and mission we undertake across Bangladesh.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-10 skew-x-[-6deg] w-full md:w-auto">
            <div className="space-y-4">
              <h4 className="font-display text-2xl text-white uppercase leading-none">Join the <span className="text-secondary">Dispatch</span></h4>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Monthly mission updates to your inbox.</p>
              <Link to="/#footer">
                <button className="w-full bg-secondary text-primary py-4 skew-x-[-3deg] font-display text-xl uppercase hover:bg-white transition-all">
                  Sign Up Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-10 skew-x-[-2deg] hover:bg-white/[0.05] hover:border-secondary/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-[0.3em]">{n.tag}</span>
                <span className="text-[8px] font-bold uppercase text-white/20 tracking-widest">{n.date}</span>
              </div>
              
              <div className="space-y-4 mb-10">
                <h3 className="text-3xl font-display uppercase text-white leading-tight group-hover:text-secondary transition-colors">{n.title}</h3>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-loose">{n.desc}</p>
              </div>

              <button 
                onClick={() => generateImpactReportPDF(n)}
                className="w-full py-5 border border-white/10 text-white font-display text-xl uppercase skew-x-[-6deg] flex items-center justify-center gap-3 group-hover:bg-white group-hover:text-primary transition-all"
              >
                Download PDF <Download size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="py-24 text-center border border-dashed border-white/10 skew-x-[-3deg]">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Archive currently locked for audit</span>
          </div>
        )}
      </div>
    </div>
  );
}
