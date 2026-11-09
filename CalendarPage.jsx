import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Sprout,
  Droplets,
  ShieldCheck,
  Scissors,
  Layers
} from 'lucide-react';
import { api } from '../services/api';

export default function CalendarPage() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCalendar();
  }, [selectedCrop]);

  const loadCalendar = async () => {
    setLoading(true);
    try {
      const res = await api.getCalendar(selectedCrop);
      setEvents(res.events || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const activityBadge = (type) => {
    if (type === 'planting') return 'bg-emerald-100 text-emerald-800';
    if (type === 'protection') return 'bg-rose-100 text-rose-800';
    if (type === 'nutrition') return 'bg-amber-100 text-amber-800';
    if (type === 'harvest') return 'bg-purple-100 text-purple-800';
    return 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <CalendarDays className="w-4 h-4" />
          <span>Seasonal Operations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Precision Crop Activity Calendar
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Critical phenological farming tasks, fertilizer scheduling, and prophylactic disease protection timeline.
        </p>
      </div>

      {/* Crop Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['Indian Hawthorn', 'Green Gram (Moong)', 'Black Gram (Urad)', 'Bell Pepper', 'Tomato', 'Potato', 'Rice'].map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCrop === crop
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {crop} Calendar
          </button>
        ))}
      </div>

      {/* Timeline Events List */}
      <div className="agri-card p-6 sm:p-8 space-y-6">
        <div className="border-l-2 border-emerald-500/40 ml-4 space-y-8 relative">
          {events.map((e, idx) => (
            <div key={e.id} className="relative pl-6 sm:pl-8">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-600 shadow-xs" />

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-emerald-300 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-slate-900">{e.period}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-emerald-700">{e.phase}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize self-start sm:self-auto ${activityBadge(e.type)}`}>
                    {e.type}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{e.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
