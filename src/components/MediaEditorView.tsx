import React, { useState } from 'react';
import { DataSoalItem, MediaType } from '../types';
import { MediaStimulusRenderer } from './MediaStimulusRenderer';
import { 
  ArrowLeft, 
  Save, 
  Image, 
  Music, 
  Video, 
  Code, 
  Check, 
  Trash2, 
  ExternalLink, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Eye, 
  Printer, 
  FileText,
  HelpCircle,
  Play
} from 'lucide-react';

interface MediaEditorViewProps {
  soalList: DataSoalItem[];
  onUpdateSoalList: (newList: DataSoalItem[]) => void;
  onBackToMenu: () => void;
  onNavigateToSoal: () => void;
  initialSoalNo?: number;
}

export const MediaEditorView: React.FC<MediaEditorViewProps> = ({
  soalList,
  onUpdateSoalList,
  onBackToMenu,
  onNavigateToSoal,
  initialSoalNo = 1,
}) => {
  const [selectedNo, setSelectedNo] = useState<number>(initialSoalNo || 1);

  React.useEffect(() => {
    if (initialSoalNo && initialSoalNo > 0) {
      setSelectedNo(initialSoalNo);
    }
  }, [initialSoalNo]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMedia, setFilterMedia] = useState<'ALL' | 'WITH_MEDIA' | 'NO_MEDIA'>('ALL');
  const [savedToast, setSavedToast] = useState(false);

  // Active question item
  const activeSoal = soalList.find(s => s.no === selectedNo) || soalList[0] || {
    no: 1,
    kunci: 'A',
    rumusanSoal: '',
    pilihanA: '',
    pilihanB: '',
    pilihanC: '',
    pilihanD: '',
    skor: 2
  };

  // Local draft state for editing media of selected question
  const [draftMediaType, setDraftMediaType] = useState<MediaType>(activeSoal.mediaType || 'none');
  const [draftMediaUrl, setDraftMediaUrl] = useState<string>(activeSoal.mediaUrl || '');
  const [draftEmbedCode, setDraftEmbedCode] = useState<string>(activeSoal.embedCode || '');
  const [draftCaption, setDraftCaption] = useState<string>(activeSoal.mediaCaption || '');

  // Synchronize draft when selected question changes
  React.useEffect(() => {
    setDraftMediaType(activeSoal.mediaType || 'none');
    setDraftMediaUrl(activeSoal.mediaUrl || '');
    setDraftEmbedCode(activeSoal.embedCode || '');
    setDraftCaption(activeSoal.mediaCaption || '');
  }, [selectedNo, activeSoal]);

  const handleSaveMedia = () => {
    const updated = soalList.map(item => {
      if (item.no === selectedNo) {
        return {
          ...item,
          mediaType: draftMediaType,
          mediaUrl: draftMediaUrl.trim() || undefined,
          embedCode: draftEmbedCode.trim() || undefined,
          mediaCaption: draftCaption.trim() || undefined,
        };
      }
      return item;
    });

    onUpdateSoalList(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleClearMedia = () => {
    if (!window.confirm(`Hapus seluruh konfigurasi media / embed pada Soal No. ${selectedNo}?`)) return;
    setDraftMediaType('none');
    setDraftMediaUrl('');
    setDraftEmbedCode('');
    setDraftCaption('');

    const updated = soalList.map(item => {
      if (item.no === selectedNo) {
        return {
          ...item,
          mediaType: 'none' as MediaType,
          mediaUrl: undefined,
          embedCode: undefined,
          mediaCaption: undefined,
        };
      }
      return item;
    });
    onUpdateSoalList(updated);
  };

  // Helper snippet inserters
  const insertTemplate = (type: MediaType) => {
    setDraftMediaType(type);
    if (type === 'image') {
      setDraftMediaUrl('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80');
      setDraftEmbedCode('');
      setDraftCaption(`Gambar ${selectedNo}. Ilustrasi Stimulus Pembelajaran`);
    } else if (type === 'audio') {
      setDraftMediaUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
      setDraftEmbedCode('');
      setDraftCaption(`Audio Listening Soal No. ${selectedNo} (English Dialogue)`);
    } else if (type === 'video') {
      setDraftMediaUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      setDraftEmbedCode('');
      setDraftCaption(`Video Materi Stimulus Soal No. ${selectedNo}`);
    } else if (type === 'embed') {
      setDraftEmbedCode('<iframe width="100%" height="250" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video Stimulus" frameborder="0" allowfullscreen></iframe>');
      setDraftMediaUrl('');
      setDraftCaption(`Embed Stimulus Soal No. ${selectedNo}`);
    }
  };

  // Mock preview item with current drafts
  const previewItem: DataSoalItem = {
    ...activeSoal,
    mediaType: draftMediaType,
    mediaUrl: draftMediaUrl,
    embedCode: draftEmbedCode,
    mediaCaption: draftCaption,
  };

  // Filter questions
  const filteredQuestions = soalList.filter(s => {
    const hasMedia = s.mediaType && s.mediaType !== 'none' && (s.mediaUrl || s.embedCode);
    const matchesFilter = 
      filterMedia === 'ALL' ||
      (filterMedia === 'WITH_MEDIA' && hasMedia) ||
      (filterMedia === 'NO_MEDIA' && !hasMedia);

    const matchesSearch = 
      s.no.toString() === searchTerm.trim() ||
      s.rumusanSoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.mediaCaption && s.mediaCaption.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const countWithMedia = soalList.filter(s => s.mediaType && s.mediaType !== 'none' && (s.mediaUrl || s.embedCode)).length;

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
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
              <span>EDITOR MEDIA & EMBED SOAL (GAMBAR / SUARA / VIDEO)</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                {countWithMedia} dari {soalList.length} Soal Ber-media
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Kelola manual embed kode HTML atau URL media tanpa merusak kerapian dokumen cetak
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToSoal}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Buka Tabel Data Soal
          </button>
          <button
            onClick={handleSaveMedia}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">Media dan kode embed untuk Butir Soal No. {selectedNo} berhasil disimpan dan disinkronkan ke seluruh dokumen cetak!</span>
        </div>
      )}

      {/* Main Grid: Left Question Selector (3 cols) & Right Media Editor Form (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Question Navigator */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
              Pilih Nomor Soal:
            </h3>
            <span className="text-[11px] font-semibold text-slate-500">
              {filteredQuestions.length} Soal
            </span>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-[11px] font-semibold">
            <button
              onClick={() => setFilterMedia('ALL')}
              className={`flex-1 py-1 rounded transition-colors ${
                filterMedia === 'ALL' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Semua ({soalList.length})
            </button>
            <button
              onClick={() => setFilterMedia('WITH_MEDIA')}
              className={`flex-1 py-1 rounded transition-colors ${
                filterMedia === 'WITH_MEDIA' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Ber-media ({countWithMedia})
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nomor atau rumusan soal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          {/* Question List */}
          <div className="overflow-y-auto max-h-[550px] divide-y divide-slate-100 space-y-0.5 pr-1">
            {filteredQuestions.map((s) => {
              const isSelected = s.no === selectedNo;
              const hasMedia = s.mediaType && s.mediaType !== 'none' && (s.mediaUrl || s.embedCode);

              return (
                <div
                  key={s.no}
                  onClick={() => setSelectedNo(s.no)}
                  className={`p-2.5 rounded-lg cursor-pointer transition-colors flex items-start gap-2.5 ${
                    isSelected 
                      ? 'bg-blue-50/90 border border-blue-400 text-blue-950 font-medium' 
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {s.no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs line-clamp-2 leading-snug">
                      {s.rumusanSoal || '(Soal belum diisi)'}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {hasMedia ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          {s.mediaType === 'image' && <Image className="w-2.5 h-2.5" />}
                          {s.mediaType === 'audio' && <Music className="w-2.5 h-2.5" />}
                          {s.mediaType === 'video' && <Video className="w-2.5 h-2.5" />}
                          {s.mediaType === 'embed' && <Code className="w-2.5 h-2.5" />}
                          <span className="uppercase">{s.mediaType}</span>
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-400">Tanpa media</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Media Editor Form & Live Safe Print Preview */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-blue-950 font-black text-xs">
                  SOAL NO. {selectedNo}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  Konfigurasi Stimulus Media & Embed
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleClearMedia}
                  className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Hapus media dari soal ini"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan Media</span>
                </button>
              </div>
            </div>

            {/* Quick Preview of Question Text */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-500 text-[10px] block mb-0.5">Teks Rumusan Soal:</span>
              <p className="text-slate-800 font-medium line-clamp-3 leading-relaxed">
                {activeSoal.rumusanSoal}
              </p>
            </div>

            {/* 1. Media Type Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-xs text-slate-800 block">
                Pilih Tipe Stimulus Media:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'none', label: 'Tanpa Media', icon: FileText, color: 'text-slate-600' },
                  { id: 'image', label: 'Gambar / Bagan', icon: Image, color: 'text-blue-600' },
                  { id: 'audio', label: 'Audio / Listening', icon: Music, color: 'text-purple-600' },
                  { id: 'video', label: 'Video / YouTube', icon: Video, color: 'text-rose-600' },
                  { id: 'embed', label: 'HTML Embed', icon: Code, color: 'text-emerald-600' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = draftMediaType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setDraftMediaType(item.id as MediaType)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                        isActive 
                          ? 'border-blue-600 bg-blue-50/80 font-bold text-blue-900 shadow-2xs ring-2 ring-blue-500/20' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : item.color}`} />
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Presets if media is selected */}
            {draftMediaType !== 'none' && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Contoh / Template Cepat:</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => insertTemplate(draftMediaType)}
                    className="px-2 py-0.5 bg-white border border-amber-300 text-amber-900 font-bold rounded text-[10px] hover:bg-amber-100"
                  >
                    Gunakan Contoh {draftMediaType.toUpperCase()}
                  </button>
                </div>
              </div>
            )}

            {/* 2. Media Inputs */}
            {draftMediaType !== 'none' && (
              <div className="space-y-3 pt-2">
                {/* Direct URL input */}
                <div>
                  <label className="font-bold text-xs text-slate-800 block mb-1">
                    Direct Media URL (Link File atau Link YouTube):
                  </label>
                  <input
                    type="text"
                    value={draftMediaUrl}
                    onChange={(e) => setDraftMediaUrl(e.target.value)}
                    placeholder={
                      draftMediaType === 'image' 
                        ? 'Contoh: https://domain.com/gambar-soal.png atau URL web' 
                        : draftMediaType === 'audio' 
                        ? 'Contoh: https://domain.com/audio-listening.mp3' 
                        : draftMediaType === 'video'
                        ? 'Contoh: https://www.youtube.com/watch?v=... atau file .mp4'
                        : 'Link URL sumber media...'
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Mendukung link gambar langsung (.png, .jpg, .webp, .svg), audio (.mp3), video YouTube atau file (.mp4).
                  </p>
                </div>

                {/* Raw Embed Code Input */}
                <div>
                  <label className="font-bold text-xs text-slate-800 block mb-1">
                    Embed Code HTML Manual (Opsional / iframe / widget):
                  </label>
                  <textarea
                    rows={3}
                    value={draftEmbedCode}
                    onChange={(e) => setDraftEmbedCode(e.target.value)}
                    placeholder='Contoh: <iframe src="https://..." width="100%" height="250"></iframe> atau <img src="..." />'
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Jika diisi, kode embed HTML ini akan dirender secara responsif.
                  </p>
                </div>

                {/* Caption input */}
                <div>
                  <label className="font-bold text-xs text-slate-800 block mb-1">
                    Keterangan Media / Judul Stimulus (Caption):
                  </label>
                  <input
                    type="text"
                    value={draftCaption}
                    onChange={(e) => setDraftCaption(e.target.value)}
                    placeholder="Contoh: Gambar 1. Rangkaian Listrik Tertutup atau Audio Listening Dialog 1"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Live Preview Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                  Pratinjau Tampilan & Kerapian Cetak (Print-Safe Preview)
                </h4>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                ✓ Aman untuk Naskah Cetak & Ujian
              </span>
            </div>

            <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/50 space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-sm text-slate-900 w-6 shrink-0">{selectedNo}.</span>
                <div className="flex-1 space-y-2">
                  <div className="text-xs font-semibold text-slate-900 whitespace-pre-line">
                    {previewItem.rumusanSoal || 'Teks pertanyaan butir soal...'}
                  </div>

                  {/* Rendered Media Stimulus */}
                  <MediaStimulusRenderer soal={previewItem} />

                  {/* Options Preview */}
                  <div className="space-y-1 text-xs text-slate-700 pt-1">
                    <div className="flex items-start gap-2">
                      <span className="font-bold w-4">A.</span>
                      <span>{previewItem.pilihanA || 'Pilihan A'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold w-4">B.</span>
                      <span>{previewItem.pilihanB || 'Pilihan B'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold w-4">C.</span>
                      <span>{previewItem.pilihanC || 'Pilihan C'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-[11px] text-slate-500 italic">
                * Pada lembar cetak ujian fisik, gambar diskalakan proporsional (maks 140px tinggi) agar tidak memotong halaman, dan video/audio diganti dengan teks rujukan rapi.
              </p>
              <button
                type="button"
                onClick={handleSaveMedia}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Media Soal {selectedNo}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
