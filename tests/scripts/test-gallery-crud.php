<?php
/**
 * Test Gallery CRUD Operations via CLI
 */
require_once __DIR__ . '/../../php-admin/config.php';

// 1. Create
$id = GalleryStore::save([
    'src' => 'https://images.unsplash.com/photo-1519741497674-611481863552',
    'title' => 'Royal Mandap Orchid Canopy',
    'category' => 'Weddings',
    'aspectRatio' => 'landscape',
    'published' => 1
]);

// 2. Read list
$all = GalleryStore::all(false);

// 3. Find by ID
$found = GalleryStore::find($id);

// 4. Update
GalleryStore::save([
    'id' => $id,
    'src' => 'https://images.unsplash.com/photo-1519741497674-611481863552',
    'title' => 'Updated Royal Mandap Orchid Canopy',
    'category' => 'Weddings',
    'aspectRatio' => 'portrait',
    'published' => 1
]);
$updated = GalleryStore::find($id);

// 5. Delete
$deleted = GalleryStore::delete($id);

echo json_encode([
    'create' => !empty($id),
    'read_list' => count($all) > 0,
    'find' => !empty($found),
    'update' => $updated['title'] === 'Updated Royal Mandap Orchid Canopy' && $updated['aspectRatio'] === 'portrait',
    'delete' => $deleted
]);
