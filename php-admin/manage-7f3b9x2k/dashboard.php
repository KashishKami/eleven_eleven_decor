<?php
/**
 * 11:11 Decor — Admin Dashboard
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config.php';

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

    $stmt = $pdo->query("SELECT id, title, slug, category, category_name, author, image, published, DATE_FORMAT(created_at, '%b %d, %Y') AS date_formatted FROM blog_posts ORDER BY created_at DESC");
    $posts = $stmt->fetchAll();
} catch (Exception $e) {
    $error = "Failed to load posts: " . $e->getMessage();
    $posts = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Dashboard — 11:11 Decor</title>
    <meta name="robots" content="noindex, nofollow">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: #111111;
            color: #f5f0e8;
            padding: 2rem;
            line-height: 1.5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(201, 169, 110, 0.2);
            margin-bottom: 2.5rem;
        }
        .brand {
            font-family: Georgia, serif;
            font-size: 1.6rem;
            color: #c9a96e;
            letter-spacing: 0.05em;
        }
        .header-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        .btn-primary {
            padding: 0.65rem 1.25rem;
            background: #c9a96e;
            color: #111111;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.9rem;
            transition: opacity 0.2s;
        }
        .btn-secondary {
            padding: 0.65rem 1.25rem;
            background: #242424;
            color: #f5f0e8;
            text-decoration: none;
            border-radius: 8px;
            font-size: 0.9rem;
            border: 1px solid rgba(255,255,255,0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: #1a1a1a;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.06);
        }
        th, td {
            padding: 1rem 1.25rem;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        th {
            background: #242424;
            color: #c9a96e;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        td {
            font-size: 0.9rem;
        }
        .badge {
            display: inline-block;
            padding: 0.25rem 0.6rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        .badge-published { background: rgba(34, 197, 94, 0.2); color: #86efac; }
        .badge-draft { background: rgba(234, 179, 8, 0.2); color: #fde047; }
        .actions {
            display: flex;
            gap: 0.75rem;
        }
        .action-link {
            color: #c9a96e;
            text-decoration: none;
            font-size: 0.85rem;
            font-weight: 600;
        }
        .action-delete {
            color: #f87171;
        }
        .thumb {
            width: 48px;
            height: 48px;
            border-radius: 6px;
            object-fit: cover;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <div class="brand">11:11 DECOR</div>
                <p style="color: #8a8275; font-size: 0.85rem;">Blog Articles Management</p>
            </div>
            <div class="header-actions">
                <a href="new-post.php" class="btn-primary">+ Create New Post</a>
                <a href="/blog" target="_blank" class="btn-secondary">View Live Site &nearr;</a>
                <a href="logout.php" class="btn-secondary">Log Out</a>
            </div>
        </header>

        <table>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Article Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($posts)): ?>
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 3rem; color: #8a8275;">
                            No articles found. Click "+ Create New Post" above to write your first article!
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($posts as $post): ?>
                        <tr>
                            <td>
                                <?php if (!empty($post['image'])): ?>
                                    <img src="<?= htmlspecialchars($post['image']) ?>" alt="" class="thumb">
                                <?php else: ?>
                                    <div class="thumb" style="background:#333;"></div>
                                <?php endif; ?>
                            </td>
                            <td>
                                <strong style="color: #ffffff;"><?= htmlspecialchars($post['title']) ?></strong>
                                <div style="color: #8a8275; font-size: 0.8rem;">/blog/<?= htmlspecialchars($post['category']) ?>/<?= htmlspecialchars($post['slug']) ?></div>
                            </td>
                            <td>
                                <span style="color: #c9a96e;"><?= htmlspecialchars($post['category_name'] ?: $post['category']) ?></span>
                            </td>
                            <td style="color: #8a8275;"><?= htmlspecialchars($post['date_formatted']) ?></td>
                            <td>
                                <?php if ($post['published']): ?>
                                    <span class="badge badge-published">Published</span>
                                <?php else: ?>
                                    <span class="badge badge-draft">Draft</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <div class="actions">
                                    <a href="edit-post.php?id=<?= $post['id'] ?>" class="action-link">Edit</a>
                                    <a href="delete-post.php?id=<?= $post['id'] ?>" class="action-link action-delete" onclick="return confirm('Are you sure you want to delete this post?');">Delete</a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
