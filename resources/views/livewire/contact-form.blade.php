<div>
    <form wire:submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Nom complet *</label>
                <input id="name" wire:model.defer="name" type="text" required class="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-nca-500" placeholder="Votre nom complet">
                @error('name') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email *</label>
                <input id="email" wire:model.defer="email" type="email" required class="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-nca-500" placeholder="votre@email.com">
                @error('email') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Téléphone</label>
                <input id="phone" wire:model.defer="phone" type="tel" class="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-nca-500" placeholder="+243 XX XXX XX XX">
                @error('phone') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="service" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Service requis *</label>
                <select id="service" wire:model.defer="service" class="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-nca-500">
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
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Décrivez votre projet *</label>
            <textarea id="message" wire:model.defer="message" required rows="5" class="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-nca-500" placeholder="Décrivez en détail vos besoins logistiques, volumes, destinations, délais..."></textarea>
            @error('message') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <button type="submit" class="btn btn-primary w-full" wire:loading.attr="disabled">
                <i class="fas fa-paper-plane"></i>
                <span wire:loading.remove>Envoyer ma demande</span>
                <span wire:loading>Envoi...</span>
            </button>
        </div>

        <p class="text-center text-sm text-gray-500">Réponse garantie sous 24h • Devis gratuit et sans engagement</p>
    </form>

    <script>
        window.addEventListener('contact:submitted', () => {
            alert('Merci pour votre demande ! Notre équipe vous contactera dans les plus brefs délais.');
        });
    </script>
</div>
