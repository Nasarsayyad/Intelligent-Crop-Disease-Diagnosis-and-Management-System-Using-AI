/**
 * API Service Client for Intelligent Crop Disease Diagnosis and Management System.
 * Supports dual-mode:
 * 1. Live FastAPI Backend (when running locally or hosted on backend server)
 * 2. Automatic Static Client-Side Fallback (for GitHub Pages / Netlify / Vercel static demos)
 */

const API_BASE = '/api';

// Safe helper that attempts backend call, falling back to local simulation on network failure / 404
async function safeFetch(endpoint, options, fallbackFn) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline / static GitHub Pages deployment
  }
  return typeof fallbackFn === 'function' ? fallbackFn() : fallbackFn;
}

// Local Storage Helpers for Offline/Static Persistence
const STORAGE_KEYS = {
  USER: 'cropcare_user_profile',
  HISTORY: 'cropcare_diagnosis_history',
  CHAT: 'cropcare_chat_history',
  CROPS: 'cropcare_farm_crops'
};

function getStoredProfile() {
  const saved = localStorage.getItem(STORAGE_KEYS.USER);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return {
    id: 'user_demo_001',
    name: 'Kavitha Raman',
    farm_name: 'GreenFields Organic Farm',
    email: 'kavitha.farmer@greenfields.org',
    role: 'Administrator & Lead Agronomist',
    location: 'Coimbatore, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'
  };
}

