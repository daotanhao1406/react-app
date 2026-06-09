import L from "leaflet";
import type { LatLng } from "../types/drawing";

export function toLeafletLatLng(p: LatLng): L.LatLng {
  return L.latLng(p.lat, p.lng);
}

export function distanceKm(a: LatLng, b: LatLng): number {
  const la = toLeafletLatLng(a);
  const lb = toLeafletLatLng(b);
  return la.distanceTo(lb) / 1000;
}

export function midpoint(a: LatLng, b: LatLng): LatLng {
  return {
    lat: (a.lat + b.lat) / 2,
    lng: (a.lng + b.lng) / 2,
  };
}

export function formatKm(km: number): string {
  if (km < 1) return `${(km * 1000).toFixed(0)} m`;
  return `${km.toFixed(2)} km`;
}

export function generateId(): string {
  return `drawing-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function defaultStyle() {
  return {
    color: "#4d94ff",
    weight: 2,
    lineStyle: "solid" as const,
    opacity: 1,
  };
}

export function getDashArray(
  lineStyle: string,
  weight: number,
): string | undefined {
  if (lineStyle === "dashed") return `${weight * 4},${weight * 4}`;
  if (lineStyle === "dotted") return `${weight},${weight * 3}`;
  return undefined;
}

export function bearingDeg(a: LatLng, b: LatLng): number {
  const dLng = (b.lng - a.lng) * (Math.PI / 180);
  const lat1 = a.lat * (Math.PI / 180);
  const lat2 = b.lat * (Math.PI / 180);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
