// Mock data for Uzhaviyar smart agriculture platform

export const testimonials = [
  {
    id: 1,
    name: "Murugan S.",
    cropType: "Wheat",
    landArea: "5 acres",
    location: "Coimbatore, Tamil Nadu",
    text: "Uzhaviyar helped me reduce fertilizer cost by 30% and improve my wheat yield significantly. The manager visit was very professional.",
    rating: 5
  },
  {
    id: 2,
    name: "Ramesh K.",
    cropType: "Rice",
    landArea: "8 acres",
    location: "Ludhiana, Punjab",
    text: "The disease detection feature saved my rice crop last season. I uploaded a photo and got an immediate treatment plan. Highly recommended!",
    rating: 5
  },
  {
    id: 3,
    name: "Kavitha P.",
    cropType: "Sugarcane",
    landArea: "12 acres",
    location: "Nashik, Maharashtra",
    text: "The fertilizer calculation is very accurate for my sugarcane farm. The farm map shows all sections clearly. Great platform!",
    rating: 4
  }
];

export const faqs = [
  {
    id: "faq-1",
    question: "How is the fertilizer quantity calculated?",
    answer: "It is calculated using data-driven algorithms based on your soil type, crop variety, stage of crop growth, and total acreage, aligned with regional scientific recommendations."
  },
  {
    id: "faq-2",
    question: "Is the disease detection accurate?",
    answer: "Yes, our computer vision models are trained on thousands of plant disease images. They identify visual markers of diseases and pests with high precision (over 95% accuracy)."
  },
  {
    id: "faq-3",
    question: "How long does manager verification take?",
    answer: "Typically, an agricultural expert or area manager will review your farm details and complete the verification process within 24 to 48 hours."
  },
  {
    id: "faq-4",
    question: "Can I update my farm details after registration?",
    answer: "Yes, you can edit your profile, update your crop type, land area, and soil specs directly from your settings dashboard anytime."
  },
  {
    id: "faq-5",
    question: "Is the platform available in regional languages?",
    answer: "Yes, Uzhaviyar supports English, Tamil, and Hindi. You can switch your preferred language in the dashboard settings."
  }
];

export const dashboardStats = {
  healthyCrops: { value: 85, trend: "+5% from last week", type: "success" },
  diseaseDetected: { value: 10, trend: "-2% from last week", type: "danger" },
  sprayedAreas: { value: 5, trend: "Treatment in progress", type: "warning" }
};

export const environmentalConditions = {
  temperature: { current: 24.5, avg: 26.2, unit: "°C" },
  humidity: { current: 68, avg: 69, unit: "%" },
  soilMoisture: { current: 75, avg: 72, unit: "%" }
};

export const smartSprays = [
  {
    id: "spray-1",
    name: "Mancozeb 75 WP",
    quantity: "2.5 kg/acre",
    cost: "₹350/kg",
    bestTime: "Early morning (6-8 AM)",
    recommendedFor: "Leaf blight and rust prevention",
    safetyGear: "Mask, gloves, and protective goggles"
  },
  {
    id: "spray-2",
    name: "Chlorpyrifos 20 EC",
    quantity: "1.5 L/acre",
    cost: "₹420/L",
    bestTime: "Evening (4-6 PM)",
    recommendedFor: "Stem borer and root grub control",
    safetyGear: "Mask, boots, and long sleeves"
  },
  {
    id: "spray-3",
    name: "Carbendazim 50 WP",
    quantity: "1 kg/acre",
    cost: "₹280/kg",
    bestTime: "Morning (7-9 AM)",
    recommendedFor: "Powdery mildew and sheath blight",
    safetyGear: "Full coveralls, gloves, respirator mask"
  }
];

// Historical charts data for Recharts
export const sensorHistory = [
  { time: "06:00 AM", temp: 22.1, humidity: 72, moisture: 78 },
  { time: "08:00 AM", temp: 23.5, humidity: 70, moisture: 77 },
  { time: "10:00 AM", temp: 25.2, humidity: 65, moisture: 76 },
  { time: "12:00 PM", temp: 27.0, humidity: 62, moisture: 74 },
  { time: "02:00 PM", temp: 28.1, humidity: 60, moisture: 73 },
  { time: "04:00 PM", temp: 26.5, humidity: 63, moisture: 75 },
  { time: "06:00 PM", temp: 24.5, humidity: 68, moisture: 75 }
];