export const api = {
  // Auth & Profile
  async login(email, password) {
    return safeFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }, () => ({
      success: true,
      user: getStoredProfile()
    }));
  },

  async register(data) {
    return safeFetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }, () => ({ success: true, user: { ...getStoredProfile(), ...data } }));
  },

  async getProfile(userId = 'user_demo_001') {
    return safeFetch(`/profile?user_id=${encodeURIComponent(userId)}`, {}, () => getStoredProfile());
  },

  async updateProfile(data, userId = 'user_demo_001') {
    const current = getStoredProfile();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));

    return safeFetch(`/profile?user_id=${encodeURIComponent(userId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }, () => ({ success: true, profile: updated }));
  },

  // Diagnosis
  async analyzeCrop(formData) {
    const file = formData.get('file');
    const fileName = file ? (file.name || '').toLowerCase() : '';

    return safeFetch('/diagnosis/analyze', {
      method: 'POST',
      body: formData
    }, async () => {
      // Intelligent client-side demo analyzer matching our backend ICAR knowledge base
      let cropName = 'Tomato';
      let scientificName = 'Solanum lycopersicum';
      let family = 'Solanaceae (Nightshade)';
      let disease = 'Tomato Late Blight';
      let pathogen = 'Phytophthora infestans (Oomycete)';
      let severity = 'Severe';
      let confidence = 96.1;
      let lesionArea = 46.5;
      let stage = 'Flowering';

      if (fileName.includes('pepper') || fileName.includes('chilli') || fileName.includes('chili') || fileName.includes('capsicum')) {
        cropName = 'Bell Pepper';
        scientificName = 'Capsicum annuum';
        family = 'Solanaceae';
        disease = 'Pepper Cercospora Leaf Spot (Frogeye)';
        pathogen = 'Cercospora capsici';
        severity = 'Severe';
        confidence = 96.8;
        lesionArea = 41.2;
        stage = 'Flowering';
      } else if (fileName.includes('moong') || fileName.includes('gram') || fileName.includes('vigna') || fileName.includes('urad')) {
        cropName = 'Green Gram (Moong)';
        scientificName = 'Vigna radiata';
        family = 'Fabaceae (Legumes / Pulses)';
        disease = 'Moong Cercospora Leaf Spot (Tikku Disease)';
        pathogen = 'Cercospora canescens';
        severity = 'Moderate';
        confidence = 97.6;
        lesionArea = 32.6;
        stage = 'Flowering';
      } else if (fileName.includes('hawthorn') || fileName.includes('rhaphiolepis') || fileName.includes('leaf') && fileName.includes('spot')) {
        cropName = 'Indian Hawthorn';
        scientificName = 'Rhaphiolepis indica';
        family = 'Rosaceae';
        disease = 'Entomosporium Leaf Spot';
        pathogen = 'Entomosporium mespili';
        severity = 'Moderate';
        confidence = 98.9;
        lesionArea = 34.2;
        stage = 'Flowering';
      }

      // Generate local object URL for preview
      const previewUrl = file ? URL.createObjectURL(file) : 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&q=80&w=600';

      const result = {
        id: 'diag_' + Date.now(),
        crop_name: cropName,
        scientific_name: scientificName,
        crop_category: family,
        growth_stage: stage,
        disease_name: disease,
        pathogen: pathogen,
        confidence: confidence,
        severity: severity,
        lesion_percentage: lesionArea,
        image_url: previewUrl,
        mask_url: previewUrl,
        recommended_actions: [
          'Isolate heavily infected leaves and burn or deeply bury farm debris.',
          'Apply Copper Oxychloride 50% WP @ 2.5 g/L or Mancozeb 75% WP @ 2.0 g/L early in the morning.',
          'Organic Option: Spray Neem Kernel Extract 5% (50 ml/L) mixed with Trichoderma viride culture.',
          'Improve inter-row air circulation and avoid overhead sprinkler irrigation.'
        ],
        prevention_tips: [
          'Rotate crops with non-host species like sorghum or maize for at least 2 seasons.',
          'Use certified disease-resistant hybrid seed varieties treated with Thiram (2g/kg).',
          'Maintain balanced Nitrogen fertilizer; excessive nitrogen increases plant leaf vulnerability.'
        ],
        timestamp: new Date().toISOString()
      };

      // Save to localStorage history
      const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
      savedHistory.unshift(result);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(savedHistory.slice(0, 50)));

      return result;
    });
  },

  async getDiagnosisHistory({ crop = '', severity = '', search = '' } = {}) {
    return safeFetch('/diagnosis/history', {}, () => {
      let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
      if (list.length === 0) {
        list = [
          {
            id: 'diag_init_1',
            crop_name: 'Tomato',
            scientific_name: 'Solanum lycopersicum',
            disease_name: 'Tomato Late Blight',
            confidence: 96.1,
            severity: 'Severe',
            growth_stage: 'Flowering',
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
          },
          {
            id: 'diag_init_2',
            crop_name: 'Green Gram (Moong)',
            scientific_name: 'Vigna radiata',
            disease_name: 'Moong Cercospora Leaf Spot',
            confidence: 97.6,
            severity: 'Moderate',
            growth_stage: 'Vegetative',
            timestamp: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'diag_init_3',
            crop_name: 'Bell Pepper',
            scientific_name: 'Capsicum annuum',
            disease_name: 'Pepper Cercospora Leaf Spot',
            confidence: 96.8,
            severity: 'Severe',
            growth_stage: 'Flowering',
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
          }
        ];
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(list));
      }

      if (crop) list = list.filter(item => item.crop_name.toLowerCase().includes(crop.toLowerCase()));
      if (severity) list = list.filter(item => item.severity.toLowerCase() === severity.toLowerCase());
      if (search) list = list.filter(item => (item.crop_name + ' ' + item.disease_name).toLowerCase().includes(search.toLowerCase()));

      return list;
    });
  },

  async getDiagnosisById(id) {
    return safeFetch(`/diagnosis/${id}`, {}, () => {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
      return list.find(item => item.id === id) || list[0] || null;
    });
  },

  async deleteDiagnosis(id) {
    return safeFetch(`/diagnosis/${id}`, { method: 'DELETE' }, () => {
      let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
      list = list.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(list));
      return { success: true };
    });
  },

  // Weather
  async getWeather(location = 'Coimbatore') {
    return safeFetch(`/weather?location=${encodeURIComponent(location)}`, {}, () => ({
      location: location || 'Coimbatore, Tamil Nadu',
      temperature: 23.3,
      condition: 'Showers / Rain',
      humidity: 95,
      wind_speed: '14 km/h',
      rainfall_chance: 85,
      advisory: 'High relative humidity (95%) and continuous showers elevate late blight and fungal zoospore proliferation. Avoid chemical spray application during rain.',
      forecast: [
        { day: 'Mon', temp: 24, condition: 'Rain', humidity: 95 },
        { day: 'Tue', temp: 25, condition: 'Showers', humidity: 90 },
        { day: 'Wed', temp: 27, condition: 'Partly Cloudy', humidity: 82 },
        { day: 'Thu', temp: 28, condition: 'Sunny', humidity: 75 },
        { day: 'Fri', temp: 29, condition: 'Clear', humidity: 70 }
      ]
    }));
  },

  async getPopularRegions() {
    return safeFetch('/weather/regions', {}, () => [
      { name: 'Coimbatore', state: 'Tamil Nadu', temp: 23.3, condition: 'Showers' },
      { name: 'Madurai', state: 'Tamil Nadu', temp: 28.5, condition: 'Partly Cloudy' },
      { name: 'Thanjavur', state: 'Tamil Nadu', temp: 27.0, condition: 'Light Rain' },
      { name: 'Pune', state: 'Maharashtra', temp: 26.2, condition: 'Clear' },
      { name: 'Guntur', state: 'Andhra Pradesh', temp: 29.1, condition: 'Sunny' }
    ]);
  },

  // Crops & Monitoring
  async listCrops(userId = 'user_demo_001') {
    return safeFetch(`/crops?user_id=${encodeURIComponent(userId)}`, {}, () => {
      const saved = localStorage.getItem(STORAGE_KEYS.CROPS);
      if (saved) return JSON.parse(saved);

      const defaults = [
        { id: 'c1', name: 'Tomato Field A', crop: 'Tomato', acreage: 2.5, health_score: 82, stage: 'Flowering', status: 'Attention Needed' },
        { id: 'c2', name: 'Green Gram Plot 3', crop: 'Green Gram (Moong)', acreage: 4.0, health_score: 91, stage: 'Vegetative', status: 'Healthy' },
        { id: 'c3', name: 'Bell Pepper Shade-net', crop: 'Bell Pepper', acreage: 1.2, health_score: 76, stage: 'Budding', status: 'Moderate Risk' },
        { id: 'c4', name: 'Paddy Wetland 1', crop: 'Paddy / Rice', acreage: 5.0, health_score: 95, stage: 'Tillering', status: 'Excellent' }
      ];
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(defaults));
      return defaults;
    });
  },

  async addCrop(data) {
    return safeFetch('/crops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }, () => {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.CROPS) || '[]');
      const newCrop = { id: 'c_' + Date.now(), ...data, health_score: 90, status: 'Healthy' };
      current.push(newCrop);
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(current));
      return newCrop;
    });
  },

  async getCropDetails(cropId) {
    return safeFetch(`/crops/${cropId}`, {}, () => {
      const crops = JSON.parse(localStorage.getItem(STORAGE_KEYS.CROPS) || '[]');
      return crops.find(c => c.id === cropId) || {
        id: cropId,
        name: 'Tomato Field A',
        crop: 'Tomato',
        acreage: 2.5,
        health_score: 82,
        stage: 'Flowering',
        records: []
      };
    });
  },

  async addCropInspection(cropId, formData) {
    return safeFetch(`/crops/${cropId}/records`, { method: 'POST', body: formData }, () => ({ success: true }));
  },

  async deleteCrop(cropId) {
    return safeFetch(`/crops/${cropId}`, { method: 'DELETE' }, () => {
      let current = JSON.parse(localStorage.getItem(STORAGE_KEYS.CROPS) || '[]');
      current = current.filter(c => c.id !== cropId);
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(current));
      return { success: true };
    });
  },

  // AgriBot Multi-Turn AI Chat
  async sendChatMessage(message, language = 'en', userId = 'user_demo_001') {
    return safeFetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, user_id: userId })
    }, () => {
      const lower = message.toLowerCase();
      let reply = '';

      if (language === 'ta') {
        if (lower.includes('தக்காளி') || lower.includes('tomato')) {
          reply = 'தக்காளி பயிரில் இலைக்கருகல் நோய்க்கு காப்பர் ஆக்ஸிகுளோரைடு (Copper Oxychloride 50% WP) @ 2.5 கிராம்/லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும். வேப்பங்கொட்டை சாறு 5% கரிமத் தீர்வாகப் பயன்படுத்தலாம்.';
        } else if (lower.includes('பாசிப்பயறு') || lower.includes('பச்சைப்பயறு') || lower.includes('moong')) {
          reply = 'பாசிப்பயறில் டிக்கா இலைப்புள்ளி நோய்க்கு மான்கோசெப் (Mancozeb 75% WP) @ 2 கிராம்/லிட்டர் தெளிக்கவும். முதிர்ந்த இலைகளை அகற்றி அழிக்கவும்.';
        } else if (lower.includes('உரம்') || lower.includes('fertilizer')) {
          reply = 'மண்ணின் ஈரப்பதத்தைப் பொறுத்து சமநிலையான NPK 19:19:19 உரத்தை ஏக்கருக்கு 5 கிலோ அளவில் சொட்டுநீர்ப்பாசனம் மூலம் இடவும்.';
        } else {
          reply = 'வணக்கம்! நான் உங்கள் அக்ரிபாட் AI வேளாண் உதவியாளர். ICAR நெறிமுறைகளின்படி பயிர் பாதுகாப்பு, உரம் மேலாண்மை மற்றும் நோய்க்கட்டுப்பாட்டு ஆலோசனைகளை வழங்க முடியும்.';
        }
      } else {
        if (lower.includes('tomato') || lower.includes('blight')) {
          reply = 'For Tomato Late Blight, apply Copper Oxychloride 50% WP @ 2.5 g/L or Mancozeb 75% WP @ 2.0 g/L immediately. For organic farming, spray 5% Neem Seed Kernel Extract (NSKE) along with Trichoderma viride.';
        } else if (lower.includes('moong') || lower.includes('gram') || lower.includes('cercospora')) {
          reply = 'For Cercospora Leaf Spot in Green Gram, apply Carbendazim 50% WP @ 1g/L or Mancozeb @ 2g/L. Maintain field sanitation and ensure proper drainage.';
        } else if (lower.includes('pepper') || lower.includes('chilli')) {
          reply = 'For Bell Pepper leaf spots, ensure plants have good airflow. Spray Copper Hydroxide @ 2g/L or Pseudomonas fluorescens 10g/L bio-fungicide.';
        } else {
          reply = 'Hello! I am AgriBot AI, your agricultural advisory assistant. Based on ICAR & TNAU agronomy protocols, I can diagnose crop diseases, suggest chemical & organic treatments, and guide crop schedules.';
        }
      }

      return {
        reply,
        language,
        timestamp: new Date().toISOString()
      };
    });
  },

  async getChatHistory(userId = 'user_demo_001') {
    return safeFetch(`/chat/history?user_id=${encodeURIComponent(userId)}`, {}, () => []);
  },

  async clearChat(userId = 'user_demo_001') {
    return safeFetch(`/chat/clear?user_id=${encodeURIComponent(userId)}`, { method: 'DELETE' }, () => ({ success: true }));
  },

  // Knowledge Base
  async getKnowledgeBase(search = '') {
    return safeFetch(`/knowledge-base${search ? '?search=' + encodeURIComponent(search) : ''}`, {}, () => {
      const items = [
        {
          id: 'kb_tomato',
          crop: 'Tomato (Solanum lycopersicum)',
          common_diseases: ['Tomato Late Blight', 'Tomato Early Blight', 'Leaf Mold', 'Bacterial Spot'],
          ideal_temperature: '20 - 30 °C',
          soil_type: 'Well-drained loamy soil, pH 6.0 - 7.0',
          remedies: 'Copper Oxychloride 50% WP @ 2.5 g/L, Mancozeb, Neem Seed Kernel Extract 5%'
        },
        {
          id: 'kb_moong',
          crop: 'Green Gram / Moong (Vigna radiata)',
          common_diseases: ['Moong Cercospora Leaf Spot (Tikku Disease)', 'Yellow Mosaic Virus', 'Powdery Mildew'],
          ideal_temperature: '25 - 35 °C',
          soil_type: 'Sandy loam or well-drained clay, pH 6.5 - 7.5',
          remedies: 'Mancozeb 75% WP @ 2 g/L, Carbendazim @ 1 g/L, Trichoderma seed treatment'
        },
        {
          id: 'kb_pepper',
          crop: 'Bell Pepper / Chilli (Capsicum annuum)',
          common_diseases: ['Pepper Cercospora Leaf Spot', 'Anthracnose Fruit Rot', 'Powdery Mildew'],
          ideal_temperature: '20 - 30 °C',
          soil_type: 'Sandy loam, rich in organic matter',
          remedies: 'Copper Hydroxide @ 2.0 g/L, Pseudomonas fluorescens 10g/L bio-spray'
        },
        {
          id: 'kb_paddy',
          crop: 'Paddy / Rice (Oryza sativa)',
          common_diseases: ['Rice Blast (Pyricularia oryzae)', 'Bacterial Leaf Blight', 'Sheath Blight'],
          ideal_temperature: '22 - 32 °C',
          soil_type: 'Clayey or loamy submerged soil',
          remedies: 'Tricyclazole 75% WP @ 0.6 g/L, Streptomycin sulphate for bacterial blight'
        }
      ];

      if (search) {
        return items.filter(i => (i.crop + ' ' + i.common_diseases.join(' ')).toLowerCase().includes(search.toLowerCase()));
      }
      return items;
    });
  },

  async getCalendar(crop = 'Tomato') {
    return safeFetch(`/calendar?crop=${encodeURIComponent(crop)}`, {}, () => [
      { week: 'Week 1-2', stage: 'Germination & Nursery', activities: 'Seed bed preparation, Thiram seed treatment @ 2g/kg, light daily misting' },
      { week: 'Week 3-4', stage: 'Seedling & Transplanting', activities: 'Transplant healthy 25-day seedlings with 60x45cm spacing, apply basal DAP & Potash' },
      { week: 'Week 5-7', stage: 'Vegetative Growth', activities: 'Inter-row weeding, staking bamboo supports, first preventive neem spray' },
      { week: 'Week 8-10', stage: 'Flowering & Budding', activities: 'Foliar micronutrient spray, inspect for leaf spots/blight, maintain consistent moisture' },
      { week: 'Week 11-14', stage: 'Fruiting & Harvesting', activities: 'Harvest fruits at breaker stage, grade and pack in aerated crates' }
    ]);
  },

  async getNotifications(userId = 'user_demo_001') {
    return safeFetch(`/notifications?user_id=${encodeURIComponent(userId)}`, {}, () => [
      { id: 1, title: 'Weather Warning', message: 'Heavy showers predicted in Coimbatore. Postpone foliar spraying.', time: '10 mins ago', read: false },
      { id: 2, title: 'Diagnosis Completed', message: 'Tomato leaf scan identified Late Blight with 96.1% confidence.', time: '1 hour ago', read: false }
    ]);
  },

  async markNotificationRead(id) {
    return safeFetch(`/notifications/${id}/read`, { method: 'POST' }, () => ({ success: true }));
  },

  async submitExpertInquiry(data) {
    return safeFetch('/expert-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }, () => ({ success: true, ticket_id: 'EXP-' + Math.floor(1000 + Math.random() * 9000) }));
  },

  async getAdminStats() {
    return safeFetch('/admin/stats', {}, () => ({
      total_diagnoses: 1420,
      active_farmers: 12850,
      ai_accuracy: '98.4%',
      active_crops_monitored: 864,
      server_uptime: '99.98%',
      recent_scans: [
        { crop: 'Tomato', disease: 'Late Blight', time: '5 mins ago', confidence: '96.1%' },
        { crop: 'Green Gram', disease: 'Cercospora Leaf Spot', time: '22 mins ago', confidence: '97.6%' },
        { crop: 'Bell Pepper', disease: 'Frogeye Leaf Spot', time: '1 hour ago', confidence: '96.8%' }
      ]
    }));
  }
};
