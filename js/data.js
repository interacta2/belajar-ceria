// ==================== DATA STORAGE ====================
// Data huruf A-Z lengkap (BENAR-BENAR RAMAH ANAK)
const alphabetData = [
  { char: "A", upper: "A", lower: "a", image: "🍎", name: "Apel" },
  { char: "B", upper: "B", lower: "b", image: "🎈", name: "Balon" },
  { char: "C", upper: "C", lower: "c", image: "🐛", name: "Cacing" },
  { char: "D", upper: "D", lower: "d", image: "🦖", name: "Dinosaurus" },
  { char: "E", upper: "E", lower: "e", image: "🦅", name: "Elang" },
  { char: "F", upper: "F", lower: "f", image: "🦴", name: "Fosil" },
  { char: "G", upper: "G", lower: "g", image: "🐘", name: "Gajah" },
  { char: "H", upper: "H", lower: "h", image: "🐅", name: "Harimau" },
  { char: "I", upper: "I", lower: "i", image: "🐟", name: "Ikan" },
  { char: "J", upper: "J", lower: "j", image: "🍊", name: "Jeruk" },
  { char: "K", upper: "K", lower: "k", image: "🐱", name: "Kucing" },
  { char: "L", upper: "L", lower: "l", image: "💡", name: "Lampu" },
  { char: "M", upper: "M", lower: "m", image: "🐒", name: "Monyet" },
  { char: "N", upper: "N", lower: "n", image: "🐉", name: "Naga" },
  { char: "O", upper: "O", lower: "o", image: "🦧", name: "Orangutan" },
  { char: "P", upper: "P", lower: "p", image: "🐼", name: "Panda" },
  { char: "Q", upper: "Q", lower: "q", image: "📖", name: "Quran" },
  { char: "R", upper: "R", lower: "r", image: "🏠", name: "Rumah" },
  { char: "S", upper: "S", lower: "s", image: "🐄", name: "Sapi" },
  { char: "T", upper: "T", lower: "t", image: "🐭", name: "Tikus" },
  { char: "U", upper: "U", lower: "u", image: "🐍", name: "Ular" },
  { char: "V", upper: "V", lower: "v", image: "🏐", name: "Voli" },
  { char: "W", upper: "W", lower: "w", image: "🥕", name: "Wortel" },
  { char: "X", upper: "X", lower: "x", image: "🎷", name: "Xilofon" },
  { char: "Y", upper: "Y", lower: "y", image: "🪀", name: "Yoyo" },
  { char: "Z", upper: "Z", lower: "z", image: "🦓", name: "Zebra" }
];

