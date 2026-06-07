import { useState, useRef, useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import { createPortal } from "react-dom";
import {
  regions,
  countries,
  cities,
  type Location,
} from "../../data/locations";
import { ChevronRight } from "lucide-react";

interface JumpToPanelProps {
  onClose: () => void;
}

type SectionId = "regions" | "countries" | "cities";

function JumpToPanel({ onClose }: JumpToPanelProps) {
  const map = useMap();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Location | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        const toolbar = document.querySelector(".toolbar");
        if (toolbar && toolbar.contains(e.target as Node)) return;
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  // Prevent map interaction when hovering the panel
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener("mousedown", stop);
    el.addEventListener("dblclick", stop);
    el.addEventListener("wheel", stop);
    return () => {
      el.removeEventListener("mousedown", stop);
      el.removeEventListener("dblclick", stop);
      el.removeEventListener("wheel", stop);
    };
  }, []);

  const handleJump = (loc: Location) => {
    setSelected(loc);
    map.flyTo([loc.lat, loc.lng], loc.zoom, { animate: true, duration: 1.2 });
    setTimeout(onClose, 500);
  };

  const query = search.toLowerCase().trim();

  const filteredRegions = useMemo(
    () => regions.filter((r) => r.name.toLowerCase().includes(query)),
    [query],
  );
  const filteredCountries = useMemo(
    () => countries.filter((c) => c.name.toLowerCase().includes(query)),
    [query],
  );
  const filteredCities = useMemo(
    () => cities.filter((c) => c.name.toLowerCase().includes(query)),
    [query],
  );

  const total =
    filteredRegions.length + filteredCountries.length + filteredCities.length;

  const panel = (
    <div ref={panelRef} className="jump-panel">
      <div className="search-box">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="search-icon"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          autoFocus
          type="search"
          placeholder="Search locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="locations-list">
        {total === 0 && <div className="no-results">No locations found</div>}

        {filteredRegions.length > 0 && (
          <Section
            id="regions"
            label="Strategic Regions"
            items={filteredRegions}
            selected={selected}
            onJump={handleJump}
          />
        )}

        {filteredCountries.length > 0 && (
          <Section
            id="countries"
            label="Countries"
            items={filteredCountries}
            selected={selected}
            onJump={handleJump}
          />
        )}

        {filteredCities.length > 0 && (
          <Section
            id="cities"
            label="Cities"
            items={filteredCities}
            selected={selected}
            onJump={handleJump}
          />
        )}
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}

interface SectionProps {
  id: SectionId;
  label: string;
  items: Location[];
  selected: Location | null;
  onJump: (loc: Location) => void;
}

function Section({ id, label, items, selected, onJump }: SectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="section">
      <button
        className="section-header"
        onClick={() => setCollapsed((c) => !c)}
      >
        <span className="section-label">
          {label.toUpperCase()} ({items.length})
        </span>
        <ChevronRight
          size={10}
          className={`section-chevron ${collapsed ? "" : "section-chevron-open"}`}
        />
      </button>
      {!collapsed && (
        <ul className="section-list">
          {items.map((loc) => (
            <li key={loc.name}>
              <button
                className={`location-item ${selected?.name === loc.name ? "location-item-active" : ""}`}
                onClick={() => onJump(loc)}
              >
                {selected?.name === loc.name && (
                  <span className="location-dot" />
                )}
                <span className="location-name">{loc.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JumpToPanel;
