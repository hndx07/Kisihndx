import React, { useState, useEffect } from 'react';
import { ActiveTab, IdentitasSekolahGuru, DataMasterItem, DataSoalItem, JenjangTes, KartuSoalValidation } from './types';
import { defaultIdentitas, defaultMasterList, defaultSoalList } from './data/defaultData';
import { KurikulumMerdekaLogo, DeepLearningLogo } from './components/Logos';
import { MainMenu } from './components/MainMenu';
import { IdentitasGuruView } from './components/IdentitasGuruView';
import { DataMasterView } from './components/DataMasterView';
import { DataSoalView } from './components/DataSoalView';
import { KartuSoalView } from './components/KartuSoalView';
import { KisiKisiView } from './components/KisiKisiView';
import { LampiranKisiKisiView } from './components/LampiranKisiKisiView';
import { IntegratedUploadModal } from './components/IntegratedUploadModal';
import { DeepLearningAnalyzerModal } from './components/DeepLearningAnalyzerModal';
import { exportToExcel, downloadTemplateExcel } from './utils/excelHelper';
import { 
  Upload, 
  FileSpreadsheet, 
  Sparkles, 
  Home, 
  UserCheck, 
  Database, 
  HelpCircle, 
  CreditCard, 
  ListTree, 
  FileText,
  RotateCcw,
  Check
} from 'lucide-react';

