// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;

// Gestion du slider
function showSlide(index) {
slides.forEach((slide, i) => {
slide.classList.toggle('active', i === index);
});

dots.forEach((dot, i) => {
dot.classList.toggle('active', i === index);
});
}

function nextSlide() {
currentSlide = (currentSlide + 1) % totalSlides;
showSlide(currentSlide);
}

function prevSlide() {
currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
showSlide(currentSlide);
}

const sliderNext = document.getElementById('next-slide');
const sliderPrev = document.getElementById('prev-slide');
const hasSlider = slides.length > 0 && sliderNext && sliderPrev;

if (hasSlider) {
// Event listeners du slider
sliderNext.addEventListener('click', nextSlide);
sliderPrev.addEventListener('click', prevSlide);

// Navigation clavier
document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowLeft'].includes(e.key)) {
        const tag = document.activeElement.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.key === 'ArrowRight' ? nextSlide() : prevSlide();
        }
    }
});

// Navigation par points
dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
currentSlide = index;
showSlide(currentSlide);
});
});

// Auto-avancement du slider
let sliderInterval = setInterval(nextSlide, 6000);

// Pause du slider au survol
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 6000);
    });
}
}

// Gestion du thème
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

if (themeToggle && lightIcon && darkIcon) {
// Initialiser le thème
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
html.classList.add('dark');
lightIcon.style.display = 'none';
darkIcon.style.display = 'block';
}

// Toggle du thème
themeToggle.addEventListener('click', () => {
html.classList.toggle('dark');
const isDark = html.classList.contains('dark');

lightIcon.style.display = isDark ? 'none' : 'block';
darkIcon.style.display = isDark ? 'block' : 'none';

localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
}

// Menu mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
mobileMenuBtn.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
        icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    }
});

// Fermer le menu mobile lors du clic sur un lien
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    });
});

// Fermer le menu mobile lors du clic à l'extérieur
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
});
}

// Smooth scroll pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
    const offsetTop = target.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}
});
});

// Animation au scroll
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
    entry.target.classList.add('animate');
}
});
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.animate-on-scroll').forEach(el => {
observer.observe(el);
});

// Effet de la navbar au scroll
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
const currentScrollY = window.scrollY;

if (currentScrollY > 100) {
navbar.classList.add('scrolled');
} else {
navbar.classList.remove('scrolled');
}

lastScrollY = currentScrollY;
});

// Gestion du formulaire
// Le formulaire de contact est désormais géré côté serveur avec Livewire (voir app/Livewire/ContactForm)
// Nous gardons l'UX via des événements dispatchBrowserEvent('contact:submitted') côté Livewire.
// Compteurs animés
function animateCounters() {
const counters = document.querySelectorAll('.stat-number');

counters.forEach(counter => {
if (counter.classList.contains('counted')) return;
counter.classList.add('counted');
const target = counter.textContent;
const isNumber = !isNaN(target.replace('+', '').replace('%', ''));

if (isNumber) {
    const finalNumber = parseInt(target.replace(/\D/g, ''));
    const increment = finalNumber / 100;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current) + (target.includes('+') ? '+' : target
                .includes('%') ? '%' : '');
        }
    }, 20);
}
});
}

// Démarrer les compteurs quand la section stats est visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
const statsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
    }
});
}, {
threshold: 0.5
});

statsObserver.observe(statsSection);
}

// Support du clavier pour l'accessibilité
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
if (mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = 'fas fa-bars';
}
}
});

// Performance: affichage progressif
document.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
document.body.style.opacity = '1';
}, 100);
});

// Initialisation
showSlide(0);

// 4. FAQ INTERACTIVE
const faqSearch = document.getElementById('faq-search');
const faqItems = document.querySelectorAll('.faq-item');
const faqCategories = document.querySelectorAll('.faq-category');
const faqQuestions = document.querySelectorAll('.faq-question');

// Fonction de recherche FAQ
function searchFAQ(query) {
const searchTerm = query.toLowerCase();

faqItems.forEach(item => {
const question = item.querySelector('.faq-question span').textContent.toLowerCase();
const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();

if (question.includes(searchTerm) || answer.includes(searchTerm)) {
    item.style.display = 'block';
} else {
    item.style.display = searchTerm === '' ? 'block' : 'none';
}
});
}

