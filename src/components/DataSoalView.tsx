import React, { useState } from 'react';
import { DataSoalItem, TipePilihanGanda, MediaType } from '../types';
import { MediaStimulusRenderer } from './MediaStimulusRenderer';
import { 
  ArrowLeft, 
  Upload, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Eye, 
  Layers, 
  CheckSquare, 
  ListFilter,
  FileSpreadsheet,
  HelpCircle,
  Sparkles,
  Image,
  Video,
  Music,
  Code,
  Film,
  Volume2,
  Globe,
  ExternalLink
} from 'lucide-react';

interface DataSoalViewProps {
  soalList: DataSoalItem[];
  onUpdateSoalList: (newList: DataSoalItem[]) => void;
  onBackToMenu: () => void;
  onOpenUpload: () => void;
  onNavigateToKartu: (soalNo: number) => void;
  onNavigateToMedia?: (soalNo: number) => void;
}

export const DataSoalView: React.FC<DataSoalViewProps> = ({
  soalList,
  onUpdateSoalList,
  onBackToMenu,
  onOpenUpload,
  onNavigateToKartu,
  onNavigateToMedia,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterKunci, setFilterKunci] = useState<string>('ALL');
  const [editingNo, setEditingNo] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<Partial<DataSoalItem>>({});

  const filteredSoal = soalList.filter(s => {
    const sType = s.tipeSoal || 'PG_SEDERHANA';
    const matchesType = filterType === 'ALL' || sType === filterType;

    const matchesSearch = 
      s.rumusanSoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilihanA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilihanB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilihanC.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.pilihanD && s.pilihanD.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.pilihanE && s.pilihanE.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.no.toString() === searchTerm.trim() ||
      s.kunci.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesKunci = filterKunci === 'ALL' || s.kunci.includes(filterKunci);

    return matchesType && matchesSearch && matchesKunci;
  });

  const countSederhana = soalList.filter(s => (!s.tipeSoal || s.tipeSoal === 'PG_SEDERHANA')).length;
  const countMcma = soalList.filter(s => s.tipeSoal === 'PGK_MCMA').length;
  const countKategori = soalList.filter(s => s.tipeSoal === 'PGK_KATEGORI').length;

  const handleStartEdit = (item: DataSoalItem) => {
    setEditingNo(item.no);
    setEditBuffer({ 
      ...item,
      tipeSoal: item.tipeSoal || 'PG_SEDERHANA',
      kategoriLabel1: item.kategoriLabel1 || 'Benar',
      kategoriLabel2: item.kategoriLabel2 || 'Salah',
    });
  };

  const handleSaveEdit = (no: number) => {
    const updated = soalList.map(item => {
      if (item.no === no) {
        return { 
          ...item, 
          ...editBuffer,
          tipeSoal: editBuffer.tipeSoal || item.tipeSoal || 'PG_SEDERHANA'
        } as DataSoalItem;
      }
      return item;
    });
    onUpdateSoalList(updated);
    setEditingNo(null);
    setEditBuffer({});
  };

  const handleAddQuestion = (type: TipePilihanGanda = 'PG_SEDERHANA') => {
    const nextNo = soalList.length > 0 ? Math.max(...soalList.map(s => s.no)) + 1 : 1;
    let newItem: DataSoalItem;

    if (type === 'PGK_MCMA') {
      newItem = {
        no: nextNo,
        tipeSoal: 'PGK_MCMA',
        kunci: 'A, C, D',
        rumusanSoal: 'Tuliskan stimulus & pertanyaan MCMA di sini... (Pilihlah jawaban yang benar! Jawaban dapat lebih dari satu dari lima pernyataan berikut):',
        pilihanA: 'Pernyataan 1 yang dapat dipilih siswa',
        pilihanB: 'Pernyataan 2 yang dapat dipilih siswa',
        pilihanC: 'Pernyataan 3 yang dapat dipilih siswa',
        pilihanD: 'Pernyataan 4 yang dapat dipilih siswa',
        pilihanE: 'Pernyataan 5 yang dapat dipilih siswa',
        skor: 3,
        pembahasan: 'Pembahasan kunci kombinasi multi-jawaban benar.'
      };
    } else if (type === 'PGK_KATEGORI') {
      newItem = {
        no: nextNo,
        tipeSoal: 'PGK_KATEGORI',
        kunci: 'Benar, Salah, Benar',
        rumusanSoal: 'Tuliskan stimulus bacaan di sini...\nTentukan kategori Benar atau Salah untuk masing-masing pernyataan berikut berdasarkan informasi di atas:',
        pilihanA: 'Pernyataan 1 untuk dianalisis kategori kebenarannya',
        pilihanB: 'Pernyataan 2 untuk dianalisis kategori kebenarannya',
        pilihanC: 'Pernyataan 3 untuk dianalisis kategori kebenarannya',
        pilihanD: '-',
        pilihanE: '-',
        kategoriLabel1: 'Benar',
        kategoriLabel2: 'Salah',
        skor: 3,
        pembahasan: 'P1: Benar. P2: Salah. P3: Benar.'
      };
    } else {
      newItem = {
        no: nextNo,
        tipeSoal: 'PG_SEDERHANA',
        kunci: 'A',
        rumusanSoal: 'Tuliskan rumusan butir soal pilihan ganda sederhana di sini...',
        pilihanA: 'Pilihan jawaban A',
        pilihanB: 'Pilihan jawaban B',
        pilihanC: 'Pilihan jawaban C',
        pilihanD: 'Pilihan jawaban D',
        pilihanE: 'Pilihan jawaban E',
        skor: 2,
        pembahasan: 'Pembahasan dan argumen kunci jawaban.'
      };
    }

    onUpdateSoalList([...soalList, newItem]);
    handleStartEdit(newItem);
  };

  const handleDeleteQuestion = (no: number) => {
    if (!window.confirm(`Hapus butir soal No. ${no}?`)) return;
    const updated = soalList.filter(s => s.no !== no).map((s, idx) => ({ ...s, no: idx + 1 }));
    onUpdateSoalList(updated);
  };

  // Helper for toggling MCMA option keys
  const toggleMcmaKey = (option: string) => {
    const currentKeys = (editBuffer.kunci || '')
      .split(',')
      .map(k => k.trim().toUpperCase())
      .filter(Boolean);
    
    let newKeys: string[];
    if (currentKeys.includes(option)) {
      newKeys = currentKeys.filter(k => k !== option);
    } else {
      newKeys = [...currentKeys, option].sort();
    }
    setEditBuffer({ ...editBuffer, kunci: newKeys.join(', ') || 'A' });
  };

  // Helper for updating Kategori statement key (index 0, 1, 2)
  const updateKategoriKey = (statementIndex: number, value: string) => {
    let parts = (editBuffer.kunci || 'Benar, Benar, Benar')
      .split(',')
      .map(p => p.trim());
    
    while (parts.length < 3) parts.push('Benar');
    parts[statementIndex] = value;
    setEditBuffer({ ...editBuffer, kunci: parts.join(', ') });
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
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
              <span>DATA BUTIR SOAL & KUNCI</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                {soalList.length} Butir Soal
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Format Ketentuan TKA: PG Sederhana (A-E), PGK MCMA (5 Pernyataan), & PGK Kategori (3 Pernyataan)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenUpload}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Spreadsheet</span>
          </button>

          {/* Quick Add Buttons by Type */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => handleAddQuestion('PG_SEDERHANA')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title="Tambah Soal Pilihan Ganda Sederhana (Option A s/d E)"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ PG (A-E)</span>
            </button>

            <button
              onClick={() => handleAddQuestion('PGK_MCMA')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title="Tambah Soal PG Kompleks MCMA (Multiple Choices Multiple Answers - 5 Pernyataan)"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ MCMA (5 Pernyataan)</span>
            </button>

            <button
              onClick={() => handleAddQuestion('PGK_KATEGORI')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title="Tambah Soal PG Kompleks Kategori (3 Pernyataan Benar/Salah)"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Kategori (3 Pernyataan)</span>
            </button>
          </div>
        </div>
      </div>

      {/* TKA Question Type Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div 
          onClick={() => setFilterType(filterType === 'PG_SEDERHANA' ? 'ALL' : 'PG_SEDERHANA')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            filterType === 'PG_SEDERHANA'
              ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-400/20'
              : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
              Ketentuan 1
            </span>
            <span className="text-xs font-black text-blue-700">{countSederhana} Butir</span>
          </div>
          <h4 className="font-extrabold text-xs text-slate-800 mt-2">PG Sederhana (Option A - E)</h4>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Satu jawaban benar dari opsi A, B, C, D, sampai E.
          </p>
        </div>

        <div 
          onClick={() => setFilterType(filterType === 'PGK_MCMA' ? 'ALL' : 'PGK_MCMA')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            filterType === 'PGK_MCMA'
              ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400/20'
              : 'bg-white border-slate-200 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
              Ketentuan 2
            </span>
            <span className="text-xs font-black text-purple-700">{countMcma} Butir</span>
          </div>
          <h4 className="font-extrabold text-xs text-slate-800 mt-2">PG Kompleks MCMA (5 Pernyataan)</h4>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Multiple Answers (kotak centang), jawaban benar dapat lebih dari satu.
          </p>
        </div>

        <div 
          onClick={() => setFilterType(filterType === 'PGK_KATEGORI' ? 'ALL' : 'PGK_KATEGORI')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            filterType === 'PGK_KATEGORI'
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-400/20'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
              Ketentuan 3
            </span>
            <span className="text-xs font-black text-emerald-700">{countKategori} Butir</span>
          </div>
          <h4 className="font-extrabold text-xs text-slate-800 mt-2">PG Kompleks Kategori (3 Pernyataan)</h4>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Matriks evaluasi Benar/Salah (atau Sesuai/Tidak Sesuai) untuk 3 pernyataan.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari rumusan soal, stimulus, pernyataan, opsi jawaban, atau kunci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>

        {/* Filter by Bentuk Soal */}
        <div className="flex items-center gap-1.5">
          <ListFilter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-700 text-xs cursor-pointer"
          >
            <option value="ALL">Semua Bentuk ({soalList.length})</option>
            <option value="PG_SEDERHANA">PG Sederhana A-E ({countSederhana})</option>
            <option value="PGK_MCMA">PGK MCMA 5 Pernyataan ({countMcma})</option>
            <option value="PGK_KATEGORI">PGK Kategori 3 Pernyataan ({countKategori})</option>
          </select>
        </div>
      </div>

      {/* Active Question Editor Modal/In-place drawer if editing */}
      {editingNo !== null && (
        <div className="bg-amber-50/80 border-2 border-amber-400 rounded-xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black flex items-center justify-center text-xs">
                {editingNo}
              </span>
              <h3 className="font-black text-slate-900 text-sm">
                Edit Butir Soal No. {editingNo}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Bentuk Soal:</span>
              <select
                value={editBuffer.tipeSoal || 'PG_SEDERHANA'}
                onChange={(e) => {
                  const newType = e.target.value as TipePilihanGanda;
                  let newKey = editBuffer.kunci || 'A';
                  if (newType === 'PGK_MCMA' && !newKey.includes(',')) {
                    newKey = 'A, C, D';
                  } else if (newType === 'PGK_KATEGORI' && !newKey.includes('Benar') && !newKey.includes('Salah')) {
                    newKey = 'Benar, Salah, Benar';
                  } else if (newType === 'PG_SEDERHANA' && newKey.length > 1) {
                    newKey = 'A';
                  }
                  setEditBuffer({ 
                    ...editBuffer, 
                    tipeSoal: newType, 
                    kunci: newKey,
                    skor: newType === 'PG_SEDERHANA' ? 2 : 3
                  });
                }}
                className="px-2.5 py-1 bg-white border-2 border-amber-400 rounded-lg font-black text-slate-800 text-xs"
              >
                <option value="PG_SEDERHANA">Pilihan Ganda Sederhana (Option A - E)</option>
                <option value="PGK_MCMA">Pilihan Ganda Kompleks MCMA (5 Pernyataan)</option>
                <option value="PGK_KATEGORI">Pilihan Ganda Kompleks Kategori (3 Pernyataan)</option>
              </select>
            </div>
          </div>

          {/* Form fields adapted by type */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Rumusan Butir Soal / Stimulus:
              </label>
              <textarea
                rows={3}
                value={editBuffer.rumusanSoal || ''}
                onChange={(e) => setEditBuffer({ ...editBuffer, rumusanSoal: e.target.value })}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-800"
                placeholder="Tuliskan teks stimulus bacaan dan rumusan pertanyaan..."
              />
            </div>

            {/* Type 1: PG Sederhana (A - E) */}
            {(!editBuffer.tipeSoal || editBuffer.tipeSoal === 'PG_SEDERHANA') && (
              <div className="space-y-2 p-3 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-800">Pilihan Jawaban (A sampai E):</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-semibold">Pilih Kunci:</span>
                    <div className="flex items-center gap-1">
                      {['A', 'B', 'C', 'D', 'E'].map(k => (
                        <button
                          type="button"
                          key={k}
                          onClick={() => setEditBuffer({ ...editBuffer, kunci: k })}
                          className={`w-6 h-6 rounded-md font-black text-xs transition-colors ${
                            editBuffer.kunci === k
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 font-black text-slate-700">A.</span>
                    <input
                      type="text"
                      value={editBuffer.pilihanA || ''}
                      onChange={(e) => setEditBuffer({ ...editBuffer, pilihanA: e.target.value })}
                      className="flex-1 p-1.5 border border-slate-300 rounded text-xs"
                      placeholder="Pilihan A"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 font-black text-slate-700">B.</span>
                    <input
                      type="text"
                      value={editBuffer.pilihanB || ''}
                      onChange={(e) => setEditBuffer({ ...editBuffer, pilihanB: e.target.value })}
                      className="flex-1 p-1.5 border border-slate-300 rounded text-xs"
                      placeholder="Pilihan B"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 font-black text-slate-700">C.</span>
                    <input
                      type="text"
                      value={editBuffer.pilihanC || ''}
                      onChange={(e) => setEditBuffer({ ...editBuffer, pilihanC: e.target.value })}
                      className="flex-1 p-1.5 border border-slate-300 rounded text-xs"
                      placeholder="Pilihan C"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 font-black text-slate-700">D.</span>
                    <input
                      type="text"
                      value={editBuffer.pilihanD || ''}
                      onChange={(e) => setEditBuffer({ ...editBuffer, pilihanD: e.target.value })}
                      className="flex-1 p-1.5 border border-slate-300 rounded text-xs"
                      placeholder="Pilihan D"
                    />
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <span className="w-5 font-black text-slate-700">E.</span>
                    <input
                      type="text"
                      value={editBuffer.pilihanE || ''}
                      onChange={(e) => setEditBuffer({ ...editBuffer, pilihanE: e.target.value })}
                      className="flex-1 p-1.5 border border-slate-300 rounded text-xs"
                      placeholder="Pilihan E"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Type 2: PGK MCMA (5 Pernyataan) */}
            {editBuffer.tipeSoal === 'PGK_MCMA' && (
              <div className="space-y-2 p-3 bg-purple-50/60 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-purple-200">
                  <span className="font-bold text-purple-950">
                    Lima Pernyataan (Centang kotak sebagai kunci jawaban benar):
                  </span>
                  <span className="text-[11px] font-bold text-purple-700">
                    Kunci Aktif: <strong className="px-2 py-0.5 bg-purple-200 rounded">{editBuffer.kunci}</strong>
                  </span>
                </div>

                {[
                  { key: 'A', field: 'pilihanA', label: 'Pernyataan 1 (A)' },
                  { key: 'B', field: 'pilihanB', label: 'Pernyataan 2 (B)' },
                  { key: 'C', field: 'pilihanC', label: 'Pernyataan 3 (C)' },
                  { key: 'D', field: 'pilihanD', label: 'Pernyataan 4 (D)' },
                  { key: 'E', field: 'pilihanE', label: 'Pernyataan 5 (E)' },
                ].map(({ key, field, label }) => {
                  const isChecked = (editBuffer.kunci || '').toUpperCase().includes(key);
                  return (
                    <div key={key} className="flex items-center gap-2.5 bg-white p-2 rounded-lg border border-purple-100">
                      <button
                        type="button"
                        onClick={() => toggleMcmaKey(key)}
                        className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-purple-600 text-white shadow-2xs' 
                            : 'bg-slate-100 border border-slate-300 text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Klik untuk tandai sebagai kunci benar"
                      >
                        {isChecked ? '✓' : ''}
                      </button>
                      <span className="font-bold text-slate-700 w-28 shrink-0">{label}:</span>
                      <input
                        type="text"
                        value={(editBuffer as any)[field] || ''}
                        onChange={(e) => setEditBuffer({ ...editBuffer, [field]: e.target.value })}
                        className="flex-1 p-1 bg-transparent border-b border-slate-300 focus:border-purple-600 text-xs"
                        placeholder={`Tuliskan teks ${label}...`}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Type 3: PGK Kategori (3 Pernyataan) */}
            {editBuffer.tipeSoal === 'PGK_KATEGORI' && (
              <div className="space-y-3 p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-emerald-200">
                  <span className="font-bold text-emerald-950">
                    Tiga Pernyataan Kategori (Tentukan respon Benar/Salah):
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">Label Kategori:</span>
                    <input
                      type="text"
                      value={editBuffer.kategoriLabel1 || 'Benar'}
                      onChange={(e) => setEditBuffer({ ...editBuffer, kategoriLabel1: e.target.value })}
                      className="w-16 p-1 text-center bg-white border border-emerald-300 rounded font-bold text-emerald-800"
                    />
                    <span>/</span>
                    <input
                      type="text"
                      value={editBuffer.kategoriLabel2 || 'Salah'}
                      onChange={(e) => setEditBuffer({ ...editBuffer, kategoriLabel2: e.target.value })}
                      className="w-16 p-1 text-center bg-white border border-emerald-300 rounded font-bold text-rose-800"
                    />
                  </div>
                </div>

                {[
                  { idx: 0, field: 'pilihanA', label: 'Pernyataan 1' },
                  { idx: 1, field: 'pilihanB', label: 'Pernyataan 2' },
                  { idx: 2, field: 'pilihanC', label: 'Pernyataan 3' },
                ].map(({ idx, field, label }) => {
                  const currentParts = (editBuffer.kunci || 'Benar, Benar, Benar').split(',').map(p => p.trim());
                  const currentVal = currentParts[idx] || editBuffer.kategoriLabel1 || 'Benar';
                  const label1 = editBuffer.kategoriLabel1 || 'Benar';
                  const label2 = editBuffer.kategoriLabel2 || 'Salah';

                  return (
                    <div key={idx} className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                      <span className="font-bold text-slate-800 w-24 shrink-0">{label}:</span>
                      <input
                        type="text"
                        value={(editBuffer as any)[field] || ''}
                        onChange={(e) => setEditBuffer({ ...editBuffer, [field]: e.target.value })}
                        className="flex-1 min-w-[200px] p-1 border border-slate-300 rounded text-xs"
                        placeholder={`Tuliskan ${label}...`}
                      />
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateKategoriKey(idx, label1)}
                          className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                            currentVal === label1 
                              ? 'bg-emerald-600 text-white shadow-2xs' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {label1}
                        </button>
                        <button
                          type="button"
                          onClick={() => updateKategoriKey(idx, label2)}
                          className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                            currentVal === label2 
                              ? 'bg-rose-600 text-white shadow-2xs' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {label2}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. Manual Edit Stimulus Media & Embed Code */}
            <div className="p-3.5 bg-sky-50/80 border border-sky-300 rounded-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-sky-200">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-blue-600" />
                  <span className="font-extrabold text-xs text-slate-900">
                    Stimulus Multimedia & Embed Code (Gambar / Video / Suara / Iframe)
                  </span>
                </div>
                {onNavigateToMedia && editingNo !== null && (
                  <button
                    type="button"
                    onClick={() => onNavigateToMedia(editingNo)}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-blue-300 shadow-2xs cursor-pointer"
                    title="Buka tampilan editor media lengkap di navbar"
                  >
                    <span>Buka Editor Media di Navbar</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipe Media Stimulus:</label>
                  <select
                    value={editBuffer.mediaType || 'none'}
                    onChange={(e) => setEditBuffer({ ...editBuffer, mediaType: e.target.value as MediaType })}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded font-bold text-xs cursor-pointer"
                  >
                    <option value="none">Tidak Ada Media (Teks Murni)</option>
                    <option value="image">Gambar / Diagram / Infografis</option>
                    <option value="audio">Suara / Audio Listening (MP3)</option>
                    <option value="video">Video Stimulus (YouTube / MP4)</option>
                    <option value="embed">Embed Code Custom HTML / Iframe</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Judul / Keterangan Media (Caption):</label>
                  <input
                    type="text"
                    value={editBuffer.mediaCaption || ''}
                    onChange={(e) => setEditBuffer({ ...editBuffer, mediaCaption: e.target.value })}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                    placeholder="Contoh: Gambar 1. Denah Lokasi, atau Audio Track 03 (Listening Conversation)..."
                  />
                </div>
              </div>

              {editBuffer.mediaType && editBuffer.mediaType !== 'none' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      URL Media Langsung (Gambar / Audio MP3 / Link YouTube):
                    </label>
                    <input
                      type="text"
                      value={editBuffer.mediaUrl || ''}
                      onChange={(e) => setEditBuffer({ ...editBuffer, mediaUrl: e.target.value })}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                      placeholder="https://contoh.com/gambar.jpg atau link YouTube https://youtube.com/watch?v=..."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700">
                        Manual Embed Code HTML (Iframe, &lt;img&gt;, &lt;audio&gt;, &lt;video&gt;):
                      </label>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] text-slate-500 font-semibold">Sisipkan Template Cepat:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditBuffer({
                              ...editBuffer,
                              mediaType: 'image',
                              embedCode: `<img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80" alt="Stimulus" class="max-h-48 mx-auto rounded-lg" />`,
                              mediaCaption: editBuffer.mediaCaption || `Gambar Stimulus Soal No. ${editingNo}`
                            });
                          }}
                          className="px-1.5 py-0.5 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[10px] font-bold text-slate-700 cursor-pointer"
                        >
                          + Tag &lt;img&gt;
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditBuffer({
                              ...editBuffer,
                              mediaType: 'audio',
                              embedCode: `<audio controls class="w-full"><source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">Browser Anda tidak mendukung audio.</audio>`,
                              mediaCaption: editBuffer.mediaCaption || `Audio Listening Soal No. ${editingNo}`
                            });
                          }}
                          className="px-1.5 py-0.5 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[10px] font-bold text-slate-700 cursor-pointer"
                        >
                          + Tag &lt;audio&gt;
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditBuffer({
                              ...editBuffer,
                              mediaType: 'video',
                              embedCode: `<iframe width="100%" height="220" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video Stimulus" frameborder="0" allowfullscreen></iframe>`,
                              mediaCaption: editBuffer.mediaCaption || `Video Stimulus Soal No. ${editingNo}`
                            });
                          }}
                          className="px-1.5 py-0.5 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[10px] font-bold text-slate-700 cursor-pointer"
                        >
                          + Iframe Video
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={editBuffer.embedCode || ''}
                      onChange={(e) => setEditBuffer({ ...editBuffer, embedCode: e.target.value })}
                      className="w-full p-2 bg-slate-900 text-sky-300 font-mono text-xs rounded-lg border border-slate-700"
                      placeholder="Ketik atau tempelkan embed code di sini: <iframe src=...>, <audio ...>, <img ...>"
                    />
                  </div>

                  {/* Live Preview of the media */}
                  {(editBuffer.mediaUrl || editBuffer.embedCode) && (
                    <div className="bg-white p-3 rounded-lg border border-sky-200">
                      <div className="text-[11px] font-extrabold text-slate-700 mb-1 flex items-center justify-between">
                        <span>Pratinjau Stimulus Media:</span>
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ Terproteksi aman agar hasil cetak dokumen tetap rapi
                        </span>
                      </div>
                      <MediaStimulusRenderer
                        soal={{
                          ...(editBuffer as DataSoalItem),
                          no: editingNo || 1,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Skor Bobot Butir Soal:</label>
                <input
                  type="number"
                  value={editBuffer.skor ?? 2}
                  onChange={(e) => setEditBuffer({ ...editBuffer, skor: parseInt(e.target.value, 10) || 2 })}
                  className="w-28 p-1.5 bg-white border border-slate-300 rounded text-xs font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pembahasan & Penjelasan Kunci:</label>
                <input
                  type="text"
                  value={editBuffer.pembahasan || ''}
                  onChange={(e) => setEditBuffer({ ...editBuffer, pembahasan: e.target.value })}
                  className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                  placeholder="Keterangan pembahasan atau rujukan materi..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200">
              <button
                type="button"
                onClick={() => {
                  setEditingNo(null);
                  setEditBuffer({});
                }}
                className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleSaveEdit(editingNo)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spreadsheet Table View (Matching Red Header of Page 7-10) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-300 overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#EF4444] text-white font-bold sticky top-0 z-10 border-b border-red-700 text-[11px]">
              <tr>
                <th className="p-2.5 border-r border-red-400 text-center w-12">No.</th>
                <th className="p-2.5 border-r border-red-400 text-center w-28">Bentuk Soal</th>
                <th className="p-2.5 border-r border-red-400 text-center min-w-[80px]">Kunci</th>
                <th className="p-2.5 border-r border-red-400 min-w-[280px]">Rumusan Butir Soal</th>
                <th className="p-2.5 border-r border-red-400 text-center min-w-[150px]">Media / Embed</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan A / Pernyataan 1</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan B / Pernyataan 2</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan C / Pernyataan 3</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan D / Pernyataan 4</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan E / Pernyataan 5</th>
                <th className="p-2.5 border-r border-red-400 text-center w-20">Kategori</th>
                <th className="p-2.5 border-r border-red-400 text-center w-14">Skor</th>
                <th className="p-2.5 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredSoal.map((item) => {
                const isMcma = item.tipeSoal === 'PGK_MCMA';
                const isKategori = item.tipeSoal === 'PGK_KATEGORI';
                const hasMedia = item.mediaType && item.mediaType !== 'none' && (item.mediaUrl || item.embedCode);

                return (
                  <tr 
                    key={item.no} 
                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    onDoubleClick={() => handleStartEdit(item)}
                  >
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold font-mono text-slate-700 bg-slate-50">
                      {item.no}
                    </td>

                    {/* Badge Bentuk Soal */}
                    <td className="p-2 border-r border-slate-200 text-center">
                      {isMcma ? (
                        <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-800 font-extrabold text-[10px] rounded">
                          PGK MCMA
                        </span>
                      ) : isKategori ? (
                        <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded">
                          PGK Kategori
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 font-extrabold text-[10px] rounded">
                          PG (A-E)
                        </span>
                      )}
                    </td>

                    {/* Kunci Display */}
                    <td className="p-2 border-r border-slate-200 text-center">
                      {isMcma ? (
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-purple-600 text-white font-black text-[11px] shadow-2xs whitespace-nowrap">
                          {item.kunci}
                        </span>
                      ) : isKategori ? (
                        <span className="inline-block px-1.5 py-0.5 bg-emerald-600 text-white font-bold text-[10px] rounded leading-tight">
                          {item.kunci}
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 font-black text-xs">
                          {item.kunci}
                        </span>
                      )}
                    </td>

                    {/* Rumusan Soal */}
                    <td className="p-2.5 border-r border-slate-200 font-medium text-slate-800 leading-relaxed">
                      <div className="line-clamp-3">
                        {item.rumusanSoal}
                      </div>
                    </td>

                    {/* Media / Embed Code Column */}
                    <td className="p-2 border-r border-slate-200 text-center align-top bg-slate-50/50">
                      {hasMedia ? (
                        <div className="space-y-1 flex flex-col items-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-black text-[10px] ${
                            item.mediaType === 'image' ? 'bg-sky-100 text-sky-800 border border-sky-300' :
                            item.mediaType === 'audio' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            item.mediaType === 'video' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                            'bg-purple-100 text-purple-800 border border-purple-300'
                          }`}>
                            {item.mediaType === 'image' && '🖼️ Gambar'}
                            {item.mediaType === 'audio' && '🎧 Audio'}
                            {item.mediaType === 'video' && '🎬 Video'}
                            {item.mediaType === 'embed' && '🌐 Embed'}
                          </span>
                          {item.mediaCaption && (
                            <span className="text-[9.5px] text-slate-600 italic block line-clamp-1 max-w-[130px]" title={item.mediaCaption}>
                              {item.mediaCaption}
                            </span>
                          )}
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartEdit(item);
                              }}
                              className="text-[10px] font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            {onNavigateToMedia && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigateToMedia(item.no);
                                }}
                                className="text-[10px] font-bold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer flex items-center gap-0.5"
                                title="Buka di tab Media & Embed navbar"
                              >
                                <span>Navbar</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 py-1">
                          <span className="text-[10px] text-slate-400 italic">Tanpa Media</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit({ ...item, mediaType: 'image' });
                            }}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-100/60 px-2 py-0.5 rounded border border-dashed border-blue-300 transition-colors flex items-center gap-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>+ Embed</span>
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Pilihan A */}
                    <td className={`p-2.5 border-r border-slate-200 text-xs ${
                      !isMcma && !isKategori && item.kunci === 'A' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'
                    }`}>
                      {item.pilihanA}
                    </td>

                    {/* Pilihan B */}
                    <td className={`p-2.5 border-r border-slate-200 text-xs ${
                      !isMcma && !isKategori && item.kunci === 'B' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'
                    }`}>
                      {item.pilihanB}
                    </td>

                    {/* Pilihan C */}
                    <td className={`p-2.5 border-r border-slate-200 text-xs ${
                      !isMcma && !isKategori && item.kunci === 'C' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'
                    }`}>
                      {item.pilihanC}
                    </td>

                    {/* Pilihan D */}
                    <td className={`p-2.5 border-r border-slate-200 text-xs ${
                      !isMcma && !isKategori && item.kunci === 'D' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'
                    }`}>
                      {item.pilihanD || '-'}
                    </td>

                    {/* Pilihan E */}
                    <td className={`p-2.5 border-r border-slate-200 text-xs ${
                      !isMcma && !isKategori && item.kunci === 'E' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'
                    }`}>
                      {item.pilihanE || '-'}
                    </td>

                    {/* Kategori label */}
                    <td className="p-2 border-r border-slate-200 text-center text-[10px] text-slate-500">
                      {isKategori ? `${item.kategoriLabel1 || 'B'} / ${item.kategoriLabel2 || 'S'}` : '-'}
                    </td>

                    {/* Skor */}
                    <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-700">
                      {item.skor}
                    </td>

                    {/* Actions */}
                    <td className="p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100">
                        <button
                          onClick={() => onNavigateToKartu(item.no)}
                          className="p-1 hover:bg-blue-100 text-blue-700 rounded cursor-pointer"
                          title="Lihat Kartu Soal ini"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (onNavigateToMedia) {
                              onNavigateToMedia(item.no);
                            } else {
                              handleStartEdit(item);
                            }
                          }}
                          className="p-1 hover:bg-purple-100 text-purple-700 rounded cursor-pointer"
                          title="Edit Media / Embed Code soal ini"
                        >
                          <Image className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded cursor-pointer"
                          title="Edit butir soal"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(item.no)}
                          className="p-1 hover:bg-rose-100 text-rose-600 rounded cursor-pointer"
                          title="Hapus butir soal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
