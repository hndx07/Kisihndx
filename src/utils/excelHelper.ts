import * as XLSX from 'xlsx';
import { IdentitasSekolahGuru, DataMasterItem, DataSoalItem, JenjangTes, LevelKognitif, DeepLearningDimension } from '../types';

export function exportToExcel(
  identitas: IdentitasSekolahGuru,
  masterList: DataMasterItem[],
  soalList: DataSoalItem[],
  customFilename?: string
) {
  const wb = XLSX.utils.book_new();

  // 1. Sheet IDENTITAS
  const identitasRows = [
    ['DATA SEKOLAH & GURU PENYUSUN', ''],
    ['Nama Sekolah', identitas.namaSekolah],
    ['Kepala Sekolah', identitas.kepalaSekolah],
    ['NBM Kepala Sekolah', identitas.nbmKepalaSekolah],
    ['NIP Kepala Sekolah', identitas.nipKepalaSekolah],
    ['Mata Pelajaran', identitas.mataPelajaran],
    ['Kurikulum', identitas.kurikulum],
    ['Fase', identitas.fase],
    ['Kelas / Semester', `${identitas.kelas}/${identitas.semester}`],
    ['Kelas / Kompetensi', identitas.kompetensiKeahlian],
    ['Bentuk Tes', identitas.bentukTes],
    ['Jenjang Tes', identitas.namaJenjangTesLengkap],
    ['Jumlah Soal', identitas.jumlahSoal],
    ['Alokasi Waktu', identitas.alokasiWaktu],
    ['Tahun Ajaran', identitas.tahunAjaran],
    ['Penyusun', identitas.penyusun],
    ['NIP Penyusun', identitas.nipPenyusun],
    ['NBM Penyusun', identitas.nbmPenyusun],
    ['Buku Sumber', identitas.bukuSumber],
    ['Tanggal Penyusunan', identitas.tanggalPenyusunan],
    ['Tempat Penyusunan', identitas.tempatPenyusunan],
    ['Pendekatan', identitas.pendekatan],
  ];
  const wsIdentitas = XLSX.utils.aoa_to_sheet(identitasRows);
  XLSX.utils.book_append_sheet(wb, wsIdentitas, 'IDENTITAS');

  // 2. Sheet DATA MASTER
  const masterRows: any[] = [
    [
      'No',
      'Elemen',
      'Capaian Pembelajaran',
      'IPK (Alur Tujuan)',
      'Materi',
      'Indikator Soal',
      'Bentuk Tes',
      'Level Kognitif',
      'Dimensi Deep Learning',
      'Tingkat Kesukaran'
    ]
  ];
  masterList.forEach((m) => {
    masterRows.push([
      m.no,
      m.elemen,
      m.capaianPembelajaran,
      m.ipk,
      m.materi,
      m.indikatorSoal,
      m.bentukTes,
      m.levelKognitif,
      m.deepLearningDimension,
      m.tingkatKesukaran
    ]);
  });
  const wsMaster = XLSX.utils.aoa_to_sheet(masterRows);
  XLSX.utils.book_append_sheet(wb, wsMaster, 'DATA MASTER');

  // 3. Sheet DATA SOAL
  const soalRows: any[] = [
    [
      'No. Soal',
      'Kunci',
      'Rumusan Butir Soal',
      'Pilihan A',
      'Pilihan B',
      'Pilihan C',
      'Pilihan D',
      'Pilihan E',
      'Skor',
      'Pembahasan / Dimensi'
    ]
  ];
  soalList.forEach((s) => {
    soalRows.push([
      s.no,
      s.kunci,
      s.rumusanSoal,
      s.pilihanA,
      s.pilihanB,
      s.pilihanC,
      s.pilihanD,
      s.pilihanE || '',
      s.skor,
      s.pembahasan || ''
    ]);
  });
  const wsSoal = XLSX.utils.aoa_to_sheet(soalRows);
  XLSX.utils.book_append_sheet(wb, wsSoal, 'DATA SOAL');

  const filename = customFilename || `Kisi_dan_Kartu_Soal_${identitas.mataPelajaran.replace(/\s+/g, '_')}_${identitas.jenjangTes}.xlsx`;
  XLSX.writeFile(wb, filename);
}

export function downloadTemplateExcel(identitas: IdentitasSekolahGuru, masterList: DataMasterItem[], soalList: DataSoalItem[]) {
  exportToExcel(identitas, masterList, soalList, 'TEMPLATE_KISI_KARTU_SOAL_SMK_MUHIBA.xlsx');
}