// Fonction de filtrage par catégorie
function filterFAQByCategory(category) {
faqItems.forEach(item => {
if (category === 'all' || item.dataset.category === category) {
    item.style.display = 'block';
} else {
    item.style.display = 'none';
}
});
}

// Event listeners FAQ
if (faqSearch) {
faqSearch.addEventListener('input', (e) => {
searchFAQ(e.target.value);

// Reset category filter when searching
if (e.target.value) {
    faqCategories.forEach(cat => cat.classList.remove('active'));
    faqCategories[0].classList.add('active');
}
});
}

faqCategories.forEach(category => {
category.addEventListener('click', () => {
// Clear search when filtering by category
if (faqSearch) faqSearch.value = '';

// Update active category
faqCategories.forEach(cat => cat.classList.remove('active'));
category.classList.add('active');

// Filter FAQs
filterFAQByCategory(category.dataset.category);
});
});

// Toggle FAQ answers
faqQuestions.forEach(question => {
question.addEventListener('click', () => {
const faqItem = question.closest('.faq-item');
const isActive = faqItem.classList.contains('active');

// Close all other FAQs
faqItems.forEach(item => {
    if (item !== faqItem) {
        item.classList.remove('active');
    }
});

// Toggle current FAQ
faqItem.classList.toggle('active', !isActive);
});
});

// Animation des FAQs
const faqObserver = new IntersectionObserver((entries) => {
entries.forEach((entry, index) => {
if (entry.isIntersecting) {
    setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
    }, index * 100);
    faqObserver.unobserve(entry.target);
}
});
}, {
threshold: 0.1
});

faqItems.forEach(item => {
item.style.opacity = '0';
item.style.transform = 'translateX(-20px)';
item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
faqObserver.observe(item);
});

// Carousel galerie
const showcaseTrack = document.getElementById('showcase-track');
if (showcaseTrack) {
    const prevBtn = showcaseTrack.parentElement.querySelector('.carousel-btn.prev');
    const nextBtn = showcaseTrack.parentElement.querySelector('.carousel-btn.next');
    const scrollAmount = () => showcaseTrack.querySelector('.showcase-item')?.offsetWidth || 260;

    prevBtn?.addEventListener('click', () => {
        showcaseTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
        showcaseTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
}

// Amélioration de la navigation vers les nouvelles sections
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
if (!link.getAttribute('href').startsWith('#slide')) {
link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});
}
});

console.log('🚀 New Custom Agency - Toutes les fonctionnalités premium chargées avec succès !');

// === FONCTIONNALITÉS COMMUNICATION CLIENT ===

// 1. CHAT BOT INTELLIGENT
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBadge = document.getElementById('chatbot-badge');

let chatbotOpen = false;
let chatbotResponses = {
'devis': 'Pour un devis personnalisé, je peux vous orienter vers notre calculateur automatique ou vous pouvez remplir notre formulaire de contact. Quel service vous intéresse ?',
'tracking': 'Pour suivre votre colis, veuillez me communiquer votre numéro de suivi. Il commence généralement par "NCA" suivi de 8 chiffres.',
'services': 'Nos services principaux sont :\n• Dédouanement expert\n• Transport multimodal\n• Entreposage sécurisé\n• Gestion hydrocarbures\n\nSur quoi puis-je vous renseigner ?',
'contact': 'Vous pouvez nous contacter :\n📞 (+243) 84 45 47 797\n📍 Avenue Kasavubu, 24 Lubumbashi\n💬 WhatsApp disponible\n\nOu prendre RDV directement !',
'tarifs': 'Nos tarifs dépendent de plusieurs facteurs : poids, volume, destination, urgence. Utilisez notre calculateur pour une estimation immédiate !',
'delais': 'Nos délais standard :\n• Dédouanement : 24-48h\n• Transport national : 2-5 jours\n• Service express disponible\n\nVoulez-vous plus de détails ?',
'horaires': 'Nos horaires :\n🕒 Lun-Ven : 8h-17h\n🕒 Samedi : 8h-12h\n🚨 Support urgence : 24h/7j\n\nNous sommes actuellement en ligne !',
'documents': 'Documents requis :\n📄 Facture commerciale\n📄 Connaissement\n📄 Liste de colisage\n📄 Certificat d\'origine\n\nBesoin d\'aide pour les préparer ?'
};