export const cropHealthHistory = [
  { week: "Week 1", healthy: 75, diseased: 15, sprayed: 10 },
  { week: "Week 2", healthy: 78, diseased: 14, sprayed: 8 },
  { week: "Week 3", healthy: 80, diseased: 12, sprayed: 8 },
  { week: "Week 4", healthy: 82, diseased: 11, sprayed: 7 },
  { week: "Week 5", healthy: 85, diseased: 10, sprayed: 5 }
];

export const platformStats = [
  { value: "12,500+", label: "Farmers Registered", icon: "Users" },
  { value: "95%", label: "Spraying Accuracy", icon: "Zap" },
  { value: "40%", label: "Yield Improvement", icon: "TrendingUp" },
  { value: "500+", label: "Supported Crops", icon: "Globe" }
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Register Your Farm",
    description: "Create an account, enter your farmer details, crop type, state, district, and land area."
  },
  {
    step: "02",
    title: "Get Fertilizer Plan",
    description: "Receive a data-driven fertilizer plan calculated from your crop and land data."
  },
  {
    step: "03",
    title: "Manager Verification",
    description: "Our agricultural manager visits your farm to verify details and activate your account."
  },
  {
    step: "04",
    title: "Monitor & Manage",
    description: "Access your full dashboard to monitor crop health, detect diseases, and manage your farm."
  }
];

export const indianStates = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana"
];

export const districtsByState = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "Guntur", "Krishna", "Nellore", "Visakhapatnam"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Belagavi", "Mangaluru", "Dharwad"],
  "Kerala": ["Trivandrum", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Tiruchirappalli",
    "Erode",
    "Tirunelveli",
    "Vellore",
    "Thanjavur"
  ],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"]
};

export const assignedManager = {
  name: "Mr. Rajan Kumar",
  contact: "+91 98765 43210"
};

export const mockUser = {
  name: "Farmer",
  email: "swath@gmail.com",
  phone: "+91 98321-48321",
  id: "FRM-2026-979",
  lastLogin: new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) + ", " + new Date().toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase(),
  cropType: "Wheat",
  landArea: "5 acres",
  location: "Coimbatore, Tamil Nadu"
};

export const dashboardData = {
  healthyCrops: {
    percentage: 85,
    trend: "↗ +5% from last week",
    trendColor: "text-primary"
  },
  diseaseDetected: {
    percentage: 10,
    trend: "↘ -2% from last week",
    trendColor: "text-danger"
  },
  sprayedAreas: {
    percentage: 5,
    status: "Treatment in progress",
    statusColor: "text-warning"
  },
  environmentalConditions: {
    temperature: {
      value: 24.5,
      avg: 25.2
    },
    humidity: {
      value: 68,
      avg: 69
    },
    soilMoisture: {
      value: 75,
      avg: 72
    }
  }
};

export const pesticides = [
  {
    id: "pest-1",
    name: "Mancozeb 75 WP",
    quantity: "2.5 kg/acre",
    cost: "₹350/kg",
    bestTime: "Early morning (6–8 AM)",
    targetPests: "Fungal infections, leaf spot, early and late blight",
    method: "Foliar spray",
    precautions: "Wear gloves and protective mask during application. Avoid spraying if rain is expected within 6 hours."
  },
  {
    id: "pest-2",
    name: "Chlorpyrifos 20 EC",
    quantity: "1.5 L/acre",
    cost: "₹420/L",
    bestTime: "Evening (4–6 PM)",
    targetPests: "Aphids, thrips, stem borer, termites, cutworms",
    method: "Foliar spray / Soil treatment",
    precautions: "Wear complete protective suit, rubber boots, and chemical goggles. Do not spray against the wind direction."
  },
  {
    id: "pest-3",
    name: "Carbendazim 50 WP",
    quantity: "1 kg/acre",
    cost: "₹280/kg",
    bestTime: "Morning (7–9 AM)",
    targetPests: "Blast disease, sheath blight, loose smut, powdery mildew",
    method: "Soil drenching / Foliar spray / Seed treatment",
    precautions: "Wash hands and exposed skin thoroughly with soap after use. Keep away from domestic animals and water bodies."
  }
];

