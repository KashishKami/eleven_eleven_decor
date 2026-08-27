<?php
/**
 * 11:11 Decor — Dynamic Blog Posts XML Sitemap
 * Endpoint: GET /php-admin/api/blog-sitemap.php
 * Referenced by /php-admin/api/sitemap-index.php (the master sitemap index)
 *
 * This file generates a live XML sitemap for all published blog posts.
 * Every new blog post you publish will automatically appear here.
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/xml; charset=utf-8');
header('X-Robots-Tag: noindex'); // The sitemap itself shouldn't be indexed

// Derive the public base URL from CORS_ORIGIN (e.g. "https://elevenelevendecor.com")
$baseUrl = rtrim(defined('CORS_ORIGIN') && CORS_ORIGIN !== '*' ? CORS_ORIGIN : 'https://elevenelevendecor.com', '/');

// Check visibility toggle
$visFile = __DIR__ . '/../data/page-visibility.json';
$blogVisible = false;
if (file_exists($visFile)) {
    $visData = json_decode(file_get_contents($visFile), true);
    $blogVisible = !empty($visData['blog']);
}

try {
    $posts = $blogVisible ? BlogStore::all(true) : []; // only load if blog is toggled on
} catch (Exception $e) {
    $posts = [];
}

$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($posts as $post) {
    $slug = htmlspecialchars(trim($post['slug'] ?? ''), ENT_XML1, 'UTF-8');
    if (empty($slug)) continue;

    // Use post updated_at / created_at as lastmod, falling back to today
    $rawDate = $post['updated_at'] ?? $post['created_at'] ?? null;
    $lastmod  = $rawDate ? date('Y-m-d', strtotime($rawDate)) : date('Y-m-d');

    $xml .= "  <url>\n";
    $xml .= "    <loc>{$baseUrl}/blog/{$slug}/</loc>\n";
    $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
    $xml .= "    <changefreq>monthly</changefreq>\n";
    $xml .= "    <priority>0.75</priority>\n";
    $xml .= "  </url>\n";
}

$xml .= '</urlset>';

echo $xml;
