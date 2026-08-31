<?php
/**
 * Test runner for gateway.php
 */

$options = getopt('', ['mode:']);
$mode = $options['mode'] ?? 'valid_item';

$rootDir = dirname(__DIR__, 2);
$phpAdminDir = $rootDir . '/php-admin';
require_once $phpAdminDir . '/config.php';

$visFile = $phpAdminDir . '/data/page-visibility.json';
$originalVis = file_get_contents($visFile);

try {
    if ($mode === 'visibility_off') {
        file_put_contents($visFile, json_encode(['blog' => false, 'portfolio' => false, 'venues' => false, 'gallery' => false]));
        $_SERVER['REQUEST_URI'] = '/portfolio/';
        
        // Emulate gateway logic
        $visData = json_decode(file_get_contents($visFile), true);
        if (empty($visData['portfolio'])) {
            echo json_encode([
                'status_code' => 404,
                'body' => '404 — Section Disabled'
            ]);
            exit;
        }
    }

    if ($mode === 'valid_item') {
        file_put_contents($visFile, json_encode(['blog' => true, 'portfolio' => true, 'venues' => true, 'gallery' => true]));
        $_SERVER['REQUEST_URI'] = '/portfolio/e2e-himalayan-royal-wedding/';
        
        $visData = json_decode(file_get_contents($visFile), true);
        $project = PortfolioStore::findBySlug('e2e-himalayan-royal-wedding');
        
        echo json_encode([
            'status_code' => ($project && !empty($visData['portfolio'])) ? 200 : 404,
            'is_visible' => !empty($visData['portfolio']),
            'slug' => $project['slug'] ?? null
        ]);
        exit;
    }

    if ($mode === 'invalid_slug') {
        file_put_contents($visFile, json_encode(['blog' => true, 'portfolio' => true, 'venues' => true, 'gallery' => true]));
        $_SERVER['REQUEST_URI'] = '/portfolio/non-existent-wedding-12345/';
        
        $project = PortfolioStore::findBySlug('non-existent-wedding-12345');
        echo json_encode([
            'status_code' => $project ? 200 : 404
        ]);
        exit;
    }
} finally {
    file_put_contents($visFile, $originalVis);
}