export async function parseExcelFile(file: File): Promise<{
  identitas?: Partial<IdentitasSekolahGuru>;
  masterList?: DataMasterItem[];
  soalList?: DataSoalItem[];
}> {
  const data = await file.arrayBuffer();
  const wb = XLSX.read(data, { type: 'array' });

  const result: {
    identitas?: Partial<IdentitasSekolahGuru>;
    masterList?: DataMasterItem[];
    soalList?: DataSoalItem[];
  } = {};

  const sheetNames = wb.SheetNames;

  // Find Identitas Sheet
  const identitasSheetName = sheetNames.find(s => 
    s.toUpperCase().includes('IDENTITAS') || s.toUpperCase().includes('SEKOLAH') || s.toUpperCase().includes('GURU')
  );

  if (identitasSheetName) {
    const ws = wb.Sheets[identitasSheetName];
    const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
    const partialIdentitas: Partial<IdentitasSekolahGuru> = {};

    rawRows.forEach(row => {
      if (!row || row.length < 2) return;
      const key = String(row[0] || '').trim().toLowerCase();
      const val = String(row[1] || '').trim();

      if (key.includes('nama sekolah')) partialIdentitas.namaSekolah = val;
      else if (key.includes('kepala sekolah') && !key.includes('nbm') && !key.includes('nip')) partialIdentitas.kepalaSekolah = val;
      else if (key.includes('nbm kepala')) partialIdentitas.nbmKepalaSekolah = val;
      else if (key.includes('nip kepala')) partialIdentitas.nipKepalaSekolah = val;
      else if (key.includes('mata pelajaran')) partialIdentitas.mataPelajaran = val;
      else if (key.includes('kurikulum')) partialIdentitas.kurikulum = val;
      else if (key.includes('fase')) partialIdentitas.fase = val;
      else if (key.includes('kelas / semester') || key.includes('semester')) {
        if (val.includes('/')) {
          const parts = val.split('/');
          partialIdentitas.kelas = parts[0]?.trim();
          partialIdentitas.semester = parts[1]?.trim();
        } else {
          partialIdentitas.semester = val;
        }
      }
      else if (key.includes('kompetensi')) partialIdentitas.kompetensiKeahlian = val;
      else if (key.includes('bentuk tes')) partialIdentitas.bentukTes = val;
      else if (key.includes('jenjang tes')) {
        partialIdentitas.namaJenjangTesLengkap = val;
        if (val.includes('ASTS') || val.includes('PSTS') || val.includes('PTS') || val.includes('Tengah')) partialIdentitas.jenjangTes = 'ASTS';
        else if (val.includes('ASAJ') || val.includes('PSAJ') || val.includes('Akhir Jenjang')) partialIdentitas.jenjangTes = 'ASAJ';
        else if (val.includes('ASAT') || val.includes('Akhir Tahun') || val.includes('Kenaikan')) partialIdentitas.jenjangTes = 'ASAT';
        else if (val.includes('ASAS') || val.includes('PSAS') || val.includes('PAS') || val.includes('Akhir Semester')) partialIdentitas.jenjangTes = 'ASAS';
      }
      else if (key.includes('jumlah soal')) {
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed)) partialIdentitas.jumlahSoal = parsed;
      }
      else if (key.includes('alokasi waktu')) partialIdentitas.alokasiWaktu = val;
      else if (key.includes('tahun ajaran')) partialIdentitas.tahunAjaran = val;
      else if (key.includes('penyusun') && !key.includes('tanggal') && !key.includes('tempat') && !key.includes('nip')) partialIdentitas.penyusun = val;
      else if (key.includes('nip penyusun')) partialIdentitas.nipPenyusun = val;
      else if (key.includes('nbm penyusun')) partialIdentitas.nbmPenyusun = val;
      else if (key.includes('buku sumber')) partialIdentitas.bukuSumber = val;
      else if (key.includes('tanggal penyusunan')) partialIdentitas.tanggalPenyusunan = val;
      else if (key.includes('tempat penyusunan')) partialIdentitas.tempatPenyusunan = val;
      else if (key.includes('pendekatan')) partialIdentitas.pendekatan = val;
    });

    result.identitas = partialIdentitas;
  }

  // Find Data Soal Sheet
  const soalSheetName = sheetNames.find(s => 
    s.toUpperCase().includes('SOAL') || s.toUpperCase().includes('DATA SOAL') || s.toUpperCase().includes('BUTIR')
  );

  if (soalSheetName) {
    const ws = wb.Sheets[soalSheetName];
    const rawData = XLSX.utils.sheet_to_json(ws) as any[];
    const parsedSoal: DataSoalItem[] = [];

    rawData.forEach((row, index) => {
      // Find keys flexibly
      const no = Number(row['No'] || row['No.'] || row['No. Soal'] || row['Nomor'] || index + 1);
      const kunciRaw = String(row['Kunci'] || row['Kunci Jawaban'] || row['KUNCI'] || 'A').trim().toUpperCase();
      const kunci = (['A', 'B', 'C', 'D', 'E'].includes(kunciRaw) ? kunciRaw : 'A') as 'A' | 'B' | 'C' | 'D' | 'E';
      const rumusanSoal = String(row['Rumusan Butir Soal'] || row['Soal'] || row['Butir Soal'] || row['Pertanyaan'] || '').trim();
      const pilihanA = String(row['Pilihan A'] || row['A'] || row['a'] || '').trim();
      const pilihanB = String(row['Pilihan B'] || row['B'] || row['b'] || '').trim();
      const pilihanC = String(row['Pilihan C'] || row['C'] || row['c'] || '').trim();
      const pilihanD = String(row['Pilihan D'] || row['D'] || row['d'] || '').trim();
      const pilihanE = String(row['Pilihan E'] || row['E'] || row['e'] || '').trim();
      const skor = Number(row['Skor'] || 2);
      const pembahasan = String(row['Pembahasan'] || row['Pembahasan / Dimensi'] || row['Keterangan'] || '').trim();

      if (rumusanSoal || pilihanA) {
        parsedSoal.push({
          no,
          kunci,
          rumusanSoal,
          pilihanA,
          pilihanB,
          pilihanC,
          pilihanD,
          pilihanE: pilihanE || undefined,
          skor: isNaN(skor) ? 2 : skor,
          pembahasan: pembahasan || undefined,
        });
      }
    });

    if (parsedSoal.length > 0) {
      result.soalList = parsedSoal;
    }
  }

  // Find Data Master Sheet
  const masterSheetName = sheetNames.find(s => 
    s.toUpperCase().includes('MASTER') || s.toUpperCase().includes('KISI') || s.toUpperCase().includes('CP')
  );

  if (masterSheetName) {
    const ws = wb.Sheets[masterSheetName];
    const rawData = XLSX.utils.sheet_to_json(ws) as any[];
    const parsedMaster: DataMasterItem[] = [];

    rawData.forEach((row, index) => {
      const no = Number(row['No'] || row['No.'] || row['Nomor'] || index + 1);
      const elemen = String(row['Elemen'] || row['Elemen Capaian'] || 'Membaca - Memirsa').trim();
      const cp = String(row['Capaian Pembelajaran'] || row['CP'] || row['CP/ATP'] || '').trim();
      const ipk = String(row['IPK'] || row['IPK (Alur Tujuan)'] || row['Alur Tujuan'] || '').trim();
      const materi = String(row['Materi'] || row['Materi Pokok'] || '').trim();
      const indikator = String(row['Indikator Soal'] || row['Indikator'] || '').trim();
      const bentuk = String(row['Bentuk Tes'] || row['Bentuk Soal'] || 'Pilihan Ganda').trim();
      
      const levelRaw = String(row['Level Kognitif'] || row['Level'] || 'L2 (MOTS)').trim();
      let levelKognitif: LevelKognitif = 'L2 (MOTS)';
      if (levelRaw.includes('L1') || levelRaw.toLowerCase().includes('lots')) levelKognitif = 'L1 (LOTS)';
      else if (levelRaw.includes('L3') || levelRaw.toLowerCase().includes('hots')) levelKognitif = 'L3 (HOTS)';

      const dimRaw = String(row['Dimensi Deep Learning'] || row['Deep Learning'] || 'Mindful Learning').trim();
      let deepLearningDimension: DeepLearningDimension = 'Mindful Learning';
      if (dimRaw.toLowerCase().includes('meaningful') || dimRaw.toLowerCase().includes('makna')) deepLearningDimension = 'Meaningful Learning';
      else if (dimRaw.toLowerCase().includes('joyful') || dimRaw.toLowerCase().includes('senang')) deepLearningDimension = 'Joyful Learning';

      const sukarRaw = String(row['Tingkat Kesukaran'] || row['Kesukaran'] || 'Sedang').trim();
      let tingkatKesukaran: 'Mudah' | 'Sedang' | 'HOTS / Sukar' = 'Sedang';
      if (sukarRaw.toLowerCase().includes('mudah')) tingkatKesukaran = 'Mudah';
      else if (sukarRaw.toLowerCase().includes('sukar') || sukarRaw.toLowerCase().includes('hots')) tingkatKesukaran = 'HOTS / Sukar';

      if (materi || cp || ipk || indikator) {
        parsedMaster.push({
          no,
          elemen,
          capaianPembelajaran: cp,
          ipk,
          materi,
          indikatorSoal: indikator,
          bentukTes: bentuk,
          levelKognitif,
          deepLearningDimension,
          tingkatKesukaran
        });
      }
    });

    if (parsedMaster.length > 0) {
      result.masterList = parsedMaster;
    }
  }

  return result;
}

export function exportToJson(
  identitas: IdentitasSekolahGuru,
  masterList: DataMasterItem[],
  soalList: DataSoalItem[]
) {
  const data = {
    identitas,
    masterList,
    soalList,
    exportDate: new Date().toISOString(),
    version: '2.0-kumer-deeplearning'
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Backup_Kisi_KartuSoal_${identitas.mataPelajaran.replace(/\s+/g, '_')}_${identitas.jenjangTes}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function parseJsonFile(file: File): Promise<{
  identitas?: IdentitasSekolahGuru;
  masterList?: DataMasterItem[];
  soalList?: DataSoalItem[];
}> {
  const text = await file.text();
  const parsed = JSON.parse(text);
  return {
    identitas: parsed.identitas,
    masterList: parsed.masterList,
    soalList: parsed.soalList
  };
}
