import React from 'react';
import { Link } from 'react-router-dom';
import {
  ScanLine,
  Sprout,
  ShieldAlert,
  CloudSun,
  Bot,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  ThermometerSun,
  FileText,
  CalendarCheck
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function LandingPage() {
  const { t } = useLanguage();

  const supportedCrops = [
    { name: "Green Gram (Moong)", category: "Fabaceae (Pulses)", diseases: "Cercospora Leaf Spot, Yellow Mosaic, Anthracnose", icon: "🌱", color: "from-emerald-500/10 to-teal-500/10" },
    { name: "Black Gram (Urad)", category: "Fabaceae (Pulses)", diseases: "Cercospora Leaf Spot, Yellow Mosaic, Powdery Mildew", icon: "🌿", color: "from-slate-700/10 to-emerald-500/10" },
    { name: "Bell Pepper", category: "Solanaceae (Capsicum)", diseases: "Cercospora Leaf Spot, Bacterial Spot, Anthracnose", icon: "🫑", color: "from-emerald-500/10 to-green-500/10" },
    { name: "Tomato", category: "Solanaceae", diseases: "Early Blight, Late Blight, Bacterial Spot, Leaf Mold", icon: "🍅", color: "from-red-500/10 to-orange-500/10" },
    { name: "Potato", category: "Solanaceae", diseases: "Late Blight, Early Blight, Scab, Blackleg", icon: "🥔", color: "from-amber-600/10 to-yellow-600/10" },
    { name: "Rice (Paddy)", category: "Poaceae", diseases: "Blast, Brown Spot, Sheath Blight, Bacterial Blight", icon: "🌾", color: "from-emerald-500/10 to-teal-500/10" },
    { name: "Corn (Maize)", category: "Poaceae", diseases: "Northern Leaf Blight, Common Rust, Gray Spot", icon: "🌽", color: "from-yellow-500/10 to-amber-500/10" },
    { name: "Grape", category: "Vitaceae", diseases: "Black Rot, Powdery Mildew, Downy Mildew, Esca", icon: "🍇", color: "from-purple-500/10 to-indigo-500/10" },
    { name: "Apple", category: "Rosaceae", diseases: "Apple Scab, Cedar Rust, Black Rot, Fire Blight", icon: "🍎", color: "from-rose-500/10 to-red-500/10" }
  ];

  const features = [
    {
      icon: ScanLine,
      title: "AI Vision Disease Detection",
      desc: "Computer vision detects foliar necrotic lesions, chlorotic halos, and powdery patches with confidence scores."
    },
    {
      icon: Layers,
      title: "Phenological Growth Stages",
      desc: "Classifies 8 key stages from Germination, Vegetative, Flowering to Maturity for precision timing."
    },
    {
      icon: ThermometerSun,
      title: "Weather-Based Risk Alerts",
      desc: "Correlates temperature, humidity, and rainfall to provide advance warnings for high fungal blight spore events."
    },
    {
      icon: FileText,
      title: "Organic & Label-Safe Rx",
      desc: "Offers non-toxic botanical treatments, IPM guidelines, and chemical safety rules with strict pre-harvest intervals."
    },
    {
      icon: Activity,
      title: "Periodic Health Tracking",
      desc: "Monitor monitored plots across weeks with Recharts health scores and earlier vs recent visual comparison."
    },
    {
      icon: Bot,
      title: "Bilingual AgriBot",
      desc: "Interactive agricultural AI assistant answering disease, fertilizer, and irrigation queries in English and Tamil."
    }
  ];

  const workflowSteps = [
    { step: "01", title: "Capture or Upload", desc: "Take a photo of the affected crop leaf using device camera or file drag-and-drop." },
    { step: "02", title: "AI Multi-Task Scan", desc: "Our vision pipeline validates leaf clarity, determines crop species, and evaluates growth stage." },
    { step: "03", title: "Inspect Lesion Mask", desc: "Review highlighted visual bounding boxes, lesion percentage, and severity classification." },
    { step: "04", title: "Apply Precision Care", desc: "Execute immediate field actions, organic remedies, irrigation schedules, and download PDF reports." }
  ];

  return (
    <div className="space-y-16 py-4">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-900 text-white p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-forest-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Agricultural Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Smart Crop Diagnosis <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300">
              Powered by AI
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
            {t('tagline')}
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link
              to="/diagnose"
              className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 hover:scale-[1.02] transition-all"
            >
              <ScanLine className="w-4 h-4 mr-2" />
              <span>{t('analyze_btn')}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all"
            >
              <span>{t('explore_btn')}</span>
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-12 pt-8 border-t border-emerald-700/40 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">98.2%</p>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">Diagnostic Accuracy</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">12+ Crops</p>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">Supported Species</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">35+ Blights</p>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">Pathogens Detected</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">&lt; 3.0 sec</p>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">Real-Time Inference</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">Comprehensive Precision Agriculture</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Built for Commercial Farms & Smallholders</h2>
          <p className="text-sm text-slate-600 mt-2">Engineered with agronomic safety protocols, computer vision, and bilingual farmer support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="agri-card p-6 flex flex-col justify-between group hover:border-emerald-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-4">{f.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">How AI Crop Diagnosis Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((s, idx) => (
            <div key={idx} className="relative p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-emerald-600/30">{s.step}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-2">{s.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span>Automated Validation</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Crops Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">Extensive Plant Pathology</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Supported Agricultural Crops</h2>
          </div>
          <Link
            to="/knowledge"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center"
          >
            <span>View Full Knowledge Base</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {supportedCrops.map((c, i) => (
            <div key={i} className="agri-card p-5 hover:border-emerald-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner">
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                  <span className="text-[11px] text-emerald-700 font-semibold">{c.category}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                <strong className="text-slate-700">Pathogens:</strong> {c.diseases}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">8 Growth Stages</span>
                <Link
                  to={`/diagnose?crop=${encodeURIComponent(c.name)}`}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Analyze &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-800 to-forest-900 text-white p-8 sm:p-12 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-emerald-300 font-bold text-xs uppercase tracking-wider">Agronomic Impact</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">Why Continuous AI Monitoring Matters</h2>
            <p className="text-sm text-emerald-100/90 mt-3 leading-relaxed">
              Early detection prevents catastrophic crop collapse. By catching foliar infections at &lt; 5% lesion spread, farmers cut chemical expenditures by up to 45% and prevent extensive harvest losses.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Prevent 30-40% yield loss from fast-moving fungal blights",
                "Reduce synthetic chemical run-off through targeted spot treatment",
                "Receive weather-based fungal spore risk alerts 48 hours in advance",
                "Maintain digital field records for organic certification audits"
              ].map((b, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-base text-white">Start Protecting Your Crops Today</h3>
            <p className="text-xs text-emerald-200 mt-1">No special hardware needed. Use any smartphone or web browser.</p>

            <div className="mt-6 space-y-3">
              <Link
                to="/diagnose"
                className="w-full py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-forest-950 font-bold text-xs rounded-xl shadow-md text-center block transition-all"
              >
                Launch Instant Crop Scan
              </Link>
              <Link
                to="/chat"
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl text-center block transition-all"
              >
                Ask AgriBot a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-10 pb-6 text-slate-500 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-800 text-sm">Intelligent Crop Disease Diagnosis System Using AI</span>
            </div>
            <p className="text-slate-600 max-w-md">
              A comprehensive agricultural intelligence web platform for automated pathogen detection, phenological classification, and sustainable crop protection.
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-800 mb-2">Modules</p>
            <ul className="space-y-1.5">
              <li><Link to="/diagnose" className="hover:text-emerald-700">AI Diagnosis</Link></li>
              <li><Link to="/weather" className="hover:text-emerald-700">Weather Risk Radar</Link></li>
              <li><Link to="/monitoring" className="hover:text-emerald-700">Health Timeline</Link></li>
              <li><Link to="/chat" className="hover:text-emerald-700">AgriBot Assistant</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-slate-800 mb-2">Statutory Advisory</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Diagnostic insights conform to ICAR Integrated Pest Management (IPM) guidelines. Always review chemical label precautions.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
          <span>&copy; {new Date().getFullYear()} Intelligent Crop Disease Diagnosis & Management System. All rights reserved.</span>
          <span>Engineered with React • FastAPI • Computer Vision AI</span>
        </div>
      </footer>

    </div>
  );
}
