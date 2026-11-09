import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sprout,
  CloudSun,
  Bell,
  Languages,
  User,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';

export default function Navbar({ onToggleSidebar, isSidebarCollapsed }) {
  const { user, logout, updateUserData } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const [weatherSnippet, setWeatherSnippet] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Profile Edit Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [modalName, setModalName] = useState(user?.full_name || '');
  const [modalFarm, setModalFarm] = useState(user?.farm_name || '');
  const [modalLocation, setModalLocation] = useState(user?.farm_location || '');
  const [modalAcreage, setModalAcreage] = useState(user?.farm_size_acres || 8.5);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setModalName(user.full_name || '');
      setModalFarm(user.farm_name || '');
      setModalLocation(user.farm_location || '');
      setModalAcreage(user.farm_size_acres || 8.5);
    }
  }, [user]);

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!modalName.trim()) return;
    setIsSaving(true);
    setSaveSuccessMsg(null);
    try {
      const payload = {
        full_name: modalName.trim(),
        farm_name: modalFarm.trim(),
        farm_location: modalLocation.trim(),
        farm_size_acres: parseFloat(modalAcreage) || 5.0
      };
      await api.updateProfile(payload, user?.id || 'user_demo_001');
      updateUserData(payload);
      setSaveSuccessMsg('Name & Profile updated successfully!');
      setTimeout(() => {
        setSaveSuccessMsg(null);
        setShowProfileModal(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    // Fetch live weather snippet
    api.getWeather('Coimbatore').then(res => {
      if (res.success) {
        setWeatherSnippet(res.current);
      }
    }).catch(() => {});

    // Fetch notifications
    api.getNotifications().then(res => {
      setNotifications(res.notifications || []);
    }).catch(() => {});
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAsRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: 1 } : n));
    } catch (e) {}
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors focus:outline-none"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-forest-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                CropCare <span className="text-emerald-700 text-xs px-2 py-0.5 rounded-full bg-emerald-100 font-semibold tracking-wide">AI 2.0</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Intelligent Agriculture System</p>
            </div>
          </Link>
        </div>

        {/* Center: Live Weather Pill */}
        <div className="hidden md:flex items-center">
          {weatherSnippet ? (
            <Link
              to="/weather"
              className="flex items-center space-x-2.5 bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/60 px-3.5 py-1.5 rounded-full text-xs text-emerald-900 transition-all hover:scale-[1.02]"
            >
              <CloudSun className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span className="font-semibold">{weatherSnippet.temperature}°C</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">RH: {weatherSnippet.humidity}%</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-700 font-medium">{weatherSnippet.condition}</span>
            </Link>
          ) : (
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-emerald-600" />
              <span>Sensory Weather Active</span>
            </div>
          )}
        </div>

        {/* Right Actions: Lang, Notifications, User */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            title="Toggle English / தமிழ்"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="Notifications & Disease Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">Alerts & Field Advisories</span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} unread
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">No active alerts. All fields optimal!</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => handleMarkAsRead(n.id)}
                        className={`p-3 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!n.is_read ? 'bg-emerald-50/40' : ''}`}
                      >
                        <div className="mt-0.5">
                          {n.type === 'warning' ? (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user?.full_name ? user.full_name.charAt(0) : 'F'}
              </div>
              <div className="text-left hidden lg:block">
                <span className="text-xs font-semibold text-slate-800 block truncate max-w-[120px]">
                  {user?.full_name || 'Farmer'}
                </span>
                <span className="text-[10px] text-emerald-700 block -mt-0.5">
                  {user?.farm_name || 'Verified Farm'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user?.full_name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  <p className="text-[10px] text-emerald-700 font-medium mt-0.5">📍 {user?.farm_location}</p>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setShowUserDropdown(false)}
                  className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                >
                  Farmer Dashboard
                </Link>

                <Link
                  to="/diagnose"
                  onClick={() => setShowUserDropdown(false)}
                  className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                >
                  Analyze Crop
                </Link>

                <Link
                  to="/monitoring"
                  onClick={() => setShowUserDropdown(false)}
                  className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                >
                  Crop Health Records
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setShowUserDropdown(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-emerald-800 hover:bg-emerald-50 font-bold flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Edit Profile & Name</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Edit Profile & Change Name Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Edit Farmer / Admin Profile</h3>
                  <p className="text-[11px] text-slate-400">Update your account name and farming details</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Farm / Organization Name</label>
                <input
                  type="text"
                  value={modalFarm}
                  onChange={(e) => setModalFarm(e.target.value)}
                  placeholder="e.g. GreenFields Organic Farm"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={modalLocation}
                    onChange={(e) => setModalLocation(e.target.value)}
                    placeholder="e.g. Coimbatore"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Acreage</label>
                  <input
                    type="number"
                    step="0.1"
                    value={modalAcreage}
                    onChange={(e) => setModalAcreage(e.target.value)}
                    placeholder="e.g. 8.5"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