function toggleChatbot() {
chatbotOpen = !chatbotOpen;
chatbotWindow.classList.toggle('active', chatbotOpen);
if (chatbotOpen) {
chatInput.focus();
chatBadge.style.display = 'none';
}
}

function addMessage(content, isUser = false) {
const messageDiv = document.createElement('div');
messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;

if (isUser) {
messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
} else {
messageDiv.innerHTML = `
<div class="message-avatar">NCA</div>
<div class="message-content">${content.replace(/\n/g, '<br>')}</div>
`;
}

chatbotMessages.appendChild(messageDiv);
chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(message) {
const lowerMessage = message.toLowerCase();

// Réponses intelligentes basées sur mots-clés
if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût')) {
return chatbotResponses['tarifs'];
} else if (lowerMessage.includes('suivi') || lowerMessage.includes('tracking') || lowerMessage.includes(
'colis')) {
return chatbotResponses['tracking'];
} else if (lowerMessage.includes('délai') || lowerMessage.includes('temps') || lowerMessage.includes('durée')) {
return chatbotResponses['delais'];
} else if (lowerMessage.includes('document') || lowerMessage.includes('papier') || lowerMessage.includes(
    'certificat')) {
return chatbotResponses['documents'];
} else if (lowerMessage.includes('horaire') || lowerMessage.includes('ouvert') || lowerMessage.includes(
'fermé')) {
return chatbotResponses['horaires'];
} else if (lowerMessage.includes('service') || lowerMessage.includes('prestation')) {
return chatbotResponses['services'];
} else if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes(
    'adresse')) {
return chatbotResponses['contact'];
} else if (lowerMessage.includes('devis') || lowerMessage.includes('estimation') || lowerMessage.includes(
    'calculer')) {
return chatbotResponses['devis'];
} else if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes(
'hello')) {
return '👋 Bonjour ! Je suis ravi de vous aider. En quoi puis-je vous être utile aujourd\'hui ?';
} else if (lowerMessage.includes('merci') || lowerMessage.includes('thanks')) {
return '😊 Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions. Bonne journée !';
} else {
return 'Je comprends votre question. Pour une réponse précise, je vous recommande de :\n• Utiliser notre calculateur de devis\n• Consulter notre FAQ\n• Contacter directement nos experts\n\nQue préférez-vous ?';
}
}

function sendMessage() {
const message = chatInput.value.trim();
if (message) {
addMessage(message, true);
chatInput.value = '';

setTimeout(() => {
    const response = getBotResponse(message);
    addMessage(response);
}, 1000);
}
}

// Event listeners chatbot
chatbotToggle.addEventListener('click', toggleChatbot);
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') sendMessage();
});

// Suggestions chatbot
document.addEventListener('click', (e) => {
if (e.target.classList.contains('suggestion-btn')) {
const suggestion = e.target.dataset.suggestion;
if (chatbotResponses[suggestion]) {
    addMessage(chatbotResponses[suggestion]);
}
}
});

// 2. WHATSAPP BUSINESS
const whatsappBtn = document.getElementById('whatsapp-btn');

whatsappBtn.addEventListener('click', () => {
const message = encodeURIComponent(
`Bonjour New Custom Agency ! Je souhaite obtenir des informations sur vos services logistiques.`
);
const phoneNumber = '24382126418'; // Numéro WhatsApp Business
const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
window.open(whatsappURL, '_blank');
});


// 4. PRISE DE RDV
const rdvModal = document.getElementById('rdv-modal');
const rdvClose = document.getElementById('rdv-close');
const rdvSteps = document.querySelectorAll('.rdv-step');
const rdvNext = document.getElementById('rdv-next');
const rdvPrev = document.getElementById('rdv-prev');

let currentRdvStep = 1;
let rdvData = {
type: '',
date: '',
time: '',
name: '',
email: '',
phone: '',
company: '',
message: ''
};

function openRdv() {
rdvModal.classList.add('active');
document.body.style.overflow = 'hidden';
generateCalendar();
}

function closeRdv() {
rdvModal.classList.remove('active');
document.body.style.overflow = '';
currentRdvStep = 1;
showRdvStep(1);
}

function showRdvStep(step) {
rdvSteps.forEach((stepEl, index) => {
stepEl.classList.toggle('active', index + 1 === step);
});

rdvPrev.style.display = step > 1 ? 'inline-flex' : 'none';

if (step === rdvSteps.length) {
generateRdvSummary();
rdvNext.style.display = 'none';
} else {
rdvNext.style.display = 'inline-flex';
rdvNext.textContent = step === rdvSteps.length - 1 ? 'Récapitulatif' : 'Suivant';
}
}

