import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-primary pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-secondary mb-12 transition-colors">
          <ArrowLeft size={14} /> Back to Mission
        </Link>

        <div className="flex items-center gap-6 mb-16">
          <div className="w-16 h-16 bg-secondary flex items-center justify-center skew-x-[-6deg]">
            <ShieldCheck size={32} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-5xl md:text-7xl text-white uppercase tracking-tighter skew-x-[-6deg]">
              Privacy <span className="text-secondary">Policy</span>
            </h1>
            <p className="text-xs text-white/20 font-bold uppercase tracking-widest mt-2 ml-1">Guardian of your trust</p>
          </div>
        </div>

        <div className="space-y-12 text-white/60 font-medium leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-white font-display text-2xl uppercase tracking-tight">Focus on Integrity</h2>
            <p>At Alpha Omega Inter Church Trust, we value your privacy as much as your partnership. This policy outlines how we handle the signatures and data you provide while supporting our ground operations across Bangladesh.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/5 bg-white/[0.02]">
              <h3 className="text-secondary font-display text-xl uppercase mb-4">Data Collection</h3>
              <p className="text-sm">We only collect essential information needed for donations, volunteer coordination, and newsletter updates. This includes names, emails, and transaction IDs.</p>
            </div>
            <div className="p-8 border border-white/5 bg-white/[0.02]">
              <h3 className="text-secondary font-display text-xl uppercase mb-4">Usage</h3>
              <p className="text-sm">Your data is strictly used for mission-critical communication and audit logs. We do not sell or trade your information with any third-party entities.</p>
            </div>
          </div>

          <section className="space-y-4 border-t border-white/10 pt-12">
            <h2 className="text-white font-display text-2xl uppercase tracking-tight">Contact</h2>
            <p>For any privacy-related inquiries or to request data removal, please contact our audit team at privacy@alphaomega-trust.org</p>
          </section>
        </div>
      </div>
    </div>
  );
}
