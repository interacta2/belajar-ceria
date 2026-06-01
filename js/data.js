// ======================================================
// DATA STORAGE - VERSI SUPABASE
// ======================================================

import { 
    getMurid, getMuridByNama, tambahMurid,
    simpanMenulis, getHurufDikuasai,
    simpanMembaca, getTotalMembaca,
    simpanBerhitung, getTotalBerhitung,
    simpanLencana, getLencanaMurid, cekLencana
} from './supabase.js';

// ======================================================
// DATA HURUF A-Z (RAMAH ANAK)
// ======================================================
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

// ======================================================
// DAFTAR LENCANA
// ======================================================
const achievements = [
  { id: "first_write", name: "Penulis Pemula", icon: "✍️", desc: "Menulis 1 huruf", type: "write", requirement: 1, kategori: "Menulis" },
  { id: "write_5", name: "Jago Menulis", icon: "📝", desc: "Menulis 5 huruf", type: "write", requirement: 5, kategori: "Menulis" },
  { id: "write_10", name: "Penulis Hebat", icon: "🖊️", desc: "Menulis 10 huruf", type: "write", requirement: 10, kategori: "Menulis" },
  { id: "all_letters", name: "Pahlawan Alfabet", icon: "🔤", desc: "Menulis semua A-Z", type: "all_letters", requirement: 26, kategori: "Menulis" },
  { id: "first_read", name: "Pembaca Pemula", icon: "📖", desc: "Membaca 1 kata", type: "read", requirement: 1, kategori: "Membaca" },
  { id: "first_math", name: "Ahli Hitung Pemula", icon: "🔢", desc: "Menjawab 1 soal", type: "math", requirement: 1, kategori: "Berhitung" },
];

// ======================================================
// VARIABEL GLOBAL
// ======================================================
let studentsList = [];

// ======================================================
// FUNGSI UTAMA
// ======================================================

async function loadData() {
    studentsList = await getMurid();
    console.log("Data murid loaded:", studentsList);
}

async function getStudentProgress(nama) {
    let murid = await getMuridByNama(nama);
    if (!murid) return { writeCount: 0, writtenLetters: [], readCount: 0, mathCount: 0, achievements: [] };
    
    let hurufDikuasai = await getHurufDikuasai(murid.id);
    let totalMembaca = await getTotalMembaca(murid.id);
    let totalBerhitung = await getTotalBerhitung(murid.id);
    let lencana = await getLencanaMurid(murid.id);
    
    return {
        writeCount: hurufDikuasai.length,
        writtenLetters: hurufDikuasai,
        readCount: totalMembaca,
        mathCount: totalBerhitung,
        achievements: lencana.map(l => l.lencana_id)
    };
}

async function updateWritingProgress(nama, huruf) {
    let murid = await getMuridByNama(nama);
    if (!murid) return;
    
    await simpanMenulis(murid.id, huruf);
    
    let hurufDikuasai = await getHurufDikuasai(murid.id);
    if (hurufDikuasai.length >= 1 && !(await cekLencana(murid.id, 'first_write'))) {
        await simpanLencana(murid.id, 'first_write', 'Penulis Pemula', '✍️');
    }
    if (hurufDikuasai.length >= 5 && !(await cekLencana(murid.id, 'write_5'))) {
        await simpanLencana(murid.id, 'write_5', 'Jago Menulis', '📝');
    }
    if (hurufDikuasai.length >= 26 && !(await cekLencana(murid.id, 'all_letters'))) {
        await simpanLencana(murid.id, 'all_letters', 'Pahlawan Alfabet', '🔤');
    }
}

async function updateReadingProgress(nama) {
    let murid = await getMuridByNama(nama);
    if (!murid) return;
    await simpanMembaca(murid.id, 'latihan_membaca');
    
    if (!(await cekLencana(murid.id, 'first_read'))) {
        await simpanLencana(murid.id, 'first_read', 'Pembaca Pemula', '📖');
    }
}

async function updateMathProgress(nama) {
    let murid = await getMuridByNama(nama);
    if (!murid) return;
    await simpanBerhitung(murid.id, 1, 10, 'latihan');
    
    if (!(await cekLencana(murid.id, 'first_math'))) {
        await simpanLencana(murid.id, 'first_math', 'Ahli Hitung Pemula', '🔢');
    }
}

async function addStudent(nama) {
    let existing = await getMuridByNama(nama);
    if (existing) return false;
    
    await tambahMurid(nama);
    await loadData();
    return true;
}

function getCurrentUser() {
    return sessionStorage.getItem("bc_current_user");
}

function setCurrentUser(nama) {
    sessionStorage.setItem("bc_current_user", nama);
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
    window.speechSynthesis.speak(utterance);
}

// ======================================================
// EXPORT
// ======================================================
export { 
    alphabetData, achievements, studentsList, loadData,
    getStudentProgress, updateWritingProgress, updateReadingProgress, updateMathProgress,
    addStudent, getCurrentUser, setCurrentUser, clearCurrentUser, speak
};

// Panggil load data
loadData();
