import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  Compass,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function WeatherPage() {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(user?.farm_location || 'Coimbatore');
  const [popularRegions, setPopularRegions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState('');

  const loadWeather = async (loc) => {
    setLoading(true);
    try {
      const res = await api.getWeather(loc);
      setWeatherData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.getPopularRegions().then(res => setPopularRegions(res || [])).catch(() => {});
    loadWeather(selectedLocation);
  }, []);

  const handleSelectPreset = (name) => {
    setSelectedLocation(name);
    loadWeather(name);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customSearch.trim()) {
      setSelectedLocation(customSearch);
      loadWeather(customSearch);
      setCustomSearch('');
    }
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <CloudSun className="w-4 h-4" />
          <span>Microclimate Telemetry & Pathology Radar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Smart Weather & Disease Risk Monitoring
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Real-time meteorology correlated with pathogen incubation models to alert farmers 48 hours prior to fungal outbreaks.
        </p>
      </div>

      {/* Location Selector Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Popular Farming Hubs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Farming Hub:</span>
          </span>
          {popularRegions.slice(0, 5).map((r) => (
            <button
              key={r.id}
              onClick={() => handleSelectPreset(r.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedLocation.toLowerCase().includes(r.id)
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {r.name.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Custom Location Search */}
        <form onSubmit={handleCustomSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search farm city..."
            value={customSearch}
            onChange={(e) => setCustomSearch(e.target.value)}
            className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44 sm:w-56"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
          >
            Go
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-xs">Synchronizing agricultural meteorological feeds...</div>
      ) : weatherData ? (
        <div className="space-y-8 animate-fadeIn">

          {/* Current Microclimate Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-900 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Primary Temp & Status */}
              <div className="md:col-span-5 space-y-2">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{weatherData.location}</span>
                </div>
                <div className="flex items-baseline space-x-4">
                  <span className="text-5xl sm:text-7xl font-black tracking-tighter">
                    {weatherData.current.temperature}°
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-200">
                    C
                  </span>
                </div>
                <p className="text-base font-bold text-emerald-100">{weatherData.current.condition}</p>
                <p className="text-xs text-emerald-300/80">Dew Point: {weatherData.current.dew_point}°C • Sensory Provider: {weatherData.source}</p>
              </div>

              {/* 4 Environmental Telemetry Metrics */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* Humidity */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center space-x-2 text-emerald-300 text-xs font-medium">
                    <Droplets className="w-4 h-4" />
                    <span>Rel. Humidity</span>
                  </div>
                  <p className="text-2xl font-black text-white mt-1">{weatherData.current.humidity}%</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${weatherData.current.humidity > 80 ? 'bg-amber-400/20 text-amber-200' : 'bg-emerald-400/20 text-emerald-200'}`}>
                    {weatherData.current.humidity > 80 ? 'High Fungal Vector' : 'Optimal'}
                  </span>
                </div>

                {/* Rainfall */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center space-x-2 text-emerald-300 text-xs font-medium">
                    <CloudRain className="w-4 h-4" />
                    <span>Precipitation</span>
                  </div>
                  <p className="text-2xl font-black text-white mt-1">{weatherData.current.rainfall} mm</p>
                  <span className="text-[10px] text-emerald-200 block mt-1">24h Cumulative</span>
                </div>

                {/* Wind Speed */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center space-x-2 text-emerald-300 text-xs font-medium">
                    <Wind className="w-4 h-4" />
                    <span>Wind Velocity</span>
                  </div>
                  <p className="text-2xl font-black text-white mt-1">{weatherData.current.wind_speed} km/h</p>
                  <span className="text-[10px] text-emerald-200 block mt-1">Spore Drift Factor</span>
                </div>

              </div>

            </div>
          </div>

          {/* PATHOGEN DISEASE RISK ALERTS */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Agronomic Biosecurity</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Microclimate Crop Disease Risk Alerts
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Dynamic pathology evaluations calculated by matching current humidity, leaf wetness, and ambient temperatures against verified agronomic pathogen models.
              </p>
            </div>

            <div className="space-y-4">
              {weatherData.disease_risks && weatherData.disease_risks.length > 0 ? (
                weatherData.disease_risks.map((risk, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-amber-50/90 border border-amber-200/90 shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{risk.risk_name}</h4>
                          <span className="text-[11px] text-amber-900 font-semibold">Severity: {risk.severity} Alert</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {risk.affected_crops.map((c, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold">
                            🌱 {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-amber-200/60 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Preventive Field Advisory:</strong> {risk.advisory}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-xs font-semibold">
                    Current microclimatic conditions (low humidity and moderate temperatures) indicate minimal pathogen outbreak risks across all supported crops.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 5-DAY AGRO FORECAST CARDS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Field Planning</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">5-Day Agricultural Weather Outlook</h3>
              </div>
              <span className="text-xs text-slate-400">Updated Hourly</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {weatherData.forecast?.map((day, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">{day.date}</span>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs mx-auto flex items-center justify-center text-emerald-600">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">{day.temp_max}°</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-slate-500">{day.temp_min}°</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                    <CloudRain className="w-3 h-3 text-sky-500" />
                    <span>{day.rain_mm} mm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
}
