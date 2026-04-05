export interface WidgetLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

export interface MarketIndex {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  time: string;
  category: "World" | "Energy" | "Politics" | "Markets" | "Breaking";
  read?: boolean;
}

export type NewsTab = "News" | "State" | "Wikipedia" | "Files" | "Music";

export interface DailyBriefing {
  date: string;
  summary: string;
  generatedAt: string;
  sources: number;
}
