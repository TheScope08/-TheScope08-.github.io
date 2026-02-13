// Fireworks v2.0 minimal integration (no jQuery, no text, only effect)
// Based on fireworks v2.0.js, adapted for vanilla JS and modular use

function showFireworksV2() {
    // Palette romantica
    const pastelColors = [
        '#ffb6c1', // rosa chiaro
        '#ffd1dc', // rosa pastello
        '#ffe4e1', // rosa pallido
        '#fff0f5', // lavanda
        '#ffe5ec', // rosa cipria
        '#f9c6d3', // rosa pesca
        '#f7cac9', // rosa baby
        '#fff',    // bianco
        '#ffb347', // albicocca
        '#e0bbff'  // lilla
    ];
    // Remove any previous canvas
    let old = document.getElementById('fireworks-v2-canvas');
    if (old) old.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'fireworks-v2-canvas';
    canvas.style.position = 'fixed';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // --- Firework logic (simplified, no jQuery, no text) ---
    let listFire = [];
    let listFirework = [];
    let fireNumber = 10;
    let center = { x: canvas.width / 2, y: canvas.height / 2 };
    let range = 100;
    // Sound omitted for simplicity

    function makeFire() {
        for (let i = 0; i < fireNumber; i++) {
            let fire = {
                x: (Math.random() * range) / 2 - range / 4 + center.x,
                y: Math.random() * range * 2.5 + canvas.height,
                size: Math.random() + 0.5,
                fill: '#ff3',
                vx: Math.random() - 0.5,
                vy: -(Math.random() + 4),
                ax: Math.random() * 0.06 - 0.03,
                delay: Math.round(Math.random() * range) + range * 4,
                hold: false,
                alpha: 1,
                far: Math.random() * range + (center.y - range)
            };
            fire.base = { x: fire.x, y: fire.y, vx: fire.vx, vy: fire.vy };
            listFire.push(fire);
        }
    }

    function makeFirework(fire) {
        let count = Math.random() * 10 + 80;
        let angle = Math.PI * 2 / count;
        for (let i = 0; i < count; i++) {
            // 1 su 7 particelle è un cuore
            const isHeart = Math.random() < 0.14;
            let fw = {
                x: fire.x,
                y: fire.y,
                size: isHeart ? 18 : (Math.random() + 1.5),
                fill: pastelColors[Math.floor(Math.random() * pastelColors.length)],
                vx: Math.cos(angle * i) * (Math.random() * 10 + 4),
                vy: Math.sin(angle * i) * (Math.random() * 10 + 4),
                alpha: 1,
                life: 0,
                max: Math.random() * 30 + 60,
                isHeart
            };
            listFirework.push(fw);
        }
    }

    function draw() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,0.10)'; // dissolvenza più lenta
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        // Draw fireworks
        for (let i = listFirework.length - 1; i >= 0; i--) {
            let f = listFirework[i];
            f.x += f.vx;
            f.y += f.vy;
            f.vy += 0.014; // gravità più dolce
            f.alpha -= 0.007; // dissolvenza più lenta
            f.life++;
            ctx.save();
            ctx.globalAlpha = Math.max(f.alpha, 0);
            if (f.isHeart) {
                ctx.font = `${f.size}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = f.fill;
                ctx.fillText('💝', f.x, f.y);
            } else {
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
                ctx.fillStyle = f.fill;
                ctx.fill();
            }
            ctx.restore();
            if (f.alpha <= 0 || f.life > f.max) listFirework.splice(i, 1);
        }

        // Draw fires
        for (let i = listFire.length - 1; i >= 0; i--) {
            let fire = listFire[i];
            if (fire.y <= fire.far || fire.vy >= 0) {
                makeFirework(fire);
                listFire.splice(i, 1);
                continue;
            }
            fire.x += fire.vx;
            fire.y += fire.vy;
            fire.vx += fire.ax;
            fire.vy += 0.008;
            ctx.save();
            ctx.globalAlpha = fire.alpha;
            ctx.beginPath();
            ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
            ctx.fillStyle = fire.fill;
            ctx.fill();
            ctx.restore();
        }

        if (listFire.length || listFirework.length) {
            setTimeout(draw, 1000/75); // ~75fps per maggiore fluidità
        } else {
            setTimeout(() => { canvas.remove(); }, 800);
        }
    }

    makeFire();
    draw();
}
