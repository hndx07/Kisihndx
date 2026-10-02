import React from 'react';
import { ActiveTab, IdentitasSekolahGuru, DataMasterItem, DataSoalItem, JenjangTes } from '../types';
import { KurikulumMerdekaLogo, DeepLearningLogo, AppCreatorBadge } from './Logos';
import { Upload, FileSpreadsheet, Sparkles, BookOpen, Layers, Award, FileText, CheckCircle2, Check } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (tab: ActiveTab) => void;
  identitas: IdentitasSekolahGuru;
  masterList: DataMasterItem[];
  soalList: DataSoalItem[];
  onOpenUpload: () => void;
  onOpenDeepLearning: () => void;
  onSelectJenjang?: (jenjang: JenjangTes, namaLengkap: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onNavigate,
  identitas,
  masterList,
  soalList,
  onOpenUpload,
  onOpenDeepLearning,
  onSelectJenjang,
}) => {
  // Compute Deep Learning counts
  const mindfulCount = masterList.filter(m => m.deepLearningDimension === 'Mindful Learning').length;
  const meaningfulCount = masterList.filter(m => m.deepLearningDimension === 'Meaningful Learning').length;
  const joyfulCount = masterList.filter(m => m.deepLearningDimension === 'Joyful Learning').length;

  const kurikulumMerdekaTests: { code: JenjangTes; title: string; desc: string; badge: string; color: string }[] = [
    {
      code: 'TKA',
      title: 'TKA',
      desc: 'Tes Kemampuan Akademik (Standar Seleksi / Evaluasi)',
      badge: 'Penalaran & Bakat Akademik',
      color: 'from-rose-600 to-pink-700',
    },
    {
      code: 'ASTS',
      title: 'ASTS',
      desc: 'Asesmen Sumatif Tengah Semester',
      badge: 'Tengah Semester',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      code: 'ASAJ',
      title: 'ASAJ',
      desc: 'Asesmen Sumatif Akhir Jenjang',
      badge: 'Tingkat Akhir / Kelulusan',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      code: 'ASAT',
      title: 'ASAT',
      desc: 'Asesmen Sumatif Akhir Tahun',
      badge: 'Akhir Tahun / Kenaikan',
      color: 'from-amber-600 to-orange-700',
    },
    {
      code: 'ASAS',
      title: 'ASAS',
      desc: 'Asesmen Sumatif Akhir Semester',
      badge: 'Akhir Semester Gasal/Genap',
      color: 'from-violet-600 to-purple-700',
    },
  ];

  const handleChooseTes = (code: JenjangTes, nama: string) => {
    if (onSelectJenjang) {
      onSelectJenjang(code, nama);
    }
  };
  const hotsCount = masterList.filter(m => m.levelKognitif === 'L3 (HOTS)').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg p-6 border-b-4 border-amber-400">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-blue-950 font-black text-[11px] rounded uppercase tracking-wider">
                KURIKULUM MERDEKA & DEEP LEARNING
              </span>
              <span className="text-xs text-blue-200">
                Tahun Ajaran {identitas.tahunAjaran}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              APLIKASI KISI-KISI & KARTU SOAL
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl">
              Penyusunan instrumen evaluasi terintegrasi untuk {identitas.namaSekolah} · Mata Pelajaran {identitas.mataPelajaran} ({identitas.kelas} {identitas.semester})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-4 py-2 rounded-xl text-center">
              <div className="text-[10px] text-sky-200 uppercase font-bold tracking-wider">Asesmen Aktif</div>
              <div className="text-lg font-black text-amber-300">{identitas.jenjangTes}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Action Menu Box (Matching exact style of Page 1) */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-blue-600 overflow-hidden">
        {/* Top Grid of Menu Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: INPUT DATA */}
          <div className="border-b md:border-b-0 md:border-r border-slate-300">
            <div className="bg-[#FFFF00] text-slate-900 font-extrabold text-sm text-center py-2.5 tracking-wider border-b border-slate-300">
              INPUT DATA
            </div>
            <div className="p-4 bg-[#F87171]/20 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('identitas')}
                  className="bg-white hover:bg-slate-50 border-2 border-red-400 text-slate-900 font-bold text-xs py-3 px-2 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 group"
                >
                  <span className="text-[11px] font-extrabold group-hover:text-blue-700">IDENTITAS GURU</span>
                  <span className="text-[9px] text-slate-500 font-normal">Sekolah & Kurikulum</span>
                </button>

                <button
                  onClick={() => onNavigate('master')}
                  className="bg-white hover:bg-slate-50 border-2 border-red-400 text-slate-900 font-bold text-xs py-3 px-2 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 group"
                >
                  <span className="text-[11px] font-extrabold group-hover:text-blue-700">DATA MASTER</span>
                  <span className="text-[9px] text-slate-500 font-normal">CP, IPK & Deep Learning</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('soal')}
                  className="bg-white hover:bg-slate-50 border-2 border-red-400 text-slate-900 font-bold text-xs py-3 px-2 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 group cursor-pointer"
                >
                  <span className="text-[11px] font-extrabold group-hover:text-blue-700">DATA SOAL</span>
                  <span className="text-[9px] text-slate-500 font-normal">Tabel Butir & Opsi Jawaban</span>
                </button>

                <button
                  onClick={() => onNavigate('media')}
                  className="bg-white hover:bg-purple-50 border-2 border-purple-400 text-purple-950 font-bold text-xs py-3 px-2 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 group cursor-pointer"
                >
                  <span className="text-[11px] font-extrabold group-hover:text-purple-700">MEDIA & EMBED SOAL</span>
                  <span className="text-[9px] text-purple-800 font-normal">Gambar, Audio, Video & Iframe</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: KISI-KISI DAN KARTU SOAL */}
          <div>
            <div className="bg-[#FB923C] text-white font-extrabold text-sm text-center py-2.5 tracking-wider border-b border-slate-300">
              KISI-KISI, KARTU SOAL & HASIL SIAP CETAK
            </div>
            <div className="p-4 bg-[#0F3875] space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => onNavigate('kartu')}
                  className="bg-[#FDE68A] hover:bg-amber-200 border border-amber-500 text-slate-900 font-bold text-xs py-3 px-1 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="text-[11px] font-extrabold">KARTU SOAL</span>
                  <span className="text-[9px] text-amber-900 font-normal">Format Standar</span>
                </button>

                <button
                  onClick={() => onNavigate('kisi')}
                  className="bg-[#FDE68A] hover:bg-amber-200 border border-amber-500 text-slate-900 font-bold text-xs py-3 px-1 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="text-[11px] font-extrabold">KISI KISI</span>
                  <span className="text-[9px] text-amber-900 font-normal">Tabel Distribusi</span>
                </button>

                <button
                  onClick={() => onNavigate('lampiran')}
                  className="bg-[#FDE68A] hover:bg-amber-200 border border-amber-500 text-slate-900 font-bold text-xs py-3 px-1 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="text-[10px] font-extrabold leading-tight">LAMPIRAN KISI-KISI</span>
                  <span className="text-[9px] text-amber-900 font-normal">Instrumen & Kunci</span>
                </button>

                <button
                  onClick={() => onNavigate('cetak')}
                  className="bg-emerald-400 hover:bg-emerald-300 border border-emerald-600 text-emerald-950 font-bold text-xs py-3 px-1 rounded-lg text-center shadow-xs transition-transform active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="text-[10px] font-black leading-tight text-emerald-950">NASKAH SIAP CETAK</span>
                  <span className="text-[9px] text-emerald-900 font-semibold">Lembar Ujian Siswa</span>
                </button>
              </div>

              {/* Integrated Upload Bar */}
              <div className="pt-1 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <button
                  onClick={onOpenUpload}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-slate-950" />
                  <span>UPLOAD TERINTEGRASI</span>
                </button>
                <button
                  onClick={onOpenDeepLearning}
                  className="bg-white/15 hover:bg-white/25 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Analisis Deep Learning</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Band with Logos (Kurikulum Merdeka, App Creator, Deep Learning) */}
        <div className="bg-slate-50 border-t-2 border-red-500 p-4 flex flex-wrap items-center justify-around gap-4">
          <KurikulumMerdekaLogo />
          <AppCreatorBadge />
          <DeepLearningLogo />
        </div>

        {/* Kurikulum Merdeka & TKA Assessment Selector */}
        <div className="bg-white py-8 px-6 border-t border-slate-200">
          <div className="max-w-5xl mx-auto">
            {/* Heading & Active Status */}
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-[11px] uppercase tracking-wider rounded-full mb-2">
                PILIHAN ASESMEN & EVALUASI AKADEMIK
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {identitas.namaSekolah}
              </h2>
              <p className="text-xs md:text-sm font-semibold text-slate-600 mt-1">
                Mata Pelajaran: <span className="text-blue-700 font-bold">{identitas.mataPelajaran}</span> · Kelas {identitas.kelas} ({identitas.semester}) · TA {identitas.tahunAjaran}
              </p>
            </div>

            {/* Quick Choice Buttons for TKA, ASTS, ASAJ, ASAT, ASAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {kurikulumMerdekaTests.map((t) => {
                const isActive = identitas.jenjangTes === t.code;
                return (
                  <button
                    key={t.code}
                    onClick={() => handleChooseTes(t.code, `${t.desc} (${t.title})`)}
                    className={`relative p-3.5 rounded-xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
                      isActive 
                        ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20' 
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-base font-black tracking-tight ${isActive ? 'text-blue-800' : 'text-slate-800'}`}>
                          {t.title}
                        </span>
                        <span className="text-[8px] px-1.5 py-0.2 bg-slate-100 text-slate-600 font-bold rounded truncate">
                          {t.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {t.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className={isActive ? 'font-bold text-blue-700' : 'text-slate-400 font-medium'}>
                        {isActive ? '✓ Aktif' : 'Pilih'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Active Banner */}
            <div className="p-3 bg-linear-to-r from-blue-900 to-indigo-900 text-white rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-blue-950 font-black flex items-center justify-center text-xs shadow-xs">
                  {identitas.jenjangTes}
                </div>
                <div>
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    Asesmen Aktif Saat Ini
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white">
                    {identitas.namaJenjangTesLengkap}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('cetak')}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Lihat Naskah Siap Cetak →
                </button>
                <button
                  onClick={() => onNavigate('identitas')}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] rounded-lg transition-colors cursor-pointer"
                >
                  Ubah Identitas Guru →
                </button>
              </div>
            </div>

            {/* Standar Ketentuan Pilihan Ganda TKA */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                    Ketentuan Model Soal Pilihan Ganda (TKA & Kurikulum Merdeka)
                  </h4>
                </div>
                <button
                  onClick={() => onNavigate('soal')}
                  className="text-xs text-blue-700 font-bold hover:underline"
                >
                  Buka Data Soal →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <div className="font-extrabold text-blue-800 text-[11px] mb-1 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">1</span>
                    <span>PG Sederhana (Option A - E)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Satu opsi jawaban benar dari pilihan A sampai E. Cocok untuk menguji pemahaman faktual dan prosedural.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <div className="font-extrabold text-purple-800 text-[11px] mb-1 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-[10px]">2</span>
                    <span>PG Kompleks MCMA (5 Pernyataan)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Multiple Choices Multiple Answers: siswa dapat memilih lebih dari satu jawaban benar (kotak centang) dari 5 pernyataan.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <div className="font-extrabold text-emerald-800 text-[11px] mb-1 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">3</span>
                    <span>PG Kompleks Kategori (3 Pernyataan)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Matriks evaluasi Benar / Salah (atau Sesuai / Tidak Sesuai) untuk masing-masing tiga pernyataan yang disajikan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Learning & Assessment Stats Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Integrasi Kurikulum Merdeka & Pendekatan Deep Learning
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total Soal: <span className="font-bold text-blue-700">{soalList.length}</span> butir
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
            <span className="text-slate-500 text-[11px] block">Mindful Learning</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-black text-lg text-sky-800">{mindfulCount}</span>
              <span className="text-[10px] text-sky-600">soal ({Math.round((mindfulCount/soalList.length || 1)*100)}%)</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Berkesadaran, kritis & reflektif</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-slate-500 text-[11px] block">Meaningful Learning</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-black text-lg text-emerald-800">{meaningfulCount}</span>
              <span className="text-[10px] text-emerald-600">soal ({Math.round((meaningfulCount/soalList.length || 1)*100)}%)</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Kontekstual & relevan dunia nyata</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-slate-500 text-[11px] block">Joyful Learning</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-black text-lg text-amber-800">{joyfulCount}</span>
              <span className="text-[10px] text-amber-600">soal ({Math.round((joyfulCount/soalList.length || 1)*100)}%)</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Menyenangkan & interaktif</p>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
            <span className="text-slate-500 text-[11px] block">Level HOTS (L3)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-black text-lg text-rose-800">{hotsCount}</span>
              <span className="text-[10px] text-rose-600">soal ({Math.round((hotsCount/soalList.length || 1)*100)}%)</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Penalaran & analisis mendalam</p>
          </div>
        </div>
      </div>
    </div>
  );
};
