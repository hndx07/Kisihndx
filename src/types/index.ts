export type JenjangTes = 
  | 'TKA' // Tes Kemampuan Akademik
  | 'ASTS' // Asesmen Sumatif Tengah Semester (Kurikulum Merdeka)
  | 'ASAJ' // Asesmen Sumatif Akhir Jenjang (Kurikulum Merdeka)
  | 'ASAT' // Asesmen Sumatif Akhir Tahun (Kurikulum Merdeka)
  | 'ASAS' // Asesmen Sumatif Akhir Semester (Kurikulum Merdeka)
  | 'PSTS' // Penilaian Sumatif Tengah Semester
  | 'PSAS' // Penilaian Sumatif Akhir Semester
  | 'PSAJ' // Penilaian Sumatif Akhir Jenjang
  | 'FORMATIF' // Asesmen Formatif / Harian
  | 'DIAGNOSTIK' // Asesmen Diagnostik
  | 'UJIAN_SEKOLAH'; // Ujian Sekolah

export type TipePilihanGanda = 
  | 'PG_SEDERHANA'     // Soal Pilihan Ganda sederhana dari option A sampai E (1 Kunci)
  | 'PGK_MCMA'          // Soal Pilihan Ganda Kompleks MCMA (Multiple Choices Multiple Answers) lima pernyataan
  | 'PGK_KATEGORI';     // Soal Pilihan Ganda Kompleks kategori dengan tiga pernyataan (Benar/Salah atau Sesuai/Tidak Sesuai)

export type DeepLearningDimension = 
  | 'Mindful Learning' // Berkesadaran: reflektif, kritis, analitis
  | 'Meaningful Learning' // Bermakna: kontekstual, aplikasi nyata
  | 'Joyful Learning'; // Menyenangkan: eksploratif, partisipatif

export type LevelKognitif = 'L1 (LOTS)' | 'L2 (MOTS)' | 'L3 (HOTS)';

export interface IdentitasSekolahGuru {
  namaSekolah: string;
  instansiAtas1?: string;
  instansiAtas2?: string;
  akreditasi?: string;
  alamatSekolah?: string;
  emailSekolah?: string;
  websiteSekolah?: string;
  kontakSekolah?: string;
  logoUrl?: string;
  kepalaSekolah: string;
  nbmKepalaSekolah: string;
  nipKepalaSekolah: string;
  mataPelajaran: string;
  kurikulum: string;
  fase: string;
  kelas: string;
  semester: string;
  kompetensiKeahlian: string;
  bentukTes: string;
  jenjangTes: JenjangTes;
  namaJenjangTesLengkap: string;
  jumlahSoal: number;
  alokasiWaktu: string;
  tahunAjaran: string;
  penyusun: string;
  nipPenyusun: string;
  nbmPenyusun: string;
  bukuSumber: string;
  tanggalPenyusunan: string;
  tempatPenyusunan: string;
  pendekatan: string;
}

export interface DataMasterItem {
  no: number;
  elemen: string;
  capaianPembelajaran: string;
  ipk: string;
  materi: string;
  indikatorSoal: string;
  bentukTes: string;
  levelKognitif: LevelKognitif;
  deepLearningDimension: DeepLearningDimension;
  tingkatKesukaran: 'Mudah' | 'Sedang' | 'HOTS / Sukar';
}

export type MediaType = 'none' | 'image' | 'audio' | 'video' | 'embed';

export interface DataSoalItem {
  no: number;
  tipeSoal?: TipePilihanGanda;
  kunci: string; // 'A'..'E' untuk PG Sederhana, 'A, C, D' untuk MCMA, atau 'Benar, Salah, Benar' / 'B-S-B' untuk Kategori
  rumusanSoal: string;
  pilihanA: string; // Opsi A atau Pernyataan 1
  pilihanB: string; // Opsi B atau Pernyataan 2
  pilihanC: string; // Opsi C atau Pernyataan 3
  pilihanD: string; // Opsi D atau Pernyataan 4
  pilihanE?: string; // Opsi E atau Pernyataan 5
  kategoriLabel1?: string; // Label kolom 1 kategori (default: 'Benar')
  kategoriLabel2?: string; // Label kolom 2 kategori (default: 'Salah')
  skor: number;
  pembahasan?: string;
  // Media & Embed Stimulus (Gambar / Video / Suara):
  mediaType?: MediaType;
  mediaUrl?: string;
  embedCode?: string;
  mediaCaption?: string;
  mediaPosition?: 'above' | 'below';
}

export interface KartuSoalValidation {
  [soalNo: number]: {
    jumlahSiswa?: number;
    dayaPembeda?: string;
    proporsiA?: number;
    proporsiB?: number;
    proporsiC?: number;
    proporsiD?: number;
    proporsiE?: number;
    validatorStatus?: 'Diterima' | 'Revisi' | 'Ditolak';
    validatorCatatan?: string;
  };
}

export type ActiveTab = 
  | 'menu'
  | 'identitas'
  | 'master'
  | 'soal'
  | 'kartu'
  | 'kisi'
  | 'lampiran'
  | 'cetak'
  | 'media';
