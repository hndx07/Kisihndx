import React, { useState } from 'react';
import { IdentitasSekolahGuru, DataSoalItem } from '../types';
import { KurikulumMerdekaLogo } from './Logos';
import { ArrowLeft, Printer, Upload, FileSpreadsheet, KeyRound, CheckCircle2 } from 'lucide-react';
import { exportToExcel } from '../utils/excelHelper';

interface LampiranKisiKisiViewProps {
  identitas: IdentitasSekolahGuru;
  soalList: DataSoalItem[];
  onBackToMenu: () => void;
  onOpenUpload: () => void;
}

export const LampiranKisiKisiView: React.FC<LampiranKisiKisiViewProps> = ({
  identitas,
  soalList,
  onBackToMenu,
  onOpenUpload,
}) => {
  const [showKeyTable, setShowKeyTable] = useState(true);

  return (
    <div className="space-y-4">
      {/* Top Action Controls (hidden on print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMenu}
            className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>MENU UTAMA</span>
          </button>
          <div>
            <h2 className="text-base font-black text-slate-800 tracking-tight">
              LAMPIRAN NASKAH BUTIR SOAL & KUNCI ({identitas.namaJenjangTesLengkap})
            </h2>
            <p className="text-[11px] text-slate-500">
              Format instrumen butir soal lengkap dengan opsi jawaban dan kunci penskoran
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowKeyTable(!showKeyTable)}
            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              showKeyTable ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{showKeyTable ? 'Tampilkan Rekap Kunci' : 'Sembunyikan Rekap Kunci'}</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs px-3 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Naskah Instrumen</span>
          </button>
        </div>
      </div>

      {/* Official Lampiran Document (Matches Page 13) */}
      <div className="bg-white border-2 border-slate-900 rounded-lg p-6 shadow-xs text-xs font-sans text-slate-900 max-w-5xl mx-auto">
        {/* Document Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900 gap-4">
          <div className="flex-1">
            <h1 className="text-base font-black tracking-tight uppercase leading-tight text-slate-900">
              LAMPIRAN KISI-KISI : INSTRUMEN / BUTIR SOAL
            </h1>
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide mt-0.5">
              {identitas.namaJenjangTesLengkap.toUpperCase()} · {identitas.namaSekolah.toUpperCase()}
            </h2>
            <p className="text-[11px] font-semibold text-slate-600">
              TAHUN AJARAN {identitas.tahunAjaran}
            </p>
          </div>

          <KurikulumMerdekaLogo height={36} />
        </div>

        {/* Short Metadata Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 border-b-2 border-slate-900 text-[11px] bg-slate-50 px-3 my-3 rounded">
          <div>
            <span className="text-slate-500 block">Mata Pelajaran:</span>
            <strong className="text-slate-900">{identitas.mataPelajaran}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Kelas / Semester:</span>
            <strong className="text-slate-900">{identitas.kelas} / {identitas.semester}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Bentuk Soal:</span>
            <strong className="text-slate-900">{identitas.bentukTes} ({soalList.length} Soal)</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Alokasi Waktu:</span>
            <strong className="text-slate-900">{identitas.alokasiWaktu}</strong>
          </div>
        </div>

        {/* Quick Answer Key Summary Table if enabled */}
        {showKeyTable && (
          <div className="mb-6 p-4 bg-amber-50/70 border border-amber-300 rounded-lg text-xs">
            <div className="font-bold text-amber-950 mb-2 flex items-center justify-between">
              <span>TABEL REKAP KUNCI JAWABAN (1 s/d {soalList.length}):</span>
              <span className="text-[10px] text-amber-800 font-normal">Kunci resmi untuk pedoman penskoran</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center font-mono">
              {soalList.map(s => (
                <div key={s.no} className="p-1 bg-white border border-amber-200 rounded">
                  <span className="block text-[9px] text-slate-500 leading-none">{s.no}</span>
                  <span className="block font-black text-amber-900 text-xs mt-0.5 leading-none">{s.kunci}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Instrument Table matching Page 13 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-900 border-collapse">
            <thead className="bg-[#E0F2FE] text-slate-900 font-bold border-b-2 border-slate-900 text-center">
              <tr>
                <th className="p-2 border border-slate-900 w-12">No. Soal</th>
                <th className="p-2 border border-slate-900 min-w-[380px] text-left">
                  Butir Soal & Pilihan Jawaban
                </th>
                <th className="p-2 border border-slate-900 w-16">Kunci</th>
                <th className="p-2 border border-slate-900 w-16">Skor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {soalList.map((item) => (
                <tr key={item.no} className="hover:bg-slate-50/80">
                  <td className="p-2.5 border border-slate-900 text-center font-bold font-mono align-top">
                    {item.no}
                  </td>
                  <td className="p-2.5 border border-slate-900 space-y-2 align-top">
                    <p className="font-semibold text-slate-900 leading-relaxed text-xs">
                      {item.rumusanSoal}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] pt-1 text-slate-800">
                      <div className={`p-1 rounded flex items-start gap-1.5 ${item.kunci === 'A' ? 'bg-amber-100 font-bold' : ''}`}>
                        <span className="font-bold text-slate-600">A.</span>
                        <span>{item.pilihanA}</span>
                      </div>
                      <div className={`p-1 rounded flex items-start gap-1.5 ${item.kunci === 'B' ? 'bg-amber-100 font-bold' : ''}`}>
                        <span className="font-bold text-slate-600">B.</span>
                        <span>{item.pilihanB}</span>
                      </div>
                      <div className={`p-1 rounded flex items-start gap-1.5 ${item.kunci === 'C' ? 'bg-amber-100 font-bold' : ''}`}>
                        <span className="font-bold text-slate-600">C.</span>
                        <span>{item.pilihanC}</span>
                      </div>
                      <div className={`p-1 rounded flex items-start gap-1.5 ${item.kunci === 'D' ? 'bg-amber-100 font-bold' : ''}`}>
                        <span className="font-bold text-slate-600">D.</span>
                        <span>{item.pilihanD}</span>
                      </div>
                      {item.pilihanE && (
                        <div className={`p-1 rounded flex items-start gap-1.5 ${item.kunci === 'E' ? 'bg-amber-100 font-bold' : ''}`}>
                          <span className="font-bold text-slate-600">E.</span>
                          <span>{item.pilihanE}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-2.5 border border-slate-900 text-center align-top">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber-400 text-amber-950 font-black text-xs shadow-2xs">
                      {item.kunci}
                    </span>
                  </td>
                  <td className="p-2.5 border border-slate-900 text-center font-bold text-slate-800 align-top">
                    {item.skor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Block */}
        <div className="grid grid-cols-2 pt-8 px-6 text-center text-xs break-inside-avoid">
          <div>
            <p className="text-slate-600">Mengetahui,</p>
            <p className="font-bold text-slate-900">Kepala {identitas.namaSekolah}</p>
            <div className="h-16"></div>
            <p className="font-bold text-slate-900 underline">{identitas.kepalaSekolah}</p>
            <p className="text-[11px] text-slate-600">NBM: {identitas.nbmKepalaSekolah !== '-' ? identitas.nbmKepalaSekolah : '....................'}</p>
          </div>
          <div>
            <p className="text-slate-600">{identitas.tempatPenyusunan}, {identitas.tanggalPenyusunan}</p>
            <p className="font-bold text-slate-900">Guru Penyusun / Pengampu</p>
            <div className="h-16"></div>
            <p className="font-bold text-slate-900 underline">{identitas.penyusun}</p>
            <p className="text-[11px] text-slate-600">NIP/NBM: {identitas.nbmPenyusun !== '-' ? identitas.nbmPenyusun : identitas.nipPenyusun !== '-' ? identitas.nipPenyusun : '....................'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
