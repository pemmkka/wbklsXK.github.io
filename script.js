const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        navbar.classList.remove("transparent");
    } else {
        navbar.classList.add("transparent");
        navbar.classList.remove("scrolled");
    }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

const navItems = document.querySelectorAll("#navLinks a");

/* Klik salah satu menu → auto tutup */
navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

/* Klik di luar menu → auto tutup */
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

/* Scroll → auto tutup */
window.addEventListener("scroll", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
});

// --- DATA EVENT (TAMBAH DATA DISINI) ---
const events = [
    {
        img: "WhatsApp Image 2026-02-05 at 11.47.55.jpeg",
        title: "Class Meeting",
        desc: "Pertandingan futsal antar kelas yang seru dan penuh semangat!"
    },
    {
        img: "https://image2url.com/r2/default/images/1772343308335-dbe58524-2126-46dd-93a4-52d37b00d7c1.jpg",
        title: "Pentas Seni",
        desc: "Tampilkan bakat terbaik kelas kita di panggung utama."
    },
    {
        img: "https://images.unsplash.com/photo-1541872720-d7c2e1966a33?q=80&w=600",
        title: "Studi Banding",
        desc: "Kunjungan ke sekolah unggulan untuk menambah wawasan."
    }
];
// ----------------------------------------

const frameSlider = document.getElementById('frameSlider');
const bgSlider = document.getElementById('bgSlider');
const titleEl = document.getElementById('eventTitle');
const descEl = document.getElementById('eventDesc');

// 1. Inisialisasi: Masukkan gambar ke DOM
function initEvents() {
    let frameHTML = '';
    let bgHTML = '';
    
    events.forEach(ev => {
        frameHTML += `<img src="${ev.img}" alt="${ev.title}">`;
        bgHTML += `<img src="${ev.img}" alt="${ev.title}">`;
    });
    
    frameSlider.innerHTML = frameHTML;
    bgSlider.innerHTML = bgHTML;
    
    // Set teks awal
    titleEl.textContent = events[0].title;
    descEl.textContent = events[0].desc;
}

let idx = 0;

// 2. Fungsi untuk mengupdate event
function updateEvent() {
    idx = (idx + 1) % events.length;

    // 1. Geser Bingkai Utama
    frameSlider.style.transform = `translateY(-${idx * 100}%)`;
    
    // 2. Geser Background (Sinkron)
    bgSlider.style.transform = `translateY(-${idx * 100}%)`;

    // 3. Update Teks dengan Efek Fade
    titleEl.style.opacity = 0;
    descEl.style.opacity = 0;
    
    setTimeout(() => {
        titleEl.textContent = events[idx].title;
        descEl.textContent = events[idx].desc;
        titleEl.style.opacity = 1;
        descEl.style.opacity = 1;
    }, 400); // Waktu jeda untuk fade out
}

// Jalankan inisialisasi
initEvents();

// Jalankan otomatis setiap 5 detik
setInterval(updateEvent, 5000);

// === DATA JUMLAH ===
const totalSiswa = 15;   // GANTI sesuai jumlah asli
const totalSiswi = 17;   // GANTI sesuai jumlah asli



// Animasi angka rolling
function animateNumber(id, target) {
    const element = document.getElementById(id);

    let randomDuration = 2000; // 2 detik angka random
    let finalDuration = 800;   // 0.8 detik naik ke angka asli
    let intervalTime = 40;

    element.style.color = "#ff8c00";
    
    // 1️⃣ FASE RANDOM
    const randomInterval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * (target + 20));
        element.textContent = randomNum;
    }, intervalTime);

    setTimeout(() => {
        clearInterval(randomInterval);

        // 2️⃣ FASE NAIK KE ANGKA ASLI
        let start = 0;
        let increment = target / (finalDuration / intervalTime);

        const finalInterval = setInterval(() => {
            start += increment;

            if (start >= target) {
                element.textContent = target;
                element.style.color = "#333";
                clearInterval(finalInterval);
            } else {
                element.textContent = Math.floor(start);
            }
        }, intervalTime);

    }, randomDuration);
}

// Jalankan setelah halaman load
window.addEventListener("load", () => {
    animateNumber("jumlahSiswa", totalSiswa);
    animateNumber("jumlahSiswi", totalSiswi);
    animateNumber("jumlahEvent", events.length); // otomatis dari data event
});


const dataStruktur = {
    role: "Ketua",
    name: "Nama Ketua",
    img: "https://via.placeholder.com/150",
    children: [{
        role: "Wakil Ketua",
        name: "Nama Wakil",
        img: "https://via.placeholder.com/150",
        children: [
            {
                role: "B1", // Jalur Kiri
                name: "Bendahara 1",
                img: "cihuy.png",
                children: [{ role: "B2", name: "Bendahara 2", img: "https://via.placeholder.com/150" }]
            },
            {
                role: "S1", // Jalur Kanan
                name: "Sekretaris 1",
                img: "https://via.placeholder.com/150",
                children: [{ role: "S2", name: "Sekretaris 2", img: "https://via.placeholder.com/150" }]
            }
        ]
    }]
};

function buildTree(node) {
    let html = `<li>
        <div class="node-content">
            <div class="node-circle">
                ${node.img ? `<img src="${node.img}">` : node.role[0]}
            </div>
            <p class="role">${node.role}</p>
            <p class="name">${node.name}</p>
        </div>`;
    
    if (node.children && node.children.length > 0) {
        html += "<ul>";
        node.children.forEach(child => {
            html += buildTree(child);
        });
        html += "</ul>";
    }
    return html + "</li>";
}

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("treeRoot");
    if (rootElement) {
        rootElement.innerHTML = `<ul>${buildTree(dataStruktur)}</ul>`;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll(".node-content").forEach((el, i) => {
                    setTimeout(() => el.classList.add("appear"), i * 150);
                });
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });
        observer.observe(rootElement);
    }
});
