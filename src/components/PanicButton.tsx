import React, { useState, useEffect } from 'react';
import { Siren, ShieldAlert, PhoneCall, Navigation, MapPin, XCircle, HeartHandshake, UserCheck } from 'lucide-react';

export const PanicButton: React.FC = () => {
  const [panicState, setPanicState] = useState<'idle' | 'countdown' | 'dispatched'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [dispatchLog, setDispatchLog] = useState<string>('Sending encrypted distress signal to Campus Security...');
  const [dispatchTime, setDispatchTime] = useState<number>(0);

  // Handle countdown logic
  useEffect(() => {
    let interval: any;
    if (panicState === 'countdown') {
      if (countdown > 0) {
        interval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        setPanicState('dispatched');
        setCountdown(3);
      }
    }
    return () => clearInterval(interval);
  }, [panicState, countdown]);

  // Handle active dispatch log simulations
  useEffect(() => {
    let logInterval: any;
    if (panicState === 'dispatched') {
      setDispatchTime(0);
      setDispatchLog('Encrypted distress signal acknowledged by Admin & Campus Security.');

      logInterval = setInterval(() => {
        setDispatchTime((prev) => {
          const next = prev + 1;
          if (next === 4) {
            setDispatchLog('Emergency responders dispatched from Central Guard Tower. ETA: 2 Mins.');
          } else if (next === 8) {
            setDispatchLog('Security Officer David Lee is en-route to your mapped WiFi node.');
          } else if (next === 15) {
            setDispatchLog('Responders arriving at your location. Look out for Officer David Lee.');
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(logInterval);
  }, [panicState]);

  const triggerPanic = () => {
    setPanicState('countdown');
    setCountdown(3);
  };

  const cancelPanic = () => {
    setPanicState('idle');
    setCountdown(3);
  };

  const markSafe = () => {
    setPanicState('idle');
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-rose-50/50 border border-rose-100 rounded-3xl text-center space-y-5">
      <div className="space-y-1">
        <h3 className="text-sm font-extrabold text-rose-800 uppercase tracking-widest flex items-center justify-center gap-1">
          <Siren className="h-4 w-4 text-rose-600 animate-bounce" /> Campus Emergency Panel
        </h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Facing immediate danger or threat? Hit the Panic Button. This alerts Campus Guards, Wardens, and logs your active WiFi/GPS node.
        </p>
      </div>

      {/* Pulsing Trigger Button */}
      {panicState === 'idle' && (
        <div className="relative flex items-center justify-center h-48 w-48">
          {/* Pulsing concentric rings */}
          <div className="absolute h-40 w-40 rounded-full bg-rose-500/20 border border-rose-500/30 animate-ring-2"></div>
          <div className="absolute h-36 w-36 rounded-full bg-rose-500/35 border border-rose-500/40 animate-ring-1"></div>

          <button
            onClick={triggerPanic}
            className="relative h-28 w-28 rounded-full bg-gradient-to-br from-rose-500 to-red-600 border-4 border-white text-white font-extrabold shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1 group"
          >
            <Siren className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[10px] uppercase tracking-wider font-extrabold">🚨 PANIC</span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold">ALERT</span>
          </button>
        </div>
      )}

      {/* Countdown overlay modal */}
      {panicState === 'countdown' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl bg-white border border-slate-100 p-8 text-center space-y-6 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="relative flex items-center justify-center h-24 w-24 mx-auto rounded-full bg-rose-50 text-rose-600 border border-rose-100 animate-pulse">
              <Siren className="h-10 w-10 text-rose-600 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-rose-600 uppercase tracking-wide">Emergency Countdown</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dispatching active emergency alerts to Campus Police, Academic Dean, and Hostel Wardens in:
              </p>
            </div>

            {/* Countdown seconds indicator */}
            <div className="text-7xl font-black text-slate-800 font-mono tracking-tighter">
              {countdown}s
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-[11px] leading-relaxed text-rose-800 flex items-start space-x-2 text-left">
              <span>⚠️</span>
              <p>
                To avoid false dispatch penalties, click <strong>Cancel Emergency</strong> below if this was an accidental trigger.
              </p>
            </div>

            <button
              onClick={cancelPanic}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <XCircle className="h-4.5 w-4.5" /> CANCEL EMERGENCY
            </button>
          </div>
        </div>
      )}

      {/* Dispatched response dashboard */}
      {panicState === 'dispatched' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md">
          <div className="max-w-lg w-full rounded-3xl bg-white border border-slate-100 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
            
            {/* Dispatch Header */}
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 animate-pulse">
                <Siren className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-black text-rose-600 uppercase tracking-tight">HELP IS ON THE WAY</h3>
                <p className="text-xs text-slate-500 font-semibold">Campus Security dispatch has locked on your position.</p>
              </div>
            </div>

            {/* GPS/WiFi node details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-left">
                <div className="flex items-center space-x-1.5 text-blue-600 mb-1">
                  <Navigation className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">MAPPED Location</span>
                </div>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-rose-500" /> Main Academic Block
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-left">
                <div className="flex items-center space-x-1.5 text-blue-600 mb-1">
                  <UserCheck className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">GPS Status</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Room 205 (WiFi Node #48)
                </p>
              </div>
            </div>

            {/* Security Dispatch status logger */}
            <div className="rounded-2xl border border-rose-100 bg-rose-50/20 p-4 space-y-3">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5" /> LIVE DISPATCH FEED
              </span>
              <p className="text-xs font-bold text-slate-800 leading-relaxed min-h-[36px] bg-white border border-rose-100/50 p-3 rounded-xl shadow-2xs">
                {dispatchLog}
              </p>
              <div className="flex items-center justify-between text-[9px] font-bold text-rose-600 animate-pulse">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-600 block"></span>
                  <span>Active encrypted stream connected...</span>
                </span>
                <span>Elapsed: {dispatchTime}s</span>
              </div>
            </div>

            {/* Contact hotlines list */}
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Hotlines (Click to Call)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <a
                  href="tel:+15559117233"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-1.5">🚨 Campus Police</span>
                  <PhoneCall className="h-3.5 w-3.5 text-blue-600" />
                </a>
                <a
                  href="tel:+15559114357"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-1.5">🏥 Medical Trauma</span>
                  <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
                </a>
              </div>
            </div>

            {/* Mark Safe Trigger */}
            <div className="border-t border-slate-100 pt-5 mt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={markSafe}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HeartHandshake className="h-4.5 w-4.5" /> MARK SAFE / RESOLVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
