import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Activity,
  Plus,
  Calendar,
  Layers,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  ChevronRight,
  Split,
  Trash2,
  X
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function CropMonitoringPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const [crops, setCrops] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  // Form states
  const [newCropName, setNewCropName] = useState('Tomato');
  const [newVariety, setNewVariety] = useState('Arka Rakshak (F1)');
  const [newPlantingDate, setNewPlantingDate] = useState(new Date().toISOString().slice(0, 10));
  const [newFieldLocation, setNewFieldLocation] = useState('North Plot B-2');
  const [newAcreage, setNewAcreage] = useState(2.5);

  // Inspection form
  const [inspectStage, setInspectStage] = useState('Vegetative');
  const [inspectScore, setInspectScore] = useState(90);
  const [inspectNotes, setInspectNotes] = useState('');
  const [inspectFile, setInspectFile] = useState(null);

  const fetchCrops = async () => {
    try {
      const res = await api.listCrops(user?.id);
      const list = res.crops || [];
      setCrops(list);

      const targetId = searchParams.get('cropId') || (list[0]?.id || null);
      if (targetId) {
        setSelectedCropId(targetId);
        loadCropDetails(targetId);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadCropDetails = async (id) => {
    try {
      const details = await api.getCropDetails(id);
      setCropDetails(details);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [user]);

  const handleSelectCrop = (id) => {
    setSelectedCropId(id);
    loadCropDetails(id);
  };

  const handleAddCropSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addCrop({
        user_id: user?.id,
        crop_name: newCropName,
        variety: newVariety,
        planting_date: newPlantingDate,
        field_location: newFieldLocation,
        field_area_acres: parseFloat(newAcreage)
      });
      setShowAddCropModal(false);
      fetchCrops();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleInspectionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCropId) return;

    const fd = new FormData();
    fd.append('growth_stage', inspectStage);
    fd.append('health_score', inspectScore);
    fd.append('notes', inspectNotes);
    if (inspectFile) fd.append('file', inspectFile);

    try {
      await api.addCropInspection(selectedCropId, fd);
      setShowInspectionModal(false);
      setInspectFile(null);
      setInspectNotes('');
      loadCropDetails(selectedCropId);
      fetchCrops();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteCrop = async (id) => {
    if (confirm("Delete this monitored crop plot and all associated records?")) {
      await api.deleteCrop(id);
      fetchCrops();
    }
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Phenology & Vigor Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Crop Health Monitoring Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track foliar health progression, compare early vs recent photographs, and maintain time-series records.
          </p>
        </div>

        <button
          onClick={() => setShowAddCropModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Field Plot</span>
        </button>
      </div>

      {/* Crop Selector Tabs */}
      <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-none">
        {crops.map((c) => (
          <button
            key={c.id}
            onClick={() => handleSelectCrop(c.id)}
            className={`flex-shrink-0 px-4 py-3 rounded-2xl border text-left transition-all ${
              selectedCropId === c.id
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-xs truncate max-w-[140px]">{c.crop_name}</div>
            <div className={`text-[11px] mt-0.5 truncate max-w-[140px] ${selectedCropId === c.id ? 'text-emerald-100' : 'text-slate-400'}`}>
              📍 {c.field_location}
            </div>
          </button>
        ))}
      </div>

      {cropDetails && (
        <div className="space-y-8 animate-fadeIn">

          {/* Plot Overview Card */}
          <div className="agri-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-healthy">{cropDetails.health_status}</span>
                <span className="text-xs text-slate-400">• Planted: {cropDetails.planting_date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {cropDetails.crop_name} ({cropDetails.variety || 'Hybrid'})
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Location: <strong>{cropDetails.field_location}</strong> • Area: <strong>{cropDetails.field_area_acres} Acres</strong> • Current Phenology: <strong>{cropDetails.current_stage}</strong>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInspectionModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Periodic Inspection</span>
              </button>

              <button
                onClick={() => handleDeleteCrop(cropDetails.id)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50"
                title="Delete Plot"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Earlier vs Recent Image Comparison Inspector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Split className="w-4 h-4" />
              <span>Visual Time-Lapse Progression</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Earlier vs Recent Foliage Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Compare earlier emergence imagery with recent leaf health to verify disease recovery or canopy growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Earlier Baseline Image</span>
                  <span className="text-slate-400">Date: {cropDetails.image_comparison?.earlier_date}</span>
                </div>
                <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] border border-slate-200">
                  <img
                    src={cropDetails.image_comparison?.earlier || '/static/uploads/sample_seedling.jpg'}
                    alt="Earlier Crop Leaf"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Recent Inspection Image</span>
                  <span className="text-slate-400">Date: {cropDetails.image_comparison?.recent_date}</span>
                </div>
                <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] border border-slate-200">
                  <img
                    src={cropDetails.image_comparison?.recent || '/static/uploads/sample_flowering.jpg'}
                    alt="Recent Crop Leaf"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Health Trends Line Chart (Recharts) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Health Trajectory</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">Crop Health Index Trend</h3>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Current Vigor: 94 / 100
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropDetails.health_trends || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="health_score"
                    name="Health Score"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{ fill: '#059669', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Periodic Inspection History Records */}
          <div className="agri-card p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Inspection Timeline Log</h3>

            <div className="divide-y divide-slate-100">
              {cropDetails.timeline?.map((rec) => (
                <div key={rec.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                      <img
                        src={rec.image_path || '/static/uploads/sample_vegetative.jpg'}
                        alt={rec.growth_stage}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">{rec.growth_stage} Stage</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">{rec.notes || 'Routine crop check'}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-emerald-700">{rec.health_score} / 100</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{rec.record_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ADD NEW CROP MODAL */}
      {showAddCropModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Register New Crop Field Plot</h3>
              <button onClick={() => setShowAddCropModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCropSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Crop Species</label>
                <select
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Indian Hawthorn">Indian Hawthorn</option>
                  <option value="Green Gram (Moong)">Green Gram (Moong)</option>
                  <option value="Black Gram (Urad)">Black Gram (Urad)</option>
                  <option value="Bell Pepper">Bell Pepper / Chili</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Potato">Potato</option>
                  <option value="Rice">Rice</option>
                  <option value="Corn">Corn (Maize)</option>
                  <option value="Apple">Apple</option>
                  <option value="Grape">Grape</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Variety / Hybrid</label>
                <input
                  type="text"
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  placeholder="e.g. Arka Rakshak (F1)"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Planting Date</label>
                  <input
                    type="date"
                    value={newPlantingDate}
                    onChange={(e) => setNewPlantingDate(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Acreage (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newAcreage}
                    onChange={(e) => setNewAcreage(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Field Plot Identifier</label>
                <input
                  type="text"
                  value={newFieldLocation}
                  onChange={(e) => setNewFieldLocation(e.target.value)}
                  placeholder="e.g. South Block 4B"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCropModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Register Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PERIODIC INSPECTION MODAL */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Add Periodic Crop Health Record</h3>
              <button onClick={() => setShowInspectionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInspectionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Growth Stage</label>
                <select
                  value={inspectStage}
                  onChange={(e) => setInspectStage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                >
                  <option value="Seedling">Seedling</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Budding">Budding</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Fruiting">Fruiting</option>
                  <option value="Maturity">Maturity</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Estimated Health Score (0 - 100)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={inspectScore}
                    onChange={(e) => setInspectScore(parseInt(e.target.value))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="font-bold text-emerald-800 text-sm w-10">{inspectScore}%</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Inspection Crop Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setInspectFile(e.target.files[0])}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Agronomist / Farmer Notes</label>
                <textarea
                  value={inspectNotes}
                  onChange={(e) => setInspectNotes(e.target.value)}
                  placeholder="Canopy vigor, flower count, soil moisture conditions..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInspectionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
