"use client";

import { useState } from "react";
import type { Community } from "@/lib/types";

// Coordinate plot stand-in for the Mapbox sourcing map. When
// NEXT_PUBLIC_MAPBOX_TOKEN is present this component can be swapped for a
// Mapbox GL canvas using the same `communities` data; the static plot below
// keeps the page renderable (and zero-JS-token) until then.

// Bounding box covering our partner communities (Ghana + Southern Africa).
const BOUNDS = { minLng: -5, maxLng: 32, minLat: -27, maxLat: 14 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  // invert latitude for screen space
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return { x, y };
}

export function SourcingMap({ communities }: { communities: Community[] }) {
  const [active, setActive] = useState<string>(communities[0]?.slug ?? "");

  return (
    <div className="grid grid-cols-1 gap-kb-8 lg:grid-cols-[3fr_2fr]">
      {/* plot */}
      <div className="relative aspect-[4/3] overflow-hidden bg-kb-linen ring-[0.5px] ring-kb-chalk">
        {/* graticule */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {[20, 40, 60, 80].map((v) => (
            <g key={v} stroke="var(--kb-chalk)" strokeWidth="0.2">
              <line x1={v} y1="0" x2={v} y2="100" />
              <line x1="0" y1={v} x2="100" y2={v} />
            </g>
          ))}
        </svg>

        {communities.map((c) => {
          const { x, y } = project(c.coordinates.lat, c.coordinates.lng);
          const isActive = active === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              onMouseEnter={() => setActive(c.slug)}
              onFocus={() => setActive(c.slug)}
              onClick={() => setActive(c.slug)}
              aria-label={`${c.name}, ${c.location}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  isActive
                    ? "h-4 w-4 bg-kb-terracotta ring-4 ring-kb-terracotta/20"
                    : "h-3 w-3 bg-kb-gold"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* detail / list */}
      <div>
        <ul className="divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
          {communities.map((c) => {
            const isActive = active === c.slug;
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(c.slug)}
                  onFocus={() => setActive(c.slug)}
                  onClick={() => setActive(c.slug)}
                  className="w-full py-4 text-left"
                >
                  <p
                    className={`font-display text-[20px] font-normal italic transition-colors ${
                      isActive ? "text-kb-terracotta" : "text-kb-cacao"
                    }`}
                  >
                    {c.name}
                  </p>
                  <p className="kb-label text-[10px] text-kb-dusk/60">
                    {c.location}
                  </p>
                  {isActive && (
                    <p className="mt-2 font-body text-[14px] font-light leading-[1.7] text-kb-dusk/80">
                      {c.description}
                    </p>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
