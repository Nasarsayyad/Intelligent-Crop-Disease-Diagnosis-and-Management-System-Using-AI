import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  ScanLine,
  History,
  Activity,
  CloudSun,
  Bot,
  BookOpen,
  CalendarDays,
  UserCheck,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Sidebar({ isCollapsed, onMobileClose }) {
  const { t } = useLanguage();

  const navItems = [
    { name: t('home'), path: '/', icon: Home },
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('diagnose'), path: '/diagnose', icon: ScanLine, highlight: true },
    { name: t('history'), path: '/history', icon: History },
    { name: t('monitoring'), path: '/monitoring', icon: Activity },
    { name: t('weather'), path: '/weather', icon: CloudSun },
    { name: t('chat'), path: '/chat', icon: Bot },
    { name: t('knowledge'), path: '/knowledge', icon: BookOpen },
    { name: t('calendar'), path: '/calendar', icon: CalendarDays },
    { name: t('expert'), path: '/expert', icon: UserCheck },
    { name: t('admin'), path: '/admin', icon: ShieldCheck },
  ];

  return (
    <aside
      className={`fixed top-16 bottom-0 left-0 z-30 bg-white border-r border-slate-200/90 transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation List */}
      <div className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-8.5rem)]">
        
        {/* Quick CTA if expanded */}
        {!isCollapsed && (
          <div className="mb-4 p-3 bg-gradient-to-br from-forest-800 via-forest-900 to-emerald-900 text-white rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Vision Core</span>
            </div>
            <p className="text-xs text-emerald-100 font-medium">Detect pathogens, blights & leaf spots in seconds.</p>
            <NavLink
              to="/diagnose"
              onClick={onMobileClose}
              className="mt-2.5 inline-flex items-center justify-center w-full py-1.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              <span>Scan Leaf Image</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </NavLink>
          </div>
        )}

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all group ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                      : item.highlight
                      ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100/70 border border-emerald-200/50'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${item.highlight ? 'text-emerald-700' : ''}`} />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.name}</span>
                )}
                {!isCollapsed && item.highlight && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Info in Sidebar */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-semibold text-slate-700">AI Diagnostic Engine Online</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Version 2.4.0 • ICAR Protocol</p>
        </div>
      )}
    </aside>
  );
}
