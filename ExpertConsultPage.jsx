import React, { useState } from 'react';
import {
  UserCheck,
  Send,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function ExpertConsultPage() {
  const { user } = useAuth();

  const [farmerName, setFarmerName] = useState(user?.full_name || '');
  const [farmerEmail, setFarmerEmail] = useState(user?.email || '');
  const [cropName, setCropName] = useState('Tomato');
  const [topic, setTopic] = useState('Severe Leaf Spot & Rapid Blight Spread');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+91 98450 12345');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.submitExpertInquiry({
        farmer_name: farmerName,
        farmer_email: farmerEmail,
        crop_name: cropName,
        topic,
        message,
        phone_number: phoneNumber
      });
      setSubmissionResult(res);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <UserCheck className="w-4 h-4" />
          <span>Agricultural Extension Advisory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Consult Certified Agricultural Experts
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Have an ambiguous foliar pathogen or complex soil condition? Route your field report directly to our ICAR-accredited agronomist panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Consultation Form (Col 7) */}
        <div className="md:col-span-7 agri-card p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Submit Field Advisory Request</h2>

          {submissionResult ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-emerald-950">Inquiry Dispatched Successfully!</h3>
              <p className="text-xs text-slate-600">
                Assigned to: <strong className="text-emerald-900">{submissionResult.assigned_expert}</strong>
              </p>
              <div className="p-3 bg-white rounded-xl text-xs text-slate-700 border border-emerald-100">
                An acknowledgment SMS and detailed prescription report will be delivered within {submissionResult.expected_turnaround}.
              </div>
              <button
                onClick={() => setSubmissionResult(null)}
                className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
              >
                Submit Another Consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Farmer Name</label>
                  <input
                    type="text"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={farmerEmail}
                  onChange={(e) => setFarmerEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Crop Species</label>
                  <select
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                  >
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
                  <label className="font-semibold text-slate-700 block mb-1">Consultation Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Field Observations</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe foliar symptoms, recent rain events, fertilizer applied, and whether lesions are spreading..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Routing to Agronomist...' : 'Submit Consultation Request'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Agronomy Panel Details (Col 5) */}
        <div className="md:col-span-5 space-y-4">
          <div className="agri-card p-6 space-y-4 bg-gradient-to-br from-emerald-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Dr. R. Sundaram, Ph.D.</h3>
                <p className="text-xs text-emerald-800 font-semibold">Chief Plant Pathologist (ICAR Fellow)</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              24 years of field pathology research specializing in Solanaceous blights, rice blast epidemiology, and organic bio-fertilizer formulations.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Standard Turnaround: 24 Business Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Non-Chemical & IPM Recommendations</span>
              </div>
            </div>
          </div>

          <div className="agri-card p-5 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900">Kisan Helpline & Emergency Contact</h4>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Toll Free: 1800-180-1551 (Mon-Sat 6 AM - 10 PM)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>advisory@agriai-cropcare.gov.in</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
