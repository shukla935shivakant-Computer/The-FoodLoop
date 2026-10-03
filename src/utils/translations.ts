export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'bn'
  | 'mr'
  | 'te'
  | 'ta'
  | 'gu'
  | 'ur'
  | 'kn'
  | 'or'
  | 'pa'
  | 'ml';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    brandName: 'FoodLoop Global',
    saveFood: 'Save Food. Share Resources. Reduce Waste.',
    subheading: 'A global platform connecting surplus food with communities that can use it.',
    donateCta: 'Donate Surplus Food',
    findFoodCta: 'Find Available Food',
    demoTour: '⚡ 1-Click Demo',
    surplusMap: 'Surplus Map',
    donateFood: 'Donate Food',
    smartMatching: 'Smart Matching',
    pickups: 'Pickups & QR',
    impactDashboard: 'Impact Dashboard',
    aiAssistant: 'AI Assistant',
    adminHub: 'Admin Hub',
    settings: 'Settings',
    profile: 'Profile',
    liveGps: 'Live Location & GPS',
    locateMe: 'Locate My Surplus',
    searchingLive: 'Locating via GPS...',
    radiusKm: 'Search Radius',
    availableSurplus: 'Available Surplus',
    verifiedReceivers: 'Shelters & NGOs',
    activePickups: 'Active Pickups',
    rescuedCompleted: 'Rescued & Delivered',
    foodRescued: 'kg Food Rescued',
    mealsShared: 'Meals Shared',
    co2Avoided: 'CO₂e Avoided',
    verifiedOrgs: 'Verified NGOs & Donors',
    freshWaiting: 'Fresh Surplus Waiting For Rescue',
    viewAllMap: 'View All on Live Map',
    matchAndRescue: 'Match & Rescue',
    howItWorks: 'How FoodLoop Works',
    step1Title: 'Post Surplus in 60s',
    step2Title: 'AI Smart Matching',
    step3Title: 'Fast Pickup & QR Code',
    step4Title: 'Nourish & Track Impact',
    soundFx: 'Sound Effects',
    languageSelect: 'Select Language',
    profileSettings: 'Profile Settings & Preferences',
    fullName: 'Full Name',
    orgName: 'Organization Name',
    phone: 'Phone Number',
    facilityAddress: 'Facility Address',
    mealCapacity: 'Daily Meal Capacity',
    refrigerationAvailable: 'Cold-Chain Refrigeration',
    hotHolding: 'Hot Food Holding Box',
    saveChanges: 'Save Profile Changes',
    savedSuccess: 'Profile Settings Saved Successfully! ✓',
    urgentPickup: 'Urgent Pickup',
    freshToday: 'Fresh Today',
    statusAvailable: 'Available',
    statusAccepted: 'Accepted',
    statusInTransit: 'In Transit',
    statusCollected: 'Collected',
  },
  hi: {
    brandName: 'फूडलूप ग्लोबल',
    saveFood: 'भोजन बचाएं। संसाधन साझा करें। बर्बादी रोकें।',
    subheading: 'अतिरिक्त खाद्य सामग्री को जरूरतमंद समुदायों तक पहुंचाने वाला एक वैश्विक मंच।',
    donateCta: 'अतिरिक्त भोजन दान करें',
    findFoodCta: 'उपलब्ध भोजन खोजें',
    demoTour: '⚡ 1-क्लिक डेमो टूर',
    surplusMap: 'लाइव सरप्लस मैप',
    donateFood: 'भोजन दान करें',
    smartMatching: 'स्मार्ट मैचिंग',
    pickups: 'पिकअप और क्यूआर',
    impactDashboard: 'प्रभाव डैशबोर्ड',
    aiAssistant: 'एआई सहायक',
    adminHub: 'एडमिन हब',
    settings: 'सेटिंग्स',
    profile: 'प्रोफ़ाइल',
    liveGps: 'लाइव लोकेशन और जीपीएस',
    locateMe: 'मेरी लाइव लोकेशन खोजें',
    searchingLive: 'जीपीएस से खोज रहे हैं...',
    radiusKm: 'खोज दायरा',
    availableSurplus: 'उपलब्ध भोजन',
    verifiedReceivers: 'आश्रय और एनजीओ',
    activePickups: 'सक्रिय पिकअप',
    rescuedCompleted: 'सफलतापूर्वक वितरित',
    foodRescued: 'किग्रा भोजन बचाया',
    mealsShared: 'भोजन परोसा गया',
    co2Avoided: 'CO₂e प्रदूषण रोका',
    verifiedOrgs: 'सत्यापित संगठन',
    freshWaiting: 'बचाने हेतु उपलब्ध ताजा अतिरिक्त भोजन',
    viewAllMap: 'लाइव मैप पर सभी देखें',
    matchAndRescue: 'मैच करें और बचाएं',
    howItWorks: 'फूडलूप कैसे काम करता है',
    step1Title: '60 सेकंड में भोजन जोड़ें',
    step2Title: 'एआई स्मार्ट मैचिंग',
    step3Title: 'तेज़ पिकअप और क्यूआर कोड',
    step4Title: 'भूख मिटाएं और प्रभाव देखें',
    soundFx: 'ध्वनि प्रभाव',
    languageSelect: 'भाषा चुनें',
    profileSettings: 'प्रोफ़ाइल सेटिंग्स और प्राथमिकताएं',
    fullName: 'पूरा नाम',
    orgName: 'संगठन / रेस्तरां का नाम',
    phone: 'फ़ोन नंबर',
    facilityAddress: 'पता और स्थान',
    mealCapacity: 'दैनिक भोजन क्षमता',
    refrigerationAvailable: 'कोल्ड-चेन रेफ्रिजरेशन उपलब्ध',
    hotHolding: 'गर्म भोजन भंडारण बॉक्स',
    saveChanges: 'परिवर्तन सहेजें',
    savedSuccess: 'प्रोफ़ाइल सेटिंग्स सफलतापूर्वक सहेजी गईं! ✓',
    urgentPickup: 'अति आवश्यक पिकअप',
    freshToday: 'आज का ताजा',
    statusAvailable: 'उपलब्ध',
    statusAccepted: 'स्वीकृत',
    statusInTransit: 'रास्ते में',
    statusCollected: 'एकत्रित',
  },
  bn: {
    brandName: 'ফুডলুপ গ্লোবাল',
    saveFood: 'খাবার বাঁচান। সম্পদ ভাগ করুন। অপচয় কমান।',
    subheading: 'উদ্বৃত্ত খাবার অভাবী মানুষের কাছে পৌঁছে দেওয়ার বিশ্বস্ত প্ল্যাটফর্ম।',
    donateCta: 'উদ্বৃত্ত খাবার দান করুন',
    findFoodCta: 'উপলব্ধ খাবার খুঁজুন',
    demoTour: '⚡ ১-ক্লিক ডেমো',
    surplusMap: 'লাইভ ম্যাপ',
    donateFood: 'খাবার দান',
    smartMatching: 'স্মার্ট ম্যাচিং',
    pickups: 'পিকআপ এবং কিউআর',
    impactDashboard: 'প্রভাব ড্যাশবোর্ড',
    aiAssistant: 'এআই সহকারী',
    adminHub: 'অ্যাডমিন হাব',
    settings: 'সেটিংস',
    profile: 'প্রোফাইল',
    liveGps: 'লাইভ অবস্থান ও জিপিএস',
    locateMe: 'আমার লাইভ অবস্থান',
    searchingLive: 'জিপিএস খোঁজা হচ্ছে...',
    radiusKm: 'অনুসন্ধান ব্যাসার্ধ',
    availableSurplus: 'উপলব্ধ উদ্বৃত্ত',
    verifiedReceivers: 'আশ্রয় ও এনজিও',
    activePickups: 'সক্রিয় পিকআপ',
    rescuedCompleted: 'বিতরণ সম্পন্ন',
    foodRescued: 'কেজি খাবার উদ্ধার',
    mealsShared: 'খাবার পরিবেশিত',
    co2Avoided: 'CO₂e হ্রাস',
    verifiedOrgs: 'যাচাইকৃত সংস্থা',
    freshWaiting: 'উদ্ধারের অপেক্ষায় তাজা খাবার',
    viewAllMap: 'ম্যাপে সব দেখুন',
    matchAndRescue: 'ম্যাচ ও উদ্ধার করুন',
    howItWorks: 'ফুডলুপ কীভাবে কাজ করে',
    step1Title: '৬০ সেকেন্ডে খাবার পোস্ট',
    step2Title: 'এআই স্মার্ট ম্যাচিং',
    step3Title: 'দ্রুত পিকআপ ও কিউআর',
    step4Title: 'মানুষকে খাওয়ান ও প্রভাব দেখুন',
    soundFx: 'সাউন্ড এফেক্ট',
    languageSelect: 'ভাষা নির্বাচন করুন',
    profileSettings: 'প্রোফাইল সেটিংস',
    fullName: 'পুরো নাম',
    orgName: 'সংস্থার নাম',
    phone: 'ফোন নম্বর',
    facilityAddress: 'ঠিকানা',
    mealCapacity: 'দৈনিক ধারণক্ষমতা',
    refrigerationAvailable: 'রেফ্রিজারেশন ব্যবস্থা আছে',
    hotHolding: 'গরম রাখার বক্স',
    saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
    savedSuccess: 'প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে! ✓',
    urgentPickup: 'জরুরি পিকআপ',
    freshToday: 'আজকের তাজা',
    statusAvailable: 'উপলব্ধ',
    statusAccepted: 'গৃহীত',
    statusInTransit: 'পথে আছে',
    statusCollected: 'সংগৃহীত',
  },
  mr: {
    brandName: 'फूडलूप ग्लोबल',
    saveFood: 'अन्न वाचवा. संसाधने वाटा. नासाडी थांबवा.',
    subheading: 'शिल्लक अन्न गरजूंपर्यंत पोहोचवणारा जागतिक प्लॅटफॉर्म.',
    donateCta: 'शिल्लक अन्न दान करा',
    findFoodCta: 'उपलब्ध अन्न शोधा',
    demoTour: '⚡ १-क्लिक डेमो',
    surplusMap: 'लाइव्ह नकाशा',
    donateFood: 'अन्न दान',
    smartMatching: 'स्मार्ट मॅचिंग',
    pickups: 'पिकअप आणि क्यूआर',
    impactDashboard: 'इम्पॅक्ट डॅशबोर्ड',
    aiAssistant: 'एआय सहाय्यक',
    adminHub: 'अ‍ॅडमिन हब',
    settings: 'सेटिंग्ज',
    profile: 'प्रोफाइल',
    liveGps: 'थेट स्थान आणि जीपीएस',
    locateMe: 'माझे थेट स्थान',
    searchingLive: 'जीपीएस शोधत आहे...',
    radiusKm: 'शोध क्षेत्र',
    availableSurplus: 'उपलब्ध अन्न',
    verifiedReceivers: 'आश्रम व संस्था',
    activePickups: 'सक्रिय पिकअप',
    rescuedCompleted: 'वाटप पूर्ण',
    foodRescued: 'किलो अन्न वाचवले',
    mealsShared: 'जेवण वाटप केले',
    co2Avoided: 'CO₂e बचत',
    verifiedOrgs: 'प्रमाणित संस्था',
    freshWaiting: 'मदतीसाठी ताजे अन्न तयार',
    viewAllMap: 'नकाशावर सर्व पाहा',
    matchAndRescue: 'मॅच करा आणि वाचवा',
    howItWorks: 'फूडलूप कसे चालते',
    step1Title: '६० सेकंदात अन्न नोंदवा',
    step2Title: 'एआय स्मार्ट मॅचिंग',
    step3Title: 'जलद पिकअप आणि क्यूआर',
    step4Title: 'गरजूंना जेवू घाला',
    soundFx: 'आवाज प्रभाव',
    languageSelect: 'भाषा निवडा',
    profileSettings: 'प्रोफाइल सेटिंग्ज',
    fullName: 'पूर्ण नाव',
    orgName: 'संस्थेचे नाव',
    phone: 'फोन नंबर',
    facilityAddress: 'पत्ता',
    mealCapacity: 'दैनिक क्षमता',
    refrigerationAvailable: 'रेफ्रिजरेटर उपलब्ध',
    hotHolding: 'गरम अन्न साठवण बॉक्स',
    saveChanges: 'बदल जतन करा',
    savedSuccess: 'प्रोफाइल यशस्वीरित्या जतन केले! ✓',
    urgentPickup: 'तातडीचे पिकअप',
    freshToday: 'आजचे ताजे',
    statusAvailable: 'उपलब्ध',
    statusAccepted: 'स्वीकारले',
    statusInTransit: 'वाटेत आहे',
    statusCollected: 'संकलित केले',
  },
  te: {
    brandName: 'ఫుడ్‌లూప్ గ్లోబల్',
    saveFood: 'ఆహారాన్ని కాపాడండి. వనరులను పంచుకోండి. వృధాను తగ్గించండి.',
    subheading: 'మిగిలిన ఆహారాన్ని ఆకలితో ఉన్న వారికి అందించే గ్లోబల్ వేదిక.',
    donateCta: 'మిగిలిన ఆహారాన్ని దానం చేయండి',
    findFoodCta: 'అందుబాటులో ఉన్న ఆహారాన్ని కనుగొనండి',
    demoTour: '⚡ 1-క్లిక్ డెమో',
    surplusMap: 'లైవ్ మ్యాప్',
    donateFood: 'ఆహార దానం',
    smartMatching: 'స్మార్ట్ మ్యాచింగ్',
    pickups: 'పికప్ & క్యూఆర్',
    impactDashboard: 'ఇంపాక్ట్ డ్యాష్‌బోర్డ్',
    aiAssistant: 'ఏఐ అసిస్టెంట్',
    adminHub: 'అడ్మిన్ హబ్',
    settings: 'సెట్టింగ్‌లు',
    profile: 'ప్రొఫైల్',
    liveGps: 'లైవ్ లొకేషన్ & జీపీఎస్',
    locateMe: 'నా లైవ్ లొకేషన్',
    searchingLive: 'జీపీఎస్ శోధిస్తోంది...',
    radiusKm: 'శోధన పరిధి',
    availableSurplus: 'అందుబాటులో ఉన్న ఆహారం',
    verifiedReceivers: 'ఆశ్రమాలు & ఎన్జీవోలు',
    activePickups: 'యాక్టివ్ పికప్‌లు',
    rescuedCompleted: 'పంపిణీ పూర్తయింది',
    foodRescued: 'కిలోల ఆహారం ఆదా',
    mealsShared: 'అందించిన భోజనాలు',
    co2Avoided: 'CO₂e తగ్గింపు',
    verifiedOrgs: 'ధృవీకరించబడిన సంస్థలు',
    freshWaiting: 'రక్షించడానికి సిద్ధంగా ఉన్న తాజా ఆహారం',
    viewAllMap: 'మ్యాప్‌లో అన్నీ చూడండి',
    matchAndRescue: 'మ్యాచ్ చేసి రక్షించండి',
    howItWorks: 'ఫుడ్‌లూప్ ఎలా పనిచేస్తుంది',
    step1Title: '60 సెకన్లలో పోస్ట్ చేయండి',
    step2Title: 'ఏఐ స్మార్ట్ మ్యాచింగ్',
    step3Title: 'వేగవంతమైన పికప్ & క్యూఆర్',
    step4Title: 'ఆకలి తీర్చి ఫలితాన్ని చూడండి',
    soundFx: 'సౌండ్ ఎఫెక్ట్స్',
    languageSelect: 'భాషను ఎంచుకోండి',
    profileSettings: 'ప్రొఫైల్ సెట్టింగ్‌లు',
    fullName: 'పూర్తి పేరు',
    orgName: 'సంస్థ పేరు',
    phone: 'ఫోన్ నంబర్',
    facilityAddress: 'చిరునామా',
    mealCapacity: 'రోజువారీ సామర్థ్యం',
    refrigerationAvailable: 'శీతలీకరణ అందుబాటులో ఉంది',
    hotHolding: 'హాట్ ఫుడ్ హోల్డింగ్ బాక్స్',
    saveChanges: 'మార్పులను సేవ్ చేయండి',
    savedSuccess: 'విజయవంతంగా సేవ్ చేయబడింది! ✓',
    urgentPickup: 'అత్యవసర పికప్',
    freshToday: 'ఈ రోజు తాజాది',
    statusAvailable: 'అందుబాటులో ఉంది',
    statusAccepted: 'ఆమోదించబడింది',
    statusInTransit: 'దారిలో ఉంది',
    statusCollected: 'సేకరించబడింది',
  },
  ta: {
    brandName: 'ஃபுட்லூப் குளோபல்',
    saveFood: 'உணவைச் சேமியுங்கள். பகிர்ந்துகொள்ளுங்கள். வீணாவதைத் தடுங்கள்.',
    subheading: 'உபரி உணவை தேவைப்படும் சமூகங்களுடன் இணைக்கும் உலகளாவிய தளம்.',
    donateCta: 'உபரி உணவை தானம் செய்யுங்கள்',
    findFoodCta: 'உணவைக் கண்டறியவும்',
    demoTour: '⚡ 1-கிளிக் டெமோ',
    surplusMap: 'நேரலை வரைபடம்',
    donateFood: 'உணவு தானம்',
    smartMatching: 'ஸ்மார்ட் பொருத்தம்',
    pickups: 'பிக்கப் மற்றும் க்யூஆர்',
    impactDashboard: 'தாக்க டாஷ்போர்டு',
    aiAssistant: 'AI உதவியாளர்',
    adminHub: 'நிர்வாக மையம்',
    settings: 'அமைப்புகள்',
    profile: 'சுயவிவரம்',
    liveGps: 'நேரலை ஜிபிஎஸ் இடம்',
    locateMe: 'என் இடத்தை கண்டறி',
    searchingLive: 'ஜிபிஎஸ் தேடுகிறது...',
    radiusKm: 'தேடல் ஆரம்',
    availableSurplus: 'உள்ள உபரி உணவு',
    verifiedReceivers: 'காப்பகங்கள் & என்ஜிஓ',
    activePickups: 'செயலில் உள்ள பிக்கப்',
    rescuedCompleted: 'வழங்கப்பட்டது',
    foodRescued: 'கிலோ உணவு மீட்பு',
    mealsShared: 'பகிர்ந்த உணவுகள்',
    co2Avoided: 'CO₂e குறைப்பு',
    verifiedOrgs: 'சரிபார்க்கப்பட்ட நிறுவனங்கள்',
    freshWaiting: 'மீட்கக் காத்திருக்கும் புதிய உணவு',
    viewAllMap: 'வரைபடத்தில் பார்க்கவும்',
    matchAndRescue: 'பொருத்தி மீட்கவும்',
    howItWorks: 'ஃபுட்லூப் செயல்படும் விதம்',
    step1Title: '60 வினாடிகளில் பதிவு',
    step2Title: 'AI ஸ்மார்ட் பொருத்தம்',
    step3Title: 'விரைவான பிக்கப் & QR',
    step4Title: 'பசி போக்கி பலன் காண்க',
    soundFx: 'ஒலி விளைவுகள்',
    languageSelect: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    profileSettings: 'சுயவிவர அமைப்புகள்',
    fullName: 'முழு பெயர்',
    orgName: 'நிறுவனத்தின் பெயர்',
    phone: 'தொலைபேசி எண்',
    facilityAddress: 'முகவரி',
    mealCapacity: 'தினசரி திறன்',
    refrigerationAvailable: 'குளிர்பதன வசதி உள்ளது',
    hotHolding: 'சூடான உணவு பெட்டி',
    saveChanges: 'மாற்றங்களைச் சேமிக்கவும்',
    savedSuccess: 'வெற்றிகரமாகச் சேமிக்கப்பட்டது! ✓',
    urgentPickup: 'அவசர பிக்கப்',
    freshToday: 'இன்றைய புதியது',
    statusAvailable: 'உள்ளது',
    statusAccepted: 'ஏற்கப்பட்டது',
    statusInTransit: 'வழியில் உள்ளது',
    statusCollected: 'சேகரிக்கப்பட்டது',
  },
  gu: {
    brandName: 'ફૂડલૂપ ગ્લોબલ',
    saveFood: 'ખોરાક બચાવો. સંસાધન વહેંચો. બગાડ અટકાવો.',
    subheading: 'વધેલા ભોજનને જરૂરિયાતમંદો સુધી પહોંચાડતું ગ્લોબલ પ્લેટફોર્મ.',
    donateCta: 'વધેલું ભોજન દાન કરો',
    findFoodCta: 'ઉપલબ્ધ ભોજન શોધો',
    demoTour: '⚡ ૧-ક્લિક ડેમો',
    surplusMap: 'લાઈવ નકશો',
    donateFood: 'અન્નદાન',
    smartMatching: 'સ્માર્ટ મેચિંગ',
    pickups: 'પિકઅપ અને ક્યૂઆર',
    impactDashboard: 'ઇમ્પેક્ટ ડેશબોર્ડ',
    aiAssistant: 'AI સહાયક',
    adminHub: 'એડમિન હબ',
    settings: 'સેટિંગ્સ',
    profile: 'પ્રોફાઇલ',
    liveGps: 'લાઇવ લોકેશન અને જીપીએસ',
    locateMe: 'મારું લાઇવ લોકેશન શોધો',
    searchingLive: 'જીપીએસ શોધી રહ્યું છે...',
    radiusKm: 'શોધ મર્યાદા',
    availableSurplus: 'ઉપલબ્ધ ભોજન',
    verifiedReceivers: 'આશ્રમ અને એનજીઓ',
    activePickups: 'સક્રિય પિકઅપ',
    rescuedCompleted: 'વિતરણ પૂર્ણ',
    foodRescued: 'કિલો અનાજ બચાવ્યું',
    mealsShared: 'ભોજન પીરસાયું',
    co2Avoided: 'CO₂e બચત',
    verifiedOrgs: 'પ્રમાણિત સંસ્થાઓ',
    freshWaiting: 'બચાવવા માટે તાજું ભોજન તૈયાર',
    viewAllMap: 'નકશા પર બધું જુઓ',
    matchAndRescue: 'મેચ કરો અને બચાવો',
    howItWorks: 'ફૂડલૂપ કેવી રીતે કામ કરે છે',
    step1Title: '૬૦ સેકન્ડમાં પોસ્ટ કરો',
    step2Title: 'AI સ્માર્ટ મેચિંગ',
    step3Title: 'ઝડપી પિકઅપ અને ક્યૂઆર',
    step4Title: 'ભૂખ ભાંગો અને અસર જુઓ',
    soundFx: 'ધ્વનિ અસરો',
    languageSelect: 'ભાષા પસંદ કરો',
    profileSettings: 'પ્રોફાઇલ સેટિંગ્સ',
    fullName: 'પૂરું નામ',
    orgName: 'સંસ્થાનું નામ',
    phone: 'ફોન નંબર',
    facilityAddress: 'સરનામું',
    mealCapacity: 'દૈનિક ક્ષમતા',
    refrigerationAvailable: 'રેફ્રિજરેશન સુવિધા છે',
    hotHolding: 'ગરમ ભોજન સ્ટોરેજ',
    saveChanges: 'ફેરફાર સાચવો',
    savedSuccess: 'પ્રોફાઇલ સફળતાપૂર્વક સાચવવામાં આવી! ✓',
    urgentPickup: 'તાત્કાલિક પિકઅપ',
    freshToday: 'આજનું તાજું',
    statusAvailable: 'ઉપલબ્ધ',
    statusAccepted: 'સ્વીકાર્યું',
    statusInTransit: 'રસ્તામાં છે',
    statusCollected: 'એકત્રિત',
  },
  ur: {
    brandName: 'فوڈ لوپ گلوبل',
    saveFood: 'کھانا بچائیں، وسائل بانٹیں، بربادی روکیں۔',
    subheading: 'اضافی خوراک کو مستحقین تک پہنچانے والا عالمی پلیٹ فارم۔',
    donateCta: 'اضافی کھانا عطیہ کریں',
    findFoodCta: 'دستیاب کھانا تلاش کریں',
    demoTour: '⚡ 1-کلک ڈیمو',
    surplusMap: 'لائیو سرپلس میپ',
    donateFood: 'کھانا عطیہ کریں',
    smartMatching: 'سمارٹ میچنگ',
    pickups: 'پک اپ اور کیو آر',
    impactDashboard: 'امپیکٹ ڈیش بورڈ',
    aiAssistant: 'اے آئی اسسٹنٹ',
    adminHub: 'ایڈمن حب',
    settings: 'ترتیبات',
    profile: 'پروفائل',
    liveGps: 'لائیو لوکیشن اور جی پی ایس',
    locateMe: 'میری لوکیشن تلاش کریں',
    searchingLive: 'جی پی ایس سے تلاش جاری ہے...',
    radiusKm: 'تلاش کا دائرہ',
    availableSurplus: 'دستیاب کھانا',
    verifiedReceivers: 'شیلٹرز اور این جی اوز',
    activePickups: 'جاری پک اپس',
    rescuedCompleted: 'تقسیم مکمل',
    foodRescued: 'کلو کھانا بچایا گیا',
    mealsShared: 'کھانے تقسیم کیے گئے',
    co2Avoided: 'کاربن کا اخراج روکا گیا',
    verifiedOrgs: 'تصدیق شدہ ادارے',
    freshWaiting: 'تقسیم کے لیے تازہ کھانا تیار',
    viewAllMap: 'نقشے پر تمام دیکھیں',
    matchAndRescue: 'میچ کریں اور بچائیں',
    howItWorks: 'فوڈ لوپ کیسے کام کرتا ہے',
    step1Title: '60 سیکنڈ میں پوسٹ کریں',
    step2Title: 'اے آئی سمارٹ میچنگ',
    step3Title: 'فوری پک اپ اور کیو آر',
    step4Title: 'لوگوں کو کھلائیں اور اثر دیکھیں',
    soundFx: 'صوتی اثرات',
    languageSelect: 'زبان منتخب کریں',
    profileSettings: 'پروفائل کی ترتیبات',
    fullName: 'پورا نام',
    orgName: 'ادارے کا نام',
    phone: 'فون نمبر',
    facilityAddress: 'پتہ',
    mealCapacity: 'روزانہ کی گنجائش',
    refrigerationAvailable: 'ریفریجریشن دستیاب ہے',
    hotHolding: 'گرم کھانا رکھنے کا باکس',
    saveChanges: 'تبدیلیاں محفوظ کریں',
    savedSuccess: 'کامیابی سے محفوظ ہو گیا! ✓',
    urgentPickup: 'فوری پک اپ',
    freshToday: 'آج کا تازہ',
    statusAvailable: 'دستیاب',
    statusAccepted: 'قبول شدہ',
    statusInTransit: 'راستے میں ہے',
    statusCollected: 'وصول کر لیا گیا',
  },
  kn: {
    brandName: 'ಫುಡ್‌ಲೂಪ್ ಗ್ಲೋಬಲ್',
    saveFood: 'ಆಹಾರ ಉಳಿಸಿ. ಸಂಪನ್ಮೂಲ ಹಂಚಿಕೊಳ್ಳಿ. ಪೋಲಾಗುವುದನ್ನು ತಡೆಯಿರಿ.',
    subheading: 'ಹೆಚ್ಚುವರಿ ಆಹಾರವನ್ನು ಹಸಿದವರಿಗೆ ತಲುಪಿಸುವ ಜಾಗತಿಕ ವೇದಿಕೆ.',
    donateCta: 'ಹೆಚ್ಚುವರಿ ಆಹಾರ ದಾನ ಮಾಡಿ',
    findFoodCta: 'ಲಭ್ಯವಿರುವ ಆಹಾರ ಹುಡುಕಿ',
    demoTour: '⚡ 1-ಕ್ಲಿಕ್ ಡೆಮೊ',
    surplusMap: 'ಲೈವ್ ನಕ್ಷೆ',
    donateFood: 'ಆಹಾರ ದಾನ',
    smartMatching: 'ಸ್ಮಾರ್ಟ್ ಮ್ಯಾಚಿಂಗ್',
    pickups: 'ಪಿಕ್‌ಅಪ್ & ಕ್ಯೂಆರ್',
    impactDashboard: 'ಪ್ರಭಾವ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    aiAssistant: 'AI ಸಹಾಯಕ',
    adminHub: 'ನಿರ್ವಾಹಕ ಹಬ್',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    liveGps: 'ಲೈವ್ ಲೊಕೇಶನ್ & ಜಿಪಿಎಸ್',
    locateMe: 'ನನ್ನ ಲೈವ್ ಲೊಕೇಶನ್',
    searchingLive: 'ಜಿಪಿಎಸ್ ಹುಡುಕುತ್ತಿದೆ...',
    radiusKm: 'ಹುಡುಕಾಟದ ವ್ಯಾಪ್ತಿ',
    availableSurplus: 'ಲಭ್ಯವಿರುವ ಆಹಾರ',
    verifiedReceivers: 'ಆಶ್ರಮಗಳು ಮತ್ತು ಎನ್‌ಜಿಒಗಳು',
    activePickups: 'ಸಕ್ರಿಯ ಪಿಕ್‌ಅಪ್‌ಗಳು',
    rescuedCompleted: 'ವಿತರಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ',
    foodRescued: 'ಕೆಜಿ ಆಹಾರ ಉಳಿಸಲಾಗಿದೆ',
    mealsShared: 'ಊಟ ವಿತರಿಸಲಾಗಿದೆ',
    co2Avoided: 'CO₂e ಉಳಿತಾಯ',
    verifiedOrgs: 'ದೃಢೀಕೃತ ಸಂಸ್ಥೆಗಳು',
    freshWaiting: 'ಉಳಿಸಲು ತಾಜಾ ಆಹಾರ ಸಿದ್ಧ',
    viewAllMap: 'ನಕ್ಷೆಯಲ್ಲಿ ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
    matchAndRescue: 'ಹೊಂದಿಸಿ ಮತ್ತು ರಕ್ಷಿಸಿ',
    howItWorks: 'ಫುಡ್‌ಲೂಪ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    step1Title: '60 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಪೋಸ್ಟ್ ಮಾಡಿ',
    step2Title: 'AI ಸ್ಮಾರ್ಟ್ ಮ್ಯಾಚಿಂಗ್',
    step3Title: 'ವೇಗದ ಪಿಕ್‌ಅಪ್ ಮತ್ತು QR',
    step4Title: 'ಹಸಿವು ನೀಗಿಸಿ ಮತ್ತು ಪ್ರಭಾವ ನೋಡಿ',
    soundFx: 'ಧ್ವನಿ ಪರಿಣಾಮಗಳು',
    languageSelect: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    profileSettings: 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    fullName: 'ಪೂರ್ಣ ಹೆಸರು',
    orgName: 'ಸಂಸ್ಥೆಯ ಹೆಸರು',
    phone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    facilityAddress: 'ವಿಳಾಸ',
    mealCapacity: 'ದೈನಂದಿನ ಸಾಮರ್ಥ್ಯ',
    refrigerationAvailable: 'ಶೈತ್ಯೀಕರಣ ಸೌಲಭ್ಯವಿದೆ',
    hotHolding: 'ಬಿಸಿ ಆಹಾರ ಶೇಖರಣಾ ಪೆಟ್ಟಿಗೆ',
    saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
    savedSuccess: 'ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ! ✓',
    urgentPickup: 'ತುರ್ತು ಪಿಕ್‌ಅಪ್',
    freshToday: 'ಇಂದಿನ ತಾಜಾ',
    statusAvailable: 'ಲಭ್ಯವಿದೆ',
    statusAccepted: 'ಅಂಗೀಕರಿಸಲಾಗಿದೆ',
    statusInTransit: 'ದಾರಿಯಲ್ಲಿದೆ',
    statusCollected: 'ಸಂಗ್ರಹಿಸಲಾಗಿದೆ',
  },
  or: {
    brandName: 'ଫୁଡ୍‌ଲୁପ୍ ଗ୍ଲୋବାଲ୍',
    saveFood: 'ଖାଦ୍ୟ ବଞ୍ଚାନ୍ତୁ। ସମ୍ବଳ ବାଣ୍ଟନ୍ତୁ। ଅପଚୟ ରୋକନ୍ତୁ।',
    subheading: 'ଅଧିକ ଖାଦ୍ୟକୁ ଅଭାବୀ ଲୋକଙ୍କ ନିକଟରେ ପହଞ୍ଚାଇବା ପାଇଁ ଏକ ବୈଶ୍ୱିକ ମଞ୍ଚ।',
    donateCta: 'ଅତିରିକ୍ତ ଖାଦ୍ୟ ଦାନ କରନ୍ତୁ',
    findFoodCta: 'ଉପଲବ୍ଧ ଖାଦ୍ୟ ଖୋଜନ୍ତୁ',
    demoTour: '⚡ ୧-କ୍ଲିକ୍ ଡେମୋ',
    surplusMap: 'ଲାଇଭ୍ ମ୍ୟାପ୍',
    donateFood: 'ଖାଦ୍ୟ ଦାନ',
    smartMatching: 'ସ୍ମାର୍ଟ ମ୍ୟାଚିଂ',
    pickups: 'ପିକ୍‌ଅପ୍ ଏବଂ କ୍ୟୁଆର୍',
    impactDashboard: 'ପ୍ରଭାବ ଡ୍ୟାସବୋର୍ଡ',
    aiAssistant: 'AI ସହାୟକ',
    adminHub: 'ଆଡମିନ୍ ହବ୍',
    settings: 'ସେଟିଂସ୍',
    profile: 'ପ୍ରୋଫାଇଲ୍',
    liveGps: 'ଲାଇଭ୍ ଲୋକେସନ୍ ଏବଂ GPS',
    locateMe: 'ମୋର ଲାଇଭ୍ ଲୋକେସନ୍',
    searchingLive: 'GPS ଖୋଜୁଛି...',
    radiusKm: 'ସନ୍ଧାନ ସୀମା',
    availableSurplus: 'ଉପଲବ୍ଧ ଖାଦ୍ୟ',
    verifiedReceivers: 'ଆଶ୍ରୟସ୍ଥଳ ଓ NGO',
    activePickups: 'ସକ୍ରିୟ ପିକ୍‌ଅପ୍',
    rescuedCompleted: 'ବଣ୍ଟନ ସମ୍ପୂର୍ଣ୍ଣ',
    foodRescued: 'କିଲୋଗ୍ରାମ ଖାଦ୍ୟ ଉଦ୍ଧାର',
    mealsShared: 'ଖାଦ୍ୟ ବଣ୍ଟାଯାଇଛି',
    co2Avoided: 'CO₂e ହ୍ରାସ',
    verifiedOrgs: 'ଯାଞ୍ଚ ହୋଇଥିବା ସଂସ୍ଥା',
    freshWaiting: 'ଉଦ୍ଧାର ପାଇଁ ତାଜା ଖାଦ୍ୟ',
    viewAllMap: 'ମ୍ୟାପ୍‌ରେ ସବୁ ଦେଖନ୍ତୁ',
    matchAndRescue: 'ମ୍ୟାଚ୍ କରି ଉଦ୍ଧାର କରନ୍ତୁ',
    howItWorks: 'ଫୁଡ୍‌ଲୁପ୍ କିପରି କାମ କରେ',
    step1Title: '୬୦ ସେକେଣ୍ଡରେ ପୋଷ୍ଟ କରନ୍ତୁ',
    step2Title: 'AI ସ୍ମାର୍ଟ ମ୍ୟାଚିଂ',
    step3Title: 'ଦ୍ରୁତ ପିକ୍‌ଅପ୍ ଓ QR କୋଡ୍',
    step4Title: 'ଲୋକଙ୍କୁ ଖୁଆନ୍ତୁ',
    soundFx: 'ଶବ୍ଦ ପ୍ରଭାବ',
    languageSelect: 'ଭାଷା ବାଛନ୍ତୁ',
    profileSettings: 'ପ୍ରୋଫାଇଲ୍ ସେଟିଂସ୍',
    fullName: 'ପୂରା ନାମ',
    orgName: 'ସଂସ୍ଥାର ନାମ',
    phone: 'ଫୋନ୍ ନମ୍ବର',
    facilityAddress: 'ଠିକଣା',
    mealCapacity: 'ଦୈନିକ କ୍ଷମତା',
    refrigerationAvailable: 'ରେଫ୍ରିଜରେସନ୍ ଉପଲବ୍ଧ',
    hotHolding: 'ଗରମ ଖାଦ୍ୟ ବକ୍ସ',
    saveChanges: 'ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ କରନ୍ତୁ',
    savedSuccess: 'ସଫଳତାର ସହ ସଞ୍ଚୟ ହେଲା! ✓',
    urgentPickup: 'ଜରୁରୀ ପିକ୍‌ଅପ୍',
    freshToday: 'ଆଜିର ତାଜା',
    statusAvailable: 'ଉପଲବ୍ଧ',
    statusAccepted: 'ଗୃହୀତ',
    statusInTransit: 'ବାଟରେ ଅଛି',
    statusCollected: 'ସଂଗୃହୀତ',
  },
  pa: {
    brandName: 'ਫੂਡਲੂਪ ਗਲੋਬਲ',
    saveFood: 'ਭੋਜਨ ਬਚਾਓ। ਸਾਧਨ ਸਾਂਝੇ ਕਰੋ। ਬਰਬਾਦੀ ਰੋਕੋ।',
    subheading: 'ਵਾਧੂ ਭੋਜਨ ਨੂੰ ਲੋੜਵੰਦਾਂ ਤੱਕ ਪਹੁੰਚਾਉਣ ਵਾਲਾ ਵਿਸ਼ਵਵਿਆਪੀ ਮੰਚ।',
    donateCta: 'ਵਾਧੂ ਭੋਜਨ ਦਾਨ ਕਰੋ',
    findFoodCta: 'ਉਪਲਬਧ ਭੋਜਨ ਲੱਭੋ',
    demoTour: '⚡ 1-ਕਲਿੱਕ ਡੈਮੋ',
    surplusMap: 'ਲਾਈਵ ਨਕਸ਼ਾ',
    donateFood: 'ਭੋਜਨ ਦਾਨ',
    smartMatching: 'ਸਮਾਰਟ ਮੈਚਿੰਗ',
    pickups: 'ਪਿਕਅੱਪ ਅਤੇ ਕਿਊਆਰ',
    impactDashboard: 'ਪ੍ਰਭਾਵ ਡੈਸ਼ਬੋਰਡ',
    aiAssistant: 'AI ਸਹਾਇਕ',
    adminHub: 'ਐਡਮਿਨ ਹੱਬ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    liveGps: 'ਲਾਈਵ ਸਥਿਤੀ ਅਤੇ ਜੀਪੀਐਸ',
    locateMe: 'ਮੇਰੀ ਲਾਈਵ ਲੋਕੇਸ਼ਨ ਲੱਭੋ',
    searchingLive: 'ਜੀਪੀਐਸ ਖੋਜ ਰਿਹਾ ਹੈ...',
    radiusKm: 'ਖੋਜ ਦਾ ਦਾਇਰਾ',
    availableSurplus: 'ਉਪਲਬਧ ਭੋਜਨ',
    verifiedReceivers: 'ਆਸ਼ਰਮ ਅਤੇ ਐਨਜੀਓ',
    activePickups: 'ਚੱਲ ਰਹੇ ਪਿਕਅੱਪ',
    rescuedCompleted: 'ਵੰਡ ਮੁਕੰਮਲ',
    foodRescued: 'ਕਿਲੋ ਭੋਜਨ ਬਚਾਇਆ',
    mealsShared: 'ਭੋਜਨ ਵੰਡਿਆ ਗਿਆ',
    co2Avoided: 'CO₂e ਬਚਤ',
    verifiedOrgs: 'ਤਸਦੀਕਸ਼ੁਦਾ ਸੰਸਥਾਵਾਂ',
    freshWaiting: 'ਬਚਾਉਣ ਲਈ ਤਾਜ਼ਾ ਭੋਜਨ ਤਿਆਰ',
    viewAllMap: 'ਨਕਸ਼ੇ ਤੇ ਸਭ ਦੇਖੋ',
    matchAndRescue: 'ਮੈਚ ਕਰੋ ਅਤੇ ਬਚਾਓ',
    howItWorks: 'ਫੂਡਲੂਪ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
    step1Title: '60 ਸਕਿੰਟਾਂ ਵਿੱਚ ਪੋਸਟ ਕਰੋ',
    step2Title: 'AI ਸਮਾਰਟ ਮੈਚਿੰਗ',
    step3Title: 'ਤੇਜ਼ ਪਿਕਅੱਪ ਅਤੇ QR ਕੋਡ',
    step4Title: 'ਲੋੜਵੰਦਾਂ ਨੂੰ ਖੁਆਓ',
    soundFx: 'ਆਵਾਜ਼ ਪ੍ਰਭਾਵ',
    languageSelect: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    profileSettings: 'ਪ੍ਰੋਫਾਈਲ ਸੈਟਿੰਗਾਂ',
    fullName: 'ਪੂਰਾ ਨਾਮ',
    orgName: 'ਸੰਸਥਾ ਦਾ ਨਾਮ',
    phone: 'ਫ਼ੋਨ ਨੰਬਰ',
    facilityAddress: 'ਪਤਾ',
    mealCapacity: 'ਰੋਜ਼ਾਨਾ ਸਮਰੱਥਾ',
    refrigerationAvailable: 'ਫਰਿੱਜ ਉਪਲਬਧ ਹੈ',
    hotHolding: 'ਗਰਮ ਭੋਜਨ ਸਟੋਰੇਜ ਬਾਕਸ',
    saveChanges: 'ਤਬਦੀਲੀਆਂ ਸੰਭਾਲੋ',
    savedSuccess: 'ਸਫਲਤਾਪੂਰਵਕ ਸੰਭਾਲਿਆ ਗਿਆ! ✓',
    urgentPickup: 'ਜ਼ਰੂਰੀ ਪਿਕਅੱਪ',
    freshToday: 'ਅੱਜ ਦਾ ਤਾਜ਼ਾ',
    statusAvailable: 'ਉਪਲਬਧ',
    statusAccepted: 'ਸਵੀਕਾਰਿਆ ਗਿਆ',
    statusInTransit: 'ਰਸਤੇ ਵਿੱਚ ਹੈ',
    statusCollected: 'ਇਕੱਠਾ ਕੀਤਾ ਗਿਆ',
  },
  ml: {
    brandName: 'ഫുഡ്‌ലൂപ്പ് ഗ്ലോബൽ',
    saveFood: 'ഭക്ഷണം പാഴാക്കരുത്. വിഭവങ്ങൾ പങ്കിടുക. വിശപ്പ് മാറ്റുക.',
    subheading: 'മിച്ചം വരുന്ന ഭക്ഷണം ആവശ്യക്കാരിലേക്ക് എത്തിക്കുന്ന ആഗോള പ്ലാറ്റ്‌ഫോം.',
    donateCta: 'മിച്ചഭക്ഷണം ദാനം ചെയ്യുക',
    findFoodCta: 'ലഭ്യമായ ഭക്ഷണം കണ്ടെത്തുക',
    demoTour: '⚡ 1-ക്ലിക്ക് ഡെമോ',
    surplusMap: 'തത്സമയ മാപ്പ്',
    donateFood: 'ഭക്ഷണ ദാനം',
    smartMatching: 'സ്മാർട്ട് മാച്ചിംഗ്',
    pickups: 'പിക്കപ്പും ക്യുആറും',
    impactDashboard: 'ഇംപാക്റ്റ് ഡാഷ്‌ബോർഡ്',
    aiAssistant: 'AI അസിസ്റ്റന്റ്',
    adminHub: 'അഡ്മിൻ ഹബ്ബ്',
    settings: 'ക്രമീകരണങ്ങൾ',
    profile: 'പ്രൊഫൈൽ',
    liveGps: 'തത്സമയ ജിപിഎസ് ലൊക്കേഷൻ',
    locateMe: 'എന്റെ ലൊക്കേഷൻ കണ്ടെത്തുക',
    searchingLive: 'ജിപിഎസ് തിരയുന്നു...',
    radiusKm: 'തിരയൽ പരിധി',
    availableSurplus: 'ലഭ്യമായ മിച്ചഭക്ഷണം',
    verifiedReceivers: 'അഭയകേന്ദ്രങ്ങളും എൻജിഒകളും',
    activePickups: 'സജീവ പിക്കപ്പുകൾ',
    rescuedCompleted: 'വിതരണം പൂർത്തിയായി',
    foodRescued: 'കിലോഗ്രാം ഭക്ഷണം രക്ഷിച്ചു',
    mealsShared: 'ഭക്ഷണം പങ്കിട്ടു',
    co2Avoided: 'CO₂e ലാഭിച്ചു',
    verifiedOrgs: 'സ്ഥിരീകരിച്ച സംഘടനകൾ',
    freshWaiting: 'വിശപ്പടക്കാൻ തയ്യാറായ ഭക്ഷണം',
    viewAllMap: 'മാപ്പിൽ എല്ലാം കാണുക',
    matchAndRescue: 'പൊരുത്തപ്പെടുത്തി രക്ഷിക്കുക',
    howItWorks: 'ഫുഡ്‌ലൂപ്പ് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    step1Title: '60 സെക്കൻഡിൽ പോസ്റ്റ് ചെയ്യുക',
    step2Title: 'AI സ്മാർട്ട് മാച്ചിംഗ്',
    step3Title: 'വേഗത്തിലുള്ള പിക്കപ്പും ക്യുആറും',
    step4Title: 'വിശപ്പടക്കി മാറ്റം കാണുക',
    soundFx: 'ശബ്‌ദ ഇഫക്റ്റുകൾ',
    languageSelect: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    profileSettings: 'പ്രൊഫൈൽ ക്രമീകരണങ്ങൾ',
    fullName: 'പൂർണ്ണമായ പേര്',
    orgName: 'സ്ഥാപനത്തിന്റെ പേര്',
    phone: 'ഫോൺ നമ്പർ',
    facilityAddress: 'മേൽവിലാസം',
    mealCapacity: 'പ്രതിദിന ശേഷി',
    refrigerationAvailable: 'ശീതീകരണ സൗകര്യമുണ്ട്',
    hotHolding: 'ചൂടുള്ള ഭക്ഷണ സംഭരണപ്പെട്ടി',
    saveChanges: 'മാറ്റങ്ങൾ സൂക്ഷിക്കുക',
    savedSuccess: 'വിജയകരമായി സൂക്ഷിച്ചു! ✓',
    urgentPickup: 'അടിയന്തര പിക്കപ്പ്',
    freshToday: 'ഇന്നത്തെ ഫ്രഷ്',
    statusAvailable: 'ലഭ്യമാണ്',
    statusAccepted: 'സ്വീകരിച്ചു',
    statusInTransit: 'വഴിയിലാണ്',
    statusCollected: 'ശേഖരിച്ചു',
  },
};

