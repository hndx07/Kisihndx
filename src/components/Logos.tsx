import React from 'react';

// Exact SMK Muhammadiyah Bawang Batang Emblem matching the uploaded logo
export const SmkMuhammadiyahInlineSvg: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-48 h-48", 
  size = 200 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      width={size} 
      height={size}
      className={`select-none ${className}`}
    >
      <defs>
        {/* Curved text arcs */}
        <path id="smkArcTopDef" d="M 85 250 A 165 165 0 0 1 415 250" fill="none" />
        <path id="smkArcBottomDef" d="M 418 250 A 168 168 0 0 1 82 250" fill="none" />

        {/* Glow filter for side atom tech symbols */}
        <filter id="atomGlowInline" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 1. Outer 12-petaled badge in vivid violet-blue with black and chartreuse/yellow outline */}
      <path 
        d="M 201.86 70.34 C 216.66 50.77, 231.25 11.74, 250.00 14.00 C 268.75 11.74, 283.34 50.77, 298.14 70.34 C 320.74 60.79, 352.89 34.28, 368.00 45.62 C 385.37 53.03, 378.49 94.13, 381.52 118.48 C 405.87 121.51, 446.97 114.63, 454.38 132.00 C 465.72 147.11, 439.21 179.26, 429.66 201.86 C 449.23 216.66, 488.26 231.25, 486.00 250.00 C 488.26 268.75, 449.23 283.34, 429.66 298.14 C 439.21 320.74, 465.72 352.89, 454.38 368.00 C 446.97 385.37, 405.87 378.49, 381.52 381.52 C 378.49 405.87, 385.37 446.97, 368.00 454.38 C 352.89 465.72, 320.74 439.21, 298.14 429.66 C 283.34 449.23, 268.75 488.26, 250.00 486.00 C 231.25 488.26, 216.66 449.23, 201.86 429.66 C 179.26 439.21, 147.11 465.72, 132.00 454.38 C 114.63 446.97, 121.51 405.87, 118.48 381.52 C 94.13 378.49, 53.03 385.37, 45.62 368.00 C 34.28 352.89, 60.79 320.74, 70.34 298.14 C 50.77 283.34, 11.74 268.75, 14.00 250.00 C 11.74 231.25, 50.77 216.66, 70.34 201.86 C 60.79 179.26, 34.28 147.11, 45.62 132.00 C 53.03 114.63, 94.13 121.51, 118.48 118.48 C 121.51 94.13, 114.63 53.03, 132.00 45.62 C 147.11 34.28, 179.26 60.79, 201.86 70.34 Z" 
        fill="#5450F7" 
        stroke="#181818" 
        strokeWidth="14" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 201.86 70.34 C 216.66 50.77, 231.25 11.74, 250.00 14.00 C 268.75 11.74, 283.34 50.77, 298.14 70.34 C 320.74 60.79, 352.89 34.28, 368.00 45.62 C 385.37 53.03, 378.49 94.13, 381.52 118.48 C 405.87 121.51, 446.97 114.63, 454.38 132.00 C 465.72 147.11, 439.21 179.26, 429.66 201.86 C 449.23 216.66, 488.26 231.25, 486.00 250.00 C 488.26 268.75, 449.23 283.34, 429.66 298.14 C 439.21 320.74, 465.72 352.89, 454.38 368.00 C 446.97 385.37, 405.87 378.49, 381.52 381.52 C 378.49 405.87, 385.37 446.97, 368.00 454.38 C 352.89 465.72, 320.74 439.21, 298.14 429.66 C 283.34 449.23, 268.75 488.26, 250.00 486.00 C 231.25 488.26, 216.66 449.23, 201.86 429.66 C 179.26 439.21, 147.11 465.72, 132.00 454.38 C 114.63 446.97, 121.51 405.87, 118.48 381.52 C 94.13 378.49, 53.03 385.37, 45.62 368.00 C 34.28 352.89, 60.79 320.74, 70.34 298.14 C 50.77 283.34, 11.74 268.75, 14.00 250.00 C 11.74 231.25, 50.77 216.66, 70.34 201.86 C 60.79 179.26, 34.28 147.11, 45.62 132.00 C 53.03 114.63, 94.13 121.51, 118.48 118.48 C 121.51 94.13, 114.63 53.03, 132.00 45.62 C 147.11 34.28, 179.26 60.79, 201.86 70.34 Z" 
        fill="none" 
        stroke="#D2E616" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />

      {/* 2. Arched White Bold Text */}
      {/* Top: SMK MUHAMMADIYAH */}
      <text fill="#FFFFFF" fontFamily="'Arial Black', Impact, sans-serif" fontWeight="900" fontSize="28.5" letterSpacing="2.8" textAnchor="middle">
        <textPath href="#smkArcTopDef" startOffset="50%">
          SMK MUHAMMADIYAH
        </textPath>
      </text>

      {/* Bottom: BAWANG - BATANG */}
      <text fill="#FFFFFF" fontFamily="'Arial Black', Impact, sans-serif" fontWeight="900" fontSize="27.5" letterSpacing="3.2" textAnchor="middle">
        <textPath href="#smkArcBottomDef" startOffset="50%">
          BAWANG - BATANG
        </textPath>
      </text>

      {/* 3. Left Atom Science/Tech Symbol (at 9 o'clock) */}
      <g transform="translate(68, 250)" filter="url(#atomGlowInline)">
        <circle cx="0" cy="0" r="16" fill="#2563EB" opacity="0.6" />
        <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(30)" />
        <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(-30)" />
        <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(90)" />
        <circle cx="0" cy="0" r="6" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="1.2" />
        {/* USB Trident */}
        <path d="M 0 3.5 L 0 -2.5 M -2.2 -0.5 L 0 1 L 2.2 -0.5 M 0 -3.5 L 0 -2.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
        <circle cx="0" cy="-3.8" r="0.8" fill="#FFFFFF" />
        <rect x="-3" y="-2" width="1.5" height="1.5" fill="#FFFFFF" />
        <polygon points="2.8,-2 3.8,-0.5 1.8,-0.5" fill="#FFFFFF" />
      </g>

      {/* 4. Right Atom Science/Tech Symbol (at 3 o'clock) */}
      <g transform="translate(432, 250)" filter="url(#atomGlowInline)">
        <circle cx="0" cy="0" r="16" fill="#2563EB" opacity="0.6" />
        <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(30)" />
        <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(-30)" />
        <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(90)" />
        <circle cx="0" cy="0" r="6" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="1.2" />
        {/* USB Trident */}
        <path d="M 0 3.5 L 0 -2.5 M -2.2 -0.5 L 0 1 L 2.2 -0.5 M 0 -3.5 L 0 -2.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
        <circle cx="0" cy="-3.8" r="0.8" fill="#FFFFFF" />
        <rect x="-3" y="-2" width="1.5" height="1.5" fill="#FFFFFF" />
        <polygon points="2.8,-2 3.8,-0.5 1.8,-0.5" fill="#FFFFFF" />
      </g>

      {/* 5. Mechanical Gear (Roda Gigi) in Silver/Gray */}
      <circle cx="250" cy="250" r="126" fill="#C2C2C8" stroke="#FFFFFF" strokeWidth="2" />
      {/* 16 Teeth */}
      {[...Array(16)].map((_, i) => (
        <rect 
          key={i} 
          x="241" 
          y="114" 
          width="18" 
          height="16" 
          rx="2"
          fill="#C2C2C8" 
          stroke="#FFFFFF" 
          strokeWidth="1.5"
          transform={`rotate(${i * 22.5} 250 250)`} 
        />
      ))}
      <circle cx="250" cy="250" r="118" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="108" fill="#0A0A0C" stroke="#FFFFFF" strokeWidth="2" />

      {/* 6. Muhammadiyah Solar Radiant Rays (Surya Muhammadiyah) */}
      <g>
        {[...Array(24)].map((_, i) => {
          const angle = i * 15;
          const rTip = i % 2 === 0 ? 106 : 92;
          const rad = (angle * Math.PI) / 180;
          const radL = ((angle - 2.8) * Math.PI) / 180;
          const radR = ((angle + 2.8) * Math.PI) / 180;
          const tipX = 250 + rTip * Math.cos(rad);
          const tipY = 250 + rTip * Math.sin(rad);
          const bLx = 250 + 38 * Math.cos(radL);
          const bLy = 250 + 38 * Math.sin(radL);
          const bRx = 250 + 38 * Math.cos(radR);
          const bRy = 250 + 38 * Math.sin(radR);
          return (
            <polygon 
              key={i} 
              points={`${bLx.toFixed(1)},${bLy.toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)} ${bRx.toFixed(1)},${bRy.toFixed(1)}`} 
              fill="#000000" 
              stroke="#FFFFFF" 
              strokeWidth="0.75" 
            />
          );
        })}
      </g>

      {/* 7. Base Open Book / Rehal Silhouette with Blue Glowing Highlights */}
      <g transform="translate(250, 312)">
        <path d="M -64 28 C -42 22, -20 28, 0 15 C 20 28, 42 22, 64 28 L 64 36 C 42 32, 20 38, 0 25 C -20 38, -42 32, -64 36 Z" fill="#000000" />
        <path d="M -58 26 C -50 -5, -42 -22, -28 -28 C -15 -32, -8 -18, -6 16 L 6 16 C 8 -18, 15 -32, 28 -28 C 42 -22, 50 -5, 58 26 Z" fill="#000000" stroke="#000000" strokeWidth="2" />
        <path d="M -48 24 C -42 -2, -34 -16, -24 -20 C -18 -22, -12 -12, -10 14" fill="none" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" />
        <path d="M 48 24 C 42 -2, 34 -16, 24 -20 C 18 -22, 12 -12, 10 14" fill="none" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" />
        <path d="M -48 24 C -42 -2, -34 -16, -24 -20 C -18 -22, -12 -12, -10 14" fill="none" stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 48 24 C 42 -2, 34 -16, 24 -20 C 18 -22, 12 -12, 10 14" fill="none" stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="0" y1="-8" x2="0" y2="24" stroke="#7C3AED" strokeWidth="2" />
      </g>

      {/* 8. Center White Circular Medallion */}
      <circle cx="250" cy="245" r="36" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />

      {/* 9. Authentic Arabic Calligraphy "محمدية" (Muhammadiyah) */}
      <g transform="translate(250, 246) scale(0.68)">
        <path d="M -26 12 C -24 3, -16 -4, -8 2 C -3 6, 2 5, 6 -1 C 12 -9, 21 -4, 23 6 C 24 13, 17 18, 8 16 C 0 15, -4 10, -8 13 C -14 17, -22 17, -26 12 Z" fill="#000000" />
        <path d="M -14 -12 C -10 -22, 0 -22, 6 -14 C 9 -9, 5 -3, -2 -5 C -9 -7, -12 -6, -14 -12 Z" fill="#000000" />
        <path d="M 3 -4 C 10 -12, 16 -16, 20 -10 C 23 -6, 22 2, 18 5 C 15 2, 13 0, 10 2 Z" fill="#000000" />
        <path d="M -6 -18 C -5 -22, -3 -22, -2 -19 C -1 -22, 1 -22, 2 -18" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="-3" cy="22" r="2.2" fill="#000000" />
        <circle cx="4" cy="22" r="2.2" fill="#000000" />
        <circle cx="16" cy="-16" r="2" fill="#000000" />
        <path d="M -24 2 C -18 -8, -12 -8, -6 -2" fill="none" stroke="#000000" strokeWidth="2.8" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// Main Export: Always renders the pristine, exact school logo
