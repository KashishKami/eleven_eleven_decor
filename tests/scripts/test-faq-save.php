<?php
/**
 * Test script for FAQ extraction and Gateway FAQ schema injection.
 */
$testDataDir = getenv('TEST_DATA_DIR') ?: __DIR__ . '/../fixtures/data';
if (!is_dir($testDataDir)) {
    mkdir($testDataDir, 0755, true);
}

require_once __DIR__ . '/../../php-admin/config.php';

$action = $argv[1] ?? 'save';

if ($action === 'save') {
    $contentWithFaqs = '<h2>Planning Guide</h2><p>Here is introductory advice.</p>' .
        '<details class="faq-item"><summary>Can we customize our stage?</summary><div class="faq-answer">Yes, absolutely bespoke.</div></details>' .
        '<details class="faq-item"><summary>Do you travel to Mussoorie?</summary><div class="faq-answer">Yes, regularly.</div></details>';

    $saved = BlogStore::save([
        'title' => 'FAQ Extraction Test Post',
        'slug' => 'faq-extraction-test-post',
        'category' => 'weddings',
        'category_name' => 'Weddings',
        'excerpt' => 'Testing auto extraction of FAQ blocks into post data.',
        'content' => $contentWithFaqs,
        'author' => 'Test Author',
        'published' => 1,
    ]);

    echo json_encode([
        'success' => true,
        'post' => $saved,
        'has_faqs' => !empty($saved['faqs']),
        'faq_count' => count($saved['faqs'] ?? []),
        'faqs' => $saved['faqs'] ?? []
    ]);
    exit(0);
}

if ($action === 'find') {
    $slug = $argv[2] ?? 'faq-extraction-test-post';
    $post = BlogStore::findBySlug($slug);
    echo json_encode([
        'success' => !empty($post),
        'post' => $post
    ]);
    exit(0);
}
