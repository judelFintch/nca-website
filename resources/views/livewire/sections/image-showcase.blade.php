<section id="galerie" class="section section-alt animate-on-scroll">
    <div class="container">
        <div class="section-header">
            <div class="section-badge">
                <i class="fas fa-camera-retro"></i>
                Galerie
            </div>
            <h2 class="section-title">Un aperçu de nos opérations</h2>
            <p class="section-subtitle">
                Des images de nos équipes, bureaux, entrepôts et opérations terrain qui illustrent notre présence partout en RDC.
            </p>
        </div>

        <div class="showcase-carousel">
            <button class="carousel-btn prev" type="button" aria-label="Image précédente">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="showcase-track" id="showcase-track">
                <figure class="showcase-item">
                    <img src="{{ asset('images/1.webp') }}" alt="Opérations terrain NCA" />
                </figure>
                <figure class="showcase-item">
                    <img src="{{ asset('images/2.webp') }}" alt="Équipe NCA" />
                </figure>
                <figure class="showcase-item">
                    <img src="{{ asset('images/3.webp') }}" alt="Logistique NCA" />
                </figure>
                <figure class="showcase-item">
                    <img src="{{ asset('images/4.webp') }}" alt="Activités NCA" />
                </figure>
                <figure class="showcase-item">
                    <img src="{{ asset('images/5Y2A2956.webp') }}" alt="Opérations NCA" />
                </figure>
                <figure class="showcase-item showcase-item--contain">
                    <img src="{{ asset('images/logo.jpeg') }}" alt="Logo NCA" />
                </figure>
            </div>
            <button class="carousel-btn next" type="button" aria-label="Image suivante">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</section>
