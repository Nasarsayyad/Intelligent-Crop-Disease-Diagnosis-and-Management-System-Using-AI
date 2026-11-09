"""
Comprehensive Agricultural Knowledge Base for Crop Disease Diagnosis & Management.
Contains verified agronomic information, pathogen descriptions, scientific names,
stage classifications, organic/chemical treatments, label-based safety protocols,
and multilingual support (English & Tamil).
"""

AGRICULTURAL_KNOWLEDGE = {
    "Indian Hawthorn": {
        "botanical_name": "Rhaphiolepis indica",
        "category": "Rosaceae (Shrub / Pome Family)",
        "ideal_temp_c": "18 - 28°C",
        "ideal_humidity": "55% - 75%",
        "growth_stages": [
            {"stage": "Germination", "days": "20-40 days", "description": "Slow seed emergence under moist stratification."},
            {"stage": "Seedling", "days": "41-90 days", "description": "Small leathery juvenile leaves emerge on woody base."},
            {"stage": "Vegetative", "days": "91-180 days", "description": "Dense evergreen branching, obovate to elliptical serrate foliage with reddish young flushes."},
            {"stage": "Budding", "days": "181-210 days", "description": "Terminal panicle buds develop with compact pink/white bracts."},
            {"stage": "Flowering", "days": "211-240 days", "description": "Abundant star-shaped white or light pink fragrant blossoms."},
            {"stage": "Fruiting", "days": "241-280 days", "description": "Small globose green pome berry formation."},
            {"stage": "Maturity", "days": "281-320 days", "description": "Pomes turn deep purplish-blue to black with waxy bloom."},
            {"stage": "Harvest-ready", "days": "321-360 days", "description": "Mature dormant shrubs; seed collection ready."}
        ],
        "diseases": {
            "Entomosporium Leaf Spot": {
                "scientific_name": "Diplocarpon mespili (Entomosporium mespili)",
                "description": "Prevalent and disfiguring fungal disease of Rosaceae plants (Indian Hawthorn, Photinia, Pear). Causes circular reddish-purple spots that expand with grayish-white centers, conspicuous dark maroon borders, and chlorotic yellowing, causing severe premature leaf drop.",
                "symptoms": [
                    "Small, circular reddish-purple or maroon spots (1-5 mm) on both upper and lower leaf surfaces",
                    "Lesion centers fade to dull gray or light brown with prominent dark purple borders and yellow halos",
                    "Coalescence of lesions forming large dead brown blotches on foliage",
                    "Severe premature defoliation leaving bare lower and interior branches",
                    "Reddish discoloration on expanding young shoots and tender terminal foliage"
                ],
                "causes": [
                    "Cool to warm wet conditions (15-25°C) with persistent leaf wetness from rain or sprinklers",
                    "Overhead irrigation splashing fungal conidia from older infected leaves onto new flushes",
                    "Overwintering fungal inoculum in diseased leaves clinging to branches or fallen on soil",
                    "Dense compact shrub canopy restricting air penetration"
                ],
                "immediate_actions": [
                    "Rake up and destroy all fallen diseased leaves from around the shrub perimeter.",
                    "Discontinue overhead sprinkler irrigation immediately; switch to base drip or soaker hoses.",
                    "Prune dense internal shoots during dry sunny weather to improve canopy ventilation."
                ],
                "recommended_treatments": [
                    "Apply prophylactic fungicide spray as soon as new leaf flushes emerge in spring or autumn.",
                    "Avoid touching or pruning wet foliage to prevent mechanical spore transfer."
                ],
                "organic_treatments": [
                    "Foliar spray of Liquid Copper Octanoate (copper soap) or Bordeaux mixture (1%) every 10-14 days.",
                    "Foliar bio-fungicide with Bacillus subtilis or cold-pressed Neem Oil (5ml/L) emulsified with soap.",
                    "Potassium bicarbonate foliar spray (3g/L) to alter leaf surface pH against spore germination."
                ],
                "chemical_treatments": [
                    "Protective Contact: Chlorothalonil 75% WP @ 2.0g/L or Mancozeb 75% WP @ 2.0g/L.",
                    "Systemic Curative: Myclobutanil 20% EW @ 1.0ml/L or Propiconazole 25% EC @ 0.75ml/L or Tebuconazole 25% WG @ 1.0g/L.",
                    "Safety Guidance: Wear personal protective equipment (gloves, goggles, mask). Do not spray in direct midday sun."
                ],
                "irrigation_management": "Deliver water strictly at soil level early in the morning so sun evaporates any accidental splash before nightfall. Never wet foliage in evening hours.",
                "fertilizer_management": "Avoid heavy late-summer high-Nitrogen fertilizers that trigger soft, highly susceptible vegetative flushes. Use balanced slow-release fertilizer.",
                "prevention_tips": [
                    "Plant resistant cultivars such as 'Eleanor Tabor', 'Indian Princess', or 'Georgia Petite'.",
                    "Space plants at least 1 to 1.5 meters apart to promote rapid drying of foliage after rain.",
                    "Apply a 2-3 inch fresh mulch ring under the canopy to trap fallen spores in soil."
                ]
            },
            "Healthy Indian Hawthorn": {
                "scientific_name": "Rhaphiolepis indica (Healthy)",
                "description": "Vigorous, dense evergreen shrub with glossy leathery dark green leaves, healthy reddish new growth, and prolific white to pink flower clusters with zero leaf spots.",
                "symptoms": [
                    "Pristine, glossy leathery green leaves without any necrotic spots or halos",
                    "Strong compact woody branch structure with vigorous terminal growth",
                    "Healthy flower bud formation and dense foliage canopy"
                ],
                "causes": ["Good air circulation, drip irrigation, balanced fertilization, and proactive sanitation."],
                "immediate_actions": ["Maintain clean ground under canopy; prune lightly for shape after flowering."],
                "recommended_treatments": ["Apply balanced slow-release shrub fertilizer in spring."],
                "organic_treatments": ["Compost tea soil drench or seaweed extract spray every month."],
                "chemical_treatments": ["No chemical treatments required."],
                "irrigation_management": "Provide moderate deep watering at root zone during prolonged dry spells.",
                "fertilizer_management": "Apply 10:10:10 slow-release balanced shrub plant food in early spring.",
                "prevention_tips": ["Ensure full sun to light shade planting location with well-drained soil."]
            }
        }
    },
    "Bell Pepper": {
        "botanical_name": "Capsicum annuum",
        "category": "Solanaceae (Capsicum / Pepper)",
        "ideal_temp_c": "21 - 32°C",
        "ideal_humidity": "65% - 75%",
        "growth_stages": [
            {"stage": "Germination", "days": "7-14 days", "description": "Radicle emergence and cotyledon unfolding in warm moist soil."},
            {"stage": "Seedling", "days": "15-30 days", "description": "First 4-6 true ovate leaves appear with active taproot establishment."},
            {"stage": "Vegetative", "days": "31-50 days", "description": "Dichotomous branching, canopy thickening and sturdy stem lignification."},
            {"stage": "Budding", "days": "51-60 days", "description": "Solitary white flower buds appear at stem bifurcations."},
            {"stage": "Flowering", "days": "61-75 days", "description": "Petals open, self-pollination occurs, early ovary swelling."},
            {"stage": "Fruiting", "days": "76-95 days", "description": "Rapid fruit elongation and pericarp cell expansion (green peppers)."},
            {"stage": "Maturity", "days": "96-115 days", "description": "Color transition from green to vibrant yellow, orange or red."},
            {"stage": "Harvest-ready", "days": "116-130 days", "description": "Firm thick-walled fruit with optimal glossiness and pungency."}
        ],
        "diseases": {
            "Pepper Cercospora Leaf Spot (Frogeye)": {
                "scientific_name": "Cercospora capsici",
                "description": "Prevalent fungal disease causing circular to sub-circular spots with light tan-to-gray centers and dark brown margins, resembling frog's eyes, surrounded by prominent yellow chlorotic halos. Severe infections cause extensive defoliation.",
                "symptoms": [
                    "Circular to oval spots (2-10 mm) with light tan or grayish-white centers and dark brown borders",
                    "Prominent bright yellow chlorotic halos surrounding lesions",
                    "Lesions coalesce causing large patches of dead necrotic tissue and leaf curling",
                    "Premature yellowing and extensive defoliation, exposing peppers to sunscald",
                    "Elongated dark brown lesions on stems and petioles"
                ],
                "causes": [
                    "High relative humidity (>85%) combined with warm temperatures (24-32°C)",
                    "Prolonged leaf wetness from frequent rain, heavy morning dew, or overhead sprinklers",
                    "Fungal conidia survival on infected crop debris in soil",
                    "Wind and water splash spreading spores throughout the canopy"
                ],
                "immediate_actions": [
                    "Immediately hand-prune and bag severely infected leaves showing frogeye spots (do not compost).",
                    "Suspend overhead irrigation immediately; convert to drip or ground furrow watering.",
                    "Disinfect pruners with 70% alcohol between rows to prevent mechanical spore transfer."
                ],
                "recommended_treatments": [
                    "Apply protective contact or translaminar fungicide at earliest symptom onset.",
                    "Ensure adequate plant spacing (50-60 cm) and stake plants to improve ventilation."
                ],
                "organic_treatments": [
                    "Foliar spray of cold-pressed Neem Oil (0.5% concentration, 5ml/L) emulsified with organic soap every 5-7 days.",
                    "Bio-control foliar spray of Trichoderma harzianum or Bacillus subtilis (10g/L).",
                    "Copper Hydroxide or Bordeaux mixture (1%) foliar application during cool evening hours."
                ],
                "chemical_treatments": [
                    "Protective Contact: Mancozeb 75% WP @ 2.0g/L or Chlorothalonil 75% WP @ 2.0g/L.",
                    "Systemic Curative: Azoxystrobin 23% SC @ 1.0ml/L or Difenoconazole 25% EC @ 0.5ml/L.",
                    "Safety Guidance: Always wear nitrile gloves, protective goggles and N95 mask. Observe 7-day Pre-Harvest Interval (PHI)."
                ],
                "irrigation_management": "Deliver water strictly via drip emitters beneath plastic or organic straw mulch. Water early in the morning so any splashed moisture evaporates before midday.",
                "fertilizer_management": "Avoid excess Nitrogen fertilizer which triggers lush, disease-susceptible foliage. Apply balanced Potassium Sulfate (0:0:50) and Calcium Nitrate to harden cell walls.",
                "prevention_tips": [
                    "Practice 2-3 year crop rotation away from Solanaceous crops (peppers, tomatoes, eggplants).",
                    "Treat seeds with hot water (50°C for 25 minutes) or Trichoderma viride before sowing.",
                    "Apply 2-3 inches of organic straw mulch to block soil-splash spore transmission."
                ]
            },
            "Pepper Bacterial Spot": {
                "scientific_name": "Xanthomonas euvesicatoria / campestris",
                "description": "Devastating bacterial disease causing small, water-soaked, irregular purplish-brown lesions on leaves, premature defoliation, and rough raised scabs on pepper fruits.",
                "symptoms": [
                    "Small circular to irregular dark brown water-soaked lesions (2-3 mm) on foliage",
                    "Spots develop pale yellow halos; leaves turn chlorotic and drop rapidly",
                    "Raised rough blister-like scabby pustules on green and ripening pepper fruit",
                    "Severely affected plants lose leaves, leading to severe fruit sunscald"
                ],
                "causes": [
                    "Warm, humid, rainy weather (temperatures 24-30°C)",
                    "Contaminated seed batches or infected greenhouse transplants",
                    "Handling or harvesting wet foliage during weeding"
                ],
                "immediate_actions": [
                    "Never cultivate, prune, or spray pepper fields while foliage is wet.",
                    "Rogue and bury severely infected plants away from field boundaries."
                ],
                "recommended_treatments": [
                    "Apply copper bactericide combined with Mancozeb for synergistic copper-ion control."
                ],
                "organic_treatments": [
                    "Copper Octanoate (copper soap) or fixed copper combined with Bacillus amyloliquefaciens.",
                    "Hot water seed treatment at 50°C for 25 minutes prior to sowing."
                ],
                "chemical_treatments": [
                    "Copper Oxychloride 50% WP (2.5g/L) tank-mixed with Mancozeb (2.0g/L).",
                    "Streptomycin sulfate + Tetracycline formulation where approved under regional regulatory permit.",
                    "Safety Guidance: Use protective respirators and chemical-resistant gloves."
                ],
                "irrigation_management": "Sub-surface drip irrigation only. Eliminate all sprinkler usage.",
                "fertilizer_management": "Foliar application of micronutrients (Zinc, Boron) to alleviate stress; avoid excessive nitrate.",
                "prevention_tips": [
                    "Plant resistant pepper cultivars with Bs1, Bs2, Bs3 resistance genes.",
                    "Disinfect seed trays and greenhouse tools with 10% bleach solution."
                ]
            },
            "Pepper Anthracnose": {
                "scientific_name": "Colletotrichum capsici / acutatum",
                "description": "Fungal disease causing circular sunken necrotic lesions on pepper fruit with concentric rings of orange-salmon spore masses and dark foliar lesions.",
                "symptoms": [
                    "Circular sunken water-soaked spots on ripening fruit with concentric rings",
                    "Black or salmon-pink gelatinous spore masses in lesion centers during wet weather",
                    "Small circular dark spots on leaves with diffuse chlorotic margins"
                ],
                "causes": [
                    "Warm temperatures (26-30°C) with frequent rain splashes and high humidity",
                    "Infected crop residues and seeds harboring fungal acervuli"
                ],
                "immediate_actions": [
                    "Harvest and discard all infected fruit immediately into sealed bags.",
                    "Spray curative systemic fungicide before fruit rot spreads across rows."
                ],
                "recommended_treatments": ["Apply strobilurin or triazole fungicides during fruit set."],
                "organic_treatments": ["Neem seed extract and bio-control with Trichoderma viride."],
                "chemical_treatments": [
                    "Azoxystrobin 23% SC @ 1.0ml/L or Difenoconazole 25% EC @ 0.5ml/L.",
                    "Safety Guidance: Follow label safety precautions and mandatory PHI."
                ],
                "irrigation_management": "Drip irrigation; avoid fruit splash.",
                "fertilizer_management": "Supplement with Calcium to improve fruit pericarp toughness.",
                "prevention_tips": ["Use certified disease-free seeds; destroy solanaceous crop debris."]
            },
            "Healthy Bell Pepper": {
                "scientific_name": "Capsicum annuum (Healthy)",
                "description": "Vibrant, robust pepper plant with glossy deep-green ovate leaves, sturdy stems, prolific white star-shaped flowers and firm blemish-free fruit.",
                "symptoms": [
                    "Glossy deep green ovate leaves without spots, cankers or chlorosis",
                    "Strong erect branching with thick sturdy stems",
                    "Abundant healthy flower set and uniform thick-walled fruit development"
                ],
                "causes": ["Balanced nutrition, clean drip irrigation, proactive scouting and IPM."],
                "immediate_actions": ["Maintain regular drip schedule and monitor for thrips or aphids."],
                "recommended_treatments": ["Continue routine preventive bio-stimulant foliar applications."],
                "organic_treatments": ["Seaweed extract (2ml/L) and vermiwash foliar sprays every 14 days."],
                "chemical_treatments": ["No synthetic chemical treatments required."],
                "irrigation_management": "Provide 25-30 mm equivalent water weekly via drip emitters.",
                "fertilizer_management": "Apply 120:60:80 kg/ha NPK split through drip fertigation; elevate Potassium during fruit bulking.",
                "prevention_tips": ["Maintain yellow sticky traps for aphids and blue sticky traps for thrips."]
            }
        }
    },
    "Green Gram (Moong)": {
        "botanical_name": "Vigna radiata",
        "category": "Fabaceae (Legumes / Pulses)",
        "ideal_temp_c": "25 - 35°C",
        "ideal_humidity": "60% - 80%",
        "growth_stages": [
            {"stage": "Germination", "days": "3-7 days", "description": "Hypocotyl elongation and cotyledon emergence from warm seedbed."},
            {"stage": "Seedling", "days": "8-18 days", "description": "Unifoliate leaves followed by first trifoliate compound leaf emergence."},
            {"stage": "Vegetative", "days": "19-32 days", "description": "Active node development, vigorous trifoliate canopy expansion, root nodulation with Rhizobium."},
            {"stage": "Budding", "days": "33-38 days", "description": "Axillary and terminal flower clusters appear with pale yellow bud bracts."},
            {"stage": "Flowering", "days": "39-48 days", "description": "Anthesis of bright yellow papilionaceous flowers; high self-pollination rate."},
            {"stage": "Fruiting", "days": "49-60 days", "description": "Rapid pod elongation, young cylindrical green pod formation."},
            {"stage": "Maturity", "days": "61-72 days", "description": "Pods turn dark brown/black with firm green to olive seeds inside."},
            {"stage": "Harvest-ready", "days": "73-85 days", "description": "Over 85% of pods fully dried, black and brittle for single or two-stage picking."}
        ],
        "diseases": {
            "Moong Cercospora Leaf Spot (Tikku Disease)": {
                "scientific_name": "Cercospora canescens / Cercospora cruenta",
                "description": "One of the most destructive foliar diseases of green gram (moong). Causes circular to irregular spots with pale tan or grayish-white centers, prominent dark reddish-brown borders, and bright chlorotic halos. Under heavy pressure, spots coalesce causing severe defoliation and drastically reduced pod yield.",
                "symptoms": [
                    "Circular to oval necrotic spots with grayish-white centers and dark reddish-brown margins on trifoliate leaflets",
                    "Prominent bright yellow chlorotic halos encircling each individual spot",
                    "Lesions coalesce to form extensive brown necrotic patches causing leaf brittleness",
                    "Premature yellowing and severe defoliation during flowering and pod development stages",
                    "Elongated dark brown to black canker spots on stems, petioles, and developing green pods"
                ],
                "causes": [
                    "Warm temperatures (25-30°C) combined with high relative humidity (>75%) and heavy dew or rain",
                    "Pathogen surviving in infected seed coats and crop residues from previous pulse seasons",
                    "Air-borne conidia and rain-splash spreading spores rapidly through dense canopy",
                    "Excessive vegetative density and poor field air circulation"
                ],
                "immediate_actions": [
                    "Hand-prune and bag heavily infected lower leaves displaying frogeye spots (do not leave in field).",
                    "Immediately suspend overhead sprinkler watering; irrigate strictly via furrow or drip.",
                    "Ensure adequate drainage to prevent water stagnation in the root zone."
                ],
                "recommended_treatments": [
                    "Apply prophylactic or curative fungicide at the very first sight of leaf spotting.",
                    "Maintain proper row spacing (30 x 10 cm) to facilitate air movement."
                ],
                "organic_treatments": [
                    "Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or cold-pressed Neem Oil @ 5ml/L with mild surfactant.",
                    "Biological foliar spray of Trichoderma viride or Pseudomonas fluorescens @ 10g/L.",
                    "Foliar application of fermented Panchagavya (30ml/L) or Copper Hydroxide (2g/L) during evening hours."
                ],
                "chemical_treatments": [
                    "Protective Contact: Mancozeb 75% WP @ 2.0g/L or Carbendazim 50% WP @ 1.0g/L.",
                    "Systemic Curative: Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0ml/L or Propiconazole 25% EC @ 1.0ml/L.",
                    "Safety Guidance: Always wear nitrile gloves, protective goggles and N95 mask. Observe a mandatory 10-14 days Pre-Harvest Interval (PHI)."
                ],
                "irrigation_management": "Irrigate at critical stages (flowering and pod filling) without splashing foliage. Prevent waterlogging which predisposes pulse roots to root rot and foliar vulnerability.",
                "fertilizer_management": "Inoculate seeds with Rhizobium and Phosphobacteria. Apply 20:40:20 kg NPK/ha basal. Spray 2% DAP or 1% Potassium Chloride at flowering to enhance disease resistance.",
                "prevention_tips": [
                    "Treat seeds prior to sowing with Trichoderma viride @ 4g/kg or Carbendazim @ 2g/kg seed.",
                    "Practice 2 to 3-year crop rotation with non-leguminous cereals such as maize, pearl millet, or sorghum.",
                    "Sow certified disease-resistant green gram cultivars (e.g., IPM 02-3, Pant Mung 4, CO 8, PDM 139)."
                ]
            },
            "Moong Yellow Mosaic Virus (MYMV)": {
                "scientific_name": "Mungbean Yellow Mosaic Begomovirus",
                "description": "Devastating viral disease transmitted by whiteflies (Bemisia tabaci) causing bright golden-yellow mosaic speckling, leaf wrinkling and stunted pods.",
                "symptoms": [
                    "Bright yellow irregular chlorotic patches alternating with green leaf tissue",
                    "Complete yellowing and puckering of young apical leaves",
                    "Stunted plant growth, delayed flowering, and small aborted pods"
                ],
                "causes": [
                    "Vector transmission by whitefly populations in warm, dry weather",
                    "Weed hosts (Croton sparsiflorus) harboring the begomovirus"
                ],
                "immediate_actions": [
                    "Rogue out and bury virus-infected plants immediately to prevent whitefly transmission.",
                    "Install yellow sticky traps (15-20 traps/acre) to monitor and catch whiteflies."
                ],
                "recommended_treatments": ["Manage whitefly vectors with selective insecticides or botanicals."],
                "organic_treatments": ["Spray Neem oil (10,000 ppm) @ 2ml/L or fish oil rosin soap @ 25g/L."],
                "chemical_treatments": [
                    "Foliar spray of Thiamethoxam 25% WG @ 0.3g/L or Acetamiprid 20% SP @ 0.2g/L.",
                    "Safety Guidance: Do not spray during peak bee foraging hours. Observe 14-day PHI."
                ],
                "irrigation_management": "Maintain consistent soil moisture to minimize drought stress which invites whitefly pests.",
                "fertilizer_management": "Avoid excess Nitrogen; supplement with Micronutrient foliar mix.",
                "prevention_tips": [
                    "Grow MYMV-resistant varieties such as ML 818, Pant Mung 5, IPM 2-14.",
                    "Treat seeds with Imidacloprid 70% WS @ 5g/kg seed before sowing."
                ]
            },
            "Healthy Green Gram (Moong)": {
                "scientific_name": "Vigna radiata (Healthy)",
                "description": "Vigorous green gram plant with vibrant trifoliate green foliage, active root nodules, upright growth and abundant healthy yellow blossoms and green pods.",
                "symptoms": [
                    "Uniform lush green trifoliate leaves with zero necrotic spots or yellow mosaic patches",
                    "Erect sturdy branches with healthy node spacing",
                    "Plentiful flowering and normal cylindrical pod filling"
                ],
                "causes": ["Optimal soil health, seed inoculation, timely irrigation and preventive scouting."],
                "immediate_actions": ["Maintain soil moisture at pod development; scout weekly for pod borer or whiteflies."],
                "recommended_treatments": ["Apply 2% DAP or pulse wonder foliar spray at peak flowering."],
                "organic_treatments": ["Foliar spray of Panchagavya (3%) or Vermiwash (5%) every 15 days."],
                "chemical_treatments": ["No chemical treatments required."],
                "irrigation_management": "Irrigate at flowering (35 DAS) and pod setting (55 DAS). Ensure quick drainage.",
                "fertilizer_management": "Apply 25:50:25 kg NPK/ha basal plus Rhizobium seed treatment.",
                "prevention_tips": ["Maintain weed-free conditions during the first 30 days after sowing."]
            }
        }
    },
    "Black Gram (Urad)": {
        "botanical_name": "Vigna mungo",
        "category": "Fabaceae (Legumes / Pulses)",
        "ideal_temp_c": "25 - 35°C",
        "ideal_humidity": "65% - 80%",
        "growth_stages": [
            {"stage": "Germination", "days": "4-8 days", "description": "Epigeal germination with hypocotyl arch lifting cotyledons above ground."},
            {"stage": "Seedling", "days": "9-19 days", "description": "Unifoliate primary leaves followed by hairy trifoliate compound foliage."},
            {"stage": "Vegetative", "days": "20-35 days", "description": "Dense bushy branching, dark green pubescent leaflets, active pink Rhizobial nodules."},
            {"stage": "Budding", "days": "36-42 days", "description": "Compact raceme inflorescence buds develop at leaf axils."},
            {"stage": "Flowering", "days": "43-52 days", "description": "Bright yellow self-fertile papilionaceous blossoms open in morning hours."},
            {"stage": "Fruiting", "days": "53-65 days", "description": "Short, erect or sub-erect cylindrical pods develop with dense hairs."},
            {"stage": "Maturity", "days": "66-78 days", "description": "Hairy pods turn from green to characteristic dark blackish-brown."},
            {"stage": "Harvest-ready", "days": "79-90 days", "description": "Dry brittle black pods ready for picking; seed moisture reaches ~12%."}
        ],
        "diseases": {
            "Urad Cercospora Leaf Spot (Tikku Disease)": {
                "scientific_name": "Cercospora canescens / Cercospora cruenta",
                "description": "Severe foliar disease of black gram (urad) causing conspicuous circular to angular leaf spots with pale brown to white centers and distinct dark reddish-brown margins. Severely infected leaves exhibit premature chlorosis, wither, and drop, drastically impairing pod set.",
                "symptoms": [
                    "Distinct circular spots with light gray/tan centers and prominent dark brown borders on trifoliate leaflets",
                    "Chlorotic yellow rings encircling each lesion on the dark green leaf blade",
                    "Coalescence of multiple spots leading to ragged, withered leaf margins and defoliation",
                    "In severe cases, lesions form on petioles, stems and young pods, causing pod blighting",
                    "Reduced photosynthetic canopy during critical flowering and pod fill"
                ],
                "causes": [
                    "Warm humid weather (24-30°C) with persistent humidity (>70%) and frequent rain or heavy dew",
                    "Dense planting trapping humidity within the leafy canopy",
                    "Seed-borne mycelium and overwintering fungal conidia on pulse residues"
                ],
                "immediate_actions": [
                    "Remove and incinerate heavily infected foliage from field boundaries.",
                    "Discontinue sprinkler watering; keep leaf surfaces dry.",
                    "Ensure adequate soil drainage to prevent root hypoxia."
                ],
                "recommended_treatments": [
                    "Foliar spray of protectant or curative fungicide at the earliest appearance of spots.",
                    "Maintain proper row spacing (30 x 10 cm) for canopy ventilation."
                ],
                "organic_treatments": [
                    "Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Neem oil @ 5ml/L.",
                    "Foliar application of Pseudomonas fluorescens or Trichoderma viride @ 5g/L.",
                    "Spray fermented buttermilk (5%) or Copper Oxychloride (2g/L) during cool evening hours."
                ],
                "chemical_treatments": [
                    "Protective Contact: Carbendazim 50% WP @ 1.0g/L or Mancozeb 75% WP @ 2.0g/L.",
                    "Systemic Curative: Azoxystrobin 23% SC @ 1.0ml/L or Propiconazole 25% EC @ 1.0ml/L.",
                    "Safety Guidance: Wear personal protective equipment. Observe mandatory 10-14 days Pre-Harvest Interval (PHI)."
                ],
                "irrigation_management": "Provide adequate drainage; black gram is highly sensitive to waterlogging. Water during early vegetative and pod setting stages without wetting foliage.",
                "fertilizer_management": "Basal application of 20:40:20 kg NPK/ha; foliar spray of 1% DAP or TNAU Pulse Wonder @ 2 kg/acre during flowering.",
                "prevention_tips": [
                    "Seed treatment with Carbendazim @ 2g/kg seed or Trichoderma viride @ 4g/kg seed.",
                    "Rotate black gram with cereals (paddy, sorghum, maize) every 2 seasons.",
                    "Plant resistant black gram varieties such as VBN 4, VBN 6, VBN 8, Mash 114, or Uttara."
                ]
            },
            "Urad Yellow Mosaic Virus (MYMV)": {
                "scientific_name": "Mungbean Yellow Mosaic Virus",
                "description": "Viral infection spread by whiteflies causing severe yellow mosaic mottling, distorted leaves and stunted hairy pods.",
                "symptoms": [
                    "Diffuse yellow spots on young leaves merging into prominent yellow patches",
                    "Leaves become completely yellowed, leathery and reduced in size",
                    "Pods become small, curled and contain fewer shriveled seeds"
                ],
                "causes": [
                    "Whitefly (Bemisia tabaci) feeding and vectoring the geminivirus in warm dry weather"
                ],
                "immediate_actions": [
                    "Rogue out and destroy infected yellowed plants immediately.",
                    "Install yellow sticky traps (15-20/acre) to trap whitefly vectors."
                ],
                "recommended_treatments": ["Control vector whiteflies with systemic insecticides or bio-pesticides."],
                "organic_treatments": ["Foliar spray of 5% NSKE or Neem oil (10,000 ppm) @ 2ml/L."],
                "chemical_treatments": [
                    "Spray Thiamethoxam 25% WG @ 0.3g/L or Dimethoate 30% EC @ 1.7ml/L.",
                    "Safety Guidance: Always observe safety warnings and respect PHI."
                ],
                "irrigation_management": "Prevent plant drought stress; irrigate moderately during dry periods.",
                "fertilizer_management": "Foliar application of micronutrient mixture to boost plant immunity.",
                "prevention_tips": [
                    "Treat seeds with Imidacloprid 70% WS @ 5g/kg seed before sowing.",
                    "Select MYMV-resistant cultivars (e.g., VBN 6, VBN 8, Mash 1008)."
                ]
            },
            "Healthy Black Gram (Urad)": {
                "scientific_name": "Vigna mungo (Healthy)",
                "description": "Healthy, vigorous black gram crop with dense dark green trifoliate foliage, vigorous branching, abundant yellow flower clusters and well-filled hairy pods.",
                "symptoms": [
                    "Clean dark green pubescent trifoliate leaves with zero necrotic spots or mosaic symptoms",
                    "Profuse nodulation on healthy taproot and lateral roots",
                    "Uniform flowering and heavy set of healthy cylindrical hairy pods"
                ],
                "causes": ["Good agronomic practices, seed inoculation, balanced fertilization and regular scouting."],
                "immediate_actions": ["Maintain optimal moisture during pod filling; monitor for pod borer."],
                "recommended_treatments": ["Apply 1% DAP or TNAU Pulse Wonder foliar spray at 30 and 45 DAS."],
                "organic_treatments": ["Spray Panchagavya (3%) or Seaweed extract (2ml/L) at 15-day intervals."],
                "chemical_treatments": ["No synthetic chemical treatments required."],
                "irrigation_management": "Ensure clean furrow drainage; apply light irrigation at flowering and pod filling.",
                "fertilizer_management": "Apply 25:50:25 kg NPK/ha basal plus Rhizobium and Phosphobacteria seed treatment.",
                "prevention_tips": ["Keep field free of broadleaf weeds during the initial 30 days of crop establishment."]
            }
        }
    },
    "Tomato": {
        "botanical_name": "Solanum lycopersicum",
        "category": "Solanaceae (Nightshade)",
        "ideal_temp_c": "20 - 30°C",
        "ideal_humidity": "60% - 75%",
        "growth_stages": [
            {"stage": "Germination", "days": "5-10 days", "description": "Radicle emergence and cotyledon unfolding."},
            {"stage": "Seedling", "days": "11-25 days", "description": "First true leaves appear, rapid root development."},
            {"stage": "Vegetative", "days": "26-45 days", "description": "Intense stem thickening, branch formation and dense canopy growth."},
            {"stage": "Budding", "days": "46-55 days", "description": "Flower truss clusters become visible at apical nodes."},
            {"stage": "Flowering", "days": "56-70 days", "description": "Anthesis, bright yellow petals open, cross/self-pollination."},
            {"stage": "Fruiting", "days": "71-90 days", "description": "Berry enlargement, green fruit cell expansion."},
            {"stage": "Maturity", "days": "91-110 days", "description": "Breaker stage, color transition from green to yellow/pink/red."},
            {"stage": "Harvest-ready", "days": "111-130 days", "description": "Firm ripe red fruit with optimal Brix and acidity."}
        ],
        "diseases": {
            "Tomato Early Blight": {
                "scientific_name": "Alternaria solani",
                "description": "A prevalent fungal disease causing concentric target-board lesions on older leaves, progressing upwards.",
                "symptoms": [
                    "Dark brown to black concentric circular rings ('target spot' pattern) on lower foliage",
                    "Surrounding chlorotic (yellow) halos around dark spots",
                    "Premature defoliation starting from the basal branches",
                    "Sunken brown circular cankers on stems near soil line",
                    "Dark leathery sunken lesions at the fruit stem calyx"
                ],
                "causes": [
                    "High relative humidity (>80%) combined with warm temperatures (24-29°C)",
                    "Prolonged leaf wetness from overhead sprinkler irrigation or dew",
                    "Infected crop debris in soil from previous Solanaceous crops",
                    "Splashing rain drops transmitting soil-borne fungal conidia"
                ],
                "immediate_actions": [
                    "Prune and discard infected lower leaves showing target spots into sealed bags (do not compost).",
                    "Immediately suspend overhead sprinkler watering; switch to drip or base furrow irrigation.",
                    "Disinfect shears with 70% isopropyl alcohol between plants to prevent spore transfer."
                ],
                "recommended_treatments": [
                    "Apply protective bio-fungicide or systemic triazole fungicide at first symptom onset.",
                    "Ensure adequate plant spacing (60 cm) and stake plants to improve air circulation."
                ],
                "organic_treatments": [
                    "Foliar spray of cold-pressed Neem Oil (0.5% concentration, 5ml/L) emulsified with mild soap every 7 days.",
                    "Application of Trichoderma viride or Bacillus subtilis (10g/L) to foliage and root zone as bio-antagonist.",
                    "Bordeaux mixture (1%) or Copper Octanoate (copper soap) foliar spray during cool evening hours."
                ],
                "chemical_treatments": [
                    "Protective Contact: Mancozeb 75% WP @ 2.0g/L or Chlorothalonil 75% WP @ 2.0g/L. Ensure complete canopy coverage.",
                    "Systemic Curative: Azoxystrobin 23% SC @ 1.0ml/L or Difenoconazole 25% EC @ 0.5ml/L.",
                    "Safety Guidance: Always wear nitrile gloves, protective goggles and N95 respirator. Respect minimum 7-day Pre-Harvest Interval (PHI)."
                ],
                "irrigation_management": "Use drip irrigation beneath plastic or straw mulch. Water exclusively in early morning hours to allow any splashed moisture to dry before evening.",
                "fertilizer_management": "Avoid excessive Nitrogen (N) which triggers soft susceptible vegetative tissue. Supplement with Calcium Nitrate and Potassium Sulfate (0:0:50) to strengthen cell walls.",
                "prevention_tips": [
                    "Practice 3-year crop rotation with non-solanaceous crops (e.g., maize, legumes, brassicas).",
                    "Use certified disease-resistant hybrid seeds (e.g., Arka Rakshak, Arka Samrat).",
                    "Apply 2-3 inches of organic straw mulch to create a physical barrier preventing soil splash."
                ]
            },
            "Tomato Late Blight": {
                "scientific_name": "Phytophthora infestans",
                "description": "A destructive oomycete water-mold disease that causes rapid water-soaked blighting of foliage, stems, and firm brown rot on fruit.",
                "symptoms": [
                    "Water-soaked dark olive to grayish-black lesions on leaf tips and margins",
                    "Delicate white cottony fungal downy growth on leaf undersides in high humidity",
                    "Brownish-black greasy lesions girdling petioles and stems",
                    "Firm, rough, greasy golden-brown fruit rot that turns rotten rapidly"
                ],
                "causes": [
                    "Cool, damp, overcast weather (temperatures 15-22°C with >90% humidity)",
                    "Wind-blown sporangia travelling several kilometers from infected potato/tomato fields",
                    "Persistent dew or free water on foliage for over 8-10 consecutive hours"
                ],
                "immediate_actions": [
                    "Rogue out severely collapsed plants immediately to stop field-wide epidemic spread.",
                    "Cease all sprinkler and furrow irrigation to lower canopy humidity.",
                    "Alert neighboring farms if Late Blight is confirmed in the region."
                ],
                "recommended_treatments": [
                    "Curative systemic oomycete-targeted fungicide must be applied within 24-48 hours of first symptom.",
                    "Destroy culled vines by burying deep in ground or burning; never leave in field margins."
                ],
                "organic_treatments": [
                    "Copper Oxychloride 50% WP @ 2.5g/L applied proactively before prolonged rain spells.",
                    "Compost tea extract and bio-formulations of Trichoderma harzianum for leaf colonization.",
                    "Potassium phosphite bio-stimulant foliar spray to activate Systemic Acquired Resistance (SAR)."
                ],
                "chemical_treatments": [
                    "Curative/Translaminar: Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L or Dimethomorph 50% WP @ 1.0g/L.",
                    "Systemic: Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5g/L. Rotate chemical classes to prevent resistance.",
                    "Safety Guidance: Follow pesticide label directions strictly. Do not spray during windy conditions. Observe 14-day Pre-Harvest Interval."
                ],
                "irrigation_management": "Strictly drip irrigation. Monitor soil moisture with tensiometer; do not over-saturate root zone.",
                "fertilizer_management": "Balance Nitrogen with high Potassium (K2O). Apply soluble Silica foliar sprays to harden cuticle layer.",
                "prevention_tips": [
                    "Select resistant varieties with Ph-2 and Ph-3 gene resistance.",
                    "Never plant tomatoes adjacent to late-season potato crops.",
                    "Maintain open canopy architecture by staking and sucker pruning."
                ]
            },
            "Tomato Leaf Mold": {
                "scientific_name": "Passalora fulva (syn. Cladosporium fulvum)",
                "description": "Fungal disease common in greenhouses and humid high-tunnel environments causing pale yellow patches on upper leaf surfaces and velvety olive mold below.",
                "symptoms": [
                    "Diffuse pale green to yellow chlorotic blotches on upper leaf surfaces",
                    "Velvety olive-green to grayish-brown spore mat on corresponding lower surface",
                    "Leaves curl, turn brown, wither and drop prematurely"
                ],
                "causes": [
                    "Relative humidity exceeding 85% with temperatures between 21°C and 24°C",
                    "Poor air ventilation inside polyhouses or overcrowded field stands"
                ],
                "immediate_actions": [
                    "Increase greenhouse sidewall ventilation and operate horizontal air flow (HAF) fans.",
                    "Prune lower canopy leaves up to the first fruit cluster to promote air movement."
                ],
                "recommended_treatments": [
                    "Fungicide treatment covering both leaf surfaces, particularly the abaxial (underside) surface."
                ],
                "organic_treatments": [
                    "Potassium bicarbonate foliar spray (5g/L) to alter leaf surface pH against spores.",
                    "Neem oil 0.3% emulsification applied weekly."
                ],
                "chemical_treatments": [
                    "Copper Hydroxide 77% WP @ 2g/L or Boscalid @ 0.5g/L according to regional recommendations.",
                    "Safety Guidance: Always use calibrated spray nozzles and protective apparel."
                ],
                "irrigation_management": "Irrigate ground level early morning. Avoid late afternoon watering.",
                "fertilizer_management": "Ensure adequate potassium and avoid lush foliage induced by nitrate overdose.",
                "prevention_tips": [
                    "Ventilate and heat greenhouses to avoid relative humidity staying above 80%.",
                    "Choose tomato varieties with Cf resistance genes."
                ]
            },
            "Tomato Bacterial Spot": {
                "scientific_name": "Xanthomonas perforans / campestris",
                "description": "Bacterial infection causing small greasy water-soaked spots on foliage and raised scabby pustules on fruit.",
                "symptoms": [
                    "Small circular to irregular dark brown water-soaked lesions (2-3 mm)",
                    "Leaves appear tattered or shot-hole as spot centers dry and drop out",
                    "Brown blister-like scabby spots on green fruits with irregular margins"
                ],
                "causes": [
                    "Warm, rain-splashed weather (24-30°C)",
                    "Contaminated seed batches or infected nursery transplant seedlings",
                    "Handling wet plants during weeding or staking"
                ],
                "immediate_actions": [
                    "Never touch or cultivate plants when foliage is wet with dew or rain.",
                    "Rogue severely diseased seedlings in nursery beds."
                ],
                "recommended_treatments": [
                    "Apply copper bactericide combined with Mancozeb (synergistic bactericidal action)."
                ],
                "organic_treatments": [
                    "Copper Octanoate (soap) or Copper Hydroxide combined with Bacillus amyloliquefaciens.",
                    "Hot water seed treatment at 50°C for 25 minutes prior to sowing."
                ],
                "chemical_treatments": [
                    "Copper Oxychloride 50% WP (2.5g/L) tank-mixed with Mancozeb (2.0g/L) for increased free cupric ions.",
                    "Streptomycin sulfate + Tetracycline formulation (where registered for agricultural use under local permit).",
                    "Safety Guidance: Wear respirator mask and protective coveralls."
                ],
                "irrigation_management": "Switch entirely to subterranean drip irrigation. Eliminate overhead spray.",
                "fertilizer_management": "Apply balanced micronutrient spray including Zinc and Boron to boost systemic plant vigor.",
                "prevention_tips": [
                    "Source only certified disease-free and hot-water treated seeds.",
                    "Disinfect greenhouse trays and nursery equipment with 10% sodium hypochlorite solution."
                ]
            },
            "Tomato Yellow Leaf Curl Virus": {
                "scientific_name": "Tomato yellow leaf curl virus (TYLCV)",
                "description": "Devastating begomovirus transmitted by silverleaf whiteflies causing severe stunting, erect cupped leaves and flower drop.",
                "symptoms": [
                    "Severe upward curling and cupping of leaflets",
                    "Interveinal chlorosis (yellowing) with prominent green leaf veins",
                    "Stunted bushy plant growth with shortened internodes",
                    "Abscission of flowers resulting in zero fruit set"
                ],
                "causes": [
                    "Vectoring by silverleaf whitefly (Bemisia tabaci)",
                    "Hot and dry weather accelerating whitefly generational cycles"
                ],
                "immediate_actions": [
                    "Install yellow sticky traps (15-20 per acre) immediately to monitor and capture adult whiteflies.",
                    "Uproot and destroy virus-infected plants to prevent them acting as reservoir hosts."
                ],
                "recommended_treatments": [
                    "Direct treatments target the insect vector (whitefly) since viruses cannot be cured once inside plant cells."
                ],
                "organic_treatments": [
                    "Spray 1% horticultural mineral oil or Pongamia (Karanja) / Neem oil (5ml/L).",
                    "Release natural bio-control predators: Chrysoperla carnea (green lacewing) and Encarsia formosa wasps."
                ],
                "chemical_treatments": [
                    "Systemic Neonicotinoid/Diamide: Thiamethoxam 25% WG @ 0.3g/L or Dinotefuran 20% SG @ 0.5g/L.",
                    "Alternate with Spiromesifen 22.9% SC @ 1.0ml/L or Pyriproxyfen 10% EC @ 1.0ml/L for whitefly nymph management.",
                    "Safety Guidance: Avoid spraying during peak honeybee foraging hours (morning). Observe PHI."
                ],
                "irrigation_management": "Maintain uniform soil moisture to minimize drought stress which invites whitefly outbreaks.",
                "fertilizer_management": "Foliar application of micronutrients to alleviate stress; avoid excessive nitrogen.",
                "prevention_tips": [
                    "Plant TYLCV-resistant hybrids carrying Ty-1, Ty-3 genes.",
                    "Cover seedling nurseries with 40-mesh insect-proof nylon netting."
                ]
            },
            "Healthy Tomato": {
                "scientific_name": "Solanum lycopersicum (Healthy)",
                "description": "Vibrant, robust plant foliage with uniform green coloration, strong turgidity, clean stems and absence of necrotic spots or chlorosis.",
                "symptoms": [
                    "Vigorous deep green leaves with crisp margins and turgid petioles",
                    "Clean, sturdy stems free of lesions, cankers or dark streaks",
                    "Healthy flower trusses and uniform green/red fruit development",
                    "Active white fibrous root system free of galls"
                ],
                "causes": [
                    "Optimal agronomic care, balanced nutrition, timely drip irrigation and proactive sanitation."
                ],
                "immediate_actions": [
                    "Continue regular scouting and prophylactic maintenance.",
                    "Maintain consistent irrigation schedule to prevent blossom-end rot."
                ],
                "recommended_treatments": [
                    "Maintain preventative organic biological inoculants (e.g. Trichoderma and mycorrhiza) in the root zone."
                ],
                "organic_treatments": [
                    "Bi-weekly foliar application of seaweed extract (2ml/L) and vermiwash to fortify plant immunity.",
                    "Prophylactic botanical spray with 0.3% Neem seed kernel extract (NSKE)."
                ],
                "chemical_treatments": [
                    "No synthetic chemical interventions needed. Maintain routine IPM (Integrated Pest Management) monitoring.",
                    "Safety Guidance: Keep equipment clean and store all agricultural inputs safely."
                ],
                "irrigation_management": "Deliver 25-35 mm equivalent water per week via drip emitters, modulated by evapotranspiration.",
                "fertilizer_management": "Apply balanced N:P:K (e.g. 19:19:19 @ 3g/L) during vegetative stage; transition to high K (13:0:45) during fruit bulking.",
                "prevention_tips": [
                    "Continue weekly field scouting for early pest/disease detection.",
                    "Maintain clean weed-free perimeter buffers around the crop field."
                ]
            }
        }
    },
    "Potato": {
        "botanical_name": "Solanum tuberosum",
        "category": "Solanaceae (Tuberous)",
        "ideal_temp_c": "15 - 24°C",
        "ideal_humidity": "70% - 85%",
        "growth_stages": [
            {"stage": "Germination", "days": "10-18 days", "description": "Sprout emergence from seed tuber eyes."},
            {"stage": "Seedling", "days": "19-30 days", "description": "Vegetative shoot development, rooting, stolon initiation."},
            {"stage": "Vegetative", "days": "31-50 days", "description": "Full canopy establishment and branch expansion."},
            {"stage": "Budding", "days": "51-60 days", "description": "Tuber initiation (hooking of stolon tips)."},
            {"stage": "Flowering", "days": "61-75 days", "description": "Bloom appearance, tuber bulking begins rapidly."},
            {"stage": "Fruiting", "days": "76-90 days", "description": "Continuous carbohydrate translocation to underground tubers."},
            {"stage": "Maturity", "days": "91-110 days", "description": "Foliage starts yellowing (senescence), tuber skin sets."},
            {"stage": "Harvest-ready", "days": "111-125 days", "description": "Haulm drying, firm tuber skin resistance to slippage."}
        ],
        "diseases": {
            "Potato Early Blight": {
                "scientific_name": "Alternaria solani",
                "description": "Leaf spot fungus attacking senescing potato leaves, causing brown concentric target rings and tuber dry rot.",
                "symptoms": [
                    "Brown to dark brown circular spots with concentric target-board ridges",
                    "Yellowing of surrounding leaf tissue leading to early leaf drop",
                    "Shallow dark sunken spots with raised margins on tubers"
                ],
                "causes": [
                    "Alternating dry and humid cycles with temperatures of 20-28°C",
                    "Crop stress due to nutrient deficiency or high tuber load"
                ],
                "immediate_actions": [
                    "Avoid moisture stress; schedule irrigation systematically.",
                    "Spray protective contact fungicide on lower canopy."
                ],
                "recommended_treatments": [
                    "Foliar fungicide application at first canopy closure before disease advances."
                ],
                "organic_treatments": [
                    "Bordeaux mixture (1%) or Copper Hydroxide spray.",
                    "Bio-control with Bacillus subtilis foliar application."
                ],
                "chemical_treatments": [
                    "Mancozeb 75% WP @ 2.0g/L or Chlorothalonil @ 2.0g/L.",
                    "Curative: Azoxystrobin + Difenoconazole @ 1.0ml/L.",
                    "Safety Guidance: Adhere to pesticide safety gear guidelines."
                ],
                "irrigation_management": "Use sprinkler irrigation early in morning so foliage dries before 11 AM, or prefer furrow/drip.",
                "fertilizer_management": "Maintain adequate Nitrogen and Potassium levels; avoid late-stage nutrient starvation.",
                "prevention_tips": [
                    "Plant certified disease-free seed tubers.",
                    "Allow tuber skins to mature fully before harvest to prevent storage infection."
                ]
            },
            "Potato Late Blight": {
                "scientific_name": "Phytophthora infestans",
                "description": "Historical destructive blight causing rapid rotting of potato vines, foliage and tubers in cool humid climates.",
                "symptoms": [
                    "Irregular water-soaked brown lesions on leaves and stems",
                    "White moldy mildew along lesion borders on underside of leaves in morning",
                    "Rotten tubers showing reddish-brown granular dry rot under skin"
                ],
                "causes": [
                    "Relative humidity > 90% and temperature 10-21°C for 2 consecutive days",
                    "Infected cull piles or latent seed tubers carrying oospores/mycelium"
                ],
                "immediate_actions": [
                    "Kill and remove haulms (dehaulming) 10-14 days before harvest if late blight is detected.",
                    "Apply translaminar/systemic fungicide immediately across entire field block."
                ],
                "recommended_treatments": [
                    "Curative spray of Metalaxyl + Mancozeb or Mandipropamid."
                ],
                "organic_treatments": [
                    "Fixed copper sprays applied before rain events.",
                    "Strict destruction of volunteer potato plants and cull dumps."
                ],
                "chemical_treatments": [
                    "Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L.",
                    "Dimethomorph 50% WP @ 1.0g/L.",
                    "Safety Guidance: Wear personal protective equipment (PPE). Do not graze livestock on treated fields."
                ],
                "irrigation_management": "Cease irrigation during prolonged overcast high-humidity weather spells.",
                "fertilizer_management": "Avoid excess late Nitrogen. Supplement with soluble Calcium and Potassium.",
                "prevention_tips": [
                    "Utilize resistant cultivars (e.g. Kufri Girdhari, Kufri Himalini).",
                    "Practice deep earthing-up (hilling) to cover tubers with at least 10 cm soil barrier."
                ]
            },
            "Healthy Potato": {
                "scientific_name": "Solanum tuberosum (Healthy)",
                "description": "Vigorous lush green potato vines with thick sturdy stems, crisp leaves, and healthy underground tuberization.",
                "symptoms": [
                    "Uniform lush green foliage without blotches or necrotic halos",
                    "Strong erect stems with healthy branching",
                    "Normal stolon branching and uniform tuber swelling"
                ],
                "causes": [
                    "Certified seed tubers, optimal soil preparation, balanced NPK and vigilant preventive care."
                ],
                "immediate_actions": ["Maintain earthing-up and monitor for aphid vectors."],
                "recommended_treatments": ["Prophylactic bio-fertilizer and Trichoderma applications."],
                "organic_treatments": ["Neem cake soil amendment @ 250 kg/acre."],
                "chemical_treatments": ["No chemical treatment required."],
                "irrigation_management": "Maintain 70-80% field capacity moisture during tuber bulking stage.",
                "fertilizer_management": "Apply 120:100:120 kg N:P2O5:K2O per hectare split appropriately.",
                "prevention_tips": ["Weekly scouting, yellow sticky traps for aphids."]
            }
        }
    },
    "Rice": {
        "botanical_name": "Oryza sativa",
        "category": "Poaceae (Gramineae)",
        "ideal_temp_c": "22 - 34°C",
        "ideal_humidity": "80% - 95%",
        "growth_stages": [
            {"stage": "Germination", "days": "3-7 days", "description": "Coleoptile and radicle emerge from submerged seed."},
            {"stage": "Seedling", "days": "8-25 days", "description": "Nursery bed stage with 3-4 leaves developed."},
            {"stage": "Vegetative", "days": "26-55 days", "description": "Active tillering, crown root proliferation and elongation."},
            {"stage": "Budding", "days": "56-65 days", "description": "Panicle initiation and boot leaf swelling."},
            {"stage": "Flowering", "days": "66-78 days", "description": "Heading and anthesis; panicles emerge from boot sheath."},
            {"stage": "Fruiting", "days": "79-98 days", "description": "Milky and soft dough grain filling."},
            {"stage": "Maturity", "days": "99-115 days", "description": "Hard dough grain stage; 85% panicle turning golden yellow."},
            {"stage": "Harvest-ready", "days": "116-125 days", "description": "Moisture dropping to 20-22%; ripe golden grain ready for harvest."}
        ],
        "diseases": {
            "Rice Blast": {
                "scientific_name": "Magnaporthe oryzae (Pyricularia oryzae)",
                "description": "The most destructive rice disease worldwide, causing spindle/eye-shaped lesions on leaves and neck rot that breaks panicles.",
                "symptoms": [
                    "Spindle-shaped or diamond-shaped lesions with grayish-white centers and dark brown borders",
                    "Neck rot causing panicles to turn white and droop, producing chaffy grains",
                    "Nodal lesions turning black and causing the stem to snap easily"
                ],
                "causes": [
                    "Excessive Nitrogen fertilizer application",
                    "High relative humidity (>90%) with nighttime temperatures 17-23°C",
                    "Prolonged leaf wetness (>10 hours) and overcast days"
                ],
                "immediate_actions": [
                    "Immediately halt further Nitrogen top-dressing.",
                    "Maintain continuous 3-5 cm water layer in the field to buffer temperature.",
                    "Spray recommended blast fungicide at early tillering or boot stage."
                ],
                "recommended_treatments": [
                    "Foliar spray of Tricyclazole or Isoprothiolane at panicle emergence."
                ],
                "organic_treatments": [
                    "Pseudomonas fluorescens (5g/L or 1kg/acre) foliar spray and seed treatment.",
                    "Silica fertilization (calcium silicate slag) to thicken leaf epidermal silica cells."
                ],
                "chemical_treatments": [
                    "Tricyclazole 75% WP @ 0.6g/L (most specific against Blast).",
                    "Isoprothiolane 40% EC @ 1.5ml/L or Kasugamycin 3% SL @ 2.5ml/L.",
                    "Safety Guidance: Wear respirator and apron. Drain field water carefully to prevent aquatic toxicity."
                ],
                "irrigation_management": "Avoid water stress or soil drying; keep water level consistent during vegetative to heading stages.",
                "fertilizer_management": "Split Nitrogen into 3-4 doses. Increase Potassium (K) application to counteract disease susceptibility.",
                "prevention_tips": [
                    "Treat seeds with Carbendazim (2g/kg) or Pseudomonas fluorescens (10g/kg).",
                    "Avoid excessive seed sowing density in nurseries."
                ]
            },
            "Rice Brown Spot": {
                "scientific_name": "Bipolaris oryzae (Cochliobolus miyabeanus)",
                "description": "Fungal disease associated with nutrient-deficient or poor soils, producing oval sesame-seed-sized brown spots.",
                "symptoms": [
                    "Small circular to oval sesame-seed-like dark brown spots on leaf blades",
                    "Older spots show light brown or gray centers surrounded by dark reddish-brown margins",
                    "Discoloration and brown spotting on grain glumes"
                ],
                "causes": [
                    "Nutrient-deficient soils (especially low Potassium, Silicon and Zinc)",
                    "Drought stress or intermittent water shortage in rainfed lowlands"
                ],
                "immediate_actions": [
                    "Apply Potassium and micronutrient foliar spray (Zinc sulfate 0.5%).",
                    "Ensure adequate field irrigation to relieve drought stress."
                ],
                "recommended_treatments": ["Apply foliar fungicide with micronutrient supplementation."],
                "organic_treatments": ["Neem seed kernel extract (NSKE 5%) spray; bio-fertilizers."],
                "chemical_treatments": [
                    "Propiconazole 25% EC @ 1.0ml/L or Hexaconazole 5% EC @ 2.0ml/L.",
                    "Safety Guidance: Standard PPE required."
                ],
                "irrigation_management": "Keep paddy field consistently submerged with 2-5 cm water depth.",
                "fertilizer_management": "Soil test-based balanced fertilization with adequate Potash and Zinc.",
                "prevention_tips": ["Soil reclamation with organic compost; seed treatment with Trichoderma."]
            },
            "Healthy Rice": {
                "scientific_name": "Oryza sativa (Healthy)",
                "description": "Vibrant emerald green tillering paddy with clean leaf blades, sturdy culms and heavy filled panicles.",
                "symptoms": [
                    "Clean, upright emerald green leaf blades without spots or blight lines",
                    "Strong healthy tillers with robust root crowns",
                    "Uniform heading and golden filled grains free of discoloration"
                ],
                "causes": ["Good water management, balanced NPK, healthy soil biome."],
                "immediate_actions": ["Maintain water levels and monitor for leaf folder or stem borer."],
                "recommended_treatments": ["Continue regular agronomic schedule."],
                "organic_treatments": ["Azospirillum and Phosphobacteria biofertilizers."],
                "chemical_treatments": ["No chemical treatment needed."],
                "irrigation_management": "Alternate Wetting and Drying (AWD) or maintain 3-5 cm water depth.",
                "fertilizer_management": "Balanced NPK 120:40:40 kg/ha split properly.",
                "prevention_tips": ["Scout weekly, practice clean bund maintenance."]
            }
        }
    },
    "Corn (Maize)": {
        "botanical_name": "Zea mays",
        "category": "Poaceae (Gramineae)",
        "ideal_temp_c": "21 - 32°C",
        "ideal_humidity": "60% - 80%",
        "growth_stages": [
            {"stage": "Germination", "days": "4-8 days", "description": "Radicle and coleoptile push through soil surface."},
            {"stage": "Seedling", "days": "9-20 days", "description": "V2 to V4 leaf collar stages; nodal roots establish."},
            {"stage": "Vegetative", "days": "21-50 days", "description": "Rapid stalk elongation, leaf expansion (V6 to V12)."},
            {"stage": "Budding", "days": "51-60 days", "description": "Tassel emergence at top of plant (VT stage)."},
            {"stage": "Flowering", "days": "61-70 days", "description": "Pollen shed from tassel and silk emergence from ear (R1)."},
            {"stage": "Fruiting", "days": "71-85 days", "description": "Blister and milk stages of kernel development (R2-R3)."},
            {"stage": "Maturity", "days": "86-105 days", "description": "Dough and dent stages; starch solidification (R4-R5)."},
            {"stage": "Harvest-ready", "days": "106-120 days", "description": "Black layer formation at kernel base indicating physiological maturity."}
        ],
        "diseases": {
            "Northern Corn Leaf Blight": {
                "scientific_name": "Exserohilum turcicum",
                "description": "Fungal disease characterized by large cigar-shaped or elliptical grayish-green to tan lesions on maize leaves.",
                "symptoms": [
                    "Long, elliptical, cigar-shaped grayish-green or tan lesions (2.5 to 15 cm in length)",
                    "Lesions appear first on lower leaves and spread rapidly to upper ear leaf",
                    "Dark velvety fungal sporulation on lesions during humid periods"
                ],
                "causes": [
                    "Moderate temperatures (18-27°C) with heavy dew and high humidity",
                    "Surface crop residues harboring dormant fungal conidia"
                ],
                "immediate_actions": [
                    "Scout the field at silking; if lesions are observed on leaves below ear, plan fungicide application."
                ],
                "recommended_treatments": ["Apply strobilurin or triazole fungicides at tassel emergence."],
                "organic_treatments": ["Bio-spray with Trichoderma viride and neem formulation."],
                "chemical_treatments": [
                    "Azoxystrobin + Difenoconazole @ 1.0ml/L or Pyraclostrobin @ 1.0ml/L.",
                    "Safety Guidance: Follow personal protective measures."
                ],
                "irrigation_management": "Avoid overhead pivot irrigation in late afternoon.",
                "fertilizer_management": "Avoid potassium deficiency; apply balanced starter fertilizer.",
                "prevention_tips": ["Plant corn hybrids with Ht-gene resistance; practice crop rotation."]
            },
            "Common Rust": {
                "scientific_name": "Puccinia sorghi",
                "description": "Fungal rust producing powdery cinnamon-brown pustules on both upper and lower corn leaf surfaces.",
                "symptoms": [
                    "Small circular to elongate cinnamon-brown powdery pustules (uredinia) on leaf blades",
                    "Pustules rupture epidermal tissue and release reddish-brown spores",
                    "Severe infections cause leaf chlorosis and premature leaf death"
                ],
                "causes": [
                    "Cool to warm temperatures (16-25°C) and relative humidity >95%",
                    "Wind-borne spores carried from southern or warmer agricultural belts"
                ],
                "immediate_actions": ["Monitor hybrid rust susceptibility and apply fungicide if upper canopy is threatened."],
                "recommended_treatments": ["Foliar fungicide application before tasseling."],
                "organic_treatments": ["Sulfur 80% WDG @ 2.5g/L foliar spray."],
                "chemical_treatments": [
                    "Propiconazole 25% EC @ 1.0ml/L or Tebuconazole @ 1.0ml/L.",
                    "Safety Guidance: Standard agricultural safety guidelines apply."
                ],
                "irrigation_management": "Maintain adequate moisture without pooling.",
                "fertilizer_management": "Ensure balanced nutrition.",
                "prevention_tips": ["Select rust-resistant corn cultivars."]
            },
            "Healthy Corn": {
                "scientific_name": "Zea mays (Healthy)",
                "description": "Stout, robust maize stalk with broad deep-green arching leaves, well-formed tassels, and full grain-filled ears.",
                "symptoms": [
                    "Broad dark green arching leaves without necrotic striping or spots",
                    "Thick sturdy stalk with strong brace roots",
                    "Complete ear fill with bright golden kernels"
                ],
                "causes": ["Optimal planting density, weed control, balanced fertilization."],
                "immediate_actions": ["Monitor for fall armyworm and maintain moisture."],
                "recommended_treatments": ["Continue regular cultivation."],
                "organic_treatments": ["Neem cake and bio-inoculants."],
                "chemical_treatments": ["None required."],
                "irrigation_management": "Provide critical irrigation during tasseling and silking stages.",
                "fertilizer_management": "Apply 150:60:40 kg/ha NPK with Zinc sulfate.",
                "prevention_tips": ["Regular scouting and field hygiene."]
            }
        }
    },
    "Apple": {
        "botanical_name": "Malus domestica",
        "category": "Rosaceae (Pome Fruit)",
        "ideal_temp_c": "15 - 25°C",
        "ideal_humidity": "60% - 75%",
        "growth_stages": [
            {"stage": "Germination", "days": "N/A (Bud Break)", "description": "Dormant bud break, silver tip to green tip stage."},
            {"stage": "Seedling", "days": "15-25 days", "description": "Half-inch green and tight cluster bud emergence."},
            {"stage": "Vegetative", "days": "26-45 days", "description": "Shoot elongation, spur foliage expansion."},
            {"stage": "Budding", "days": "46-55 days", "description": "Pink bud stage; floral petals prominent."},
            {"stage": "Flowering", "days": "56-68 days", "description": "Full king bloom and lateral flower pollination by bees."},
            {"stage": "Fruiting", "days": "69-105 days", "description": "Petal fall, fruit set, rapid cell division and fruit thinning."},
            {"stage": "Maturity", "days": "106-140 days", "description": "Fruit sizing, sugar accumulation, anthocyanin color development."},
            {"stage": "Harvest-ready", "days": "141-160 days", "description": "Starch-iodine test shows ripeness, optimal aroma and firmness."}
        ],
        "diseases": {
            "Apple Scab": {
                "scientific_name": "Venturia inaequalis",
                "description": "Primary fungal disease of apple orchards causing velvety olive-green to black scabby lesions on leaves and corky cracks on fruit.",
                "symptoms": [
                    "Velvety olive-green to dark brown circular spots on leaf surfaces",
                    "Spots become raised, dark and corky with age",
                    "Distorted, cracked and scabby fruit unsuitable for commercial sale"
                ],
                "causes": [
                    "Cool, wet spring weather (10-20°C) with continuous rain or leaf wetness",
                    "Overwintering ascospores discharged from fallen autumn leaf litter"
                ],
                "immediate_actions": [
                    "Rake and destroy fallen leaf litter beneath orchard trees.",
                    "Spray eradicant/protective fungicide according to Mills infection periods."
                ],
                "recommended_treatments": ["Apply protective fungicide before anticipated spring rain events."],
                "organic_treatments": [
                    "Lime sulfur or wettable sulfur sprays during pre-bloom stages.",
                    "Potassium bicarbonate foliar sprays."
                ],
                "chemical_treatments": [
                    "Difenoconazole 25% EC @ 0.3ml/L or Kresoxim-methyl 44.3% SC @ 0.5ml/L.",
                    "Captan 50% WP @ 2.5g/L as protective cover.",
                    "Safety Guidance: Always use eye protection and protective respirators."
                ],
                "irrigation_management": "Use micro-sprinklers directed at soil surface or drip irrigation. Do not wet orchard tree canopy.",
                "fertilizer_management": "Avoid excess spring Nitrogen which promotes succulent, scab-prone foliage.",
                "prevention_tips": [
                    "Prune trees annually to maintain open open-center canopy for rapid drying.",
                    "Plant resistant apple varieties (e.g. Liberty, Enterprise, Prima)."
                ]
            },
            "Cedar Apple Rust": {
                "scientific_name": "Gymnosporangium juniperi-virginianae",
                "description": "Heteroecious fungal rust requiring both apple/crabapple and red cedar/juniper trees to complete its life cycle.",
                "symptoms": [
                    "Bright orange-yellow circular spots on upper apple leaf surface",
                    "Small black dots (pycnia) within the center of the orange spots",
                    "Tube-like finger structures (aecia) protruding on the leaf underside"
                ],
                "causes": [
                    "Proximity to Eastern red cedar or juniper trees with gelatinous spring galls",
                    "Warm wet conditions during early pink to petal-fall stages"
                ],
                "immediate_actions": ["Remove juniper galls within 1-2 miles of orchard if feasible."],
                "recommended_treatments": ["Foliar triazole fungicide spray during pink bud through petal fall."],
                "organic_treatments": ["Sulfur or copper sprays applied prior to bloom."],
                "chemical_treatments": [
                    "Myclobutanil @ 0.5g/L or Mancozeb 75% WP @ 2g/L.",
                    "Safety Guidance: Respect pre-harvest and re-entry intervals."
                ],
                "irrigation_management": "Soil drip irrigation.",
                "fertilizer_management": "Balanced orchard nutrition.",
                "prevention_tips": ["Remove wild juniper hosts in orchard vicinity."]
            },
            "Healthy Apple": {
                "scientific_name": "Malus domestica (Healthy)",
                "description": "Lush vibrant orchard canopy with thick dark green leaves, strong fruit spurs, and smooth blemish-free fruit skin.",
                "symptoms": [
                    "Broad deep green leaves with crisp serrated margins",
                    "Smooth clean fruit without spots, russeting or cracks",
                    "Sturdy productive branch spurs"
                ],
                "causes": ["Proper winter pruning, balanced orchard fertilization and IPM."],
                "immediate_actions": ["Maintain pest trapping and monitor canopy density."],
                "recommended_treatments": ["Prophylactic bio-stimulant foliar applications."],
                "organic_treatments": ["Dormant oil spray during winter to suppress overwintering scales/aphids."],
                "chemical_treatments": ["None required."],
                "irrigation_management": "Drip irrigation matching orchard evapotranspiration.",
                "fertilizer_management": "Balanced foliar Boron and Zinc at pink bud; Calcium sprays during fruit sizing.",
                "prevention_tips": ["Maintain clean orchard floor and winter sanitizing pruning."]
            }
        }
    },
    "Grape": {
        "botanical_name": "Vitis vinifera",
        "category": "Vitaceae (Vine)",
        "ideal_temp_c": "22 - 32°C",
        "ideal_humidity": "50% - 70%",
        "growth_stages": [
            {"stage": "Germination", "days": "Bud Burst (10-15 days)", "description": "Sap bleeding followed by green shoot emergence from dormant canes."},
            {"stage": "Seedling", "days": "16-30 days", "description": "Rapid shoot growth and leaf unfurling."},
            {"stage": "Vegetative", "days": "31-50 days", "description": "Tendril development and extensive canopy trellis fill."},
            {"stage": "Budding", "days": "51-60 days", "description": "Inflorescence clusters clearly separated and visible."},
            {"stage": "Flowering", "days": "61-72 days", "description": "Cap fall (calyptra drop) and berry set."},
            {"stage": "Fruiting", "days": "73-100 days", "description": "Berry sizing (pea-sized berries) and cluster closure."},
            {"stage": "Maturity", "days": "101-125 days", "description": "Véraison (softening and color turning to red/black/golden)."},
            {"stage": "Harvest-ready", "days": "126-140 days", "description": "Optimal sugar-to-acid ratio (Brix 18-24°), ready for table or wine harvest."}
        ],
        "diseases": {
            "Grape Black Rot": {
                "scientific_name": "Guignardia bidwellii",
                "description": "Destructive fungal disease affecting all green vine parts, causing reddish-brown leaf spots and shriveled black mummified berries.",
                "symptoms": [
                    "Small circular reddish-brown spots with dark brown margins on leaves",
                    "Tiny black fruiting bodies (pycnidia) arranged in a ring inside lesions",
                    "Berries turn soft, rot, shrink, turn blue-black and transform into hard mummies"
                ],
                "causes": [
                    "Warm, wet weather (21-27°C) requiring 6-24 hours of continuous leaf wetness",
                    "Overwintering mummified berries left on the vine or ground"
                ],
                "immediate_actions": [
                    "Hand-pick and prune off all mummified berries and infected cluster stems.",
                    "Spray curative systemic fungicide before berry rot spreads."
                ],
                "recommended_treatments": ["Apply protective and systemic fungicides from pre-bloom through 4 weeks post-bloom."],
                "organic_treatments": [
                    "Copper-based fungicides applied during early spring growth.",
                    "Thorough vineyard sanitation to remove last year's mummies."
                ],
                "chemical_treatments": [
                    "Difenoconazole 25% EC @ 0.5ml/L or Tebuconazole @ 0.5ml/L.",
                    "Mancozeb 75% WP @ 2g/L (prophylactic during early shoot growth).",
                    "Safety Guidance: Wear PPE; follow strict vineyard re-entry interval (REI)."
                ],
                "irrigation_management": "Sub-surface or drip irrigation beneath trellis wires.",
                "fertilizer_management": "Avoid excess nitrogen; balance potassium and calcium.",
                "prevention_tips": [
                    "Canopy leaf thinning around clusters to allow wind penetration.",
                    "Disinfect pruners between vine rows."
                ]
            },
            "Grape Powdery Mildew": {
                "scientific_name": "Erysiphe necator (Uncinula necator)",
                "description": "Universal vineyard fungal disease causing white powdery dust on leaves, young stems, and split scarred berries.",
                "symptoms": [
                    "White to ash-gray powdery fungal coating on upper and lower leaf surfaces",
                    "Leaves curl upward and become crinkled and brittle",
                    "Berries develop web-like russet scars, fail to expand, and crack open"
                ],
                "causes": [
                    "Shaded canopy with moderate temperatures (20-27°C) and high ambient humidity",
                    "Unlike many fungi, does NOT require free liquid water to germinate"
                ],
                "immediate_actions": [
                    "Perform summer leaf pulling in the fruiting zone to expose clusters to sunlight.",
                    "Spray sulfur or systemic powdery mildew fungicide."
                ],
                "recommended_treatments": ["Regular preventative sulfur dusting or spraying during active shoot growth."],
                "organic_treatments": [
                    "Wettable sulfur (80% WDG @ 2-3g/L) during cool morning hours (<30°C to prevent scorch).",
                    "Potassium bicarbonate (3-5g/L) foliar spray as eradicant."
                ],
                "chemical_treatments": [
                    "Penconazole 10% EC @ 0.5ml/L or Azoxystrobin 23% SC @ 1.0ml/L.",
                    "Safety Guidance: Never apply sulfur within 21 days of agricultural oils."
                ],
                "irrigation_management": "Drip irrigation; avoid vine drought stress.",
                "fertilizer_management": "Maintain balanced canopy vigor.",
                "prevention_tips": [
                    "Trellising systems (e.g. VSP - Vertical Shoot Positioning) for open canopy.",
                    "Select resistant grape rootstocks and scions."
                ]
            },
            "Healthy Grape": {
                "scientific_name": "Vitis vinifera (Healthy)",
                "description": "Vibrant vineyard canopy with crisp green palmate leaves, sturdy canes, and uniform plump berry clusters.",
                "symptoms": [
                    "Lush, clean palmate leaves with healthy green sheen",
                    "Uniform bunch architecture without cracked or shriveled berries",
                    "Strong cane lignification (browning) heading into maturity"
                ],
                "causes": ["Meticulous canopy management, shoot thinning, balanced soil fertility."],
                "immediate_actions": ["Maintain regular shoot positioning and trellis wire tension."],
                "recommended_treatments": ["Prophylactic organic micronutrient foliar sprays."],
                "organic_treatments": ["Seaweed extract and silica sprays to enhance skin toughness."],
                "chemical_treatments": ["None needed."],
                "irrigation_management": "Regulated Deficit Irrigation (RDI) post-véraison to concentrate fruit flavor.",
                "fertilizer_management": "Foliar Zinc and Boron before flowering; Potassium sulfate during véraison.",
                "prevention_tips": ["Maintain weed-free vine rows, scout weekly for downy/powdery mildew."]
            }
        }
    }
}

