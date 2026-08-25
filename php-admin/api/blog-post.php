<?php
/**
 * 11:11 Decor — Public Single Blog Post JSON API
 * Endpoint: GET /api/blog-post.php?slug=complete-wedding-decor-checklist
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

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if (empty($slug)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing slug parameter'], JSON_PRETTY_PRINT);
    exit;
}

try {
    $post = BlogStore::findBySlug($slug);

    if (!$post) {
        http_response_code(404);
        echo json_encode(['error' => 'Post not found'], JSON_PRETTY_PRINT);
        exit;
    }

    $response = [
        'id' => (string)$post['id'],
        'slug' => $post['slug'],
        'title' => $post['title'],
        'category' => $post['category'],
        'categoryName' => $post['category_name'] ?? $post['category'],
        'excerpt' => $post['excerpt'] ?? '',
        'content' => $post['content'] ?? '',
        'author' => $post['author'] ?? '1111 Decor Team',
        'image' => $post['image'] ?? '',
        'readTime' => $post['read_time'] ?? '5 min read',
        'date' => !empty($post['created_at']) ? date('F d, Y', strtotime($post['created_at'])) : date('F d, Y'),
        'relatedServiceSlug' => $post['related_service_slug'] ?? '',
        'relatedServiceName' => $post['related_service_name'] ?? '',
        'faqs' => $post['faqs'] ?? [],
    ];

    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load post'], JSON_PRETTY_PRINT);
}