// ========== LENCANA (20 LENCANA YANG MUDAH DICAPAI ANAK) ==========
const achievements = [
  // Lencana Menulis (6)
  { id: "first_write", name: "Penulis Pemula", icon: "✍️", desc: "Menulis 1 huruf", type: "write", requirement: 1, kategori: "Menulis" },
  { id: "write_5", name: "Jago Menulis", icon: "📝", desc: "Menulis 5 huruf", type: "write", requirement: 5, kategori: "Menulis" },
  { id: "write_10", name: "Penulis Hebat", icon: "🖊️", desc: "Menulis 10 huruf", type: "write", requirement: 10, kategori: "Menulis" },
  { id: "write_25", name: "Penulis Berbakat", icon: "✒️", desc: "Menulis 25 huruf", type: "write", requirement: 25, kategori: "Menulis" },
  { id: "write_50", name: "Maestro Menulis", icon: "🏅", desc: "Menulis 50 huruf", type: "write", requirement: 50, kategori: "Menulis" },
  { id: "all_letters", name: "Pahlawan Alfabet", icon: "🔤", desc: "Menulis semua A-Z", type: "all_letters", requirement: 26, kategori: "Menulis" },
  
  // Lencana Membaca (5)
  { id: "first_read", name: "Pembaca Pemula", icon: "📖", desc: "Membaca 1 kata", type: "read", requirement: 1, kategori: "Membaca" },
  { id: "read_10", name: "Rajin Membaca", icon: "📚", desc: "Membaca 10 kata", type: "read", requirement: 10, kategori: "Membaca" },
  { id: "read_25", name: "Kutu Buku", icon: "🐛", desc: "Membaca 25 kata", type: "read", requirement: 25, kategori: "Membaca" },
  { id: "read_50", name: "Pustakawan Cilik", icon: "🏛️", desc: "Membaca 50 kata", type: "read", requirement: 50, kategori: "Membaca" },
  { id: "read_100", name: "Raja Membaca", icon: "👑", desc: "Membaca 100 kata", type: "read", requirement: 100, kategori: "Membaca" },
  
  // Lencana Berhitung (5)
  { id: "first_math", name: "Ahli Hitung Pemula", icon: "🔢", desc: "Menjawab 1 soal", type: "math", requirement: 1, kategori: "Berhitung" },
  { id: "math_10", name: "Jago Hitung", icon: "🧮", desc: "Menjawab 10 soal", type: "math", requirement: 10, kategori: "Berhitung" },
  { id: "math_25", name: "Master Hitung", icon: "🎓", desc: "Menjawab 25 soal", type: "math", requirement: 25, kategori: "Berhitung" },
  { id: "math_50", name: "Jenius Matematika", icon: "🧠", desc: "Menjawab 50 soal", type: "math", requirement: 50, kategori: "Berhitung" },
  { id: "perfect_score", name: "Nilai Sempurna", icon: "💯", desc: "Dapat nilai 100 di kuis", type: "perfect_math", requirement: 1, kategori: "Berhitung" },
  
  // Lencana Spesial (4)
  { id: "streak_7", name: "Pekan Rajin", icon: "📅", desc: "Belajar 7 hari berturut-turut", type: "streak", requirement: 7, kategori: "Spesial" },
  { id: "streak_30", name: "Bulan Rajin", icon: "🗓️", desc: "Belajar 30 hari berturut-turut", type: "streak", requirement: 30, kategori: "Spesial" },
  { id: "all_categories", name: "Bintang Super", icon: "⭐", desc: "Mendapat semua lencana", type: "all_achievements", requirement: 1, kategori: "Spesial" },
  { id: "collector", name: "Kolektor Lencana", icon: "🎯", desc: "Mendapat 10 lencana", type: "collect", requirement: 10, kategori: "Spesial" }
];

// Total lencana: 20 lencana

// Data murid default
let studentsList = ["Irul", "Farel"];

// Progress setiap murid
let studentProgress = {};

// Load data dari localStorage
function loadData() {
  const storedList = localStorage.getItem("bc_students_list");
  if (storedList) studentsList = JSON.parse(storedList);
  
  const storedProgress = localStorage.getItem("bc_students_progress");
  if (storedProgress) {
    studentProgress = JSON.parse(storedProgress);
  } else {
    for (let s of studentsList) {
      studentProgress[s] = { 
        writeCount: 0, 
        writtenLetters: [], 
        readCount: 0,
        mathCount: 0,
        perfectMathCount: 0,
        streakDays: 1,
        lastActive: new Date().toISOString().split('T')[0],
        achievements: [] 
      };
    }
  }
  saveData();
}

function saveData() {
  localStorage.setItem("bc_students_list", JSON.stringify(studentsList));
  localStorage.setItem("bc_students_progress", JSON.stringify(studentProgress));
}

// Tambah murid baru
function addStudent(name) {
  if (!studentsList.includes(name)) {
    studentsList.push(name);
    studentProgress[name] = { 
      writeCount: 0, 
      writtenLetters: [], 
      readCount: 0,
      mathCount: 0,
      perfectMathCount: 0,
      streakDays: 1,
      lastActive: new Date().toISOString().split('T')[0],
      achievements: [] 
    };
    saveData();
    return true;
  }
  return false;
}

// Dapatkan progress murid
function getStudentProgress(name) {
  if (!studentProgress[name]) {
    studentProgress[name] = { 
      writeCount: 0, 
      writtenLetters: [], 
      readCount: 0,
      mathCount: 0,
      perfectMathCount: 0,
      streakDays: 1,
      lastActive: new Date().toISOString().split('T')[0],
      achievements: [] 
    };
    saveData();
  }
  return studentProgress[name];
}

// Update streak
function updateStreak(studentName) {
  let progress = getStudentProgress(studentName);
  let today = new Date().toISOString().split('T')[0];
  let lastActive = progress.lastActive || today;
  
  if (lastActive !== today) {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastActive === yesterdayStr) {
      progress.streakDays = (progress.streakDays || 0) + 1;
    } else {
      progress.streakDays = 1;
    }
    progress.lastActive = today;
    saveData();
  }
  return progress.streakDays;
}

