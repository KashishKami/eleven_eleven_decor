<?php
/**
 * 11:11 Decor — Master Sitemap Index
 * Endpoint: GET /php-admin/api/sitemap-index.php
 *
 * This is the ONE URL you submit to Google Search Console.
 * It acts as a master index pointing to both:
 *   1. The static Next.js sitemap (all pages — services, events, venues, etc.)
 *   2. The dynamic PHP blog sitemap (all published blog posts — updates automatically)
 *
 * Submit this URL to Google Search Console:
 * https://YOUR-DOMAIN.com/php-admin/api/sitemap-index.php
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/xml; charset=utf-8');

// Derive base URL from CORS_ORIGIN defined in config.php
$baseUrl = rtrim(defined('CORS_ORIGIN') && CORS_ORIGIN !== '*' ? CORS_ORIGIN : 'https://elevenelevendecor.com', '/');

$today = date('Y-m-d');

$xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// 1. Static Next.js sitemap (pages, services, events, portfolio, venues, blog categories)
$xml .= "  <sitemap>\n";
$xml .= "    <loc>{$baseUrl}/sitemap.xml</loc>\n";
$xml .= "    <lastmod>{$today}</lastmod>\n";
$xml .= "  </sitemap>\n";

// 2. Dynamic blog posts sitemap (updates automatically when new posts are published)
$xml .= "  <sitemap>\n";
$xml .= "    <loc>{$baseUrl}/php-admin/api/blog-sitemap.php</loc>\n";
$xml .= "    <lastmod>{$today}</lastmod>\n";
$xml .= "  </sitemap>\n";

// 3. Dynamic portfolio projects sitemap (updates automatically when new projects are published)
$xml .= "  <sitemap>\n";
$xml .= "    <loc>{$baseUrl}/php-admin/api/portfolio-sitemap.php</loc>\n";
$xml .= "    <lastmod>{$today}</lastmod>\n";
$xml .= "  </sitemap>\n";

// 4. Dynamic venues sitemap (updates automatically when new venues are published)
$xml .= "  <sitemap>\n";
$xml .= "    <loc>{$baseUrl}/php-admin/api/venues-sitemap.php</loc>\n";
$xml .= "    <lastmod>{$today}</lastmod>\n";
$xml .= "  </sitemap>\n";

$xml .= '</sitemapindex>';

echo $xml;
