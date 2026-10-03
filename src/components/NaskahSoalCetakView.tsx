import React, { useState } from 'react';
import { IdentitasSekolahGuru, DataSoalItem } from '../types';
import { KurikulumMerdekaLogo, DeepLearningLogo } from './Logos';
import { MediaStimulusRenderer } from './MediaStimulusRenderer';
import { KopDokumenResmi } from './KopDokumenResmi';
import { 
  ArrowLeft, 
  Printer, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Eye, 
  Columns, 
  FileSpreadsheet, 
  KeyRound,
  Sparkles,
  Info
} from 'lucide-react';

interface NaskahSoalCetakViewProps {
  identitas: IdentitasSekolahGuru;
  soalList: DataSoalItem[];
  onBackToMenu: () => void;
  onOpenUpload: () => void;
}

export const NaskahSoalCetakView: React.FC<NaskahSoalCetakViewProps> = ({
  identitas,
  soalList,
  onBackToMenu,
  onOpenUpload,
}) => {
  const [mode, setMode] = useState<'siswa' | 'guru'>('siswa');
  const [columns, setColumns] = useState<'1' | '2'>('1');
  const [fontSize, setFontSize] = useState<'normal' | 'compact'>('normal');
  const [includeMedia, setIncludeMedia] = useState<boolean>(true);

  const countSederhana = soalList.filter(s => (!s.tipeSoal || s.tipeSoal === 'PG_SEDERHANA')).length;
  const countMcma = soalList.filter(s => s.tipeSoal === 'PGK_MCMA').length;
  const countKategori = soalList.filter(s => s.tipeSoal === 'PGK_KATEGORI').length;

  return (
    <div className="space-y-4">
      {/* Top Action Bar (Hidden during print) */}
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
            <h2 className="text-base font-black text-slate-800 tracking-tight flex items-center gap-2">
              <span>NASKAH SOAL SIAP CETAK</span>
              <span className="text-xs font-black px-2 py-0.5 bg-amber-400 text-blue-950 rounded">
                {identitas.jenjangTes}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Format lembar soal ujian standar nasional siap digandakan untuk peserta didik atau arsip guru
            </p>
          </div>
        </div>

        {/* Print Configuration Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode Switcher: Siswa (Tanpa Kunci) vs Guru (Dengan Kunci) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setMode('siswa')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                mode === 'siswa' 
                  ? 'bg-blue-600 text-white shadow-2xs font-bold' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lembar Ujian Siswa
            </button>
            <button
              onClick={() => setMode('guru')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                mode === 'guru' 
                  ? 'bg-amber-500 text-slate-950 shadow-2xs font-bold' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pedoman Guru & Kunci
            </button>
          </div>

          {/* Layout Column Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setColumns('1')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                columns === '1' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
              title="1 Kolom"
            >
              1 Kolom
            </button>
            <button
              onClick={() => setColumns('2')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                columns === '2' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
              title="2 Kolom (Hemat Kertas Ujian)"
            >
              2 Kolom (Kompak)
            </button>
          </div>

          {/* Toggle Media in Print */}
          <button
            onClick={() => setIncludeMedia(!includeMedia)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1 ${
              includeMedia 
                ? 'bg-sky-50 border-sky-300 text-sky-900 font-bold' 
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
            title="Sertakan stimulus media (gambar/audio listening badge) pada lembar cetak"
          >
            <span>{includeMedia ? '✓ Media Cetak: Aktif' : 'Media Cetak: Sembunyi'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>CETAK SEKARANG</span>
          </button>
        </div>
      </div>

      {/* Info notice bar */}
      <div className="print:hidden bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-3 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Distribusi Ketentuan Soal Pilihan Ganda ({soalList.length} Soal):</span>{' '}
          PG Sederhana (Option A s/d E): <strong>{countSederhana} butir</strong> · PG Kompleks MCMA (Multiple Choices Multiple Answers 5 Pernyataan): <strong>{countMcma} butir</strong> · PG Kompleks Kategori (3 Pernyataan Benar/Salah): <strong>{countKategori} butir</strong>.
          {mode === 'siswa' ? (
            <span className="block mt-0.5 text-blue-700 font-semibold">
              Mode aktif: <strong>Lembar Siswa</strong> — Kunci jawaban disembunyikan untuk keperluan ujian resmi.
            </span>
          ) : (
            <span className="block mt-0.5 text-amber-800 font-semibold">
              Mode aktif: <strong>Pedoman Guru</strong> — Kunci jawaban, pembobotan skor, dan pembahasan ditampilkan secara rinci.
            </span>
          )}
        </div>
      </div>

      {/* ================= Printable Document Canvas ================= */}
      <div className="bg-white border-2 border-slate-900 rounded-lg p-5 sm:p-7 shadow-xs text-slate-900 max-w-5xl mx-auto print:p-2 print:border-none print:shadow-none print:max-w-none">
        {/* 1. Official School Header (KOP DOKUMEN RESMI SAMA PERSIS DENGAN CONTOH) */}
        <KopDokumenResmi identitas={identitas} className="mb-1.5 print:mb-1" />

        {/* Sub-Header Judul Naskah Soal */}
        <div className="text-center py-1.5 border-b border-slate-800 print:border-black mb-2">
          <h2 className="text-sm sm:text-base font-black tracking-wider uppercase text-slate-900 leading-tight">
            NASKAH SOAL {identitas.namaJenjangTesLengkap.toUpperCase()}
          </h2>
          <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-700 mt-0.5">
            TAHUN AJARAN {identitas.tahunAjaran}
          </div>
        </div>

        {/* 2. Metadata Grid Table & Student Slip */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 my-2.5 p-2.5 bg-slate-50 border border-slate-400 rounded text-[11px]">
          {/* Left: Mata Pelajaran & Jadwal (7 cols) */}
          <div className="sm:col-span-7 space-y-1 border-b sm:border-b-0 sm:border-r border-slate-300 pb-2 sm:pb-0 pr-2">
            <div className="flex">
              <span className="w-28 font-bold text-slate-700">Mata Pelajaran</span>
              <span className="w-3">:</span>
              <span className="font-extrabold text-slate-900">{identitas.mataPelajaran}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold text-slate-700">Tingkat / Semester</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">Kelas {identitas.kelas} ({identitas.semester}) / {identitas.fase}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold text-slate-700">Kurikulum</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.kurikulum}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold text-slate-700">Alokasi Waktu</span>
              <span className="w-3">:</span>
              <span className="font-semibold text-slate-900">{identitas.alokasiWaktu}</span>
            </div>
          </div>

          {/* Right: Lembar Identitas Peserta Ujian (5 cols) */}
          <div className="sm:col-span-5 space-y-1.5 pl-0 sm:pl-2">
            <div className="flex items-center">
              <span className="w-24 font-bold text-slate-700">Nama Peserta</span>
              <span className="w-3">:</span>
              <span className="flex-1 border-b border-dotted border-slate-600 h-4"></span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-bold text-slate-700">No. Peserta / NIS</span>
              <span className="w-3">:</span>
              <span className="flex-1 border-b border-dotted border-slate-600 h-4"></span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-bold text-slate-700">Kelas / Ruang</span>
              <span className="w-3">:</span>
              <span className="flex-1 border-b border-dotted border-slate-600 h-4"></span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-bold text-slate-700">Tanda Tangan</span>
              <span className="w-3">:</span>
              <span className="flex-1 border-b border-dotted border-slate-600 h-4"></span>
            </div>
          </div>
        </div>

        {/* 3. Petunjuk Khusus Pengerjaan Soal TKA */}
        <div className="border border-slate-400 rounded p-2.5 mb-5 bg-white text-[10px] leading-relaxed">
          <div className="font-bold text-slate-900 uppercase mb-1">
            PETUNJUK UMUM & KETENTUAN PENGERJAAN SOAL PILIHAN GANDA:
          </div>
          <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
            <li>
              Periksalah dan bacalah butir-butir soal dengan teliti sebelum Anda menjawabnya.
            </li>
            <li>
              <strong>Pilihan Ganda Sederhana (Option A s/d E):</strong> Pilihlah satu jawaban yang paling tepat dengan menyilang (X) atau menghitamkan bulatan pada huruf A, B, C, D, atau E pada lembar jawab.
            </li>
            <li>
              <strong>Pilihan Ganda Kompleks MCMA (Multiple Choices Multiple Answers):</strong> Berikan tanda centang [✓] pada kotak di depan setiap pernyataan yang Anda anggap BENAR. Jawaban benar dapat lebih dari satu pernyataan dari lima pernyataan yang disediakan.
            </li>
            <li>
              <strong>Pilihan Ganda Kompleks Kategori (Tiga Pernyataan):</strong> Tentukan kategori <em>Benar</em> atau <em>Salah</em> (atau <em>Sesuai</em> / <em>Tidak Sesuai</em>) untuk masing-masing pernyataan dengan memberi tanda silang (X) atau centang [✓] pada kolom yang tepat.
            </li>
          </ol>
        </div>

        {/* 4. Butir Soal List (Single or Two-Column Layout) */}
        <div className={`gap-6 ${columns === '2' ? 'sm:columns-2 divide-y-0' : 'space-y-5'}`}>
          {soalList.map((item) => {
            const isMcma = item.tipeSoal === 'PGK_MCMA';
            const isKategori = item.tipeSoal === 'PGK_KATEGORI';
            const isSederhana = !isMcma && !isKategori;

            return (
              <div 
                key={item.no} 
                className={`break-inside-avoid text-xs ${columns === '2' ? 'mb-5 pb-3 border-b border-slate-200' : 'pb-4 border-b border-slate-200'}`}
              >
                {/* Number & Type Badge */}
                <div className="flex items-start gap-2">
                  <span className="font-bold text-sm text-slate-900 shrink-0 w-6">
                    {item.no}.
                  </span>
                  <div className="flex-1 space-y-2">
                    {/* Header instruction / type reminder */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                        {isMcma 
                          ? 'PG Kompleks MCMA (Pilihan Ganda Lebih Dari Satu)' 
                          : isKategori 
                          ? 'PG Kompleks Kategori (Benar / Salah)' 
                          : 'Pilihan Ganda Sederhana (A - E)'}
                      </span>
                      {mode === 'guru' && (
                        <span className="text-[10px] font-black px-2 py-0.5 bg-amber-400 text-slate-950 rounded shadow-2xs">
                          Kunci: {item.kunci} (Skor: {item.skor})
                        </span>
                      )}
                    </div>

                    {/* Rumusan Soal / Stimulus */}
                    <div className="font-semibold text-slate-900 leading-relaxed text-xs whitespace-pre-line">
                      {item.rumusanSoal}
                    </div>

                    {/* Media Stimulus (Gambar / Audio / Video / Embed) */}
                    <MediaStimulusRenderer soal={item} hideInPrint={!includeMedia} />

                    {/* Option Presentation 1: PG Sederhana (A sampai E) */}
                    {isSederhana && (
                      <div className="space-y-1 pt-1 text-[11px] text-slate-800">
                        {[
                          { key: 'A', text: item.pilihanA },
                          { key: 'B', text: item.pilihanB },
                          { key: 'C', text: item.pilihanC },
                          { key: 'D', item: item.pilihanD, text: item.pilihanD },
                          { key: 'E', item: item.pilihanE, text: item.pilihanE },
                        ].filter(opt => opt.text).map(({ key, text }) => {
                          const isCorrect = mode === 'guru' && item.kunci.toUpperCase().trim() === key;
                          return (
                            <div 
                              key={key} 
                              className={`flex items-start gap-2 py-0.5 px-1 rounded ${
                                isCorrect ? 'bg-amber-100 font-bold text-amber-950' : ''
                              }`}
                            >
                              <span className="font-bold w-4 shrink-0 text-slate-700">{key}.</span>
                              <span className="flex-1 leading-snug">{text}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Option Presentation 2: PGK MCMA (5 Pernyataan) */}
                    {isMcma && (
                      <div className="space-y-1.5 pt-1 text-[11px]">
                        <div className="text-[10px] text-purple-900 font-semibold italic">
                          (Pilihlah semua jawaban yang benar dengan memberi tanda centang [✓] pada kotak):
                        </div>
                        {[
                          { key: 'A', text: item.pilihanA },
                          { key: 'B', text: item.pilihanB },
                          { key: 'C', text: item.pilihanC },
                          { key: 'D', text: item.pilihanD },
                          { key: 'E', text: item.pilihanE },
                        ].map(({ key, text }) => {
                          const isKey = mode === 'guru' && item.kunci.toUpperCase().includes(key);
                          return (
                            <div 
                              key={key} 
                              className={`flex items-start gap-2 p-1.5 rounded border ${
                                isKey 
                                  ? 'bg-purple-100 border-purple-400 font-bold text-purple-950' 
                                  : 'bg-white border-slate-300'
                              }`}
                            >
                              <div className="w-4 h-4 border-2 border-slate-700 rounded-xs flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                                {isKey ? '✓' : ''}
                              </div>
                              <span className="font-bold text-slate-700 w-24 shrink-0">Pernyataan {key}:</span>
                              <span className="flex-1 leading-snug">{text || '-'}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Option Presentation 3: PGK Kategori (3 Pernyataan) */}
                    {isKategori && (
                      <div className="pt-1 text-[11px]">
                        <div className="text-[10px] text-emerald-900 font-semibold italic mb-1">
                          (Tentukan kategori {item.kategoriLabel1 || 'Benar'} atau {item.kategoriLabel2 || 'Salah'} untuk setiap pernyataan berikut):
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-900 border-collapse">
                            <thead className="bg-[#E0F2FE] text-slate-900 font-bold border-b border-slate-900 text-center">
                              <tr>
                                <th className="p-1.5 border border-slate-900 w-8">No</th>
                                <th className="p-1.5 border border-slate-900 text-left">Pernyataan</th>
                                <th className="p-1.5 border border-slate-900 w-20">{item.kategoriLabel1 || 'Benar'}</th>
                                <th className="p-1.5 border border-slate-900 w-20">{item.kategoriLabel2 || 'Salah'}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { no: 1, text: item.pilihanA },
                                { no: 2, text: item.pilihanB },
                                { no: 3, text: item.pilihanC },
                              ].map(({ no, text }, idx) => {
                                const parts = item.kunci.split(',').map(p => p.trim());
                                const answer = parts[idx] || 'Benar';
                                const isLabel1 = answer.toLowerCase().includes('benar') || answer.toLowerCase().includes('sesuai') || answer.toLowerCase() === 'b' || answer.toLowerCase() === 'ya';

                                return (
                                  <tr key={no} className="hover:bg-slate-50">
                                    <td className="p-1.5 border border-slate-900 text-center font-bold font-mono">{no}</td>
                                    <td className="p-1.5 border border-slate-900 leading-snug">{text}</td>
                                    <td className={`p-1.5 border border-slate-900 text-center ${mode === 'guru' && isLabel1 ? 'bg-emerald-100 font-bold text-emerald-900' : ''}`}>
                                      {mode === 'guru' ? (isLabel1 ? '●' : '○') : '[   ]'}
                                    </td>
                                    <td className={`p-1.5 border border-slate-900 text-center ${mode === 'guru' && !isLabel1 ? 'bg-rose-100 font-bold text-rose-900' : ''}`}>
                                      {mode === 'guru' ? (!isLabel1 ? '●' : '○') : '[   ]'}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Teacher Explanation if mode === 'guru' */}
                    {mode === 'guru' && item.pembahasan && (
                      <div className="mt-1.5 p-2 bg-amber-50 border-l-4 border-amber-500 rounded text-[10px] text-amber-950">
                        <span className="font-bold">Pembahasan & Dimensi:</span> {item.pembahasan}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Teacher Key Summary Table at Bottom (if mode is guru) */}
        {mode === 'guru' && (
          <div className="mt-8 pt-4 border-t-2 border-slate-900 break-inside-avoid">
            <h4 className="font-bold text-xs uppercase text-slate-900 mb-2">
              REKAP PEDOMAN PENSKORAN & KUNCI JAWABAN GURU (1 s/d {soalList.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono">
              {soalList.map(s => (
                <div key={s.no} className="p-1.5 border border-slate-300 rounded bg-slate-50 flex items-center justify-between">
                  <span className="font-bold text-slate-600">No. {s.no}:</span>
                  <span className="font-black text-blue-900 truncate max-w-[110px]">{s.kunci}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Signature Block */}
        <div className="grid grid-cols-2 pt-8 px-6 text-center text-[11px] break-inside-avoid">
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
    </div>
  );
};
