<?php

namespace Tests\Feature;

use App\Livewire\ContactForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Livewire\Livewire;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_submits_without_turnstile_secret(): void
    {
        Mail::fake();

        Livewire::test(ContactForm::class)
            ->set('name', 'Alice Example')
            ->set('email', 'alice@example.com')
            ->set('message', 'Besoin de transport urgent.')
            ->call('submit')
            ->assertHasNoErrors();

        $this->assertDatabaseHas('contacts', [
            'email' => 'alice@example.com',
        ]);
    }

    public function test_contact_form_rejects_honeypot(): void
    {
        Mail::fake();

        Livewire::test(ContactForm::class)
            ->set('name', 'Bot Example')
            ->set('email', 'bot@example.com')
            ->set('message', 'Spam')
            ->set('website', 'https://spam.test')
            ->call('submit')
            ->assertHasErrors(['website']);
    }

    public function test_contact_form_requires_turnstile_when_configured(): void
    {
        Mail::fake();
        config()->set('services.turnstile.secret', 'test-secret');

        Livewire::test(ContactForm::class)
            ->set('name', 'Bob Example')
            ->set('email', 'bob@example.com')
            ->set('message', 'Besoin de conseil logistique.')
            ->call('submit')
            ->assertHasErrors(['captcha']);
    }

    public function test_contact_form_accepts_valid_turnstile(): void
    {
        Mail::fake();
        Http::fake([
            'https://challenges.cloudflare.com/turnstile/v0/siteverify' => Http::response([
                'success' => true,
            ], 200),
        ]);
        config()->set('services.turnstile.secret', 'test-secret');

        Livewire::test(ContactForm::class)
            ->set('name', 'Claire Example')
            ->set('email', 'claire@example.com')
            ->set('message', 'Demande de devis.')
            ->set('turnstileToken', 'token')
            ->call('submit')
            ->assertHasNoErrors(['captcha']);

        $this->assertDatabaseHas('contacts', [
            'email' => 'claire@example.com',
        ]);
    }
}
