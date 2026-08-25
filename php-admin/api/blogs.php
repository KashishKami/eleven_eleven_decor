<?php
/**
 * 11:11 Decor — Public Blog Posts JSON API
 * Endpoint: GET /api/blogs.php or GET /api/blogs.php?category=wedding-planning
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
    $category = isset($_GET['category']) ? trim($_GET['category']) : null;
    $posts = BlogStore::all(true, $category);

    $formatted = array_map(function($p) {
        return [
            'id' => (string)$p['id'],
            'slug' => $p['slug'],
            'title' => $p['title'],
            'category' => $p['category'],
            'categoryName' => $p['category_name'] ?? $p['category'],
            'excerpt' => $p['excerpt'] ?? '',
            'author' => $p['author'] ?? '1111 Decor Team',
            'image' => $p['image'] ?? '',
            'readTime' => $p['read_time'] ?? '5 min read',
            'date' => !empty($p['created_at']) ? date('F d, Y', strtotime($p['created_at'])) : date('F d, Y'),
        ];
    }, $posts);

    echo json_encode($formatted, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load posts'], JSON_PRETTY_PRINT);
}
