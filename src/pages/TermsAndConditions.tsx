import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-primary pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-secondary mb-12 transition-colors">
          <ArrowLeft size={14} /> Back to Mission
        </Link>

        <div className="flex items-center gap-6 mb-16">
          <div className="w-16 h-16 bg-secondary flex items-center justify-center skew-x-[-6deg]">
            <FileText size={32} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-5xl md:text-7xl text-white uppercase tracking-tighter skew-x-[-6deg]">
              Terms of <span className="text-secondary">Mission</span>
            </h1>
            <p className="text-xs text-white/20 font-bold uppercase tracking-widest mt-2 ml-1">The foundation of our commitment</p>
          </div>
        </div>

        <div className="space-y-12 text-white/60 font-medium leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-white font-display text-2xl uppercase tracking-tight">1. Acceptance</h2>
            <p>By engaging with Alpha Omega Inter Church Trust platforms, you agree to these operational terms designed to protect the integrity of our charitable outreach.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-display text-2xl uppercase tracking-tight">2. Donations</h2>
            <p>All contributions processed through this platform are dedicated to our initiatives across Bangladesh. While we strive for absolute accuracy in reporting, donations are generally non-refundable once committed to active ground projects.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-display text-2xl uppercase tracking-tight">3. Conduct</h2>
            <p>Our Community Voices and Volunteer sectors are spaces for constructive engagement. We reserve the right to remove feedback that contradicts our core values of peace and inter-church unity.</p>
          </section>

          <div className="p-8 border border-secondary/20 bg-secondary/5 skew-x-[-2deg]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Updated: May 2026 • AOICT Trust Board</p>
          </div>
        </div>
      </div>
    </div>
  );
}
