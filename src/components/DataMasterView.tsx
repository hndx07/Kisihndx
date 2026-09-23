import React, { useState } from 'react';
import { DataMasterItem, DeepLearningDimension, LevelKognitif } from '../types';
import { ArrowLeft, Upload, FileSpreadsheet, Search, Filter, Plus, Trash2, Edit3, Check, Sparkles, Layers } from 'lucide-react';

interface DataMasterViewProps {
  masterList: DataMasterItem[];
  onUpdateMasterList: (newList: DataMasterItem[]) => void;
  onBackToMenu: () => void;
  onOpenUpload: () => void;
}

export const DataMasterView: React.FC<DataMasterViewProps> = ({
  masterList,
  onUpdateMasterList,
  onBackToMenu,
  onOpenUpload,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElemen, setSelectedElemen] = useState<string>('ALL');
  const [selectedDeepLearning, setSelectedDeepLearning] = useState<string>('ALL');
  const [editingRowNo, setEditingRowNo] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<Partial<DataMasterItem>>({});

  const elemenOptions = ['Membaca - Memirsa', 'Menyimak - Berbicara', 'Menulis - Mempresentasikan'];
  const deepLearningOptions: DeepLearningDimension[] = ['Mindful Learning', 'Meaningful Learning', 'Joyful Learning'];
  const levelOptions: LevelKognitif[] = ['L1 (LOTS)', 'L2 (MOTS)', 'L3 (HOTS)'];

  const filteredList = masterList.filter(item => {
    const matchesSearch = 
      item.materi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.indikatorSoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ipk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.capaianPembelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.no.toString() === searchTerm.trim();

    const matchesElemen = selectedElemen === 'ALL' || item.elemen === selectedElemen;
    const matchesDeep = selectedDeepLearning === 'ALL' || item.deepLearningDimension === selectedDeepLearning;

    return matchesSearch && matchesElemen && matchesDeep;
  });

  const handleStartEdit = (item: DataMasterItem) => {
    setEditingRowNo(item.no);
    setEditBuffer({ ...item });
  };

  const handleSaveEdit = (no: number) => {
    const updated = masterList.map(item => {
      if (item.no === no) {
        return { ...item, ...editBuffer } as DataMasterItem;
      }
      return item;
    });
    onUpdateMasterList(updated);
    setEditingRowNo(null);
    setEditBuffer({});
  };

  const handleFillAllCP = (cpText: string) => {
    if (!window.confirm('Terapkan Capaian Pembelajaran ini ke seluruh baris yang belum diisi?')) return;
    const updated = masterList.map(item => ({
      ...item,
      capaianPembelajaran: item.capaianPembelajaran.trim() ? item.capaianPembelajaran : cpText
    }));
    onUpdateMasterList(updated);
  };

  const handleAddNewRow = () => {
    const nextNo = masterList.length > 0 ? Math.max(...masterList.map(m => m.no)) + 1 : 1;
    const newItem: DataMasterItem = {
      no: nextNo,
      elemen: 'Membaca - Memirsa',
      capaianPembelajaran: masterList[0]?.capaianPembelajaran || '',
      ipk: 'Menguraikan ide pokok dan informasi spesifik teks',
      materi: 'Teks Interaksional',
      indikatorSoal: 'Disajikan teks, siswa dapat menentukan informasi rinci terkait isi materi',
      bentukTes: 'Pilihan Ganda',
      levelKognitif: 'L2 (MOTS)',
      deepLearningDimension: 'Mindful Learning',
      tingkatKesukaran: 'Sedang'
    };
    onUpdateMasterList([...masterList, newItem]);
    handleStartEdit(newItem);
  };

  const handleDeleteRow = (no: number) => {
    if (!window.confirm(`Hapus baris master soal No. ${no}?`)) return;
    const updated = masterList.filter(m => m.no !== no).map((m, idx) => ({ ...m, no: idx + 1 }));
    onUpdateMasterList(updated);
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
              <span>DATA MASTER (KISI-KISI UTAMA)</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                {masterList.length} Baris
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Integrasi CP, Alur Tujuan (IPK), Indikator Soal & Dimensi Deep Learning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenUpload}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Terintegrasi</span>
          </button>

          <button
            onClick={handleAddNewRow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Baris</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari materi, indikator, IPK, atau nomor soal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Elemen:</span>
            <select
              value={selectedElemen}
              onChange={(e) => setSelectedElemen(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <option value="ALL">Semua Elemen</option>
              {elemenOptions.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Deep Learning:</span>
            <select
              value={selectedDeepLearning}
              onChange={(e) => setSelectedDeepLearning(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <option value="ALL">Semua Dimensi</option>
              {deepLearningOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Master Spreadsheet Table (Styled like Page 3-6 of attached document) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-300 overflow-hidden">
        {/* Spreadsheet Top Banner Header */}
        <div className="bg-[#0284C7] text-white px-4 py-2 font-black text-xs uppercase tracking-wider flex items-center justify-between border-b border-sky-800">
          <span>INPUT DATA UNTUK KARTU SOAL & KISI-KISI</span>
          <span className="text-[11px] font-medium text-sky-100">
            Menampilkan {filteredList.length} dari {masterList.length} item
          </span>
        </div>

        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#E0F2FE] text-slate-800 font-bold sticky top-0 z-10 border-b border-sky-300 text-[11px]">
              <tr>
                <th className="p-2.5 border-r border-sky-200 text-center w-12 bg-sky-100">No</th>
                <th className="p-2.5 border-r border-sky-200 w-36">Elemen</th>
                <th className="p-2.5 border-r border-sky-200 min-w-[260px]">Capaian Pembelajaran (CP)</th>
                <th className="p-2.5 border-r border-sky-200 min-w-[220px]">IPK (Alur Tujuan)</th>
                <th className="p-2.5 border-r border-sky-200 min-w-[180px]">Materi</th>
                <th className="p-2.5 border-r border-sky-200 min-w-[220px]">Indikator Soal</th>
                <th className="p-2.5 border-r border-sky-200 w-28 text-center">Bentuk Tes</th>
                <th className="p-2.5 border-r border-sky-200 w-32 text-center">Deep Learning / Level</th>
                <th className="p-2.5 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredList.map((item) => {
                const isEditing = editingRowNo === item.no;

                if (isEditing) {
                  return (
                    <tr key={item.no} className="bg-amber-50/70 border-2 border-amber-400">
                      <td className="p-2 border-r border-slate-200 text-center font-bold font-mono">
                        {item.no}
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <select
                          value={editBuffer.elemen || item.elemen}
                          onChange={(e) => setEditBuffer({ ...editBuffer, elemen: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        >
                          {elemenOptions.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <textarea
                          rows={3}
                          value={editBuffer.capaianPembelajaran ?? item.capaianPembelajaran}
                          onChange={(e) => setEditBuffer({ ...editBuffer, capaianPembelajaran: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-[11px]"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <textarea
                          rows={2}
                          value={editBuffer.ipk ?? item.ipk}
                          onChange={(e) => setEditBuffer({ ...editBuffer, ipk: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={editBuffer.materi ?? item.materi}
                          onChange={(e) => setEditBuffer({ ...editBuffer, materi: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs font-semibold"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <textarea
                          rows={2}
                          value={editBuffer.indikatorSoal ?? item.indikatorSoal}
                          onChange={(e) => setEditBuffer({ ...editBuffer, indikatorSoal: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200 text-center">
                        <select
                          value={editBuffer.bentukTes || item.bentukTes}
                          onChange={(e) => setEditBuffer({ ...editBuffer, bentukTes: e.target.value })}
                          className="p-1 bg-white border border-slate-300 rounded text-xs"
                        >
                          <option value="Pilihan Ganda">Pilihan Ganda</option>
                          <option value="Uraian">Uraian</option>
                          <option value="Menjodohkan">Menjodohkan</option>
                        </select>
                      </td>
                      <td className="p-2 border-r border-slate-200 space-y-1 text-center">
                        <select
                          value={editBuffer.deepLearningDimension || item.deepLearningDimension}
                          onChange={(e) => setEditBuffer({ ...editBuffer, deepLearningDimension: e.target.value as any })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-[10px] font-medium"
                        >
                          {deepLearningOptions.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select
                          value={editBuffer.levelKognitif || item.levelKognitif}
                          onChange={(e) => setEditBuffer({ ...editBuffer, levelKognitif: e.target.value as any })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-[10px] font-bold"
                        >
                          {levelOptions.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleSaveEdit(item.no)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-1.5 rounded flex items-center justify-center mx-auto"
                          title="Simpan"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr 
                    key={item.no} 
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onDoubleClick={() => handleStartEdit(item)}
                  >
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold font-mono text-slate-700 bg-slate-50">
                      {item.no}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-medium text-slate-800">
                      <span className="font-semibold text-blue-900">{item.elemen}</span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                      {item.capaianPembelajaran}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-700 leading-snug">
                      {item.ipk}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-bold text-slate-800">
                      {item.materi}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-700 leading-snug">
                      {item.indikatorSoal}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center text-slate-600">
                      {item.bentukTes}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.deepLearningDimension === 'Meaningful Learning'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.deepLearningDimension === 'Joyful Learning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        {item.deepLearningDimension}
                      </span>
                      <span className={`block font-bold text-[10px] ${
                        item.levelKognitif === 'L3 (HOTS)'
                          ? 'text-rose-600'
                          : item.levelKognitif === 'L2 (MOTS)'
                          ? 'text-blue-600'
                          : 'text-slate-600'
                      }`}>
                        {item.levelKognitif}
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded"
                          title="Edit baris"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRow(item.no)}
                          className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                          title="Hapus baris"
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
