import { IdentitasSekolahGuru, DataMasterItem, DataSoalItem } from '../types';

export const defaultIdentitas: IdentitasSekolahGuru = {
  namaSekolah: 'SMK MUHAMMADIYAH BAWANG',
  instansiAtas1: 'MAJLIS PENDIDIKAN DASAR DAN MENENGAH',
  instansiAtas2: 'DAERAH MUHAMMADIYAH BATANG',
  akreditasi: 'T E R A K R E D I T A S I  “A”',
  alamatSekolah: 'Jl. Bawang-Sukorejo Km 01 Ds. Jlamprang Kec. Bawang Kab. Batang.',
  emailSekolah: 'smkmuhbawang@gmail.com',
  websiteSekolah: 'www.smkmuhiba.sch.id',
  kontakSekolah: 'Kode Pos. 51274 Telp. (0285) 4486909 Fax. (0285) 4486899',
  logoUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzWdtCjCcX2chJuhLX_26N5MmkVK-1SkyO7kgXznQQJPQa6_TB_EJzD1WWpztg7yX9RBRE7rGn0t2Z3FdG06mwwT6pQix8t6vnlcOBm_EgGl9z0jeJemJkppP0KIIjkXGksQvaCLh2dz-gOF6a2H213VQBL6Am8Elhmd76OOnphogk-EoTTbkYbg0TQJhv/s512/34690.png',
  kepalaSekolah: 'Imam Pamungkas, S.Pd., M.Si.',
  nbmKepalaSekolah: '-',
  nipKepalaSekolah: '-',
  mataPelajaran: 'Bahasa Inggris',
  kurikulum: 'Kurikulum Merdeka',
  fase: 'Fase F (Kelas XI - XII)',
  kelas: 'XI',
  semester: 'Gasal',
  kompetensiKeahlian: 'XI / Semua Kompetensi Keahlian',
  bentukTes: 'Pilihan Ganda',
  jenjangTes: 'ASTS',
  namaJenjangTesLengkap: 'Asesmen Sumatif Tengah Semester (ASTS)',
  jumlahSoal: 50,
  alokasiWaktu: '90 Menit',
  tahunAjaran: '2025/2026',
  penyusun: 'Hendra Setiawan, S.Pd.',
  nipPenyusun: '-',
  nbmPenyusun: '-',
  bukuSumber: 'Modul Bahasa Inggris Fase F, Internet, English for Change',
  tanggalPenyusunan: '10 Maret 2026',
  tempatPenyusunan: 'Bawang, Batang',
  pendekatan: 'Deep Learning (Mindful, Meaningful, Joyful Learning)',
};

const cpMembaca1 = `By the end of Phase F, students use English to communicate with teachers, peers and others in a range of settings and for a range of purposes. They use and respond to open-ended questions and use strategies to initiate, sustain and conclude conversations and discussion. They understand and identify the main ideas and relevant details of discussions or presentations on a wide range of topics. They use English to express opinions on social issues and to discuss youth-related interests, behaviours and values across cultural contexts. They formulate opinions, make comparisons and evaluate perspectives. They employ self-correction and repair strategies, and use non-verbal elements such as gestures, speed and pitch to be understood in most contexts.`;

const cpMembaca2 = `By the end of Phase F, students independently read and respond to a wide range of texts such as narratives, descriptives, expositions, procedures, argumentatives and discussions. They read to learn and read for pleasure. They locate, synthesize and evaluate specific details and gist from a range of text genres. These texts may be in the form of print or digital texts, including visual, multimodal or interactive texts. They demonstrate an understanding of the main ideas, issues or plot development in a range of texts. They identify the author's purpose and make inference to comprehend implicit information in the text.`;

const cpMenulis = `By the end of Phase F, students independently write an extensive range of fictional and factual text types, showing an awareness of purpose and audience. They plan, write, review and redraft a range of text types with some evidence of self-correction strategies, including punctuation, capitalization and tenses. They express complex ideas and use a wide range of vocabulary and verb tenses in their writing. They include topic sentences in their paragraphs and use time markers for sequencing, also conjunctions, connectives and pronoun references for linking or contrasting ideas between and within paragraphs. They present information using different modes of presentation to suit different audiences and to achieve different purposes, in print and digital forms.`;

