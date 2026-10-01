<?php
/**
 * Test script for meta title and description saving.
 */
$testDataDir = getenv('TEST_DATA_DIR') ?: __DIR__ . '/../fixtures/data';
if (!is_dir($testDataDir)) {
    mkdir($testDataDir, 0755, true);
}

require_once __DIR__ . '/../../php-admin/config.php';

$saved = BlogStore::save([
    'title' => 'Editorial H1 Article Headline That Is Deliberately Very Long',
    'meta_title' => 'Custom SERP Meta Title | 11:11 Decor',
    'slug' => 'custom-meta-tags-test-post',
    'category' => 'weddings',
    'category_name' => 'Weddings',
    'excerpt' => 'This is a long introductory card excerpt that contains rich details about the decor concept.',
    'meta_description' => 'Custom SERP meta description strictly within 120-160 characters for search snippet ranking.',
    'published' => 1,
]);

echo json_encode(['success' => true, 'post' => $saved]);
