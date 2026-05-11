import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Heart, 
  Shield, 
  Trash2, 
  ArrowRight, 
  LayoutDashboard, 
  Search,
  Check,
  X,
  History,
  Mail,
  MessageSquare,
  FileText,
  Plus,
  Loader2,
  Download
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { 
  userService, 
  donationService, 
  volunteerService, 
  logService, 
  newsletterService, 
  commentService,
  reportService 
} from '../services/firebaseService';
import { useNavigate } from 'react-router-dom';
import { generateImpactReportPDF } from '../lib/pdfGenerator';

type Tab = 'dashboard' | 'users' | 'donations' | 'volunteers' | 'logs' | 'newsletter' | 'feedback' | 'reports';

export default function Admin() {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [usersList, setUsersList] = useState<any[]>([]);
  const [donationsList, setDonationsList] = useState<any[]>([]);
  const [volunteersList, setVolunteersList] = useState<any[]>([]);
  const [logsList, setLogsList] = useState<any[]>([]);
  const [subscribersList, setSubscribersList] = useState<any[]>([]);
  const [commentsList, setCommentsList] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // New Report Form State
  const [reportForm, setReportForm] = useState({
    title: '',
    date: '',
    tag: 'Impact Report',
    desc: '',
    content: ''
  });
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [showAddReport, setShowAddReport] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || (role !== 'super-admin' && role !== 'sub-admin')) {
        navigate('/');
      }
    }
  }, [user, role, loading, navigate]);

  useEffect(() => {
    if (role === 'super-admin' || role === 'sub-admin') {
      const unsubUsers = userService.getUsers(setUsersList);
      const unsubDonations = donationService.getAllDonations(setDonationsList);
      const unsubVolunteers = volunteerService.getVolunteers(setVolunteersList);
      const unsubLogs = logService.getLogs(setLogsList);
      const unsubSubscribers = newsletterService.getSubscribers(setSubscribersList);
      const unsubComments = commentService.getComments(setCommentsList);
      const unsubReports = reportService.getReports(setReportsList);
      return () => {
        unsubUsers();
        unsubDonations();
        unsubVolunteers();
        unsubLogs();
        unsubSubscribers();
        unsubComments();
        unsubReports();
      };
    }
  }, [role]);

  const handleAddReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReport(true);
    try {
      await reportService.addReport(reportForm);
      setReportForm({ title: '', date: '', tag: 'Impact Report', desc: '', content: '' });
      setShowAddReport(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const totalDonations = donationsList.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="min-h-screen bg-primary pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block">Command Center</span>
            <h1 className="text-6xl md:text-8xl leading-none select-none text-white">
              ADMIN <br/>
              <span className="text-secondary italic font-serif lowercase">terminal</span>.
            </h1>
          </div>

          <div className="flex bg-white/5 p-1 skew-x-[-12deg] overflow-x-auto max-w-full">
            {(['dashboard', 'users', 'donations', 'volunteers', 'logs', 'newsletter', 'feedback', 'reports'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-display uppercase transition-all whitespace-nowrap ${activeTab === tab ? 'bg-secondary text-primary' : 'text-white/40 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-white/10">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-10 space-y-4">
                <Users className="text-secondary" size={20} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Operatives</h3>
                <div className="text-5xl font-display text-white">{usersList.length}</div>
              </div>
              <div className="p-10 space-y-4 bg-white/[0.02]">
                <Heart className="text-secondary" size={20} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Impact Fund</h3>
                <div className="text-5xl font-display text-white">${totalDonations.toLocaleString()}</div>
              </div>
              <div className="p-10 space-y-4">
                <Mail className="text-secondary" size={20} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Subscribers</h3>
                <div className="text-5xl font-display text-white">{subscribersList.length}</div>
              </div>
              <div className="p-10 space-y-4 bg-white/[0.02]">
                <MessageSquare className="text-secondary" size={20} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Voices</h3>
                <div className="text-5xl font-display text-white">{commentsList.length}</div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-12">
              <div className="mb-12 relative max-w-md">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input 
                  type="text" 
                  placeholder="SEARCH USERS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-transparent border-b border-white/10 focus:border-secondary transition-all text-white font-bold uppercase text-xs tracking-widest outline-none"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Identity</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Clearance</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20 text-right">Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {usersList.filter(u => u.email?.toLowerCase().includes(searchTerm.toLowerCase())).map((targetUser) => (
                      <tr key={targetUser.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 border border-white/10 p-1">
                              <img src={targetUser.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + targetUser.id} className="w-full h-full object-cover grayscale" />
                            </div>
                            <div>
                              <div className="text-white font-display uppercase">{targetUser.displayName || 'Anonymous'}</div>
                              <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{targetUser.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-8">
                          <div className="flex gap-2">
                            {(['super-admin', 'sub-admin', 'user'] as const).map((r) => {
                              // Sub-admin restrictions:
                              // - Cannot touch super-admin users
                              // - Cannot promote anyone to super-admin
                              // - Cannot change other sub-admins' roles (only super-admin can)
                              const isSelf = targetUser.id === user?.uid;
                              const subAdminRestricted = role === 'sub-admin' && (
                                targetUser.role === 'super-admin' ||
                                r === 'super-admin' ||
                                (targetUser.role === 'sub-admin' && !isSelf)
                              );
                              return (
                                <button
                                  key={r}
                                  onClick={() => {
                                    if (subAdminRestricted) return;
                                    userService.updateUserRole(targetUser.id, r);
                                  }}
                                  disabled={subAdminRestricted}
                                  title={subAdminRestricted ? 'Permission denied' : `Set role to ${r}`}
                                  className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest border transition-all ${
                                    subAdminRestricted
                                      ? 'opacity-20 cursor-not-allowed border-white/5 text-white/10'
                                      : targetUser.role === r
                                        ? 'bg-secondary border-secondary text-primary'
                                        : 'border-white/10 text-white/20 hover:border-white/30'
                                  }`}
                                >
                                  {r.replace('-admin', '')}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-8 text-right">
                          {/* Trash icon: hidden if sub-admin trying to delete super-admin or another sub-admin */}
                          {!(targetUser.id === user?.uid) && !(role === 'sub-admin' && (targetUser.role === 'super-admin' || targetUser.role === 'sub-admin')) && (
                            <button 
                              onClick={() => {
                                if (window.confirm('TERMINATE OPERATIVE?')) userService.deleteUser(targetUser.id);
                              }}
                              className="p-3 text-white/10 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                          {/* Super-admin cannot be resigned by themselves (permanent) */}
                          {targetUser.id === user?.uid && targetUser.role !== 'super-admin' && (
                            <button 
                              onClick={() => {
                                if (window.confirm('REMOVE YOURSELF AS ADMIN?')) userService.updateUserRole(targetUser.id, 'user');
                              }}
                              className="ml-2 text-[8px] font-bold uppercase tracking-widest text-secondary underline underline-offset-4"
                            >
                              Resign
                            </button>
                          )}
                          {/* Sub-admin viewing their own row — allow self-resign */}
                          {targetUser.id === user?.uid && targetUser.role === 'sub-admin' && (
                            <span className="ml-2 text-[8px] font-bold uppercase tracking-widest text-white/20">YOU</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="p-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Contributor ID</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Magnitude</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Cycle</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {donationsList.map((donation) => (
                      <tr key={donation.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-8">
                          <span className="text-[10px] font-mono text-white/40">{donation.userId}</span>
                        </td>
                        <td className="py-8">
                          <span className="text-2xl font-display text-white">${donation.amount}</span>
                        </td>
                        <td className="py-8">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{donation.type}</span>
                        </td>
                        <td className="py-8 text-right flex items-center justify-end gap-6">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                            {donation.createdAt?.toDate?.() ? donation.createdAt.toDate().toLocaleDateString() : 'PENDING'}
                          </span>
                          {(role === 'super-admin' || role === 'sub-admin') && (
                            <button 
                              onClick={async () => {
                                if (window.confirm('WIPE TRANSACTION DATA?')) {
                                  await donationService.deleteDonation(donation.id);
                                }
                              }}
                              className="text-white/10 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'volunteers' && (
            <div className="p-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Candidate</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Skillset</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {volunteersList.map((v) => (
                      <tr key={v.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-8">
                          <div className="text-white font-display uppercase">{v.name}</div>
                          <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{v.email}</div>
                          <div className="text-[10px] text-secondary font-bold uppercase tracking-widest">{v.phone}</div>
                        </td>
                        <td className="py-8">
                          <div className="max-w-md text-[10px] text-white/60 font-bold uppercase tracking-widest leading-relaxed line-clamp-3">
                            {v.skills}
                          </div>
                        </td>
                        <td className="py-8 text-right">
                          <button 
                            onClick={async () => {
                              if (window.confirm('WIPE APPLICATION?')) {
                                await volunteerService.deleteVolunteer(v.id);
                              }
                            }}
                            className="p-3 text-white/10 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'logs' && (
            <div className="p-12">
              <div className="space-y-4">
                {logsList.map((log) => (
                  <div key={log.id} className="p-6 border border-white/5 hover:border-white/20 transition-all bg-white/[0.02]">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <History size={14} className="text-secondary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Action Log</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/20">
                        {log.timestamp?.toDate?.() ? log.timestamp.toDate().toLocaleString() : 'JUST NOW'}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-secondary">{log.adminName}</span>
                        <span className="text-[10px] font-bold uppercase text-white/30 tracking-widest">•</span>
                        <span className="text-[10px] font-bold uppercase text-white tracking-widest">{log.action}</span>
                      </div>
                      <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                        {log.details}
                      </div>
                    </div>
                  </div>
                ))}

                {logsList.length === 0 && (
                  <div className="text-center py-24 border border-dashed border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">No activity recorded</span>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'newsletter' && (
            <div className="p-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Subscriber</th>
                      <th className="pb-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20 text-right">Enlisted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {subscribersList.map((s) => (
                      <tr key={s.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-6">
                          <div className="text-white font-bold uppercase text-xs tracking-widest">{s.email}</div>
                        </td>
                        <td className="py-6 text-right flex items-center justify-end gap-6">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                            {s.subscribedAt?.toDate?.() ? s.subscribedAt.toDate().toLocaleDateString() : 'JUST NOW'}
                          </span>
                          <button 
                            onClick={async () => {
                              if (window.confirm('REMOVE SUBSCRIBER?')) {
                                await newsletterService.deleteSubscriber(s.id);
                              }
                            }}
                            className="text-white/10 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'feedback' && (
            <div className="p-12">
              <div className="space-y-6">
                {commentsList.map((c) => (
                  <div key={c.id} className="p-8 border border-white/5 bg-white/[0.02] flex justify-between items-start skew-x-[-2deg]">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/20">
                        {c.userAvatar ? <img src={c.userAvatar} className="w-full h-full object-cover grayscale" /> : <Users size={20} className="text-white/20" />}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-display uppercase">{c.userName}</span>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">
                            {c.createdAt?.toDate?.() ? c.createdAt.toDate().toLocaleString() : 'JUST NOW'}
                          </span>
                        </div>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-relaxed">{c.content}</p>
                      </div>
                    </div>
                    <button 
                      onClick={async () => {
                        if (window.confirm('DELETE VOICE?')) {
                          await commentService.deleteComment(c.id);
                        }
                      }}
                      className="text-white/10 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="p-12">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-white font-display text-2xl uppercase">Impact Reports</h2>
                <button 
                  onClick={() => setShowAddReport(!showAddReport)}
                  className="bg-white text-primary px-6 py-3 font-display text-lg uppercase skew-x-[-6deg] hover:bg-secondary transition-all flex items-center gap-2"
                >
                  {showAddReport ? <X size={18} /> : <Plus size={18} />}
                  {showAddReport ? 'Cancel' : 'New Report'}
                </button>
              </div>

              {showAddReport && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mb-12 p-8 border border-white/10 bg-white/[0.02]"
                >
                  <form onSubmit={handleAddReport} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Report Title</label>
                      <input 
                        required
                        value={reportForm.title}
                        onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
                        className="w-full bg-white/5 border-b border-white/10 py-3 text-white font-bold uppercase text-xs tracking-widest outline-none focus:border-secondary"
                        placeholder="E.G. WINTER IMPACT REPORT 2026"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Report Date</label>
                      <input 
                        required
                        value={reportForm.date}
                        onChange={(e) => setReportForm({...reportForm, date: e.target.value})}
                        className="w-full bg-white/5 border-b border-white/10 py-3 text-white font-bold uppercase text-xs tracking-widest outline-none focus:border-secondary"
                        placeholder="E.G. MARCH 2026"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Category Tag</label>
                      <select 
                        value={reportForm.tag}
                        onChange={(e) => setReportForm({...reportForm, tag: e.target.value})}
                        className="w-full bg-white/5 border-b border-white/10 py-3 text-white font-bold uppercase text-xs tracking-widest outline-none focus:border-secondary"
                      >
                        <option value="Impact Report">Impact Report</option>
                        <option value="Audit Report">Audit Report</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Annual Review">Annual Review</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Brief Description</label>
                      <input 
                        required
                        value={reportForm.desc}
                        onChange={(e) => setReportForm({...reportForm, desc: e.target.value})}
                        className="w-full bg-white/5 border-b border-white/10 py-3 text-white font-bold uppercase text-xs tracking-widest outline-none focus:border-secondary"
                        placeholder="SHORT SUMMARY FOR LISTING"
                      />
                    </div>
                    <div className="space-y-4 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Full Content (FOR PDF GENERATION)</label>
                      <textarea 
                        required
                        value={reportForm.content}
                        onChange={(e) => setReportForm({...reportForm, content: e.target.value})}
                        className="w-full h-48 bg-white/5 border border-white/10 p-6 text-white font-bold uppercase text-xs tracking-widest outline-none focus:border-secondary resize-none"
                        placeholder="ENTER DETAILED REPORT CONTENT..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button 
                        type="submit"
                        disabled={isSubmittingReport}
                        className="w-full bg-white text-primary py-5 font-display text-2xl uppercase skew-x-[-3deg] hover:bg-secondary transition-all flex items-center justify-center gap-3"
                      >
                        {isSubmittingReport ? <Loader2 className="animate-spin" /> : <Shield size={20} />}
                        Log and Generate Report Protocol
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="space-y-4">
                {reportsList.map((report) => (
                  <div key={report.id} className="p-8 border border-white/5 bg-white/[0.02] flex items-center justify-between skew-x-[-2deg] group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-secondary group-hover:text-primary transition-all">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="text-white font-display text-2xl uppercase">{report.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{report.tag}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">•</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">{report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => generateImpactReportPDF(report)}
                        className="text-white/20 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                      >
                        Preview PDF <Download size={16} />
                      </button>
                      <button 
                        onClick={async () => {
                          if (window.confirm('WIPE REPORT?')) {
                            await reportService.deleteReport(report.id);
                          }
                        }}
                        className="text-white/10 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
