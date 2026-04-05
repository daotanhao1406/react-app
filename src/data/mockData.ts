import type { MarketIndex, NewsItem, DailyBriefing } from "../types/dashboard";

export const MARKET_INDICES: MarketIndex[] = [
  {
    id: "sp500",
    name: "S&P 500",
    ticker: "SPX",
    price: 6582.69,
    change: 51.23,
    changePercent: 0.83,
  },
  {
    id: "nasdaq",
    name: "Nasdaq",
    ticker: "IXIC",
    price: 21879.18,
    change: 301.45,
    changePercent: 1.54,
  },
  {
    id: "djia",
    name: "Dow Jones",
    ticker: "DJI",
    price: 46584.67,
    change: 163.22,
    changePercent: 0.35,
  },
  {
    id: "rut",
    name: "Russell 2000",
    ticker: "RUT",
    price: 2538.84,
    change: 32.67,
    changePercent: 1.55,
  },
  {
    id: "vix",
    name: "VIX",
    ticker: "VIX",
    price: 23.87,
    change: -0.02,
    changePercent: -0.08,
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    headline:
      "Rescue team in Iran face 'harrowing and dangerous' search for US crew member",
    source: "BBC",
    time: "12m",
    category: "World",
  },
  {
    id: "2",
    headline: "At least four people killed in Russian attacks on Ukraine",
    source: "Jazeera",
    time: "26m",
    category: "World",
  },
  {
    id: "3",
    headline:
      "Senegal bars ministers from foreign travel as oil price rise bites",
    source: "BBC",
    time: "38m",
    category: "Energy",
  },
  {
    id: "4",
    headline: "Trump seeks $152m to reopen notorious Alcatraz prison",
    source: "BBC",
    time: "52m",
    category: "Politics",
  },
  {
    id: "5",
    headline: "LIVE: Manchester City vs Liverpool - FA Cup quarterfinal",
    source: "Jazeera",
    time: "1h",
    category: "World",
  },
  {
    id: "6",
    headline:
      "Fed signals cautious stance on rate cuts amid inflation uncertainty",
    source: "Reuters",
    time: "1h 12m",
    category: "Markets",
  },
  {
    id: "7",
    headline:
      "Oil surges 3% on Middle East tensions and supply disruption fears",
    source: "Bloomberg",
    time: "1h 34m",
    category: "Energy",
  },
  {
    id: "8",
    headline:
      "China GDP growth hits 5.2% target, beating analysts expectations",
    source: "FT",
    time: "2h",
    category: "Markets",
  },
];

export const DAILY_BRIEFING: DailyBriefing = {
  date: "Sat, Apr 4, 2026",
  generatedAt: "06:49 UTC · Apr 4, 2026",
  sources: 148,
  summary: `Active US–Iran hostilities have escalated to a critical threshold: two US warplanes (F-35C and F/A-18 Hornet) were shot down over/near Iran within a single operational period, with at least one crew member rescued and a combat search-and-rescue mission ongoing deep inside Iranian territory. Simultaneously, Iran struck a US Army CH-47 Chinook at Camp Bonhring, Kuwait via drone, marking a direct attack on a US base in a Gulf partner state. Prediction markets place an 63.3% probability on US ground forces entering Iran by April 30, a 17-point single-day surge, signaling that traders assess escalation to full conventional conflict as near-certain in the near term.`,
};

export const DEFAULT_LAYOUT = [
  { i: "daily-briefing", x: 0, y: 0, w: 5, h: 9, minW: 3, minH: 5 },
  { i: "markets", x: 0, y: 9, w: 5, h: 8, minW: 3, minH: 5 },
  { i: "conflict", x: 5, y: 0, w: 6, h: 9, minW: 3, minH: 5 },
  { i: "news", x: 11, y: 0, w: 9, h: 17, minW: 4, minH: 6 },
  { i: "market-map", x: 5, y: 9, w: 6, h: 8, minW: 3, minH: 5 },
];
