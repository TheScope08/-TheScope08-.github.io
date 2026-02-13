// ========== AUTHENTICATION ==========

function isNameCorrect(v) {
    return sanitize(v) === SECRET_NAME;
}

function isDateCorrect(v) {
    return SECRET_DATES.includes(sanitize(v));
}

function checkName() {
    const v = nameInput.value;
    if (!v.trim()) {
        showError(nameError, 'Per favore inserisci un nome');
        shake(nameInput);
        return;
    }
    if (isNameCorrect(v)) {
        stepDate.style.display = 'grid';
        stepDate.setAttribute('aria-hidden', 'false');
        dateInput.focus();
    } else {
        showError(nameError, 'Nome non riconosciuto — riprova');
        shake(nameInput);
    }
}

function checkDate() {
    const v = dateInput.value;
    if (!v.trim()) {
        showError(dateError, 'Inserisci una data');
        shake(dateInput);
        return;
    }
    if (isDateCorrect(v)) {
        openSurprise(nameInput.value.trim(), v.trim());
    } else {
        showError(dateError, 'Data errata — riprova');
        shake(dateInput);
    }
}

// ========== SETUP AUTH LISTENERS ==========
function setupAuthListeners() {
    nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') checkName();
    });

    dateInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') checkDate();
    });

    dateCheck.addEventListener('click', checkDate);

    nameInput.addEventListener('input', () => {
        if (isNameCorrect(nameInput.value)) {
            setTimeout(() => checkName(), 200);
        }
    });
}
