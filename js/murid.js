// ==================== FUNGSI KHUSUS MURID ====================

// Cek login murid
function checkMuridLogin() {
    let currentUser = getCurrentUser();
    if (!currentUser) {
        showStudentSelector();
        return false;
    }
    const userNameSpan = document.getElementById("userName");
    if (userNameSpan) userNameSpan.innerHTML = `🧒 ${currentUser}`;
    return true;
}

// Tampilkan pilih nama murid
function showStudentSelector() {
    let html = `
        <div style="text-align:center; max-width:400px; margin:0 auto;">
            <h2 style="color:#5a3a1a;">👋 Halo! Siapa namamu?</h2>
            <div class="form-group" style="margin-top:30px;">
                <select id="studentSelect" style="width:100%; padding:15px; border-radius:60px; border:3px solid #ffcd94; font-size:1.1rem;">
                    <option value="">-- Pilih nama --</option>
                    ${studentsList.map(s => `<option value="${s}">${s}</option>`).join('')}
                    <option value="new">+ Murid Baru</option>
                </select>
            </div>
            <button class="btn" id="selectBtn" style="width:100%;">Mulai Belajar</button>
            <div id="msg" class="message" style="margin-top:20px;"></div>
        </div>
    `;
    document.getElementById("mainContent").innerHTML = html;
    
    document.getElementById("selectBtn").addEventListener("click", () => {
        let selected = document.getElementById("studentSelect").value;
        if (selected === "new") {
            let newName = prompt("Masukkan nama murid baru:");
            if (newName && newName.trim()) {
                if (addStudent(newName.trim())) {
                    setCurrentUser(newName.trim());
                    window.location.reload();
                } else {
                    document.getElementById("msg").className = "message error";
                    document.getElementById("msg").innerHTML = "Nama sudah ada!";
                }
            }
        } else if (selected) {
            setCurrentUser(selected);
            window.location.reload();
        } else {
            document.getElementById("msg").className = "message error";
            document.getElementById("msg").innerHTML = "Pilih nama dulu ya!";
        }
    });
}

