import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, User, Users, Lock, Unlock, CheckCircle2, Copy, Check, ExternalLink } from 'lucide-react';
import { EvidenceLocker } from './EvidenceLocker';
import type { UploadedFile } from './EvidenceLocker';
import type { Complaint } from '../mockData';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedType: string | null;
  onSubmitSuccess: (newComplaint: Complaint) => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({
  isOpen,
  onClose,
  preselectedType,
  onSubmitSuccess,
}) => {
  const [incidentType, setIncidentType] = useState('Bullying');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('Classroom');
  const [description, setDescription] = useState('');
  const [peopleInvolved, setPeopleInvolved] = useState('');
  const [witnessDetails, setWitnessDetails] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [anonymous, setAnonymous] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  // Submit Success States
  const [submitting, setSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);
  const [copied, setCopied] = useState(false);

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedType) {
      setIncidentType(preselectedType);
    }
  }, [preselectedType]);

  useEffect(() => {
    // Reset form states on close
    if (!isOpen) {
      setDateTime('');
      setDescription('');
      setPeopleInvolved('');
      setWitnessDetails('');
      setSeverity('Medium');
      setAnonymous(true);
      setUploadedFiles([]);
      setCreatedComplaint(null);
      setSubmitting(false);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!dateTime) newErrors.dateTime = 'Please pick the date & time of the incident.';
    if (!description || description.trim().length < 15) {
      newErrors.description = 'Please write a detailed description (minimum 15 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    // Simulate 2-second cryptographic compilation & submission
    setTimeout(() => {
      const generatedId = `CS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const newReport: Complaint = {
        id: generatedId,
        type: incidentType,
        datetime: dateTime,
        location,
        description,
        peopleInvolved: peopleInvolved.trim() || undefined,
        witnessDetails: witnessDetails.trim() || undefined,
        severity,
        anonymous,
        status: 'Submitted',
        estimatedResponse: '24 Hours',
        assignedOfficer: 'Officer Pending Allocation',
        timeline: [
          {
            stage: 'Submitted',
            timestamp: new Date().toISOString(),
            note: anonymous 
              ? 'Anonymous report received. Sender encryption keys loaded, IP headers scrubbed from server cache.'
              : `Report received from verified student account. Contact details restricted to Dean authorized personnel.`
          }
        ],
        evidenceFiles: uploadedFiles.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type
        }))
      };

      setCreatedComplaint(newReport);
      setSubmitting(false);
    }, 1800);
  };

  const copyIdToClipboard = () => {
    if (createdComplaint) {
      navigator.clipboard.writeText(createdComplaint.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-100 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
              <span>🛡️</span> New Incident Report
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Secure, encrypted connection verified.</p>
          </div>
          {!createdComplaint && !submitting && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Dynamic Overlay Success/Submitting Panel */}
        {submitting && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 animate-spin border-4 border-blue-100 border-t-blue-600"></div>
            <h3 className="text-lg font-bold text-slate-800">Scrubbing Metadata & Encrypting...</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              We are sealing your records using AES-256 local keys, sanitizing IP routing headers, and creating a decentralized hash for anonymity tracking.
            </p>
          </div>
        )}

        {createdComplaint && (
          <div className="flex flex-col items-center justify-center py-10 px-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-100">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">Incident Reported Successfully</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your report has been received and securely logged. To ensure your absolute protection, this system does not store cookies or browser logins associated with this complaint.
              </p>
            </div>

            {/* Generated ID Box */}
            <div className="w-full max-w-md rounded-2xl bg-slate-50 border border-slate-200/80 p-5 space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Private Complaint ID</span>
              <div className="flex items-center justify-center space-x-2.5">
                <span className="text-2xl font-extrabold tracking-wider text-blue-600 font-mono">
                  {createdComplaint.id}
                </span>
                <button
                  onClick={copyIdToClipboard}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    copied 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  title="Copy Complaint ID"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-3 text-[11px] leading-relaxed text-amber-800 flex items-start space-x-2 text-left">
                <span className="text-sm">⚠️</span>
                <p>
                  <strong>CRITICAL:</strong> Please write down or copy this ID now. Because your report is strictly <strong>anonymous</strong>, campus administrators cannot recover this ID for you if lost.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                onClick={() => onSubmitSuccess(createdComplaint)}
                className="flex-1 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Track Status <ExternalLink className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Form Body */}
        {!createdComplaint && !submitting && (
          <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto max-h-[75vh] px-6 py-5 space-y-6">
            
            {/* Secures and Anonymous Toggle Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border bg-slate-50/50">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl border transition-colors ${
                  anonymous 
                    ? 'bg-blue-50 border-blue-100 text-blue-600' 
                    : 'bg-amber-50 border-amber-100 text-amber-600'
                }`}>
                  {anonymous ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {anonymous ? 'Submit Anonymously (Default)' : 'Submit Signed Report'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {anonymous 
                      ? 'Your institutional identity, email, and IP address will be completely stripped.' 
                      : 'Your verified student account will be linked. Allows direct, secured chat logs.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAnonymous(!anonymous)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                  anonymous ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    anonymous ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* General Fields Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Incident Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Incident Category</label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25"
                >
                  <option value="Ragging">Ragging</option>
                  <option value="Bullying">Bullying</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Drug Abuse">Drug Abuse</option>
                  <option value="Threat/Violence">Threat / Violence</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>

              {/* Date & Time Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Incident Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  max={new Date().toISOString().slice(0, 16)}
                  onChange={(e) => setDateTime(e.target.value)}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 ${
                    errors.dateTime ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.dateTime && <p className="text-[10px] font-bold text-rose-500">{errors.dateTime}</p>}
              </div>

              {/* Location Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Campus Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25"
                >
                  <option value="Classroom">Classroom / Main Academic Block</option>
                  <option value="Hostel">Hostel Block / Common Rooms</option>
                  <option value="Canteen">Canteen / Dining Area</option>
                  <option value="Library">Central Library</option>
                  <option value="Sports Grounds">Sports Complex / Playground</option>
                  <option value="Other">Other Area</option>
                </select>
              </div>

              {/* Severity selection */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Incident Severity Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { level: 'Low' as const, label: 'Low Severity', color: 'border-emerald-200 text-emerald-700 bg-emerald-50/20 active:bg-emerald-50 focus:ring-emerald-500/20 hover:border-emerald-400', activeBg: 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/10' },
                    { level: 'Medium' as const, label: 'Medium Severity', color: 'border-amber-200 text-amber-700 bg-amber-50/20 active:bg-amber-50 focus:ring-amber-500/20 hover:border-amber-400', activeBg: 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/10' },
                    { level: 'High' as const, label: 'High Severity', color: 'border-rose-200 text-rose-700 bg-rose-50/20 active:bg-rose-50 focus:ring-rose-500/20 hover:border-rose-400', activeBg: 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500/10' },
                  ].map((sev) => (
                    <button
                      key={sev.level}
                      type="button"
                      onClick={() => setSeverity(sev.level)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        severity === sev.level ? sev.activeBg : `border-slate-200 text-slate-600 hover:bg-slate-50 ${sev.color}`
                      }`}
                    >
                      <span className="text-xs font-bold">{sev.label}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {sev.level === 'Low' && 'Non-physical / Info'}
                        {sev.level === 'Medium' && 'Repetitive / Threat'}
                        {sev.level === 'High' && 'Immediate Danger'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Incident Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Please describe exactly what happened. Include relevant details such as actions, specific classroom numbers, times, and speech. Maintain safety by avoiding naming yourself if reporting anonymously."
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 ${
                  errors.description ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200'
                }`}
              />
              {errors.description && <p className="text-[10px] font-bold text-rose-500">{errors.description}</p>}
            </div>

            {/* Optional Fields Accordion style */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> People Involved (Optional)
                </label>
                <input
                  type="text"
                  value={peopleInvolved}
                  onChange={(e) => setPeopleInvolved(e.target.value)}
                  placeholder="e.g. Unknown male in red cap, senior names"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> Witness Details (Optional)
                </label>
                <input
                  type="text"
                  value={witnessDetails}
                  onChange={(e) => setWitnessDetails(e.target.value)}
                  placeholder="e.g. Canteen server, three bystanders in green shirts"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25"
                />
              </div>
            </div>

            {/* Embedded Evidence Locker */}
            <div className="border-t border-slate-100 pt-5">
              <EvidenceLocker files={uploadedFiles} onFilesChange={setUploadedFiles} />
            </div>

            {/* Form Actions Footer */}
            <div className="border-t border-slate-100 pt-5 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-200 hover:shadow-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <Lock className="h-3.5 w-3.5" /> Submit Encrypted Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
