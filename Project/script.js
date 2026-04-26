const translations = {
    en: {
        us: "United States",
        ap: "Antarctic Program",
        nav_home: "Home",
        nav_contact: "Contact Us",
        nav_times: "Station Times",
        nav_quick: "Quick Links",
        btn_search: "Advanced Search",
        welcome_msg: "Welcome to the United States Antarctic Program Portal",
        future_usap: "FUTURE USAP",
        future_desc: "The latest information on the USAP master plans and their implementation.",
        about_header: "About the USAP",
        link_program: "About the Program",
        link_participants: "About USAP Participants",
        link_env: "Environmental Policy and Compliance",
        link_faq: "FAQs",
        news_title: "NPR Host Gets Tips from Antarctica for How to Stay Warm During the Bomb Cyclone",
        news_date: "News | Friday January 5, 2018",
        news_content: "The 'bomb cyclone' has hit the eastern U.S causing flight cancellations and power outages. On Jan. 5, Keri Nelson, at NSF's Palmer Station, Antarctica, discussed with All Things Considered host Ari Shapiro...",
        read_more: "Continue Reading",
        footer_text: "Future USAP | About the USAP | FAQs"
    },
    id: {
        us: "Amerika Serikat",
        ap: "Program Antartika",
        nav_home: "Beranda",
        nav_contact: "Hubungi Kami",
        nav_times: "Waktu Stasiun",
        nav_quick: "Tautan Cepat",
        btn_search: "Pencarian Lanjut",
        welcome_msg: "Selamat Datang di Portal Program Antartika Amerika Serikat",
        future_usap: "USAP MASA DEPAN",
        future_desc: "Informasi terbaru tentang rencana induk USAP dan implementasinya.",
        about_header: "Tentang USAP",
        link_program: "Tentang Program",
        link_participants: "Tentang Peserta USAP",
        link_env: "Kebijakan dan Kepatuhan Lingkungan",
        link_faq: "Tanya Jawab (FAQ)",
        news_title: "Host NPR Mendapat Tips dari Antartika tentang Cara Tetap Hangat Selama Bomb Cyclone",
        news_date: "Berita | Jumat, 5 Januari 2018",
        news_content: "'Bomb cyclone' telah melanda wilayah timur AS yang menyebabkan pembatalan penerbangan dan pemadaman listrik. Pada 5 Jan, Keri Nelson, di NSF Palmer Station, Antartika, berdiskusi dengan host All Things Considered, Ari Shapiro...",
        read_more: "Lanjutkan Membaca",
        footer_text: "USAP Masa Depan | Tentang USAP | FAQ"
    }
};

// --- Language Function ---
function changeLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
}

// --- Dropdown Logic ---
const langBtn = document.querySelector('.lang-btn');
const langDropdown = document.querySelector('.lang-dropdown');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
    const isExpanded = langDropdown.classList.contains('show');
    langBtn.setAttribute('aria-expanded', isExpanded);
});

window.addEventListener('click', () => {
    langDropdown.classList.remove('show');
    langBtn.setAttribute('aria-expanded', 'false');
});

// --- Search Function ---
function doSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.trim();
    if (query) {
        alert("Searching for: " + query);
    } else {
        input.focus();
    }
}

// --- Navigation Active Toggle ---
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// --- Automatic Slider Logic ---
const newsList = document.querySelector('.news-list');
let scrollInterval;

function startAutoScroll() {
    scrollInterval = setInterval(() => {
        if (!newsList) return;
        const width = newsList.clientWidth;
        
        // If reached the end, scroll back to 0
        if (newsList.scrollLeft + width >= newsList.scrollWidth - 5) {
            newsList.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            newsList.scrollBy({ left: width, behavior: 'smooth' });
        }
    }, 4000);
}

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLang);
    startAutoScroll();

    // Pause slider on hover
    if (newsList) {
        newsList.addEventListener('mouseenter', () => clearInterval(scrollInterval));
        newsList.addEventListener('mouseleave', startAutoScroll);
    }
});