// Render dashboard murid (FULL LAYOUT - RAPI & NYAMAN)
function renderMuridDashboard() {
    let currentUser = getCurrentUser();
    let progress = getStudentProgress(currentUser);
    
    let totalAktivitas = (progress.writeCount || 0) + (progress.readCount || 0) + (progress.mathCount || 0);
    let sudahMenulis = (progress.writeCount || 0);
    let sudahMembaca = (progress.readCount || 0);
    let sudahBerhitung = (progress.mathCount || 0);
    
    const motivasi = [
      "🌟 Terus belajar, kamu pasti bisa!",
      "📚 Rajin belajar membuatmu pintar!",
      "✍️ Setiap tulisan adalah karyamu!",
      "🎉 Kamu hebat, terus semangat!",
      "💪 Jangan menyerah, pasti bisa!",
      "⭐ Keren! Kamu sudah belajar hari ini!",
      "🌈 Belajar itu menyenangkan!",
      "🦁 Anak hebat tidak takut belajar!",
      "🍎 Rajin belajar, pintar seperti panda!",
      "🚀 Teruslah belajar, masa depanmu cerah!"
    ];
    let randomMotivasi = motivasi[Math.floor(Math.random() * motivasi.length)];
    
    let html = `
        <div style="min-height: 100%; display: flex; flex-direction: column;">
            <!-- Sambutan -->
            <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #5a3a1a; font-size: clamp(1.3rem, 5vw, 1.8rem);">📚 Halo, ${currentUser}!</h2>
                <p style="color: #8B5E3C; font-size: clamp(0.8rem, 3.5vw, 1rem);">Ayo pilih pelajaran yang ingin kamu pelajari!</p>
            </div>
            
            <!-- 3 Menu Utama (Memanjang penuh) -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(12px, 3vw, 20px); margin-bottom: 30px;">
                <div class="card" onclick="window.location.href='menulis.html'" style="cursor: pointer; background: linear-gradient(145deg, #ffffff, #fff5e6); border-radius: clamp(35px, 6vw, 50px); padding: clamp(20px, 5vw, 30px) clamp(10px, 3vw, 15px); text-align: center; box-shadow: 0 clamp(8px, 2vw, 12px) 0 #b97f2e; border: 2px solid #ffd966;">
                    <div style="font-size: clamp(2.5rem, 8vw, 3.5rem);">✍️</div>
                    <div style="font-size: clamp(1rem, 4vw, 1.3rem); font-weight: bold; color: #c25d00; margin-top: 10px;">Menulis</div>
                    <div style="font-size: clamp(0.7rem, 3vw, 0.85rem); color: #8B5E3C; margin-top: 5px;">Latihan Huruf, Angka & Kata</div>
                </div>
                <div class="card" onclick="window.location.href='membaca.html'" style="cursor: pointer; background: linear-gradient(145deg, #ffffff, #fff5e6); border-radius: clamp(35px, 6vw, 50px); padding: clamp(20px, 5vw, 30px) clamp(10px, 3vw, 15px); text-align: center; box-shadow: 0 clamp(8px, 2vw, 12px) 0 #b97f2e; border: 2px solid #ffd966;">
                    <div style="font-size: clamp(2.5rem, 8vw, 3.5rem);">📖</div>
                    <div style="font-size: clamp(1rem, 4vw, 1.3rem); font-weight: bold; color: #c25d00; margin-top: 10px;">Membaca & Mengeja</div>
                    <div style="font-size: clamp(0.7rem, 3vw, 0.85rem); color: #8B5E3C; margin-top: 5px;">Belajar membaca & mengeja</div>
                </div>
                <div class="card" onclick="window.location.href='berhitung.html'" style="cursor: pointer; background: linear-gradient(145deg, #ffffff, #fff5e6); border-radius: clamp(35px, 6vw, 50px); padding: clamp(20px, 5vw, 30px) clamp(10px, 3vw, 15px); text-align: center; box-shadow: 0 clamp(8px, 2vw, 12px) 0 #b97f2e; border: 2px solid #ffd966;">
                    <div style="font-size: clamp(2.5rem, 8vw, 3.5rem);">🔢</div>
                    <div style="font-size: clamp(1rem, 4vw, 1.3rem); font-weight: bold; color: #c25d00; margin-top: 10px;">Berhitung</div>
                    <div style="font-size: clamp(0.7rem, 3vw, 0.85rem); color: #8B5E3C; margin-top: 5px;">Belajar angka & berhitung</div>
                </div>
            </div>
            
            <!-- Statistik Belajar (Full width, rapi) -->
            <div style="background: #fff3e0; border-radius: clamp(35px, 6vw, 50px); padding: clamp(15px, 4vw, 25px); margin-bottom: 20px;">
                <h3 style="color: #c25d00; text-align: center; margin-bottom: 20px; font-size: clamp(1.1rem, 4.5vw, 1.4rem);">📊 Statistik Belajarmu</h3>
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px;">
                    <div style="flex: 1; min-width: 100px; text-align: center; background: white; border-radius: 30px; padding: clamp(12px, 3vw, 18px); box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                        <div style="font-size: clamp(1.8rem, 6vw, 2.5rem); font-weight: bold; color: #ff8c42;">${sudahMenulis}</div>
                        <div style="font-size: clamp(0.75rem, 3vw, 0.9rem); color: #8B5E3C;">✍️ Menulis</div>
                    </div>
                    <div style="flex: 1; min-width: 100px; text-align: center; background: white; border-radius: 30px; padding: clamp(12px, 3vw, 18px); box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                        <div style="font-size: clamp(1.8rem, 6vw, 2.5rem); font-weight: bold; color: #ff8c42;">${sudahMembaca}</div>
                        <div style="font-size: clamp(0.75rem, 3vw, 0.9rem); color: #8B5E3C;">📖 Membaca</div>
                    </div>
                    <div style="flex: 1; min-width: 100px; text-align: center; background: white; border-radius: 30px; padding: clamp(12px, 3vw, 18px); box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                        <div style="font-size: clamp(1.8rem, 6vw, 2.5rem); font-weight: bold; color: #ff8c42;">${sudahBerhitung}</div>
                        <div style="font-size: clamp(0.75rem, 3vw, 0.9rem); color: #8B5E3C;">🔢 Berhitung</div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 18px; font-size: clamp(0.9rem, 4vw, 1.1rem); color: #5a3a1a;">
                    ✨ Total aktivitas: <strong style="font-size: clamp(1.1rem, 5vw, 1.4rem); color: #ff8c42;">${totalAktivitas}</strong> kali ✨
                </div>
            </div>
            
            <!-- Kata Motivasi (Full width, mencolok) -->
            <div style="background: linear-gradient(135deg, #e8f5e9, #c8e6c9); border-radius: clamp(35px, 6vw, 50px); padding: clamp(15px, 4vw, 22px); text-align: center; margin-top: 5px;">
                <div style="font-size: clamp(1rem, 4vw, 1.2rem); color: #2e7d32; font-weight: bold;">💖 ${randomMotivasi} 💖</div>
            </div>
        </div>
    `;
    
    document.getElementById("mainContent").innerHTML = html;
}

// Render halaman lencana murid
function renderMuridLencana() {
    let currentUser = getCurrentUser();
    let progress = getStudentProgress(currentUser);
    let earnedIds = progress.achievements || [];
    
    let html = `
        <div class="writing-area">
            <a href="dashboard.html" class="btn btn-back" style="text-decoration:none; display:inline-block; margin-bottom:15px;">← Kembali</a>
            <h3 style="text-align:center;">🏆 Lencana Saya</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-top: 20px;">
    `;
    
    for (let ach of achievements) {
        let earned = earnedIds.includes(ach.id);
        html += `
            <div style="background: ${earned ? '#ffb347' : '#eee'}; border-radius: 30px; padding: 15px; text-align: center; width: 140px;">
                <div style="font-size: 3rem;">${ach.icon}</div>
                <div style="font-weight: bold;">${ach.name}</div>
                <div style="font-size: 0.7rem;">${ach.desc}</div>
                <div style="margin-top: 5px;">${earned ? '✅ Sudah dapat' : '🔒 Belum'}</div>
            </div>
        `;
    }
    
    html += `</div><p style="text-align:center; margin-top:20px;">✨ Terus berlatih untuk dapat lencana baru! ✨</p></div>`;
    document.getElementById("mainContent").innerHTML = html;
}

// ========== FUNGSI UNTUK MEMBACA ==========
function updateReadingProgress() {
    let progress = getStudentProgress(currentUser);
    progress.readCount = (progress.readCount || 0) + 1;
    saveData();
    checkAchievements(currentUser);
}

function updateMathProgress() {
    let progress = getStudentProgress(currentUser);
    progress.mathCount = (progress.mathCount || 0) + 1;
    saveData();
    checkAchievements(currentUser);
}

// Fungsi logout murid
function logoutMurid() {
    clearCurrentUser();
    window.location.href = "../index.html";
}