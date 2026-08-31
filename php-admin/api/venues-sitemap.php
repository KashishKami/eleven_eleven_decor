<?php
/**
 * 11:11 Decor — Dynamic Venues XML Sitemap
 * Endpoint: GET /php-admin/api/venues-sitemap.php
 * Referenced by /php-admin/api/sitemap-index.php (master sitemap index)
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/xml; charset=utf-8');
header('X-Robots-Tag: noindex');

$baseUrl = rtrim(defined('CORS_ORIGIN') && CORS_ORIGIN !== '*' ? CORS_ORIGIN : 'https://elevenelevendecor.com', '/');

// Check visibility toggle with test env override support
$visFile = __DIR__ . '/../data/page-visibility.json';
$venuesVisible = true;
if (getenv('VISIBILITY_VENUES') !== false) {
    $venuesVisible = getenv('VISIBILITY_VENUES') === '1';
} elseif (file_exists($visFile)) {
    $visData = json_decode(file_get_contents($visFile), true);
    if (isset($visData['venues'])) {
        $venuesVisible = !empty($visData['venues']);
    }
}

try {
    $venues = $venuesVisible ? VenueStore::all(true) : [];
} catch (Exception $e) {
    $venues = [];
}

$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($venues as $venue) {
    $slug = htmlspecialchars(trim($venue['slug'] ?? ''), ENT_XML1, 'UTF-8');
    if (empty($slug)) continue;

    $rawDate = $venue['updated_at'] ?? $venue['created_at'] ?? null;
    $lastmod = $rawDate ? date('Y-m-d', strtotime($rawDate)) : date('Y-m-d');

    $xml .= "  <url>\n";
    $xml .= "    <loc>{$baseUrl}/venues/{$slug}/</loc>\n";
    $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
    $xml .= "    <changefreq>monthly</changefreq>\n";
    $xml .= "    <priority>0.75</priority>\n";
    $xml .= "  </url>\n";
}

$xml .= '</urlset>';

echo $xml;
