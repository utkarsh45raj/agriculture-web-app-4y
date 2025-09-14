export const languages = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
  ta: "தமிழ்",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  gu: "ગુજરાતી",
  mr: "मराठी",
  pa: "ਪੰਜਾਬੀ",
  bn: "বাংলা",
} as const

export type Language = keyof typeof languages

type TranslationKeys =
  | "home"
  | "chatbot"
  | "weather"
  | "cropAdvisory"
  | "soilHealth"
  | "pestDetection"
  | "marketPrices"
  | "heroTitle"
  | "heroSubtitle"
  | "startFreeAdvisory"
  | "cropAdvisoryTitle"
  | "cropAdvisoryDesc"
  | "pestDetectionTitle"
  | "pestDetectionDesc"
  | "weatherAlertsTitle"
  | "weatherAlertsDesc"
  | "marketPricesTitle"
  | "marketPricesDesc"
  | "soilHealthDesc"
  | "getStarted"
  | "learnMore"
  | "tryNow"
  | "viewMore"
  | "submit"
  | "cancel"
  | "save"
  | "loading"
  | "error"
  | "success"
  | "chatbotTitle"
  | "chatbotPlaceholder"
  | "voiceInput"
  | "sendMessage"
  | "weatherTitle"
  | "currentWeather"
  | "forecast"
  | "alerts"
  | "temperature"
  | "humidity"
  | "rainfall"
  | "cropAdvisoryPageTitle"
  | "selectCrop"
  | "selectSeason"
  | "getRecommendations"
  | "sowingTips"
  | "fertilizers"
  | "irrigation"
  | "harvesting";

type TranslationsType = Record<Language, Partial<Record<TranslationKeys, string>>>;

