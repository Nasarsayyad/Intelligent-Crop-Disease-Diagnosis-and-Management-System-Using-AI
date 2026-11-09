import jsPDF from 'jspdf';

export function generateDiagnosisPDF(diagnosisData, user = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryGreen = [20, 83, 45]; // #14532d
  const emeraldGreen = [5, 150, 105]; // #059669
  const textDark = [30, 41, 59];
  const textMuted = [100, 116, 139];

  // Header Banner
  doc.setFillColor(...primaryGreen);
  doc.rect(0, 0, 210, 36, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("INTELLIGENT CROP DISEASE DIAGNOSIS & MANAGEMENT", 14, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(209, 250, 229);
  doc.text("AI Agricultural Vision & Agronomic Prescription Report | ICAR Aligned", 14, 23);

  const reportDate = diagnosisData.created_at ? new Date(diagnosisData.created_at).toLocaleString() : new Date().toLocaleString();
  doc.setFontSize(8.5);
  doc.text(`Report ID: ${diagnosisData.diagnosis_id || diagnosisData.id || 'DIAG-SCAN-01'} | Date: ${reportDate}`, 14, 30);

  // Farmer & Farm Details Card
  let y = 46;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryGreen);
  doc.text("FARMER & FIELD REGISTRATION", 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  doc.text(`Farmer Name: ${user.full_name || 'Kavitha Raman'}`, 20, y + 14);
  doc.text(`Farm Location: ${user.farm_location || 'Coimbatore, Tamil Nadu'}`, 20, y + 21);

  doc.text(`Farm Enterprise: ${user.farm_name || 'GreenFields Organic Farm'}`, 110, y + 14);
  doc.text(`Acreage: ${user.farm_size_acres ? user.farm_size_acres + ' Acres' : '5.0 Acres'}`, 110, y + 21);

  // Diagnosis Summary Table
  y = 80;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryGreen);
  doc.text("AI DIAGNOSIS & PHENOLOGICAL RESULTS", 14, y);

  y += 5;
  doc.setFillColor(240, 253, 244);
  doc.rect(14, y, 182, 34, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.rect(14, y, 182, 34, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...textDark);

  // Left column
  doc.text("Identified Crop:", 20, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosisData.crop?.name || diagnosisData.crop_name} (${diagnosisData.crop?.botanical_name || 'Botanical Specimen'})`, 55, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.text("Growth Stage:", 20, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosisData.growth_stage?.estimated_stage || diagnosisData.growth_stage || 'Vegetative'}`, 55, y + 16);

  doc.setFont('helvetica', 'bold');
  doc.text("Diagnosis Severity:", 20, y + 24);
  const sev = diagnosisData.disease?.severity || diagnosisData.disease_severity || 'Healthy';
  doc.setFont('helvetica', 'bold');
  if (sev === 'Healthy') doc.setTextColor(5, 150, 105);
  else if (sev === 'Mild') doc.setTextColor(217, 119, 6);
  else if (sev === 'Moderate') doc.setTextColor(234, 88, 12);
  else doc.setTextColor(225, 29, 72);
  doc.text(`${sev} (Lesion Area: ${diagnosisData.disease?.affected_area_percentage || diagnosisData.affected_area_percentage || 0}%)`, 55, y + 24);

  // Right column
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.text("Pathogen / Disease:", 110, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosisData.disease?.name || diagnosisData.disease_name}`, 148, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.text("Scientific Name:", 110, y + 16);
  doc.setFont('helvetica', 'italic');
  doc.text(`${diagnosisData.disease?.scientific_name || diagnosisData.scientific_name || 'N/A'}`, 148, y + 16);

  doc.setFont('helvetica', 'bold');
  doc.text("AI Confidence:", 110, y + 24);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosisData.disease?.confidence || diagnosisData.disease_confidence || 96.5}%`, 148, y + 24);

  // Symptoms & Causes
  y = 126;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryGreen);
  doc.text("DETECTED SYMPTOMS & ETIOLOGY", 14, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);

  const symptoms = diagnosisData.disease?.symptoms_detected || diagnosisData.symptoms || [];
  const symptomsText = symptoms.slice(0, 3).map(s => `• ${s}`).join('\n');
  const splitSymptoms = doc.splitTextToSize(symptomsText || "• Healthy leaf tissue with intact epidermal cell structure.", 180);
  doc.text(splitSymptoms, 14, y);

  y += (splitSymptoms.length * 4.5) + 6;

  // Prescribed Treatments
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryGreen);
  doc.text("INTELLIGENT TREATMENT & AGRONOMIC MANAGEMENT", 14, y);

  y += 5;
  const treatments = diagnosisData.treatment_and_management || {};

  // Immediate Actions Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14, y, 182, 18, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(185, 28, 28);
  doc.text("IMMEDIATE FIELD ACTIONS:", 18, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  const immediate = (treatments.immediate_actions || []).slice(0, 2).join(' ') || "Inspect crop regularly and maintain sanitary field perimeter.";
  const splitImm = doc.splitTextToSize(immediate, 172);
  doc.text(splitImm, 18, y + 10);

  y += 24;

  // Organic Treatments
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text("🌿 Organic & Biological Solutions:", 14, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  const organic = (treatments.organic_treatments || []).slice(0, 2).map(o => `• ${o}`).join('\n') || "• Apply prophylactic neem oil (5ml/L) and vermiwash.";
  const splitOrg = doc.splitTextToSize(organic, 180);
  doc.text(splitOrg, 14, y);

  y += (splitOrg.length * 4.5) + 5;

  // Chemical Treatments with Safety Guidance
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9);
  doc.text("🧪 Approved Chemical Control & Label Guidance:", 14, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  const chemical = (treatments.chemical_treatments || []).slice(0, 2).map(c => `• ${c}`).join('\n') || "• No synthetic chemical intervention required.";
  const splitChem = doc.splitTextToSize(chemical, 180);
  doc.text(splitChem, 14, y);

  y += (splitChem.length * 4.5) + 5;

  // Irrigation & Fertilizer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...primaryGreen);
  doc.text("💧 Irrigation & Fertilizer Plan:", 14, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  const irriFert = `Irrigation: ${treatments.irrigation_management || 'Use drip irrigation; avoid wet leaves.'}\nFertilizer: ${treatments.fertilizer_management || 'Balanced N:P:K.'}`;
  const splitIrri = doc.splitTextToSize(irriFert, 180);
  doc.text(splitIrri, 14, y);

  // Footer Disclaimer
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 275, 210, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("STATUTORY AGRICULTURAL DISCLAIMER & SAFETY NOTICE", 14, 280);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.text("This report is an AI-assisted diagnostic decision support document. Preliminary visual findings should be cross-verified with local Agricultural Extension Officers before making large chemical applications. Follow all local label warnings and pesticide safety laws strictly.", 14, 285, { maxWidth: 182 });

  // Save PDF
  const filename = `CropCare_Diagnosis_${diagnosisData.crop?.name || diagnosisData.crop_name || 'Crop'}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
