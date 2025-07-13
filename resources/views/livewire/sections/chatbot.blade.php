        <div class="chatbot-container">
            <button class="chatbot-toggle" id="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-badge" id="chatbot-badge">!</span>
            </button>

            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">NCA</div>
                    <div class="chatbot-info">
                        <h4>Assistant NCA</h4>
                        <div class="chatbot-status">
                            <span class="status-dot"></span>
                            En ligne - Répond instantanément
                        </div>
                    </div>
                </div>

                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="chat-message bot">
                        <div class="message-avatar">NCA</div>
                        <div class="message-content">
                            👋 Bonjour ! Je suis l'assistant virtuel de New Custom Agency. Comment puis-je vous aider
                            aujourd'hui ?
                            <div class="chat-suggestions">
                                <button class="suggestion-btn" data-suggestion="devis">Demander un devis</button>
                                <button class="suggestion-btn" data-suggestion="tracking">Suivre un colis</button>
                                <button class="suggestion-btn" data-suggestion="services">Nos services</button>
                                <button class="suggestion-btn" data-suggestion="contact">Nous contacter</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="chatbot-input">
                    <input type="text" class="chat-input" id="chat-input"
                        placeholder="Tapez votre message...">
                    <button class="chat-send" id="chat-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
