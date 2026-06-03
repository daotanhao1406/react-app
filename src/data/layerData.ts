export type LayerCategory =
  | "environment"
  | "military"
  | "security"
  | "humanitarian"
  | "aviation";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  intensity?: "low" | "medium" | "high";
}

export interface MapLayer {
  id: string;
  name: string;
  category: LayerCategory;
  color: string;
  icon: string;
  markers: MapMarker[];
  enabled: boolean;
}

const mkr = (
  id: string,
  lat: number,
  lng: number,
  label?: string,
  intensity: "low" | "medium" | "high" = "medium",
): MapMarker => ({ id, lat, lng, label, intensity });

export const layerCategories: {
  id: LayerCategory;
  label: string;
  color: string;
}[] = [
  { id: "environment", label: "Environment", color: "#f97316" },
  { id: "military", label: "Military & Defense", color: "#ef4444" },
  { id: "security", label: "Security & Intel", color: "#a855f7" },
  { id: "humanitarian", label: "Humanitarian & Crisis", color: "#22d3ee" },
  { id: "aviation", label: "Aviation & Maritime", color: "#3b82f6" },
];

export const defaultLayers: MapLayer[] = [
  // ── ENVIRONMENT ───────────────────────────────────────────────────────────
  {
    id: "earthquakes",
    name: "Earthquakes",
    category: "environment",
    color: "#f97316",
    icon: "⚡",
    enabled: true,
    markers: [
      mkr("eq1", 35.6, 139.7, "Tokyo M6.1", "high"),
      mkr("eq2", -33.9, -70.6, "Santiago M5.8", "high"),
      mkr("eq3", 38.9, 35.5, "Turkey M5.3", "medium"),
      mkr("eq4", 60.1, 152.5, "Alaska M4.9", "medium"),
      mkr("eq5", -8.4, 115.2, "Bali M4.5", "low"),
      mkr("eq6", 37.8, 21.4, "Greece M4.2", "low"),
      mkr("eq7", 19.4, -99.1, "Mexico City M5.0", "medium"),
      mkr("eq8", -36.1, -72.9, "Chile M6.3", "high"),
      mkr("eq9", 34.0, 132.5, "Japan M5.5", "high"),
      mkr("eq10", 40.7, 43.8, "Armenia M4.8", "medium"),
      mkr("eq11", -5.2, 102.3, "Sumatra M5.7", "high"),
      mkr("eq12", 64.2, -17.8, "Iceland M4.1", "low"),
    ],
  },
  {
    id: "weather_radar",
    name: "Weather Radar",
    category: "environment",
    color: "#06b6d4",
    icon: "🌀",
    enabled: true,
    markers: [
      mkr("wr1", 29.8, 91.1, "Storm Cell", "high"),
      mkr("wr2", 52.5, 13.4, "Berlin Storm", "medium"),
      mkr("wr3", -27.5, 153.0, "Brisbane Cell", "medium"),
      mkr("wr4", 18.5, -69.9, "Caribbean Storm", "high"),
      mkr("wr5", 55.8, 37.6, "Moscow System", "low"),
      mkr("wr6", 45.5, -73.6, "Montreal Cell", "medium"),
      mkr("wr7", 31.2, 121.5, "Shanghai Storm", "high"),
      mkr("wr8", -34.6, -58.4, "Buenos Aires", "medium"),
      mkr("wr9", 39.9, 32.9, "Ankara", "low"),
      mkr("wr10", 25.0, 55.3, "Dubai Storm", "medium"),
    ],
  },
  {
    id: "wildfires",
    name: "Wildfires",
    category: "environment",
    color: "#ef4444",
    icon: "🔥",
    enabled: false,
    markers: [
      mkr("wf1", 37.8, -119.5, "Yosemite", "high"),
      mkr("wf2", -33.9, 151.2, "NSW Australia", "high"),
      mkr("wf3", 38.7, 35.5, "Central Turkey", "medium"),
      mkr("wf4", 41.9, 12.5, "Rome Area", "medium"),
      mkr("wf5", 39.9, -8.0, "Portugal", "high"),
      mkr("wf6", 60.0, 30.3, "Siberia", "medium"),
      mkr("wf7", -23.5, -46.6, "Brazil", "high"),
      mkr("wf8", 36.2, -5.9, "Spain", "medium"),
    ],
  },
  {
    id: "hurricanes",
    name: "Hurricanes",
    category: "environment",
    color: "#8b5cf6",
    icon: "🌪️",
    enabled: false,
    markers: [
      mkr("hc1", 25.0, -90.0, "Cat 4 Gulf", "high"),
      mkr("hc2", 18.0, -65.0, "Cat 2 Caribbean", "medium"),
      mkr("hc3", 14.0, 125.0, "Typhoon Philippines", "high"),
      mkr("hc4", -15.0, 45.0, "Cyclone Madagascar", "medium"),
      mkr("hc5", 10.0, 80.0, "Cyclone Bay of Bengal", "high"),
    ],
  },
  {
    id: "floods",
    name: "Floods",
    category: "environment",
    color: "#3b82f6",
    icon: "💧",
    enabled: false,
    markers: [
      mkr("fl1", 23.8, 90.4, "Bangladesh", "high"),
      mkr("fl2", 30.0, 31.2, "Egypt Nile", "medium"),
      mkr("fl3", 15.6, 32.5, "Sudan", "high"),
      mkr("fl4", 0.3, 32.6, "Uganda", "medium"),
      mkr("fl5", 27.7, 85.3, "Nepal", "high"),
      mkr("fl6", 25.1, 102.7, "Yunnan China", "medium"),
    ],
  },
  {
    id: "dust_storms",
    name: "Dust Storms",
    category: "environment",
    color: "#ca8a04",
    icon: "🌫️",
    enabled: false,
    markers: [
      mkr("ds1", 25.0, 45.0, "Saudi Arabia", "high"),
      mkr("ds2", 22.0, 10.0, "Sahara", "high"),
      mkr("ds3", 35.0, 80.0, "Taklimakan", "medium"),
      mkr("ds4", 32.0, 53.0, "Iran", "medium"),
      mkr("ds5", 15.5, 30.0, "Sudan", "high"),
    ],
  },

  // ── MILITARY & DEFENSE ────────────────────────────────────────────────────
  {
    id: "military_air",
    name: "Military Air",
    category: "military",
    color: "#ef4444",
    icon: "✈",
    enabled: true,
    markers: [
      mkr("ma1", 51.5, -0.1, "London RAF", "high"),
      mkr("ma2", 38.9, -77.0, "Pentagon", "high"),
      mkr("ma3", 35.7, 139.7, "Tokyo JSDF", "high"),
      mkr("ma4", 55.8, 37.6, "Moscow", "high"),
      mkr("ma5", 39.9, 116.4, "Beijing", "high"),
      mkr("ma6", 48.9, 2.4, "Paris", "medium"),
      mkr("ma7", 52.5, 13.4, "Berlin", "medium"),
      mkr("ma8", 28.6, 77.2, "Delhi", "medium"),
      mkr("ma9", 31.8, 35.2, "Tel Aviv", "high"),
      mkr("ma10", 33.9, 35.5, "Beirut", "medium"),
      mkr("ma11", 36.2, 37.2, "Aleppo", "high"),
      mkr("ma12", -33.9, 18.4, "Cape Town", "low"),
      mkr("ma13", 37.6, -122.4, "San Francisco", "medium"),
      mkr("ma14", 25.2, 55.3, "Dubai", "medium"),
      mkr("ma15", 59.9, 30.3, "St Petersburg", "medium"),
    ],
  },
  {
    id: "naval_forces",
    name: "Naval Forces",
    category: "military",
    color: "#1d4ed8",
    icon: "⚓",
    enabled: false,
    markers: [
      mkr("nf1", 36.0, 14.0, "Mediterranean Fleet", "high"),
      mkr("nf2", 22.0, 115.0, "South China Sea", "high"),
      mkr("nf3", 12.0, 44.0, "Red Sea", "high"),
      mkr("nf4", 25.0, 60.0, "Arabian Sea", "medium"),
      mkr("nf5", 5.0, 2.0, "Gulf of Guinea", "medium"),
      mkr("nf6", -30.0, 30.0, "Indian Ocean", "low"),
      mkr("nf7", 71.0, 28.0, "Barents Sea", "medium"),
      mkr("nf8", 35.0, 140.0, "Sea of Japan", "high"),
      mkr("nf9", 9.0, -14.0, "West Africa", "low"),
    ],
  },
  {
    id: "carriers",
    name: "Carriers",
    category: "military",
    color: "#7c3aed",
    icon: "🚢",
    enabled: false,
    markers: [
      mkr("cv1", 15.0, 60.0, "USS Ford", "high"),
      mkr("cv2", 8.0, 115.0, "USS Reagan", "high"),
      mkr("cv3", 38.0, 25.0, "HMS Queen Elizabeth", "high"),
      mkr("cv4", 28.0, 58.0, "INS Vikramaditya", "medium"),
      mkr("cv5", 21.0, 38.0, "Red Sea Group", "high"),
    ],
  },
  {
    id: "missile_tests",
    name: "Missile Tests",
    category: "military",
    color: "#dc2626",
    icon: "🚀",
    enabled: false,
    markers: [
      mkr("mt1", 39.0, 125.8, "North Korea ICBM", "high"),
      mkr("mt2", 35.7, 51.4, "Iran Test", "high"),
      mkr("mt3", 26.0, 60.0, "Pakistan Range", "medium"),
      mkr("mt4", 55.0, 73.0, "Russia Range", "medium"),
    ],
  },
  {
    id: "military_hq",
    name: "Military HQ",
    category: "military",
    color: "#f59e0b",
    icon: "🏛",
    enabled: false,
    markers: [
      mkr("mhq1", 38.9, -77.0, "Pentagon USA", "high"),
      mkr("mhq2", 55.8, 37.6, "MOD Russia", "high"),
      mkr("mhq3", 39.9, 116.4, "PLA Beijing", "high"),
      mkr("mhq4", 51.5, -0.1, "MOD London", "high"),
      mkr("mhq5", 48.9, 2.4, "MOD Paris", "medium"),
      mkr("mhq6", 52.5, 13.4, "Bundeswehr", "medium"),
      mkr("mhq7", 35.7, 139.7, "JSDF Tokyo", "medium"),
    ],
  },

  // ── SECURITY & INTEL ──────────────────────────────────────────────────────
  {
    id: "cyber_attacks",
    name: "Cyber Attacks",
    category: "security",
    color: "#a855f7",
    icon: "💻",
    enabled: false,
    markers: [
      mkr("ca1", 39.9, 116.4, "Beijing APT", "high"),
      mkr("ca2", 55.8, 37.6, "Moscow APT28", "high"),
      mkr("ca3", 37.6, -122.4, "SF Target", "medium"),
      mkr("ca4", 51.5, -0.1, "London Target", "medium"),
      mkr("ca5", 48.9, 2.4, "Paris DGSI", "medium"),
      mkr("ca6", 32.1, 34.8, "Tel Aviv Unit 8200", "high"),
      mkr("ca7", 39.0, 125.8, "Pyongyang Lazarus", "high"),
    ],
  },
  {
    id: "protests",
    name: "Protests",
    category: "security",
    color: "#f97316",
    icon: "✊",
    enabled: false,
    markers: [
      mkr("pr1", 30.0, 31.2, "Cairo", "high"),
      mkr("pr2", 35.7, 51.4, "Tehran", "high"),
      mkr("pr3", -33.5, -70.6, "Santiago", "medium"),
      mkr("pr4", 6.4, 2.4, "Lagos", "medium"),
      mkr("pr5", 28.6, 77.2, "Delhi", "medium"),
      mkr("pr6", 40.4, -3.7, "Madrid", "low"),
      mkr("pr7", 50.5, 30.5, "Kyiv", "high"),
    ],
  },
  {
    id: "border_alerts",
    name: "Border Alerts",
    category: "security",
    color: "#eab308",
    icon: "⚠",
    enabled: true,
    markers: [
      mkr("ba1", 38.5, 44.0, "Armenia-Azerbaijan", "high"),
      mkr("ba2", 36.0, 37.0, "Syria-Turkey", "high"),
      mkr("ba3", 37.3, 77.0, "India-China", "high"),
      mkr("ba4", 27.5, 88.5, "India-China Sikkim", "medium"),
      mkr("ba5", 50.0, 30.0, "Ukraine border", "high"),
      mkr("ba6", 38.3, 26.5, "Aegean", "medium"),
      mkr("ba7", 35.0, -5.4, "Morocco-Ceuta", "low"),
      mkr("ba8", 24.0, 37.0, "Yemen-Saudi", "high"),
    ],
  },
  {
    id: "surveillance",
    name: "Surveillance",
    category: "security",
    color: "#6366f1",
    icon: "👁",
    enabled: false,
    markers: [
      mkr("sv1", 51.5, -0.1, "GCHQ London", "high"),
      mkr("sv2", 38.9, -77.0, "NSA USA", "high"),
      mkr("sv3", 1.3, 103.8, "Singapore", "high"),
      mkr("sv4", 59.3, 18.1, "Stockholm", "medium"),
      mkr("sv5", 35.7, 139.7, "Tokyo NPA", "medium"),
    ],
  },

  // ── HUMANITARIAN & CRISIS ─────────────────────────────────────────────────
  {
    id: "refugee_camps",
    name: "Refugee Camps",
    category: "humanitarian",
    color: "#22d3ee",
    icon: "🏕",
    enabled: true,
    markers: [
      mkr("rc1", 4.9, 31.6, "South Sudan", "high"),
      mkr("rc2", -4.3, 29.4, "DRC Burundi", "high"),
      mkr("rc3", 6.2, 42.1, "Ethiopia Somalia", "high"),
      mkr("rc4", 34.0, 36.5, "Lebanon Syria", "high"),
      mkr("rc5", 33.9, 35.5, "Beirut Refugees", "high"),
      mkr("rc6", 37.1, 43.0, "Iraq Kurdistan", "medium"),
      mkr("rc7", 30.5, 47.0, "Iraq South", "medium"),
      mkr("rc8", 23.9, 90.4, "Bangladesh Cox Bazar", "high"),
      mkr("rc9", -0.4, 36.9, "Kenya Kakuma", "high"),
      mkr("rc10", 12.4, 43.1, "Djibouti", "medium"),
    ],
  },
  {
    id: "disease_outbreaks",
    name: "Disease Outbreaks",
    category: "humanitarian",
    color: "#4ade80",
    icon: "🦠",
    enabled: false,
    markers: [
      mkr("do1", 5.6, -0.2, "Ghana Cholera", "high"),
      mkr("do2", -4.3, 15.3, "DRC Ebola", "high"),
      mkr("do3", 9.0, 38.8, "Ethiopia Mpox", "medium"),
      mkr("do4", 10.0, 30.0, "Sudan Malaria", "high"),
      mkr("do5", 17.0, 78.5, "India Dengue", "medium"),
      mkr("do6", 14.7, 17.4, "Senegal Yellow Fever", "low"),
    ],
  },
  {
    id: "food_crisis",
    name: "Food Crisis",
    category: "humanitarian",
    color: "#fbbf24",
    icon: "🌾",
    enabled: false,
    markers: [
      mkr("fc1", 12.8, 30.2, "Sudan IPC5", "high"),
      mkr("fc2", 2.0, 41.0, "Somalia IPC4", "high"),
      mkr("fc3", 15.4, 44.2, "Yemen IPC4", "high"),
      mkr("fc4", 0.3, 32.6, "Uganda IPC3", "medium"),
      mkr("fc5", -13.2, 34.3, "Malawi IPC3", "medium"),
      mkr("fc6", 6.4, 12.4, "Cameroon IPC3", "medium"),
    ],
  },
  {
    id: "aid_distribution",
    name: "Aid Distribution",
    category: "humanitarian",
    color: "#f43f5e",
    icon: "❤",
    enabled: false,
    markers: [
      mkr("ad1", 31.5, 34.5, "Gaza Aid", "high"),
      mkr("ad2", 49.0, 32.0, "Ukraine Kharkiv", "high"),
      mkr("ad3", 15.6, 32.5, "Sudan Khartoum", "high"),
      mkr("ad4", 4.9, 31.6, "South Sudan Juba", "medium"),
      mkr("ad5", 3.9, 21.2, "CAR Bangui", "medium"),
      mkr("ad6", 34.5, 69.2, "Kabul", "high"),
    ],
  },

  // ── AVIATION & MARITIME ───────────────────────────────────────────────────
  {
    id: "flights",
    name: "Flights",
    category: "aviation",
    color: "#3b82f6",
    icon: "✈",
    enabled: true,
    markers: [
      mkr("fl1", 51.5, -0.1, "LHR Heathrow", "high"),
      mkr("fl2", 40.6, -73.8, "JFK New York", "high"),
      mkr("fl3", 35.5, 139.8, "NRT Tokyo", "high"),
      mkr("fl4", 48.4, 11.8, "MUC Munich", "high"),
      mkr("fl5", 25.2, 55.4, "DXB Dubai", "high"),
      mkr("fl6", 22.3, 113.9, "HKG Hong Kong", "high"),
      mkr("fl7", 1.4, 103.9, "SIN Singapore", "high"),
      mkr("fl8", -33.9, 151.2, "SYD Sydney", "medium"),
      mkr("fl9", 45.5, 12.4, "VCE Venice (cruise)", "low"),
      mkr("fl10", 52.4, 13.5, "BER Berlin", "medium"),
      mkr("fl11", 41.9, 12.3, "FCO Rome", "medium"),
      mkr("fl12", -26.1, 28.2, "JNB Johannesburg", "medium"),
      mkr("fl13", 19.4, -99.1, "MEX Mexico City", "medium"),
      mkr("fl14", 37.6, -122.4, "SFO San Francisco", "high"),
      mkr("fl15", 30.0, 31.4, "CAI Cairo", "medium"),
      mkr("fl16", 60.3, 25.0, "HEL Helsinki", "low"),
      mkr("fl17", 55.4, 37.9, "SVO Moscow", "medium"),
    ],
  },
  {
    id: "ships",
    name: "Ships",
    category: "aviation",
    color: "#0891b2",
    icon: "🚢",
    enabled: false,
    markers: [
      mkr("sh1", 29.9, 32.6, "Suez Canal", "high"),
      mkr("sh2", 1.3, 103.8, "Strait Malacca", "high"),
      mkr("sh3", 36.0, 14.0, "Mediterranean", "high"),
      mkr("sh4", 51.5, 1.0, "Dover Strait", "high"),
      mkr("sh5", 12.5, 43.9, "Bab el-Mandeb", "high"),
      mkr("sh6", 22.3, 114.2, "South China Sea", "high"),
      mkr("sh7", -34.4, 26.0, "Cape of Good Hope", "medium"),
      mkr("sh8", 54.5, 18.8, "Baltic Sea", "medium"),
      mkr("sh9", -8.8, -39.2, "South Atlantic", "low"),
    ],
  },
  {
    id: "airports",
    name: "Airports",
    category: "aviation",
    color: "#7c3aed",
    icon: "🛬",
    enabled: false,
    markers: [
      mkr("ap1", 51.5, -0.4, "Heathrow LHR", "high"),
      mkr("ap2", 40.6, -73.8, "JFK New York", "high"),
      mkr("ap3", 33.9, -118.4, "LAX Los Angeles", "high"),
      mkr("ap4", 35.5, 139.8, "Narita NRT", "high"),
      mkr("ap5", 25.2, 55.4, "Dubai DXB", "high"),
      mkr("ap6", 22.3, 113.9, "Hong Kong HKG", "high"),
      mkr("ap7", 48.4, 11.8, "Munich MUC", "medium"),
      mkr("ap8", 52.4, 13.5, "Berlin BER", "medium"),
    ],
  },
];
