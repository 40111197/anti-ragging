import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Clock, UserCheck, History, Activity, CheckCircle2 } from 'lucide-react';
import type { Complaint } from '../mockData';
import { mockComplaints } from '../mockData';

interface StatusTrackerProps {
  initialSearchId: string;
  onClearSearchId: () => void;
  activeComplaints: Record<string, Complaint>;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({
  initialSearchId,
  onClearSearchId,
  activeComplaints,
}) => {
  const [searchId, setSearchId] = useState('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Combine default pre-seeded complaints with any newly generated in-session ones
  const database = { ...mockComplaints, ...activeComplaints };

  useEffect(() => {
    if (initialSearchId) {
      setSearchId(initialSearchId);
      handleSearch(initialSearchId);
    }
  }, [initialSearchId, activeComplaints]);

  const handleSearch = (idToSearch: string) => {
    const cleanId = idToSearch.trim();
    if (!cleanId) {
      setErrorMsg('Please enter a valid Complaint ID.');
      setComplaint(null);
      setHasSearched(true);
      return;
    }

    const match = database[cleanId];
    if (match) {
      setComplaint(match);
      setErrorMsg('');
    } else {
      setComplaint(null);
      setErrorMsg(`No secure report found matching "${cleanId}".`);
    }
    setHasSearched(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchId);
  };

  const resetTracker = () => {
    setSearchId('');
    setComplaint(null);
    setHasSearched(false);
    setErrorMsg('');
    onClearSearchId();
  };

  const stages = [
    { name: 'Submitted', key: 'Submitted' as const, label: '1. Incident Logged' },
    { name: 'Under Review', key: 'Under Review' as const, label: '2. Investigation' },
    { name: 'Action Taken', key: 'Action Taken' as const, label: '3. Action Dispatched' },
    { name: 'Closed', key: 'Closed' as const, label: '4. Case Resolved' },
  ];

  const getStageIndex = (status: Complaint['status']) => {
    return stages.findIndex((s) => s.key === status);
  };

  const getSeverityBadgeColor = (severity: Complaint['severity']) => {
    if (severity === 'High') return 'bg-rose-50 text-rose-700 border-rose-100';
    if (severity === 'Medium') return 'bg-amber-50 text-amber-700 border-amber-100';
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  };

  return (
    <section className="py-6 space-y-6">
      {/* Overview */}
      <div className="flex flex-col space-y-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Secure Tracking</span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Track Complaint Status</h2>
        <p className="text-sm text-slate-500">
          Enter your 14-character private Complaint ID to check real-time updates and investigator feedback.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. CS-2026-00482"
              className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm font-semibold tracking-wide text-slate-800 placeholder-slate-400 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Demo Quick-fill Buttons */}
        {!hasSearched && (
          <div className="mt-4 p-4 rounded-xl border border-blue-50 bg-blue-50/20 text-center">
            <p className="text-xs text-slate-500 font-medium">Quick Demo: Click a pre-seeded ID to test the status flow</p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <button
                onClick={() => { setSearchId('CS-2026-00482'); handleSearch('CS-2026-00482'); }}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer shadow-2xs"
              >
                CS-2026-00482 (Under Review)
              </button>
              <button
                onClick={() => { setSearchId('CS-2026-09123'); handleSearch('CS-2026-09123'); }}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer shadow-2xs"
              >
                CS-2026-09123 (Action Taken)
              </button>
              <button
                onClick={() => { setSearchId('CS-2026-00112'); handleSearch('CS-2026-00112'); }}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer shadow-2xs"
              >
                CS-2026-00112 (Closed)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search Result display */}
      {hasSearched && errorMsg && (
        <div className="max-w-xl mx-auto rounded-2xl bg-rose-50 border border-rose-100 p-5 text-center space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="inline-flex p-3 rounded-full bg-rose-100 text-rose-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-rose-800">{errorMsg}</h3>
          <p className="text-xs text-rose-600/80 leading-relaxed max-w-sm mx-auto">
            To guard data privacy, database engines fail silently for invalid hashes. Double check spelling or select one of our demo seeds above.
          </p>
          <button
            onClick={resetTracker}
            className="text-xs font-bold text-blue-600 underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {hasSearched && complaint && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-in fade-in duration-300">
          
          {/* Timeline & Flow Tracker (Col Span 2) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/85 bg-white p-6 shadow-xs space-y-6">
            
            {/* Visual Stepper */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
                <Activity className="h-4.5 w-4.5 text-blue-600" /> Progress Timeline
              </h3>

              {/* Horizontal Stepper (Desktop) */}
              <div className="hidden sm:flex items-center justify-between relative py-4">
                {/* Connecting lines */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                  style={{ width: `${(getStageIndex(complaint.status) / (stages.length - 1)) * 100}%` }}
                ></div>

                {stages.map((stage, idx) => {
                  const isActive = getStageIndex(complaint.status) >= idx;
                  const isCurrent = getStageIndex(complaint.status) === idx;

                  return (
                    <div key={stage.key} className="flex flex-col items-center relative z-10 w-1/4 text-center">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isCurrent
                            ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100 scale-110'
                            : isActive
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        {isActive && !isCurrent ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="text-xs font-bold">{idx + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-bold mt-2.5 ${
                          isCurrent ? 'text-blue-600' : isActive ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        {stage.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Vertical Stepper (Mobile) */}
              <div className="flex sm:hidden flex-col space-y-4 relative pl-6 py-2">
                <div className="absolute left-[11px] top-4 bottom-4 w-1 bg-slate-100 z-0"></div>
                <div 
                  className="absolute left-[11px] top-4 w-1 bg-blue-500 z-0 transition-all duration-500"
                  style={{ height: `${(getStageIndex(complaint.status) / (stages.length - 1)) * 100}%` }}
                ></div>

                {stages.map((stage, idx) => {
                  const isActive = getStageIndex(complaint.status) >= idx;
                  const isCurrent = getStageIndex(complaint.status) === idx;

                  return (
                    <div key={stage.key} className="flex items-center space-x-3 relative z-10">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 flex-shrink-0 ${
                          isCurrent
                            ? 'bg-blue-600 border-blue-600 text-white ring-2 ring-blue-100'
                            : isActive
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-blue-600' : isActive ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Investigator Action Logs */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <History className="h-4.5 w-4.5 text-blue-600" /> Administrative Logs
              </h3>

              <div className="space-y-4">
                {complaint.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="h-2 w-2 rounded-full bg-blue-500 block ring-4 ring-blue-50"></span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{event.stage}</span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border px-2 py-0.5 rounded-full">
                          {new Date(event.timestamp).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-500 bg-slate-50/50 p-3 rounded-xl border border-slate-100/80">
                        {event.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Sidebar Panel */}
          <div className="rounded-2xl border border-slate-200/85 bg-white p-6 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Report Info</h3>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100">
                  {complaint.id}
                </span>
              </div>

              {/* Status parameters */}
              <div className="space-y-4 text-xs font-medium text-slate-600">
                
                {/* Category */}
                <div className="flex justify-between items-center">
                  <span>Incident Category:</span>
                  <span className="font-bold text-slate-800">{complaint.type}</span>
                </div>

                {/* Date-time */}
                <div className="flex justify-between items-start">
                  <span>Reported On:</span>
                  <span className="font-bold text-slate-800 text-right">
                    {new Date(complaint.datetime).toLocaleString(undefined, {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>

                {/* Location */}
                <div className="flex justify-between items-center">
                  <span>Location:</span>
                  <span className="font-bold text-slate-800">{complaint.location}</span>
                </div>

                {/* Severity */}
                <div className="flex justify-between items-center">
                  <span>Severity Level:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadgeColor(complaint.severity)}`}>
                    {complaint.severity}
                  </span>
                </div>

                {/* Anonymity */}
                <div className="flex justify-between items-center">
                  <span>Reporting Profile:</span>
                  <span className={`font-bold flex items-center gap-1 ${complaint.anonymous ? 'text-blue-600' : 'text-slate-800'}`}>
                    {complaint.anonymous ? '🔒 Anonymous' : '👤 Signed Account'}
                  </span>
                </div>

                {/* Officer Allocation */}
                <div className="border-t border-slate-100 pt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Assigned Investigator</span>
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {complaint.assignedOfficer || 'Dean Welfare Board (Interim Allocation)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated response box */}
            <div className="border-t border-slate-100 pt-5 mt-5">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100/50 p-4 space-y-3">
                <div className="flex items-center space-x-2 text-blue-800">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Est. Response Time</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-extrabold text-blue-700">{complaint.estimatedResponse}</span>
                </div>
                <p className="text-[10px] leading-relaxed text-blue-800/80">
                  * Response timers are determined by severity priority. Emergency dispatches operate instantly.
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={resetTracker}
                  className="flex-1 px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer text-center"
                >
                  Track Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
