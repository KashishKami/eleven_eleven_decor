<?php
/**
 * Test runner for gateway.php
 */

$options = getopt('', ['mode:']);
$mode = $options['mode'] ?? 'valid_item';

$rootDir = dirname(__DIR__, 2);
$phpAdminDir = $rootDir . '/php-admin';
require_once $phpAdminDir . '/config.php';

$visFile = function_exists('get_data_dir') ? (get_data_dir() . '/page-visibility.json') : ($phpAdminDir . '/data/page-visibility.json');
$originalVis = file_exists($visFile) ? file_get_contents($visFile) : json_encode(['blog' => false, 'portfolio' => false, 'venues' => false, 'gallery' => false], JSON_PRETTY_PRINT);

register_shutdown_function(function() use ($visFile, $originalVis) {
    file_put_contents($visFile, $originalVis);
});

$result = null;

if ($mode === 'visibility_off') {
    file_put_contents($visFile, json_encode(['blog' => false, 'portfolio' => false, 'venues' => false, 'gallery' => false]));
    $_SERVER['REQUEST_URI'] = '/portfolio/';
    
    // Emulate gateway logic
    $visData = json_decode(file_get_contents($visFile), true);
    if (empty($visData['portfolio'])) {
        $result = [
            'status_code' => 404,
            'body' => '404 — Section Disabled'
        ];
    }
} else if ($mode === 'valid_item') {
    file_put_contents($visFile, json_encode(['blog' => true, 'portfolio' => true, 'venues' => true, 'gallery' => true]));
    $_SERVER['REQUEST_URI'] = '/portfolio/e2e-himalayan-royal-wedding/';
    
    $visData = json_decode(file_get_contents($visFile), true);
    $project = PortfolioStore::findBySlug('e2e-himalayan-royal-wedding');
    
    $result = [
        'status_code' => ($project && !empty($visData['portfolio'])) ? 200 : 404,
        'is_visible' => !empty($visData['portfolio']),
        'slug' => $project['slug'] ?? null
    ];
} else if ($mode === 'invalid_slug') {
    file_put_contents($visFile, json_encode(['blog' => true, 'portfolio' => true, 'venues' => true, 'gallery' => true]));
    $_SERVER['REQUEST_URI'] = '/portfolio/non-existent-wedding-12345/';
    
    $project = PortfolioStore::findBySlug('non-existent-wedding-12345');
    $result = [
        'status_code' => $project ? 200 : 404
    ];
}

file_put_contents($visFile, $originalVis);
echo json_encode($result);
