/**
 * Destination Image Override Map
 * Maps every destination slug → a confirmed local tourism image path.
 * All paths verified against public/tourism filesystem.
 * 
 * Priority: Most-specific match first (slug > state > region > fallback)
 */

const INC = "/tourism/India_Central/Incredible_India";
const AND = "/tourism/Andaman_Nicobar/Destinations";
const GUJ = "/tourism/Gujarat/Ahmedabad";
const MAH = "/tourism/Maharashtra/Overview";
const MP  = "/tourism/Madhya_Pradesh/Revered_Burhanpur";
const HAR = "/tourism/Haryana/Destinations";
const TN  = "/tourism/Tamil_Nadu/Destinations";
const DEL = "/tourism/Delhi/Explore_the_City";
const ODI = "/tourism/Odisha/Screen_Reader";
const LAK = "/tourism/Lakshadweep/Location";
const TRP = "/tourism/Tripura/Destination";
const MAN = "/tourism/Manipur/Exclusive_Destination";

// ─── Base images (confirmed existing) ───────────────────────────────────────
const I = {
  delhi:       `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
  ladakh:      `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
  kashmir:     `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
  manali:      `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
  rajasthan:   `${INC}/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg`,
  uttarakhand: `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  odisha:      `${INC}/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg`,
  darjeeling:  `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
  goa:         `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
  mumbai:      `${INC}/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg`,
  mp:          `${INC}/031_rajwada-indore-mp-city-hero_govt.jpg`,
  karnataka:   `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
  lakshadweep: `${INC}/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg`,
  tirupati:    `${INC}/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg`,
  tamilnadu:   `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
  pondy:       `${INC}/039_auroville-puducherry_govt.jpg`,
  kerala:      `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
  vof:         "/tourism/valley_of_flowers.jpg",
  andaman:     `${AND}/003_image_govt.jpg`,
  andamanBeach:`${AND}/010_Beaches_govt.jpg`,
  andamanGlass:`${AND}/027_Glass_Bottom_Boat_Ride_govt.jpg`,
  andamanIsland:`${AND}/037_Andaman_And_Nicobar_Islands_govt.jpg`,
  gujarat1:    `${GUJ}/002_Sabarmati_Ashram_govt.jpg`,
  gujarat2:    `${GUJ}/006_hutheesing_jain_temple_govt.jpg`,
  gujarat3:    `${GUJ}/008_Bai_Harir_ni_Vav_govt.jpg`,
  gujarat4:    `${GUJ}/011_Lothal_govt.jpg`,
  mah1:        `${MAH}/011_indranil-naikjpg_govt.jpg`,
  kedarnath:   "/tourism/refined/hero-kedarnath.jpg",
  trek:        "/tourism/refined/dest-kedarnath.jpg",
  mah2:        `${MAH}/017_MH-Digital-Standee-Forts-01jpg_govt.jpg`,
  mah3:        `${MAH}/035_image_govt.jpg`,
  mp1:         `${MP}/005_Asirgarh_Fort_govt.webp`,
  mp2:         `${MP}/014_Spiritual_Omkareshwar_govt.png`,
  mp3:         `${MP}/013_Tapti_Ghat_govt.webp`,
  haryana:     `${HAR}/006_Ambala_govt.jpg`,
  haryana2:    `${HAR}/010_Gurgaon_govt.jpg`,
  tamilnadu2:  `${TN}/019_Dindigul_Fort_govt.webp`,
  tamilnadu3:  `${TN}/026_Gangaikonda_Cholapuram_govt.webp`,
  tamilnadu4:  `${TN}/017_Coonoor_govt.webp`,
  delhiCity:   `${DEL}/034_image_govt.jpg`,
  delhiCity2:  `${DEL}/029_image_govt.jpg`,
  odiCity:     `${ODI}/003_Experience_Odisha_govt.webp`,
  lak1:        `${LAK}/008_image_govt.jpg`,
  lak2:        `${LAK}/012_image_govt.jpg`,
  tripura:     `${TRP}/018_destination_govt.jpg`,
  manipur:     `${MAN}/003_ema_keithel3_govt.jpg`,
};

