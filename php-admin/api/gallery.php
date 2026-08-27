<?php
/**
 * 11:11 Decor — Public Gallery JSON API
 * Endpoint: GET /api/gallery.php or GET /api/gallery.php?category=Weddings
 */

require_once __DIR__ . '/../config.php';

header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $category = isset($_GET['category']) && trim($_GET['category']) !== 'All' ? trim($_GET['category']) : null;
    $items = GalleryStore::all(true, $category);

    // If data store is empty, provide initial seed items
    if (empty($items) && $category === null) {
        $seedItems = [
            [
                'id' => 'gal-1',
                'src' => 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
                'title' => 'Royal Mandap Orchid Canopy',
                'category' => 'Weddings',
                'aspectRatio' => 'landscape',
                'published' => 1
            ],
            [
                'id' => 'gal-2',
                'src' => 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
                'title' => 'Botanical Glasshouse Reception Table',
                'category' => 'Décor',
                'aspectRatio' => 'portrait',
                'published' => 1
            ],
            [
                'id' => 'gal-3',
                'src' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
                'title' => 'Executive Keynote Curved LED Stage',
                'category' => 'Stage Designs',
                'aspectRatio' => 'landscape',
                'published' => 1
            ],
            [
                'id' => 'gal-4',
                'src' => 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
                'title' => '50th Jubilee Marquee & Edison Canopy',
                'category' => 'Birthdays',
                'aspectRatio' => 'square',
                'published' => 1
            ]
        ];
        foreach ($seedItems as $s) {
            GalleryStore::save($s);
        }
        $items = GalleryStore::all(true, $category);
    }

    echo json_encode($items, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load gallery items'], JSON_PRETTY_PRINT);
}