// Update progress setelah menulis
function updateWritingProgress(studentName, letter) {
  let progress = getStudentProgress(studentName);
  progress.writeCount = (progress.writeCount || 0) + 1;
  
  if (!progress.writtenLetters) progress.writtenLetters = [];
  if (!progress.writtenLetters.includes(letter)) {
    progress.writtenLetters.push(letter);
  }
  
  updateStreak(studentName);
  checkAchievements(studentName);
  saveData();
  return progress;
}

// Update progress membaca
function updateReadingProgress(studentName) {
  let progress = getStudentProgress(studentName);
  progress.readCount = (progress.readCount || 0) + 1;
  updateStreak(studentName);
  checkAchievements(studentName);
  saveData();
}

// Update progress berhitung
function updateMathProgress(studentName, isPerfect = false) {
  let progress = getStudentProgress(studentName);
  progress.mathCount = (progress.mathCount || 0) + 1;
  if (isPerfect) {
    progress.perfectMathCount = (progress.perfectMathCount || 0) + 1;
  }
  updateStreak(studentName);
  checkAchievements(studentName);
  saveData();
}

// Cek dan update achievements
function checkAchievements(studentName) {
  let progress = getStudentProgress(studentName);
  let earnedIds = progress.achievements || [];
  let newAch = [];
  
  // Hitung jumlah lencana yang sudah didapat
  let totalEarned = earnedIds.length;
  
  for (let ach of achievements) {
    if (earnedIds.includes(ach.id)) continue;
    
    let earned = false;
    
    if (ach.type === "write" && (progress.writeCount || 0) >= ach.requirement) {
      earned = true;
    }
    else if (ach.type === "all_letters" && (progress.writtenLetters || []).length >= 26) {
      earned = true;
    }
    else if (ach.type === "read" && (progress.readCount || 0) >= ach.requirement) {
      earned = true;
    }
    else if (ach.type === "math" && (progress.mathCount || 0) >= ach.requirement) {
      earned = true;
    }
    else if (ach.type === "perfect_math" && (progress.perfectMathCount || 0) >= ach.requirement) {
      earned = true;
    }
    else if (ach.type === "streak" && (progress.streakDays || 0) >= ach.requirement) {
      earned = true;
    }
    else if (ach.type === "collect" && totalEarned >= ach.requirement) {
      earned = true;
    }
    else if (ach.type === "all_achievements" && earnedIds.length >= achievements.length - 2) {
      earned = true;
    }
    
    if (earned) {
      earnedIds.push(ach.id);
      newAch.push(ach);
      totalEarned++;
    }
  }
  
  if (newAch.length > 0) {
    progress.achievements = earnedIds;
    saveData();
    
    // Simpan notifikasi achievement baru
    sessionStorage.setItem("new_achievements_" + studentName, JSON.stringify(newAch));
  }
  
  return newAch;
}

// Get unread achievements untuk murid
function getNewAchievements(studentName) {
  let newAch = sessionStorage.getItem("new_achievements_" + studentName);
  if (newAch) {
    sessionStorage.removeItem("new_achievements_" + studentName);
    return JSON.parse(newAch);
  }
  return [];
}

// Get user yang sedang login dari sessionStorage
function getCurrentUser() {
  return sessionStorage.getItem("bc_current_user");
}

function setCurrentUser(name) {
  sessionStorage.setItem("bc_current_user", name);
}

function clearCurrentUser() {
  sessionStorage.removeItem("bc_current_user");
}

// Fungsi suara
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.8;
  utterance.pitch = 1.2;
  
  let voices = window.speechSynthesis.getVoices();
  let indoVoice = voices.find(voice => voice.lang === 'id-ID');
  if (indoVoice) utterance.voice = indoVoice;
  
  window.speechSynthesis.speak(utterance);
}

// Panggil load data saat pertama kali
loadData();

studentProgress[s] = { 
  writeCount: 0, 
  writtenLetters: [], 
  readCount: 0,     // ← tambahkan
  mathCount: 0,     // ← tambahkan
  perfectMathCount: 0,
  streakDays: 1,
  lastActive: new Date().toISOString().split('T')[0],
  achievements: [] 
};