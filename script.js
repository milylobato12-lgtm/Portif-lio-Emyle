        // Menu mobile
        function toggleMenu() {
            const menu = document.getElementById('nav-menu');
            menu.classList.toggle('open');
        }

        // Fechar menu ao clicar em link
        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('nav-menu').classList.remove('open');
            });
        });

        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.padding = '12px 40px';
                nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
            } else {
                nav.style.padding = '18px 40px';
                nav.style.boxShadow = 'none';
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Efeito de partículas sutis no fundo (canvas)
        (function() {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '-1';
            canvas.style.pointerEvents = 'none';
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            let particles = [];
            const maxParticles = 50;

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            function createParticle() {
                return {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.4 + 0.1
                };
            }

            for (let i = 0; i < maxParticles; i++) {
                particles.push(createParticle());
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.x += p.speedX;
                    p.y += p.speedY;
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(175, 66, 98, ${p.opacity})`;
                    ctx.fill();
                });
                requestAnimationFrame(animate);
            }
            animate();
        })();