# Weather disease risk rules
WEATHER_RISK_RULES = [
    {
        "risk_name": "High Fungal Blight Risk (Early/Late Blight)",
        "condition": lambda t, h, r: h >= 80 and 16 <= t <= 28,
        "affected_crops": ["Tomato", "Potato"],
        "severity": "High",
        "advisory": "Relative humidity > 80% and temperatures between 16-28°C create ideal spore germination conditions. Inspect lower canopy daily and apply prophylactic bio-fungicide or copper spray."
    },
    {
        "risk_name": "Rice Blast & Sheath Blight Risk",
        "condition": lambda t, h, r: h >= 85 and 20 <= t <= 32,
        "affected_crops": ["Rice"],
        "severity": "High",
        "advisory": "High humidity and warm conditions favor blast conidia dispersion. Avoid nitrogen top-dressing and keep water level at 3-5 cm depth."
    },
    {
        "risk_name": "Powdery Mildew Favorable Climate",
        "condition": lambda t, h, r: 60 <= h <= 80 and 20 <= t <= 29,
        "affected_crops": ["Grape", "Apple", "Tomato"],
        "severity": "Moderate",
        "advisory": "Warm temperatures without rain allow powdery mildew mycelium to spread rapidly. Thin cluster leaves to increase solar penetration."
    },
    {
        "risk_name": "Bacterial Spot & Canker Rain Spread Risk",
        "condition": lambda t, h, r: r > 5.0 and t >= 24,
        "affected_crops": ["Tomato", "Bell Pepper", "Citrus"],
        "severity": "High",
        "advisory": "Rain events with temperatures above 24°C cause splash dispersal of bacterial pathogens. Do not perform intercultural operations while plants are wet."
    },
    {
        "risk_name": "Drought & Heat Stress Risk",
        "condition": lambda t, h, r: t >= 36 and h < 45,
        "affected_crops": ["Corn", "Tomato", "Rice", "Cotton"],
        "severity": "Moderate",
        "advisory": "Elevated temperatures and low moisture induce blossom drop and stomatal closure. Ensure drip irrigation during dawn and apply potassium foliar spray to preserve plant turgor."
    }
]

