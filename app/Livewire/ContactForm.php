<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Contact;
use App\Mail\ContactReceived;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Http;

class ContactForm extends Component
{
    public $name;
    public $email;
    public $phone;
    public $service;
    public $message;
    public $website;
    public $turnstileToken;

    protected $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'phone' => 'nullable|string|max:50',
        'service' => 'nullable|string|max:100',
        'message' => 'required|string|max:5000',
        'website' => 'nullable|size:0',
    ];

    public function submit()
    {
        $rateKey = 'contact-form:'.sha1(request()->ip().'|'.strtolower((string) $this->email));
        if (RateLimiter::tooManyAttempts($rateKey, 5)) {
            $this->addError('rate_limit', 'Trop de tentatives. Merci de reessayer dans une minute.');
            return;
        }

        $this->validate();
        $captchaError = $this->verifyTurnstile();
        if ($captchaError) {
            $this->addError('captcha', $captchaError);
            return;
        }
        RateLimiter::hit($rateKey, 60);

        $contact = Contact::create([
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'service' => $this->service,
            'message' => $this->message,
            'ip' => request()->ip(),
        ]);

        // Send notification email to admin (if configured)
        try {
            Mail::to(config('mail.from.address'))->send(new ContactReceived($contact));
        } catch (\Throwable $e) {
            // Log silently; keep UX smooth
            logger()->error('Contact mail failed: '.$e->getMessage());
        }

        $this->reset(['name','email','phone','service','message','website','turnstileToken']);

        $this->dispatch('contact:submitted');
    }

    protected function verifyTurnstile(): ?string
    {
        $secret = config('services.turnstile.secret');
        if (!$secret) {
            return null;
        }

        if (!$this->turnstileToken) {
            return 'Verification anti-robot requise. Merci de reessayer.';
        }

        try {
            $response = Http::asForm()->post(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                [
                    'secret' => $secret,
                    'response' => $this->turnstileToken,
                    'remoteip' => request()->ip(),
                ]
            );
        } catch (\Throwable $e) {
            logger()->warning('Turnstile verification failed: '.$e->getMessage());
            return 'Service de verification indisponible. Merci de reessayer plus tard.';
        }

        return data_get($response->json(), 'success', false)
            ? null
            : 'Verification anti-robot invalide. Merci de reessayer.';
    }

    public function render()
    {
        return view('livewire.contact-form');
    }
}
