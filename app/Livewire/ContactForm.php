<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Contact;
use App\Mail\ContactReceived;
use Illuminate\Support\Facades\Mail;

class ContactForm extends Component
{
    public $name;
    public $email;
    public $phone;
    public $service;
    public $message;

    protected $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'phone' => 'nullable|string|max:50',
        'service' => 'nullable|string|max:100',
        'message' => 'required|string|max:5000',
    ];

    public function submit()
    {
        $this->validate();

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

        $this->reset(['name','email','phone','service','message']);

        $this->dispatchBrowserEvent('contact:submitted');
    }

    public function render()
    {
        return view('livewire.contact-form');
    }
}
