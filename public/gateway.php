<?php
/**
 * 11:11 Decor — Server Gateway & Real-Time Visibility Gatekeeper
 * Runs on GoDaddy Apache shared hosting.
 * Handles real-time 404 response codes for toggled OFF sections,
 * and routes dynamic new slugs (blogs, portfolio, venues) without requiring rebuilds.
 */

$rootDir = __DIR__;
$phpAdminDir = __DIR__ . '/php-admin';

// Load config and store classes if available
if (file_exists($phpAdminDir . '/config.php')) {
    require_once $phpAdminDir . '/config.php';
}

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$uri = trim($uri, '/');
$parts = array_values(array_filter(explode('/', $uri)));

$section = $parts[0] ?? '';
$slug = !empty($parts) ? end($parts) : '';

$managedSections = ['blog', 'gallery', 'portfolio', 'venues'];

// 1. Real-Time Visibility Gatekeeper
if (in_array($section, $managedSections, true)) {
    $visFile = $phpAdminDir . '/data/page-visibility.json';
    if (file_exists($visFile)) {
        $visData = json_decode(file_get_contents($visFile), true);
        if (is_array($visData) && isset($visData[$section]) && empty($visData[$section])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) {
                include $rootDir . '/404.html';
            } else {
                echo "<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 — Section Disabled</h1></body></html>";
            }
            exit;
        }
    }
}

// 2. Direct Static File Serving
$cleanPath = $rootDir . '/' . $uri;
if (!empty($uri) && is_file($cleanPath)) {
    return false;
}
if (!empty($uri) && is_file($cleanPath . '/index.html')) {
    include $cleanPath . '/index.html';
    exit;
}
if (!empty($uri) && is_file($cleanPath . '.html')) {
    include $cleanPath . '.html';
    exit;
}

// 3. Dynamic Slugs Lookup & Fallback
if ($section === 'portfolio' && !empty($slug) && $slug !== 'portfolio') {
    if (class_exists('PortfolioStore')) {
        $item = PortfolioStore::findBySlug($slug);
        if (!$item || empty($item['published'])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) include $rootDir . '/404.html';
            exit;
        }
    }
    $files = glob($rootDir . '/portfolio/*/index.html');
    if (!empty($files) && file_exists($files[0])) {
        include $files[0];
        exit;
    }
    if (file_exists($rootDir . '/portfolio/index.html')) {
        include $rootDir . '/portfolio/index.html';
        exit;
    }
}

if ($section === 'venues' && !empty($slug) && $slug !== 'venues') {
    if (class_exists('VenueStore')) {
        $item = VenueStore::findBySlug($slug);
        if (!$item || empty($item['published'])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) include $rootDir . '/404.html';
            exit;
        }
    }
    $files = glob($rootDir . '/venues/*/index.html');
    if (!empty($files) && file_exists($files[0])) {
        include $files[0];
        exit;
    }
    if (file_exists($rootDir . '/venues/index.html')) {
        include $rootDir . '/venues/index.html';
        exit;
    }
}

if ($section === 'blog' && !empty($slug) && $slug !== 'blog') {
    if (class_exists('BlogStore')) {
        $item = BlogStore::findBySlug($slug);
        if (!$item || empty($item['published'])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) include $rootDir . '/404.html';
            exit;
        }
    }
    if (count($parts) >= 3) {
        $files = glob($rootDir . '/blog/*/*/index.html');
        if (!empty($files) && file_exists($files[0])) {
            include $files[0];
            exit;
        }
    }
    $catFiles = glob($rootDir . '/blog/*/index.html');
    if (!empty($catFiles) && file_exists($catFiles[0])) {
        include $catFiles[0];
        exit;
    }
    if (file_exists($rootDir . '/blog/index.html')) {
        include $rootDir . '/blog/index.html';
        exit;
    }
}

// 4. Default 404
http_response_code(404);
if (file_exists($rootDir . '/404.html')) {
    include $rootDir . '/404.html';
} else {
    echo "<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 — Page Not Found</h1></body></html>";
}
exit;
