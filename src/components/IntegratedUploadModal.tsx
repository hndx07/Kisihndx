import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Download, RefreshCw, X, CheckCircle2, AlertTriangle, FileJson, Copy } from 'lucide-react';
import { IdentitasSekolahGuru, DataMasterItem, DataSoalItem } from '../types';
import { parseExcelFile, parseJsonFile, downloadTemplateExcel, exportToExcel, exportToJson } from '../utils/excelHelper';

interface IntegratedUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  identitas: IdentitasSekolahGuru;
  masterList: DataMasterItem[];
  soalList: DataSoalItem[];
  onDataLoaded: (data: {
    identitas?: Partial<IdentitasSekolahGuru>;
    masterList?: DataMasterItem[];
    soalList?: DataSoalItem[];
  }) => void;
}

export const IntegratedUploadModal: React.FC<IntegratedUploadModalProps> = ({
  isOpen,
  onClose,
  identitas,
  masterList,
  soalList,
  onDataLoaded,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upload' | 'template' | 'paste'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
    details?: string;
  } | null>(null);
  const [pasteContent, setPasteContent] = useState('');
  const [pasteTarget, setPasteTarget] = useState<'soal' | 'master'>('soal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
        const parsed = await parseExcelFile(file);
        const countIdentitas = parsed.identitas ? Object.keys(parsed.identitas).length : 0;
        const countMaster = parsed.masterList?.length || 0;
        const countSoal = parsed.soalList?.length || 0;

        if (countIdentitas === 0 && countMaster === 0 && countSoal === 0) {
          throw new Error('Tidak ditemukan data yang sesuai dalam file Excel. Silakan periksa kembali nama sheet atau gunakan format template.');
        }

        onDataLoaded(parsed);
        setStatusMessage({
          type: 'success',
          text: `File Excel berhasil diunggah & diintegrasikan ke seluruh bilah!`,
          details: `Identitas diperbarui (${countIdentitas} field) · Data Master (${countMaster} item) · Data Soal (${countSoal} butir soal).`
        });
      } else if (fileName.endsWith('.json')) {
        const parsed = await parseJsonFile(file);
        onDataLoaded(parsed);
        setStatusMessage({
          type: 'success',
          text: 'File Cadangan JSON berhasil dipulihkan secara menyeluruh!',
          details: `Master: ${parsed.masterList?.length || 0} soal · Butir Soal: ${parsed.soalList?.length || 0} soal.`
        });
      } else {
        throw new Error('Format file tidak didukung. Harap unggah file .xlsx, .xls, .csv, atau .json.');
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Gagal mengunggah file',
        details: err?.message || 'Terjadi kesalahan saat memproses file.'
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePasteImport = () => {
    if (!pasteContent.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Teks kosong',
        details: 'Tempelkan data tabel terlebih dahulu dari spreadsheet.'
      });
      return;
    }

    try {
      const lines = pasteContent.trim().split('\n');
      if (pasteTarget === 'soal') {
        const newSoals: DataSoalItem[] = [];
        lines.forEach((line, idx) => {
          const cols = line.split('\t').map(c => c.trim());
          if (cols.length >= 2) {
            // Check if first column is number or text
            const firstColNum = parseInt(cols[0], 10);
            let no = isNaN(firstColNum) ? idx + 1 : firstColNum;
            let kunci: 'A' | 'B' | 'C' | 'D' | 'E' = 'A';
            let soal = '';
            let a = '', b = '', c = '', d = '', e = '';

            // Detect column layout
            if (['A', 'B', 'C', 'D', 'E'].includes(cols[1]?.toUpperCase())) {
              kunci = cols[1].toUpperCase() as any;
              soal = cols[2] || '';
              a = cols[3] || '';
              b = cols[4] || '';
              c = cols[5] || '';
              d = cols[6] || '';
              e = cols[7] || '';
            } else {
              soal = cols[1] || cols[0];
              a = cols[2] || '';
              b = cols[3] || '';
              c = cols[4] || '';
              d = cols[5] || '';
              e = cols[6] || '';
            }

            newSoals.push({
              no,
              kunci,
              rumusanSoal: soal,
              pilihanA: a,
              pilihanB: b,
              pilihanC: c,
              pilihanD: d,
              pilihanE: e || undefined,
              skor: 2
            });
          }
        });

        if (newSoals.length > 0) {
          onDataLoaded({ soalList: newSoals });
          setStatusMessage({
            type: 'success',
            text: `Berhasil mengimpor ${newSoals.length} butir soal dari salinan teks!`
          });
        }
      } else {
        // Master parse
        const newMaster: DataMasterItem[] = [];
        lines.forEach((line, idx) => {
          const cols = line.split('\t').map(c => c.trim());
          if (cols.length >= 3) {
            const firstColNum = parseInt(cols[0], 10);
            const no = isNaN(firstColNum) ? idx + 1 : firstColNum;
            newMaster.push({
              no,
              elemen: cols[1] || 'Membaca - Memirsa',
              capaianPembelajaran: cols[2] || '',
              ipk: cols[3] || '',
              materi: cols[4] || '',
              indikatorSoal: cols[5] || '',
              bentukTes: cols[6] || 'Pilihan Ganda',
              levelKognitif: (cols[7]?.includes('L3') ? 'L3 (HOTS)' : cols[7]?.includes('L1') ? 'L1 (LOTS)' : 'L2 (MOTS)') as any,
              deepLearningDimension: (cols[8]?.includes('Meaningful') ? 'Meaningful Learning' : cols[8]?.includes('Joyful') ? 'Joyful Learning' : 'Mindful Learning') as any,
              tingkatKesukaran: (cols[9]?.includes('Sukar') || cols[9]?.includes('HOTS') ? 'HOTS / Sukar' : cols[9]?.includes('Mudah') ? 'Mudah' : 'Sedang') as any,
            });
          }
        });

        if (newMaster.length > 0) {
          onDataLoaded({ masterList: newMaster });
          setStatusMessage({
            type: 'success',
            text: `Berhasil mengimpor ${newMaster.length} baris Data Master dari salinan teks!`
          });
        }
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Format teks tidak sesuai',
        details: 'Pastikan baris disalin langsung dari spreadsheet Excel / Google Sheets.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
              <Upload className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Satu Upload Terintegrasi</h3>
              <p className="text-xs text-sky-100">
                Otomatis memperbarui Data Master, Soal, & Identitas di semua bilah
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-2 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('upload')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeSubTab === 'upload'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Upload File Excel / JSON
          </button>
          <button
            onClick={() => setActiveSubTab('template')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeSubTab === 'template'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Unduh Format & Template
          </button>
          <button
            onClick={() => setActiveSubTab('paste')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeSubTab === 'paste'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Salin-Tempel (Copy-Paste)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {statusMessage && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 border ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : statusMessage.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">{statusMessage.text}</p>
                {statusMessage.details && <p className="mt-1 text-slate-600 leading-relaxed">{statusMessage.details}</p>}
              </div>
            </div>
          )}

          {activeSubTab === 'upload' && (
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50/80 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">Klik atau Tarik File Excel ke Sini</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Mendukung file .xlsx, .xls, .csv, atau file cadangan .json
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-blue-600 font-medium bg-blue-100/70 px-3 py-1 rounded-full">
                  <span>Mendeteksi otomatis Sheet: IDENTITAS, DATA MASTER, dan DATA SOAL</span>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx, .xls, .csv, .json"
                  className="hidden" 
                />
              </div>

              {isProcessing && (
                <div className="flex items-center justify-center gap-2 py-3 text-xs text-blue-700 font-medium">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memproses dan mendistribusikan data ke seluruh bilah aplikasi...</span>
                </div>
              )}

              {/* Data Summary Currently Active */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                  <span>Data Aktif Saat Ini di Sistem:</span>
                  <span className="text-[11px] font-normal text-slate-500">Tersinkronisasi otomatis</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <span className="block text-[11px] text-slate-500">Identitas Sekolah</span>
                    <span className="font-bold text-xs text-slate-800 truncate block mt-0.5">
                      {identitas.namaSekolah || '-'}
                    </span>
                    <span className="text-[10px] text-blue-600 block">{identitas.mataPelajaran}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <span className="block text-[11px] text-slate-500">Data Master</span>
                    <span className="font-black text-sm text-slate-800 block mt-0.5">
                      {masterList.length} Baris
                    </span>
                    <span className="text-[10px] text-emerald-600 block">CP, IPK, & Deep Learning</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <span className="block text-[11px] text-slate-500">Data Soal</span>
                    <span className="font-black text-sm text-slate-800 block mt-0.5">
                      {soalList.length} Butir
                    </span>
                    <span className="text-[10px] text-amber-600 block">Kunci & Pilihan A-E</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'template' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-1">Panduan Template Excel Terpadu:</p>
                File template Excel memuat 3 sheet utama yang sudah diformat sesuai standar Kurikulum Merdeka & Deep Learning:
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
                  <li><strong>Sheet 1 (IDENTITAS):</strong> Nama sekolah, kepala sekolah, guru penyusun, jenjang tes, alokasi waktu.</li>
                  <li><strong>Sheet 2 (DATA MASTER):</strong> Elemen, Capaian Pembelajaran, IPK/ATP, Materi, Indikator Soal, Level Kognitif, Dimensi Deep Learning.</li>
                  <li><strong>Sheet 3 (DATA SOAL):</strong> Nomor soal, kunci jawaban (A/B/C/D/E), rumusan butir soal, dan pilihan jawaban.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => downloadTemplateExcel(identitas, masterList, soalList)}
                  className="flex items-center justify-center gap-2.5 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Template Excel (.xlsx)</span>
                </button>

                <button
                  onClick={() => exportToExcel(identitas, masterList, soalList)}
                  className="flex items-center justify-center gap-2.5 p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-xs"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Ekspor Data Lengkap ke Excel</span>
                </button>

                <button
                  onClick={() => exportToJson(identitas, masterList, soalList)}
                  className="flex items-center justify-center gap-2.5 p-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold text-xs transition-colors shadow-xs"
                >
                  <FileJson className="w-4 h-4" />
                  <span>Unduh File Cadangan (JSON)</span>
                </button>
              </div>
            </div>
          )}

          {activeSubTab === 'paste' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Pilih Target Data Impor:</span>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setPasteTarget('soal')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      pasteTarget === 'soal' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Data Butir Soal
                  </button>
                  <button
                    onClick={() => setPasteTarget('master')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      pasteTarget === 'master' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Data Master / Kisi-Kisi
                  </button>
                </div>
              </div>

              <textarea
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder={
                  pasteTarget === 'soal'
                    ? 'Salin dan tempel baris tabel soal di sini (No [Tab] Kunci [Tab] Rumusan Soal [Tab] Pilihan A [Tab] Pilihan B [Tab] Pilihan C [Tab] Pilihan D)...'
                    : 'Salin dan tempel baris tabel kisi-kisi di sini (No [Tab] Elemen [Tab] CP [Tab] IPK [Tab] Materi [Tab] Indikator)...'
                }
                rows={7}
                className="w-full text-xs font-mono p-3 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />

              <div className="flex justify-end">
                <button
                  onClick={handlePasteImport}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Proses dan Terapkan ke Sistem</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Integrasi realtime: Perubahan langsung aktif di Kartu Soal & Kisi-Kisi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
          >
            Selesai / Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
