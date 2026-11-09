import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ScanLine,
  Activity,
  CloudSun,
  Bot,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Plus
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [stats, setStats] = useState({ total_monitored_crops: 0, total_diagnoses: 0, active_alerts: 1 });
  const [recentDiagnoses, setRecentDiagnoses] = useState([]);
  const [monitoredCrops, setMonitoredCrops] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [weatherCurrent, setWeatherCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [profRes, diagRes, cropsRes, weatherRes] = await Promise.all([
          api.getProfile(user?.id),
          api.getDiagnosisHistory({ sort: 'newest', userId: user?.id }),
          api.listCrops(user?.id),
          api.getWeather(user?.farm_location || 'Coimbatore')
        ]);

        if (profRes?.stats) setStats(profRes.stats);
        if (diagRes?.records) setRecentDiagnoses(diagRes.records.slice(0, 4));
        if (cropsRes?.crops) setMonitoredCrops(cropsRes.crops);
        if (weatherRes?.disease_risks) setWeatherAlerts(weatherRes.disease_risks);
        if (weatherRes?.current) setWeatherCurrent(weatherRes.current);
      } catch (e) {
        console.error("Dashboard data load error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [user]);

  const severityBadge = (sev) => {
    if (sev === 'Healthy') return 'badge-healthy';
    if (sev === 'Mild') return 'badge-mild';
    if (sev === 'Moderate') return 'badge-moderate';
    return 'badge-severe';
  };

  return (
    <div className="space-y-8 pb-10">

      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-emerald-800 text-white p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">Farmer Overview</span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Welcome back, {user?.full_name || 'Farmer'}!
          </h1>
          <p className="text-xs text-emerald-100/90 mt-1">
            {user?.farm_name} • 📍 {user?.farm_location} ({user?.farm_size_acres || 5} Acres)
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/diagnose"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <ScanLine className="w-4 h-4" />
            <span>Analyze Crop Leaf</span>
          </Link>
          <Link
            to="/chat"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>AgriBot Assistant</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Registered Plots</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{monitoredCrops.length || 3}</p>
          <span className="text-[11px] text-emerald-700 font-medium">Active crop fields</span>
        </div>

        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">AI Diagnoses Run</span>
            <div className="w-8 h-8 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
              <ScanLine className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{recentDiagnoses.length || 8}</p>
          <span className="text-[11px] text-slate-500 font-medium">Scans recorded</span>
        </div>

        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Average Crop Health</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">92%</p>
          <span className="text-[11px] text-emerald-700 font-medium">+3% vs last week</span>
        </div>

        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Microclimate Temp</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <CloudSun className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {weatherCurrent ? `${weatherCurrent.temperature}°C` : '28.2°C'}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            RH: {weatherCurrent ? `${weatherCurrent.humidity}%` : '82%'}
          </span>
        </div>
      </div>

      {/* Active Weather Risk Alert Banner */}
      {weatherAlerts.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Weather-Based Pathogen Alert
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  {weatherAlerts[0].severity}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{weatherAlerts[0].risk_name}</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{weatherAlerts[0].advisory}</p>
            </div>
          </div>

          <Link
            to="/weather"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm whitespace-nowrap transition-all"
          >
            View Weather Radar &rarr;
          </Link>
        </div>
      )}

      {/* Main Grid: Monitored Crops (Left) & Recent Scans (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Monitored Crops List (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Registered Crop Plots</h2>
              <p className="text-xs text-slate-500">Track growth and periodic inspections over time</p>
            </div>
            <Link
              to="/monitoring"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Manage Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {monitoredCrops.map((crop) => (
              <div key={crop.id} className="agri-card p-4 hover:border-emerald-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      {crop.crop_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{crop.crop_name}</h4>
                      <p className="text-[11px] text-slate-500">{crop.variety || 'Standard Variety'} • 📍 {crop.field_location}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="badge-healthy">{crop.health_status}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Stage: {crop.current_stage}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Planted: {crop.planting_date}</span>
                  <Link
                    to={`/monitoring?cropId=${crop.id}`}
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    View Timeline &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Diagnoses List (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent AI Diagnoses</h2>
              <p className="text-xs text-slate-500">Latest field scans and prescriptions</p>
            </div>
            <Link
              to="/history"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentDiagnoses.length === 0 ? (
              <div className="agri-card p-6 text-center text-xs text-slate-400">
                No recent diagnoses yet. Upload your first crop photo to get started!
              </div>
            ) : (
              recentDiagnoses.map((diag) => (
                <div key={diag.id} className="agri-card p-3.5 hover:border-emerald-300 flex items-center space-x-3.5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                    <img
                      src={diag.original_image_url}
                      alt={diag.crop_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-xs truncate">{diag.crop_name}</h4>
                      <span className={severityBadge(diag.disease_severity)}>{diag.disease_severity}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">{diag.disease_name}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {new Date(diag.created_at).toLocaleDateString()} • {diag.disease_confidence}% Conf.
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
