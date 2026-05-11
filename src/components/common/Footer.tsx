import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { newsletterService } from '../../services/firebaseService';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await newsletterService.subscribe(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-primary text-white pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        {/* Brand */}
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://aotrustbd.org/NewLogo.png" 
              alt="Alpha Omega Logo" 
              className="h-10 w-auto object-contain brightness-0 invert" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-display uppercase leading-none tracking-tight">Alpha Omega</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary">Trusted Welfare</span>
            </div>
          </Link>
          <p className="text-white/40 leading-snug text-sm font-serif italic">
            Alpha Omega Inter Church Trust is dedicated to serving the underserved communities of Bangladesh through education, health, and holistic support.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all grayscale hover:grayscale-0">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Directories</h4>
          <ul className="space-y-4 text-white/50 text-xs font-bold uppercase tracking-widest">
            {['About Us', 'Campaigns', 'News Letters', 'Volunteer Form', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition-colors">
                  {item === 'Volunteer Form' ? 'Volunteering' : item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Contact</h4>
          <ul className="space-y-6 text-white/50 text-xs font-bold uppercase tracking-widest">
            <li className="flex items-start gap-4">
              <MapPin size={14} className="text-secondary shrink-0" />
              <span className="leading-tight">123 Unity Road,<br/>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={14} className="text-secondary shrink-0" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={14} className="text-secondary shrink-0" />
              <span>contact@aotrust.org</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Dispatch</h4>
          <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-6 leading-relaxed">Stay updated with our latest impact stories and mission updates.</p>
          
          {status === 'success' ? (
            <div className="p-4 border border-secondary/20 bg-secondary/5 text-center skew-x-[-3deg]">
              <span className="text-[8px] font-bold uppercase tracking-widest text-secondary">Awaiting Dispatch</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                className="bg-transparent border-b border-white/10 py-3 text-[10px] tracking-widest uppercase focus:outline-none focus:border-secondary transition-colors"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-white text-primary py-4 font-display text-lg uppercase hover:bg-secondary transition-colors flex items-center justify-center"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
        <p>© 2026 Alpha Omega Inter Church Trust. All rights reserved.</p>
        <div className="flex gap-10">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
