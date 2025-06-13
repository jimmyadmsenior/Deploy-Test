// Partículas animadas simples em canvas
window.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = 0;
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    const particles = [];
    const colors = ['#43e97b', '#38f9d7', '#6a11cb', '#2575fc', '#fcb69f', '#a1c4fd'];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 2 + Math.random() * 4,
            dx: -0.5 + Math.random(),
            dy: -0.5 + Math.random(),
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.3 + Math.random() * 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function update() {
        for (let p of particles) {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > width) p.dx *= -1;
            if (p.y < 0 || p.y > height) p.dy *= -1;
        }
    }

    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }
    animate();

    // Efeito de cursor customizado elegante
    (function() {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor-effect');
        document.body.appendChild(cursor);

        function moveCursor(e) {
            cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
        }
        document.addEventListener('mousemove', moveCursor);

        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });

        // Efeito de contorno para ambientes claros
        cursor.style.boxShadow = '0 0 16px 4px #9ccfd844, 0 0 0 2px #fff, 0 0 8px 2px #23213655';
        cursor.style.border = '2px solid #fff';
        cursor.style.mixBlendMode = 'difference';

        // Remove o cursor padrão sobre links
        const style = document.createElement('style');
        style.innerHTML = 'a, a:visited, a:hover, a:active { cursor: none !important; }';
        document.head.appendChild(style);
    })();
};
