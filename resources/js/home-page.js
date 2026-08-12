// =============================================
// NCA — home-page.js
// =============================================

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

// --- Menu mobile ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('active');
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            const icon = mobileBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
    document.addEventListener('click', e => {
        if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            const icon = mobileBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// --- Scroll animations ---
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// --- FAQ toggle ---
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// --- Carousel galerie ---
const showcaseTrack = document.getElementById('showcase-track');
if (showcaseTrack) {
    const prev = showcaseTrack.parentElement.querySelector('.carousel-btn.prev');
    const next = showcaseTrack.parentElement.querySelector('.carousel-btn.next');
    const w = () => showcaseTrack.querySelector('.showcase-item')?.offsetWidth || 260;
    prev?.addEventListener('click', () => showcaseTrack.scrollBy({ left: -w(), behavior: 'smooth' }));
    next?.addEventListener('click', () => showcaseTrack.scrollBy({ left: w(), behavior: 'smooth' }));
}

// --- Escape key ---
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileBtn?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        const icon = mobileBtn?.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    }
});

// --- WhatsApp ---
const waBtn = document.getElementById('whatsapp-btn');
if (waBtn) {
    waBtn.addEventListener('click', () => {
        const msg = encodeURIComponent('Bonjour New Custom Agency ! Je souhaite obtenir des informations sur vos services logistiques.');
        window.open(`https://wa.me/24384454797?text=${msg}`, '_blank');
    });
}
