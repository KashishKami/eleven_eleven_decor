<?php
/**
 * Test script to capture HTTP headers and output from a PHP API file.
 */
$script = $argv[1] ?? '';
if (!file_exists($script)) {
    echo json_encode(['error' => 'File not found: ' . $script]);
    exit(1);
}

// Pass any additional query string args
if (isset($argv[2])) {
    $_SERVER['QUERY_STRING'] = $argv[2];
}
$_SERVER['REQUEST_METHOD'] = 'GET';

$testDataDir = getenv('TEST_DATA_DIR');

$code = file_get_contents($script);
$headers = [];
if (preg_match_all('/header\s*\(([^)]+)\)/i', $code, $matches)) {
    foreach ($matches[1] as $m) {
        $headers[] = trim($m, " '\"");
    }
}

register_shutdown_function(function() use ($headers) {
    $body = ob_get_clean();
    echo json_encode([
        'headers' => $headers,
        'body' => $body
    ]);
});

ob_start();
require $script;