// ─── Full destination slug → image map ──────────────────────────────────────
export const destinationImagesMap: Record<string, string> = {
  // ── ANDAMAN & NICOBAR ──
  "port-blair":           I.andaman,
  "havelock-island":      I.andamanBeach,
  "neil-island":          I.andamanIsland,
  "baratang-island":      I.andamanGlass,
  "ross-island":          I.andamanIsland,
  "diglipur":             I.andaman,
  "radhanagar-beach":     I.andamanBeach,
  "cellular-jail":        I.andaman,
  "mahatma-gandhi-marine-national-park": I.andamanGlass,
  "north-bay-island":     I.andamanGlass,
  "chiriatapu":           I.andamanBeach,
  "little-andaman":       I.andamanBeach,
  "mount-harriet":        I.andamanIsland,

  // ── ANDHRA PRADESH ──
  "visakhapatnam":        I.tirupati,
  "tirupati":             I.tirupati,
  "araku-valley":         I.karnataka,
  "amaravati":            I.tirupati,
  "vijayawada":           I.tirupati,
  "nagarjuna-konda":      I.tirupati,
  "adilabad":             I.mp,
  "amravati":             I.tirupati,
  "arikamedu":            I.pondy,
  "srikalahasti":         I.tirupati,

  // ── CHANDIGARH ──
  "chandigarh":           I.haryana,
  "elante-mall":          I.haryana,
  "capitol-complex":      I.haryana,
  "sukhna-lake":          I.haryana,
  "rock-garden":          I.haryana,

  // ── DELHI ──
  "delhi":                I.delhi,
  "red-fort":             I.delhi,
  "qutub-minar":          I.delhi,
  "india-gate":           I.delhi,
  "chandni-chowk":        I.delhi,
  "connaught-place":      I.delhiCity,
  "akshardham":           I.delhiCity,
  "hauz-khas":            I.delhiCity2,
  "lodi-garden":          I.delhiCity2,
  "humayun-tomb":         I.delhi,

  // ── GOA ──
  "panaji":               I.goa,
  "baga-beach":           I.goa,
  "anjuna":               I.goa,
  "calangute":            I.goa,
  "dudhsagar-falls":      I.karnataka,
  "old-goa":              I.goa,
  "vagator-beach":        I.goa,
  "colva-beach":          I.goa,
  "french-quarter":       I.pondy,
  "anjuna-beach":         I.goa,
  "chapora-fort":         I.goa,

  // ── GUJARAT ──
  "ahmedabad":            I.gujarat1,
  "dwarka":               I.gujarat2,
  "somnath":              I.gujarat2,
  "rann-of-kutch":        I.rajasthan,
  "gir-national-park":    I.karnataka,
  "pavagadh":             I.gujarat3,
  "champaner":            I.gujarat3,
  "vadodara":             I.gujarat1,
  "surat":                I.gujarat1,
  "bhuj":                 I.gujarat4,
  "ambaji":               I.gujarat2,
  "daman-beaches":        I.goa,
  "diu-fort":             I.goa,
  "gandhinagar":          I.gujarat1,
  "lothal":               I.gujarat4,
  "saputara":             I.karnataka,
  "gangeshwar-temple":    I.gujarat2,
  "dudhni":               I.karnataka,

  // ── HARYANA ──
  "gurgaon":              I.haryana2,
  "ambala":               I.haryana,
  "rewari":               I.haryana,
  "jhajjar":              I.haryana,
  "jind":                 I.haryana,
  "karnal":               I.haryana,
  "bhiwani":              I.haryana,
  "nuh":                  I.haryana,
  "kurukshetra":          I.uttarakhand,
  "faridabad":            I.haryana2,
  "hisar":                I.haryana,
  "bhatinda":             I.haryana,

  // ── HIMACHAL PRADESH ──
  "manali":               I.manali,
  "shimla":               I.manali,
  "dharamshala":          I.manali,
  "dalhousie":            I.manali,
  "kasol":                I.manali,
  "bir-billing":          I.manali,
  "spiti-valley":         I.manali,
  "kinnaur":              I.manali,
  "kullu":                I.manali,
  "mcleod-ganj":          I.manali,
  "kufri":                I.manali,
  "kangra":               I.manali,
  "chail":                I.manali,

  // ── JAMMU & KASHMIR ──
  "srinagar":             I.kashmir,
  "gulmarg":              I.kashmir,
  "pahalgam":             I.kashmir,
  "leh":                  I.ladakh,
  "sonamarg":             I.kashmir,
  "jammu":                I.kashmir,
  "vaishno-devi":         I.uttarakhand,
  "betaab-valley":        I.kashmir,
  "dal-lake":             I.kashmir,
  "patnitop":             I.kashmir,
  "nubra-valley":         I.ladakh,
  "pangong-lake":         I.ladakh,
  "kargil":               I.ladakh,
  "zanskar":              I.ladakh,

  // ── JHARKHAND ──
  "ranchi":               I.odiCity,
  "jamshedpur":           I.mah1,
  "dhanbad":              I.mp,
  "bokaro":               I.mp,
  "deoghar":              I.uttarakhand,
  "netarhat":             I.darjeeling,
  "betla-national-park":  I.karnataka,
  "hazaribagh":           I.odiCity,

  // ── KARNATAKA ──
  "bengaluru":            I.karnataka,
  "mysuru":               I.karnataka,
  "hampi":                I.karnataka,
  "coorg":                I.karnataka,
  "chikmagalur":          I.karnataka,
  "jog-falls":            I.karnataka,
  "badami":               I.karnataka,
  "pattadakal":           I.karnataka,
  "kabini":               I.karnataka,
  "bandipur":             I.karnataka,
  "ooty":                 I.tamilnadu4,
  "gokarna":              I.goa,
  "dandeli":              I.karnataka,

  // ── KERALA ──
  "alleppey":             I.kerala,
  "munnar":               I.darjeeling,
  "kovalam":              I.kerala,
  "thekkady":             I.karnataka,
  "thiruvananthapuram":   I.kerala,
  "kochi":                I.kerala,
  "kozhikode":            I.kerala,
  "varkala":              I.kerala,
  "wayanad":              I.karnataka,
  "kannur":               I.kerala,
  "thrissur":             I.kerala,
  "marari-beach":         I.kerala,
  "athirapally":          I.kerala,

  // ── LAKSHADWEEP ──
  "agatti-island":        I.lakshadweep,
  "bangaram-atoll":       I.lakshadweep,
  "andrott":              I.lakshadweep,
  "minicoy":              I.lakshadweep,
  "kavaratti":            I.lakshadweep,
  "kadmat":               I.lakshadweep,
  "amindivi":             I.lakshadweep,

  // ── MADHYA PRADESH ──
  "bhopal":               I.mp2,
  "khajuraho":            I.mp2,
  "indore":               I.mp,
  "gwalior":              I.mp,
  "orchha":               I.mp2,
  "ujjain":               I.mp2,
  "kanha":                I.karnataka,
  "bandhavgarh":          I.karnataka,
  "panna":                I.mp,
  "pachmarhi":            I.karnataka,
  "maheshwar":            I.mp3,
  "omkareshwar":          I.mp2,
  "sanchi":               I.mp2,
  "burhanpur":            I.mp1,
  "bhilai":               I.mp,
  "satpura":              I.karnataka,
  "ajanta-ellora":        I.mp,
  "aurangabad":           I.mp,
  "nashik":               I.uttarakhand,
  "alibaug":              I.goa,
  "lonavala":             I.mah3,

  // ── MAHARASHTRA ──
  "mumbai":               I.mumbai,
  "pune":                 I.mah1,
  "nagpur":               I.mah1,
  "kolhapur":             I.karnataka,
  "shirdi":               I.uttarakhand,
  "trimbakeshwar":        I.uttarakhand,
  "mahabaleshwar":        I.darjeeling,

  // ── MANIPUR ──
  "imphal":               I.manipur,
  "churachandpur":        I.manipur,
  "ukhrul":               I.manipur,
  "moirang":              I.manipur,
  "loktak-lake":          I.darjeeling,

  // ── MEGHALAYA ──
  "shillong":             I.darjeeling,
  "cherrapunji":          I.darjeeling,
  "dawki":                I.darjeeling,
  "mawsynram":            I.darjeeling,
  "baghmara":             I.darjeeling,
  "mawlynnong":           I.darjeeling,

  // ── MIZORAM ──
  "aizawl":               I.darjeeling,
  "champhai":             I.darjeeling,
  "lunglei":              I.darjeeling,

  // ── NAGALAND ──
  "kohima":               I.darjeeling,
  "dimapur":              I.darjeeling,
  "mokokchung":           I.darjeeling,
  "dzukou-valley":        I.vof,

  // ── ODISHA ──
  "bhubaneswar":          I.odisha,
  "puri":                 I.odisha,
  "konark":               I.odisha,
  "cuttack":              I.odiCity,
  "chilika-lake":         I.darjeeling,
  "sambalpur":            I.odiCity,
  "bastar":               I.karnataka,
  "bishnupur":            I.odisha,
  "rayagada":             I.odiCity,

  // ── PUDUCHERRY ──
  "pondicherry":          I.pondy,
  "auroville":            I.pondy,
  "aurobindo-ashram":     I.pondy,
  "chunnambar":           I.pondy,

  // ── PUNJAB ──
  "amritsar":             I.uttarakhand,
  "ludhiana":             I.haryana,
  "jalandhar":            I.haryana,
  "pathankot":            I.manali,
  "anandpur-sahib":       I.uttarakhand,

  // ── RAJASTHAN ──
  "jaipur":               I.rajasthan,
  "udaipur":              I.rajasthan,
  "jodhpur":              I.rajasthan,
  "jaisalmer":            I.rajasthan,
  "pushkar":              I.rajasthan,
  "ajmer":                I.rajasthan,
  "bikaner":              I.rajasthan,
  "mount-abu":            I.rajasthan,
  "chittorgarh":          I.rajasthan,
  "ranthambore":          I.karnataka,
  "kumbhalgarh":          I.rajasthan,
  "ranakpur":             I.rajasthan,
  "bharatpur":            I.karnataka,
  "alwar":                I.rajasthan,

  // ── SIKKIM ──
  "gangtok":              I.darjeeling,
  "pelling":              I.darjeeling,
  "yuksom":               I.darjeeling,
  "lachung":              I.darjeeling,
  "namchi":               I.darjeeling,
  "ravangla":             I.darjeeling,

  // ── TAMIL NADU ──
  "chennai":              I.tamilnadu,
  "rameswaram":           I.tamilnadu,
  "madurai":              I.tamilnadu,
  "ooty-tnadu":           I.tamilnadu4,
  "kanyakumari":          I.tamilnadu,
  "thanjavur":            I.tamilnadu3,
  "mahabalipuram":        I.tamilnadu,
  "coimbatore":           I.tamilnadu2,
  "kodaikanal":           I.darjeeling,
  "vellore":              I.tamilnadu,
  "tiruchirapalli":       I.tamilnadu,
  "chidambaram":          I.tamilnadu3,
  "tiruvannamalai":       I.uttarakhand,
  "gangaikonda-cholapuram": I.tamilnadu3,
  "coonoor":              I.tamilnadu4,
  "tenkasi":              I.kerala,

  // ── TELANGANA ──
  "hyderabad":            I.tirupati,
  "ramoji-film-city":     I.tirupati,
  "charminar":            I.tirupati,
  "warangal":             I.tirupati,
  "nagarjunasagar":       I.tirupati,
  "nagarjuna-sagar":      I.tirupati,

  // ── TRIPURA ──
  "agartala":             I.tripura,
  "unakoti":              I.tripura,
  "sepahijala":           I.tripura,

  // ── UTTAR PRADESH ──
  "agra":                 I.delhi,
  "varanasi":             I.uttarakhand,
  "lucknow":              I.delhi,
  "mathura":              I.uttarakhand,
  "vrindavan":            I.uttarakhand,
  "allahabad":            I.uttarakhand,
  "prayagraj":            I.uttarakhand,
  "ayodhya":              I.uttarakhand,
  "bodh-gaya":            I.uttarakhand,
  "sarnath":              I.uttarakhand,
  "chitrakote-falls":     I.mp3,

  // ── UTTARAKHAND ──
  "rishikesh":            I.uttarakhand,
  "haridwar":             I.uttarakhand,
  "kedarnath":            I.kedarnath,
  "badrinath":            I.ladakh,
  "mussoorie":            I.kashmir,
  "nainital":             I.darjeeling,
  "auli":                 I.kashmir,
  "jim-corbett":          I.andamanIsland,
  "valley-of-flowers":    I.vof,
  "char-dham":            I.uttarakhand,
  "gangotri":             I.uttarakhand,
  "yamunotri":            I.uttarakhand,
  "dehradun":             I.manali,
  "lansdowne":            I.manali,
  "chakrata":             I.manali,
  "munsiyari":            I.manali,
  "chopta":               I.uttarakhand,
  "tungnath":             I.uttarakhand,
  "dhanaulti":            I.manali,
  "ranikhet":             I.manali,
  "almora":               I.manali,

  // ── WEST BENGAL ──
  "kolkata":              I.darjeeling,
  "darjeeling":           I.darjeeling,
  "kalimpong":            I.darjeeling,
  "digha":                I.odisha,
  "sundarbans":           I.darjeeling,
  "kurseong":             I.darjeeling,
  "bishnupur-wb":         I.odisha,

  // ── ARUNACHAL PRADESH ──
  "tawang":               I.manali,
  "ziro-valley":          I.darjeeling,
  "bomdila":              I.manali,
  "dirang":               I.manali,
  "itanagar":             I.darjeeling,
  "bhalukpong":           I.karnataka,
  "namdapha":             I.karnataka,

  // ── ASSAM ──
  "guwahati":             I.karnataka,
  "kaziranga":            I.karnataka,
  "majuli":               I.darjeeling,
  "jorhat":               I.darjeeling,
  "dibrugarh":            I.darjeeling,
  "tezpur":               I.uttarakhand,
  "kaziranga-national-park": I.karnataka,

  // ── CHHATTISGARH ──
  "raipur":               I.mp,
  "jagdalpur":            I.karnataka,
  "chitrakoot":           I.mp3,
  "bastar-chhattisgarh":  I.karnataka,
};

/**
 * Look up the best available tourism image for a destination slug.
 * Returns undefined if slug is not mapped (caller should use state-level fallback).
 */
export function getDestinationTourismImage(slug: string): string | undefined {
  return destinationImagesMap[slug];
}
