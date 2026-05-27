import React from 'react';
import { ShieldCheck, EyeOff, LockKeyhole } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 border-t border-slate-200/60 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Badge 1: Encryption */}
          <div className="flex items-center space-x-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-100 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">End-to-End Encrypted</h3>
              <p className="text-xs text-slate-500 mt-0.5">Complaints and evidence files are secured using zero-knowledge 256-bit encryption.</p>
            </div>
          </div>

          {/* Badge 2: Retaliation */}
          <div className="flex items-center space-x-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-100 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Zero Retaliation Policy</h3>
              <p className="text-xs text-slate-500 mt-0.5">Full protection under strict institutional anti-reprisal directives.</p>
            </div>
          </div>

          {/* Badge 3: Privacy */}
          <div className="flex items-center space-x-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-100 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <EyeOff className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Identity Protected</h3>
              <p className="text-xs text-slate-500 mt-0.5">Your network metadata is stripped. Report completely anonymously by default.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/50 pt-6 text-center sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} CampusShield Security Network. All rights reserved.
          </p>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Compliance Verified</span>
            <span className="mx-1">&bull;</span>
            <span className="cursor-pointer hover:text-slate-600 transition-colors">Privacy Policy</span>
            <span className="mx-1">&bull;</span>
            <span className="cursor-pointer hover:text-slate-600 transition-colors">Terms of Safe Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};
