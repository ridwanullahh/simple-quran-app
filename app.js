// Bismillah Ar-Rahman Ar-Raheem
// Al-Quran Digital Mushaf App

const API_BASE = 'https://api.alquran.cloud/v1';

let currentSurah = 1;
let currentPage = 1;
let surahData = [];

// Surah names in Arabic
const surahNames = {
    1: 'الفاتحة', 2: 'البقرة', 3: 'آل عمران', 4: 'النساء', 5: 'المائدة',
    6: 'الأنعام', 7: 'الأعراف', 8: 'الأنفال', 9: 'التوبة', 10: 'يونس',
    11: 'هود', 12: 'يوسف', 13: 'الرعد', 14: 'إبراهيم', 15: 'الحجر',
    16: 'النحل', 17: 'الإسراء', 18: 'الكهف', 19: 'مريم', 20: 'طه',
    21: 'الأنبياء', 22: 'الحج', 23: 'المؤمنون', 24: 'النور', 25: 'الفرقان',
    26: 'الشعراء', 27: 'النمل', 28: 'القصص', 29: 'العنكبوت', 30: 'الروم',
    31: 'لقمان', 32: 'السجدة', 33: 'الأحزاب', 34: 'سبأ', 35: 'فاطر',
    36: 'يس', 37: 'الصافات', 38: 'ص', 39: 'الزمر', 40: 'غافر',
    41: 'فصلت', 42: 'الشورى', 43: 'الزخرف', 44: 'الدخان', 45: 'الجاثية',
    46: 'الأحقاف', 47: 'محمد', 48: 'الفتح', 49: 'الحجرات', 50: 'ق',
    51: 'الذاريات', 52: 'الطور', 53: 'النجم', 54: 'القمر', 55: 'الرحمن',
    56: 'الواقعة', 57: 'الحديد', 58: 'المجادلة', 59: 'الحشر', 60: 'الممتحنة',
    61: 'الصف', 62: 'الجمعة', 63: 'المنافقون', 64: 'التغابن', 65: 'الطلاق',
    66: 'التحريم', 67: 'الملك', 68: 'القلم', 69: 'الحاقة', 70: 'المعارج',
    71: 'نوح', 72: 'الجن', 73: 'المزمل', 74: 'المدثر', 75: 'القيامة',
    76: 'الإنسان', 77: 'المرسلات', 78: 'النبأ', 79: 'النازعات', 80: 'عبس',
    81: 'التكوير', 82: 'الإنفطار', 83: 'المطففين', 84: 'الانشقاق', 85: 'البروج',
    86: 'الطارق', 87: 'الأعلى', 88: 'الغاشية', 89: 'الفجر', 90: 'البلد',
    91: 'الشمس', 92: 'الليل', 93: 'الضحى', 94: 'الشرح', 95: 'التين',
    96: 'العلق', 97: 'القدر', 98: 'البينة', 99: 'الزلزلة', 100: 'العاديات',
    101: 'القارعة', 102: 'التكاثر', 103: 'العصر', 104: 'الهمزة', 105: 'الفيل',
    106: 'قريش', 107: 'الماعون', 108: 'الكوثر', 109: 'الكافرون', 110: 'النصر',
    111: 'المسد', 112: 'الإخلاص', 113: 'الفلق', 114: 'الناس'
};

const revelationType = {
    1: 'مكية', 2: 'مدنية', 3: 'مدنية', 4: 'مدنية', 5: 'مدنية',
    6: 'مكية', 7: 'مكية', 8: 'مدنية', 9: 'مدنية', 10: 'مكية',
    11: 'مكية', 12: 'مكية', 13: 'مدنية', 14: 'مكية', 15: 'مكية',
    16: 'مكية', 17: 'مكية', 18: 'مكية', 19: 'مكية', 20: 'مكية',
    21: 'مكية', 22: 'مدنية', 23: 'مكية', 24: 'مدنية', 25: 'مكية',
    26: 'مكية', 27: 'مكية', 28: 'مكية', 29: 'مكية', 30: 'مكية',
    31: 'مكية', 32: 'مكية', 33: 'مدنية', 34: 'مكية', 35: 'مكية',
    36: 'مكية', 37: 'مكية', 38: 'مكية', 39: 'مكية', 40: 'مكية',
    41: 'مكية', 42: 'مكية', 43: 'مكية', 44: 'مكية', 45: 'مكية',
    46: 'مكية', 47: 'مدنية', 48: 'مدنية', 49: 'مدنية', 50: 'مكية',
    51: 'مكية', 52: 'مكية', 53: 'مكية', 54: 'مكية', 55: 'مدنية',
    56: 'مكية', 57: 'مدنية', 58: 'مدنية', 59: 'مدنية', 60: 'مدنية',
    61: 'مدنية', 62: 'مدنية', 63: 'مدنية', 64: 'مدنية', 65: 'مدنية',
    66: 'مدنية', 67: 'مكية', 68: 'مكية', 69: 'مكية', 70: 'مكية',
    71: 'مكية', 72: 'مكية', 73: 'مكية', 74: 'مكية', 75: 'مكية',
    76: 'مدنية', 77: 'مكية', 78: 'مكية', 79: 'مكية', 80: 'مكية',
    81: 'مكية', 82: 'مكية', 83: 'مكية', 84: 'مكية', 85: 'مكية',
    86: 'مكية', 87: 'مكية', 88: 'مكية', 89: 'مكية', 90: 'مكية',
    91: 'مكية', 92: 'مكية', 93: 'مكية', 94: 'مكية', 95: 'مكية',
    96: 'مكية', 97: 'مكية', 98: 'مدنية', 99: 'مدنية', 100: 'مكية',
    101: 'مكية', 102: 'مكية', 103: 'مكية', 104: 'مكية', 105: 'مكية',
    106: 'مكية', 107: 'مكية', 108: 'مكية', 109: 'مكية', 110: 'مدنية',
    111: 'مكية', 112: 'مكية', 113: 'مكية', 114: 'مكية'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadSurahList();
});

