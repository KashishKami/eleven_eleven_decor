<?php
/**
 * 11:11 Decor — Database Installer & Table Creator
 * Run once via browser: https://yoursite.com/api/install.php
 * DELETE THIS FILE IMMEDIATELY AFTER RUNNING!
 */

header('Content-Type: application/json; charset=utf-8');

if (file_exists(__DIR__ . '/../config.php')) {
    require_once __DIR__ . '/../config.php';
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'config.php not found. Please create config.php first.']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Create blog_posts table
    $sql = "CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        category VARCHAR(100) NOT NULL,
        category_name VARCHAR(150),
        excerpt TEXT,
        content LONGTEXT,
        author VARCHAR(150) DEFAULT '1111 Decor Team',
        image VARCHAR(500),
        read_time VARCHAR(50) DEFAULT '5 min read',
        published TINYINT(1) DEFAULT 1,
        related_service_slug VARCHAR(100),
        related_service_name VARCHAR(150),
        faqs_json JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_slug (slug),
        INDEX idx_published (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    $pdo->exec($sql);

    // Insert sample seed posts if table is empty
    $check = $pdo->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn();
    if ($check == 0) {
        $seedSql = "INSERT INTO blog_posts (title, slug, category, category_name, excerpt, content, author, image, read_time, published, related_service_slug, related_service_name) VALUES 
        (
            'The Complete Wedding Decor Checklist: From Mandap to Grand Reception',
            'complete-wedding-decor-checklist',
            'wedding-planning',
            'Wedding Planning',
            'Step-by-step styling framework ensuring every photo angle, floral installation, and lighting scheme delivers unforgettable magic.',
            '<h2>The Foundation of Luxury Wedding Decor</h2><p>Planning the visual narrative of a wedding requires harmonious alignment between architectural venue features, lighting geometry, and floral design.</p>',
            '1111 Decor Design Studio',
            'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
            '6 min read',
            1,
            'wedding-decoration',
            'Wedding Decoration Services'
        ),
        (
            '5 Crucial Event Planning Mistakes and How to Prevent Them',
            'top-event-planning-mistakes-to-avoid',
            'event-planning',
            'Event Planning',
            'Avoid common logistical bottlenecks, timeline overruns, and guest flow friction with professional coordination strategies.',
            '<h2>Mastering Event Execution Without Stress</h2><p>Flawless events happen by design, not chance. Coordinate with dedicated timelines.</p>',
            '1111 Decor Operations',
            'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
            '5 min read',
            1,
            'event-planning',
            'Event Planning Services'
        ),
        (
            'The Art of the Haute Couture Tablescape: Textures, Florals & Light',
            'haute-couture-tablescape-ideas',
            'decoration-ideas',
            'Decoration Ideas',
            'Explore how curated textures, bespoke ceramics, and layered candle heights create unforgettable dining atmospheres.',
            '<h2>Designing Immersive Dining Experiences</h2><p>A couture tablescape transforms dinner into an immersive sensory occasion.</p>',
            '1111 Decor Styling Team',
            'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1000&auto=format&fit=crop',
            '4 min read',
            1,
            'stage-decoration',
            'Stage & Tablescape Decoration'
        );";
        $pdo->exec($seedSql);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Database tables and sample seed records created successfully. PLEASE DELETE THIS install.php FILE NOW!',
    ], JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage(),
    ], JSON_PRETTY_PRINT);
}
