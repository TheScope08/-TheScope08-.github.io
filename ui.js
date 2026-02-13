// ========== DOM ELEMENTS ==========
const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');
const stepDate = document.getElementById('stepDate');
const dateInput = document.getElementById('dateInput');
const dateCheck = document.getElementById('dateCheck');
const dateError = document.getElementById('dateError');

const loginCard = document.getElementById('loginCard');
const surpriseCard = document.getElementById('surpriseCard');
const surpriseTitle = document.getElementById('surpriseTitle');
const surpriseLead = document.getElementById('surpriseLead');
const surpriseFooter = document.getElementById('surpriseFooter');

const heartBtn = document.getElementById('heartBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const resultMessage = document.getElementById('resultMessage');
const resultText = document.getElementById('resultText');

const canvas = document.querySelector('.confetti-canvas');
const ctx = canvas.getContext('2d');

// ========== UI STATE ==========
let userAccepted = false;
let noClickCount = 0;

// ========== UTILITY FUNCTIONS ==========
function sanitize(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function showError(el, msg) {
    el.textContent = msg;
    setTimeout(() => {
        if (el.textContent === msg) el.textContent = '';
    }, 3500);
}

function shake(el) {
    el.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(0)' }
    ], { duration: 380 });
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// ========== INITIALIZE UI ==========
function initializeUI() {
    dateCheck.disabled = true;
    dateCheck.setAttribute('aria-disabled', 'true');

    dateInput.addEventListener('input', (ev) => {
        const ok = !!ev.target.value.trim();
        dateCheck.disabled = !ok;
        dateCheck.setAttribute('aria-disabled', String(!ok));
        if (dateError.textContent) dateError.textContent = '';
    });

    // Press effect for button
    dateCheck.addEventListener('mousedown', () => dateCheck.style.transform = 'translateY(1px) scale(.998)');
    dateCheck.addEventListener('mouseup', () => dateCheck.style.transform = '');
    dateCheck.addEventListener('mouseleave', () => dateCheck.style.transform = '');

    // Canvas resize
    addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    });
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

function hideLogin() {
    loginCard.style.display = 'none';
}

function showSurprise() {
    surpriseCard.style.display = 'flex';
    surpriseCard.removeAttribute('aria-hidden');
    surpriseCard.classList.add('show');
    setTimeout(() => {
        surpriseCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        heartBtn.focus();
    }, 160);
}

function openSurprise(name, date) {
    const displayName = name || 'amore';
    surpriseTitle.textContent = `Vuoi essere il mio San Valentino, ${displayName}?`;
    surpriseLead.textContent = `Ricordi il ${date}? Vuoi essere il mio San Valentino per la terza volta😁?`;
    surpriseFooter.textContent = `💝 Con amore — per ${displayName}`;

    hideLogin();
    showSurprise();
    heartBtn.animate([
        { transform: 'scale(0.96)' },
        { transform: 'scale(1.06)' },
        { transform: 'scale(1)' }
    ], { duration: 650 });
}

function resetAll() {
    loginCard.style.display = 'block';
    surpriseCard.style.display = 'none';
    resultMessage.classList.remove('show');
    nameInput.value = '';
    dateInput.value = '';
    nameInput.focus();
    userAccepted = false;
    noClickCount = 0;
}

function setUserAccepted() {
    userAccepted = true;
}
