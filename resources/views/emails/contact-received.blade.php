<div style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: #111827;">
    <h2>Nouvelle demande de contact</h2>

    <p><strong>Nom:</strong> {{ $contact->name }}</p>
    <p><strong>Email:</strong> {{ $contact->email }}</p>
    <p><strong>Téléphone:</strong> {{ $contact->phone ?? 'N/A' }}</p>
    <p><strong>Service:</strong> {{ $contact->service ?? 'N/A' }}</p>
    <p><strong>Message:</strong></p>
    <p>{{ $contact->message }}</p>

    <p style="color: #6b7280; font-size: 0.9rem;">IP: {{ $contact->ip }} — Envoyé le {{ $contact->created_at }}</p>
</div>
