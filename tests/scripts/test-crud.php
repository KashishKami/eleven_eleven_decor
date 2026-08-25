<?php
/**
 * 11:11 Decor — Automated PHP Blog Backend CRUD Test Runner
 */

require_once __DIR__ . '/../../php-admin/config.php';

$results = [
    'create' => false,
    'read_list' => false,
    'read_single' => false,
    'category_filter' => false,
    'update' => false,
    'delete' => false,
    'post_id' => null,
];

try {
    // 1. CREATE TEST
    $newPost = BlogStore::save([
        'title' => 'Test Automated Staging Article',
        'slug' => 'test-staging-article-' . uniqid(),
        'category' => 'wedding-planning',
        'category_name' => 'Wedding Planning',
        'excerpt' => 'Automated test excerpt for staging.',
        'content' => '<h2>Automated Test</h2><p>Body content testing CRUD flow.</p>',
        'author' => 'QA Integration Bot',
        'image' => 'https://images.unsplash.com/photo-1519741497674-611481863552',
        'read_time' => '3 min read',
        'published' => 1,
        'related_service_slug' => 'wedding-decoration',
        'related_service_name' => 'Wedding Decoration Services',
        'faqs' => [
            ['question' => 'Is this a test?', 'answer' => 'Yes, integration test.']
        ],
    ]);

    $createdId = (int)$newPost['id'];
    $results['post_id'] = $createdId;
    $results['create'] = ($createdId > 0);

    // 2. READ LIST TEST
    $all = BlogStore::all(false);
    $results['read_list'] = (count($all) >= 1);

    // 3. READ SINGLE TEST
    $single = BlogStore::findById($createdId);
    $results['read_single'] = ($single && $single['title'] === 'Test Automated Staging Article');

    // 4. CATEGORY FILTER TEST
    $filtered = BlogStore::all(true, 'wedding-planning');
    $results['category_filter'] = (count($filtered) >= 1);

    // 5. UPDATE TEST
    BlogStore::save([
        'id' => $createdId,
        'title' => 'Updated Staging Article Title',
        'slug' => $newPost['slug'],
        'category' => 'wedding-planning',
        'published' => 1,
    ]);
    $updated = BlogStore::findById($createdId);
    $results['update'] = ($updated && $updated['title'] === 'Updated Staging Article Title');

    // 6. DELETE TEST
    BlogStore::delete($createdId);
    $afterDelete = BlogStore::findById($createdId);
    $results['delete'] = ($afterDelete === null);

    echo json_encode([
        'success' => true,
        'results' => $results
    ], JSON_PRETTY_PRINT);
} catch (Throwable $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