/**
 * Universal dynamic phrase translator for all UI elements, food items, categories, and actions
 */
const COMMON_PHRASE_DICTIONARY: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  // Navigation & Headers
  'Surplus Map': {
    hi: 'सरप्लस मैप', bn: 'উদ্বৃত্ত মানচিত্র', mr: 'अतिरिक्त अन्न नकाशा', te: 'మిగులు ఆహార పటం',
    ta: 'உணவு வரைபடம்', gu: 'સરપ્લસ મેપ', ur: 'سرپلس فوڈ نقشہ', kn: 'ಆಹಾರ ನಕ್ಷೆ',
    or: 'ବଳକା ଖାଦ୍ୟ ମାନଚିତ୍ର', pa: 'ਸਰਪਲੱਸ ਨਕਸ਼ਾ', ml: 'ഭക്ഷണ ഭൂപടം'
  },
  'Donate Surplus Food': {
    hi: 'अतिरिक्त भोजन दान करें', bn: 'উদ্বৃত্ত খাবার দান করুন', mr: 'अतिरिक्त अन्न दान करा', te: 'మిగులు ఆహారాన్ని దానం చేయండి',
    ta: 'உணவை தானம் செய்யுங்கள்', gu: 'વધેલું ભોજન દાન કરો', ur: 'اضافی کھانا عطیہ کریں', kn: 'ಮಿಗುಲು ಆಹಾರ ದಾನ ಮಾಡಿ',
    or: 'ଅତିରିକ୍ତ ଖାଦ୍ୟ ଦାନ କରନ୍ତୁ', pa: 'ਵਾਧੂ ਭੋਜਨ ਦਾਨ ਕਰੋ', ml: 'ഭക്ഷണം ദാനം ചെയ്യുക'
  },
  'Find Available Food': {
    hi: 'उपलब्ध भोजन खोजें', bn: 'সহজলভ্য খাবার খুঁজুন', mr: 'उपलब्ध अन्न शोधा', te: 'అందుబాటులో ఉన్న ఆహారాన్ని కనుగొనండి',
    ta: 'உணவைக் கண்டறியவும்', gu: 'ઉપલબ્ધ ભોજન શોધો', ur: 'دستیاب کھانا تلاش کریں', kn: 'ಲಭ್ಯವಿರುವ ಆಹಾರ ಹುಡುಕಿ',
    or: 'ଉପଲବ୍ଧ ଖାଦ୍ୟ ଖୋଜନ୍ତୁ', pa: 'ਉਪਲਬਧ ਭੋਜਨ ਲੱਭੋ', ml: 'ലഭ്യമായ ഭക്ഷണം കണ്ടെത്തുക'
  },
  'Smart Matching': {
    hi: 'स्मार्ट मैचिंग', bn: 'স্মার্ট ম্যাচিং', mr: 'स्मार्ट जुळवणी', te: 'స్మార్ట్ సరిపోలిక',
    ta: 'ஸ்மார்ட் பொருத்தம்', gu: 'સ્માર્ટ મેળવણી', ur: 'سمارٹ میچنگ', kn: 'ಸ್ಮಾರ್ಟ್ ಹೊಂದಾಣಿಕೆ',
    or: 'ସ୍ମାର୍ଟ ମେଳକ', pa: 'ਸਮਾਰਟ ਮੇਲ', ml: 'സ്മാർട്ട് പൊരുത്തപ്പെടുത്തൽ'
  },
  'Pickups & QR': {
    hi: 'पिकअप और क्यूआर', bn: 'পিকআপ ও কিউআর', mr: 'पिकअप आणि क्यूआर', te: 'పికప్ మరియు క్యూఆర్',
    ta: 'பிக்கப் மற்றும் க்யூஆர்', gu: 'પિકઅપ અને ક્યૂઆર', ur: 'پک اپ اور کیو آر', kn: 'ಪಿಕಪ್ ಮತ್ತು ಕ್ಯೂಆರ್',
    or: 'ପିକଅପ୍ ଏବଂ କ୍ୟୁଆର୍', pa: 'ਪਿਕਅੱਪ ਅਤੇ ਕਿਊਆਰ', ml: 'പിക്കപ്പും ക്യുആറും'
  },
  'Impact Dashboard': {
    hi: 'प्रभाव डैशबोर्ड', bn: 'ইমপ্যাক্ট ড্যাশবোর্ড', mr: 'प्रभाव डॅशबोर्ड', te: 'ప్రభావ డ్యాష్‌బోర్డ్',
    ta: 'தாக்க டாஷ்போர்டு', gu: 'ઇમ્પેક્ટ ડેશબોર્ડ', ur: 'امپیکٹ ڈیش بورڈ', kn: 'ಪ್ರಭಾವ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    or: 'ପ୍ରଭାବ ଡ୍ୟାସବୋର୍ଡ', pa: 'ਪ੍ਰਭਾਵ ਡੈਸ਼ਬੋਰਡ', ml: 'ഇംപാക്റ്റ് ഡാഷ്‌ബോർഡ്'
  },
  'AI Assistant': {
    hi: 'एआई सहायक', bn: 'এআই সহায়ক', mr: 'एआय सहाय्यक', te: 'ఏఐ అసిస్టెంట్',
    ta: 'ஏஐ உதவியாளர்', gu: 'એઆઈ સહાયક', ur: 'اے آئی اسسٹنٹ', kn: 'ಎಐ ಸಹಾಯಕ',
    or: 'ଏଆଇ ସହାୟକ', pa: 'ਏਆਈ ਸਹਾਇਕ', ml: 'എഐ അസിസ്റ്റന്റ്'
  },
  'Admin Hub': {
    hi: 'व्यवस्थापक हब', bn: 'অ্যাডমিন হাব', mr: 'प्रशासक केंद्र', te: 'అడ్మిన్ హబ్',
    ta: 'நிர்வாக மையம்', gu: 'એડમિન હબ', ur: 'ایڈمن ہب', kn: 'ನಿರ್ವಾಹಕ ಹಬ್',
    or: 'ପ୍ରଶାସନିକ କେନ୍ଦ୍ର', pa: 'ਐਡਮਿਨ ਹੱਬ', ml: 'അഡ്മിൻ ഹബ്'
  },
  'Settings & Languages': {
    hi: 'सेटिंग्स और भाषाएं', bn: 'সেটিংস এবং ভাষা', mr: 'सेटिंग्ज आणि भाषा', te: 'సెట్టింగ్‌లు & భాషలు',
    ta: 'அமைப்புகள் மற்றும் மொழிகள்', gu: 'સેટિંગ્સ અને ભાષાઓ', ur: 'ترتیبات اور زبانیں', kn: 'ಸಂಯೋಜನೆಗಳು ಮತ್ತು ಭಾಷೆಗಳು',
    or: 'ସେଟିଂସ୍ ଏବଂ ଭାଷା', pa: 'ਸੈਟਿੰਗਾਂ ਅਤੇ ਭਾਸ਼ਾਵਾਂ', ml: 'ക്രമീകരണങ്ങളും ഭാഷകളും'
  },
  'Verification & Trust Badges': {
    hi: 'सत्यापन और ट्रस्ट बैज', bn: 'যাচাইকরণ এবং বিশ্বাস ব্যাজ', mr: 'पडताळणी आणि विश्वास बिल्ले', te: 'ధృవీకరణ & నమ్మక బ్యాడ్జ్‌లు',
    ta: 'சரிபார்ப்பு மற்றும் பேட்ஜ்கள்', gu: 'ચકાસણી અને ટ્રસ્ટ બેજ', ur: 'تصدیق اور قابل اعتماد بیجز', kn: 'ಪರಿಶೀಲನೆ ಮತ್ತು ನಂಬಿಕೆಯ ಬ್ಯಾಡ್ಜ್‌ಗಳು',
    or: 'ଯାଞ୍ଚ ଏବଂ ବିଶ୍ୱାସ ବ୍ୟାଜ୍', pa: 'ਪੁਸ਼ਟੀ ਅਤੇ ਭਰੋਸੇ ਦੇ ਬੈਜ', ml: 'പരിശോധനയും വിശ്വാസ ബാഡ്ജുകളും'
  },

  // Food Categories
  'Prepared Meals': {
    hi: 'पका हुआ ताजा भोजन', bn: 'রান্না করা তাজা খাবার', mr: 'तयार जेवण', te: 'సిద్ధం చేసిన భోజనం',
    ta: 'சமைத்த உணவு', gu: 'તૈયાર ભોજન', ur: 'پکا ہوا کھانا', kn: 'ಸಿದ್ಧಪಡಿಸಿದ ಊಟ',
    or: 'ରନ୍ଧା ଖାଦ୍ୟ', pa: 'ਤਿਆਰ ਭੋਜਨ', ml: 'പാകം ചെയ്ത ഭക്ഷണം'
  },
  'Bakery & Bread': {
    hi: 'बेकरी और रोटियां', bn: 'বেকারি ও রুটি', mr: 'बेकरी आणि ब्रेड', te: 'బేకరీ మరియు బ్రెడ్',
    ta: 'பேக்கரி ரொட்டிகள்', gu: 'બેકરી અને બ્રેડ', ur: 'بیکری اور روٹی', kn: 'ಬೇಕರಿ ಮತ್ತು ಬ್ರೆಡ್',
    or: 'ବେକେରୀ ଏବଂ ରୁଟି', pa: 'ਬੇਕਰੀ ਅਤੇ ਰੋਟੀ', ml: 'ബേക്കറിയും റൊട്ടിയും'
  },
  'Fresh Produce & Fruits': {
    hi: 'ताजे फल और सब्जियां', bn: 'তাজা ফল ও শাকসবজি', mr: 'ताजी फळे आणि भाज्या', te: 'తాజా పండ్లు & కూరగాయలు',
    ta: 'புதிய பழங்கள் மற்றும் காய்கறிகள்', gu: 'તાજા ફળો અને શાકભાજી', ur: 'تازہ پھل اور سبزیاں', kn: 'ತಾಜಾ ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿಗಳು',
    or: 'ସତେଜ ଫଳ ଏବଂ ପନିପରିବା', pa: 'ਤਾਜ਼ੇ ਫਲ ਅਤੇ ਸਬਜ਼ੀਆਂ', ml: 'പഴങ്ങളും പച്ചക്കറികളും'
  },
  'Dairy & Chilled': {
    hi: 'डेयरी और दूध उत्पाद', bn: 'দুগ্ধজাত পণ্য', mr: 'दुग्धजन्य पदार्थ', te: 'డైరీ మరియు పాల ఉత్పత్తులు',
    ta: 'பால் பொருட்கள்', gu: 'ડેરી અને દૂધ ઉત્પાદનો', ur: 'ڈیری اور دودھ کی اشیاء', kn: 'ಡೈರಿ ಮತ್ತು ಹಾಲು ಉತ್ಪನ್ನಗಳು',
    or: 'ଦୁଗ୍ଧଜାତ ଦ୍ରବ୍ୟ', pa: 'ਡੇਅਰੀ ਅਤੇ ਦੁੱਧ ਉਤਪਾਦ', ml: 'ഡയറി ഉൽപ്പന്നങ്ങൾ'
  },
  'Dry Pantry & Grains': {
    hi: 'सूखे अनाज और दालें', bn: 'শুকনো শস্য ও ডাল', mr: 'कोरडे धान्य आणि डाळी', te: 'ధాన్యాలు మరియు పప్పులు',
    ta: 'தானியங்கள் மற்றும் பருப்புகள்', gu: 'અનાજ અને કઠોળ', ur: 'اناج اور دالیں', kn: 'ಧಾನ್ಯಗಳು ಮತ್ತು ಬೇಳೆಕಾಳುಗಳು',
    or: 'ଶୁଖିଲା ଖାଦ୍ୟ ଓ ଡାଲି', pa: 'ਅਨਾਜ ਅਤੇ ਦਾਲਾਂ', ml: 'ധാന്യങ്ങളും പയറുവർഗ്ഗങ്ങളും'
  },

  // Storage
  'Refrigerated (0-4°C)': {
    hi: 'प्रशीतित (0-4°C) - कोल्ड चेन आवश्यक', bn: 'রেফ্রিজারেটেড (০-৪°সে)', mr: 'शीतकरण (०-४°से)', te: 'శీతలీకరణ (0-4°C)',
    ta: 'குளிரூட்டப்பட்டது (0-4°C)', gu: 'રેફ્રિજરેટેડ (૦-૪°C)', ur: 'ریفریجریٹڈ (0-4°C)', kn: 'ಶೈತ್ಯೀಕರಣ (0-4°C)',
    or: 'ଶୀତଳୀକରଣ (୦-୪°C)', pa: 'ਰੈਫ੍ਰਿਜਰੇਟਿਡ (0-4°C)', ml: 'ശീതീകരിച്ചത് (0-4°C)'
  },
  'Heated (60°C+)': {
    hi: 'गर्म (60°C+) - गर्म भंडारण', bn: 'গরম (৬০°সে+)', mr: 'उष्ण (६०°से+)', te: 'వేడి నిల్వ (60°C+)',
    ta: 'சூடானது (60°C+)', gu: 'ગરમ (૬૦°C+)', ur: 'گرم خوراک (60°C+)', kn: 'ಬಿಸಿ ಸಂಗ್ರಹ (60°C+)',
    or: 'ଗରମ (୬୦°C+)', pa: 'ਗਰਮ ਰੱਖਣ ਵਾਲਾ (60°C+)', ml: 'ചൂടോടെ സൂക്ഷിക്കുന്നത് (60°C+)'
  },
  'Dry & Cool ambient': {
    hi: 'सूखा और सामान्य तापमान', bn: 'শুষ্ক ও সাধারণ তাপমাত্রা', mr: 'कोरडे व सामान्य तापमान', te: 'పొడి మరియు సాధారణ ఉష్ణోగ్రత',
    ta: 'உலர்ந்த அறை வெப்பநிலை', gu: 'સૂકું અને સામાન્ય વાતાવરણ', ur: 'خشک اور معتدل', kn: 'ಒಣ ಮತ್ತು ಸಾಮಾನ್ಯ ತಾಪಮಾನ',
    or: 'ଶୁଖିଲା ଓ ସାଧାରଣ ତାପମାତ୍ରା', pa: 'ਸੁੱਕਾ ਅਤੇ ਸਾਧਾਰਨ ਤਾਪਮਾਨ', ml: 'സാധാരണ ഊഷ്മാവിൽ'
  },

  // Urgency
  'critical': {
    hi: 'अत्यंत जरूरी (अगले 2-4 घंटे)', bn: 'জরুরি (পরবর্তী ২-৪ ঘণ্টা)', mr: 'अत्यंत तातडीचे (२-४ तास)', te: 'అత్యవసరం (2-4 గంటల్లో)',
    ta: 'மிக அவசரம் (2-4 மணிநேரம்)', gu: 'અત્યંત તાત્કાલિક (૨-૪ કલાક)', ur: 'انتہائی ضروری', kn: 'ತುರ್ತು (2-4 ಗಂಟೆಗಳಲ್ಲಿ)',
    or: 'ଅତ୍ୟନ୍ତ ଜରୁରୀ', pa: 'ਬਹੁਤ ਜ਼ਰੂਰੀ (2-4 ਘੰਟੇ)', ml: 'അടിയന്തിരം (2-4 മണിക്കൂർ)'
  },
  'high': {
    hi: 'उच्च प्राथमिकता (आज शाम तक)', bn: 'উচ্চ অগ্রাধিকার', mr: 'उच्च प्राधान्य', te: 'అధిక ప్రాధాన్యత',
    ta: 'அதிக முன்னுரிமை', gu: 'ઉચ્ચ પ્રાથમિકતા', ur: 'زیادہ ترجیح', kn: 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ',
    or: 'ଉଚ୍ଚ ପ୍ରାଥମିକତା', pa: 'ਉੱਚ ਪ੍ਰਾਥਮਿਕਤਾ', ml: 'ഉയർന്ന മുൻഗണന'
  },

  // Buttons & Actions
  'Accept & Generate QR': {
    hi: 'स्वीकार करें और क्यूआर बनाएं', bn: 'গ্রহণ করুন এবং কিউআর তৈরি করুন', mr: 'स्वीकारा आणि क्यूआर तयार करा', te: 'స్వీకరించి క్యూఆర్ కోడ్ రూపొందించండి',
    ta: 'ஏற்றுக்கொண்டு க்யூஆர் உருவாக்கவும்', gu: 'સ્વીકારો અને ક્યૂઆર બનાવો', ur: 'قبول کریں اور کیو آر بنائیں', kn: 'ಸ್ವೀಕರಿಸಿ ಮತ್ತು ಕ್ಯೂಆರ್ ರಚಿಸಿ',
    or: 'ଗ୍ରହଣ କରନ୍ତୁ ଏବଂ କ୍ୟୁଆର୍ ପ୍ରସ୍ତୁତ କରନ୍ତୁ', pa: 'ਸਵੀਕਾਰ ਕਰੋ ਅਤੇ ਕਿਊਆਰ ਬਣਾਓ', ml: 'സ്വീകരിച്ച് ക്യുആർ കോഡ് ഉണ്ടാക്കുക'
  },
  'Locate My Surplus': {
    hi: 'मेरी सरप्लस लोकेशन खोजें', bn: 'আমার উদ্বৃত্তের অবস্থান খুঁজুন', mr: 'माझे अन्न स्थान शोधा', te: 'నా మిగులు ప్రదేశాన్ని గుర్తించండి',
    ta: 'எனது உணவு இருப்பிடத்தைக் கண்டறியவும்', gu: 'મારું ભોજન સ્થાન શોધો', ur: 'میرے کھانے کا مقام تلاش کریں', kn: 'ನನ್ನ ಆಹಾರ ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡಿ',
    or: 'ମୋର ଖାଦ୍ୟ ସ୍ଥାନ ଖୋଜନ୍ତୁ', pa: 'ਮੇਰਾ ਭੋਜਨ ਸਥਾਨ ਲੱਭੋ', ml: 'എന്റെ ലൊക്കേഷൻ കണ്ടെത്തുക'
  },
  'Update to My Live GPS': {
    hi: 'लाइव जीपीएस से अपडेट करें', bn: 'লাইভ জিপিএস দিয়ে আপডেট করুন', mr: 'थेट जीपीएसने अपडेट करा', te: 'లైవ్ జీపీఎస్‌తో అప్‌డేట్ చేయండి',
    ta: 'நேரலை ஜிபிஎஸ் மூலம் புதுப்பிக்கவும்', gu: 'લાઈવ જીપીએસથી અપડેટ કરો', ur: 'لائیو جی پی ایس سے اپ ڈیٹ کریں', kn: 'ಲೈವ್ ಜಿಪಿಎಸ್‌ನೊಂದಿಗೆ ನವೀಕರಿಸಿ',
    or: 'ଲାଇଭ୍ ଜିପିଏସ୍ ସହିତ ଅଦ୍ୟତନ କରନ୍ତୁ', pa: 'ਲਾਈਵ ਜੀਪੀਐਸ ਨਾਲ ਅੱਪਡੇਟ ਕਰੋ', ml: 'തത്സമയ ജിപിഎസിൽ അപ്ഡേറ്റ് ചെയ്യുക'
  },
  'Save Profile Changes': {
    hi: 'प्रोफ़ाइल परिवर्तन सहेजें', bn: 'প্রোফাইল পরিবর্তন সংরক্ষণ করুন', mr: 'बदल जतन करा', te: 'మార్పులను భద్రపరచండి',
    ta: 'மாற்றங்களைச் சேமிக்கவும்', gu: 'ફેરફારો સાચવો', ur: 'تبدیلیاں محفوظ کریں', kn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
    or: 'ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ କରନ୍ତୁ', pa: 'ਤਬਦੀਲੀਆਂ ਸੁਰੱਖਿਅਤ ਕਰੋ', ml: 'മാറ്റങ്ങൾ സൂക്ഷിക്കുക'
  },
  'Simulate QR Scan': {
    hi: 'क्यूआर स्कैन सिमुलेट करें', bn: 'কিউআর স্ক্যান অনুকরণ করুন', mr: 'क्यूआर स्कॅन सिम्युलेट करा', te: 'క్యూఆర్ స్కాన్ అనుకరించండి',
    ta: 'க்யூஆர் ஸ்கேன் உருவகப்படுத்துங்கள்', gu: 'ક્યૂઆર સ્કેન ચકાસો', ur: 'کیو آر اسکین آزمائیں', kn: 'ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್ ಪರೀಕ್ಷಿಸಿ',
    or: 'କ୍ୟୁଆର୍ ସ୍କାନ୍ ଅନୁକରଣ କରନ୍ତୁ', pa: 'ਕਿਊਆਰ ਸਕੈਨ ਪਰਖੋ', ml: 'ക്യുആർ സ്കാൻ പരിശോധിക്കുക'
  },
  'Track Pickup': {
    hi: 'पिकअप ट्रैक करें', bn: 'পিকআপ ট্র্যাক করুন', mr: 'पिकअप ट्रॅक करा', te: 'పికప్ ట్రాక్ చేయండి',
    ta: 'பிக்கப்பைக் கண்காணிக்கவும்', gu: 'પિકઅપ ટ્રેક કરો', ur: 'پک اپ ٹریک کریں', kn: 'ಪಿಕಪ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    or: 'ପିକଅପ୍ ଟ୍ରାକ୍ କରନ୍ତୁ', pa: 'ਪਿਕਅੱਪ ਟਰੈਕ ਕਰੋ', ml: 'പിക്കപ്പ് ട്രാക്ക് ചെയ്യുക'
  },

  // Vertical Navigation & Left Sidebar Options
  'About Us': {
    hi: 'हमारे बारे में', bn: 'আমাদের সম্পর্কে', mr: 'आमच्याबद्दल', te: 'మా గురించి',
    ta: 'எங்களைப் பற்றி', gu: 'અમારા વિશે', ur: 'ہمارے متعلق', kn: 'ನಮ್ಮ ಬಗ್ಗೆ',
    or: 'ଆମ ବିଷୟରେ', pa: 'ਸਾਡੇ ਬਾਰੇ', ml: 'ഞങ്ങളെക്കുറിച്ച്'
  },
  'About FoodLoop': {
    hi: 'फूडलूप के बारे में', bn: 'ফুডলুপ সম্পর্কে', mr: 'फूडलूपबद्दल', te: 'ఫుడ్‌లూప్ గురించి',
    ta: 'ஃபுட்லூப் பற்றி', gu: 'ફૂડલૂપ વિશે', ur: 'فوڈ لوپ کے بارے میں', kn: 'ಫುಡ್‌ಲೂಪ್ ಬಗ್ಗೆ',
    or: 'ଫୁଡଲୁପ ବିଷୟରେ', pa: 'ਫੂਡਲੂਪ ਬਾਰੇ', ml: 'ഫുഡ്‌ലൂപ്പിനെക്കുറിച്ച്'
  },
  'Our Mission': {
    hi: 'हमारा मिशन', bn: 'আমাদের লক্ষ্য', mr: 'आमचे ध्येय', te: 'మా లక్ష్యం',
    ta: 'எங்கள் பணி', gu: 'અમારું મિશન', ur: 'ہمارا مشن', kn: 'ನಮ್ಮ ಧ್ಯೇಯ',
    or: 'ଆମର ଲକ୍ଷ୍ୟ', pa: 'ਸਾਡਾ ਮਿਸ਼ਨ', ml: 'ഞങ്ങളുടെ ലക്ഷ്യം'
  },
  'How It Works': {
    hi: 'यह कैसे काम करता है', bn: 'এটি কীভাবে কাজ করে', mr: 'हे कसे कार्य करते', te: 'ఇది ఎలా పనిచేస్తుంది',
    ta: 'இது எவ்வாறு செயல்படுகிறது', gu: 'તે કેવી રીતે કાર્ય કરે છે', ur: 'یہ کیسے کام کرتا ہے', kn: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    or: 'ଏହା କିପରି କାମ କରେ', pa: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ', ml: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു'
  },
  'Food Safety & Trust': {
    hi: 'खाद्य सुरक्षा और विश्वास', bn: 'খাদ্য নিরাপত্তা ও বিশ্বাস', mr: 'अन्न सुरक्षा आणि विश्वास', te: 'ఆహార భద్రత మరియు నమ్మకం',
    ta: 'உணவுப் பாதுகாப்பு மற்றும் நம்பிக்கை', gu: 'ખાદ્ય સુરક્ષા અને વિશ્વાસ', ur: 'کھانے کی حفاظت اور اعتماد', kn: 'ಆಹಾರ ಸುರಕ್ಷತೆ ಮತ್ತು ನಂಬಿಕೆ',
    or: 'ଖାଦ୍ୟ ସୁରକ୍ଷା ଏବଂ ବିଶ୍ୱାସ', pa: 'ਭੋਜਨ ਸੁਰੱਖਿਆ ਅਤੇ ਭਰੋਸਾ', ml: 'ഭക്ഷ്യ സുരക്ഷയും വിശ്വാസ്യതയും'
  },
  'Core Technology': {
    hi: 'मूल तकनीक', bn: 'মূল প্রযুক্তি', mr: 'मुख्य तंत्रज्ञान', te: 'ప్రధాన సాంకేతికత',
    ta: 'முக்கிய தொழில்நுட்பம்', gu: 'મુખ્ય ટેકનોલોજી', ur: 'بنیادی ٹیکنالوجی', kn: 'ಪ್ರಮುಖ ತಂತ್ರಜ್ಞಾನ',
    or: 'ମୁଖ୍ୟ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା', pa: 'ਮੁੱਖ ਤਕਨਾਲੋਜੀ', ml: 'പ്രധാന സാങ്കേതികവിദ്യ'
  },
  'Key Statistics': {
    hi: 'प्रमुख आंकड़े', bn: 'মূল পরিসংখ্যান', mr: 'महत्त्वाची आकडेवारी', te: 'కీలక గణాంకాలు',
    ta: 'முக்கிய புள்ளிவிவரங்கள்', gu: 'મુખ્ય આંકડાઓ', ur: 'اہم اعداد و شمار', kn: 'ಪ್ರಮುಖ ಅಂಕಿಅಂಶಗಳು',
    or: 'ମୁଖ୍ୟ ପରିସଂଖ୍ୟାନ', pa: 'ਮੁੱਖ ਅੰਕੜੇ', ml: 'പ്രധാന സ്ഥിതിവിവരക്കണക്കുകൾ'
  },
  'All Options': {
    hi: 'सभी विकल्प', bn: 'সব বিকল্প', mr: 'सर्व पर्याय', te: 'అన్ని ఎంపికలు',
    ta: 'அனைத்து விருப்பங்கள்', gu: 'બધા વિકલ્પો', ur: 'تمام اختیارات', kn: 'ಎಲ್ಲಾ ಆಯ್ಕೆಗಳು',
    or: 'ସମସ୍ତ ବିକଳ୍ପ', pa: 'ਸਾਰੇ ਵਿਕਲਪ', ml: 'എല്ലാ ഓപ്ഷനുകളും'
  },
  'Navigation': {
    hi: 'नेविगेशन', bn: 'নেভিগেশন', mr: 'दिशादर्शन', te: 'నావిగేషన్',
    ta: 'வழிசெலுத்தல்', gu: 'નેવિગેશન', ur: 'رہنمائی', kn: 'ನ್ಯಾವಿಗೇಷನ್',
    or: 'ନାଭିଗେସନ୍', pa: 'ਨੇਵੀਗੇਸ਼ਨ', ml: 'നാവിഗേഷൻ'
  },
  'Preferred Language': {
    hi: 'पसंदीदा भाषा', bn: 'পছন্দের ভাষা', mr: 'पसंतीची भाषा', te: 'ప్రాధాన్య భాష',
    ta: 'விருப்பமான மொழி', gu: 'પસંદગીની ભાષા', ur: 'پسندیدہ زبان', kn: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
    or: 'ପସନ୍ଦର ଭାଷା', pa: 'ਤਰਜੀਹੀ ਭਾਸ਼ਾ', ml: 'തിരഞ്ഞെടുത്ത ഭാഷ'
  },
  'Switch Perspective': {
    hi: 'भूमिका बदलें', bn: 'ভূমিকা পরিবর্তন', mr: 'भूमिका बदला', te: 'దృక్కోణాన్ని మార్చండి',
    ta: 'பார்வையை மாற்றவும்', gu: 'ભૂમિકા બદલો', ur: 'کردار تبدیل کریں', kn: 'ಪಾತ್ರವನ್ನು ಬದಲಾಯಿಸಿ',
    or: 'ଭୂମିକା ପରିବର୍ତ୍ତନ କରନ୍ତୁ', pa: 'ਭੂਮਿਕਾ ਬਦਲੋ', ml: 'റോൾ മാറ്റുക'
  },
  'Quick Controls': {
    hi: 'त्वरित नियंत्रण', bn: 'द्रुत নিয়ন্ত্রণ', mr: 'जलद नियंत्रणे', te: 'శీఘ್ರ నియంత్రణలు',
    ta: 'விரைவுக் கட்டுப்பாடுகள்', gu: 'ઝડપી નિયંત્રણો', ur: 'فوری کنٹرولز', kn: 'ತ್ವರಿತ ನಿಯಂತ್ರಣಗಳು',
    or: 'କ୍ଷିପ୍ର ନିୟନ୍ତ୍ରଣ', pa: 'ਤੁਰੰਤ ਕੰਟਰੋਲ', ml: 'ദ്രുത നിയന്ത്രണങ്ങൾ'
  },
  'Sound Effects': {
    hi: 'ध्वनि प्रभाव', bn: 'শব্দ প্রভাব', mr: 'आवाज प्रभाव', te: 'శబ్ద ప్రభావాలు',
    ta: 'ஒலி விளைவுகள்', gu: 'અવાજ અસરો', ur: 'صوتی اثرات', kn: 'ಧ್ವನಿ ಪರಿಣಾಮಗಳು',
    or: 'ଶବ୍ଦ ପ୍ରଭାବ', pa: 'ਆਵਾਜ਼ ਪ੍ਰਭਾਵ', ml: 'ശബ്ദ ഇഫക്റ്റുകൾ'
  },
  '1-Click Demo Tour': {
    hi: '1-क्लिक लाइव डेमो', bn: '১-ক্লিক লাইভ ডেমো', mr: '१-क्लिक लाइव्ह डेमो', te: '1-క్లిక్ లైవ్ డెమో',
    ta: '1-கிளிக் நேரலை டெமோ', gu: '૧-ક્લિક લાઈવ ડેમો', ur: 'ایک کلک پر ڈیمو', kn: '1-ಕ್ಲಿಕ್ ಲೈವ್ ಡೆಮೊ',
    or: '୧-କ୍ଲିକ୍ ଲାଇଭ୍ ଡେମୋ', pa: '1-ਕਲਿੱਕ ਲਾਈਵ ਡੈਮੋ', ml: '1-ക്ലിക്ക് ലൈവ് ഡെമോ'
  },
  'OpenStreetMap Live': {
    hi: 'ओपनस्ट्रीटमैप लाइव', bn: 'ওপেনস্ট্রিটম্যাপ লাইভ', mr: 'ओपनस्ट्रीटमॅप थेट', te: 'ఓపెన్‌స్ట్రీట్‌మ్యాప్ లైవ్',
    ta: 'நேரலை ஓபன்ஸ்ட்ரீட்மேப்', gu: 'ઓપનસ્ટ્રીટમેપ લાઇવ', ur: 'اوپن اسٹریٹ میپ لائیو', kn: 'ಓಪನ್‌ಸ್ಟ್ರೀಟ್‌ಮ್ಯಾಪ್ ಲೈವ್',
    or: 'ଓପନଷ୍ଟ୍ରିଟମ୍ୟାପ ଲାଇଭ୍', pa: 'ਓਪਨਸਟ੍ਰੀਟਮੈਪ ਲਾਈਵ', ml: 'ഓപ്പൺസ്ട്രീറ്റ്മാപ്പ് ലൈവ്'
  },

  // Map and OSM API Translations
  'All': {
    hi: 'सभी', bn: 'সব', mr: 'सर्व', te: 'అన్నీ',
    ta: 'அனைத்தும்', gu: 'બધા', ur: 'تمام', kn: 'ಎಲ್ಲಾ',
    or: 'ସମସ୍ତ', pa: 'ਸਾਰੇ', ml: 'എല്ലാം'
  },
  'Street (OSM)': {
    hi: 'सड़क (ओपनस्ट्रीटमैप)', bn: 'রাস্তা (ওএসএম)', mr: 'रस्ता (ओपनस्ट्रीटमॅप)', te: 'వీధి (ఓపెన్‌స్ట్రీట్‌మ్యాప్)',
    ta: 'தெரு (ஓஎஸ்எம்)', gu: 'શેરી (ઓપનસ્ટ્રીટમેપ)', ur: 'گلی (او ایس ایم)', kn: 'ರಸ್ತೆ (ಓಎಸ್‌ಎಂ)',
    or: 'ରାସ୍ତା (ଓଏସଏମ)', pa: 'ਸੜਕ (ਓਐਸਐਮ)', ml: 'തെരുവ് (OSM)'
  },
  'Colorful': {
    hi: 'रंगीन', bn: 'রঙিন', mr: 'रंगीत', te: 'రంగుల',
    ta: 'வண்ணமயமான', gu: 'રંગબેરંગી', ur: 'رنگین', kn: 'ವರ್ಣರಂಜಿತ',
    or: 'ରଙ୍ଗୀନ', pa: 'ਰੰਗੀਨ', ml: 'വർണ്ണാഭമായത്'
  },
  'Satellite': {
    hi: 'सैटेलाइट', bn: 'স্যাটেলাইট', mr: 'उपग्रह', te: 'ఉపగ్రహం',
    ta: 'செயற்கைக்கோள்', gu: 'સેટેલાઇટ', ur: 'سیٹلائٹ', kn: 'ಉಪಗ್ರಹ',
    or: 'ଉପଗ୍ରହ', pa: 'ਸੈਟੇਲਾਈਟ', ml: 'ഉപഗ്രഹം'
  },
  'Search address or city with OpenStreetMap...': {
    hi: 'ओपनस्ट्रीटमैप से पता या शहर खोजें...', bn: 'ওপেনস্ট্রিটম্যাপে ঠিকানা বা শহর খুঁজুন...', mr: 'ओपनस्ट्रीटमॅपवरून पत्ता किंवा शहर शोधा...', te: 'ఓపెన్‌స్ట్రీట్‌మ్యాప్‌తో చిరునామా లేదా నగరాన్ని శోధించండి...',
    ta: 'ஓபன்ஸ்ட்ரீட்மேப் மூலம் முகவரி அல்லது நகரத்தைத் தேடுங்கள்...', gu: 'ઓપનસ્ટ્રીટમેપથી સરનામું અથવા શહેર શોધો...', ur: 'اوپن اسٹریٹ میپ سے پتہ یا شہر تلاش کریں...', kn: 'ಓಪನ್‌ಸ್ಟ್ರೀಟ್‌ಮ್ಯಾಪ್‌ನೊಂದಿಗೆ ವಿಳಾಸ ಅಥವಾ ನಗರವನ್ನು ಹುಡುಕಿ...',
    or: 'ଓପନଷ୍ଟ୍ରିଟମ୍ୟାପ ସହିତ ଠିକଣା ବା ସହର ଖୋଜନ୍ତୁ...', pa: 'ਓਪਨਸਟ੍ਰੀਟਮੈਪ ਨਾਲ ਪਤਾ ਜਾਂ ਸ਼ਹਿਰ ਲੱਭੋ...', ml: 'ഓപ്പൺസ്ട്രീറ്റ്മാപ്പ് വഴി വിലാസം അല്ലെങ്കിൽ നഗരം തിരയുക...'
  },
  'OpenStreetMap Verified': {
    hi: 'ओपनस्ट्रीटमैप सत्यापित', bn: 'ওপেনস্ট্রিটম্যাপ যাচাইকৃত', mr: 'ओपनस्ट्रीटमॅप पडताळलेले', te: 'ఓపెన్‌స్ట్రీట్‌మ్యాప్ ధృవీకరించబడింది',
    ta: 'ஓபன்ஸ்ட்ரீட்மேப் சரிபார்க்கப்பட்டது', gu: 'ઓપનસ્ટ્રીટમેપ ચકાસાયેલ', ur: 'اوپن اسٹریٹ میپ مصدقہ', kn: 'ಓಪನ್‌ಸ್ಟ್ರೀಟ್‌ಮ್ಯಾಪ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    or: 'ଓପନଷ୍ଟ୍ରିଟମ୍ୟାପ ଯାଞ୍ଚ ହୋଇଛି', pa: 'ਓਪਨਸਟ੍ਰੀਟਮੈਪ ਪੁਸ਼ਟੀ ਕੀਤੀ ਗਈ', ml: 'ഓപ്പൺസ്ട്രീറ്റ്മാപ്പ് സ്ഥിരീകരിച്ചു'
  },
  'Searching OSM...': {
    hi: 'ओपनस्ट्रीटमैप पर खोज रहे हैं...', bn: 'ওএসএমে খোঁজা হচ্ছে...', mr: 'ओपनस्ट्रीटमॅपवर शोधत आहे...', te: 'ఓపెన్‌స్ట్రీట్‌మ్యాప్‌లో శోధిస్తోంది...',
    ta: 'ஓஎஸ்எம்மில் தேடுகிறது...', gu: 'ઓપનસ્ટ્રીટમેપમાં શોધી રહ્યું છે...', ur: 'او ایس ایم تلاش جاری...', kn: 'ಓಎಸ್‌ಎಂನಲ್ಲಿ ಹುಡುಕುತ್ತಿದೆ...',
    or: 'ଓଏସଏମରେ ଖୋଜା ଚାଲିଛି...', pa: 'ਓਐਸਐਮ ਤੇ ਖੋਜ ਰਿਹਾ ਹੈ...', ml: 'OSM-ൽ തിരയുന്നു...'
  },
  'Quick Cities': {
    hi: 'प्रमुख शहर', bn: 'দ্রুত শহর', mr: 'प्रमुख शहरे', te: 'ప్రధాన నగరాలు',
    ta: 'விரைவு நகரங்கள்', gu: 'ઝડપી શહેરો', ur: 'اہم شہر', kn: 'ವೇಗದ ನಗರಗಳು',
    or: 'ପ୍ରମୁଖ ସହର', pa: 'ਮੁੱਖ ਸ਼ਹਿਰ', ml: 'പ്രധാന നഗരങ്ങൾ'
  },
  'Real-World GPS': {
    hi: 'वास्तविक दुनिया जीपीएस', bn: 'বাস্তব জিপিএস', mr: 'वास्तविक जगातील जीपीएस', te: 'రియల్ వరల్డ్ జీపీఎస్',
    ta: 'நேரடி ஜிபிஎஸ்', gu: 'વાસ્તવિક જીપીએસ', ur: 'حقیقی دنیا کا جی پی ایس', kn: 'ನೈಜ ಪ್ರಪಂಚದ ಜಿಪಿಎಸ್',
    or: 'ପ୍ରକୃତ ଦୁନିଆ ଜିପିଏସ୍', pa: 'ਅਸਲ ਸੰਸਾਰ ਜੀਪੀਐਸ', ml: 'തത്സമയ ജിപിഎസ്'
  },

  // Hero & Sections
  'Live Global Redistribution': {
    hi: 'लाइव वैश्विक पुनर्वितरण', bn: 'লাইভ বিশ্বব্যাপী পুনর্বিতরণ', mr: 'थेट जागतিক अन्न वितरण', te: 'లైవ్ గ్లోబల్ పునఃపంపిణీ',
    ta: 'நேரலை உலகளாவிய மறுபகிர்வு', gu: 'લાઇવ વૈશ્વિક પુનઃવિતરણ', ur: 'براہ راست عالمی دوبارہ تقسیم', kn: 'ಲೈವ್ ಜಾಗತಿಕ ಮರುಹಂಚಿಕೆ',
    or: 'ଲାଇଭ୍ ବିଶ୍ୱବ୍ୟାପୀ ପୁନର୍ବଣ୍ଟନ', pa: 'ਲਾਈਵ ਗਲੋਬਲ ਮੁੜ ਵੰਡ', ml: 'തത്സമയ ആഗോള പുനർവിതരണം'
  },
  'Zero Food Waste Mission': {
    hi: 'शून्य भोजन बर्बादी मिशन', bn: 'শূন্য খাদ্য অপচয় মিশন', mr: 'शून्य अन्न नासाडी मोहीम', te: 'జీరో ఫుడ్ వేస్ట్ మిషన్',
    ta: 'பூஜ்ஜிய உணவு விரய இயக்கம்', gu: 'શૂન્ય અન્ન બગાડ મિશન', ur: 'زیرو فوڈ ویسٹ مشن', kn: 'ಶೂನ್ಯ ಆಹಾರ ಪೋಲು ಮಿಷನ್',
    or: 'ଶୂନ ଖାଦ୍ୟ ନଷ୍ଟ ଅଭିଯାନ', pa: 'ਜ਼ੀਰੋ ਭੋਜਨ ਬਰਬਾਦੀ ਮਿਸ਼ਨ', ml: 'ഭക്ഷ്യ പാഴാക്കൽ വിരുദ്ധ മിഷൻ'
  },
  'Available right now from local kitchens, bakeries & supermarkets': {
    hi: 'स्थानीय रसोइयों, बेकरी और सुपरमार्केट से अभी उपलब्ध', bn: 'স্থানীয় রান্নাঘর ও বেকারি থেকে এখনই উপলব্ধ', mr: 'स्थानिक स्वयंपाकघर व बेकरीतून आत्ताच उपलब्ध', te: 'స్థానిక వంటశాలలు మరియు బేకరీల నుండి ప్రస్తుతం అందుబాటులో ఉంది',
    ta: 'உள்ளூர் உணவகங்கள் மற்றும் பேக்கரிகளிலிருந்து இப்போது கிடைக்கிறது', gu: 'સ્થાનિક રસોડા અને બેકરીઓમાંથી અત્યારે ઉપલબ્ધ', ur: 'مقامی کچن اور بیکریوں سے ابھی دستیاب', kn: 'ಸ್ಥಳೀಯ ಅಡುಗೆಮನೆಗಳು ಮತ್ತು ಬೇಕರಿಗಳಿಂದ ಈಗ ಲಭ್ಯವಿದೆ',
    or: 'ସ୍ଥାନୀୟ ରୋଷେଇଶାଳା ଏବଂ ବେକେରୀରୁ ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ', pa: 'ਸਥਾਨਕ ਰਸੋਈਆਂ ਅਤੇ ਬੇਕਰੀਆਂ ਤੋਂ ਹੁਣੇ ਉਪਲਬਧ', ml: 'പ്രാദേശിക അടുക്കളകളിൽ നിന്നും ബേക്കറികളിൽ നിന്നും ഇപ്പോൾ ലഭ്യമാണ്'
  },
  'View All on Map': {
    hi: 'मानचित्र पर सभी देखें', bn: 'ম্যাপে সব দেখুন', mr: 'नकाशावर सर्व पहा', te: 'మ్యాప్‌లో అన్నీ చూడండి',
    ta: 'வரைபடத்தில் அனைத்தையும் காண்க', gu: 'નકશા પર બધું જુઓ', ur: 'نقشے پر سب دیکھیں', kn: 'ನಕ್ಷೆಯಲ್ಲಿ ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
    or: 'ମାନଚିତ୍ରରେ ସବୁ ଦେଖନ୍ତୁ', pa: 'ਨਕਸ਼ੇ ਤੇ ਸਾਰੇ ਦੇਖੋ', ml: 'മാപ്പിൽ എല്ലാം കാണുക'
  },
  'Making surplus food rescue as simple, joyful, and safe as ordering takeout.': {
    hi: 'अतिरिक्त भोजन बचाना उतना ही आसान, आनंददायक और सुरक्षित बनाएं जितना खाना ऑर्डर करना।', bn: 'উদ্বৃত্ত খাবার উদ্ধারকে টেকআউট অর্ডারের মতোই সহজ ও নিরাপদ করা।', mr: 'अन्न वाचवणे ऑर्डर करण्याइतकेच सोपे, आनंददायी व सुरक्षित बनवणे.', te: 'మిగులు ఆహారాన్ని రక్షించడాన్ని ఫుడ్ ఆర్డర్ చేసినంత సులభం మరియు సురక్షితం చేయడం.',
    ta: 'உணவு ஆர்டர் செய்வது போல உணவு மீட்பையும் எளிமையாகவும் பாதுகாப்பாகவும் மாற்றுவது.', gu: 'વધેલું ભોજન બચાવવું ફૂડ ઓર્ડર કરવા જેટલું જ સરળ અને સુરક્ષિત બનાવવું.', ur: 'بچے ہوئے کھانے کو بچانا اتنا ہی آسان اور محفوظ بنانا جتنا کھانا آرڈر کرنا۔', kn: 'ಆಹಾರ ಆರ್ಡರ್ ಮಾಡುವಷ್ಟೇ ಸುಲಭ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿ ಆಹಾರ ರಕ್ಷಣೆಯನ್ನು ಮಾಡುವುದು.',
    or: 'ଖାଦ୍ୟ ମଗାଇବା ପରି ଅତିରିକ୍ତ ଖାଦ୍ୟ ବଞ୍ଚାଇବାକୁ ସହଜ ଏବଂ ସୁରକ୍ଷିତ କରିବା।', pa: 'ਵਾਧੂ ਭੋਜਨ ਬਚਾਉਣਾ ਭੋਜਨ ਆਰਡਰ ਕਰਨ ਜਿੰਨਾ ਹੀ ਆਸਾਨ ਅਤੇ ਸੁਰੱਖਿਅਤ ਬਣਾਉਣਾ।', ml: 'ഭക്ഷണം ഓർഡർ ചെയ്യുന്നതുപോലെ മിച്ചഭക്ഷണം രക്ഷിക്കുന്നതും ലളിതവും സുരക്ഷിതവുമാക്കുന്നു.'
  },
  'Food Safety & Trust Are Our Top Priority': {
    hi: 'खाद्य सुरक्षा और विश्वास हमारी सर्वोच्च प्राथमिकता है', bn: 'খাদ্য নিরাপত্তা ও বিশ্বাস আমাদের সর্বোচ্চ অগ্রাধিকার', mr: 'अन्न सुरक्षा आणि विश्वास आमचे सर्वोच्च प्राधान्य आहे', te: 'ఆహార భద్రత మరియు నమ్మకం మా అత్యున్నత ప్రాధాన్యత',
    ta: 'உணவுப் பாதுகாப்பும் நம்பிக்கையும் எங்கள் முதன்மை முன்னுரிமை', gu: 'ખાદ્ય સુરક્ષા અને વિશ્વાસ અમારી સર્વોચ્ચ પ્રાથમિકતા છે', ur: 'کھانے کی حفاظت اور اعتماد ہماری اولین ترجیح ہے', kn: 'ಆಹಾರ ಸುರಕ್ಷತೆ ಮತ್ತು ನಂಬಿಕೆ ನಮ್ಮ ಅತ್ಯುನ್ನತ ಆದ್ಯತೆಯಾಗಿದೆ',
    or: 'ଖାଦ୍ୟ ସୁରକ୍ଷା ଏବଂ ବିଶ୍ୱାସ ଆମର ସର୍ବୋଚ୍ଚ ପ୍ରାଥମିକତା', pa: 'ਭੋਜਨ ਸੁਰੱਖਿਆ ਅਤੇ ਭਰੋਸਾ ਸਾਡੀ ਸਭ ਤੋਂ ਵੱਡੀ ਤਰਜੀਹ ਹੈ', ml: 'ഭക്ഷ്യസുരക്ഷയും വിശ്വാസ്യതയും ഞങ്ങളുടെ പ്രഥമ പരിഗണനയാണ്'
  },
  'Inspect Trust & Safety Hub': {
    hi: 'ट्रस्ट और सुरक्षा हब देखें', bn: 'ট্রাস্ট ও নিরাপত্তা হাব দেখুন', mr: 'विश्वास आणि सुरक्षा केंद्र तपासा', te: 'ట్రస్ట్ & సేఫ్టీ హబ్‌ను పరిశీలించండి',
    ta: 'நம்பிக்கை மற்றும் பாதுகாப்பு மையத்தைப் பார்வையிடுங்கள்', gu: 'ટ્રસ્ટ અને સુરક્ષા હબ જુઓ', ur: 'ٹرسٹ اور سیفٹی حب ملاحظہ کریں', kn: 'ನಂಬಿಕೆ ಮತ್ತು ಸುರಕ್ಷತಾ ಹಬ್ ಪರಿಶೀಲಿಸಿ',
    or: 'ବିଶ୍ୱାସ ଏବଂ ସୁରକ୍ଷା ହବ୍ ଦେଖନ୍ତୁ', pa: 'ਟਰੱਸਟ ਅਤੇ ਸੁਰੱਖਿਆ ਹੱਬ ਦੇਖੋ', ml: 'വിശ്വാസ്യതയും സുരക്ഷാ കേന്ദ്രവും പരിശോധിക്കുക'
  },
  'Ask Loopie AI Assistant': {
    hi: 'लूपी एआई सहायक से पूछें', bn: 'লুপী এআই সহকারীকে জিজ্ঞাসা করুন', mr: 'लूपी एआय सहाय्यकाला विचारा', te: 'లూపీ ఏఐ అసిస్టెంట్‌ని అడగండి',
    ta: 'லூபி ஏஐ உதவியாளரிடம் கேளுங்கள்', gu: 'લૂપી એઆઈ સહાયકને પૂછો', ur: 'لوپی اے آئی اسسٹنٹ سے پوچھیں', kn: 'ಲೂಪಿ ಎಐ ಸಹಾಯಕನನ್ನು ಕೇಳಿ',
    or: 'ଲୁପି ଏଆଇ ସହାୟକଙ୍କୁ ପଚାରନ୍ତୁ', pa: 'ਲੂਪੀ ਏਆਈ ਸਹਾਇਕ ਨੂੰ ਪੁੱਛੋ', ml: 'ലൂപ്പി AI അസിസ്റ്റന്റിനോട് ചോദിക്കുക'
  },
  'Verified Community Safety': {
    hi: 'सत्यापित समुदाय सुरक्षा', bn: 'যাচাইকৃত কমিউনিটি নিরাপত্তা', mr: 'पडताळलेली समुदाय सुरक्षा', te: 'ధృవీకరించబడిన కమ్యూనిటీ భద్రత',
    ta: 'சரிபார்க்கப்பட்ட சமூக பாதுகாப்பு', gu: 'ચકાસાયેલ સમુદાય સુરક્ષા', ur: 'مصدقہ کمیونٹی تحفظ', kn: 'ಪರಿಶೀಲಿಸಿದ ಸಮುದಾಯ ಸುರಕ್ಷತೆ',
    or: 'ଯାଞ୍ଚ ହୋଇଥିବା ସମୁଦାୟ ସୁରକ୍ଷା', pa: 'ਪੁਸ਼ਟੀ ਕੀਤੀ ਕਮਿਊਨਿਟੀ ਸੁਰੱਖਿਆ', ml: 'സ്ഥിരീകരിച്ച കമ്മ്യൂണിറ്റി സുരക്ഷ'
  },

  // Donation form
  'Create Surplus Food Donation': {
    hi: 'अतिरिक्त भोजन दान बनाएं', bn: 'উদ্বৃত্ত খাবার অনুদান তৈরি করুন', mr: 'अतिरिक्त अन्न दान तयार करा', te: 'మిగులు ఆహార విరాళాన్ని సృష్టించండి',
    ta: 'உணவு நன்கொடையை உருவாக்கவும்', gu: 'વધેલું ભોજન દાન નોંધાવો', ur: 'کھانے کا عطیہ درج کریں', kn: 'ಆಹಾರ ದಾನವನ್ನು ರಚಿಸಿ',
    or: 'ଅତିରିକ୍ତ ଖାଦ୍ୟ ଦାନ ପ୍ରସ୍ତୁତ କରନ୍ତୁ', pa: 'ਵਾਧੂ ਭੋਜਨ ਦਾਨ ਬਣਾਓ', ml: 'ഭക്ഷണ ദാനം രജിസ്റ്റർ ചെയ്യുക'
  },
  'Food Item & Category': {
    hi: 'खाद्य सामग्री और श्रेणी', bn: 'খাবার এবং বিভাগ', mr: 'अन्न पदार्थ आणि प्रकार', te: 'ఆహార పదార్థం & వర్గం',
    ta: 'உணவுப் பொருள் மற்றும் வகை', gu: 'ભોજનની વસ્તુ અને શ્રેણી', ur: 'کھانے کی چیز اور زمرہ', kn: 'ಆಹಾರ ಪದಾರ್ಥ ಮತ್ತು ವರ್ಗ',
    or: 'ଖାଦ୍ୟ ପଦାର୍ଥ ଏବଂ ବର୍ଗ', pa: 'ਭੋਜਨ ਵਸਤੂ ਅਤੇ ਸ਼੍ਰੇਣੀ', ml: 'ഭക്ഷണ സാധനവും വിഭാഗവും'
  },
  'Storage, Safety & Pickup Window': {
    hi: 'भंडारण, सुरक्षा और पिकअप समय', bn: 'সংরক্ষণ, নিরাপত্তা ও পিকআপের সময়', mr: 'साठवणूक, सुरक्षा आणि पिकअप वेळ', te: 'నిల్వ, భద్రత మరియు పికప్ విండో',
    ta: 'சேமிப்பு, பாதுகாப்பு மற்றும் பிக்கப் நேரம்', gu: 'સંગ્રહ, સુરક્ષા અને પિકઅપ સમય', ur: 'اسٹوریج، حفاظت اور پک اپ کا وقت', kn: 'ಸಂಗ್ರಹಣೆ, ಸುರಕ್ಷತೆ ಮತ್ತು ಪಿಕಪ್ ಸಮಯ',
    or: 'ସଂରକ୍ଷଣ, ସୁରକ୍ଷା ଏବଂ ପିକଅପ୍ ସମୟ', pa: 'ਸਟੋਰੇਜ, ਸੁਰੱਖਿਆ ਅਤੇ ਪਿਕਅੱਪ ਸਮਾਂ', ml: 'സംഭരണം, സുരക്ഷ, പിക്കപ്പ് സമയം'
  },
  'AI Safety Pre-Check': {
    hi: 'एआई सुरक्षा पूर्व-जांच', bn: 'এআই নিরাপত্তা প্রাক-পরীক্ষা', mr: 'एआय सुरक्षा पूर्व-तपासणी', te: 'ఏఐ భద్రతా ముందస్తు తనిఖీ',
    ta: 'ஏஐ பாதுகாப்பு முன் பரிசோதனை', gu: 'એઆઈ સુરક્ષા પૂર્વ-તપાસણી', ur: 'اے آئی حفاظتی قبل از وقت جانچ', kn: 'ಎಐ ಸುರಕ್ಷತಾ ಪೂರ್ವ-ಪರಿಶೀಲನೆ',
    or: 'ଏଆଇ ସୁରକ୍ଷା ପ୍ରାକ୍-ଯାଞ୍ଚ', pa: 'ਏਆਈ ਸੁਰੱਖਿਆ ਪੂਰਵ-ਜਾਂਚ', ml: 'AI സുരക്ഷാ മുൻകൂർ പരിശോധന'
  },
  'Broadcast Surplus Food': {
    hi: 'अतिरिक्त भोजन प्रसारित करें', bn: 'উদ্বৃত্ত খাবার প্রচার করুন', mr: 'अतिरिक्त अन्न प्रसारित करा', te: 'మిగులు ఆహారాన్ని ప్రసారం చేయండి',
    ta: 'உணவு விவரங்களை பகிரவும்', gu: 'ભોજન બ્રોડકાસ્ટ કરો', ur: 'کھانے کی تفصیلات نشر کریں', kn: 'ಆಹಾರವನ್ನು ಪ್ರಸಾರ ಮಾಡಿ',
    or: 'ଅତିରିକ୍ତ ଖାଦ୍ୟ ପ୍ରସାରଣ କରନ୍ତୁ', pa: 'ਵਾਧੂ ਭੋਜਨ ਦਾ ਐਲਾਨ ਕਰੋ', ml: 'ഭക്ഷണവിവരം പങ്കുവെക്കുക'
  },
  'Pin My Current GPS Location': {
    hi: 'मेरी वर्तमान जीपीएस लोकेशन पिन करें', bn: 'আমার বর্তমান জিপিএস পিন করুন', mr: 'माझे सध्याचे जीपीएस स्थान पिन करा', te: 'నా ప్రస్తుత జీపీఎస్ లొకేషన్‌ను పిన్ చేయండి',
    ta: 'எனது தற்போதைய ஜிபிஎஸ் இருப்பிடத்தை பின் செய்யவும்', gu: 'મારું વર્તમાન જીપીએસ સ્થાન પિન કરો', ur: 'میرا موجودہ جی پی ایس مقام پن کریں', kn: 'ನನ್ನ ಪ್ರಸ್ತುತ ಜಿಪಿಎಸ್ ಸ್ಥಳವನ್ನು ಪಿನ್ ಮಾಡಿ',
    or: 'ମୋର ବର୍ତ୍ତମାନର ଜିପିଏସ୍ ସ୍ଥାନ ପିନ୍ କରନ୍ତୁ', pa: 'ਮੇਰੀ ਮੌਜੂਦਾ ਜੀਪੀਐਸ ਲੋਕੇਸ਼ਨ ਪਿੰਨ ਕਰੋ', ml: 'എന്റെ തത്സമയ ജിപിഎസ് ലൊക്കേഷൻ പിൻ ചെയ്യുക'
  },
  'Surplus Donation Live!': {
    hi: 'अतिरिक्त भोजन दान लाइव!', bn: 'উদ্বৃত্ত খাবার দান লাইভ!', mr: 'अतिरिक्त अन्न दान थेट झाले!', te: 'మిగులు ఆహార విరాళం లైవ్!',
    ta: 'உணவு நன்கொடை நேரலையில் உள்ளது!', gu: 'વધેલું ભોજન દાન લાઇવ થયું!', ur: 'کھانے کا عطیہ لائیو ہو گیا!', kn: 'ಆಹಾರ ದಾನ ಲೈವ್ ಆಗಿದೆ!',
    or: 'ଅତିରିକ୍ତ ଖାଦ୍ୟ ଦାନ ଲାଇଭ୍ ହୋଇଛି!', pa: 'ਵਾਧੂ ਭੋਜਨ ਦਾਨ ਲਾਈਵ ਹੋ ਗਿਆ!', ml: 'ഭക്ഷണ ദാനം തത്സമയമായി!'
  },
  'View Smart AI Matches': {
    hi: 'स्मार्ट एआई मैच देखें', bn: 'স্মার্ট এআই ম্যাচ দেখুন', mr: 'स्मार्ट एआय जुळवणी पहा', te: 'స్మార్ట్ ఏఐ మ్యాచ్‌లను చూడండి',
    ta: 'ஸ்மார்ட் ஏஐ பொருத்தங்களைப் பார்க்கவும்', gu: 'સ્માર્ટ એઆઈ મેળવણી જુઓ', ur: 'سمارٹ اے آئی میچز دیکھیں', kn: 'ಸ್ಮಾರ್ಟ್ ಎಐ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ನೋಡಿ',
    or: 'ସ୍ମାର୍ଟ ଏଆଇ ମେଳକ ଦେଖନ୍ତୁ', pa: 'ਸਮਾਰਟ ਏਆਈ ਮੈਚ ਦੇਖੋ', ml: 'സ്മാർട്ട് AI പൊരുത്തങ്ങൾ കാണുക'
  },
  'See on Live Map': {
    hi: 'लाइव मानचित्र पर देखें', bn: 'লাইভ ম্যাপে দেখুন', mr: 'थेट नकाशावर पहा', te: 'లైవ్ మ్యాప్‌లో చూడండి',
    ta: 'நேரலை வரைபடத்தில் காண்க', gu: 'લાઇવ નકશા પર જુઓ', ur: 'لائیو نقشے پر دیکھیں', kn: 'ಲೈವ್ ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ',
    or: 'ଲାଇଭ୍ ମାନଚିତ୍ରରେ ଦେଖନ୍ତୁ', pa: 'ਲਾਈਵ ਨਕਸ਼ੇ ਤੇ ਦੇਖੋ', ml: 'തത്സമയ മാപ്പിൽ കാണുക'
  },
  'Offered by': {
    hi: 'दाता संगठन:', bn: 'প্রদানকারী:', mr: 'दाते:', te: 'సమర్పించినవారు:',
    ta: 'வழங்குபவர்:', gu: 'આપનાર:', ur: 'پیشکش برائے:', kn: 'ನೀಡಿದವರು:',
    or: 'ପ୍ରଦାନକାରୀ:', pa: 'ਦੇਣ ਵਾਲਾ:', ml: 'നൽകിയത്:'
  },
  'Quantity': {
    hi: 'मात्रा', bn: 'পরিমাণ', mr: 'प्रमाण', te: 'పరిమాణం',
    ta: 'அளவு', gu: 'જથ્થો', ur: 'مقدار', kn: 'ಪ್ರಮಾಣ',
    or: 'ପରିମାଣ', pa: 'ਮਾਤਰਾ', ml: 'അളവ്'
  },
  'Pickup Window': {
    hi: 'पिकअप समय', bn: 'পিকআপ উইন্ডো', mr: 'पिकअप वेळ', te: 'పికప్ సమయం',
    ta: 'பிக்கப் நேரம்', gu: 'પિકઅપ સમય', ur: 'پک اپ کا وقت', kn: 'ಪಿಕಪ್ ಕಿಟಕಿ',
    or: 'ପିକଅପ୍ ସମୟ', pa: 'ਪਿਕਅੱਪ ਸਮਾਂ', ml: 'പിക്കപ്പ് സമയം'
  },
  'Pickup Location': {
    hi: 'पिकअप स्थान', bn: 'পিকআপ স্থান', mr: 'पिकअप पत्ता', te: 'పికప్ స్థానం',
    ta: 'பிக்கப் இடம்', gu: 'પિકઅપ સ્થળ', ur: 'پک اپ کا مقام', kn: 'ಪಿಕಪ್ ಸ್ಥಳ',
    or: 'ପିକଅପ୍ ସ୍ଥାନ', pa: 'ਪਿਕਅੱਪ ਸਥਾਨ', ml: 'പിക്കപ്പ് സ്ഥലം'
  },
  'Available': {
    hi: 'उपलब्ध', bn: 'উপলব্ধ', mr: 'उपलब्ध', te: 'అందుబాటులో ఉంది',
    ta: 'கிடைக்கிறது', gu: 'ઉપલબ્ધ', ur: 'دستیاب', kn: 'ಲಭ್ಯವಿದೆ',
    or: 'ଉପଲବ୍ଧ', pa: 'ਉਪਲਬਧ', ml: 'ലഭ്യമാണ്'
  },
  'Accepted': {
    hi: 'स्वीकृत', bn: 'গৃহীত', mr: 'स्वीकारले', te: 'స్వీకరించబడింది',
    ta: 'ஏற்றுக்கொள்ளப்பட்டது', gu: 'સ્વીકાર્યું', ur: 'قبول شدہ', kn: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    or: 'ଗୃହୀତ', pa: 'ਸਵੀਕਾਰ ਕੀਤਾ', ml: 'സ്വീകരിച്ചു'
  },
  'In Transit': {
    hi: 'रास्ते में', bn: 'ট্রানজিটে', mr: 'मार्गावर', te: 'దారిలో ఉంది',
    ta: 'வழியில் உள்ளது', gu: 'રસ્તામાં', ur: 'راستے میں', kn: 'ದಾರಿಯಲ್ಲಿದೆ',
    or: 'ବାଟରେ ଅଛି', pa: 'ਰਸਤੇ ਵਿੱਚ', ml: 'വഴിയിലാണ്'
  },
  'Collected': {
    hi: 'एकत्रित', bn: 'সংগৃহীত', mr: 'गोळा केले', te: 'సేకరించబడింది',
    ta: 'சேகரிக்கப்பட்டது', gu: 'એકત્રિત', ur: 'وصول شدہ', kn: 'ಸಂಗ್ರಹಿಸಲಾಗಿದೆ',
    or: 'ସଂଗୃହୀତ', pa: 'ਇਕੱਠਾ ਕੀਤਾ ਗਿਆ', ml: 'ശേഖരിച്ചു'
  },
  'Close': {
    hi: 'बंद करें', bn: 'বন্ধ করুন', mr: 'बंद करा', te: 'మూసివేయి',
    ta: 'மூடு', gu: 'બંધ કરો', ur: 'بند کریں', kn: 'ಮುಚ್ಚಿ',
    or: 'ବନ୍ଦ କରନ୍ତୁ', pa: 'ਬੰਦ ਕਰੋ', ml: 'അടയ്ക്കുക'
  },
  'Confirm': {
    hi: 'पुष्टि करें', bn: 'নিশ্চিত করুন', mr: 'निश्चित करा', te: 'ధృవీకరించండి',
    ta: 'உறுதிப்படுத்துங்கள்', gu: 'પુષ્ટિ કરો', ur: 'تصدیق کریں', kn: 'ದೃಢೀಕರಿಸಿ',
    or: 'ନିଶ୍ଚିତ କରନ୍ତୁ', pa: 'ਪੁਸ਼ਟੀ ਕਰੋ', ml: 'സ്ഥിരീകരിക്കുക'
  },
};

export function translateDynamicText(text: string, lang: SupportedLanguage): string {
  if (!text || lang === 'en') return text;
  
  // Direct dictionary hit
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][text]) {
    return TRANSLATIONS[lang][text];
  }
  
  // Common phrase hit
  if (COMMON_PHRASE_DICTIONARY[text] && COMMON_PHRASE_DICTIONARY[text][lang]) {
    return COMMON_PHRASE_DICTIONARY[text][lang]!;
  }

  // Case-insensitive match in phrases
  const lower = text.trim().toLowerCase();
  for (const [phrase, trans] of Object.entries(COMMON_PHRASE_DICTIONARY)) {
    if (phrase.toLowerCase() === lower && trans[lang]) {
      return trans[lang]!;
    }
  }

  return text;
}

