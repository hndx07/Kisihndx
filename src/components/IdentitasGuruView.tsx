import React from 'react';
import { IdentitasSekolahGuru, JenjangTes } from '../types';
import { KopDokumenResmi } from './KopDokumenResmi';
import { ArrowLeft, Save, Upload, FileSpreadsheet, Check, School, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface IdentitasGuruViewProps {
  identitas: IdentitasSekolahGuru;
  onUpdateIdentitas: (updated: Partial<IdentitasSekolahGuru>) => void;
  onBackToMenu: () => void;
  onOpenUpload: () => void;
}

export const IdentitasGuruView: React.FC<IdentitasGuruViewProps> = ({
  identitas,
  onUpdateIdentitas,
  onBackToMenu,
  onOpenUpload,
}) => {
  const [formData, setFormData] = React.useState<IdentitasSekolahGuru>(identitas);
  const [savedToast, setSavedToast] = React.useState(false);
  const [showKopConfig, setShowKopConfig] = React.useState(false);

  React.useEffect(() => {
    setFormData(identitas);
  }, [identitas]);

  const handleChange = (field: keyof IdentitasSekolahGuru, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleJenjangChange = (jenjang: JenjangTes) => {
    let namaLengkap = 'Asesmen Sumatif Tengah Semester (ASTS)';
    if (jenjang === 'TKA') namaLengkap = 'Tes Kemampuan Akademik (TKA)';
    else if (jenjang === 'ASTS') namaLengkap = 'Asesmen Sumatif Tengah Semester (ASTS)';
    else if (jenjang === 'ASAJ') namaLengkap = 'Asesmen Sumatif Akhir Jenjang (ASAJ)';
    else if (jenjang === 'ASAT') namaLengkap = 'Asesmen Sumatif Akhir Tahun (ASAT)';
    else if (jenjang === 'ASAS') namaLengkap = 'Asesmen Sumatif Akhir Semester (ASAS)';
    else if (jenjang === 'PSTS') namaLengkap = 'Penilaian Sumatif Tengah Semester (PSTS / PTS)';
    else if (jenjang === 'PSAS') namaLengkap = 'Penilaian Sumatif Akhir Semester (PSAS / PAS)';
    else if (jenjang === 'PSAJ') namaLengkap = 'Penilaian Sumatif Akhir Jenjang (PSAJ)';
    else if (jenjang === 'FORMATIF') namaLengkap = 'Asesmen Formatif / Penilaian Harian';
    else if (jenjang === 'DIAGNOSTIK') namaLengkap = 'Asesmen Diagnostik Awal';
    else if (jenjang === 'UJIAN_SEKOLAH') namaLengkap = 'Ujian Sekolah (US)';

    setFormData(prev => ({
      ...prev,
      jenjangTes: jenjang,
      namaJenjangTesLengkap: namaLengkap
    }));
  };

  const handleSave = () => {
    onUpdateIdentitas(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToMenu}
          className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-5 py-2.5 rounded-lg shadow-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO MAIN MENU</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenUpload}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-lg shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Terintegrasi</span>
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">Data Identitas Sekolah & Guru berhasil disimpan dan disinkronkan ke seluruh aplikasi!</span>
        </div>
      )}

      {/* Live Preview Kop Dokumen Siap Cetak (Sama persis dengan contoh resmi) */}
      <div className="bg-white rounded-xl shadow-xs border-2 border-slate-900 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-black text-xs text-slate-900 uppercase tracking-wide">
              Pratinjau Kop Dokumen Siap Cetak (Resmi Sesuai Contoh)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowKopConfig(!showKopConfig)}
            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 transition-colors cursor-pointer"
          >
            <span>{showKopConfig ? 'Sembunyikan Pengaturan Kop' : 'Atur Detail Kop Surat'}</span>
            {showKopConfig ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* The Live Rendered Kop Component */}
        <div className="bg-white p-3 sm:p-5 rounded-lg border border-slate-300 shadow-2xs overflow-x-auto">
          <KopDokumenResmi identitas={formData} />
        </div>

        {/* Expandable Kop Configuration Settings */}
        {showKopConfig && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 bg-slate-50 p-3.5 rounded-lg text-xs">
            <h4 className="font-bold text-slate-800 mb-2">Detail Informasi Kop Dokumen Resmi:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Instansi Atas Baris 1:</label>
                <input
                  type="text"
                  value={formData.instansiAtas1 || 'MAJLIS PENDIDIKAN DASAR DAN MENENGAH'}
                  onChange={(e) => handleChange('instansiAtas1', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Instansi Atas Baris 2:</label>
                <input
                  type="text"
                  value={formData.instansiAtas2 || 'DAERAH MUHAMMADIYAH BATANG'}
                  onChange={(e) => handleChange('instansiAtas2', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Status Akreditasi:</label>
                <input
                  type="text"
                  value={formData.akreditasi || 'T E R A K R E D I T A S I  “A”'}
                  onChange={(e) => handleChange('akreditasi', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Alamat Lengkap Sekolah:</label>
                <input
                  type="text"
                  value={formData.alamatSekolah || 'Jl. Bawang-Sukorejo Km 01 Ds. Jlamprang Kec. Bawang Kab. Batang.'}
                  onChange={(e) => handleChange('alamatSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Sekolah:</label>
                <input
                  type="text"
                  value={formData.emailSekolah || 'smkmuhbawang@gmail.com'}
                  onChange={(e) => handleChange('emailSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Website Sekolah:</label>
                <input
                  type="text"
                  value={formData.websiteSekolah || 'www.smkmuhiba.sch.id'}
                  onChange={(e) => handleChange('websiteSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Kontak Telp, Fax & Kode Pos:</label>
                <input
                  type="text"
                  value={formData.kontakSekolah || 'Kode Pos. 51274 Telp. (0285) 4486909 Fax. (0285) 4486899'}
                  onChange={(e) => handleChange('kontakSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">URL Logo Sekolah (Gambar Resmi):</label>
                <input
                  type="text"
                  value={formData.logoUrl || 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzWdtCjCcX2chJuhLX_26N5MmkVK-1SkyO7kgXznQQJPQa6_TB_EJzD1WWpztg7yX9RBRE7rGn0t2Z3FdG06mwwT6pQix8t6vnlcOBm_EgGl9z0jeJemJkppP0KIIjkXGksQvaCLh2dz-gOF6a2H213VQBL6Am8Elhmd76OOnphogk-EoTTbkYbg0TQJhv/s512/34690.png'}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Table Form (Matching Style of Page 2 in screenshot) */}
      <div className="bg-white rounded-xl shadow-md border-2 border-slate-800 overflow-hidden">
        {/* Table Header Bar */}
        <div className="bg-[#3B82F6] text-white py-2.5 px-4 font-black text-xs md:text-sm tracking-wider uppercase border-b-2 border-slate-800 flex items-center justify-between">
          <span>INPUT DATA SEKOLAH / GURU</span>
          <span className="text-[11px] font-normal text-blue-100 hidden sm:inline">Kurikulum Merdeka & Deep Learning</span>
        </div>

        {/* Form Body */}
        <div className="divide-y divide-slate-200 text-xs">
          {/* Row: Nama Sekolah */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Nama Sekolah</label>
            <div className="md:col-span-2">
              <input
                type="text"
                value={formData.namaSekolah}
                onChange={(e) => handleChange('namaSekolah', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Row: Kepala Sekolah */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-white hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Kepala Sekolah</label>
            <div className="md:col-span-2">
              <input
                type="text"
                value={formData.kepalaSekolah}
                onChange={(e) => handleChange('kepalaSekolah', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Row: NBM / NIP Kepala Sekolah */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">NBM / NIP Kepala Sekolah</label>
            <div className="md:col-span-2 grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="NBM Kepala Sekolah"
                value={formData.nbmKepalaSekolah}
                onChange={(e) => handleChange('nbmKepalaSekolah', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
              <input
                type="text"
                placeholder="NIP (opsional)"
                value={formData.nipKepalaSekolah}
                onChange={(e) => handleChange('nipKepalaSekolah', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Row: Mata Pelajaran */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-white hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Mata Pelajaran</label>
            <div className="md:col-span-2">
              <input
                type="text"
                value={formData.mataPelajaran}
                onChange={(e) => handleChange('mataPelajaran', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-bold text-blue-900"
              />
            </div>
          </div>

          {/* Row: Kurikulum & Pendekatan */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Kurikulum & Pendekatan</label>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={formData.kurikulum}
                onChange={(e) => handleChange('kurikulum', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
              >
                <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                <option value="Merdeka Belajar">Merdeka Belajar</option>
                <option value="Kurikulum 2013 Revisi">Kurikulum 2013 Revisi</option>
              </select>

              <select
                value={formData.pendekatan}
                onChange={(e) => handleChange('pendekatan', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
              >
                <option value="Deep Learning (Mindful, Meaningful, Joyful Learning)">Deep Learning (Mindful, Meaningful, Joyful)</option>
                <option value="Pendekatan Saintifik & HOTS">Pendekatan Saintifik & HOTS</option>
                <option value="Pembelajaran Berdiferensiasi">Pembelajaran Berdiferensiasi</option>
              </select>
            </div>
          </div>

          {/* Row: Jenjang Tes */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-white hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">
              <span>Jenjang / Jenis Asesmen</span>
              <span className="block text-[10px] text-blue-600 font-normal">Menyesuaikan judul di seluruh format cetak</span>
            </label>
            <div className="md:col-span-2">
              <select
                value={formData.jenjangTes}
                onChange={(e) => handleJenjangChange(e.target.value as JenjangTes)}
                className="w-full px-3 py-1.5 bg-amber-50 border-2 border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 font-bold text-amber-950"
              >
                <optgroup label="Kurikulum Merdeka & Tes Akademik (Resmi)">
                  <option value="TKA">TKA - Tes Kemampuan Akademik (Standar Seleksi / Evaluasi)</option>
                  <option value="ASTS">ASTS - Asesmen Sumatif Tengah Semester</option>
                  <option value="ASAJ">ASAJ - Asesmen Sumatif Akhir Jenjang</option>
                  <option value="ASAT">ASAT - Asesmen Sumatif Akhir Tahun</option>
                  <option value="ASAS">ASAS - Asesmen Sumatif Akhir Semester</option>
                </optgroup>
                <optgroup label="Format Lain / Tradisional">
                  <option value="PSTS">PSTS - Penilaian Sumatif Tengah Semester (PTS)</option>
                  <option value="PSAS">PSAS - Penilaian Sumatif Akhir Semester (PAS)</option>
                  <option value="PSAJ">PSAJ - Penilaian Sumatif Akhir Jenjang</option>
                  <option value="FORMATIF">Formatif / Penilaian Harian</option>
                  <option value="DIAGNOSTIK">Asesmen Diagnostik</option>
                  <option value="UJIAN_SEKOLAH">Ujian Sekolah (US)</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Row: Kelas / Semester & Fase */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Kelas, Semester & Fase</label>
            <div className="md:col-span-2 grid grid-cols-3 gap-2">
              <select
                value={formData.kelas}
                onChange={(e) => handleChange('kelas', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              >
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>

              <select
                value={formData.semester}
                onChange={(e) => handleChange('semester', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              >
                <option value="Gasal">Gasal / Ganjil</option>
                <option value="Genap">Genap</option>
              </select>

              <input
                type="text"
                placeholder="Fase (e.g. Fase F)"
                value={formData.fase}
                onChange={(e) => handleChange('fase', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Row: Kelas / Kompetensi */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-white hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Kelas / Kompetensi Keahlian</label>
            <div className="md:col-span-2">
              <input
                type="text"
                value={formData.kompetensiKeahlian}
                onChange={(e) => handleChange('kompetensiKeahlian', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Row: Bentuk Tes & Alokasi Waktu */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Bentuk Tes & Jumlah Soal</label>
            <div className="md:col-span-2 grid grid-cols-3 gap-2">
              <select
                value={formData.bentukTes}
                onChange={(e) => handleChange('bentukTes', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              >
                <option value="Pilihan Ganda">Pilihan Ganda</option>
                <option value="Pilihan Ganda Kompleks">Pilihan Ganda Kompleks</option>
                <option value="Uraian / Essay">Uraian / Essay</option>
                <option value="Menjodohkan">Menjodohkan</option>
              </select>

              <input
                type="number"
                value={formData.jumlahSoal}
                onChange={(e) => handleChange('jumlahSoal', parseInt(e.target.value, 10) || 50)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />

              <input
                type="text"
                value={formData.alokasiWaktu}
                onChange={(e) => handleChange('alokasiWaktu', e.target.value)}
                placeholder="Alokasi Waktu"
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Row: Tahun Ajaran */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-white hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Tahun Ajaran</label>
            <div className="md:col-span-2">
              <input
                type="text"
                value={formData.tahunAjaran}
                onChange={(e) => handleChange('tahunAjaran', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800 font-semibold"
              />
            </div>
          </div>

          {/* Row: Penyusun */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Guru Penyusun</label>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Nama Penyusun"
                value={formData.penyusun}
                onChange={(e) => handleChange('penyusun', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800 font-semibold"
              />
              <input
                type="text"
                placeholder="NIP / NBM Penyusun"
                value={formData.nbmPenyusun !== '-' ? formData.nbmPenyusun : formData.nipPenyusun}
                onChange={(e) => {
                  handleChange('nipPenyusun', e.target.value);
                  handleChange('nbmPenyusun', e.target.value);
                }}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Row: Buku Sumber */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-white hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Buku Sumber</label>
            <div className="md:col-span-2">
              <input
                type="text"
                value={formData.bukuSumber}
                onChange={(e) => handleChange('bukuSumber', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Row: Tanggal & Tempat Penyusunan */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
            <label className="font-bold text-slate-800 self-center">Tanggal & Tempat Penyusunan</label>
            <div className="md:col-span-2 grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Tempat (e.g. Bawang)"
                value={formData.tempatPenyusunan}
                onChange={(e) => handleChange('tempatPenyusunan', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
              <input
                type="text"
                placeholder="Tanggal (e.g. 10 Maret 2026)"
                value={formData.tanggalPenyusunan}
                onChange={(e) => handleChange('tanggalPenyusunan', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Footer info in Card */}
        <div className="bg-slate-100 p-3 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Otomatis terhubung dengan lembar Kisi-Kisi, Kartu Soal & Lampiran Soal</span>
          <button
            onClick={handleSave}
            className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
