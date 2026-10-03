import React from 'react';
import { IdentitasSekolahGuru } from '../types';

export const LOGO_SMK_MUHAMMADIYAH_BAWANG =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzWdtCjCcX2chJuhLX_26N5MmkVK-1SkyO7kgXznQQJPQa6_TB_EJzD1WWpztg7yX9RBRE7rGn0t2Z3FdG06mwwT6pQix8t6vnlcOBm_EgGl9z0jeJemJkppP0KIIjkXGksQvaCLh2dz-gOF6a2H213VQBL6Am8Elhmd76OOnphogk-EoTTbkYbg0TQJhv/s512/34690.png';

interface KopDokumenResmiProps {
  identitas?: Partial<IdentitasSekolahGuru>;
  className?: string;
}

export const KopDokumenResmi: React.FC<KopDokumenResmiProps> = ({
  identitas,
  className = '',
}) => {
  const logoUrl = identitas?.logoUrl || LOGO_SMK_MUHAMMADIYAH_BAWANG;
  const instansi1 = identitas?.instansiAtas1 || 'MAJLIS PENDIDIKAN DASAR DAN MENENGAH';
  const instansi2 = identitas?.instansiAtas2 || 'DAERAH MUHAMMADIYAH BATANG';
  const namaSekolah = identitas?.namaSekolah || 'SMK MUHAMMADIYAH BAWANG';
  const akreditasi = identitas?.akreditasi || 'T E R A K R E D I T A S I  “A”';
  const alamat = identitas?.alamatSekolah || 'Jl. Bawang-Sukorejo Km 01 Ds. Jlamprang Kec. Bawang Kab. Batang.';
  const email = identitas?.emailSekolah || 'smkmuhbawang@gmail.com';
  const website = identitas?.websiteSekolah || 'www.smkmuhiba.sch.id';
  const kontak = identitas?.kontakSekolah || 'Kode Pos. 51274 Telp. (0285) 4486909 Fax. (0285) 4486899';

  return (
    <div className={`w-full text-black font-sans select-none ${className}`}>
      {/* Container: Logo Left + Centered Text */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 pb-1 relative">
        {/* Left: Logo SMK Muhammadiyah Bawang */}
        <div className="shrink-0 w-24 sm:w-28 flex items-center justify-center">
          <img
            src={logoUrl}
            alt="Logo SMK Muhammadiyah Bawang"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain print:w-22 print:h-22"
            crossOrigin="anonymous"
            loading="eager"
          />
        </div>

        {/* Center: Official Text Hierarchy (Matching Exact Screenshot) */}
        <div className="flex-1 text-center leading-tight sm:leading-snug">
          <h3 className="font-bold text-xs sm:text-[13px] md:text-[14px] uppercase tracking-wider text-black">
            {instansi1}
          </h3>
          <h4 className="font-bold text-xs sm:text-[13px] md:text-[14px] uppercase tracking-wide text-black mt-0.5">
            {instansi2}
          </h4>
          <h1 className="font-black text-base sm:text-lg md:text-[21px] uppercase tracking-tight text-black mt-0.5 sm:mt-1 font-sans">
            {namaSekolah}
          </h1>
          <div className="font-extrabold text-xs sm:text-[13px] md:text-[14px] uppercase text-black mt-0.5 tracking-[0.25em]">
            {akreditasi}
          </div>
          <p className="text-[10px] sm:text-[11.5px] font-normal text-black mt-1">
            {alamat}
          </p>
          <p className="text-[10px] sm:text-[11.5px] text-black">
            Email : <a href={`mailto:${email}`} className="text-blue-700 underline font-medium">{email}</a> Website : <span className="font-normal">{website}</span>
          </p>
          <p className="text-[10px] sm:text-[11.5px] font-normal text-black">
            {kontak}
          </p>
        </div>

        {/* Right: Invisible balance spacer of equal width so the text is perfectly centered across the page */}
        <div className="shrink-0 w-24 sm:w-28 hidden sm:block" aria-hidden="true"></div>
      </div>

      {/* Official Indonesian Double Border: Thick Line (3.5px) + Space (2px) + Thin Line (1px) */}
      <div 
        className="w-full mt-2 mb-2 print:mt-2 print:mb-2 block clear-both"
        style={{
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
        }}
      >
        <div 
          className="w-full border-t-[3.5px] border-black print:border-black"
          style={{
            borderTop: '3.5px solid #000000',
            height: '0px',
            marginBottom: '2px',
          }}
        />
        <div 
          className="w-full border-t-[1px] border-black print:border-black"
          style={{
            borderTop: '1px solid #000000',
            height: '0px',
          }}
        />
      </div>
    </div>
  );
};
