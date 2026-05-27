import React from 'react';
import { Skull, MessageSquare, UserX, Pill, Flame, ChevronRight } from 'lucide-react';

interface QuickReportProps {
  onReportSelect: (type: string) => void;
}

interface IncidentCard {
  type: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  borderClass: string;
  iconBgClass: string;
}

export const QuickReport: React.FC<QuickReportProps> = ({ onReportSelect }) => {
  const cards: IncidentCard[] = [
    {
      type: 'Ragging',
      title: 'Report Ragging',
      description: 'Senior misconduct, forced embarrassing activities, or physical/mental coercion.',
      icon: Skull,
      colorClass: 'text-indigo-600',
      borderClass: 'hover:border-indigo-500 hover:shadow-indigo-500/10',
      iconBgClass: 'bg-indigo-50 text-indigo-600',
    },
    {
      type: 'Bullying',
      title: 'Report Bullying',
      description: 'Peer harassment, cyberbullying, physical intimidation, or blackmail.',
      icon: MessageSquare,
      colorClass: 'text-sky-600',
      borderClass: 'hover:border-sky-500 hover:shadow-sky-500/10',
      iconBgClass: 'bg-sky-50 text-sky-600',
    },
    {
      type: 'Harassment',
      title: 'Report Harassment',
      description: 'Inappropriate advances, sexual misconduct, verbal abuse, or stalking.',
      icon: UserX,
      colorClass: 'text-rose-600',
      borderClass: 'hover:border-rose-500 hover:shadow-rose-500/10',
      iconBgClass: 'bg-rose-50 text-rose-600',
    },
    {
      type: 'Drug Abuse',
      title: 'Report Drug Abuse',
      description: 'Banned substance consumption, possession, or distribution on campus.',
      icon: Pill,
      colorClass: 'text-amber-600',
      borderClass: 'hover:border-amber-500 hover:shadow-amber-500/10',
      iconBgClass: 'bg-amber-50 text-amber-600',
    },
    {
      type: 'Threat/Violence',
      title: 'Report Threat/Violence',
      description: 'Active threats, physical assault, weapons possession, or gang activities.',
      icon: Flame,
      colorClass: 'text-red-600',
      borderClass: 'hover:border-red-500 hover:shadow-red-500/10',
      iconBgClass: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <section className="py-6">
      <div className="flex flex-col space-y-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Quick Actions</span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">File an Instant Report</h2>
        <p className="text-sm text-slate-500">
          Select a category below to open a pre-configured anonymous incident report form.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.type}
              onClick={() => onReportSelect(card.type)}
              className={`flex flex-col justify-between text-left p-5 rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group ${card.borderClass}`}
            >
              <div>
                <div className={`inline-flex p-3 rounded-xl mb-4 transition-transform group-hover:scale-110 ${card.iconBgClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                Report Safely <ChevronRight className="h-3 w-3 ml-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