export const SmkMuhammadiyahLogo: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-48 h-48", 
  size = 200 
}) => {
  return (
    <img 
      src="/assets/smk-muhammadiyah-logo.svg" 
      alt="Logo Resmi SMK Muhammadiyah Bawang - Batang"
      width={size}
      height={size}
      className={`object-contain select-none shrink-0 ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

// Kurikulum Merdeka Official Logo
export const KurikulumMerdekaLogo: React.FC<{ className?: string; height?: number }> = ({ 
  className = "h-10", 
  height = 40 
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg width={height * 1.05} height={height} viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head / Sun (Yellow) */}
        <circle cx="36" cy="18" r="10" fill="#FBBF24" />
        {/* Body Arc (Cyan / Teal) */}
        <path 
          d="M18 36 C18 36 28 32 44 40 C60 48 70 66 65 85 C61 74 54 62 42 54 C30 46 18 50 18 50 Z" 
          fill="#06B6D4" 
        />
        {/* Dynamic Wing / Arm (Dark Blue) */}
        <path 
          d="M32 35 C45 32 68 38 88 56 C75 56 62 50 48 48 C38 46 26 50 26 50 Z" 
          fill="#1E40AF" 
        />
        {/* Lower Swoosh (Deep Blue / Indigo) */}
        <path 
          d="M14 62 C26 62 42 70 54 86 C40 82 28 75 14 62 Z" 
          fill="#3B82F6" 
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[#1E3A8A] font-extrabold text-[15px] tracking-tight">Kurikulum</span>
        <span className="text-[#0284C7] font-bold text-[13px] tracking-wide">Merdeka</span>
      </div>
    </div>
  );
};

// Deep Learning Kemendikdasmen Emblem
export const DeepLearningLogo: React.FC<{ className?: string; height?: number }> = ({ 
  className = "h-11", 
  height = 44 
}) => {
  return (
    <div className={`flex items-center gap-2.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white/90 shadow-xs ${className}`}>
      <div className="relative w-9 h-9 rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-sky-500 p-[1.5px] shrink-0">
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            <path d="m16 8 2 2 4-4" stroke="#10B981" strokeWidth="2.5"></path>
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-900 font-extrabold text-[13px] tracking-tight">Deep Learning</span>
          <span className="text-[9px] px-1 py-0.2 bg-indigo-50 text-indigo-700 font-semibold rounded">Kemendikdasmen</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">Mindful · Meaningful · Joyful</span>
      </div>
    </div>
  );
};

// Hndx07 Application Badge (matches middle badge in screenshot)
export const AppCreatorBadge: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-amber-100 via-orange-50 to-teal-100 border border-amber-300 text-xs shadow-xs ${className}`}>
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
      <div className="flex flex-col text-left leading-tight">
        <span className="font-bold text-slate-800 text-[11px]">Aplikasi KISI-KISI & KARTU SOAL</span>
        <span className="text-[10px] text-slate-600 font-mono">Integrated Edition by hndx07</span>
      </div>
    </div>
  );
};