export function App() {
  // 1. Persistent State
  const [identitas, setIdentitas] = useState<IdentitasSekolahGuru>(() => {
    try {
      const saved = localStorage.getItem('kumer_identitas');
      return saved ? JSON.parse(saved) : defaultIdentitas;
    } catch {
      return defaultIdentitas;
    }
  });

  const [masterList, setMasterList] = useState<DataMasterItem[]>(() => {
    try {
      const saved = localStorage.getItem('kumer_masterList');
      return saved ? JSON.parse(saved) : defaultMasterList;
    } catch {
      return defaultMasterList;
    }
  });

  const [soalList, setSoalList] = useState<DataSoalItem[]>(() => {
    try {
      const saved = localStorage.getItem('kumer_soalList');
      return saved ? JSON.parse(saved) : defaultSoalList;
    } catch {
      return defaultSoalList;
    }
  });

  const [validationData, setValidationData] = useState<KartuSoalValidation>(() => {
    try {
      const saved = localStorage.getItem('kumer_validationData');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');
  const [currentSoalNo, setCurrentSoalNo] = useState<number>(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeepLearningModalOpen, setIsDeepLearningModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kumer_identitas', JSON.stringify(identitas));
  }, [identitas]);

  useEffect(() => {
    localStorage.setItem('kumer_masterList', JSON.stringify(masterList));
  }, [masterList]);

  useEffect(() => {
    localStorage.setItem('kumer_soalList', JSON.stringify(soalList));
  }, [soalList]);

  useEffect(() => {
    localStorage.setItem('kumer_validationData', JSON.stringify(validationData));
  }, [validationData]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle data loaded from unified upload
  const handleDataLoaded = (data: {
    identitas?: Partial<IdentitasSekolahGuru>;
    masterList?: DataMasterItem[];
    soalList?: DataSoalItem[];
  }) => {
    if (data.identitas) {
      setIdentitas(prev => ({ ...prev, ...data.identitas }));
    }
    if (data.masterList && data.masterList.length > 0) {
      setMasterList(data.masterList);
    }
    if (data.soalList && data.soalList.length > 0) {
      setSoalList(data.soalList);
    }
    showNotification('Data terintegrasi berhasil diterapkan ke seluruh bilah!');
  };

  const handleUpdateIdentitas = (updated: Partial<IdentitasSekolahGuru>) => {
    setIdentitas(prev => ({ ...prev, ...updated }));
    showNotification('Identitas Sekolah & Guru berhasil diperbarui!');
  };

  const handleUpdateMasterList = (newList: DataMasterItem[]) => {
    setMasterList(newList);
    showNotification(`Data Master diperbarui (${newList.length} baris).`);
  };

  const handleUpdateSoalList = (newList: DataSoalItem[]) => {
    setSoalList(newList);
    showNotification(`Data Soal diperbarui (${newList.length} butir).`);
  };

  const handleUpdateValidation = (no: number, val: Partial<KartuSoalValidation[number]>) => {
    setValidationData(prev => ({
      ...prev,
      [no]: {
        ...(prev[no] || {}),
        ...val
      }
    }));
  };

  const handleJenjangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as JenjangTes;
    let namaLengkap = 'Asesmen Sumatif Tengah Semester (ASTS)';
    if (val === 'ASTS') namaLengkap = 'Asesmen Sumatif Tengah Semester (ASTS)';
    else if (val === 'ASAJ') namaLengkap = 'Asesmen Sumatif Akhir Jenjang (ASAJ)';
    else if (val === 'ASAT') namaLengkap = 'Asesmen Sumatif Akhir Tahun (ASAT)';
    else if (val === 'ASAS') namaLengkap = 'Asesmen Sumatif Akhir Semester (ASAS)';
    else if (val === 'PSTS') namaLengkap = 'Penilaian Sumatif Tengah Semester (PSTS / PTS)';
    else if (val === 'PSAS') namaLengkap = 'Penilaian Sumatif Akhir Semester (PSAS / PAS)';
    else if (val === 'PSAJ') namaLengkap = 'Penilaian Sumatif Akhir Jenjang (PSAJ)';
    else if (val === 'FORMATIF') namaLengkap = 'Asesmen Formatif / Penilaian Harian';
    else if (val === 'DIAGNOSTIK') namaLengkap = 'Asesmen Diagnostik Awal';
    else if (val === 'UJIAN_SEKOLAH') namaLengkap = 'Ujian Sekolah (US)';

    setIdentitas(prev => ({
      ...prev,
      jenjangTes: val,
      namaJenjangTesLengkap: namaLengkap
    }));
    showNotification(`Jenjang tes diubah ke ${val}`);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan semua data ke data bawaan SMK Muhammadiyah Bawang (50 Soal)?')) {
      setIdentitas(defaultIdentitas);
      setMasterList(defaultMasterList);
      setSoalList(defaultSoalList);
      setValidationData({});
      showNotification('Data berhasil di-reset ke bawaan awal.');
    }
  };

  const handleAddGeneratedQuestion = (newMaster: DataMasterItem, newSoal: DataSoalItem) => {
    setMasterList(prev => [...prev, newMaster]);
    setSoalList(prev => [...prev, newSoal]);
    showNotification(`Butir soal No. ${newSoal.no} berhasil ditambahkan!`);
  };

  const navItems = [
    { id: 'menu', label: 'Menu Utama', icon: Home },
    { id: 'identitas', label: 'Identitas Guru', icon: UserCheck },
    { id: 'master', label: 'Data Master', icon: Database },
    { id: 'soal', label: 'Data Soal', icon: HelpCircle },
    { id: 'kartu', label: 'Kartu Soal', icon: CreditCard },
    { id: 'kisi', label: 'Kisi-Kisi', icon: ListTree },
    { id: 'lampiran', label: 'Lampiran Soal', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col text-slate-900 font-sans antialiased">
      {/* 1. Integrated Global Top Bar (Hidden during print) */}
      <header className="print:hidden bg-[#0F3875] text-white border-b-2 border-blue-950 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Title & Assessment Badge */}
          <div 
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-400 p-1 shadow-xs flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-blue-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  KISI-KISI & KARTU SOAL
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-400 text-blue-950 font-black rounded">
                  {identitas.jenjangTes}
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                {identitas.mataPelajaran} · {identitas.kelas} ({identitas.semester}) · Kurikulum Merdeka
              </p>
            </div>
          </div>

          {/* Quick Actions Bar with Unified Upload */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Jenjang Tes Selector */}
            <div className="flex items-center bg-blue-950/60 rounded-lg px-2 py-1 border border-blue-400/30">
              <span className="text-[10px] text-sky-200 font-semibold mr-1.5 hidden sm:inline">Tes:</span>
              <select
                value={identitas.jenjangTes}
                onChange={handleJenjangChange}
                className="bg-transparent text-amber-300 font-bold text-xs focus:outline-hidden cursor-pointer"
                title="Pilih Jenjang / Pilihan Tes"
              >
                <optgroup label="Kurikulum Merdeka (Resmi)" className="text-slate-900 bg-white font-bold">
                  <option value="ASTS" className="text-slate-900">ASTS (Sumatif Tengah Semester)</option>
                  <option value="ASAJ" className="text-slate-900">ASAJ (Sumatif Akhir Jenjang)</option>
                  <option value="ASAT" className="text-slate-900">ASAT (Sumatif Akhir Tahun)</option>
                  <option value="ASAS" className="text-slate-900">ASAS (Sumatif Akhir Semester)</option>
                </optgroup>
                <optgroup label="Pilihan Lainnya" className="text-slate-900 bg-white">
                  <option value="PSTS" className="text-slate-900">PSTS (Tengah Semester)</option>
                  <option value="PSAS" className="text-slate-900">PSAS (Akhir Semester)</option>
                  <option value="PSAJ" className="text-slate-900">PSAJ (Akhir Jenjang)</option>
                  <option value="FORMATIF" className="text-slate-900">Formatif / Harian</option>
                  <option value="DIAGNOSTIK" className="text-slate-900">Asesmen Diagnostik</option>
                  <option value="UJIAN_SEKOLAH" className="text-slate-900">Ujian Sekolah</option>
                </optgroup>
              </select>
            </div>

            {/* UNIFIED UPLOAD BUTTON (Accessible in ALL bilah) */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              title="Upload file Excel atau JSON terintegrasi untuk seluruh bilah"
            >
              <Upload className="w-4 h-4 text-slate-950" />
              <span>UPLOAD TERINTEGRASI</span>
            </button>

            {/* Deep Learning Analyzer Button */}
            <button
              onClick={() => setIsDeepLearningModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Buka Analisis Deep Learning & AI Generator"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden md:inline">Deep Learning</span>
            </button>

            {/* Excel Download button */}
            <button
              onClick={() => exportToExcel(identitas, masterList, soalList)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              title="Unduh seluruh data ke file Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Excel</span>
            </button>

            {/* Reset button */}
            <button
              onClick={handleResetToDefault}
              className="p-1.5 hover:bg-white/10 text-blue-200 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Reset ke data bawaan 50 soal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bilah Tabs Navigation (Matching all bars in screenshot) */}
        <div className="bg-[#0c2e61] border-t border-blue-900/60 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-blue-950 font-black shadow-xs'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-950' : 'text-blue-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'menu' && (
          <MainMenu
            onNavigate={(tab) => setActiveTab(tab)}
            identitas={identitas}
            masterList={masterList}
            soalList={soalList}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onOpenDeepLearning={() => setIsDeepLearningModalOpen(true)}
            onSelectJenjang={(jenjang, namaLengkap) => {
              setIdentitas(prev => ({
                ...prev,
                jenjangTes: jenjang,
                namaJenjangTesLengkap: namaLengkap
              }));
              showNotification(`Asesmen aktif diubah ke ${jenjang} (${namaLengkap})`);
            }}
          />
        )}

        {activeTab === 'identitas' && (
          <IdentitasGuruView
            identitas={identitas}
            onUpdateIdentitas={handleUpdateIdentitas}
            onBackToMenu={() => setActiveTab('menu')}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'master' && (
          <DataMasterView
            masterList={masterList}
            onUpdateMasterList={handleUpdateMasterList}
            onBackToMenu={() => setActiveTab('menu')}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'soal' && (
          <DataSoalView
            soalList={soalList}
            onUpdateSoalList={handleUpdateSoalList}
            onBackToMenu={() => setActiveTab('menu')}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onNavigateToKartu={(no) => {
              setCurrentSoalNo(no);
              setActiveTab('kartu');
            }}
          />
        )}

        {activeTab === 'kartu' && (
          <KartuSoalView
            identitas={identitas}
            masterList={masterList}
            soalList={soalList}
            currentSoalNo={currentSoalNo}
            onSelectSoalNo={(no) => setCurrentSoalNo(no)}
            onBackToMenu={() => setActiveTab('menu')}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            validationData={validationData}
            onUpdateValidation={handleUpdateValidation}
          />
        )}

        {activeTab === 'kisi' && (
          <KisiKisiView
            identitas={identitas}
            masterList={masterList}
            soalList={soalList}
            onBackToMenu={() => setActiveTab('menu')}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'lampiran' && (
          <LampiranKisiKisiView
            identitas={identitas}
            soalList={soalList}
            onBackToMenu={() => setActiveTab('menu')}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}
      </main>

      {/* 3. Global Modals */}
      <IntegratedUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        identitas={identitas}
        masterList={masterList}
        soalList={soalList}
        onDataLoaded={handleDataLoaded}
      />

      <DeepLearningAnalyzerModal
        isOpen={isDeepLearningModalOpen}
        onClose={() => setIsDeepLearningModalOpen(false)}
        masterList={masterList}
        soalList={soalList}
        mataPelajaran={identitas.mataPelajaran}
        kelas={identitas.kelas}
        onAddGeneratedQuestion={handleAddGeneratedQuestion}
      />

      {/* Footer (Hidden during print) */}
      <footer className="print:hidden bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">{identitas.namaSekolah}</span>
            <span>·</span>
            <span>Kurikulum Merdeka</span>
            <span>·</span>
            <span className="text-indigo-600 font-semibold">Deep Learning Kemendikdasmen</span>
          </div>
          <div>
            Aplikasi Kisi-Kisi & Kartu Soal Terintegrasi · Versi 2.0
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
