<!-- Navigation -->
<nav id="navbar" class="nav-bar nav-polished">
  <div class="container nav-inner">
    <a href="#accueil" class="brand">
      <div class="brand-mark">
        <img src="{{ asset('images/logo.jpeg') }}" alt="NCA" />
      </div>
      <div class="brand-text">
        <span class="brand-name">New Custom Agency</span>
        <span class="brand-tagline">Transit Douane & Fret RDC</span>
      </div>
    </a>

    <div class="nav-center">
      <ul class="nav-links nav-links-pill">
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#vision">Vision</a></li>
        <li><a href="#services">Services</a></li>
        <li class="nav-dropdown">
          <button class="nav-dropdown-toggle" type="button" aria-haspopup="true">
            Plus
            <i class="fas fa-chevron-down"></i>
          </button>
          <ul class="nav-dropdown-menu">
            <li><a href="#carburant">Déclaration Carburant</a></li>
            <li><a href="#apropos">Partenaires</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="nav-actions">
      <a href="tel:+24384454797" class="nav-phone">
        <i class="fas fa-phone"></i>
        +243 84 45 47 797
      </a>
      <a href="https://wa.me/24384454797" class="btn btn-whatsapp">
        <i class="fab fa-whatsapp"></i>
        WhatsApp
      </a>
      <a href="#contact" class="btn btn-primary">Demander un devis</a>
      <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Ouvrir le menu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>

  <div id="mobile-menu" class="mobile-menu">
    <ul>
      <li><a href="#accueil">Accueil</a></li>
      <li><a href="#vision">Vision</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#carburant">Déclaration Carburant</a></li>
      <li><a href="#apropos">Partenaires</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="https://wa.me/24384454797" class="btn btn-whatsapp mobile-cta">WhatsApp</a></li>
      <li><a href="#contact" class="btn btn-primary mobile-cta">Demander un devis</a></li>
    </ul>
  </div>
</nav>
