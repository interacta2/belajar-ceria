// ==================== FUNGSI KHUSUS GURU ====================

const TEACHER_USERNAME = "admin";
const TEACHER_PASSWORD = "guru123";

// Cek login guru
function checkGuruAuth() {
    if (sessionStorage.getItem("bc_teacher_logged") !== "true") {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Logout guru
function logoutGuru() {
    sessionStorage.removeItem("bc_teacher_logged");
    window.location.href = "../index.html";
}

// Handle login guru
function initGuruLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        const msgDiv = document.getElementById("message");
        
        if (user === TEACHER_USERNAME && pass === TEACHER_PASSWORD) {
            sessionStorage.setItem("bc_teacher_logged", "true");
            msgDiv.className = "message success";
            msgDiv.innerHTML = "✅ Login berhasil! Mengarahkan...";
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            msgDiv.className = "message error";
            msgDiv.innerHTML = "❌ Username atau password salah! (admin / guru123)";
        }
    });
}

// Render dashboard guru (lihat semua murid)
function renderGuruDashboard() {
    let html = `
        <h2 style="text-align:center; color:#5a3a1a;">📊 Progress Belajar Murid</h2>
        <div style="margin-top:20px; overflow-x:auto;">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Murid</th>
                        <th>Total Menulis</th>
                        <th>Huruf Dikuasai</th>
                        <th>Progres</th>
                        <th>Lencana</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    let no = 1;
    for (let student of studentsList) {
        let progress = getStudentProgress(student);
        let writeCount = progress.writeCount || 0;
        let writtenCount = (progress.writtenLetters || []).length;
        let earnedCount = (progress.achievements || []).length;
        let percent = Math.round((writtenCount / 26) * 100);
        
        html += `
            </tr>
                <td>${no++}</td>
                <td><strong>${student}</strong></td>
                <td>${writeCount} kali</td>
                <td>${writtenCount} / 26</td>
                <td>
                    <div style="background:#eee; border-radius:20px; height:20px; width:100%; overflow:hidden;">
                        <div style="background:#4caf50; width:${percent}%; height:100%; border-radius:20px;"></div>
                    </div>
                    <span style="font-size:0.7rem;">${percent}%</span>
                </td>
                <td>${earnedCount} / 3 🏆</td>
                <td><button class="btn" style="padding:5px 15px; font-size:0.8rem;" onclick="lihatDetail('${student}')">Detail</button></td>
            </tr>
        `;
    }
    
    html += `
                </tbody>
            </table>
        </div>
        <div style="margin-top:30px; text-align:center;">
            <button class="btn" id="addStudentBtn">➕ Tambah Murid Baru</button>
        </div>
        <div id="msg" class="message" style="margin-top:15px;"></div>
    `;
    
    document.getElementById("mainContent").innerHTML = html;
    
    document.getElementById("addStudentBtn").addEventListener("click", () => {
        let newName = prompt("Masukkan nama murid baru:");
        if (newName && newName.trim()) {
            if (addStudent(newName.trim())) {
                document.getElementById("msg").className = "message success";
                document.getElementById("msg").innerHTML = `✅ Murid ${newName} berhasil ditambahkan!`;
                setTimeout(() => renderGuruDashboard(), 1500);
            } else {
                document.getElementById("msg").className = "message error";
                document.getElementById("msg").innerHTML = `❌ Nama ${newName} sudah ada!`;
            }
        }
    });
}

// Lihat detail murid
function lihatDetail(studentName) {
    window.location.href = `detail-murid.html?nama=${encodeURIComponent(studentName)}`;
}

// Render detail progress satu murid
function renderDetailMurid() {
    const urlParams = new URLSearchParams(window.location.search);
    let studentName = urlParams.get("nama");
    
    if (!studentName) {
        window.location.href = "dashboard.html";
        return;
    }
    
    let progress = getStudentProgress(studentName);
    let writtenLetters = progress.writtenLetters || [];
    let writeCount = progress.writeCount || 0;
    let earnedIds = progress.achievements || [];
    
    let allLetters = alphabetData.map(a => a.upper);
    let writtenSet = new Set(writtenLetters);
    
    let html = `
        <div class="writing-area">
            <a href="dashboard.html" class="btn btn-back" style="text-decoration:none; display:inline-block; margin-bottom:15px;">← Kembali ke Dashboard</a>
            
            <h2 style="text-align:center; color:#c25d00;">📘 Detail Progress: ${studentName}</h2>
            
            <div style="display:flex; flex-wrap:wrap; gap:20px; margin:20px 0;">
                <div style="flex:1; min-width:150px; background:#fff3e0; border-radius:30px; padding:15px; text-align:center;">
                    <div style="font-size:2rem;">✍️</div>
                    <div style="font-size:1.5rem; font-weight:bold;">${writeCount}</div>
                    <div>Total Menulis</div>
                </div>
                <div style="flex:1; min-width:150px; background:#fff3e0; border-radius:30px; padding:15px; text-align:center;">
                    <div style="font-size:2rem;">🔤</div>
                    <div style="font-size:1.5rem; font-weight:bold;">${writtenLetters.length} / 26</div>
                    <div>Huruf Dikuasai</div>
                </div>
                <div style="flex:1; min-width:150px; background:#fff3e0; border-radius:30px; padding:15px; text-align:center;">
                    <div style="font-size:2rem;">🏆</div>
                    <div style="font-size:1.5rem; font-weight:bold;">${earnedIds.length} / 3</div>
                    <div>Lencana</div>
                </div>
            </div>
            
            <h3>📝 Daftar Huruf yang Sudah Ditulis</h3>
            <div style="display:flex; flex-wrap:wrap; gap:10px; margin:15px 0;">
    `;
    
    for (let letter of allLetters) {
        let isWritten = writtenSet.has(letter);
        html += `
            <div style="width:55px; height:55px; background:${isWritten ? '#c8e6c9' : '#ffcdd2'}; border-radius:30px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; font-weight:bold;">
                ${letter} ${isWritten ? '✅' : '❌'}
            </div>
        `;
    }
    
    html += `
            </div>
            <h3>🏆 Lencana yang Didapat</h3>
            <div style="display:flex; flex-wrap:wrap; gap:15px; margin:15px 0;">
    `;
    
    for (let ach of achievements) {
        let earned = earnedIds.includes(ach.id);
        html += `
            <div style="background: ${earned ? '#ffb347' : '#eee'}; border-radius: 30px; padding: 12px; text-align: center; width: 120px;">
                <div style="font-size: 2rem;">${ach.icon}</div>
                <div style="font-weight: bold; font-size:0.8rem;">${ach.name}</div>
                <div style="font-size:0.7rem;">${earned ? '✅ Didapat' : '🔒 Belum'}</div>
            </div>
        `;
    }
    
    html += `</div></div>`;
    document.getElementById("mainContent").innerHTML = html;
}