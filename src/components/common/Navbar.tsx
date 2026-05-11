import { useState, useEffect } from 'react';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../lib/auth';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, role, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-primary/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="https://aotrustbd.org/NewLogo.png" 
            alt="Alpha Omega Logo" 
            className="h-10 w-auto object-contain brightness-0 invert" 
          />
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-display uppercase leading-none tracking-tight",
              isScrolled || location.pathname !== '/' ? 'text-white' : 'text-white'
            )}>
              Alpha Omega
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary">Trusted Welfare</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-secondary",
                "text-white/60 hover:tracking-[0.3em]"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          {role && role !== 'user' && (
            <Link
              to="/admin"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary hover:tracking-[0.3em] transition-all"
            >
              Admin
            </Link>
          )}
          
          <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-10">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 group cursor-pointer">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-secondary" 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User size={16} className="text-primary" />
                    </div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white hidden lg:inline">
                    {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                </Link>
                <button 
                  onClick={() => logout()}
                  className="p-2 rounded-full hover:bg-white/5 text-white transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="px-6 py-2 text-[10px] uppercase font-bold tracking-widest text-white border border-white/20 hover:bg-white hover:text-primary transition-all">
                  Login
                </button>
              </Link>
            )}
            <Link to="/donate">
              <button className="bg-secondary hover:bg-secondary/90 text-primary px-8 py-2 font-display text-lg uppercase transition-all shadow-lg shadow-secondary/10 whitespace-nowrap">
                Donate
              </button>
            </Link>
          </div>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-0 left-0 right-0 h-screen bg-primary z-[60] p-8 flex flex-col items-center justify-center gap-12 md:hidden"
          >
            <button 
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display uppercase text-white hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {role && role !== 'user' && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display uppercase text-secondary hover:text-white transition-colors"
                >
                  Admin
                </Link>
              )}
              {user && (
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display uppercase text-white hover:text-secondary transition-colors"
                >
                  Profile
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              {!user && (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-5 border border-white/20 text-white font-display text-xl uppercase">
                    Login
                  </button>
                </Link>
              )}
              <Link to="/donate" onClick={() => setIsOpen(false)}>
                <button className="w-full py-5 bg-secondary text-primary font-display text-xl uppercase">
                  Donate Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