function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchTab(e.target.dataset.view);
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchQuran(e.target.value);
    });

    // Reader navigation
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
}

function switchTab(view) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    document.getElementById(`${view}View`).classList.add('active');

    if (view === 'juz') loadJuzList();
    if (view === 'read') loadSurahForReading(currentSurah);
}

async function loadSurahList() {
    const container = document.getElementById('surahList');
    container.innerHTML = '<div class="loading">جاري تحميل السور...</div>';

    try {
        const response = await fetch(`${API_BASE}/meta`);
        const data = await response.json();

        if (data.code === 200) {
            const surahs = data.data.surahs.references;
            surahData = surahs;

            container.innerHTML = '';
            surahs.forEach(surah => {
                const card = createSurahCard(surah);
                container.appendChild(card);
            });
        }
    } catch (error) {
        container.innerHTML = '<div class="error">حدث خطأ في تحميل البيانات</div>';
    }
}

function createSurahCard(surah) {
    const card = document.createElement('div');
    card.className = 'surah-card';
    card.innerHTML = `
        <div class="surah-number">${surah.number}</div>
        <div class="surah-name">${surah.name}</div>
        <div class="surah-info">
            ${revelationType[surah.number] || 'مكية'} • ${surah.numberOfAyahs} آية
        </div>
    `;
    card.addEventListener('click', () => {
        currentSurah = surah.number;
        switchTab('read');
    });
    return card;
}

function loadJuzList() {
    const container = document.querySelector('.juz-grid');
    container.innerHTML = '';

    for (let i = 1; i <= 30; i++) {
        const card = document.createElement('div');
        card.className = 'juz-card';
        card.textContent = `الجزء ${i}`;
        card.addEventListener('click', () => {
            // Load juz content (simplified for demo)
            alert(`جزء ${i} - قريباً إن شاء الله`);
        });
        container.appendChild(card);
    }
}

async function loadSurahForReading(surahNumber) {
    const container = document.getElementById('ayahContainer');
    container.innerHTML = '<div class="loading">جاري تحميل الآيات...</div>';

    try {
        const response = await fetch(`${API_BASE}/surah/${surahNumber}`);
        const data = await response.json();

        if (data.code === 200) {
            const surah = data.data;
            container.innerHTML = '';

            // Add bismillah if not surah 1 or 9
            if (surahNumber !== 1 && surahNumber !== 9) {
                const bismillah = document.createElement('div');
                bismillah.className = 'ayah';
                bismillah.innerHTML = `<div style="text-align: center; font-size: 1.8em; margin: 20px 0;">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>`;
                container.appendChild(bismillah);
            }

            surah.ayahs.forEach(ayah => {
                const ayahDiv = document.createElement('div');
                ayahDiv.className = 'ayah';
                ayahDiv.innerHTML = `
                    ${ayah.text}
                    <span class="ayah-number">${ayah.numberInSurah}</span>
                `;
                container.appendChild(ayahDiv);
            });

            document.getElementById('pageInfo').textContent = `سورة ${surahNames[surahNumber]}`;
        }
    } catch (error) {
        container.innerHTML = '<div class="error">حدث خطأ في تحميل الآيات</div>';
    }
}

function changePage(direction) {
    const newSurah = currentSurah + direction;
    if (newSurah >= 1 && newSurah <= 114) {
        currentSurah = newSurah;
        loadSurahForReading(currentSurah);
    }

    document.getElementById('prevPage').disabled = currentSurah === 1;
    document.getElementById('nextPage').disabled = currentSurah === 114;
}

function searchQuran(query) {
    if (!query.trim()) {
        loadSurahList();
        return;
    }

    const container = document.getElementById('surahList');
    const filtered = surahData.filter(surah =>
        surah.name.includes(query) ||
        surah.englishName.toLowerCase().includes(query.toLowerCase()) ||
        surah.number.toString() === query
    );

    container.innerHTML = '';
    if (filtered.length === 0) {
        container.innerHTML = '<div class="error">لا توجد نتائج</div>';
    } else {
        filtered.forEach(surah => {
            const card = createSurahCard(surah);
            container.appendChild(card);
        });
    }
}