export const defaultSoalList: DataSoalItem[] = [
  {
    no: 1,
    kunci: 'D',
    rumusanSoal: 'What do you think of the new shopping mall near our school?',
    pilihanA: "I don't think so.",
    pilihanB: 'I agree.',
    pilihanC: 'I disagree.',
    pilihanD: 'I think it has many good stores.',
    pilihanE: 'I am not sure.',
    skor: 2,
    pembahasan: 'Memberikan pendapat (Giving an opinion) yang relevan terhadap fasilitas pusat perbelanjaan baru.'
  },
  {
    no: 2,
    kunci: 'C',
    rumusanSoal: '... children should play outside more.',
    pilihanA: "I can't believe",
    pilihanB: 'I learn that',
    pilihanC: 'In my opinion',
    pilihanD: 'Do you think that..',
    pilihanE: 'I disagree that',
    skor: 2,
    pembahasan: 'Frasa "In my opinion" digunakan untuk mengawali opini pribadi.'
  },
  {
    no: 3,
    kunci: 'A',
    rumusanSoal: "Tita: Today is very busy. Dina: I agree. Tita: ... of our new manager? Dina: I think she's very good at managing the office.",
    pilihanA: 'What do you think',
    pilihanB: 'Do you think',
    pilihanC: 'Do you agree',
    pilihanD: 'What should we think',
    pilihanE: 'How come',
    skor: 2,
    pembahasan: '"What do you think of..." merupakan ungkapan menanyakan pendapat (asking opinion).'
  },
  {
    no: 4,
    kunci: 'D',
    rumusanSoal: 'What do you think of the new shopping mall near our school?',
    pilihanA: "I don't think so.",
    pilihanB: 'I agree.',
    pilihanC: 'I disagree.',
    pilihanD: 'I think it has many good stores.',
    pilihanE: 'Never mind.',
    skor: 2,
    pembahasan: 'Respon yang bermakna dan koheren terhadap pertanyaan pendapat.'
  },
  {
    no: 5,
    kunci: 'A',
    rumusanSoal: 'Sinta: I feel that students should do more discussion at class. Jeni: ... Discussion can help us to develop our critical thinking skill.',
    pilihanA: 'I could not agree more.',
    pilihanB: 'I disagree.',
    pilihanC: "I'm not sure.",
    pilihanD: "I don't think so.",
    pilihanE: 'Are you serious?',
    skor: 2,
    pembahasan: '"I could not agree more" berarti sangat setuju (strong agreement).'
  },
  {
    no: 6,
    kunci: 'A',
    rumusanSoal: '... the new rules can make students learn better. 6:30 is too early for students to come to school.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
    mediaCaption: 'Gambar 1. School Library and Study Environment',
    pilihanA: 'I doubt that',
    pilihanB: 'I think',
    pilihanC: 'In my opinion',
    pilihanD: 'I agree',
    pilihanE: 'Certainly',
    skor: 2,
    pembahasan: 'Konteks meragukan/tidak setuju dengan aturan masuk terlalu pagi (6:30).'
  },
  {
    no: 7,
    kunci: 'B',
    rumusanSoal: 'Roni: What should we do for our group project? You: ...',
    pilihanA: "I don't think so.",
    pilihanB: 'I think we should do a small presentation.',
    pilihanC: 'I doubt that.',
    pilihanD: 'Are you sure?',
    pilihanE: 'I disagree completely.',
    skor: 2,
    pembahasan: 'Memberikan usulan/saran kolaboratif dalam proyek belajar (Joyful & Meaningful Learning).'
  },
  {
    no: 8,
    kunci: 'C',
    rumusanSoal: 'I really like Bali. ... Bali is the best island in Indonesia.',
    pilihanA: "I don't like it",
    pilihanB: 'I doubt that',
    pilihanC: 'I think',
    pilihanD: 'I agree',
    pilihanE: 'You know',
    skor: 2,
    pembahasan: 'Mengungkapkan keyakinan atau pandangan pribadi dengan kata "I think".'
  },
  {
    no: 9,
    kunci: 'A',
    rumusanSoal: "Lisa: Do you think that these flowers can be good present for Father's Day? Rini: ... but I think a tie would be better. Your father can wear it for work.",
    pilihanA: "I'm not so sure",
    pilihanB: 'I think so',
    pilihanC: 'I agree',
    pilihanD: 'I will think about it',
    pilihanE: 'Definitely yes',
    skor: 2,
    pembahasan: 'Menyatakan keraguan secara santun sebelum mengusulkan opsi yang lebih bermakna.'
  },
  {
    no: 10,
    kunci: 'A',
    rumusanSoal: 'Bintang: I think everyone should have a pet. Rona: Why? ... pet is very expensive. Bintang: In my opinion, pet can make us to be more responsible.',
    pilihanA: 'As far as I know',
    pilihanB: 'I disagree',
    pilihanC: "I don't think so",
    pilihanD: 'Are you sure?',
    pilihanE: 'No way',
    skor: 2,
    pembahasan: '"As far as I know" menyatakan pengetahuan atau sudut pandang yang dipahami penutur.'
  },
  {
    no: 11,
    kunci: 'A',
    rumusanSoal: "Kate: We'll have a long holiday next month. What are you going to do? Yani: .... Kate: I hope you have a nice trip. Complete the dialogue above ....",
    pilihanA: 'I am thinking of going to Bali',
    pilihanB: "Sorry, I can't tell you",
    pilihanC: "It's not your business",
    pilihanD: 'I have nothing to do',
    pilihanE: 'I prefer studying alone',
    skor: 2,
    pembahasan: 'Respon yang bersesuaian dengan ungkapan harapan "I hope you have a nice trip".'
  },
  {
    no: 12,
    kunci: 'A',
    rumusanSoal: 'Alex: What do you think about the film? Bram: I think ....................... Complete the dialogue above ....',
    pilihanA: 'I like it',
    pilihanB: 'Thank you',
    pilihanC: "I can't hear you",
    pilihanD: 'You forget it',
    pilihanE: 'I am hungry',
    skor: 2,
    pembahasan: 'Jawaban yang tepat memberikan opini terhadap film.'
  },
  {
    no: 13,
    kunci: 'D',
    rumusanSoal: "Eric: I think our city is very hot at the moment. Era: I don't think so ................ Our city is much cooler than other cities in this country. Complete the dialogue above ....",
    pilihanA: 'I know it',
    pilihanB: 'I am thinking of',
    pilihanC: 'He forget it',
    pilihanD: 'In my opinion',
    pilihanE: 'Are you sure',
    skor: 2,
    pembahasan: '"In my opinion" mendukung kalimat sanggahan terhadap persepsi suhu kota.'
  },
  {
    no: 14,
    kunci: 'B',
    rumusanSoal: "Bowo: I feel tired and I feel dizzy. Sri: I think …. Don't leave the bed if it is not necessary. Complete the dialogue above ....",
    pilihanA: 'You must sing',
    pilihanB: 'You should lie down and have some rest',
    pilihanC: 'You can see the doctor tonight',
    pilihanD: 'I will take you to the hospital',
    pilihanE: 'You should play games',
    skor: 2,
    pembahasan: 'Memberikan saran kepedulian kesehatan (Mindful & empathetic suggestion).'
  },
  {
    no: 15,
    kunci: 'B',
    rumusanSoal: "Dave: So what do you think of my singing? John: It's really good, but I suggest to try singing in a high tune. Dave: Thanks, John. John: No problem, Dave! From the dialogue above, John is...",
    pilihanA: 'Asking for help',
    pilihanB: 'Giving an opinion',
    pilihanC: 'Giving help',
    pilihanD: 'Asking for an opinion',
    pilihanE: 'Refusing an offer',
    skor: 2,
    pembahasan: 'John memberikan penilaian/pendapat beserta saran konstruktif terhadap nyanyian Dave.'
  },
  {
    no: 16,
    kunci: 'C',
    rumusanSoal: "Jade: What do you think of my drawing? Rose: It's amazing, but I think you should erase the scribbles over here. Jade: Thank you so much for your opinion, Rose! Rose: My pleasure. From the dialogue above, Rose is...",
    pilihanA: 'Asking for attention',
    pilihanB: 'Asking a question',
    pilihanC: 'Giving an opinion',
    pilihanD: 'Giving help',
    pilihanE: 'Offering service',
    skor: 2,
    pembahasan: 'Rose memberikan opini dan apresiasi terhadap karya gambar temannya.'
  },
  {
    no: 17,
    kunci: 'D',
    rumusanSoal: 'Dirk: Can you give me an opinion about my sculpture? Jake: Sure thing! I think you should have had fixed the hand. Dirk: Thanks, Jake. Jake: No problem! From the dialogue above, Dirk is...',
    pilihanA: 'Asking for help',
    pilihanB: 'Giving help',
    pilihanC: 'Giving opinion',
    pilihanD: 'Asking for an opinion',
    pilihanE: 'Accepting compliment',
    skor: 2,
    pembahasan: 'Dirk meminta pendapat (Asking for an opinion).'
  },
  {
    no: 18,
    kunci: 'A',
    rumusanSoal: "Jane: Roxy, what do you think of the cake I bake? Roxy: It's really delicious! I love it! Jane: Yes! From the dialogue above, Jane is...",
    pilihanA: 'Asking for an opinion',
    pilihanB: 'Asking for help',
    pilihanC: 'Requesting for attention',
    pilihanD: 'Giving an item',
    pilihanE: 'Giving a compliment',
    skor: 2,
    pembahasan: 'Jane meminta pendapat mengenai kue buatannya.'
  },
  {
    no: 19,
    kunci: 'A',
    rumusanSoal: "X: We'll have a long holiday next month. What are you going to do? Y: .... X: I hope you have a nice trip.",
    pilihanA: 'I am thinking of going to Bali',
    pilihanB: "Sorry, I can't tell you",
    pilihanC: "It's not your business",
    pilihanD: 'I have nothing to do',
    pilihanE: 'I am working hard',
    skor: 2,
    pembahasan: 'Menyampaikan rencana perjalanan liburan yang logis dengan tanggapan penanya.'
  },
  {
    no: 20,
    kunci: 'A',
    rumusanSoal: 'A: What do you think about the film? B: I think .......................',
    pilihanA: 'I like it',
    pilihanB: 'Thank you',
    pilihanC: "I can't hear you",
    pilihanD: 'You forget it',
    pilihanE: 'Never mind',
    skor: 2,
    pembahasan: 'Respon positif terhadap apresiasi film.'
  },
  {
    no: 21,
    kunci: 'D',
    rumusanSoal: "Eric: I think our city is very hot at the moment. Eric: I don't think so ................ Our city is much cooler than other cities in this country.",
    pilihanA: 'I know it',
    pilihanB: 'I am thinking of',
    pilihanC: 'He forget it',
    pilihanD: 'In my opinion',
    pilihanE: 'To tell the truth',
    skor: 2,
    pembahasan: 'Memberikan sudut pandang alternatif mengenai kondisi kota.'
  },
  {
    no: 22,
    kunci: 'B',
    rumusanSoal: "Bowo: I feel tired and I feel dizzy. Sri: I think …. Don't leave the bed if it is not necessary.",
    pilihanA: 'You must sing',
    pilihanB: 'You should lie down and have some rest',
    pilihanC: 'You can see the doctor tonight',
    pilihanD: 'I will take you to the hospital',
    pilihanE: 'You can go swimming',
    skor: 2,
    pembahasan: 'Saran tindakan untuk orang yang lelah dan pusing.'
  },
  {
    no: 23,
    kunci: 'D',
    rumusanSoal: "Your friend situation: I've gained some weight. What should be the response to this statement?",
    pilihanA: 'I would suggest you to drink a lot.',
    pilihanB: 'I would suggest you to sleep earlier.',
    pilihanC: 'I would suggest you to go to the cinema.',
    pilihanD: 'I would suggest you to change your lifestyle.',
    pilihanE: 'I suggest you eat more fast food.',
    skor: 2,
    pembahasan: 'Memberikan saran gaya hidup sehat yang relevan (Meaningful Learning).'
  },
  {
    no: 24,
    kunci: 'C',
    rumusanSoal: "Doctor's advice below is correct, except…",
    pilihanA: 'You should take a bed rest',
    pilihanB: 'I suggest you to eat chicken soup',
    pilihanC: 'I advise you to eat ice cream more',
    pilihanD: 'My advice is to wear mask outside, to protect yourself and other people.',
    pilihanE: 'Drink enough warm water',
    skor: 2,
    pembahasan: 'Makan es krim berlebih bukan anjuran medis saat sakit (analisis kritis).'
  },
  {
    no: 25,
    kunci: 'C',
    rumusanSoal: 'Situation: My neighbor is noisy. You should…………',
    pilihanA: 'Let them be.',
    pilihanB: 'Tell your neighbor to increase their voice',
    pilihanC: 'Tell politely to neighbor to be silent for a while',
    pilihanD: "I don't know, tell me!",
    pilihanE: 'Shout at them loudly',
    skor: 2,
    pembahasan: 'Menyelesaikan konflik tetangga dengan santun dan beradab (Mindful communication).'
  },
  {
    no: 26,
    kunci: 'D',
    rumusanSoal: 'Situation: I have toothache. What should I do? The suggestion is proper, except…',
    pilihanA: 'If I were you, I would go to the dentist.',
    pilihanB: "Why don't you go to the dentist?",
    pilihanC: 'I would suggest to take pain killer pills. Maybe it will help?',
    pilihanD: "I'm sorry I never had toothache.",
    pilihanE: 'Gargle with warm salt water.',
    skor: 2,
    pembahasan: 'Pernyataan D bukan merupakan saran atau tindakan bantuan solutif.'
  },
  {
    no: 27,
    kunci: 'D',
    rumusanSoal: 'Situation: You want to test your crush, but you are afraid to do that. You want to ask for some advice from your friend. You can say all the followings, except ….',
    pilihanA: 'What do you think I should do?',
    pilihanB: 'Can I ask your advice about texting my crush?',
    pilihanC: 'Do you think it is better to test or not to test him/her?',
    pilihanD: "Why don't you text him/her?",
    pilihanE: 'What is your suggestion for me?',
    skor: 2,
    pembahasan: 'Pilihan D adalah bentuk memberi saran, bukan meminta saran (asking for advice).'
  },
  {
    no: 28,
    kunci: 'A',
    rumusanSoal: "Situation: Your friend needs a book for his homework. But he doesn't have enough money to buy it. What will you suggest him?",
    pilihanA: 'You should borrow from our senior',
    pilihanB: "I think you shouldn't do the homework.",
    pilihanC: 'You ought to get some rest.',
    pilihanD: "Why don't you go to book store?",
    pilihanE: 'Just give up.',
    skor: 2,
    pembahasan: 'Solusi realistis dan saling membantu antarsiswa (collaboration).'
  },
  {
    no: 29,
    kunci: 'C',
    rumusanSoal: 'Situation: You and your friends are on a trip to Pasir Putih beach. However, none of you knows about the route to the beach. What will be your suggestion?',
    pilihanA: 'I think we can go home now.',
    pilihanB: 'What about going to a restaurant?',
    pilihanC: 'You should open Google Maps application on your phone.',
    pilihanD: 'You should read the instruction more carefully.',
    pilihanE: 'We can wait here until tomorrow.',
    skor: 2,
    pembahasan: 'Pemanfaatan teknologi navigasi digital secara solutif.'
  },
  {
    no: 30,
    kunci: 'B',
    rumusanSoal: 'Situation: I want to have a healthier lifestyle. What should I do?',
    pilihanA: "Don't do it.",
    pilihanB: 'You should sleep better, eat healthier and do workout.',
    pilihanC: 'You should sleep better, eat healthier and do workout.',
    pilihanD: "I don't like eating vegetables.",
    pilihanE: 'Stay up late every night.',
    skor: 2,
    pembahasan: 'Saran komprehensif untuk gaya hidup sehat (pilihan B).'
  },
  {
    no: 31,
    kunci: 'B',
    rumusanSoal: 'Amir: I am not good at English. Budi: …………………….. Complete the dialogue above with an advice …..',
    pilihanA: 'I should practice English every day',
    pilihanB: "Why don't you take an English course and practice every day?",
    pilihanC: 'Do you like English?',
    pilihanD: 'I must take an English course',
    pilihanE: 'English is not important',
    skor: 2,
    pembahasan: '"Why don\'t you..." merupakan pola baku dalam memberikan saran (offering suggestion).'
  },
  {
    no: 32,
    kunci: 'D',
    rumusanSoal: "Andi: I have a bad headache. Budi: You'd better …………………. Complete the dialogue above ….",
    pilihanA: 'Taking an aspirin',
    pilihanB: 'An aspirin',
    pilihanC: 'Take an aspirin',
    pilihanD: 'To take an aspirin',
    pilihanE: 'Took an aspirin',
    skor: 2,
    pembahasan: 'Struktur gramatikal ekspresi saran dan rekomendasi obat.'
  },
  {
    no: 33,
    kunci: 'D',
    rumusanSoal: "Johan: Do you think I should study tonight? Romli: I am afraid I can't help you. Decide it yourself. The underlined expression shows that ….",
    pilihanA: 'Your roommate gives you some advice',
    pilihanB: 'Your roommate warns you',
    pilihanC: 'Your roommate asks for some advice',
    pilihanD: 'Your roommate refuses to give you some advice',
    pilihanE: 'Your roommate agrees with you',
    skor: 2,
    pembahasan: 'Romli menolak memberikan saran dan menyerahkan keputusan pada Johan.'
  },
  {
    no: 34,
    kunci: 'B',
    rumusanSoal: 'Erwin: I am interested in her. She is such a smart girl. Eman: … Which one is the best expression to fill the gap?',
    pilihanA: 'What should I do?',
    pilihanB: 'You should ask her to go on a date with you',
    pilihanC: 'Should I wait for him/her to make a move?',
    pilihanD: 'I will ask her about her news!',
    pilihanE: 'Forget her immediately',
    skor: 2,
    pembahasan: 'Eman memberikan saran tindak lanjut yang konstruktif terhadap ketertarikan temannya.'
  },
  {
    no: 35,
    kunci: 'B',
    rumusanSoal: "Mother: Ali, where are you? Wake up, my dear. It's Monday morning. Ali: I'm here, mom, in my bedroom. Mother: Oh…. there you are. Don't you go to school? Ali: Mom, I have got a headache. Mother: Let me check. You have got a high temperature. You should stay at home. Ali: Okay, mom. Which sentence shows giving suggestion?",
    pilihanA: 'I have got a headache.',
    pilihanB: 'You should stay at home.',
    pilihanC: "Don't you go to school?",
    pilihanD: 'Let me check.',
    pilihanE: "It's Monday morning.",
    skor: 2,
    pembahasan: '"You should stay at home" mengandung modal auxiliary "should" untuk memberi saran.'
  },
  {
    no: 36,
    kunci: 'D',
    rumusanSoal: "Rafi: I have a serious problem today. I have just lost my driver's license. Sifa: Don't be so sad, my friend, let us search it around the park. Rafi: I have looked for it for hours, but I could not find it. Do you have any suggestion? Sifa: You should tell the security to announce it to other students. Rafi: Yeah, that sounds good. I do hope it helps. Which sentence shows asking suggestion?",
    pilihanA: "Don't be so sad, my friend.",
    pilihanB: "I have just lost my driver's license.",
    pilihanC: 'You should tell the security.',
    pilihanD: 'Do you have any suggestion?',
    pilihanE: 'Yeah, that sounds good.',
    skor: 2,
    pembahasan: '"Do you have any suggestion?" adalah kalimat eksplisit meminta saran.'
  },
  {
    no: 37,
    kunci: 'A',
    rumusanSoal: 'Indah: Look at the views. What do you think about the river? Andi: I think ………..',
    pilihanA: 'It is amazing',
    pilihanB: 'I can do nothing',
    pilihanC: 'Yes, good',
    pilihanD: 'I can swim',
    pilihanE: 'It is closed',
    skor: 2,
    pembahasan: 'Memberikan pendapat tentang keindahan pemandangan alam (Joyful & Mindful appreciating nature).'
  },
  {
    no: 38,
    kunci: 'A',
    rumusanSoal: "Wina: I've a problem with my mobile phone. What's your idea? Sina: …………… Wina: That's a good idea.",
    pilihanA: 'I think you should buy the new one',
    pilihanB: 'How a pity you are.',
    pilihanC: "That's not my business",
    pilihanD: 'Making a call is easy',
    pilihanE: 'Throw it away',
    skor: 2,
    pembahasan: 'Sina memberikan saran solusi praktis.'
  },
  {
    no: 39,
    kunci: 'B',
    rumusanSoal: 'Amina: It’s nearly school holiday. What are you going to do? Marta: …………… Amina: Have a nice holiday! Marta: Thank you.',
    pilihanA: 'I think I am going to Bandung',
    pilihanB: "I don't know yet",
    pilihanC: "It's a secret",
    pilihanD: 'What do you think about holiday?',
    pilihanE: 'I hate holidays',
    skor: 2,
    pembahasan: 'Kesesuaian konteks respon liburan sekolah.'
  },
  {
    no: 40,
    kunci: 'C',
    rumusanSoal: "Dili: What's your opinion about that novel? Theo: I like it. It is an interesting story. From the dialogue we conclude that …",
    pilihanA: 'Dili is giving her opinion',
    pilihanB: "Theo doesn't like the novel",
    pilihanC: "Dili is asking Theo's opinion",
    pilihanD: "Dili agrees with Theo's opinion",
    pilihanE: 'Theo is asking for help',
    skor: 2,
    pembahasan: 'Dili melontarkan pertanyaan untuk menanyakan opini kawan tentang novel.'
  },
  {
    no: 41,
    kunci: 'B',
    rumusanSoal: "Boni: I feel tired and I feel dizzy. Sri: I think …. Don't leave the bed if it is not necessary. Complete the dialogue above ………………..",
    pilihanA: 'You must sing',
    pilihanB: 'You should lie down and have some rest',
    pilihanC: 'You can see the doctor tonight',
    pilihanD: 'I will take you to the hospital',
    pilihanE: 'You can work more',
    skor: 2,
    pembahasan: 'Saran istirahat yang tepat sesuai kondisi kelelahan.'
  },
  {
    no: 42,
    kunci: 'D',
    rumusanSoal: "Liana: Film of Kartini it's so inspiring. And what do you think about the inspiring film of Kartini? Bram: I think ……………..",
    pilihanA: 'Thank you, Kartini',
    pilihanB: "You forget Kartini's day",
    pilihanC: "I can't hear you call Kartini",
    pilihanD: "I love Kartini's film it is so inspiring me",
    pilihanE: 'Kartini was born in April',
    skor: 2,
    pembahasan: 'Opini afirmatif mengenai nilai keteladanan pahlawan nasional (Meaningful context).'
  },
  {
    no: 43,
    kunci: 'A',
    rumusanSoal: "Jannah: I think our city is saved from the virus, so we can go around. Ellisa: But I don't think so, ………….. Our city is not saved. We must stay at home at least in this emergency time.",
    pilihanA: 'In my opinion',
    pilihanB: 'She forgets it',
    pilihanC: 'See you next time',
    pilihanD: 'You know it',
    pilihanE: 'I believe so',
    skor: 2,
    pembahasan: 'Pemberian opini kritis berdasarkan situasi darurat kesehatan publik.'
  },
  {
    no: 44,
    kunci: 'D',
    rumusanSoal: 'Damar: … our Biology class is so fun and very interesting. Tania: Yes, you are right. I think so too. The Biology teacher conveys the lesson interestingly making the classroom atmosphere pleasant.',
    pilihanA: 'The teacher disagree',
    pilihanB: 'Tania agree',
    pilihanC: "I don't like it",
    pilihanD: 'I think',
    pilihanE: 'Do you agree',
    skor: 2,
    pembahasan: 'Ekspresi pembuka opini positif tentang proses belajar mengajar (Joyful Learning).'
  },
  {
    no: 45,
    kunci: 'A',
    rumusanSoal: 'Kano: How do you feel the temperature here? Andi: ………….. Bina: I think so. We need to open all windows.',
    pilihanA: 'So hot here.',
    pilihanB: 'Good Job.',
    pilihanC: 'Yes, I Believe',
    pilihanD: 'Nice weather',
    pilihanE: 'Very freezing',
    skor: 2,
    pembahasan: 'Respon suhu panas yang memicu kebutuhan membuka jendela bersama.'
  },
  {
    no: 40,
    tipeSoal: 'PG_SEDERHANA',
    kunci: 'A',
    rumusanSoal: "Complete the dialogue below!\nFather: Exam is in the corner. It's time to study seriously.\nChild: Okay, Dad.\nFather: What are you going to do first?\nChild: ........\nFather: That's a good plan.",
    pilihanA: 'I am thinking of making a study schedule.',
    pilihanB: 'I am not sure about it.',
    pilihanC: 'I will play games now.',
    pilihanD: 'I think studying is boring.',
    pilihanE: 'Never mind.',
    skor: 2,
    pembahasan: 'Ungkapan rencana terstruktur yang menunjukkan kemandirian belajar (Mindful Learning).'
  },
  // SOAL PILIHAN GANDA KOMPLEKS MCMA (MULTIPLE CHOICES MULTIPLE ANSWERS) - LIMA PERNYATAAN
  {
    no: 41,
    tipeSoal: 'PGK_MCMA',
    kunci: 'B, C, D',
    rumusanSoal: 'Perhatikan situasi diskusi kelas berikut! Manakah pernyataan berikut yang merupakan ungkapan memberi saran dan opini santun secara tepat? (Pilihlah jawaban yang benar! Jawaban benar dapat lebih dari satu dari lima pernyataan berikut):',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedCode: '<iframe width="100%" height="220" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video Stimulus" frameborder="0" allowfullscreen></iframe>',
    mediaCaption: 'Video Stimulus 1: Analytical Discussion on Collaborative Decision Making',
    pilihanA: 'You must follow all my instructions without any questions.',
    pilihanB: 'In my opinion, we should divide the presentation slides equally among members.',
    pilihanC: 'I would suggest that we review the assessment rubric before final submission.',
    pilihanD: 'What if we consult our teacher first regarding the experimental methodology?',
    pilihanE: 'Your argument is completely irrelevant and makes no sense.',
    skor: 3,
    pembahasan: 'Pernyataan B, C, dan D adalah bentuk kolaboratif dan santun dalam menyampaikan gagasan (Meaningful & Joyful Learning).'
  },
  {
    no: 42,
    tipeSoal: 'PGK_MCMA',
    kunci: 'A, C, E',
    rumusanSoal: 'Bacalah kutipan dialog apresiasi film berikut:\nLiana: "The film of Kartini is truly inspiring. What do you think about the film?"\nBram: "I believe it represents women empowerment, educational struggle, and moral courage."\nManakah pernyataan yang sesuai dengan esensi dialog di atas? (Pilihlah semua jawaban yang benar dari lima pernyataan berikut):',
    pilihanA: 'Bram memberikan opini positif terhadap film biografi Kartini.',
    pilihanB: 'Liana menolak gagasan perjuangan pendidikan dalam film.',
    pilihanC: 'Film tersebut menginspirasi pemirsa tentang keberanian moral perempuan.',
    pilihanD: 'Dialog tersebut berisi perselisihan pendapat yang tajam antarpenutur.',
    pilihanE: 'Konteks percakapan memuat nilai keteladanan pahlawan nasional.',
    skor: 3,
    pembahasan: 'Pernyataan A, C, dan E selaras dengan makna kontekstual dialog (Deep Learning: Meaningful).'
  },
  {
    no: 43,
    tipeSoal: 'PGK_MCMA',
    kunci: 'A, B, D',
    rumusanSoal: 'Disajikan topik: "Digital Literacy in Vocational High Schools". Manakah pernyataan di bawah ini yang mencerminkan sikap kritis dan etis dalam memanfaatkan kecerdasan buatan dan internet? (Pilihlah semua pernyataan yang benar dari lima opsi berikut):',
    pilihanA: 'Verifying information from multiple credible academic sources before drawing conclusions.',
    pilihanB: 'Respecting intellectual property and acknowledging original authors through proper citations.',
    pilihanC: 'Copying generated responses directly without evaluating accuracy or factual truth.',
    pilihanD: 'Using AI tools collaboratively as learning partners to enhance critical thinking skills.',
    pilihanE: 'Sharing unverified assessment answers on social media communities during examinations.',
    skor: 3,
    pembahasan: 'Pernyataan A, B, dan D mencerminkan dimensi Berkesadaran (Mindful Learning) dan etika digital.'
  },
  {
    no: 44,
    tipeSoal: 'PGK_MCMA',
    kunci: 'B, C, E',
    rumusanSoal: 'Bacalah konteks dialog berikut:\nDamar: "Our Biology class today is so joyful and interactive."\nTania: "I couldn’t agree more. The teacher encouraged us to do field observation and group synthesis."\nManakah indikator pembelajaran yang tercermin dari dialog tersebut? (Pilihlah semua pernyataan yang tepat dari lima pilihan):',
    pilihanA: 'Peserta didik merasa tertekan dengan materi yang bersifat pasif hafalan.',
    pilihanB: 'Tania menyatakan persetujuan kuat (strong agreement) terhadap pendapat Damar.',
    pilihanC: 'Model pembelajaran yang diterapkan menerapkan prinsip Joyful & Meaningful Learning.',
    pilihanD: 'Kedua siswa memiliki perbedaan pandangan mengenai guru pengampu.',
    pilihanE: 'Aktivitas belajar berbasis observasi langsung dan sintesis kolaboratif.',
    skor: 3,
    pembahasan: 'Pernyataan B, C, dan E secara akurat menggambarkan dinamika interaksi dalam dialog.'
  },
  {
    no: 45,
    tipeSoal: 'PGK_MCMA',
    kunci: 'A, C, D',
    rumusanSoal: 'Perhatikan ragam frasa bahasa Inggris berikut! Manakah frasa yang lazim digunakan untuk menyatakan kesepakatan (Agreement) dalam diskusi akademik? (Pilihlah jawaban yang benar dari lima opsi berikut):',
    pilihanA: 'I could not agree more with your perspective.',
    pilihanB: 'I am afraid I have completely opposite conclusion.',
    pilihanC: 'That is exactly what I have in mind.',
    pilihanD: 'You have made a very valid and persuasive point.',
    pilihanE: 'I strongly doubt the credibility of that finding.',
    skor: 3,
    pembahasan: 'Frasa A, C, dan D merupakan ungkapan formal untuk menyatakan persetujuan (Agreement).'
  },
  // SOAL PILIHAN GANDA KOMPLEKS KATEGORI - TIGA PERNYATAAN (BENAR / SALAH)
  {
    no: 46,
    tipeSoal: 'PGK_KATEGORI',
    kunci: 'Benar, Salah, Benar',
    rumusanSoal: `Perhatikan teks kearifan lokal berikut:\nSifa: "What do you think about Lampung?"\nLisa: "In my opinion, Lampung is a beautiful city. There are so many beautiful beaches there. Lampung is also famous for its tapis or songket. It is traditional cloth in Lampung."\nSifa: "How about its food? Do you think it is delicious?"\nLisa: "I think…. Yes! Do you know seruit? It’s delicious."\n\nTentukan kategori Benar atau Salah untuk setiap pernyataan berikut berdasarkan teks di atas:`,
    mediaType: 'image',
    embedCode: '<img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" alt="Cultural Heritage of Lampung" class="max-h-48 mx-auto rounded-lg border border-slate-200" />',
    mediaCaption: 'Gambar Stimulus: Budaya Tradisional dan Kain Tapis Lampung',
    pilihanA: 'Lisa menyatakan opini bahwa Lampung memiliki destinasi pantai yang sangat indah.',
    pilihanB: 'Kain Tapis atau Songket dalam teks dijelaskan sebagai makanan khas masyarakat Lampung.',
    pilihanC: 'Seruit merupakan kuliner khas tradisional Lampung yang dinilai lezat oleh penutur.',
    pilihanD: '-',
    pilihanE: '-',
    kategoriLabel1: 'Benar',
    kategoriLabel2: 'Salah',
    skor: 3,
    pembahasan: 'P1: Benar (ada pada teks). P2: Salah (Tapis adalah kain tradisional, bukan kuliner). P3: Benar (Seruit adalah makanan khas lezat).'
  },
  {
    no: 47,
    tipeSoal: 'PGK_KATEGORI',
    kunci: 'Benar, Benar, Salah',
    rumusanSoal: `Bacalah dialog interaksional berikut:\nSifa: "Which one is more delicious? Seruit or sate of mushroom?"\nLisa: "According to me, seruit is more delicious than sate of mushroom."\nSifa: "I don’t think so. I think sate of mushroom is more delicious than seruit because sate of mushroom is my favorite food."\nLisa: "So we have different favorite foods then."\nSifa: "I think so."\n\nTentukan kategori Benar atau Salah untuk setiap pernyataan berikut berdasarkan dialog:`,
    pilihanA: 'Lisa dan Sifa memiliki perbedaan preferensi kuliner favorit tanpa menimbulkan pertengkaran.',
    pilihanB: 'Sifa menggunakan frasa "I don’t think so" untuk menyatakan ketidaksetujuan secara santun.',
    pilihanC: 'Sifa setuju bahwa rasa seruit jauh lebih unggul dibandingkan dengan sate jamur.',
    pilihanD: '-',
    pilihanE: '-',
    kategoriLabel1: 'Benar',
    kategoriLabel2: 'Salah',
    skor: 3,
    pembahasan: 'P1: Benar (toleransi selera). P2: Benar (polite disagreement). P3: Salah (Sifa justru lebih menyukai sate jamur).'
  },
  {
    no: 48,
    tipeSoal: 'PGK_KATEGORI',
    kunci: 'Salah, Benar, Benar',
    rumusanSoal: `Analisis fungsi kebahasaan kalimat opini berikut:\n(1) "In my opinion, vocational school prepares students with practical industrial competency."\n(2) "What do you think of modern renewable energy implementations in rural areas?"\n(3) "I believe project-based learning improves students' collaboration and problem solving."\n\nTentukan kategori Benar atau Salah untuk setiap analisis pernyataan kebahasaan di bawah ini:`,
    pilihanA: 'Kalimat nomor (1) berfungsi sebagai ungkapan menanyakan pendapat (asking for opinion).',
    pilihanB: 'Kalimat nomor (2) merupakan tuturan menanyakan opini dan gagasan kritis mitra tutur.',
    pilihanC: 'Kalimat nomor (3) menyatakan keyakinan dan pandangan pribadi penutur (giving opinion).',
    pilihanD: '-',
    pilihanE: '-',
    kategoriLabel1: 'Benar',
    kategoriLabel2: 'Salah',
    skor: 3,
    pembahasan: 'P1: Salah (kalimat 1 memberi opini, bukan bertanya). P2: Benar (asking opinion). P3: Benar (giving opinion).'
  },
  {
    no: 49,
    tipeSoal: 'PGK_KATEGORI',
    kunci: 'Benar, Salah, Benar',
    rumusanSoal: `Perhatikan prinsip Tes Kemampuan Akademik (TKA) dan Asesmen Kurikulum Merdeka berikut:\nTentukan kategori Benar atau Salah untuk masing-masing pernyataan berikut ini:`,
    pilihanA: 'Soal Pilihan Ganda Kompleks MCMA memberikan kesempatan peserta memilih lebih dari satu jawaban benar.',
    pilihanB: 'Soal Pilihan Ganda Kompleks Kategori hanya memiliki opsi tunggal A sampai E tanpa matriks pernyataan.',
    pilihanC: 'Model soal TKA mengukur daya nalar analitis, literasi pemahaman teks, dan pemecahan masalah nyata.',
    pilihanD: '-',
    pilihanE: '-',
    kategoriLabel1: 'Benar',
    kategoriLabel2: 'Salah',
    skor: 3,
    pembahasan: 'P1: Benar (karakteristik MCMA). P2: Salah (model kategori menggunakan matriks pernyataan Benar/Salah). P3: Benar (tujuan TKA).'
  },
  {
    no: 50,
    tipeSoal: 'PGK_KATEGORI',
    kunci: 'Benar, Benar, Salah',
    rumusanSoal: `Perhatikan kutipan refleksi evaluasi pembelajaran berikut:\n"Deep Learning mendorong terciptanya suasana belajar Mindful (sadar kritis), Meaningful (bermakna kontekstual), dan Joyful (menggembirakan eksploratif)."\nTentukan kategori Benar atau Salah untuk setiap pernyataan di bawah ini:`,
    pilihanA: 'Pendekatan Mindful Learning melatih murid untuk berpikir reflektif, teliti, dan tidak terburu-buru.',
    pilihanB: 'Pendekatan Meaningful Learning menghubungkan materi kurikulum dengan dunia nyata dan kearifan lokal.',
    pilihanC: 'Pendekatan Joyful Learning menuntut guru memberikan soal ujian yang semata-mata bersifat hafalan rumus.',
    pilihanD: '-',
    pilihanE: '-',
    kategoriLabel1: 'Benar',
    kategoriLabel2: 'Salah',
    skor: 3,
    pembahasan: 'P1: Benar. P2: Benar. P3: Salah (Joyful bukan hafalan semata, melainkan partisipatif dan menumbuhkan rasa ingin tahu).'
  }
];

