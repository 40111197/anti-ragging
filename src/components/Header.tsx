import React, { useState } from 'react';
import { Shield, ShieldAlert, Lock, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavClick: (tab: 'dashboard' | 'track' | 'panic') => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick, activeTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavClick('dashboard')}>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200">
            <Shield className="h-5 w-5" />
            <ShieldAlert className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 text-amber-400 animate-bounce" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Campus<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Shield</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">Safety & Reporting Portal</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => onNavClick('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavClick('track')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'track'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Track Incident
          </button>
          <button
            onClick={() => onNavClick('panic')}
            className="px-4 py-2 rounded-lg text-sm font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all duration-200 flex items-center gap-1.5 animate-pulse"
          >
            <span className="h-2 w-2 rounded-full bg-rose-600 inline-block"></span>
            Emergency Alert
          </button>
        </nav>

        {/* Encryption Banner & Action */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center space-x-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wide uppercase flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Secure 256-Bit Session
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-inner animate-in slide-in-from-top duration-200">
          <button
            onClick={() => {
              onNavClick('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              onNavClick('track');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === 'track' ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
            }`}
          >
            Track Incident
          </button>
          <button
            onClick={() => {
              onNavClick('panic');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-rose-600 bg-rose-50 flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-rose-600"></span>
            🚨 Emergency / Panic Alert
          </button>
          <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-center">
            <div className="flex items-center space-x-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-semibold uppercase flex items-center gap-1">
                <Lock className="h-3 w-3" />
                256-Bit Encrypted
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
