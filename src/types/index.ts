export type JenjangTes = 
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

export type DeepLearningDimension = 
  | 'Mindful Learning' // Berkesadaran: reflektif, kritis, analitis
  | 'Meaningful Learning' // Bermakna: kontekstual, aplikasi nyata
  | 'Joyful Learning'; // Menyenangkan: eksploratif, partisipatif

export type LevelKognitif = 'L1 (LOTS)' | 'L2 (MOTS)' | 'L3 (HOTS)';

export interface IdentitasSekolahGuru {
  namaSekolah: string;
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

export interface DataSoalItem {
  no: number;
  kunci: 'A' | 'B' | 'C' | 'D' | 'E';
  rumusanSoal: string;
  pilihanA: string;
  pilihanB: string;
  pilihanC: string;
  pilihanD: string;
  pilihanE?: string;
  skor: number;
  pembahasan?: string;
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
  | 'lampiran';
