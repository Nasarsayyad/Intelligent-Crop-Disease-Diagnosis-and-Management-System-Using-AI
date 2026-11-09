import React, { useState, useEffect } from 'react';
import {
  History,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { generateDiagnosisPDF } from '../utils/pdfGenerator';

export default function HistoryPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [cropFilter, setCropFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Selected report modal
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.getDiagnosisHistory({
        crop: cropFilter !== 'All' ? cropFilter : '',
        severity: severityFilter !== 'All' ? severityFilter : '',
        search,
        sort: sortOrder,
        userId: user?.id
      });
      setRecords(res.records || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [cropFilter, severityFilter, sortOrder]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHistory();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to remove this diagnosis record?")) {
      await api.deleteDiagnosis(id);
      setRecords(prev => prev.filter(r => r.id !== id));
      if (selectedReport?.id === id) setSelectedReport(null);
    }
  };

  const severityBadge = (sev) => {
    if (sev === 'Healthy') return 'badge-healthy';
    if (sev === 'Mild') return 'badge-mild';
    if (sev === 'Moderate') return 'badge-moderate';
    return 'badge-severe';
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <History className="w-4 h-4" />
          <span>Diagnostic Archive</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Diagnosis History & Agronomic Reports
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Search, filter, and review historical crop diagnoses, symptom overlays, and treatment prescriptions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search crop, disease name, or scientific pathogen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {/* Crop Filter */}
          <select
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">All Crops</option>
            <option value="Indian Hawthorn">Indian Hawthorn</option>
            <option value="Green Gram (Moong)">Green Gram (Moong)</option>
            <option value="Black Gram (Urad)">Black Gram (Urad)</option>
            <option value="Bell Pepper">Bell Pepper / Chili</option>
            <option value="Tomato">Tomato</option>
            <option value="Potato">Potato</option>
            <option value="Rice">Rice</option>
            <option value="Corn">Corn</option>
            <option value="Apple">Apple</option>
            <option value="Grape">Grape</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Healthy">Healthy</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Records Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-xs">Loading diagnosis archive...</div>
      ) : records.length === 0 ? (
        <div className="agri-card p-12 text-center space-y-3">
          <History className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No diagnosis records found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or analyze a new crop image to record diagnosis history.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((r) => (
            <div key={r.id} className="agri-card overflow-hidden flex flex-col justify-between group hover:border-emerald-300">
              <div>
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={r.annotated_image_url || r.original_image_url}
                    alt={r.crop_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className={severityBadge(r.disease_severity)}>
                      {r.disease_severity}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-white">
                    {r.growth_stage} Stage
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{r.crop_name}</h3>
                    <span className="text-[11px] text-emerald-700 font-semibold">{r.disease_confidence}% Match</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{r.disease_name}</p>
                  <p className="text-[11px] text-slate-500 italic truncate">{r.scientific_name}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{r.disease_description}</p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setSelectedReport(r)}
                    className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="View Full Report"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => generateDiagnosisPDF(r, user)}
                    className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Download PDF Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL REPORT MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Diagnosis Report Archive</span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedReport.crop_name} • {selectedReport.disease_name}
                </h3>
                <span className="text-xs text-slate-400">Recorded: {new Date(selectedReport.created_at).toLocaleString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => generateDiagnosisPDF(selectedReport, user)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Images: Original & Annotated */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-700 mb-1.5">Original Field Sample</p>
                <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3]">
                  <img
                    src={selectedReport.original_image_url}
                    alt="Original Crop Sample"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 mb-1.5">AI Symptom Mask & Lesion Heatmap</p>
                <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3]">
                  <img
                    src={selectedReport.annotated_image_url || selectedReport.original_image_url}
                    alt="Annotated Symptom Mask"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block">Growth Stage</span>
                <span className="font-bold text-slate-800">{selectedReport.growth_stage}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Severity</span>
                <span className="font-bold text-slate-800">{selectedReport.disease_severity}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Lesion Area</span>
                <span className="font-bold text-slate-800">{selectedReport.affected_area_percentage || 0}%</span>
              </div>
              <div>
                <span className="text-slate-400 block">AI Confidence</span>
                <span className="font-bold text-emerald-700">{selectedReport.disease_confidence}%</span>
              </div>
            </div>

            {/* Prescribed Treatments */}
            {selectedReport.treatment_and_management && (
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Treatment Prescriptions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <p className="font-bold text-emerald-800 mb-1">🌿 Organic Methods:</p>
                    <ul className="space-y-1 text-slate-700">
                      {(selectedReport.treatment_and_management.organic_treatments || []).map((o, idx) => (
                        <li key={idx}>• {o}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                    <p className="font-bold text-amber-900 mb-1">🧪 Chemical & Label Safety:</p>
                    <ul className="space-y-1 text-slate-700">
                      {(selectedReport.treatment_and_management.chemical_treatments || []).map((c, idx) => (
                        <li key={idx}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
