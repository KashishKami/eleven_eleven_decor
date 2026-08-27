<?php
/**
 * 11:11 Decor — Public Venues JSON API
 * Endpoint: GET /api/venues.php or GET /api/venues.php?slug=xxx or GET /api/venues.php?spaceType=Outdoor
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
    if (isset($_GET['slug']) && !empty(trim($_GET['slug']))) {
        $slug = trim($_GET['slug']);
        $venue = VenueStore::findBySlug($slug);
        if (!$venue || empty($venue['published'])) {
            http_response_code(404);
            echo json_encode(['error' => 'Venue not found'], JSON_PRETTY_PRINT);
            exit;
        }
        echo json_encode($venue, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    $spaceType = isset($_GET['spaceType']) ? trim($_GET['spaceType']) : null;
    $venues = VenueStore::all(true, $spaceType);

    echo json_encode($venues, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load venues directory'], JSON_PRETTY_PRINT);
}
