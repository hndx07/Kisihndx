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
      {/* Centered Kop Cluster: Logo & Text are clustered together so the logo is not stranded far at the edge */}
      <div className="w-full max-w-[760px] mx-auto flex items-center justify-between gap-3 sm:gap-4 px-2 sm:px-4 pb-1">
        {/* Left: Logo SMK Muhammadiyah Bawang (compact & properly inset) */}
        <div className="shrink-0 w-20 sm:w-22 flex items-center justify-center">
          <img
            src={logoUrl}
            alt="Logo SMK Muhammadiyah Bawang"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain print:w-18 print:h-18"
            crossOrigin="anonymous"
            loading="eager"
          />
        </div>

        {/* Center: Official Text Hierarchy (Compact, neat line spacing) */}
        <div className="flex-1 text-center leading-tight">
          <h3 className="font-bold text-[11.5px] sm:text-[13px] md:text-[13.5px] uppercase tracking-wider text-black">
            {instansi1}
          </h3>
          <h4 className="font-bold text-[11.5px] sm:text-[13px] md:text-[13.5px] uppercase tracking-wide text-black mt-0.5">
            {instansi2}
          </h4>
          <h1 className="font-black text-[15px] sm:text-[18px] md:text-[20px] uppercase tracking-tight text-black mt-0.5 font-sans">
            {namaSekolah}
          </h1>
          <div className="font-extrabold text-[11px] sm:text-[12.5px] md:text-[13px] uppercase text-black mt-0.5 tracking-[0.22em] sm:tracking-[0.25em]">
            {akreditasi}
          </div>
          <p className="text-[9.5px] sm:text-[11px] font-normal text-black mt-0.5 leading-tight">
            {alamat}
          </p>
          <p className="text-[9.5px] sm:text-[11px] text-black leading-tight mt-0.5">
            Email : <a href={`mailto:${email}`} className="text-blue-700 underline font-medium">{email}</a> Website : <span className="font-normal">{website}</span>
          </p>
          <p className="text-[9.5px] sm:text-[11px] font-normal text-black leading-tight mt-0.5">
            {kontak}
          </p>
        </div>

        {/* Right: Invisible balance spacer of equal width so the text is mathematically centered */}
        <div className="shrink-0 w-20 sm:w-22 hidden sm:block" aria-hidden="true"></div>
      </div>

      {/* Official Indonesian Double Border: Thick Line (3px) + Space (2px) + Thin Line (1px) */}
      <div 
        className="w-full mt-1.5 mb-1.5 print:mt-1 print:mb-1 block clear-both"
        style={{
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
        }}
      >
        <div 
          className="w-full border-t-[3px] border-black print:border-black"
          style={{
            borderTop: '3px solid #000000',
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
