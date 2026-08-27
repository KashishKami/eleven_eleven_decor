<?php
/**
 * Test Portfolio CRUD Operations via CLI
 */
require_once __DIR__ . '/../../php-admin/config.php';

// 1. Create
$id = PortfolioStore::save([
    'title' => 'The Grand Mussoorie Mountain Wedding',
    'slug' => 'grand-mussoorie-mountain-wedding',
    'subtitle' => 'Royal Himalayan Staging',
    'category' => 'Weddings',
    'location' => 'Mussoorie, Uttarakhand',
    'venue' => 'JW Marriott Walnut Grove',
    'guestCount' => 450,
    'summary' => 'Spectacular outdoor cliffside mandap.',
    'heroImage' => 'https://images.unsplash.com/photo-1519741497674-611481863552',
    'galleryImages' => ['https://images.unsplash.com/photo-1519741497674-611481863552'],
    'planningDetails' => ['Custom lighting'],
    'decorHighlights' => ['Floral mandap'],
    'executionNotes' => '24-hour setup',
    'metaTitle' => 'Mountain Wedding | 1111 Decor',
    'metaDescription' => 'Luxury mountain wedding.',
    'published' => 1
]);

// 2. Read list
$all = PortfolioStore::all(false);

// 3. Find by slug
$found = PortfolioStore::findBySlug('grand-mussoorie-mountain-wedding');

// 4. Update
PortfolioStore::save([
    'id' => $id,
    'title' => 'Updated Mussoorie Wedding',
    'slug' => 'grand-mussoorie-mountain-wedding',
    'category' => 'Weddings',
    'published' => 1
]);
$updated = PortfolioStore::find($id);

// 5. Delete
$deleted = PortfolioStore::delete($id);

echo json_encode([
    'create' => !empty($id),
    'read_list' => count($all) > 0,
    'find_slug' => !empty($found),
    'update' => $updated['title'] === 'Updated Mussoorie Wedding',
    'delete' => $deleted
]);
