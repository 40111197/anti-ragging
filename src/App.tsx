import { useState } from 'react';
import { Header } from './components/Header';
import { QuickReport } from './components/QuickReport';
import { IncidentModal } from './components/IncidentModal';
import { StatusTracker } from './components/StatusTracker';
import { PanicButton } from './components/PanicButton';
import { TrustBadges } from './components/TrustBadges';
import type { Complaint } from './mockData';
import { ShieldCheck, Sparkles, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'track' | 'panic'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<string | null>(null);
  
  // Local session cache of complaints created by the user in this active session
  const [sessionComplaints, setSessionComplaints] = useState<Record<string, Complaint>>({});
  const [searchId, setSearchId] = useState<string>('');

  const handleReportSelect = (type: string) => {
    setPreselectedType(type);
    setIsModalOpen(true);
  };

  const handleIncidentSubmitSuccess = (newComplaint: Complaint) => {
    // Add to session cache so it is searchable in the tracker
    setSessionComplaints(prev => ({
      ...prev,
      [newComplaint.id]: newComplaint
    }));
    
    // Auto-focus this ID and transition the view to the tracking tab
    setSearchId(newComplaint.id);
    setIsModalOpen(false);
    setActiveTab('track');
  };

  const handleClearSearchId = () => {
    setSearchId('');
  };

  const navigateToTab = (tab: 'dashboard' | 'track' | 'panic') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalSessionReports = Object.keys(sessionComplaints).length;

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-blue-600/10 selection:text-blue-600">
      {/* Sticky Header */}
      <Header onNavClick={navigateToTab} activeTab={activeTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-8">
        
        {/* Navigation router views */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Content (Col span 2) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Glassmorphic Hero Banner */}
              <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/10">
                {/* Decorative background grid and shapes */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>

                <div className="relative space-y-4 max-w-lg">
                  <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>Campus Anti-Retaliation System Active</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                    Empowering Student Safety. <br />
                    <span className="text-sky-300">Protected Identity.</span> Safe Campus.
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    CampusShield is the institutional safe space. Submit incident logs regarding safety, bullying, or threat items with fully encrypted de-identified protections.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-white text-blue-600 font-extrabold text-xs sm:text-sm shadow-md hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      File Secure Report <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => navigateToTab('track')}
                      className="px-5 py-2.5 rounded-xl bg-blue-500/30 border border-blue-400/30 text-white font-bold text-xs sm:text-sm hover:bg-blue-500/40 transition-all cursor-pointer"
                    >
                      Check Case Status
                    </button>
                  </div>
                </div>
              </section>

              {/* Quick Incident categories */}
              <QuickReport onReportSelect={handleReportSelect} />

              {/* Session Reports Queue */}
              {totalSessionReports > 0 && (
                <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs animate-in slide-in-from-bottom duration-300">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Active Session Reports ({totalSessionReports})
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Temporary Browser Cache</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.values(sessionComplaints).map((report) => (
                      <div
                        key={report.id}
                        className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-blue-100 hover:bg-white transition-all flex justify-between items-start cursor-pointer group"
                        onClick={() => {
                          setSearchId(report.id);
                          navigateToTab('track');
                        }}
                      >
                        <div className="space-y-1.5 min-w-0">
                          <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            {report.id}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 truncate mt-1">
                            {report.type} at {report.location}
                          </h4>
                          <p className="text-[10px] text-slate-400">
                            Logged: {new Date(report.datetime).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                            {report.status}
                          </span>
                          <span className="text-[9px] font-semibold text-blue-500 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            Track <ArrowRight className="h-2.5 w-2.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Content (Col span 1) */}
            <div className="space-y-6 lg:sticky lg:top-20">
              {/* Prominent pulsing Panic Alert widget */}
              <PanicButton />

              {/* Security Resource Center */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" /> Support Resources
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-left">
                    <h4 className="text-xs font-bold text-slate-800">Campus Counselling Center</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Need private mental health care or crisis counselling? Strict non-disclosure verified.
                    </p>
                    <a href="tel:+15551234567" className="text-[10px] font-bold text-blue-600 hover:underline block pt-1">
                      📞 Call Counselor: +1 (555) 123-4567
                    </a>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-left">
                    <h4 className="text-xs font-bold text-slate-800">Hostel Safe Zones</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Safe rooms are staffed 24/7 with automatic electronic lockouts. Location: Block A Warden office, Block C common entrance.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-4 text-[11px] text-blue-900/90 leading-relaxed text-left flex items-start space-x-2">
                  <ShieldAlert className="h-4.5 w-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Anonymity Pledge:</strong> We collect zero analytical cookies, session trackers, or canvas fingerprints. Safe access is guaranteed.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'track' && (
          <StatusTracker
            initialSearchId={searchId}
            onClearSearchId={handleClearSearchId}
            activeComplaints={sessionComplaints}
          />
        )}

        {activeTab === 'panic' && (
          <div className="max-w-xl mx-auto w-full py-8">
            <PanicButton />
          </div>
        )}

      </main>

      {/* Trust Badges & Footer */}
      <TrustBadges />

      {/* Incident Modal Form Overlay */}
      <IncidentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPreselectedType(null);
        }}
        preselectedType={preselectedType}
        onSubmitSuccess={handleIncidentSubmitSuccess}
      />
    </div>
  );
}

export default App;
