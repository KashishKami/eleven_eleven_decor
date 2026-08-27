<?php
/**
 * 11:11 Decor — Public Portfolio JSON API
 * Endpoint: GET /api/portfolio.php or GET /api/portfolio.php?slug=xxx or GET /api/portfolio.php?category=Weddings
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
        $project = PortfolioStore::findBySlug($slug);
        if (!$project || empty($project['published'])) {
            http_response_code(404);
            echo json_encode(['error' => 'Project not found'], JSON_PRETTY_PRINT);
            exit;
        }
        echo json_encode($project, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    $category = isset($_GET['category']) ? trim($_GET['category']) : null;
    $projects = PortfolioStore::all(true, $category);

    echo json_encode($projects, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load portfolio projects'], JSON_PRETTY_PRINT);
}
