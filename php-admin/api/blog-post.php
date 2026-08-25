<?php
/**
 * 11:11 Decor — Public Single Blog Post JSON API
 * Endpoint: GET /api/blog-post.php?slug=complete-wedding-decor-checklist
 */

if (file_exists(__DIR__ . '/../config.php')) {
    require_once __DIR__ . '/../config.php';
} else {
    define('CORS_ORIGIN', '*');
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'elevendecor_blog');
    define('DB_USER', 'root');
    define('DB_PASS', '');
}

header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    $stmt = $pdo->prepare("SELECT id, slug, title, category, category_name AS categoryName, excerpt, content, author, image, read_time AS readTime, related_service_slug AS relatedServiceSlug, related_service_name AS relatedServiceName, faqs_json, DATE_FORMAT(created_at, '%M %d, %Y') AS date FROM blog_posts WHERE slug = :slug AND published = 1 LIMIT 1");
    $stmt->execute([':slug' => $slug]);
    $post = $stmt->fetch();

    if (!$post) {
        http_response_code(404);
        echo json_encode(['error' => 'Post not found'], JSON_PRETTY_PRINT);
        exit;
    }

    if (!empty($post['faqs_json'])) {
        $post['faqs'] = json_decode($post['faqs_json'], true);
    } else {
        $post['faqs'] = [];
    }
    unset($post['faqs_json']);

    echo json_encode($post, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection error'], JSON_PRETTY_PRINT);
}
