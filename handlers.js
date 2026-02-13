// ========== EVENT HANDLERS ==========

function onYes(e) {
    const rect = e.target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    resultMessage.classList.add('show');
    resultText.textContent = `SIIIIIIIII (ne ero certo) ${HEART_EMOJI}`;

    setUserAccepted();
    celebrate(cx, cy);
    yesBtn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.28)' },
        { transform: 'scale(1)' }
    ], { duration: 520, easing: 'cubic-bezier(.2,.9,.2,1)' });

    setTimeout(() => createConfetti(innerWidth / 2, innerHeight / 2), 260);
        // Reset NO button position
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        document.querySelector('.btns').classList.remove('playful');

    // Reset heart button position and style
    heartBtn.style.position = '';
    heartBtn.style.left = '';
    heartBtn.style.top = '';
    heartBtn.style.transform = '';
    heartBtn.style.transition = '';
}

function onNo(e) {
    noClickCount++;

    if (!userAccepted) {
        if (noClickCount < 5) {
            const msg = NO_MESSAGES[noClickCount - 1];
            resultMessage.classList.add('show');
            resultText.textContent = msg;
        }

        if (noClickCount >= 5) {
            const msg = "Ok, figo";
            resultMessage.classList.add('show');
            resultText.textContent = msg;

            const container = surpriseCard;
            const rect = container.getBoundingClientRect();
            const btn = noBtn;
            const btnRect = btn.getBoundingClientRect();
            const padding = 12;
            const maxX = Math.max(8, rect.width - btnRect.width - padding);
            const maxY = Math.max(8, rect.height - btnRect.height - padding);
            let x, y, attempts = 0;

            do {
                x = Math.floor(padding + Math.random() * maxX);
                y = Math.floor(padding + Math.random() * maxY);
                attempts++;
            } while (attempts < 8 && Math.abs(x - rect.width / 2) < 30 && Math.abs(y - rect.height / 2) < 30);

            btn.style.position = 'absolute';
            btn.style.left = x + 'px';
            btn.style.top = y + 'px';
            document.querySelector('.btns').classList.add('playful');
        }
    } else {
        const msg = "Troppo tardi per i ripensamenti 😜";
        resultMessage.classList.add('show');
        resultText.textContent = msg;
    }

    noBtn.animate([
        { transform: 'translateX(0) rotate(0deg)' },
        { transform: 'translateX(-8px) rotate(-4deg)' },
        { transform: 'translateX(6px) rotate(4deg)' },
        { transform: 'translateX(0) rotate(0deg)' }
    ], { duration: 420 });
}

function onHeartClick(e) {
    createHeartBalloonsFull();
    heartBtn.animate([
        { transform: 'scale(0.92)' },
        { transform: 'scale(1.12)' },
        { transform: 'scale(1)' }
    ], { duration: 450, easing: 'cubic-bezier(.2,.9,.2,1)' });
}

function onHeartKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        createHeartBalloonsFull();
        heartBtn.animate([
            { transform: 'scale(0.92)' },
            { transform: 'scale(1.12)' },
            { transform: 'scale(1)' }
        ], { duration: 450, easing: 'cubic-bezier(.2,.9,.2,1)' });
    }
}

// ========== SETUP EVENT LISTENERS ==========
function setupEventListeners() {
    heartBtn.addEventListener('click', onHeartClick);
    heartBtn.addEventListener('keydown', onHeartKeydown);
    yesBtn.addEventListener('click', onYes);
    noBtn.addEventListener('click', onNo);
}
