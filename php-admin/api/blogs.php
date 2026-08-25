<?php
/**
 * 11:11 Decor — Public Blog Posts JSON API
 * Endpoint: GET /api/blogs.php or GET /api/blogs.php?category=wedding-planning
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

    $category = isset($_GET['category']) ? trim($_GET['category']) : '';
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    if ($limit <= 0) $limit = 100;

    if (!empty($category)) {
        $stmt = $pdo->prepare("SELECT id, slug, title, category, category_name AS categoryName, excerpt, author, image, read_time AS readTime, DATE_FORMAT(created_at, '%M %d, %Y') AS date FROM blog_posts WHERE published = 1 AND (category = :cat OR category_name = :catName) ORDER BY created_at DESC LIMIT :lim");
        $stmt->bindValue(':cat', $category, PDO::PARAM_STR);
        $stmt->bindValue(':catName', str_replace('-', ' ', $category), PDO::PARAM_STR);
        $stmt->bindValue(':lim', $limit, PDO::PARAM_INT);
        $stmt->execute();
    } else {
        $stmt = $pdo->prepare("SELECT id, slug, title, category, category_name AS categoryName, excerpt, author, image, read_time AS readTime, DATE_FORMAT(created_at, '%M %d, %Y') AS date FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT :lim");
        $stmt->bindValue(':lim', $limit, PDO::PARAM_INT);
        $stmt->execute();
    }

    $posts = $stmt->fetchAll();
    echo json_encode($posts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed'], JSON_PRETTY_PRINT);
}
