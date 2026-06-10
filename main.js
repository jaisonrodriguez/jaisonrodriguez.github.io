/**
 * PORTAFOLIO PROFESIONAL - Lógica Principal
 * Autor: Generado para Perfil Senior
 * Descripción: Script modular para interactividad, validaciones y accesibilidad.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de módulos
    ThemeModule.init();
    NavigationModule.init();
    ScrollObserverModule.init();
    FormValidationModule.init();
    FooterModule.init();
    CanvasModule.init();
});

/* ==========================================================================
   MÓDULO DE TEMA (Oscuro/Claro)
   ========================================================================== */
const ThemeModule = (() => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    const STORAGE_KEY = 'portfolio-theme';

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        
        // Actualizar ícono
        if(theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    };

    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const init = () => {
        // Detectar preferencia guardada o sistema
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }

        themeToggle.addEventListener('click', toggleTheme);
    };

    return { init };
})();

/* ==========================================================================
   MÓDULO DE NAVEGACIÓN (Menú móvil y Scroll Suave)
   ========================================================================== */
const NavigationModule = (() => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        navMenu.classList.toggle('show-menu');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    };

    const closeMenu = () => {
        navMenu.classList.remove('show-menu');
        navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    };

    const init = () => {
        // Event listeners
        if (navToggle) {
            navToggle.addEventListener('click', toggleMenu);
        }

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Activar link basado en scroll (ScrollSpy)
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100;
                const sectionId = current.getAttribute('id');
                const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);

                if (link) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        link.classList.add('active-link');
                    } else {
                        link.classList.remove('active-link');
                    }
                }
            });
        }, { passive: true }); // Optimización de scroll
    };

    return { init };
})();

/* ==========================================================================
   MÓDULO DE OBSERVACIÓN DE SCROLL (Animaciones de entrada)
   ========================================================================== */
const ScrollObserverModule = (() => {
    const init = () => {
        // Añadir clase inicial para elementos a animar
        const animatedElements = document.querySelectorAll('.skills-card, .timeline-item, .project-card, .education-card');
        animatedElements.forEach(el => el.classList.add('fade-in'));

        // Observer para disparar animación cuando entran al viewport
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Dejar de observar una vez que ya se animó para rendimiento
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    };

    return { init };
})();

/* ==========================================================================
   MÓDULO DE VALIDACIÓN DE FORMULARIO
   ========================================================================== */
const FormValidationModule = (() => {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-msg');

    const validateInput = (input) => {
        let isValid = true;
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                isValid = false;
            }
        }

        if (!isValid) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }

        return isValid;
    };

    const init = () => {
        if (!form) return;

        // Validación en tiempo real (blur event)
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            // Quitar clase de error al escribir
            input.addEventListener('input', () => input.classList.remove('invalid'));
        });

        // Submit handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let formValid = true;

            inputs.forEach(input => {
                if (!validateInput(input)) {
                    formValid = false;
                }
            });

            if (formValid) {
                // Simular envío a API
                const btn = form.querySelector('.btn-submit');
                const originalText = btn.textContent;
                btn.textContent = 'Enviando...';
                btn.disabled = true;

                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    successMsg.style.display = 'block';
                    
                    // Ocultar mensaje después de 3 segundos
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 3000);
                }, 1500);
            }
        });
    };

    return { init };
})();

/* ==========================================================================
   MÓDULO DE FOOTER (Año dinámico)
   ========================================================================== */
const FooterModule = (() => {
    const init = () => {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };
    
    return { init };
})();

/* ==========================================================================
   MÓDULO DE CANVAS (Efecto de red/circuitos interactivo)
   ========================================================================== */
const CanvasModule = (() => {
    const init = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        // Configuración de interacción
        let mouse = {
            x: null,
            y: null,
            radius: 150 // Radio de conexión de los circuitos
        };

        // Capturar movimiento del mouse pero SIN bloquear el pointer
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        
        // Ocultar conexiones cuando el mouse sale de la ventana
        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Rebote en bordes
                if (this.x > width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > height || this.y < 0) this.speedY = -this.speedY;
            }

            draw() {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.2)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            let numberOfParticles = (width * height) / 15000;
            if(numberOfParticles > 150) numberOfParticles = 150; 
            
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const connect = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            let opacityValue = 1;
            
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        opacityValue = 1 - (distance / 100);
                        ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${opacityValue * 0.15})` : `rgba(0, 0, 0, ${opacityValue * 0.05})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
                
                if(mouse.x != null && mouse.y != null) {
                    let dxMouse = particles[a].x - mouse.x;
                    let dyMouse = particles[a].y - mouse.y;
                    let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                    
                    if (distanceMouse < mouse.radius) {
                        opacityValue = 1 - (distanceMouse / mouse.radius);
                        // Conexión activa con color azul/primario
                        ctx.strokeStyle = isDark ? `rgba(100, 150, 255, ${opacityValue * 0.6})` : `rgba(50, 100, 255, ${opacityValue * 0.4})`;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
            requestAnimationFrame(animate);
        };

        resize();
        animate();
    };

    return { init };
})();
