import React, { useState } from 'react';
import { IdentitasSekolahGuru, DataMasterItem, DataSoalItem } from '../types';
import { KurikulumMerdekaLogo, DeepLearningLogo } from './Logos';
import { ArrowLeft, Printer, Upload, FileSpreadsheet, Eye, Layers } from 'lucide-react';
import { exportToExcel } from '../utils/excelHelper';

interface KisiKisiViewProps {
  identitas: IdentitasSekolahGuru;
  masterList: DataMasterItem[];
  soalList: DataSoalItem[];
  onBackToMenu: () => void;
  onOpenUpload: () => void;
}

export const KisiKisiView: React.FC<KisiKisiViewProps> = ({
  identitas,
  masterList,
  soalList,
  onBackToMenu,
  onOpenUpload,
}) => {
  const [viewMode, setViewMode] = useState<'itemized' | 'grouped'>('grouped');

  // Compute grouped items by Materi & CP
  const groupedItems = React.useMemo(() => {
    const groups: {
      materi: string;
      elemen: string;
      cp: string;
      ipk: string;
      indikator: string;
      bentukSoal: string;
      nomorRentang: string;
      count: number;
      levelKognitif: string;
      deepLearning: string;
    }[] = [];

    let currentGroup: any = null;

    masterList.forEach((item) => {
      if (
        !currentGroup ||
        currentGroup.materi !== item.materi ||
        currentGroup.elemen !== item.elemen
      ) {
        if (currentGroup) {
          groups.push({
            ...currentGroup,
            nomorRentang: `${String(currentGroup.startNo).padStart(2, '0')} - ${String(currentGroup.endNo).padStart(2, '0')}`,
            count: currentGroup.endNo - currentGroup.startNo + 1
          });
        }
        currentGroup = {
          startNo: item.no,
          endNo: item.no,
          materi: item.materi,
          elemen: item.elemen,
          cp: item.capaianPembelajaran,
          ipk: item.ipk,
          indikator: item.indikatorSoal,
          bentukSoal: item.bentukTes,
          levelKognitif: item.levelKognitif,
          deepLearning: item.deepLearningDimension,
        };
      } else {
        currentGroup.endNo = item.no;
        if (item.levelKognitif === 'L3 (HOTS)') {
          currentGroup.levelKognitif = 'L3 (HOTS)';
        }
      }
    });

    if (currentGroup) {
      groups.push({
        ...currentGroup,
        nomorRentang: `${String(currentGroup.startNo).padStart(2, '0')} - ${String(currentGroup.endNo).padStart(2, '0')}`,
        count: currentGroup.endNo - currentGroup.startNo + 1
      });
    }

    return groups;
  }, [masterList]);

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
              KISI-KISI PENULISAN SOAL ({identitas.namaJenjangTesLengkap})
            </h2>
            <p className="text-[11px] text-slate-500">
              Format baku Kurikulum Merdeka & Pendekatan Deep Learning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-700">
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'grouped' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:bg-slate-200'
              }`}
            >
              Mode Ringkas (Rentang Soal)
            </button>
            <button
              onClick={() => setViewMode('itemized')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'itemized' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:bg-slate-200'
              }`}
            >
              Mode Lengkap (Per Butir 1-50)
            </button>
          </div>

          <button
            onClick={onOpenUpload}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs px-3 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>

          <button
            onClick={() => exportToExcel(identitas, masterList, soalList)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor Excel</span>
          </button>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Kisi-Kisi</span>
          </button>
        </div>
      </div>

      {/* Official Kisi-Kisi Document (Matches Page 12) */}
      <div className="bg-white border-2 border-slate-900 rounded-lg p-6 shadow-xs text-xs font-sans text-slate-900 max-w-5xl mx-auto">
        {/* Document Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900 gap-4">
          <div className="flex-1">
            <h1 className="text-base sm:text-lg font-black tracking-tight uppercase leading-tight text-slate-900">
              KISI-KISI DAN SOAL {identitas.namaJenjangTesLengkap.toUpperCase()}
            </h1>
            <h2 className="text-sm font-bold text-slate-800 tracking-wide mt-0.5">
              {identitas.namaSekolah.toUpperCase()}
            </h2>
            <p className="text-xs font-semibold text-slate-600">
              TAHUN AJARAN {identitas.tahunAjaran}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <KurikulumMerdekaLogo height={38} />
            <DeepLearningLogo height={32} />
          </div>
        </div>

        {/* School Metadata Details */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 py-4 border-b-2 border-slate-900 text-xs">
          <div className="flex">
            <span className="w-36 font-bold text-slate-700">Satuan Pendidikan</span>
            <span className="w-3">:</span>
            <span className="font-semibold text-slate-900">{identitas.namaSekolah}</span>
          </div>
          <div className="flex">
            <span className="w-36 font-bold text-slate-700">Mata Pelajaran</span>
            <span className="w-3">:</span>
            <span className="font-semibold text-slate-900">{identitas.mataPelajaran}</span>
          </div>
          <div className="flex">
            <span className="w-36 font-bold text-slate-700">Kompetensi Keahlian</span>
            <span className="w-3">:</span>
            <span className="font-semibold text-slate-900">{identitas.kompetensiKeahlian}</span>
          </div>
          <div className="flex">
            <span className="w-36 font-bold text-slate-700">Bentuk Tes</span>
            <span className="w-3">:</span>
            <span className="font-semibold text-slate-900">{identitas.bentukTes} ({identitas.jumlahSoal} Butir)</span>
          </div>
          <div className="flex">
            <span className="w-36 font-bold text-slate-700">Kelas / Semester</span>
            <span className="w-3">:</span>
            <span className="font-semibold text-slate-900">{identitas.kelas} / {identitas.semester} ({identitas.fase})</span>
          </div>
          <div className="flex">
            <span className="w-36 font-bold text-slate-700">Alokasi Waktu</span>
            <span className="w-3">:</span>
            <span className="font-semibold text-slate-900">{identitas.alokasiWaktu}</span>
          </div>
        </div>

        {/* Official Kisi-Kisi Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-900 border-collapse">
            <thead className="bg-[#E0F2FE] text-slate-900 font-bold text-center border-b-2 border-slate-900">
              <tr>
                <th className="p-2 border border-slate-900 w-10">No</th>
                <th className="p-2 border border-slate-900 min-w-[200px]">Capaian Pembelajaran (CP / ATP)</th>
                <th className="p-2 border border-slate-900 min-w-[160px]">IPK (Alur Tujuan)</th>
                <th className="p-2 border border-slate-900 min-w-[140px]">Materi Pokok</th>
                <th className="p-2 border border-slate-900 min-w-[200px]">Indikator Soal</th>
                <th className="p-2 border border-slate-900 w-24">Bentuk Soal</th>
                <th className="p-2 border border-slate-900 w-20">No. Soal</th>
                <th className="p-2 border border-slate-900 w-28">Level / Deep Learning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {viewMode === 'grouped' ? (
                groupedItems.map((group, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-900 text-center font-bold">{idx + 1}</td>
                    <td className="p-2 border border-slate-900 text-slate-700 text-[11px] leading-relaxed">
                      <strong className="block text-blue-900 font-semibold mb-1">[{group.elemen}]</strong>
                      {group.cp}
                    </td>
                    <td className="p-2 border border-slate-900 font-medium text-slate-800 leading-snug">
                      {group.ipk}
                    </td>
                    <td className="p-2 border border-slate-900 font-bold text-slate-900">
                      {group.materi}
                    </td>
                    <td className="p-2 border border-slate-900 text-slate-700 leading-snug">
                      {group.indikator}
                    </td>
                    <td className="p-2 border border-slate-900 text-center text-slate-800">
                      {group.bentukSoal}
                    </td>
                    <td className="p-2 border border-slate-900 text-center font-mono font-bold text-blue-900">
                      {group.nomorRentang}
                    </td>
                    <td className="p-2 border border-slate-900 text-center space-y-1">
                      <span className="block font-bold text-[10px] text-slate-900">
                        {group.levelKognitif}
                      </span>
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-slate-100 font-semibold text-slate-700">
                        {group.deepLearning}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                masterList.map((item) => (
                  <tr key={item.no} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-900 text-center font-bold">{item.no}</td>
                    <td className="p-2 border border-slate-900 text-slate-700 text-[11px] leading-relaxed">
                      <strong className="block text-blue-900 font-semibold">[{item.elemen}]</strong>
                      {item.capaianPembelajaran}
                    </td>
                    <td className="p-2 border border-slate-900 font-medium text-slate-800">
                      {item.ipk}
                    </td>
                    <td className="p-2 border border-slate-900 font-bold text-slate-900">
                      {item.materi}
                    </td>
                    <td className="p-2 border border-slate-900 text-slate-700">
                      {item.indikatorSoal}
                    </td>
                    <td className="p-2 border border-slate-900 text-center">
                      {item.bentukTes}
                    </td>
                    <td className="p-2 border border-slate-900 text-center font-mono font-bold text-blue-900">
                      {item.no}
                    </td>
                    <td className="p-2 border border-slate-900 text-center space-y-1">
                      <span className="block font-bold text-[10px] text-slate-900">
                        {item.levelKognitif}
                      </span>
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-slate-100 font-semibold text-slate-700">
                        {item.deepLearningDimension}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
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
