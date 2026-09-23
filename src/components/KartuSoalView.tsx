import React, { useState } from 'react';
import { IdentitasSekolahGuru, DataMasterItem, DataSoalItem, KartuSoalValidation } from '../types';
import { KurikulumMerdekaLogo } from './Logos';
import { ArrowLeft, Printer, ChevronLeft, ChevronRight, Upload, Sparkles, CheckSquare, Layers } from 'lucide-react';

interface KartuSoalViewProps {
  identitas: IdentitasSekolahGuru;
  masterList: DataMasterItem[];
  soalList: DataSoalItem[];
  currentSoalNo: number;
  onSelectSoalNo: (no: number) => void;
  onBackToMenu: () => void;
  onOpenUpload: () => void;
  validationData: KartuSoalValidation;
  onUpdateValidation: (no: number, val: Partial<KartuSoalValidation[number]>) => void;
}

export const KartuSoalView: React.FC<KartuSoalViewProps> = ({
  identitas,
  masterList,
  soalList,
  currentSoalNo,
  onSelectSoalNo,
  onBackToMenu,
  onOpenUpload,
  validationData,
  onUpdateValidation,
}) => {
  const [printAllMode, setPrintAllMode] = useState(false);

  const activeMaster = masterList.find(m => m.no === currentSoalNo) || masterList[0] || {
    no: currentSoalNo,
    elemen: 'Membaca - Memirsa',
    capaianPembelajaran: 'By the end of Phase F...',
    ipk: 'Indikator Pencapaian Kompetensi',
    materi: 'Materi Soal',
    indikatorSoal: 'Indikator Butir Soal',
    bentukTes: 'Pilihan Ganda',
    levelKognitif: 'L2 (MOTS)',
    deepLearningDimension: 'Mindful Learning',
    tingkatKesukaran: 'Sedang'
  };

  const activeSoal = soalList.find(s => s.no === currentSoalNo) || soalList[0] || {
    no: currentSoalNo,
    kunci: 'A',
    rumusanSoal: 'Rumusan butir soal belum diisi.',
    pilihanA: 'Pilihan A',
    pilihanB: 'Pilihan B',
    pilihanC: 'Pilihan C',
    pilihanD: 'Pilihan D',
    pilihanE: 'Pilihan E',
    skor: 2
  };

  const currentVal = validationData[currentSoalNo] || {
    jumlahSiswa: 36,
    dayaPembeda: '0.45 (Baik)',
    proporsiA: 10,
    proporsiB: 65,
    proporsiC: 15,
    proporsiD: 10,
    proporsiE: 0,
    validatorStatus: 'Diterima',
    validatorCatatan: 'Sesuai dengan capaian pembelajaran dan indikator'
  };

  const handlePrint = (all: boolean = false) => {
    if (all) {
      setPrintAllMode(true);
      setTimeout(() => {
        window.print();
        setPrintAllMode(false);
      }, 300);
    } else {
      window.print();
    }
  };

  const renderSingleCard = (soal: DataSoalItem, master: DataMasterItem, isBatch = false) => {
    return (
      <div 
        key={soal.no} 
        className={`bg-white border-2 border-slate-900 rounded-lg p-5 shadow-xs text-xs font-sans text-slate-900 max-w-4xl mx-auto ${
          isBatch ? 'break-after-page mb-8' : ''
        }`}
      >
        {/* Card Header matching Kurikulum Merdeka */}
        <div className="flex items-start justify-between pb-3 border-b-2 border-slate-900 gap-4">
          <div>
            <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-0.5">
              {identitas.namaSekolah}
            </div>
            <h2 className="text-base font-black tracking-tight uppercase leading-tight text-slate-900">
              KARTU SOAL {identitas.namaJenjangTesLengkap.toUpperCase()}
            </h2>
            <div className="text-[11px] font-semibold text-slate-600">
              TAHUN AJARAN {identitas.tahunAjaran} · {identitas.mataPelajaran}
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <KurikulumMerdekaLogo height={36} />
            <div className="w-11 h-11 bg-amber-400 border-2 border-amber-600 rounded-lg flex flex-col items-center justify-center font-black text-amber-950 shadow-2xs">
              <span className="text-[9px] font-bold leading-none">NO</span>
              <span className="text-base leading-none">{soal.no}</span>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 py-2 border-b-2 border-slate-900 text-[11px]">
          <div className="space-y-1">
            <div className="flex">
              <span className="w-32 font-bold text-slate-700">Satuan Pendidikan</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.namaSekolah}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-bold text-slate-700">Mata Pelajaran</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.mataPelajaran}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-bold text-slate-700">Kurikulum / Fase</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.kurikulum} ({identitas.fase})</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex">
              <span className="w-28 font-bold text-slate-700">Bentuk Soal</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.bentukTes}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold text-slate-700">Jumlah Soal</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.jumlahSoal} Butir</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold text-slate-700">Penyusun</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.penyusun}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Official Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-slate-900">
          {/* Left Column (5 cols) */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r-2 border-slate-900 p-3 space-y-3 bg-slate-50/50">
            <div>
              <span className="font-bold text-slate-800 block text-[11px]">Elemen:</span>
              <p className="mt-0.5 text-blue-900 font-semibold text-xs">{master.elemen}</p>
            </div>

            <div>
              <span className="font-bold text-slate-800 block text-[11px]">Capaian Pembelajaran (CP / ATP):</span>
              <p className="mt-1 text-[11px] text-slate-700 leading-relaxed max-h-40 overflow-y-auto pr-1">
                {master.capaianPembelajaran}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-800 block text-[11px]">Materi Pokok:</span>
              <p className="mt-0.5 font-bold text-slate-900 text-xs">{master.materi}</p>
            </div>

            <div className="pt-2 border-t border-slate-300 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="font-bold text-slate-700">Digunakan Untuk:</span>
                <span className="font-semibold text-slate-900">{identitas.jenjangTes}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-700">Tanggal Asesmen:</span>
                <span className="text-slate-900">{identitas.tanggalPenyusunan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">Dimensi Deep Learning:</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">
                  {master.deepLearningDimension}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">Level Kognitif:</span>
                <span className="font-black text-rose-700">{master.levelKognitif}</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols) */}
          <div className="md:col-span-7 p-3 space-y-3">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-200">
              <span className="text-slate-600 font-medium">Buku Sumber: <strong className="text-slate-800">{identitas.bukuSumber}</strong></span>
              <span className="font-bold text-slate-800">Nomor Soal: <strong className="text-blue-700 font-black">{soal.no}</strong></span>
            </div>

            {/* Rumusan Butir Soal (matches light green background in screenshot page 11) */}
            <div>
              <span className="font-bold text-slate-800 text-[11px] block mb-1">Rumusan Butir Soal:</span>
              <div className="p-3 rounded bg-[#DCFCE7] border border-emerald-300 text-slate-900 text-xs font-medium leading-relaxed">
                {soal.rumusanSoal}
              </div>
            </div>

            {/* Pilihan Jawaban (matches light blue background in screenshot page 11) */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-800 text-[11px] block">Pilihan Jawaban:</span>
              <div className="space-y-1">
                <div className={`p-2 rounded flex items-start gap-2 ${soal.kunci === 'A' ? 'bg-amber-100 border border-amber-300 font-bold' : 'bg-[#E0F2FE]'}`}>
                  <span className="font-bold text-slate-700 w-5">a.</span>
                  <span className="flex-1 text-slate-900">{soal.pilihanA}</span>
                </div>
                <div className={`p-2 rounded flex items-start gap-2 ${soal.kunci === 'B' ? 'bg-amber-100 border border-amber-300 font-bold' : 'bg-[#E0F2FE]'}`}>
                  <span className="font-bold text-slate-700 w-5">b.</span>
                  <span className="flex-1 text-slate-900">{soal.pilihanB}</span>
                </div>
                <div className={`p-2 rounded flex items-start gap-2 ${soal.kunci === 'C' ? 'bg-amber-100 border border-amber-300 font-bold' : 'bg-[#E0F2FE]'}`}>
                  <span className="font-bold text-slate-700 w-5">c.</span>
                  <span className="flex-1 text-slate-900">{soal.pilihanC}</span>
                </div>
                <div className={`p-2 rounded flex items-start gap-2 ${soal.kunci === 'D' ? 'bg-amber-100 border border-amber-300 font-bold' : 'bg-[#E0F2FE]'}`}>
                  <span className="font-bold text-slate-700 w-5">d.</span>
                  <span className="flex-1 text-slate-900">{soal.pilihanD}</span>
                </div>
                {soal.pilihanE && (
                  <div className={`p-2 rounded flex items-start gap-2 ${soal.kunci === 'E' ? 'bg-amber-100 border border-amber-300 font-bold' : 'bg-[#E0F2FE]'}`}>
                    <span className="font-bold text-slate-700 w-5">e.</span>
                    <span className="flex-1 text-slate-900">{soal.pilihanE}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Kunci Jawaban & Indikator Pencapaian Kompetensi */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-800 text-xs">KUNCI:</span>
                <span className="w-8 h-8 rounded-lg bg-[#FB923C] text-white flex items-center justify-center font-black text-base shadow-xs">
                  {soal.kunci}
                </span>
              </div>
              <div className="flex-1 text-right text-[11px]">
                <span className="text-slate-500 font-medium">Skor Bobot:</span>{' '}
                <span className="font-bold text-slate-800">{soal.skor} Poin</span>
              </div>
            </div>

            <div className="pt-1">
              <span className="font-bold text-slate-800 text-[11px] block">Indikator Soal / IPK:</span>
              <p className="text-[11px] text-slate-700 italic mt-0.5">{master.indikatorSoal}</p>
            </div>
          </div>
        </div>

        {/* Bottom Validation & Psychometric Table (matching page 11) */}
        <div className="p-3 bg-slate-50 border-b-2 border-slate-900 text-[10px]">
          <div className="font-bold text-slate-800 mb-1">ANALISIS BUTIR SOAL & STATUS VALIDASI:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
            <div>
              <span className="text-slate-500">Tingkat Kesukaran:</span>{' '}
              <strong className="text-slate-900">{master.tingkatKesukaran}</strong>
            </div>
            <div>
              <span className="text-slate-500">Daya Pembeda:</span>{' '}
              <strong className="text-slate-900">{currentVal.dayaPembeda || '0.42 (Baik)'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Jumlah Siswa Uji:</span>{' '}
              <strong className="text-slate-900">{currentVal.jumlahSiswa || 36}</strong>
            </div>
            <div>
              <span className="text-slate-500">Status Validator:</span>{' '}
              <span className="font-bold text-emerald-700 px-1.5 py-0.5 bg-emerald-100 rounded">
                {currentVal.validatorStatus || 'Diterima'}
              </span>
            </div>
          </div>
        </div>

        {/* Signature Block */}
        <div className="grid grid-cols-2 pt-4 px-6 text-center text-[11px]">
          <div>
            <p className="text-slate-600">Mengetahui,</p>
            <p className="font-bold text-slate-900">Kepala {identitas.namaSekolah}</p>
            <div className="h-14"></div>
            <p className="font-bold text-slate-900 underline">{identitas.kepalaSekolah}</p>
            <p className="text-[10px] text-slate-600">NBM: {identitas.nbmKepalaSekolah !== '-' ? identitas.nbmKepalaSekolah : '....................'}</p>
          </div>
          <div>
            <p className="text-slate-600">{identitas.tempatPenyusunan}, {identitas.tanggalPenyusunan}</p>
            <p className="font-bold text-slate-900">Guru Penyusun / Pengampu</p>
            <div className="h-14"></div>
            <p className="font-bold text-slate-900 underline">{identitas.penyusun}</p>
            <p className="text-[10px] text-slate-600">NIP/NBM: {identitas.nbmPenyusun !== '-' ? identitas.nbmPenyusun : identitas.nipPenyusun !== '-' ? identitas.nipPenyusun : '....................'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Controls (Hidden during print) */}
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
              KARTU SOAL RESMI ({identitas.namaJenjangTesLengkap})
            </h2>
            <p className="text-[11px] text-slate-500">
              Format standar Kurikulum Merdeka & Analisis Butir Soal
            </p>
          </div>
        </div>

        {/* Navigator & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Navigator 1 to 50 */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-300">
            <button
              onClick={() => onSelectSoalNo(Math.max(1, currentSoalNo - 1))}
              disabled={currentSoalNo <= 1}
              className="p-1 hover:bg-white rounded text-slate-700 disabled:opacity-30 cursor-pointer"
              title="Soal Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black px-2 text-slate-800">
              Soal {currentSoalNo} / {soalList.length}
            </span>
            <button
              onClick={() => onSelectSoalNo(Math.min(soalList.length, currentSoalNo + 1))}
              disabled={currentSoalNo >= soalList.length}
              className="p-1 hover:bg-white rounded text-slate-700 disabled:opacity-30 cursor-pointer"
              title="Soal Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Jump to specific number dropdown */}
          <select
            value={currentSoalNo}
            onChange={(e) => onSelectSoalNo(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700"
          >
            {soalList.map(s => (
              <option key={s.no} value={s.no}>
                No. {s.no} (Kunci {s.kunci})
              </option>
            ))}
          </select>

          <button
            onClick={onOpenUpload}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs px-3 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>

          <button
            onClick={() => handlePrint(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Kartu Ini</span>
          </button>

          <button
            onClick={() => handlePrint(true)}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Cetak Semua (1 - {soalList.length})</span>
          </button>
        </div>
      </div>

      {/* Render Single or All */}
      {printAllMode ? (
        <div className="space-y-8">
          {soalList.map((s) => {
            const m = masterList.find(x => x.no === s.no) || masterList[0];
            return renderSingleCard(s, m, true);
          })}
        </div>
      ) : (
        renderSingleCard(activeSoal, activeMaster, false)
      )}
    </div>
  );
};
