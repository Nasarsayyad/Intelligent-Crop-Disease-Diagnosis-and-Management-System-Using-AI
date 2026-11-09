import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Sprout,
  ShieldAlert,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function KnowledgePage() {
  const [knowledgeData, setKnowledgeData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async (query = '') => {
    setLoading(true);
    try {
      const res = await api.getKnowledgeBase(query);
      setKnowledgeData(res.crops || {});
      const cropKeys = Object.keys(res.crops || {});
      if (cropKeys.length > 0 && !res.crops[selectedCrop]) {
        setSelectedCrop(cropKeys[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadKnowledge(searchTerm);
  };

  const currentCropInfo = knowledgeData[selectedCrop];

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Agricultural Compendium</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Crop Pathology & Agronomic Knowledge Base
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Explore botanical classifications, phenological growth stages, and verified pathogen prevention protocols.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search crop, pathogen or symptoms (e.g. Blight, Alternaria, Rust)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-24 py-2.5 bg-white border border-slate-200 text-xs rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Crop Selector Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-none">
        {Object.keys(knowledgeData).map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCrop === crop
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>

      {currentCropInfo && (
        <div className="space-y-8 animate-fadeIn">

          {/* Species Overview Card */}
          <div className="agri-card p-6 bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  {currentCropInfo.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">{selectedCrop}</h2>
                <p className="text-xs text-slate-500 italic mt-0.5">{currentCropInfo.botanical_name}</p>
              </div>

              <div className="flex gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Optimal Temp</span>
                  <span className="font-bold text-slate-800">{currentCropInfo.ideal_temp_c}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Optimal Humidity</span>
                  <span className="font-bold text-slate-800">{currentCropInfo.ideal_humidity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Stages Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Phenological Growth Stages:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentCropInfo.growth_stages?.map((st, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-emerald-700">{i + 1}. {st.stage}</span>
                    <span className="text-[10px] text-slate-400">{st.days}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{st.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pathogen Diseases Encyclopedia Cards */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Identifiable Pathogens & Disorders:</h3>

            <div className="space-y-6">
              {Object.entries(currentCropInfo.diseases || {}).map(([dName, dData]) => (
                <div key={dName} className="agri-card p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-lg font-black text-slate-900">{dName}</h4>
                      <p className="text-xs text-slate-500 italic">Scientific: {dData.scientific_name}</p>
                    </div>
                    <span className="badge-mild self-start sm:self-auto">Known Disease</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{dData.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                      <p className="font-bold text-slate-800">Characteristic Symptoms:</p>
                      <ul className="space-y-1 text-slate-600">
                        {dData.symptoms?.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-2">
                      <p className="font-bold text-emerald-900">Organic & Bio-Control Options:</p>
                      <ul className="space-y-1 text-slate-700">
                        {dData.organic_treatments?.map((o, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-amber-900">Approved Chemical Guidance:</p>
                    {dData.chemical_treatments?.map((c, idx) => (
                      <p key={idx} className="text-slate-600">• {c}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