function generateCalendar() {
const calendarGrid = document.getElementById('calendar-grid');
const today = new Date();
const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

calendarGrid.innerHTML = '';

// Headers des jours
days.forEach(day => {
const dayHeader = document.createElement('div');
dayHeader.textContent = day;
dayHeader.style.fontWeight = '600';
dayHeader.style.textAlign = 'center';
dayHeader.style.padding = '0.5rem';
calendarGrid.appendChild(dayHeader);
});

// Générer les jours (prochains 14 jours ouvrables)
for (let i = 1; i <= 14; i++) {
const date = new Date(today);
date.setDate(today.getDate() + i);

const dayEl = document.createElement('div');
dayEl.className = 'calendar-day';
dayEl.textContent = date.getDate();
dayEl.dataset.date = date.toISOString().split('T')[0];

// Désactiver weekends
if (date.getDay() === 0 || date.getDay() === 6) {
    dayEl.classList.add('disabled');
} else {
    dayEl.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        dayEl.classList.add('selected');
        rdvData.date = dayEl.dataset.date;
    });
}

calendarGrid.appendChild(dayEl);
}
}

function generateRdvSummary() {
const summary = document.getElementById('rdv-summary');
const date = new Date(rdvData.date);
const dateStr = date.toLocaleDateString('fr-FR', {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'
});

summary.innerHTML = `
<div class="summary-item">
<span>Type de consultation :</span>
<span>${rdvData.type}</span>
</div>
<div class="summary-item">
<span>Date :</span>
<span>${dateStr}</span>
</div>
<div class="summary-item">
<span>Heure :</span>
<span>${rdvData.time}</span>
</div>
<div class="summary-item">
<span>Contact :</span>
<span>${rdvData.name} - ${rdvData.email}</span>
</div>
`;
}

// Event listeners RDV
document.addEventListener('click', (e) => {
if (e.target.closest('.btn') && e.target.textContent.includes('Prendre rendez-vous')) {
openRdv();
}

if (e.target.closest('[data-rdv-type]')) {
document.querySelectorAll('[data-rdv-type]').forEach(opt => opt.classList.remove('selected'));
e.target.closest('[data-rdv-type]').classList.add('selected');
rdvData.type = e.target.closest('[data-rdv-type]').dataset.rdvType;
}

if (e.target.classList.contains('time-slot') && !e.target.classList.contains('unavailable')) {
document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
e.target.classList.add('selected');
rdvData.time = e.target.dataset.time;
}
});

rdvClose.addEventListener('click', closeRdv);

rdvNext.addEventListener('click', () => {
if (currentRdvStep < rdvSteps.length) {
// Validation des données
if (currentRdvStep === 4) {
    rdvData.name = document.getElementById('rdv-name').value;
    rdvData.email = document.getElementById('rdv-email').value;
    rdvData.phone = document.getElementById('rdv-phone').value;
    rdvData.company = document.getElementById('rdv-company').value;
    rdvData.message = document.getElementById('rdv-message').value;

    if (!rdvData.name || !rdvData.email || !rdvData.phone) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }
}

currentRdvStep++;
showRdvStep(currentRdvStep);
}
});

rdvPrev.addEventListener('click', () => {
if (currentRdvStep > 1) {
currentRdvStep--;
showRdvStep(currentRdvStep);
}
});

// Confirmation RDV
document.getElementById('confirm-rdv').addEventListener('click', () => {
alert('🎉 Rendez-vous confirmé ! Vous recevrez un email de confirmation sous peu.');
closeRdv();
});

// Boutons d'accès rapide aux nouvelles fonctionnalités
document.addEventListener('click', (e) => {
    if (e.target.textContent.includes('Demander un devis') && e.target.classList.contains(
        'suggestion-btn')) {
        toggleChatbot();
    }
});

// Animation d'entrée pour les nouveaux éléments
setTimeout(() => {
chatBadge.style.display = 'flex';
}, 3000);

// Fermer modals avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (rdvModal.classList.contains('active')) closeRdv();
        if (chatbotOpen) toggleChatbot();
    }
});

console.log('💬 Fonctionnalités Communication Client activées !');
