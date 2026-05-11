import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Loader2, Quote, User } from 'lucide-react';
import { commentService } from '../../services/firebaseService';
import { useAuth } from '../../lib/auth';
import { Link } from 'react-router-dom';

export default function CommunityVoices() {
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = commentService.getComments(setComments);
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await commentService.addComment(
        newComment, 
        user.displayName || user.email || 'Fellow Disciple',
        user.photoURL || ''
      );
      setNewComment('');
    } catch (error) {
      console.error(error);
      alert('Failed to share. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-surface/30 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-secondary" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Voices of Faith</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-white uppercase tracking-tighter skew-x-[-6deg] leading-none mb-8">
              Community <span className="text-secondary">Voices</span>
            </h2>
            <p className="text-white/40 font-medium text-lg leading-relaxed max-w-xl mb-12">
              Share your thoughts, prayers, and feedback with our global community. Your encouragement fuels our front-line operations.
            </p>

            {user ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="SHARE YOUR VOICE / আপনার মন্তব্য লিখুন"
                  className="w-full h-32 bg-white/5 border border-white/10 p-6 text-white text-xs font-bold uppercase tracking-widest outline-none focus:border-secondary transition-all skew-x-[-2deg] resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="bg-white text-primary px-12 py-5 font-display text-xl uppercase skew-x-[-6deg] hover:bg-secondary transition-all disabled:opacity-50 flex items-center gap-3"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  Dispatch Thought
                </button>
              </form>
            ) : (
              <div className="p-8 border border-white/5 bg-white/[0.02] skew-x-[-3deg]">
                <p className="text-[10px] font-bold uppercase text-white/40 tracking-widest mb-4">You must sign in to join the conversation</p>
                <Link to="/login" className="text-secondary text-xs font-bold uppercase tracking-widest hover:underline">
                  Authenticate Now →
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute -top-12 -right-12 text-white/5 select-none">
              <Quote size={200} />
            </div>
            
            <div className="space-y-6 relative z-10">
              <AnimatePresence mode="popLayout">
                {comments.slice(0, 3).map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 bg-white/5 border border-white/10 skew-x-[-3deg] hover:border-secondary/30 transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {comment.userAvatar ? (
                        <img src={comment.userAvatar} className="w-10 h-10 rounded-full border border-secondary" alt="" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary">
                          <User size={16} className="text-secondary" />
                        </div>
                      )}
                      <div>
                        <div className="text-white font-display text-lg tracking-tight uppercase">{comment.userName}</div>
                        <div className="text-[8px] text-white/20 font-bold uppercase tracking-[0.2em] mt-0.5">
                          {comment.createdAt?.toDate?.() ? comment.createdAt.toDate().toLocaleDateString() : 'JUST NOW'}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                      "{comment.content}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {comments.length === 0 && (
                <div className="py-24 text-center border border-dashed border-white/10 opacity-20">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Silence of Peace</span>
                </div>
              )}

              {comments.length > 3 && (
                <Link to="/comments" className="inline-block text-[10px] font-bold uppercase tracking-widest text-secondary hover:translate-x-2 transition-transform">
                  View full archive / সব দেখুন →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
