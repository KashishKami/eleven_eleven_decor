<?php
/**
 * 11:11 Decor — Page Visibility API
 * Endpoint: GET /api/page-visibility.php (read)
 *           POST /api/page-visibility.php (update - requires admin session)
 */

require_once __DIR__ . '/../config.php';

header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/page-visibility.json';

function getVisibilityConfig($file) {
    if (!file_exists($file)) {
        $default = [
            'blog' => false,
            'gallery' => false,
            'portfolio' => false,
            'venues' => false
        ];
        file_put_contents($file, json_encode($default, JSON_PRETTY_PRINT));
        return $default;
    }
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        return [
            'blog' => false,
            'gallery' => false,
            'portfolio' => false,
            'venues' => false
        ];
    }
    return [
        'blog' => !empty($data['blog']),
        'gallery' => !empty($data['gallery']),
        'portfolio' => !empty($data['portfolio']),
        'venues' => !empty($data['venues']),
    ];
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $visibility = getVisibilityConfig($dataFile);
    echo json_encode($visibility, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($method === 'POST') {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized. Admin login required.'], JSON_PRETTY_PRINT);
        exit;
    }

    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    if (!$payload || !isset($payload['section'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request payload. Missing section parameter.'], JSON_PRETTY_PRINT);
        exit;
    }

    $allowedSections = ['blog', 'gallery', 'portfolio', 'venues'];
    $section = trim($payload['section']);

    if (!in_array($section, $allowedSections, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid section. Allowed: blog, gallery, portfolio, venues.'], JSON_PRETTY_PRINT);
        exit;
    }

    $published = !empty($payload['published']);

    $current = getVisibilityConfig($dataFile);
    $current[$section] = $published;

    $written = file_put_contents($dataFile, json_encode($current, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

    if ($written === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save visibility configuration to disk.'], JSON_PRETTY_PRINT);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Visibility updated successfully.',
        'visibility' => $current
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed.'], JSON_PRETTY_PRINT);