export const cropDiseases = [
  {
    id: "dis-1",
    name: "Leaf Blight",
    severity: "Low",
    detected: "June 20, 2026",
    symptoms: "Yellowing edges, brown spots on leaf margins",
    suggestedPesticide: "Mancozeb 75 WP",
    action: "Apply suggested fungicide within 5-7 days and monitor leaf updates weekly. Ensure proper drainage to avoid spreading."
  },
  {
    id: "dis-2",
    name: "Root Rot",
    severity: "Medium",
    detected: "June 15, 2026",
    symptoms: "Wilting, discoloration and softening of roots",
    suggestedPesticide: "Carbendazim 50 WP",
    action: "Apply suggested soil drenching solution immediately. Regulate crop irrigation and avoid soil waterlogging."
  },
  {
    id: "dis-3",
    name: "Powdery Mildew",
    severity: "High",
    detected: "June 10, 2026",
    symptoms: "White powdery coating on leaf surfaces",
    suggestedPesticide: "Sulfex 80 WP",
    action: "Isolate highly infected crop plots if possible. Spray the suggested fungicide immediately under dry weather conditions."
  }
];

export const analysisData = {
  cropHealthTrend: [
    { name: 'W1', value: 80 },
    { name: 'W2', value: 83 },
    { name: 'W3', value: 81 },
    { name: 'W4', value: 86 },
    { name: 'W5', value: 88 },
    { name: 'W6', value: 90 }
  ],
  fertilizerTrend: [
    { name: 'Jan', value: 95 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 105 },
    { name: 'Apr', value: 130 },
    { name: 'May', value: 110 },
    { name: 'Jun', value: 125 }
  ],
  soilMoistureTrend: [
    { name: 'Mon', value: 55 },
    { name: 'Tue', value: 62 },
    { name: 'Wed', value: 59 },
    { name: 'Thu', value: 68 },
    { name: 'Fri', value: 64 },
    { name: 'Sat', value: 72 },
    { name: 'Sun', value: 66 }
  ],
  diseaseHistory: [
    { name: 'Jan', value: 1.2 },
    { name: 'Feb', value: 2.1 },
    { name: 'Mar', value: 0.8 },
    { name: 'Apr', value: 1.5 },
    { name: 'May', value: 0.5 },
    { name: 'Jun', value: 2.3 }
  ],
  yieldEstimation: [
    { name: 'Jan', actual: 65, estimated: 62 },
    { name: 'Feb', actual: 70, estimated: 68 },
    { name: 'Mar', actual: 75, estimated: 74 },
    { name: 'Apr', actual: 82, estimated: 80 },
    { name: 'May', actual: 86, estimated: 85 },
    { name: 'Jun', actual: 93, estimated: 90 }
  ],
  soilNutrients: {
    nitrogen: 72,
    phosphorus: 58,
    potassium: 84
  }
};

export const contactData = {
  manager: {
    name: "Mr. Rajan Kumar",
    role: "Field Crops & Soil Management",
    zone: "South India",
    phone: "+91 98765 43210",
    email: "rajan.kumar@uzhaviyar.com",
    timings: "Mon–Sat, 9:00 AM – 6:00 PM"
  },
  helpline: {
    phone: "+91 1800-XXX-XXXX",
    timings: "Mon-Sat, 8AM-6PM"
  },
  emailSupport: {
    email: "support@uzhaviyar.com",
    timings: "24 hour response"
  },
  office: {
    name: "Uzhaviyar Agri Tech Pvt. Ltd.",
    address: "45, Green Valley Road, RS Puram, Coimbatore – 641002, Tamil Nadu, India"
  }
};

export const notifications = [
  {
    id: "notif-1",
    icon: "FlaskConical",
    title: "Fertilizer Reminder",
    message: "Apply 88 kg NPK 20-10-10 — due July 5, 2026",
    timestamp: "2 hours ago",
    read: false,
    link: "/smart-spray"
  },
  {
    id: "notif-2",
    icon: "AlertTriangle",
    title: "Disease Alert",
    message: "Powdery Mildew detected — High severity",
    timestamp: "5 hours ago",
    read: false,
    link: "/crop-health"
  },
  {
    id: "notif-3",
    icon: "Calendar",
    title: "Manager Visit Scheduled",
    message: "Mr. Rajan Kumar will visit your farm on July 5",
    timestamp: "Yesterday",
    read: true,
    link: "/contact-us"
  },
  {
    id: "notif-4",
    icon: "CloudRain",
    title: "Weather Alert",
    message: "Rain expected this week — adjust spray schedule",
    timestamp: "3 days ago",
    read: false,
    link: "/dashboard"
  },
  {
    id: "notif-5",
    icon: "TrendingUp",
    title: "Weekly Report Ready",
    message: "Your farm performance summary is available",
    timestamp: "5 days ago",
    read: true,
    link: "/analysis"
  }
];



