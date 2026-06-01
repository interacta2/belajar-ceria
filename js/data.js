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

const achievements = [
  { id: "first_write", name: "Penulis Pemula", icon: "✍️", desc: "Menulis 1 huruf", type: "write", requirement: 1 },
  { id: "write_5", name: "Jago Menulis", icon: "📝", desc: "Menulis 5 huruf", type: "write", requirement: 5 },
  { id: "write_10", name: "Penulis Hebat", icon: "🖊️", desc: "Menulis 10 huruf", type: "write", requirement: 10 },
  { id: "all_letters", name: "Pahlawan Alfabet", icon: "🔤", desc: "Menulis semua A-Z", type: "all_letters", requirement: 26 },
  { id: "first_read", name: "Pembaca Pemula", icon: "📖", desc: "Membaca 1 kata", type: "read", requirement: 1 },
  { id: "first_math", name: "Ahli Hitung Pemula", icon: "🔢", desc: "Menjawab 1 soal", type: "math", requirement: 1 },
];

let studentsList = ["Budi", "Siti", "Ayu"];
let studentProgress = {};

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

function updateReadingProgress(studentName) {
  let progress = getStudentProgress(studentName);
  progress.readCount = (progress.readCount || 0) + 1;
  updateStreak(studentName);
  checkAchievements(studentName);
  saveData();
}

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

function checkAchievements(studentName) {
  let progress = getStudentProgress(studentName);
  let earnedIds = progress.achievements || [];
  let newAch = [];
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
    
    if (earned) {
      earnedIds.push(ach.id);
      newAch.push(ach);
      totalEarned++;
    }
  }
  
  if (newAch.length > 0) {
    progress.achievements = earnedIds;
    saveData();
    sessionStorage.setItem("new_achievements_" + studentName, JSON.stringify(newAch));
  }
  
  return newAch;
}

function getNewAchievements(studentName) {
  let newAch = sessionStorage.getItem("new_achievements_" + studentName);
  if (newAch) {
    sessionStorage.removeItem("new_achievements_" + studentName);
    return JSON.parse(newAch);
  }
  return [];
}

function getCurrentUser() {
  return sessionStorage.getItem("bc_current_user");
}

function setCurrentUser(name) {
  sessionStorage.setItem("bc_current_user", name);
}

function clearCurrentUser() {
  sessionStorage.removeItem("bc_current_user");
}

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

loadData();
