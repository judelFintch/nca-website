<div>
    <form wire:submit.prevent="submit" class="contact-form-grid">
        <div style="position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden;" aria-hidden="true">
            <label for="website">Website</label>
            <input id="website" wire:model.defer="website" type="text" tabindex="-1" autocomplete="off">
        </div>
        <div class="form-row">
            <div>
                <label for="name">Nom complet *</label>
                <input id="name" wire:model.defer="name" type="text" required placeholder="Votre nom complet">
                @error('name') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="email">Email *</label>
                <input id="email" wire:model.defer="email" type="email" required placeholder="votre@email.com">
                @error('email') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div class="form-row">
            <div>
                <label for="phone">Téléphone</label>
                <input id="phone" wire:model.defer="phone" type="tel" placeholder="+243 XX XXX XX XX">
                @error('phone') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="service">Service requis *</label>
                <select id="service" wire:model.defer="service">
                    <option value="">Sélectionnez un service</option>
                    <option value="douane">Dédouanement</option>
                    <option value="transport">Transport Multimodal</option>
                    <option value="entreposage">Entreposage</option>
                    <option value="hydrocarbures">Gestion Hydrocarbures</option>
                    <option value="conseil">Conseil Logistique</option>
                    <option value="autre">Autre (préciser)</option>
                </select>
                @error('service') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div>
            <label for="message">Décrivez votre projet *</label>
            <textarea id="message" wire:model.defer="message" required rows="5" placeholder="Décrivez vos besoins logistiques, volumes, destinations, délais..."></textarea>
            @error('message') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <button type="submit" class="btn btn-primary w-full" wire:loading.attr="disabled">
                <i class="fas fa-paper-plane"></i>
                <span wire:loading.remove>Envoyer ma demande</span>
                <span wire:loading>Envoi...</span>
            </button>
        </div>

        @if (config('services.turnstile.sitekey'))
            <div wire:ignore>
                <div class="cf-turnstile" data-sitekey="{{ config('services.turnstile.sitekey') }}" data-callback="turnstileCallback" data-expired-callback="turnstileExpired"></div>
            </div>
        @endif

        @error('captcha') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror

        @error('rate_limit') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
        <p class="form-note">Réponse garantie sous 24h • Devis gratuit et sans engagement</p>
    </form>

    <script>
        window.turnstileCallback = function (token) {
            @this.set('turnstileToken', token);
        };

        window.turnstileExpired = function () {
            @this.set('turnstileToken', null);
        };

        window.addEventListener('contact:submitted', () => {
            alert('Merci pour votre demande ! Notre équipe vous contactera dans les plus brefs délais.');
        });
    </script>

    @if (config('services.turnstile.sitekey'))
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    @endif
</div>
