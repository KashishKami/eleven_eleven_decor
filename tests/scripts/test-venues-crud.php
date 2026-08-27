<?php
/**
 * Test Venues CRUD Operations via CLI
 */
require_once __DIR__ . '/../../php-admin/config.php';

// 1. Create
$id = VenueStore::save([
    'name' => 'JW Marriott Mussoorie Walnut Grove',
    'slug' => 'jw-marriott-mussoorie-walnut-grove',
    'tagline' => '5-Star Himalayan Luxury Resort & Valley Lawn',
    'spaceType' => 'Hybrid (Indoor & Outdoor)',
    'location' => 'Mussoorie, Uttarakhand',
    'capacity' => 500,
    'summary' => 'Set against panoramic Garhwal mountain peaks.',
    'heroImage' => 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b',
    'galleryImages' => ['https://images.unsplash.com/photo-1544078751-58fee2d8a03b'],
    'decorHighlights' => ['Overhead floral mandap'],
    'planningConsiderations' => ['Mountain weather logistics'],
    'metaTitle' => 'JW Marriott Mussoorie | 1111 Decor',
    'metaDescription' => 'Luxury mountain venue staging.',
    'published' => 1
]);

// 2. Read list
$all = VenueStore::all(false);

// 3. Find by slug
$found = VenueStore::findBySlug('jw-marriott-mussoorie-walnut-grove');

// 4. Update
VenueStore::save([
    'id' => $id,
    'name' => 'Updated JW Marriott Resort',
    'slug' => 'jw-marriott-mussoorie-walnut-grove',
    'capacity' => 550,
    'published' => 1
]);
$updated = VenueStore::find($id);

// 5. Delete
$deleted = VenueStore::delete($id);

echo json_encode([
    'create' => !empty($id),
    'read_list' => count($all) > 0,
    'find_slug' => !empty($found),
    'update' => $updated['name'] === 'Updated JW Marriott Resort' && $updated['capacity'] === 550,
    'delete' => $deleted
]);
