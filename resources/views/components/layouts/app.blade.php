<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'New Custom Agency — Import, export & douane en RDC' }}</title>

    {{-- Basic SEO / Social --}}
    <meta name="description" content="{{ $description ?? 'Transit Douane et Fret de la RDC — New Custom Agency. Dédouanement, transport, logistique et déclaration carburant.' }}">
    <meta property="og:title" content="{{ $title ?? 'New Custom Agency' }}">
    <meta property="og:description" content="{{ $description ?? 'Transit Douane et Fret de la RDC — New Custom Agency.' }}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <meta name="twitter:card" content="summary_large_image">

    {{-- Alternate languages --}}
    <link rel="alternate" href="{{ url('/') }}" hreflang="fr" />
    <link rel="alternate" href="{{ url('/') }}" hreflang="en" />

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/css/redesign.css', 'resources/js/app.js', 'resources/js/home-page.js'])
    @livewireStyles
</head>
<body class="antialiased">
    {{ $slot }}

    @livewireScripts
</body>
</html>
