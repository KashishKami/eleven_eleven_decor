<?php
/**
 * Test gateway freshness and SEO injection.
 */
$rootDir = dirname(__DIR__, 2);
$testDataDir = getenv('TEST_DATA_DIR') ?: __DIR__ . '/../fixtures/data';

require_once $rootDir . '/php-admin/config.php';

// Create or update a test post
$slug = 'freshness-test-post';
$post = BlogStore::save([
    'title' => 'Fresh Live Title That Was Just Updated In Admin',
    'meta_title' => 'Fresh Live SERP Meta Title | 11:11 Decor',
    'slug' => $slug,
    'category' => 'weddings',
    'category_name' => 'Weddings',
    'excerpt' => 'Fresh excerpt summary.',
    'meta_description' => 'Fresh meta description strictly 120-160 chars for SEO snippet testing.',
    'content' => '<p>Article body</p><details class="faq-item"><summary>Can you customize mandaps?</summary><div class="faq-answer">Yes custom designs available.</div></details>',
    'published' => 1,
]);

// Emulate gateway environment
$_SERVER['REQUEST_URI'] = '/blog/weddings/' . $slug . '/';
$_SERVER['REQUEST_METHOD'] = 'GET';

ob_start();
// Run gateway logic
$uri = 'blog/weddings/' . $slug . '/';
$uri = trim($uri, '/');
$parts = explode('/', $uri);
$section = $parts[0] ?? '';
$slug = end($parts);

$item = BlogStore::findBySlug($slug);
$baseUrl = 'https://1111decor.com';
$metaTitle = !empty($item['meta_title']) ? $item['meta_title'] : (($item['title'] ?? $slug) . ' | 11:11 Decor');
$metaDesc = !empty($item['meta_description']) ? $item['meta_description'] : ($item['excerpt'] ?? '');
$faqs = $item['faqs'] ?? [];

echo json_encode([
    'slug' => $slug,
    'metaTitle' => $metaTitle,
    'metaDesc' => $metaDesc,
    'faqs' => $faqs,
    'has_faq_schema' => count($faqs) > 0,
]);