# Multilingual Translations for AgriBot
BOT_KNOWLEDGE_TRANSLATIONS = {
    "ta": {
        "greeting": "வணக்கம்! நான் உங்கள் அக்ரிபோட் (AgriBot) - செயற்கை நுண்ணறிவு விவசாய உதவியாளர். பயிர் நோய் கண்டறிதல், உர மேலாண்மை, பாசனம் மற்றும் இயற்கை விவசாயம் பற்றிய உங்கள் கேள்விகளை என்னிடம் கேட்கலாம்.",
        "healthy_msg": "உங்கள் பயிர் மிக ஆரோக்கியமாக உள்ளது. எந்தவொரு தீவிர நோய்த்தொற்றும் கண்டறியப்படவில்லை.",
        "blight_msg": "தக்காளி மற்றும் உருளைக்கிழங்கில் பிளைட் நோய் ஈரப்பதம் அதிகமாக இருக்கும்போது பரவுகிறது. வேப்ப எண்ணெய் அல்லது சூடோமோனாஸ் தெளிப்பது இயற்கை முறையாகும்.",
        "fertilizer_tip": "பூக்கும் பருவத்தில் அதிக நைட்ரஜன் உரங்களைத் தவிர்த்து, பொட்டாசியம் மற்றும் கால்சியம் சத்துக்களை வழங்குங்கள்.",
        "irrigation_tip": "சொட்டு நீர் பாசன முறையைப் பயன்படுத்துங்கள். இலைகளின் மேல் தண்ணீர் தெளிப்பதைத் தவிர்க்கவும்."
    }
}
