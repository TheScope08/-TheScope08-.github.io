// ========== CONFETTI ANIMATION ==========

let confettiPieces = [];
let animRunning = false;

function createConfetti(x, y) {
    for (let i = 0; i < 60; i++) {
        confettiPieces.push({
            x,
            y: y || innerHeight / 2,
            vx: rand(-10, 10),
            vy: rand(-16, -4),
            r: rand(3, 12),
            color: ["#ff6b95", "#ffd36b", "#ff9ec4", "#9be6a5"][Math.floor(Math.random() * 4)],
            rot: rand(0, 360),
            life: 1
        });
    }
    if (!animRunning) runConfetti();
}

function runConfetti() {
    animRunning = true;

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            let p = confettiPieces[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25;
            p.rot += p.vx;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
            ctx.restore();

            if (p.y > canvas.height + 50 || p.x < -50 || p.x > canvas.width + 50) {
                confettiPieces.splice(i, 1);
            }
        }

        if (confettiPieces.length > 0) {
            requestAnimationFrame(frame);
        } else {
            animRunning = false;
        }
    }

    requestAnimationFrame(frame);
}

// ========== HEART BALLOONS ==========

function createHeartBalloons(x, y) {
    for (let i = 0; i < 12; i++) {
        const el = document.createElement('div');
        el.className = 'heart-balloon';
        el.textContent = HEART_EMOJI;
        el.style.left = (x + (Math.random() - 0.5) * 80) + 'px';
        el.style.top = y + 'px';
        el.style.animationDelay = (i * 0.15) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
    }
}

// ========== FLOATING HEARTS ==========

// Fireworks effect
function createFireworks() {
    const fwCanvas = document.createElement('canvas');
    fwCanvas.className = 'fireworks-canvas';
    fwCanvas.style.position = 'fixed';
    fwCanvas.style.left = 0;
    fwCanvas.style.top = 0;
    fwCanvas.style.width = '100vw';
    fwCanvas.style.height = '100vh';
    fwCanvas.style.pointerEvents = 'none';
    fwCanvas.style.zIndex = 9999;
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
    document.body.appendChild(fwCanvas);
    const ctx = fwCanvas.getContext('2d');

    let particles = [];
    function randomColor() {
        const colors = ['#ff6b95', '#ffd36b', '#ff9ec4', '#9be6a5', '#fff', '#ff3b6b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function createExplosion(x, y) {
        for (let i = 0; i < 48; i++) {
            const angle = (Math.PI * 2) * (i / 48);
            const speed = Math.random() * 6 + 4;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: randomColor(),
                size: Math.random() * 3 + 2
            });
        }
    }
    // Launch 3-5 fireworks
    for (let i = 0; i < 3 + Math.floor(Math.random()*3); i++) {
        setTimeout(() => {
            const x = Math.random() * fwCanvas.width * 0.7 + fwCanvas.width * 0.15;
            const y = Math.random() * fwCanvas.height * 0.4 + fwCanvas.height * 0.1;
            createExplosion(x, y);
        }, i * 400);
    }
    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08;
            p.alpha -= 0.012;
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            if (p.alpha <= 0) particles.splice(i, 1);
        }
        ctx.globalAlpha = 1;
        if (particles.length > 0 && frame < 180) {
            requestAnimationFrame(animate);
            frame++;
        } else {
            fwCanvas.remove();
        }
    }
    animate();
}

// Balloons effect (full width)
function createHeartBalloonsFull() {
    const count = Math.floor(window.innerWidth / 60);
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'heart-balloon big';
        el.textContent = HEART_EMOJI;
        el.style.left = (i * (window.innerWidth / count) + Math.random()*10 - 5) + 'px';
        el.style.bottom = '-60px';
        el.style.fontSize = '48px';
        el.style.position = 'fixed';
        el.style.zIndex = 9998;
        el.style.animation = `floatUpFull 4.5s cubic-bezier(.2,.9,.2,1) forwards`;
        el.style.animationDelay = (Math.random() * 1.2) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }
}

// Per compatibilità, la funzione celebrate ora chiama i fuochi d'artificio
function celebrate(x, y) {
    if (typeof showFireworksV2 === 'function') showFireworksV2();
    createConfetti(x || innerWidth / 2, y || innerHeight / 2);
}
