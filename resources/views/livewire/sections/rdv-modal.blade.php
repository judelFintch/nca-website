        <div class="rdv-modal" id="rdv-modal">
            <div class="rdv-content">
                <div class="rdv-header">
                    <button class="rdv-close" id="rdv-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <h2><i class="fas fa-calendar-plus"></i> Prendre Rendez-vous</h2>
                    <p>Planifiez une consultation avec nos experts</p>
                </div>

                <div class="rdv-body">
                    <!-- Étape 1: Type de RDV -->
                    <div class="rdv-step active" id="rdv-step-1">
                        <h3><i class="fas fa-user-tie"></i> 1. Type de consultation</h3>
                        <div class="calc-options">
                            <div class="calc-option" data-rdv-type="douane">
                                <div class="calc-option-icon"><i class="fas fa-gavel"></i></div>
                                <div class="calc-option-title">Conseil Douanier</div>
                                <div class="calc-option-desc">Réglementation et procédures</div>
                            </div>
                            <div class="calc-option" data-rdv-type="logistique">
                                <div class="calc-option-icon"><i class="fas fa-route"></i></div>
                                <div class="calc-option-title">Solution Logistique</div>
                                <div class="calc-option-desc">Optimisation de vos flux</div>
                            </div>
                            <div class="calc-option" data-rdv-type="commercial">
                                <div class="calc-option-icon"><i class="fas fa-handshake"></i></div>
                                <div class="calc-option-title">Entretien Commercial</div>
                                <div class="calc-option-desc">Partenariat et tarifs</div>
                            </div>
                            <div class="calc-option" data-rdv-type="technique">
                                <div class="calc-option-icon"><i class="fas fa-cogs"></i></div>
                                <div class="calc-option-title">Support Technique</div>
                                <div class="calc-option-desc">Assistance spécialisée</div>
                            </div>
                        </div>
                    </div>

                    <!-- Étape 2: Date -->
                    <div class="rdv-step" id="rdv-step-2">
                        <h3><i class="fas fa-calendar"></i> 2. Choisissez une date</h3>
                        <div class="calendar-grid" id="calendar-grid">
                            <!-- Les dates seront générées par JavaScript -->
                        </div>
                    </div>

                    <!-- Étape 3: Heure -->
                    <div class="rdv-step" id="rdv-step-3">
                        <h3><i class="fas fa-clock"></i> 3. Créneaux disponibles</h3>
                        <div class="time-slots" id="time-slots">
                            <div class="time-slot" data-time="09:00">09:00</div>
                            <div class="time-slot" data-time="10:00">10:00</div>
                            <div class="time-slot" data-time="11:00">11:00</div>
                            <div class="time-slot" data-time="14:00">14:00</div>
                            <div class="time-slot" data-time="15:00">15:00</div>
                            <div class="time-slot" data-time="16:00">16:00</div>
                        </div>
                    </div>

                    <!-- Étape 4: Informations -->
                    <div class="rdv-step" id="rdv-step-4">
                        <h3><i class="fas fa-user"></i> 4. Vos informations</h3>
                        <div class="form-grid">
                            <input type="text" class="form-input" id="rdv-name" placeholder="Nom complet *"
                                required>
                            <input type="email" class="form-input" id="rdv-email" placeholder="Email *"
                                required>
                        </div>
                        <div class="form-grid">
                            <input type="tel" class="form-input" id="rdv-phone" placeholder="Téléphone *"
                                required>
                            <input type="text" class="form-input" id="rdv-company" placeholder="Entreprise">
                        </div>
                        <textarea class="form-input form-textarea" id="rdv-message"
                            placeholder="Précisez l'objet de votre consultation..."></textarea>
                    </div>

                    <!-- Étape 5: Confirmation -->
                    <div class="rdv-step" id="rdv-step-5">
                        <h3><i class="fas fa-check-circle"></i> 5. Récapitulatif</h3>
                        <div class="rdv-summary" id="rdv-summary">
                            <!-- Le récapitulatif sera généré par JavaScript -->
                        </div>
                        <button class="btn btn-primary" id="confirm-rdv" style="width: 100%;">
                            <i class="fas fa-calendar-check"></i>
                            Confirmer le rendez-vous
                        </button>
                    </div>

                    <div class="calc-nav">
                        <button class="btn btn-outline" id="rdv-prev" style="display: none;">
                            <i class="fas fa-arrow-left"></i>
                            Précédent
                        </button>
                        <button class="btn btn-primary" id="rdv-next">
                            Suivant
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
