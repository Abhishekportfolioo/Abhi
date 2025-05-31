// Loading animation (shorter duration)
window.addEventListener('load', function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 400); // Faster fade out
    }, 700); // Loader shows for 0.7s
});

// Animated background particles (desktop only, fewer particles for performance)
function createParticles() {
    const bgAnimation = document.querySelector('.bg-animation');
    if (!bgAnimation) return;
    if (window.innerWidth < 768) return;
    for (let i = 0; i < 200; i++) { // Reduced count for performance
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        bgAnimation.appendChild(particle);
    }
}

// Scroll progress bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollProgress + '%';
}

// Enhanced intersection observer for animations
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    if (!('IntersectionObserver' in window)) {
        // fallback: just show all sections
        sections.forEach(section => section.classList.add('animate'));
        return;
    }
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Animate skill tags with stagger effect
                const skillTags = entry.target.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.animation = `fadeInUp 0.6s ease-out forwards`;
                    }, index * 100);
                });
                // Animate project cards with stagger effect
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `slideInUp 3s ease-out forwards`;
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Project card and skill-category hover effects
function setupHoverEffects() {
    // 3D tilt effect for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    // Parallax effect for skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const moveX = (x - rect.width / 2) / 20;
            const moveY = (y - rect.height / 2) / 20;
            this.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-10px) scale(1.02)`;
        });
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling for internal links (if needed for menu anchors)
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typewriter effect for subtitle
function typewriterEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 50);
        }
    }
    setTimeout(typeChar, 500);
}

// Set current year in footer
function setFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan)
        yearSpan.textContent = new Date().getFullYear();
}

// Dark mode toggle
function setupDarkModeToggle() {
    const btn = document.querySelector('.dark-mode-toggle');
    if (!btn) return;
    btn.addEventListener('click', function() {
        document.body.classList.toggle('dark');
    });
}

// Custom cursor (optional, uncomment to activate)
/*
function setupCursorEffect() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    function animateRing() {
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        cursorRing.style.transform = `translate(-5%, -5%) scale(${1 + Math.sin(Date.now() / 500) * 0.1})`;
        requestAnimationFrame(animateRing);
    }
    animateRing();
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .experience-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}
*/

document.addEventListener('DOMContentLoaded', function() {
    setFooterYear();
    createParticles();
    setupScrollAnimations();
    setupHoverEffects();
    setupSmoothScrolling();
    setupDarkModeToggle();
    typewriterEffect();
    // setupCursorEffect(); // Uncomment to enable custom cursor
});

// Update progress bar on scroll
window.addEventListener('scroll', updateProgressBar);