export const translations: TranslationsType = {
  en: {
    // Navigation
    home: "Home",
    chatbot: "AI Chatbot",
    weather: "Weather Alerts",
    cropAdvisory: "Crop Advisory",
    soilHealth: "Soil Health",
    pestDetection: "Pest Detection",
    marketPrices: "Market Prices",

    // Homepage
    heroTitle: "Kisan Mitra: Your AI-Powered Farm Companion",
    heroSubtitle: "Unlock better yields with real-time crop, soil, and weather advisory",
    startFreeAdvisory: "Start Your Free Advisory",

    // Features
    cropAdvisoryTitle: "Crop Advisory",
    cropAdvisoryDesc: "Get expert tips for your crops",
    pestDetectionTitle: "Pest Detection",
    pestDetectionDesc: "Identify diseases from a single photo",
    weatherAlertsTitle: "Weather Alerts",
    weatherAlertsDesc: "Stay ahead of the weather",
    marketPricesTitle: "Market Prices",
    marketPricesDesc: "Know the best time to sell",
    soilHealthDesc: "Monitor and improve your soil quality",

    // Common
    getStarted: "Get Started",
    learnMore: "Learn More",
    tryNow: "Try Now",
    viewMore: "View More",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    loading: "Loading...",
    error: "Error occurred",
    success: "Success",

    // Chatbot
    chatbotTitle: "AI Farm Assistant",
    chatbotPlaceholder: "Ask me anything about farming...",
    voiceInput: "Voice Input",
    sendMessage: "Send Message",

    // Weather
    weatherTitle: "Weather Alerts & Predictions",
    currentWeather: "Current Weather",
    forecast: "Forecast",
    alerts: "Weather Alerts",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",

    // Crop Advisory
    cropAdvisoryPageTitle: "Crop Advisory & Recommendations",
    selectCrop: "Select Crop",
    selectSeason: "Select Season",
    getRecommendations: "Get Recommendations",
    sowingTips: "Sowing Tips",
    fertilizers: "Fertilizers",
    irrigation: "Irrigation",
    harvesting: "Harvesting",
  },
  ta: {},
  kn: {},
  ml: {},
  gu: {},
  mr: {},
  pa: {},
  bn: {},
  hi: {
    // Navigation
    home: "होम",
    chatbot: "AI चैटबॉट",
    weather: "मौसम अलर्ट",
    cropAdvisory: "फसल सलाह",
    soilHealth: "मिट्टी स्वास्थ्य",
    pestDetection: "कीट पहचान",
    marketPrices: "बाजार भाव",

    // Homepage
    heroTitle: "किसान मित्र: आपका AI-संचालित खेती साथी",
    heroSubtitle: "वास्तविक समय फसल, मिट्टी और मौसम सलाह के साथ बेहतर उपज प्राप्त करें",
    startFreeAdvisory: "अपनी मुफ्त सलाह शुरू करें",

    // Features
    cropAdvisoryTitle: "फसल सलाह",
    cropAdvisoryDesc: "अपनी फसलों के लिए विशेषज्ञ सुझाव प्राप्त करें",
    pestDetectionTitle: "कीट पहचान",
    pestDetectionDesc: "एक फोटो से बीमारियों की पहचान करें",
    weatherAlertsTitle: "मौसम अलर्ट",
    weatherAlertsDesc: "मौसम से आगे रहें",
    marketPricesTitle: "बाजार भाव",
    marketPricesDesc: "बेचने का सबसे अच्छा समय जानें",

  soilHealthDesc: "मिट्टी की गुणवत्ता की निगरानी करें और सुधारें",
    // Common
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    tryNow: "अभी आज़माएं",
    viewMore: "और देखें",
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सहेजें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि हुई",
    success: "सफलता",

    // Chatbot
    chatbotTitle: "AI खेती सहायक",
    chatbotPlaceholder: "खेती के बारे में कुछ भी पूछें...",
    voiceInput: "आवाज इनपुट",
    sendMessage: "संदेश भेजें",

    // Weather
    weatherTitle: "मौसम अलर्ट और भविष्यवाणी",
    currentWeather: "वर्तमान मौसम",
    forecast: "पूर्वानुमान",
    alerts: "मौसम अलर्ट",
    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",

    // Crop Advisory
    cropAdvisoryPageTitle: "फसल सलाह और सिफारिशें",
    selectCrop: "फसल चुनें",
    selectSeason: "मौसम चुनें",
    getRecommendations: "सिफारिशें प्राप्त करें",
    sowingTips: "बुवाई के सुझाव",
    fertilizers: "उर्वरक",
    irrigation: "सिंचाई",
    harvesting: "कटाई",
  },
  te: {
    // Navigation
    home: "హోమ్",
    chatbot: "AI చాట్‌బాట్",
    weather: "వాతావరణ హెచ్చరికలు",
    cropAdvisory: "పంట సలహా",
    soilHealth: "మట్టి ఆరోగ్యం",
    pestDetection: "కీటకాల గుర్తింపు",
    marketPrices: "మార్కెట్ ధరలు",

    // Homepage
    heroTitle: "కిసాన్ మిత్ర: మీ AI-శక్తితో కూడిన వ్యవసాయ సహాయకుడు",
    heroSubtitle: "రియల్ టైమ్ పంట, మట్టి మరియు వాతావరణ సలహాతో మెరుగైన దిగుబడిని అన్‌లాక్ చేయండి",
    startFreeAdvisory: "మీ ఉచిత సలహాను ప్రారంభించండి",

    // Features
    cropAdvisoryTitle: "పంట సలహా",
    cropAdvisoryDesc: "మీ పంటలకు నిపుణుల చిట్కాలను పొందండి",
    pestDetectionTitle: "కీటకాల గుర్తింపు",
    pestDetectionDesc: "ఒకే ఫోటో నుండి వ్యాధులను గుర్తించండి",
    weatherAlertsTitle: "వాతావరణ హెచ్చరికలు",
    weatherAlertsDesc: "వాతావరణం కంటే ముందుగా ఉండండి",
    marketPricesTitle: "మార్కెట్ ధరలు",
    marketPricesDesc: "అమ్మడానికి ఉత్తమ సమయాన్ని తెలుసుకోండి",

    // Common
  soilHealthDesc: "మీ మట్టి నాణ్యతను పర్యవేక్షించండి మరియు మెరుగుపరచండి",
    getStarted: "ప్రారంభించండి",
    learnMore: "మరింత తెలుసుకోండి",
    tryNow: "ఇప్పుడే ప్రయత్నించండి",
    viewMore: "మరింత చూడండి",
    submit: "సమర్పించండి",
    cancel: "రద్దు చేయండి",
    save: "సేవ్ చేయండి",
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం సంభవించింది",
    success: "విజయం",

    // Chatbot
    chatbotTitle: "AI వ్యవసాయ సహాయకుడు",
    chatbotPlaceholder: "వ్యవసాయం గురించి ఏదైనా అడగండి...",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    sendMessage: "సందేశం పంపండి",

    // Weather
    weatherTitle: "వాతావరణ హెచ్చరికలు & అంచనాలు",
    currentWeather: "ప్రస్తుత వాతావరణం",
    forecast: "అంచనా",
    alerts: "వాతావరణ హెచ్చరికలు",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    rainfall: "వర్షపాతం",

    // Crop Advisory
    cropAdvisoryPageTitle: "పంట సలహా & సిఫార్సులు",
    selectCrop: "పంటను ఎంచుకోండి",
    selectSeason: "సీజన్‌ను ఎంచుకోండి",
    getRecommendations: "సిఫార్సులను పొందండి",
    sowingTips: "విత్తనాల చిట్కాలు",
    fertilizers: "ఎరువులు",
    irrigation: "నీటిపారుదల",
    harvesting: "కోత",
  },
} as const

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang]?.[key] || translations.en[key] || key
}

export function getCurrentLanguage(): Language {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("language") as Language) || "en"
  }
  return "en"
}

export function setCurrentLanguage(lang: Language) {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lang)
  }
}
