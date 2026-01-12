<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\HomePage;

Route::get('/', HomePage::class);

// Locale switcher (session-based)
Route::get('/lang/{locale}', function ($locale) {
    $available = ['fr', 'en'];
    if (in_array($locale, $available)) {
        session(['locale' => $locale]);
        app()->setLocale($locale);
    }
    return redirect()->back();
});

// Simple sitemap (dynamically generated)
Route::get('/sitemap.xml', function () {
    $base = rtrim(config('app.url'), '/');
    $urls = [
        $base . '/',
    ];

    $xml = new \SimpleXMLElement('<urlset/>');
    $xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    foreach ($urls as $url) {
        $u = $xml->addChild('url');
        $u->addChild('loc', $url);
        $u->addChild('changefreq', 'weekly');
        $u->addChild('priority', '0.8');
    }

    return response($xml->asXML(), 200, ['Content-Type' => 'application/xml']);
});
