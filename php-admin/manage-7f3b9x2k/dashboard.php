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
    $posts = BlogStore::all(false);
} catch (Exception $e) {
    $error = "Failed to load posts: " . $e->getMessage();
    $posts = [];
}

// Load page visibility configuration
$visibilityFile = get_data_dir() . '/page-visibility.json';
$visibility = [
    'blog' => false,
    'gallery' => false,
    'portfolio' => false,
    'venues' => false
];
if (file_exists($visibilityFile)) {
    $rawVis = json_decode(file_get_contents($visibilityFile), true);
    if (is_array($rawVis)) {
        $visibility['blog'] = !empty($rawVis['blog']);
        $visibility['gallery'] = !empty($rawVis['gallery']);
        $visibility['portfolio'] = !empty($rawVis['portfolio']);
        $visibility['venues'] = !empty($rawVis['venues']);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Management Dashboard — 11:11 Decor</title>
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
            flex-wrap: wrap;
            gap: 1rem;
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
            flex-wrap: wrap;
        }
        .nav-tabs {
            display: flex;
            gap: 0.5rem;
            row-gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding-bottom: 0.75rem;
        }
        @media (max-width: 768px) {
            body { padding: 1rem; }
            header { flex-direction: column; align-items: flex-start; }
            .header-actions { width: 100%; }
        }
        .nav-tab {
            padding: 0.5rem 1.2rem;
            border-radius: 6px;
            color: #a39c90;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.2s;
        }
        .nav-tab:hover {
            color: #ffffff;
            background: rgba(255,255,255,0.05);
        }
        .nav-tab.active {
            color: #111111;
            background: #c9a96e;
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
        
        /* ── Page Visibility Card ── */
        .visibility-card {
            background: #1a1a1a;
            border: 1px solid rgba(201, 169, 110, 0.25);
            border-radius: 12px;
            padding: 1.75rem 2rem;
            margin-bottom: 2.5rem;
        }
        .visibility-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
        }
        .visibility-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 0.02em;
        }
        .visibility-desc {
            font-size: 0.85rem;
            color: #8a8275;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        .toggle-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.5rem;
        }
        .toggle-item {
            background: #242424;
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 10px;
            padding: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .toggle-info h4 {
            font-size: 0.95rem;
            color: #ffffff;
            margin-bottom: 0.25rem;
        }
        .toggle-info p {
            font-size: 0.78rem;
            color: #8a8275;
        }
        
        /* iOS Switch */
        .switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 26px;
            flex-shrink: 0;
        }
        .switch input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.001;
            z-index: 5;
            cursor: pointer;
            margin: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: #3f3f46;
            transition: 0.3s;
            border-radius: 26px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
        }
        input:checked + .slider {
            background-color: #c9a96e;
        }
        input:checked + .slider:before {
            transform: translateX(22px);
        }
        
        #visibility-status-msg {
            display: inline-block;
            font-size: 0.825rem;
            font-weight: 600;
            color: #86efac;
            margin-left: 1rem;
            transition: opacity 0.3s;
        }
        .build-notice {
            margin-top: 1.25rem;
            padding: 0.75rem 1rem;
            background: rgba(201, 169, 110, 0.08);
            border-left: 3px solid #c9a96e;
            border-radius: 4px;
            font-size: 0.8rem;
            color: #d4cfc7;
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
<?php
$is_local = isset($_SERVER['HTTP_HOST']) && (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false);
$live_site_url = $is_local ? 'http://localhost:3000/blog' : '/blog';
?>
        <header>
            <div>
                <div class="brand">11:11 DECOR</div>
                <p style="color: #8a8275; font-size: 0.85rem;">Website Management Studio</p>
            </div>
            <div class="header-actions">
                <a href="new-post.php" class="btn-primary">+ Create New Post</a>
                <a href="<?= $live_site_url ?>" target="_blank" class="btn-secondary">View Live Site &nearr;</a>
                <a href="logout.php" class="btn-secondary">Log Out</a>
            </div>
        </header>

        <!-- Navigation Tabs -->
        <div class="nav-tabs">
            <a href="dashboard.php" class="nav-tab active">Blog Articles &amp; Visibility</a>
            <a href="portfolio.php" class="nav-tab">Portfolio Showcase</a>
            <a href="venues.php" class="nav-tab">Venues Directory</a>
            <a href="gallery.php" class="nav-tab">Photo Gallery</a>
        </div>

        <!-- ── Page Visibility Controls Card ── -->
        <div id="page-visibility-card" data-testid="page-visibility-card" class="visibility-card">
            <div class="visibility-header">
                <div style="display: flex; align-items: center;">
                    <span class="visibility-title">Page & Content Visibility Controls</span>
                    <span id="visibility-status-msg" class="toast-success"></span>
                </div>
            </div>
            <p class="visibility-desc">
                Toggle sections ON or OFF to control public access, navigation links, and sitemap indexing. When hidden, pages return 404 and disappear from menus.
            </p>
            <div class="toggle-grid">
                <!-- Blog Toggle -->
                <div class="toggle-item">
                    <div class="toggle-info">
                        <h4>Blog Articles</h4>
                        <p>/blog/ &amp; stories</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="toggle-blog" name="visibility_blog" <?= $visibility['blog'] ? 'checked' : '' ?> onchange="updateVisibility('blog', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Gallery Toggle -->
                <div class="toggle-item">
                    <div class="toggle-info">
                        <h4>Photo Gallery</h4>
                        <p>/gallery/</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="toggle-gallery" name="visibility_gallery" <?= $visibility['gallery'] ? 'checked' : '' ?> onchange="updateVisibility('gallery', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Portfolio Toggle -->
                <div class="toggle-item">
                    <div class="toggle-info">
                        <h4>Portfolio Showcase</h4>
                        <p>/portfolio/ &amp; projects</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="toggle-portfolio" name="visibility_portfolio" <?= $visibility['portfolio'] ? 'checked' : '' ?> onchange="updateVisibility('portfolio', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Venues Toggle -->
                <div class="toggle-item">
                    <div class="toggle-info">
                        <h4>Venues Archive</h4>
                        <p>/venues/ &amp; detail pages</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="toggle-venues" name="visibility_venues" <?= $visibility['venues'] ? 'checked' : '' ?> onchange="updateVisibility('venues', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="build-notice">
                ⚠️ <strong>GoDaddy Static Build Notice:</strong> Changes update the server configuration immediately. Run <code>pnpm build</code> to re-export static files when publishing to production.
            </div>
        </div>

        <h3 style="margin-bottom: 1rem; color: #c9a96e; font-size: 1.1rem;">Blog Articles Management</h3>

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
                            <td style="color: #8a8275;"><?= !empty($post['created_at']) ? date('M d, Y', strtotime($post['created_at'])) : 'Recent' ?></td>
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

    <script>
    async function updateVisibility(section, published) {
        const msgEl = document.getElementById('visibility-status-msg');
        msgEl.textContent = 'Saving...';
        msgEl.style.color = '#fde047';

        try {
            const res = await fetch('../api/page-visibility.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ section, published })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                msgEl.textContent = '✓ Visibility updated & saved';
                msgEl.style.color = '#86efac';
                setTimeout(() => {
                    msgEl.textContent = '';
                }, 3500);
            } else {
                msgEl.textContent = 'Error: ' + (data.error || 'Failed to save');
                msgEl.style.color = '#f87171';
            }
        } catch (err) {
            msgEl.textContent = 'Network error saving visibility';
            msgEl.style.color = '#f87171';
        }
    }
    </script>
</body>
</html>