export const defaultMasterList: DataMasterItem[] = defaultSoalList.map((soal) => {
  let elemen = 'Membaca - Memirsa';
  let cp = cpMembaca1;
  let ipk = 'Menguraikan konsep-konsep yang saling berkaitan pada teks dialog opini';
  let materi = 'Opinion and Thoughts';
  let indikator = 'Memahami dialog percakapan sehari-hari dalam konteks meminta dan memberi informasi terkait pendapat';
  let bentukTes = 'Pilihan Ganda Sederhana';
  let level: 'L1 (LOTS)' | 'L2 (MOTS)' | 'L3 (HOTS)' = 'L2 (MOTS)';
  let deepLearning: 'Mindful Learning' | 'Meaningful Learning' | 'Joyful Learning' = 'Mindful Learning';
  let tingkatKesukaran: 'Mudah' | 'Sedang' | 'HOTS / Sukar' = 'Sedang';

  if (soal.no >= 1 && soal.no <= 14) {
    elemen = 'Membaca - Memirsa';
    cp = cpMembaca1;
    ipk = 'Menguraikan konsep-konsep yang saling berkaitan pada teks opinion and thoughts';
    materi = 'Opinion and Thoughts';
    indikator = 'Disajikan dialog rumpang, siswa dapat melengkapi dengan ungkapan meminta atau memberi pendapat yang sesuai';
    level = soal.no <= 5 ? 'L1 (LOTS)' : 'L2 (MOTS)';
    deepLearning = 'Mindful Learning';
    tingkatKesukaran = soal.no <= 5 ? 'Mudah' : 'Sedang';
    bentukTes = 'Pilihan Ganda Sederhana (A-E)';
  } else if (soal.no >= 15 && soal.no <= 22) {
    elemen = 'Menyimak - Berbicara';
    cp = cpMembaca2;
    ipk = 'Menganalisis fungsi sosial dan unsur kebahasaan dialog asking & giving opinion';
    materi = 'Opinion and Thoughts';
    indikator = 'Disajikan kutipan percakapan interpersonal, siswa dapat menyimpulkan maksud penutur dalam menyampaikan opini';
    level = 'L2 (MOTS)';
    deepLearning = 'Joyful Learning';
    tingkatKesukaran = 'Sedang';
    bentukTes = 'Pilihan Ganda Sederhana (A-E)';
  } else if (soal.no >= 23 && soal.no <= 36) {
    elemen = 'Menyimak - Berbicara';
    cp = cpMembaca2;
    ipk = 'Menganalisis unsur kebahasaan dan struktur teks dialog penawaran dan saran (Suggestion & Offering)';
    materi = 'Suggestion and Offering';
    indikator = 'Disajikan deskripsi situasi atau masalah kontekstual, siswa dapat menentukan saran/solusi yang paling tepat dan santun';
    level = (soal.no === 24 || soal.no === 26 || soal.no === 27 || soal.no === 30 || soal.no === 36) ? 'L3 (HOTS)' : 'L2 (MOTS)';
    deepLearning = 'Meaningful Learning';
    tingkatKesukaran = level === 'L3 (HOTS)' ? 'HOTS / Sukar' : 'Sedang';
    bentukTes = 'Pilihan Ganda Sederhana (A-E)';
  } else if (soal.no >= 37 && soal.no <= 40) {
    elemen = 'Menulis - Mempresentasikan';
    cp = cpMenulis;
    ipk = 'Menganalisis unsur kebahasaan dan hubungan sebab-akibat dalam dialog opinion & suggestion';
    materi = 'Opinion and Thoughts';
    indikator = 'Disajikan percakapan terstruktur, siswa dapat menyimpulkan rencana tindakan secara mandiri';
    level = 'L2 (MOTS)';
    deepLearning = 'Joyful Learning';
    tingkatKesukaran = 'Sedang';
    bentukTes = 'Pilihan Ganda Sederhana (A-E)';
  } else if (soal.no >= 41 && soal.no <= 45) {
    // PGK MCMA (5 Pernyataan)
    elemen = 'Menulis - Mempresentasikan';
    cp = cpMenulis;
    ipk = 'Mengevaluasi ragam argumen multi-pernyataan dan ekspresi bahasa dalam konteks etis & akademik';
    materi = 'TKA: Penalaran Akademik & Literasi Teks';
    indikator = 'Disajikan stimulus konteks akademik, siswa dapat menganalisis lima pernyataan dan memilih lebih dari satu jawaban yang benar';
    level = 'L3 (HOTS)';
    deepLearning = 'Meaningful Learning';
    tingkatKesukaran = 'HOTS / Sukar';
    bentukTes = 'Pilihan Ganda Kompleks MCMA (5 Pernyataan)';
  } else {
    // 46 to 50: PGK Kategori (3 Pernyataan)
    elemen = 'Membaca - Memirsa';
    cp = cpMembaca2;
    ipk = 'Mengevaluasi kebenaran fakta dan inferensi informasi dalam teks kearifan lokal & refleksi asesmen';
    materi = 'TKA: Literasi Budaya & Analisis Logika';
    indikator = 'Disajikan stimulus bacaan, siswa dapat menentukan kategori Benar atau Salah untuk tiga pernyataan yang disajikan';
    level = 'L3 (HOTS)';
    deepLearning = 'Mindful Learning';
    tingkatKesukaran = 'HOTS / Sukar';
    bentukTes = 'Pilihan Ganda Kompleks Kategori (3 Pernyataan)';
  }

  return {
    no: soal.no,
    elemen,
    capaianPembelajaran: cp,
    ipk,
    materi,
    indikatorSoal: indikator,
    bentukTes,
    levelKognitif: level,
    deepLearningDimension: deepLearning,
    tingkatKesukaran,
  };
});
