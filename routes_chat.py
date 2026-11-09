"""
AgriBot - AI Farming Assistant Chatbot API.
Provides intelligent responses for crop diseases, fertilization, irrigation,
organic farming, pest management, and best practices.
Includes full multilingual support (English and Tamil), message history,
suggested questions, and conversational memory.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
import uuid
import re
from datetime import datetime
from ..database.db import get_connection

router = APIRouter(prefix="/api/chat", tags=["AI Farming Assistant (AgriBot)"])

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "user_demo_001"
    language: Optional[str] = "en" # 'en' or 'ta'

SUGGESTED_QUESTIONS_EN = [
    "How do I control Early Blight on my tomatoes organically?",
    "What is the best NPK fertilizer schedule during flowering stage?",
    "How can I prevent Late Blight in potato crops during rainy weather?",
    "What are organic solutions for whitefly and leaf curl virus?",
    "How often should I irrigate tomato crops using drip irrigation?",
    "How do I prepare and use Neem Oil foliar spray safely?"
]

SUGGESTED_QUESTIONS_TA = [
    "தக்காளியில் இலைக்கருகல் நோயை இயற்கை முறையில் கட்டுப்படுத்துவது எப்படி?",
    "பூக்கும் பருவத்தில் என்ன உரம் இட வேண்டும்?",
    "வெள்ளை ஈக்களைக் கட்டுப்படுத்த சிறந்த வழி எது?",
    "சொட்டு நீர் பாசனம் அமைப்பதன் நன்மைகள் என்ன?",
    "வேப்ப எண்ணெய் கரைசலை எவ்வாறு தயாரிப்பது?"
]

def is_tamil(text: str) -> bool:
    # Check for Tamil unicode range \u0B80-\u0BFF
    return bool(re.search(r'[\u0b80-\u0bff]', text))

def generate_agribot_reply(user_message: str, lang: str):
    msg_lower = user_message.lower().strip()
    is_ta = lang == "ta" or is_tamil(user_message)

    # 1. TAMIL RESPONSES
    if is_ta:
        if any(w in msg_lower for w in ["இலைக்கருகல்", "பிளைட்", "blight", "early blight", "late blight"]):
            return (
                "தக்காளி மற்றும் உருளைக்கிழங்கு பயிர்களில் இலைக்கருகல் (Blight) நோய் ஈரப்பதம் அதிகமாக இருக்கும்போது மிக வேகமாகப் பரவும்.\n\n"
                "🌱 **இயற்கை தீர்வு:**\n"
                "• 1 லிட்டர் தண்ணீருக்கு 5 மில்லி வேப்ப எண்ணெய் மற்றும் 1 மில்லி காதி சோப் கலந்து இலைகளின் இருபுறமும் தெளிக்கவும்.\n"
                "• சூடோமோனாஸ் புளோரசன்ஸ் (Pseudomonas fluorescens) 10 கிராம் / லிட்டர் தண்ணீரில் கலந்து 10 நாட்களுக்கு ஒருமுறை தெளிக்கலாம்.\n\n"
                "🧪 **ரசாயன முறை (தேவையெனில்):**\n"
                "• மான்கோசெப் (Mancozeb 75% WP) 2 கிராம் / லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.\n"
                "• தெளிக்கும் போது முகக்கவசம் மற்றும் கையுறைகளை கட்டாயம் அணியவும்.",
                [
                    "பூஞ்சாண நோய்களைத் தடுக்க சரியான பாசன முறை எது?",
                    "வேப்ப எண்ணெய் கரைசல் தயாரிப்பது எப்படி?",
                    "பூக்கும் பருவத்திற்கு ஏற்ற இயற்கை உரங்கள் எவை?"
                ],
                ["கீழ் இலைகளை உடனடியாக கவாத்து செய்து அப்புறப்படுத்துங்கள்.", "இலைகளின் மேல் தண்ணீர் தெளிப்பதைத் தவிர்க்கவும்."]
            )

        if any(w in msg_lower for w in ["உரம்", "fertilizer", "npk", "சத்து"]):
            return (
                "பயிர்களின் வளர்ச்சிப் பருவத்திற்கேற்ப உரமிடுவது மிக முக்கியம்:\n\n"
                "1. **வளர்ச்சிப் பருவம் (Vegetative Stage):** தலைச்சத்து (Nitrogen) தழை வளர்ச்சிக்குத் தேவை. மண்புழு உரம், கடலை புண்ணாக்கு கரைசல் கொடுக்கலாம்.\n"
                "2. **பூக்கும் மற்றும் காய்க்கும் பருவம் (Flowering & Fruiting):** சாம்பல் சத்து (Potash) மற்றும் மணிச்சத்து (Phosphorus) அவசியம். NPK 13:0:45 அல்லது 0:0:50 நீரில் கரையும் உரங்களை தெளிக்கலாம். இது பழங்களின் தரம் மற்றும் எடையை அதிகரிக்கும்.\n\n"
                "💡 **குறிப்பு:** பூக்கும் பருவத்தில் அதிகப்படியான நைட்ரஜன் உரமிட்டால் பூக்கள் உதிரக்கூடும்.",
                [
                    "பூ உதிர்வதைத் தடுப்பது எப்படி?",
                    "மண்புழு உரத்தின் பயன்கள் என்ன?",
                    "சொட்டு நீர் பாசன உர மேலாண்மை (Fertigation) எப்படி செய்வது?"
                ],
                ["பயிர் தேவையை விட அதிக உரம் இடாதீர்கள்.", "நுண்ணூட்டச் சத்து தெளிப்பது காய்களின் தரத்தை உயர்த்தும்."]
            )

        if any(w in msg_lower for w in ["வெள்ளை ஈ", "whitefly", "பூச்சி", "சுருட்டை", "virus"]):
            return (
                "வெள்ளை ஈக்கள் (Whiteflies) இலை சுருட்டை வைரஸ் நோயை (TYLCV) பரப்பும் முக்கிய காரணியாகும்.\n\n"
                "🛡️ **கட்டுப்படுத்தும் வழிகள்:**\n"
                "• ஏக்கருக்கு 15-20 மஞ்சள் நிற ஒட்டும் பொறிகளை (Yellow Sticky Traps) பயிர் மட்டத்தில் கட்டவும்.\n"
                "• வேப்ப எண்ணெய் 3% அல்லது புங்கன் எண்ணெய் கரைசலை மாலை வேளையில் தெளிக்கவும்.\n"
                "• வேப்பங்கொட்டை சாறு 5% (NSKE) தெளிப்பது பூச்சிகளின் முட்டைகளை அழிக்க உதவும்.\n"
                "• பாதித்த செடிகளை வேரோடு பிடுங்கி தீயிட்டு அழிக்கவும்.",
                [
                    "மஞ்சள் ஒட்டும் பொறி எங்கு கிடைக்கும்?",
                    "தக்காளி இலைக்கருகல் நோய் மேலாண்மை என்ன?",
                    "அடுத்த வாரத்திற்கான வானிலை எச்சரிக்கை என்ன?"
                ],
                ["பாதிக்கப்பட்ட செடிகளை வயலில் இருந்து உடனே அகற்றவும்.", "மஞ்சள் நிற அட்டைகள் சிறந்த கண்காணிப்பு கருவி."]
            )

        if any(w in msg_lower for w in ["மிளகாய்", "pepper", "chili", "chilli", "தவளைக்கண்"]):
            return (
                "மிளகாய் பயிரில் செர்கோஸ்போரா தவளைக்கண் இலைப்புள்ளி (Cercospora Frogeye Spot) மற்றும் ஆந்த்ராக்னோஸ் முக்கிய நோய்களாகும்.\n\n"
                "🌿 **மேலாண்மை முறைகள்:**\n"
                "• இலைகளில் வட்டமான சாம்பல் நிற புள்ளிகள் தோன்றும் போதே பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி அகற்றவும்.\n"
                "• 1 லிட்டர் தண்ணீருக்கு 5 மி.லி வேப்ப எண்ணெய் + சூடோமோனாஸ் (Pseudomonas) 10 கிராம் கலந்து தெளிக்கவும்.\n"
                "• தீவிர பாதிப்பிற்கு: மான்கோசெப் (Mancozeb) 2 கிராம் அல்லது அசாசிஸ்ட்ரோபின் (Azoxystrobin) 1 மி.லி / லிட்டர் தெளிக்கவும்.\n"
                "• தெளிக்கும் முன் தரைவழியாக சொட்டு நீர் பாசனம் மட்டும் பயன்படுத்தவும்; இலைகளில் நீர் தெளிக்க வேண்டாம்.",
                [
                    "மிளகாய் செடியில் பூ உதிர்வதை தடுப்பது எப்படி?",
                    "வேப்ப எண்ணெய் கரைசல் தயாரிப்பது எப்படி?",
                    "சொட்டு நீர் பாசனத்தின் நன்மைகள் என்ன?"
                ],
                ["மிளகாய் பயிருக்கு அதிக தழைச்சத்து இடுவதை தவிர்க்கவும்.", "சாம்பல் சத்து செடியின் நோய் எதிர்ப்பு திறனை கூட்டும்."]
            )

        if any(w in msg_lower for w in ["பாசிப்பயறு", "பச்சை பயறு", "உளுந்து", "moong", "urad", "பயறு"]):
            return (
                "பாசிப்பயறு (Moong) மற்றும் உளுந்து (Urad) பயிர்களில் செர்கோஸ்போரா இலைப்புள்ளி (Tikku Disease) மற்றும் மஞ்சள் தேமல் நோய் (MYMV) அதிக சேதத்தை ஏற்படுத்தும்.\n\n"
                "🌱 **பரிந்துரைக்கப்படும் வழிமுறைகள்:**\n"
                "• விதை நேர்த்தி: ஒரு கிலோ விதைக்கு ட்ரைக்கோடெர்மா விரிடி 4 கிராம் அல்லது கார்பெண்டாசிம் 2 கிராம் கலந்து விதைக்கவும்.\n"
                "• இலைப்புள்ளி நோய்க்கு: கார்பெண்டாசிம் 50% WP 1 கிராம் அல்லது மான்கோசெப் 2 கிராம் / லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.\n"
                "• மஞ்சள் தேமல் நோயை பரப்பும் வெள்ளை ஈக்களை கட்டுப்படுத்த மஞ்சள் ஒட்டும் பொறி ஏக்கருக்கு 15 எண்ணிக்கை வைக்கவும்.\n"
                "• பூக்கும் தருணத்தில் 2% டி.ஏ.பி (DAP) அல்லது பயறு வொண்டர் (TNAU Pulse Wonder) தெளிப்பது விளைச்சலை 20% உயர்த்தும்.",
                [
                    "பாசிப்பயறு பூக்கும் பருவ உர மேலாண்மை என்ன?",
                    "வெள்ளை ஈக்களைக் கட்டுப்படுத்த சிறந்த வழி எது?",
                    "இயற்கை முறையில் பூச்சி மேலாண்மை செய்வது எப்படி?"
                ],
                ["பயறு வகைகளுக்கு தண்ணீர் தேங்காமல் நல்ல வடிகால் வசதி அமைக்கவும்.", "ரைசோபியம் விதை நேர்த்தி செய்வது மிகவும் நன்மை பயக்கும்."]
            )

        if any(w in msg_lower for w in ["பாசனம்", "நீர்", "irrigation", "தண்ணீர்", "சொட்டு நீர்", "drip"]):
            return (
                "**துல்லிய பாசன மேலாண்மை (Smart Irrigation Advisory):**\n\n"
                "💧 **சொட்டு நீர் பாசன வழிகாட்டுதல்:**\n"
                "• தக்காளி, மிளகாய் பயிர்களுக்கு நாள் ஒன்றுக்கு செடிக்கு 2 முதல் 3 லிட்டர் நீர் போதுமானது.\n"
                "• காலை 6 மணி முதல் 9 மணிக்குள் பாசனம் செய்வதே சிறந்தது. இது இலைகளில் ஈரப்பதம் தங்கி பூஞ்சாணம் பரவுவதைத் தடுக்கும்.\n"
                "• பூக்கும் பருவம் மற்றும் காய் பிடிக்கும் பருவத்தில் நிலத்தில் எப்போதும் மிதமான ஈரம் இருக்க வேண்டும்.\n"
                "• பயறு வகைகளுக்கு (பாசிப்பயறு, உளுந்து) பூக்கும் தருணம் (35 நாள்) மற்றும் காய் பிடிக்கும் தருணம் (55 நாள்) ஆகிய இரு முக்கியமான கட்டங்களில் மட்டும் உயிர்த்தண்ணீர் பாய்ச்சவும்.",
                [
                    "சொட்டு நீர் பாசனத்தில் உரமிடுவது (Fertigation) எப்படி?",
                    "பூஞ்சாண நோய்களைத் தடுக்க சரியான பாசன முறை எது?",
                    "வானிலை முன்னறிவிப்புக்கு ஏற்ப பாசனம் செய்வது எப்படி?"
                ],
                ["மாலையில் பாசனம் செய்வதை தவிர்க்கவும், இது பூஞ்சாண கருகல் நோயை பரப்பும்.", "நிலத்தில் மூடாக்கு இடுவது 40% நீர் ஆவியாவதை தடுக்கும்."]
            )

        if any(w in msg_lower for w in ["இயற்கை", "பஞ்சகாவ்யா", "ஜீவாமிர்தம்", "organic", "சாணம்"]):
            return (
                "**பாரம்பரிய இயற்கை வேளாண்மை தொழில்நுட்பங்கள்:**\n\n"
                "🍃 **முக்கிய இயற்கை ஊக்கிகள்:**\n"
                "1. **பஞ்சகாவ்யா (3%):** 1 லிட்டர் தண்ணீருக்கு 30 மி.லி பஞ்சகாவ்யா கலந்து இலைகளில் தெளிக்கலாம். இது செடிகளின் நோய் எதிர்ப்பு திறனை அதிகரித்து உடனடி தழை வளர்ச்சியை தரும்.\n"
                "2. **ஜீவாமிர்தம்:** 200 லிட்டர் ஜீவாமிர்தத்தை ஒரு ஏக்கருக்கு பாசன நீருடன் கலந்து விடலாம். இது மண்ணில் உள்ள நன்மை செய்யும் நுண்ணுயிரிகளை பலமடங்கு பெருக்கும்.\n"
                "3. **வேப்பங்கொட்டை சாறு (NSKE 5%):** பூச்சிகளின் முட்டைகள் மற்றும் இளம் புழுக்களைக் கட்டுப்படுத்தும் சிறந்த இயற்கை பூச்சிவிரட்டியாகும்.\n"
                "4. **மண்புழு உரம்:** ஏக்கருக்கு 1 முதல் 2 டன் நடவு வயலில் இடவும்.",
                [
                    "பஞ்சகாவ்யா தயாரிக்கும் முறை என்ன?",
                    "வேப்ப எண்ணெய் கரைசல் தயாரிப்பது எப்படி?",
                    "பூக்கும் பருவத்திற்கு ஏற்ற இயற்கை உரங்கள் எவை?"
                ],
                ["இயற்கை உரங்களை காலை அல்லது மாலை வேளையில் தெளிப்பது அதிக பலன் தரும்.", "ரசாயன மருந்துகளுடன் இயற்கை கரைசல்களை கலக்கக் கூடாது."]
            )

        if any(w in msg_lower for w in ["வேப்ப எண்ணெய்", "neem", "கரைசல்"]):
            return (
                "**வேப்ப எண்ணெய் கரைசல் தயாரிக்கும் சரியான முறை:**\n\n"
                "1. **தேவையானவை:** நல்ல தரமான வேப்ப எண்ணெய் 50 மி.லி, காதி சோப் அல்லது சோப்பு நீர் 10 மி.லி, 10 லிட்டர் தண்ணீர்.\n"
                "2. **செய்முறை:** முதலில் சிறிதளவு வெதுவெதுப்பான நீரில் காதி சோப்பை கரைத்து கொள்ளவும். அதில் வேப்ப எண்ணெயை ஊற்றி பால் போல வெண்மையாகும் வரை நன்கு கலக்கவும். பின்னர் 10 லிட்டர் தண்ணீரில் சேர்க்கவும்.\n"
                "3. **தெளிக்கும் நேரம்:** மாலை 4 மணிக்கு மேல் தெளிக்கவும். கடுமையான வெயில் நேரத்தில் தெளித்தால் இலைகள் கருக வாய்ப்புள்ளது.\n"
                "4. **பயன்கள்:** அசுவினி, இலைப்பேன், வெள்ளை ஈ மற்றும் ஆரம்ப நிலை இலைப்புள்ளி நோய்களை திறம்பட கட்டுப்படுத்தும்.",
                [
                    "வேப்ப எண்ணெய் எத்தனை நாட்களுக்கு ஒருமுறை தெளிக்க வேண்டும்?",
                    "வெள்ளை ஈக்களைக் கட்டுப்படுத்த சிறந்த வழி எது?",
                    "மிளகாய் இலைப்புள்ளி நோய்க்கு இயற்கை தீர்வு என்ன?"
                ],
                ["எண்ணெயும் நீரும் நன்கு கலக்கும் வரை கலக்க வேண்டும்.", "தெளிப்பானில் வடிகட்டி ஊற்றி பயன்படுத்தவும்."]
            )

        # Default Tamil greeting/response
        return (
            "வணக்கம்! உங்கள் கேள்வியை தெளிவாகக் கேட்டதற்கு நன்றி.\n\n"
            "விவசாயத்தில் பயிர் பாதுகாப்பு, நோய் கண்டறிதல், ஊட்டச்சத்து மேலாண்மை மற்றும் பாசன திட்டமிடல் ஆகிய அனைத்திற்கும் நான் வழிகாட்ட முடியும்.\n"
            "உங்கள் பயிர் பெயர் மற்றும் நிலவும் அறிகுறிகளை கூறினால் இன்னும் துல்லியமான பரிந்துரைகளை வழங்க முடியும்.",
            SUGGESTED_QUESTIONS_TA,
            ["விவசாயத்தில் துல்லியமான நோய் கண்டறிதல் மகசூலை 30% வரை உயர்த்தும்."]
        )

    # 2. ENGLISH RESPONSES
    if any(w in msg_lower for w in ["early blight", "late blight", "blight", "alternaria", "phytophthora"]):
        return (
            "**Blight Management Protocol (Early & Late Blight):**\n\n"
            "🔬 **Symptoms Identification:**\n"
            "• **Early Blight (*Alternaria solani*):** Concentric brown 'target rings' on mature lower foliage with yellow chlorotic halos.\n"
            "• **Late Blight (*Phytophthora infestans*):** Water-soaked greasy olive-black lesions with white downy cottony mold underneath during high humidity (>85%).\n\n"
            "🌿 **Organic / Biological Controls:**\n"
            "1. Foliar spray of cold-pressed Neem Oil (0.5% concentration, 5ml/L + mild liquid soap) every 7 days.\n"
            "2. Biological antagonist: *Trichoderma viride* or *Bacillus subtilis* (10g/L) to colonize leaf surface.\n"
            "3. Bordeaux mixture (1%) or Copper Octanoate spray in cool evening hours.\n\n"
            "🧪 **Registered Chemical Treatments:**\n"
            "• Contact Protective: Mancozeb 75% WP @ 2.0g/L or Chlorothalonil 75% WP @ 2.0g/L.\n"
            "• Systemic Curative: Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1.0ml/L.\n\n"
            "⚠️ *Safety:* Always wear protective goggles, respirator and gloves. Observe standard 7 to 14 days Pre-Harvest Interval (PHI).",
            [
                "What irrigation practice prevents blight spores from splashing?",
                "How do I balance fertilizer during high blight risk?",
                "Can I download a PDF diagnosis report for my field?"
            ],
            ["Immediately prune basal diseased leaves.", "Switch to drip irrigation to prevent wet foliage."]
        )

    if any(w in msg_lower for w in ["fertilizer", "npk", "urea", "nutrition", "potash", "nitrogen"]):
        return (
            "**Smart Precision Crop Nutrition & Fertilizer Guide:**\n\n"
            "🌾 **Stage-Specific Nutritive Needs:**\n"
            "1. **Vegetative Stage:** High Nitrogen (N) & moderate Phosphorus (P) for sturdy stem structure and dense root development. Use balanced 19:19:19 or well-rotted vermicompost.\n"
            "2. **Flowering Stage:** Elevate Phosphorus (P) and Boron (0.1%) to promote healthy pollens and prevent blossom abscission. Cut down excessive urea.\n"
            "3. **Fruiting & Tuber Bulking Stage:** Switch to high Potassium (K) like Sulfate of Potash (0:0:50 or 13:0:45 @ 4g/L). Potassium regulates stomata, increases fruit size, Brix sweetness and skin toughness against diseases.\n\n"
            "💧 **Fertigation Tip:** Apply water-soluble fertilizers in 3-4 split doses through drip lines rather than a single heavy broadcast application to minimize leaching.",
            [
                "Why are my tomato flowers dropping prematurely?",
                "What are organic foliar boosters for vegetative growth?",
                "How does high humidity trigger fungal outbreaks?"
            ],
            ["Never apply heavy Nitrogen when high humidity is forecast.", "Supplement with Calcium to prevent blossom end rot."]
        )

    if any(w in msg_lower for w in ["irrigation", "water", "watering", "drip"]):
        return (
            "**Optimal Agricultural Irrigation Management:**\n\n"
            "💧 **Best Irrigation Practices:**\n"
            "• **Adopt Drip Irrigation:** Delivers water directly to the root rhizosphere, reducing water consumption by 40-60% and keeping foliage dry.\n"
            "• **Watering Window:** Always irrigate in the early morning (5:00 AM – 8:30 AM). Moisture splashed on leaves dries swiftly under morning sun, minimizing fungal incubation.\n"
            "• **Avoid Overhead Sprinklers:** Sprinklers disperse fungal conidia (*Alternaria*, *Xanthomonas*, *Phytophthora*) across rows via splash droplet transmission.\n"
            "• **Straw Mulching:** Spread a 5-8 cm layer of dry organic mulch to conserve soil moisture and prevent soil microbes from contacting lower leaves.",
            [
                "How do I determine when to irrigate using soil tension?",
                "What is the best treatment for powdery mildew in grapes?",
                "Show me the weather disease risk forecast for my area."
            ],
            ["Keep foliage completely dry overnight.", "Use soil tensiometers to schedule irrigation scientifically."]
        )

    if any(w in msg_lower for w in ["whitefly", "pest", "aphid", "borer", "caterpillar", "armyworm"]):
        return (
            "**Integrated Pest Management (IPM) Strategy:**\n\n"
            "🐛 **Monitoring & Mechanical Controls:**\n"
            "• Install 15-20 Yellow Sticky Traps per acre for Whiteflies/Aphids and Blue Sticky Traps for Thrips.\n"
            "• Install Pheromone Traps (5 per acre) for monitoring fruit and shoot borer moths.\n\n"
            "🌿 **Bio-Pesticides & Botanical Sprays:**\n"
            "• Cold-pressed Neem Seed Kernel Extract (NSKE 5%) or Azadirachtin 10,000 ppm @ 2ml/L acts as an anti-feedant, ovicide and growth disruptor.\n"
            "• Release predatory beneficial insects like *Chrysoperla carnea* (Green Lacewing) larvae.\n\n"
            "🧪 **Judicious Chemical Control:**\n"
            "• For sucking pests: Thiamethoxam 25% WG @ 0.3g/L or Flonicamid 50% WG @ 0.4g/L.\n"
            "• Spray during late afternoon hours to protect foraging bees and pollinators.",
            [
                "How to treat virus infected cupped tomato leaves?",
                "What are companion plants that repel pests naturally?",
                "Can AgriBot analyze my crop photo for pest damage?"
            ],
            ["Yellow sticky traps give an early warning 7 days before severe infestation.", "Always rotate pesticide chemical modes of action (IRAC)."]
        )

    if any(w in msg_lower for w in ["organic", "panchagavya", "jeevamrutha", "natural"]):
        return (
            "**Certified Organic & Regenerative Agriculture Practices:**\n\n"
            "🍃 **Natural Plant Immunity Formulations:**\n"
            "1. **Panchagavya:** Blend cow dung, cow urine, milk, curd, ghee, jaggery and tender coconut. Ferment for 21 days. Dilute 30ml per liter of water as an unmatched foliar growth promoter.\n"
            "2. **Jeevamrutha:** Enhances beneficial soil microbiology (bacteria, mycorrhizae) when applied to the root zone with irrigation water every 14 days.\n"
            "3. **Neem-Karanja Oil Blend:** Emulsify with organic soapnut solution to provide broad-spectrum prophylactic resistance against leaf spots and soft-bodied sucking insects.",
            [
                "How do I prepare Panchagavya step-by-step?",
                "What is the best organic treatment for root-knot nematodes?",
                "How to start monitoring my crop health over time?"
            ],
            ["Organic inputs enhance the natural rhizosphere microbiome.", "Prophylactic sprays work best before disease symptoms appear."]
        )

    # General Agriculture Assistant response
    return (
        f"**Hello Farmer! I am AgriBot, your AI Agricultural Specialist.**\n\n"
        f"I can assist you with:\n"
        f"• **AI Disease Diagnosis:** In-depth symptoms, causes, and verified treatment regimens.\n"
        f"• **Soil & Fertilizer Planning:** NPK scheduling, organic manures, and micronutrient corrections.\n"
        f"• **Smart Irrigation:** Drip fertigation and water stress management.\n"
        f"• **Organic Protection:** Neem extracts, bio-control agents (*Trichoderma*, *Pseudomonas*).\n"
        f"• **Weather Risk Alerts:** Preventive shielding against impending microclimatic threats.\n\n"
        f"Ask me any question or tap one of the suggested prompts below to get started!",
        SUGGESTED_QUESTIONS_EN,
        ["Feel free to switch to Tamil anytime by asking in Tamil or selecting the Tamil language toggle!"]
    )

@router.post("")
def chat_with_agribot(req: ChatRequest):
    conn = get_connection()
    cursor = conn.cursor()

    now = datetime.now().isoformat()
    msg_id_user = f"msg_{uuid.uuid4().hex[:10]}"
    cursor.execute("""
    INSERT INTO chat_messages (id, user_id, sender, message, language, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (msg_id_user, req.user_id, "user", req.message, req.language, now))

    reply_text, followups, tips = generate_agribot_reply(req.message, req.language)

    msg_id_bot = f"msg_{uuid.uuid4().hex[:10]}"
    cursor.execute("""
    INSERT INTO chat_messages (id, user_id, sender, message, language, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (msg_id_bot, req.user_id, "bot", reply_text, req.language, now))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "reply": reply_text,
        "suggested_followups": followups,
        "key_tips": tips,
        "language": req.language,
        "timestamp": now
    }

@router.get("/history")
def get_chat_history(user_id: Optional[str] = "user_demo_001"):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, sender, message, language, created_at
    FROM chat_messages
    WHERE user_id = ? OR ? IS NULL
    ORDER BY created_at ASC
    LIMIT 100
    """, (user_id, user_id))
    messages = [dict(r) for r in cursor.fetchall()]
    conn.close()

    return {
        "count": len(messages),
        "messages": messages,
        "suggested_questions": SUGGESTED_QUESTIONS_EN,
        "suggested_questions_ta": SUGGESTED_QUESTIONS_TA
    }

@router.delete("/clear")
def clear_chat_history(user_id: Optional[str] = "user_demo_001"):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM chat_messages WHERE user_id = ? OR ? IS NULL", (user_id, user_id))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Chat history cleared."}
