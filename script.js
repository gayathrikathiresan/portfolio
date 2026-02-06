/* ============================================
   CYBERSECURITY PORTFOLIO - JAVASCRIPT
   ============================================ */

// Network Animation Canvas
let networkAnimationId = null;
let networkInitialized = false;
let networkResizeHandler = null;

function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const computedStyle = window.getComputedStyle(canvas);
    if (computedStyle.display === 'none') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    if (!networkInitialized) {
        networkResizeHandler = () => resizeCanvas();
        window.addEventListener('resize', networkResizeHandler, { passive: true });
    }

    // Node class
    class Node {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 2 + 1;
            this.color = ['#00ffff', '#0066ff', '#39ff14', '#aa00ff'][
                Math.floor(Math.random() * 4)
            ];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Keep in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    // Initialize nodes
    const nodes = [];
    const nodeCount = Math.min(50, Math.floor(canvas.width / 20));
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(
            new Node(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            )
        );
    }

    // Animation loop
    function animate() {
        // Clear canvas with semi-transparent overlay
        ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach((node) => {
            node.update();
            node.draw();
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.globalAlpha = (150 - distance) / 150 * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    networkAnimationId = animationId;
    networkInitialized = true;
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
}

// Navbar Animation on Scroll
function initNavbarAnimation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.style.boxShadow =
                '0 8px 32px rgba(0, 255, 255, 0.1)';
        } else {
            navbar.style.boxShadow =
                '0 8px 32px rgba(0, 255, 255, 0.05)';
        }

        lastScrollY = scrollY;
    });
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill cards
    document.querySelectorAll('.skill-category').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe experience cards
    document.querySelectorAll('.experience-card').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe achievement items
    document.querySelectorAll('.achievement-item').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe cert cards
    document.querySelectorAll('.cert-card').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Cursor Effects
function initCursorEffects() {
    const cursorTrail = document.createElement('div');
    cursorTrail.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(cursorTrail);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add cursor glow on interactive elements
        const interactive = document.elementFromPoint(mouseX, mouseY);
        if (
            interactive &&
            (interactive.closest('.btn') ||
                interactive.closest('.nav-link') ||
                interactive.closest('.skill-tag') ||
                interactive.closest('a'))
        ) {
            cursorTrail.style.background = `radial-gradient(circle, rgba(0, 255, 255, 0.2), transparent 50%)`;
            cursorTrail.style.width = '80px';
            cursorTrail.style.height = '80px';
            cursorTrail.style.left = mouseX - 40 + 'px';
            cursorTrail.style.top = mouseY - 40 + 'px';
            cursorTrail.style.borderRadius = '50%';
            cursorTrail.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
        } else {
            cursorTrail.style.opacity = '0';
        }
    });
}

// Dynamic Button Effects
function initButtonEffects() {
    document.querySelectorAll('.btn, .project-link, .cert-link, .contact-card').forEach((btn) => {
        btn.addEventListener('mouseenter', function () {
            this.style.letterSpacing = '2px';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.letterSpacing = '';
        });

        // Ripple effect
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(0, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to stylesheet
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Active Navigation Link
function initActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--neon-cyan)';
                link.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
            } else {
                link.style.color = '';
                link.style.textShadow = '';
            }
        });
    });
}

// Text Animation
function initTextAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.cssText = `
                display: inline-block;
                animation: letter-fade 0.5s ease forwards;
                animation-delay: ${index * 50}ms;
            `;
            heroTitle.appendChild(span);
        });
    }
}

// Add letter fade animation
function addLetterFadeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letter-fade {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Contact Form Validation (if needed in future)
function initContactValidation() {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card) => {
        card.addEventListener('click', function (e) {
            // Add visual feedback
            this.style.background = 'rgba(0, 255, 255, 0.1)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    initNetworkCanvas();
    initSmoothScroll();
    initNavbarAnimation();
    initScrollAnimations();
    initCursorEffects();
    addRippleAnimation();
    initButtonEffects();
    initActiveNavLink();
    addLetterFadeAnimation();
    initTextAnimation();
    initContactValidation();

    // Log initialization
    console.log('🔐 Cybersecurity Portfolio Initialized');
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    if (!networkInitialized) {
        initNetworkCanvas();
    }
});

// Prevent right-click context menu (optional security measure)
// Uncomment if desired
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});
*/

// Disable text selection (optional, remove if not needed)
// Uncomment if desired
/*
document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
*/
