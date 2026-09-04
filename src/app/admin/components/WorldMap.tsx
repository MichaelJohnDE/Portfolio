'use client';

import { useState } from 'react';

// ViewBox dimensions for the equirectangular world map
const VW = 1000;
const VH = 500;

// Convert geographic coordinates to SVG pixel coordinates
function latLonToXY(lat: number, lon: number) {
  const x = ((lon + 180) / 360) * VW;
  const y = ((90 - lat) / 180) * VH;
  return { x, y };
}

// Simplified continent outlines using equirectangular projection
// Coordinates verified using: x = (lon+180)/360*1000, y = (90-lat)/180*500
const LAND_PATHS = [
  {
    id: 'north-america',
    d: 'M 33,100 L 61,92 L 125,92 L 156,119 L 175,161 L 194,186 L 250,208 L 286,228 L 256,194 L 278,181 L 292,153 L 306,131 L 322,128 L 347,119 L 311,47 L 269,22 L 161,47 L 64,53 Z',
  },
  {
    id: 'south-america',
    d: 'M 297,217 L 333,228 L 403,264 L 403,314 L 353,342 L 319,403 L 292,389 L 278,347 L 278,250 Z',
  },
  {
    id: 'europe',
    d: 'M 472,150 L 472,128 L 486,108 L 533,94 L 569,50 L 589,56 L 611,56 L 611,78 L 583,83 L 567,83 L 561,89 L 556,128 L 578,150 L 600,150 L 600,136 L 622,136 L 622,150 Z',
  },
  {
    id: 'africa',
    d: 'M 450,147 L 533,147 L 603,147 L 619,217 L 642,222 L 617,283 L 611,281 L 597,283 L 597,347 L 550,347 L 453,208 Z',
  },
  {
    id: 'asia',
    d: 'M 569,50 L 667,42 L 778,47 L 889,47 L 1000,50 L 903,131 L 861,158 L 792,250 L 778,236 L 764,236 L 722,228 L 714,228 L 694,189 L 672,189 L 661,189 L 658,217 L 622,217 L 606,219 L 589,167 L 569,150 Z',
  },
  {
    id: 'australia',
    d: 'M 817,311 L 850,289 L 878,283 L 889,292 L 931,311 L 925,328 L 917,356 L 903,356 L 861,344 L 825,342 Z',
  },
  {
    id: 'greenland',
    d: 'M 375,83 L 458,22 L 444,19 L 403,19 L 347,22 L 306,42 Z',
  },
  {
    id: 'iceland',
    d: 'M 431,75 L 464,75 L 464,64 L 431,64 Z',
  },
  {
    id: 'madagascar',
    d: 'M 622,283 L 639,294 L 639,319 L 622,319 Z',
  },
  {
    id: 'new-zealand',
    d: 'M 972,367 L 978,355 L 983,348 L 978,342 L 972,355 Z',
  },
];

export interface MapLocation {
  city: string | null;
  country: string | null;
  countryCode: string | null;
  lat: number | null;
  lon: number | null;
  count: number;
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
  count: number;
}

export default function WorldMap({ locations }: { locations: MapLocation[] }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const validLocations = locations.filter(l => l.lat !== null && l.lon !== null);
  const maxCount = Math.max(...validLocations.map(l => l.count), 1);

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full h-auto rounded-lg"
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Ocean background */}
        <rect width={VW} height={VH} fill="transparent" />

        {/* Lat/Lon grid lines */}
        <g strokeOpacity="0.06" strokeWidth="0.7" stroke="currentColor" className="text-on-surface">
          {[-60, -30, 0, 30, 60].map(lat => {
            const { y } = latLonToXY(lat, 0);
            return <line key={`lat-${lat}`} x1={0} y1={y} x2={VW} y2={y} />;
          })}
          {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map(lon => {
            const { x } = latLonToXY(0, lon);
            return <line key={`lon-${lon}`} x1={x} y1={0} x2={x} y2={VH} />;
          })}
        </g>

        {/* Equator */}
        <line
          x1={0} y1={VH / 2} x2={VW} y2={VH / 2}
          stroke="currentColor" strokeOpacity="0.12" strokeWidth="1"
          strokeDasharray="5 4" className="text-on-surface"
        />

        {/* Landmasses */}
        <g
          fill="currentColor" fillOpacity="0.18"
          stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6"
          className="text-on-surface"
        >
          {LAND_PATHS.map(p => <path key={p.id} d={p.d} />)}
        </g>

        {/* Visitor dots */}
        {validLocations.map((loc, i) => {
          const { x, y } = latLonToXY(loc.lat!, loc.lon!);
          const scale = loc.count / maxCount;
          const r = 3 + scale * 9;
          const label = loc.city
            ? `${loc.city}, ${loc.country}`
            : (loc.country ?? 'Unknown');

          return (
            <g key={i}>
              {/* Outer glow ring */}
              <circle cx={x} cy={y} r={r + 5} fill="#38bdf8" opacity={0.12} />
              {/* Inner dot */}
              <circle
                cx={x} cy={y} r={r}
                fill="#38bdf8" opacity={0.85}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={(e) => {
                  const rect = (e.target as SVGElement).closest('svg')!.getBoundingClientRect();
                  const svgX = (x / VW) * rect.width;
                  const svgY = (y / VH) * rect.height;
                  setTooltip({ x: svgX, y: svgY, label, count: loc.count });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none bg-surface-container border border-outline-variant/50 rounded-xl px-3 py-2 text-sm shadow-xl"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 60}px`,
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          <p className="font-semibold text-on-surface">{tooltip.label}</p>
          <p className="text-on-surface-variant text-xs mt-0.5">
            {tooltip.count} {tooltip.count === 1 ? 'view' : 'views'}
          </p>
        </div>
      )}
    </div>
  );
}
