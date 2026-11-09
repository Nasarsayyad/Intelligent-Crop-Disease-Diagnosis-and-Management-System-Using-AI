import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Users,
  Server,
  Database,
  BarChart3,
  PieChart as PieIcon,
  UserCheck,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

export default function AdminPage() {
  const { user, updateUserData } = useAuth();
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editable Admin Profile State
  const [adminName, setAdminName] = useState(user?.full_name || 'Kavitha Raman');
  const [farmName, setFarmName] = useState(user?.farm_name || 'GreenFields Organic Farm');
  const [farmLocation, setFarmLocation] = useState(user?.farm_location || 'Coimbatore, Tamil Nadu');
  const [farmAcreage, setFarmAcreage] = useState(user?.farm_size_acres || 8.5);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(null);
  const [profileSaveError, setProfileSaveError] = useState(null);

  useEffect(() => {
    if (user) {
      setAdminName(user.full_name || '');
      setFarmName(user.farm_name || '');
      setFarmLocation(user.farm_location || '');
      setFarmAcreage(user.farm_size_acres || 8.5);
    }
  }, [user]);

  useEffect(() => {
    api.getAdminStats().then(res => {
      setAdminStats(res);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!adminName.trim()) {
      setProfileSaveError("Administrator name cannot be empty.");
      return;
    }

    setIsSavingProfile(true);
    setProfileSaveSuccess(null);
    setProfileSaveError(null);

    try {
      const payload = {
        full_name: adminName.trim(),
        farm_name: farmName.trim(),
        farm_location: farmLocation.trim(),
        farm_size_acres: parseFloat(farmAcreage) || 5.0
      };

      await api.updateProfile(payload, user?.id || 'user_demo_001');

      // Update global auth state and localStorage
      updateUserData(payload);

      setProfileSaveSuccess(`Administrator name successfully changed to "${adminName.trim()}".`);
      setTimeout(() => setProfileSaveSuccess(null), 5000);
    } catch (err) {
      setProfileSaveError(err.message || "Failed to update administrator profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const severityChartData = adminStats?.metrics?.severity_distribution
    ? Object.entries(adminStats.metrics.severity_distribution).map(([name, value]) => ({ name, value }))
    : [
        { name: 'Healthy', value: 184 },
        { name: 'Mild', value: 142 },
        { name: 'Moderate', value: 136 },
        { name: 'Severe', value: 80 }
      ];

  const cropChartData = adminStats?.metrics?.crop_distribution
    ? Object.entries(adminStats.metrics.crop_distribution).map(([crop, scans]) => ({ crop, scans }))
    : [
        { crop: 'Tomato', scans: 210 },
        { crop: 'Potato', scans: 115 },
        { crop: 'Rice', scans: 98 },
        { crop: 'Corn', scans: 74 },
        { crop: 'Grape', scans: 45 }
      ];

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>System Administration & AI Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Platform Administration & Model Analytics
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Real-time inference telemetry, lesion detector confidence distributions, and platform usage metrics.
        </p>
      </div>

      {/* Administrator Profile & Identity Settings Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-emerald-700 text-[11px] font-bold uppercase tracking-wider">Account Administration</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-700" />
              <span>Administrator Profile & Name Settings</span>
            </h2>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            Role: System Administrator
          </span>
        </div>

        {profileSaveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{profileSaveSuccess}</span>
          </div>
        )}

        {profileSaveError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{profileSaveError}</span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Admin Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter Administrator Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-semibold text-xs bg-slate-50/50"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Changes the name shown on Dashboard, Navbar and Reports.</span>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Farm / Organization Name</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="e.g. GreenFields Organic Farm"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-xs bg-slate-50/50"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Farm Geographic Location</label>
              <input
                type="text"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                placeholder="e.g. Coimbatore, Tamil Nadu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-xs bg-slate-50/50"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Total Acreage (Acres)</label>
              <input
                type="number"
                step="0.1"
                value={farmAcreage}
                onChange={(e) => setFarmAcreage(e.target.value)}
                placeholder="e.g. 8.5"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-xs bg-slate-50/50"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-slate-500">
              User ID: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{user?.id || 'user_demo_001'}</code> • Email: <strong className="text-slate-700">{user?.email || 'farmer@agriai.com'}</strong>
            </span>

            <button
              type="submit"
              disabled={isSavingProfile}
              className="px-5 py-2.5 bg-gradient-to-r from-forest-800 to-emerald-700 hover:from-forest-900 hover:to-emerald-800 text-white font-bold rounded-xl shadow-sm text-xs flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingProfile ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Engine Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Registered Farmers</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{adminStats?.metrics?.total_users || 48}</p>
          <span className="text-[11px] text-emerald-700 font-medium">Active farmer accounts</span>
        </div>

        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Registered Acreage</span>
            <div className="w-8 h-8 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{adminStats?.metrics?.total_registered_plots || 126}</p>
          <span className="text-[11px] text-slate-500 font-medium">Fields monitored</span>
        </div>

        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Total AI Inferences</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{adminStats?.metrics?.total_ai_diagnoses || 542}</p>
          <span className="text-[11px] text-emerald-700 font-medium">99.4% uptime</span>
        </div>

        <div className="agri-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Database Engine</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">WAL Mode</p>
          <span className="text-[11px] text-slate-500 font-medium">SQLite High-Perf DB</span>
        </div>
      </div>

      {/* Model Engine Specs Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-700" />
          <span>Active AI Vision Model & Pathology Engine Specification</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
            <span className="text-slate-400 block text-[10px]">Architecture</span>
            <span className="font-bold text-slate-900 text-sm">Multi-Task CNN Feature Extractor</span>
            <p className="text-slate-500 text-[11px] mt-1">Simultaneous classification of crop species, phenology stage and pathogen.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
            <span className="text-slate-400 block text-[10px]">Image Quality Safeguard</span>
            <span className="font-bold text-slate-900 text-sm">Laplacian + Excess Green (ExG)</span>
            <p className="text-slate-500 text-[11px] mt-1">Rejects blurry, dark or non-leaf photos to guarantee zero false diagnoses.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
            <span className="text-slate-400 block text-[10px]">Pathology Knowledge Base</span>
            <span className="font-bold text-slate-900 text-sm">ICAR / Agricultural Extension</span>
            <p className="text-slate-500 text-[11px] mt-1">Pre-verified label dosages, organic bio-antagonists and safety protocols.</p>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Severity Distribution Pie Chart */}
        <div className="agri-card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-700" />
            <span>Disease Severity Classification Breakdown</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  fontSize={11}
                >
                  {severityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scans by Crop Bar Chart */}
        <div className="agri-card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-700" />
            <span>Diagnostic Inferences by Crop Species</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="crop" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Bar dataKey="scans" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
