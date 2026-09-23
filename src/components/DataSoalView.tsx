import React, { useState } from 'react';
import { DataSoalItem } from '../types';
import { ArrowLeft, Upload, FileSpreadsheet, Search, Plus, Trash2, Edit3, Check, Eye, AlertCircle } from 'lucide-react';

interface DataSoalViewProps {
  soalList: DataSoalItem[];
  onUpdateSoalList: (newList: DataSoalItem[]) => void;
  onBackToMenu: () => void;
  onOpenUpload: () => void;
  onNavigateToKartu: (soalNo: number) => void;
}

export const DataSoalView: React.FC<DataSoalViewProps> = ({
  soalList,
  onUpdateSoalList,
  onBackToMenu,
  onOpenUpload,
  onNavigateToKartu,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKunci, setFilterKunci] = useState<string>('ALL');
  const [editingNo, setEditingNo] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<Partial<DataSoalItem>>({});

  const filteredSoal = soalList.filter(s => {
    const matchesSearch = 
      s.rumusanSoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilihanA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilihanB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilihanC.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilihanD.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.no.toString() === searchTerm.trim();

    const matchesKunci = filterKunci === 'ALL' || s.kunci === filterKunci;

    return matchesSearch && matchesKunci;
  });

  const handleStartEdit = (item: DataSoalItem) => {
    setEditingNo(item.no);
    setEditBuffer({ ...item });
  };

  const handleSaveEdit = (no: number) => {
    const updated = soalList.map(item => {
      if (item.no === no) {
        return { ...item, ...editBuffer } as DataSoalItem;
      }
      return item;
    });
    onUpdateSoalList(updated);
    setEditingNo(null);
    setEditBuffer({});
  };

  const handleAddQuestion = () => {
    const nextNo = soalList.length > 0 ? Math.max(...soalList.map(s => s.no)) + 1 : 1;
    const newItem: DataSoalItem = {
      no: nextNo,
      kunci: 'A',
      rumusanSoal: 'Tuliskan rumusan butir soal baru di sini...',
      pilihanA: 'Pilihan jawaban A',
      pilihanB: 'Pilihan jawaban B',
      pilihanC: 'Pilihan jawaban C',
      pilihanD: 'Pilihan jawaban D',
      pilihanE: 'Pilihan jawaban E',
      skor: 2,
    };
    onUpdateSoalList([...soalList, newItem]);
    handleStartEdit(newItem);
  };

  const handleDeleteQuestion = (no: number) => {
    if (!window.confirm(`Hapus butir soal No. ${no}?`)) return;
    const updated = soalList.filter(s => s.no !== no).map((s, idx) => ({ ...s, no: idx + 1 }));
    onUpdateSoalList(updated);
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
              Rumusan naskah soal, opsi pilihan ganda A-D/E, dan kunci jawaban
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
            onClick={handleAddQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Butir Soal</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata kunci soal, dialog, atau opsi jawaban..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Filter Kunci:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {['ALL', 'A', 'B', 'C', 'D', 'E'].map(k => (
              <button
                key={k}
                onClick={() => setFilterKunci(k)}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-colors ${
                  filterKunci === k
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {k === 'ALL' ? 'Semua' : k}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spreadsheet Soal Table (Matching exact Red-header design of Page 7-10) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-300 overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#EF4444] text-white font-bold sticky top-0 z-10 border-b border-red-700 text-[11px]">
              <tr>
                <th className="p-2.5 border-r border-red-400 text-center w-14">No. Soal</th>
                <th className="p-2.5 border-r border-red-400 text-center w-14">Kunci</th>
                <th className="p-2.5 border-r border-red-400 min-w-[280px]">Rumusan Butir Soal</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan A</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan B</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan C</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan D</th>
                <th className="p-2.5 border-r border-red-400 min-w-[150px]">Pilihan E</th>
                <th className="p-2.5 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredSoal.map((item) => {
                const isEditing = editingNo === item.no;

                if (isEditing) {
                  return (
                    <tr key={item.no} className="bg-amber-50/70 border-2 border-amber-400">
                      <td className="p-2 border-r border-slate-200 text-center font-bold font-mono">
                        {item.no}
                      </td>
                      <td className="p-2 border-r border-slate-200 text-center">
                        <select
                          value={editBuffer.kunci || item.kunci}
                          onChange={(e) => setEditBuffer({ ...editBuffer, kunci: e.target.value as any })}
                          className="p-1 bg-white border border-red-400 rounded font-black text-red-600 text-center text-xs"
                        >
                          {['A', 'B', 'C', 'D', 'E'].map(k => (
                            <option key={k} value={k}>{k}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <textarea
                          rows={3}
                          value={editBuffer.rumusanSoal ?? item.rumusanSoal}
                          onChange={(e) => setEditBuffer({ ...editBuffer, rumusanSoal: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={editBuffer.pilihanA ?? item.pilihanA}
                          onChange={(e) => setEditBuffer({ ...editBuffer, pilihanA: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={editBuffer.pilihanB ?? item.pilihanB}
                          onChange={(e) => setEditBuffer({ ...editBuffer, pilihanB: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={editBuffer.pilihanC ?? item.pilihanC}
                          onChange={(e) => setEditBuffer({ ...editBuffer, pilihanC: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={editBuffer.pilihanD ?? item.pilihanD}
                          onChange={(e) => setEditBuffer({ ...editBuffer, pilihanD: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 border-r border-slate-200">
                        <input
                          type="text"
                          value={editBuffer.pilihanE ?? (item.pilihanE || '')}
                          onChange={(e) => setEditBuffer({ ...editBuffer, pilihanE: e.target.value })}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleSaveEdit(item.no)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-1.5 rounded flex items-center justify-center mx-auto"
                          title="Simpan perubahan"
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
                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    onDoubleClick={() => handleStartEdit(item)}
                  >
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold font-mono text-slate-700 bg-slate-50">
                      {item.no}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 font-black text-xs">
                        {item.kunci}
                      </span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-medium text-slate-800 leading-relaxed">
                      {item.rumusanSoal}
                    </td>
                    <td className={`p-2.5 border-r border-slate-200 ${item.kunci === 'A' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'}`}>
                      {item.pilihanA}
                    </td>
                    <td className={`p-2.5 border-r border-slate-200 ${item.kunci === 'B' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'}`}>
                      {item.pilihanB}
                    </td>
                    <td className={`p-2.5 border-r border-slate-200 ${item.kunci === 'C' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'}`}>
                      {item.pilihanC}
                    </td>
                    <td className={`p-2.5 border-r border-slate-200 ${item.kunci === 'D' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'}`}>
                      {item.pilihanD}
                    </td>
                    <td className={`p-2.5 border-r border-slate-200 ${item.kunci === 'E' ? 'bg-amber-50 font-bold text-amber-900' : 'text-slate-600'}`}>
                      {item.pilihanE || '-'}
                    </td>
                    <td className="p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100">
                        <button
                          onClick={() => onNavigateToKartu(item.no)}
                          className="p-1 hover:bg-blue-100 text-blue-700 rounded"
                          title="Lihat Kartu Soal ini"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded"
                          title="Edit butir soal"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(item.no)}
                          className="p-1 hover:bg-rose-100 text-rose-600 rounded"
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
