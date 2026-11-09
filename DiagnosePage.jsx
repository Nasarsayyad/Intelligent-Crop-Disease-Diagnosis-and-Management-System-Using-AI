import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ScanLine,
  UploadCloud,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Download,
  ShieldCheck,
  ChevronRight,
  Droplets,
  Layers,
  ThermometerSun,
  Flame,
  X,
  RefreshCw,
  ExternalLink,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { generateDiagnosisPDF } from '../utils/pdfGenerator';

const CROPS_LIST = [
  "Auto-Detect Crop with AI",
  "Indian Hawthorn",
  "Green Gram (Moong)",
  "Black Gram (Urad)",
  "Bell Pepper / Chili",
  "Tomato",
  "Potato",
  "Rice",
  "Corn (Maize)",
  "Apple",
  "Grape"
];

const ALL_GROWTH_STAGES = [
  "Germination",
  "Seedling",
  "Vegetative",
  "Budding",
  "Flowering",
  "Fruiting",
  "Maturity",
  "Harvest-ready"
];

export default function DiagnosePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [selectedCropHint, setSelectedCropHint] = useState(() => {
    const fromUrl = searchParams.get('crop');
    return fromUrl || "Auto-Detect Crop with AI";
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Camera state
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  // Result state
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeImageTab, setActiveImageTab] = useState('annotated'); // 'original' or 'annotated'

  const fileInputRef = useRef(null);

  // Clean up object URLs and camera streams on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [previewUrl, cameraStream]);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please select a valid image file (JPG, PNG, or WEBP).");
      return;
    }

    // Validate size (15 MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg("Image size exceeds maximum limit of 15 MB.");
      return;
    }

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setErrorMsg(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDiagnosisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Camera capture handlers
  const startCamera = async () => {
    try {
      setShowCameraModal(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setShowCameraModal(false);
      setErrorMsg("Unable to access camera. Please allow camera permissions or browse a file.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera_scan_${Date.now()}.jpg`, { type: 'image/jpeg' });
        handleFileSelect(file);
      }
      stopCamera();
    }, 'image/jpeg', 0.95);
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      setCameraStream(null);
    }
    setShowCameraModal(false);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMsg("Please upload or capture a crop leaf image first.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setUploadProgress(20);

    const formData = new FormData();
    formData.append('file', selectedFile);
    if (selectedCropHint && !selectedCropHint.includes('Auto-Detect')) {
      formData.append('crop_hint', selectedCropHint);
    }
    if (user?.id) {
      formData.append('user_id', user.id);
    }

    // Simulated progress tick
    const progressTimer = setInterval(() => {
      setUploadProgress(prev => (prev < 90 ? prev + 15 : prev));
    }, 250);

    try {
      const res = await api.analyzeCrop(formData);
      clearInterval(progressTimer);
      setUploadProgress(100);

      if (res.is_uncertain) {
        setErrorMsg(res.error || "The image is unclear or unsupported. Please upload a clear photo of the crop leaf.");
        setDiagnosisResult(null);
      } else if (res.success) {
        setDiagnosisResult(res);
        if (res.disease?.severity === 'Healthy') {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }
      } else {
        setErrorMsg(res.error || "Diagnosis failed. Please check image quality and retry.");
      }
    } catch (err) {
      clearInterval(progressTimer);
      setErrorMsg(err.message || "Failed to connect to the AI diagnostic service.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setDiagnosisResult(null);
    setErrorMsg(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const severityColor = (sev) => {
    if (sev === 'Healthy') return 'badge-healthy';
    if (sev === 'Mild') return 'badge-mild';
    if (sev === 'Moderate') return 'badge-moderate';
    return 'badge-severe';
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>AI Vision Diagnostic Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Intelligent Crop Disease Diagnosis
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Upload or capture a photo of the crop leaf. Our multi-task AI model identifies the crop, estimates growth stage, pinpoints lesions, and prescribes treatments.
        </p>
      </div>

      {/* Image Upload & Options Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">

        {/* Crop Hint Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
          <div>
            <label className="text-xs font-bold text-slate-800 block">Crop Species Focus (Optional)</label>
            <p className="text-[11px] text-slate-500">Leave on Auto-Detect or select a specific species to refine the diagnosis.</p>
          </div>
          <select
            value={selectedCropHint}
            onChange={(e) => setSelectedCropHint(e.target.value)}
            className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {CROPS_LIST.map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Upload Dropzone / Preview Area */}
        {!previewUrl ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                : 'border-slate-300 hover:border-emerald-400 bg-slate-50/60'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Drag and drop your crop leaf image here
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Supports JPG, JPEG, PNG, WEBP (Max 15MB)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  Browse Files
                </button>

                <button
                  type="button"
                  onClick={startCamera}
                  className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5"
                >
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Use Device Camera</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200/70 text-[11px] text-slate-400 flex items-center justify-center gap-2">
                <Info className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tip: For best accuracy, capture a well-lit, steady close-up of the affected foliage.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode with Replace / Remove */
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[16/9] sm:aspect-[21/9] max-h-96 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Selected Crop Leaf"
                className="w-full h-full object-contain"
              />

              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <div className="relative w-20 h-20 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-sm font-bold tracking-wide">Multi-Task Vision AI Scanning...</p>
                  <p className="text-xs text-emerald-300 mt-1">Detecting lesions, identifying species & computing severity</p>
                  <div className="w-48 bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar beneath preview */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-700">{selectedFile?.name}</span>
                <span>({(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB)</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                  Replace Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isAnalyzing}
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                  title="Remove Image"
                >
                  <X className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-forest-800 to-emerald-600 hover:from-forest-900 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 hover:scale-[1.02] transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  <ScanLine className="w-4 h-4" />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Crop Using AI'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error / Uncertainty Warning Banner */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 text-xs leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">Image Validation Alert</p>
              <p className="mt-0.5">{errorMsg}</p>
              <button
                onClick={handleReset}
                className="mt-2 text-emerald-800 font-bold hover:underline inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Upload a sharper leaf photo</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl space-y-4 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>Live Crop Camera Capture</span>
              </h3>
              <button
                onClick={stopCamera}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-8 border border-white/40 rounded-2xl pointer-events-none" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={capturePhoto}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Take Snapshot</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI DIAGNOSIS RESULTS DASHBOARD */}
      {diagnosisResult && (
        <div className="space-y-8 animate-fadeIn">

          {/* Banner with PDF Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-emerald-800 text-white shadow-md">
            <div>
              <span className="text-emerald-300 text-[11px] font-bold uppercase tracking-wider">Analysis Complete</span>
              <h2 className="text-xl sm:text-2xl font-black mt-0.5">
                {diagnosisResult.crop.name} • {diagnosisResult.disease.name}
              </h2>
              <p className="text-xs text-emerald-100 mt-1">
                AI Confidence: <strong className="text-white">{diagnosisResult.disease.confidence}%</strong> • Severity: <strong className="text-white">{diagnosisResult.disease.severity}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 border border-emerald-500/40"
              >
                <RefreshCw className="w-4 h-4 text-emerald-300" />
                <span>Scan Another Crop Image</span>
              </button>

              <button
                onClick={() => generateDiagnosisPDF(diagnosisResult, user)}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-emerald-700" />
                <span>Download Report (PDF)</span>
              </button>
            </div>
          </div>

          {/* Results Grid: Left Card (Identification & Phenology), Right Card (Visual Mask) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* A. CROP & GROWTH STAGE (Col 5) */}
            <div className="lg:col-span-5 space-y-6">

              {/* Crop Identification Card */}
              <div className="agri-card p-6 space-y-4">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">A. Crop Identification</span>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{diagnosisResult.crop.name}</h3>
                    <p className="text-xs text-slate-500 italic">{diagnosisResult.crop.botanical_name}</p>
                  </div>
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                    {diagnosisResult.crop.confidence}% Match
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Category</span>
                    <span className="font-semibold text-slate-800">{diagnosisResult.crop.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Ideal Range</span>
                    <span className="font-semibold text-slate-800">{diagnosisResult.crop.ideal_temp_c}</span>
                  </div>
                </div>
              </div>

              {/* B. Crop Growth Stage Track Card */}
              <div className="agri-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">B. Growth Stage Estimation</span>
                  <span className="text-xs font-semibold text-slate-700">
                    Stage: <strong className="text-emerald-800">{diagnosisResult.growth_stage.estimated_stage}</strong>
                  </span>
                </div>

                {/* Growth Stage Stepper */}
                <div className="relative pt-2">
                  <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                    {ALL_GROWTH_STAGES.map((stageName, idx) => {
                      const isCurrent = stageName.toLowerCase() === diagnosisResult.growth_stage.estimated_stage.toLowerCase();
                      const currentIdx = ALL_GROWTH_STAGES.findIndex(s => s.toLowerCase() === diagnosisResult.growth_stage.estimated_stage.toLowerCase());
                      const isPast = idx <= currentIdx;

                      return (
                        <div
                          key={stageName}
                          className={`p-2 rounded-xl text-center border text-[11px] transition-all ${
                            isCurrent
                              ? 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-sm'
                              : isPast
                              ? 'bg-emerald-50 text-emerald-800 font-semibold border-emerald-200'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                        >
                          <span className="block text-[9px] text-slate-400">{idx + 1}</span>
                          <span className="truncate block">{stageName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* C & D. Disease Identification & Severity */}
              <div className="agri-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">C & D. Disease & Severity</span>
                  <span className={severityColor(diagnosisResult.disease.severity)}>
                    {diagnosisResult.disease.severity}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">{diagnosisResult.disease.name}</h3>
                  <p className="text-xs text-slate-500 italic mt-0.5">{diagnosisResult.disease.scientific_name}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{diagnosisResult.disease.description}</p>
                </div>

                {/* Lesion Area Progress Gauge */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Affected Foliar Lesion Area:</span>
                    <span className="text-slate-900">{diagnosisResult.disease.affected_area_percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        diagnosisResult.disease.severity === 'Healthy'
                          ? 'bg-emerald-500'
                          : diagnosisResult.disease.severity === 'Mild'
                          ? 'bg-amber-500'
                          : diagnosisResult.disease.severity === 'Moderate'
                          ? 'bg-orange-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.max(diagnosisResult.disease.affected_area_percentage, 5)}%` }}
                    />
                  </div>
                </div>

                {/* Symptoms Detected */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-bold text-slate-800">Detected Foliar Symptoms:</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {diagnosisResult.disease.symptoms_detected.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* E. VISUAL DIAGNOSIS: SYMPTOM MASK & HEATMAP OVERLAY (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="agri-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">E. Visual Diagnosis & Lesion Mask</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">Symptom Localization Heatmap</h3>
                  </div>

                  {/* Toggle Tab */}
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
                    <button
                      onClick={() => setActiveImageTab('annotated')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeImageTab === 'annotated'
                          ? 'bg-white text-emerald-800 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      AI Symptom Overlay
                    </button>
                    <button
                      onClick={() => setActiveImageTab('original')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeImageTab === 'original'
                          ? 'bg-white text-emerald-800 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Original Image
                    </button>
                  </div>
                </div>

                {/* Image Viewport */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 aspect-[4/3] flex items-center justify-center">
                  <img
                    src={
                      activeImageTab === 'annotated'
                        ? diagnosisResult.visual_diagnosis.annotated_image_url
                        : diagnosisResult.visual_diagnosis.original_image_url
                    }
                    alt="Foliar Analysis Visual"
                    className="w-full h-full object-contain"
                  />

                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] text-white font-medium border border-white/10 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {activeImageTab === 'annotated' ? 'Visual Lesion Mask Active' : 'Original Raw Leaf Sample'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">AI Visual Explanation:</strong> {diagnosisResult.visual_diagnosis.explanation}
                </div>
              </div>
            </div>

          </div>

          {/* 6. INTELLIGENT TREATMENT AND MANAGEMENT ACCORDIONS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Agronomic Prescription</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Intelligent Treatment & Field Management
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Structured action plan combining immediate quarantine, organic bio-treatments, label-safe chemical options, and irrigation schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Immediate Actions */}
              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span>Immediate Field Actions</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {diagnosisResult.treatment_and_management.immediate_actions.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organic Solutions */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Organic & Biological Solutions</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {diagnosisResult.treatment_and_management.organic_treatments.map((org, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{org}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment Options */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Approved Chemical Options & Label Guidance</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {diagnosisResult.treatment_and_management.chemical_treatments.map((chem, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <span>{chem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Irrigation & Fertilizer Planning */}
              <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-sky-900 font-bold text-xs uppercase tracking-wider">
                  <Droplets className="w-4 h-4 text-sky-700" />
                  <span>Irrigation & Nutrition Management</span>
                </div>
                <div className="text-xs text-slate-700 space-y-2">
                  <p><strong>Irrigation:</strong> {diagnosisResult.treatment_and_management.irrigation_management}</p>
                  <p><strong>Fertilizer:</strong> {diagnosisResult.treatment_and_management.fertilizer_management}</p>
                </div>
              </div>

            </div>

            {/* Long-term Prevention Tips */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-2">Long-Term Crop Protection & Resistance:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {diagnosisResult.treatment_and_management.prevention_tips.map((tip, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-2xl bg-slate-100 text-slate-500 text-[11px] leading-relaxed">
              <strong>Statutory Advisory:</strong> {diagnosisResult.treatment_and_management.safety_disclaimer}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