// Header School Building Graphic with "KANTOR GURU SMK MUHIBA"
export const SchoolBuildingHeader: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-linear-to-r from-sky-400 via-sky-300 to-sky-500 border-2 border-white shadow-sm ${className}`}>
      {/* Background sky and soft clouds */}
      <div className="absolute inset-0 bg-linear-to-b from-sky-500/70 via-sky-300/40 to-white/90"></div>
      
      <div className="relative px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 bg-white/95 rounded-xl p-2 shadow-md border border-amber-300 flex items-center justify-center font-black text-blue-900 text-lg">
            📘
          </div>
          <div className="text-white drop-shadow-sm hidden sm:block">
            <div className="text-xs uppercase tracking-wider font-semibold text-sky-100">Portal Asesmen Terpadu</div>
            <div className="text-lg font-black tracking-tight text-white leading-tight">ASESMEN KURIKULUM MERDEKA</div>
          </div>
        </div>

        {/* Center: White Classical Building Illustration */}
        <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs px-6 py-2 rounded-lg border border-slate-200 shadow-sm max-w-md w-full">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-bold text-amber-950">★</div>
            <span className="text-xs font-bold text-slate-700 tracking-wider">KANTOR GURU · SMK MUHIBA</span>
            <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-bold text-amber-950">★</div>
          </div>
          {/* Classical Pediment & Pillars */}
          <div className="w-full flex flex-col items-center">
            <div className="w-32 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-b-[14px] border-b-slate-300 relative">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center text-[7px] text-white">🦅</div>
            </div>
            <div className="w-full h-1.5 bg-slate-400"></div>
            <div className="w-full flex justify-between px-2 pt-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2.5 h-6 bg-linear-to-b from-slate-200 via-white to-slate-300 border-x border-slate-300"></div>
              ))}
            </div>
            <div className="w-full h-1 bg-slate-500 mt-0.5"></div>
          </div>
        </div>

        {/* Right Info */}
        <div className="hidden lg:flex flex-col items-end text-right text-white drop-shadow-sm shrink-0">
          <span className="text-xs font-semibold px-2 py-0.5 bg-blue-900/60 rounded text-sky-200">Akreditasi A</span>
          <span className="text-[11px] text-sky-100 mt-1">Kabupaten Batang, Jawa Tengah</span>
        </div>
      </div>
    </div>
  );
};
