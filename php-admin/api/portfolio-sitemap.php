<?php
/**
 * 11:11 Decor — Dynamic Portfolio Projects XML Sitemap
 * Endpoint: GET /php-admin/api/portfolio-sitemap.php
 * Referenced by /php-admin/api/sitemap-index.php (master sitemap index)
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/xml; charset=utf-8');

$baseUrl = rtrim(defined('CORS_ORIGIN') && CORS_ORIGIN !== '*' ? CORS_ORIGIN : 'https://1111decor.com', '/');

// Check visibility toggle with test env override support
$visFile = get_data_dir() . '/page-visibility.json';
$portfolioVisible = true;
if (getenv('VISIBILITY_PORTFOLIO') !== false) {
    $portfolioVisible = getenv('VISIBILITY_PORTFOLIO') === '1';
} elseif (file_exists($visFile)) {
    $visData = json_decode(file_get_contents($visFile), true);
    if (isset($visData['portfolio'])) {
        $portfolioVisible = !empty($visData['portfolio']);
    }
}

try {
    $projects = $portfolioVisible ? PortfolioStore::all(true) : [];
} catch (Exception $e) {
    $projects = [];
}

$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($projects as $project) {
    $slug = htmlspecialchars(trim($project['slug'] ?? ''), ENT_XML1, 'UTF-8');
    if (empty($slug)) continue;

    $rawDate = $project['updated_at'] ?? $project['created_at'] ?? null;
    $lastmod = $rawDate ? date('Y-m-d', strtotime($rawDate)) : date('Y-m-d');

    $xml .= "  <url>\n";
    $xml .= "    <loc>{$baseUrl}/portfolio/{$slug}/</loc>\n";
    $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
    $xml .= "    <changefreq>monthly</changefreq>\n";
    $xml .= "    <priority>0.75</priority>\n";
    $xml .= "  </url>\n";
}

$xml .= '</urlset>';

echo $xml;
