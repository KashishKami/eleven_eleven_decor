<?php
/**
 * 11:11 Decor — Gutenberg 3-Column Studio: New Post & Live Rank Math SEO
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config.php';

$error = '';
$categories = [
    'wedding-planning' => 'Wedding Planning',
    'floral-design' => 'Floral Design',
    'luxury-tablescapes' => 'Luxury Tablescapes',
    'corporate-galas' => 'Corporate Galas',
    'lighting-ambiance' => 'Lighting & Ambiance',
    'venue-destination-events' => 'Venue & Destination Events',
    'decoration-ideas' => 'Decoration Ideas',
    'event-planning' => 'Event Planning',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $slug = trim($_POST['slug'] ?? '');
    $focus_keyword = trim($_POST['focus_keyword'] ?? '');
    $category = trim($_POST['category'] ?? 'wedding-planning');
    $category_name = $categories[$category] ?? 'General';
    $excerpt = trim($_POST['excerpt'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $author = trim($_POST['author'] ?? '1111 Decor Studio');
    $read_time = trim($_POST['read_time'] ?? '5 min read');
    $published = isset($_POST['published']) ? 1 : 0;
    $related_service_slug = trim($_POST['related_service_slug'] ?? '');
    $related_service_name = trim($_POST['related_service_name'] ?? '');
    $image_url = trim($_POST['image_url'] ?? '');
    $image_alt = trim($_POST['image_alt'] ?? '');

    // Handle File Upload
    if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image_file']['tmp_name'];
        $fileName = $_FILES['image_file']['name'];
        $fileSize = $_FILES['image_file']['size'];
        $fileType = $_FILES['image_file']['type'];
        
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!in_array($fileType, $allowedTypes)) {
            $error = 'Invalid image type. Only JPG, PNG, and WebP are allowed.';
        } elseif ($fileSize > 5 * 1024 * 1024) {
            $error = 'Image exceeds 5MB size limit.';
        } else {
            $uploadDir = __DIR__ . '/uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);
            $newFileName = ($slug ? $slug : 'post') . '-' . uniqid() . '.' . $extension;
            $destPath = $uploadDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $destPath)) {
                $publicUploadDir = dirname(__DIR__, 2) . '/public/uploads/';
                if (is_dir(dirname(__DIR__, 2) . '/public')) {
                    if (!is_dir($publicUploadDir)) {
                        @mkdir($publicUploadDir, 0755, true);
                    }
                    @copy($destPath, $publicUploadDir . $newFileName);
                }
                $image_url = '/manage-7f3b9x2k/uploads/' . $newFileName;
            } else {
                $error = 'Failed to upload image to server.';
            }
        }
    }

    if (empty($title) || empty($slug)) {
        $error = 'Title and Slug are required fields.';
    }

    if (empty($error)) {
        try {
            BlogStore::save([
                'title' => $title,
                'slug' => $slug,
                'focus_keyword' => $focus_keyword,
                'category' => $category,
                'category_name' => $category_name,
                'excerpt' => $excerpt,
                'content' => $content,
                'author' => $author,
                'image' => $image_url,
                'image_alt' => $image_alt,
                'read_time' => $read_time,
                'published' => $published,
                'related_service_slug' => $related_service_slug,
                'related_service_name' => $related_service_name,
            ]);

            header('Location: dashboard.php?created=1');
            exit;
        } catch (Exception $e) {
            $error = 'Error saving article: ' . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gutenberg Studio — New Post — 11:11 Decor</title>
    <link rel="stylesheet" href="editor.bundle.css">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background-color: #121212;
            color: #e5e5e5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            min-height: 100vh;
        }

        /* Top Header Bar */
        .studio-header {
            position: sticky;
            top: 0;
            z-index: 50;
            background: #181818;
            border-bottom: 1px solid #282828;
            padding: 0.75rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .brand {
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #c9a96e;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .brand-badge {
            font-size: 0.7rem;
            background: rgba(201, 169, 110, 0.2);
            color: #c9a96e;
            padding: 0.15rem 0.45rem;
            border-radius: 4px;
            text-transform: uppercase;
        }
        .header-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .btn-cancel {
            color: #a3a3a3;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.2s;
        }
        .btn-cancel:hover { color: #ffffff; }
        .btn-publish-top {
            background: #c9a96e;
            color: #111111;
            font-weight: 700;
            padding: 0.6rem 1.4rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .btn-publish-top:hover { background: #d4b883; }

        /* 3-Column Studio Grid */
        .studio-3col-grid {
            display: grid;
            grid-template-columns: 320px 1fr 370px;
            gap: 1.5rem;
            align-items: start;
            max-width: 1720px;
            margin: 0 auto;
            padding: 1.5rem;
        }
        @media (max-width: 1400px) {
            .studio-3col-grid {
                grid-template-columns: 290px 1fr 340px;
                gap: 1rem;
                padding: 1rem;
            }
        }
        @media (max-width: 1100px) {
            .studio-3col-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Left & Right Sidebars */
        .studio-sidebar {
            background: #181818;
            border: 1px solid #282828;
            border-radius: 12px;
            padding: 1.5rem;
            position: sticky;
            top: 75px;
            max-height: calc(100vh - 90px);
            overflow-y: auto;
        }
        .sidebar-header-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #c9a96e;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding-bottom: 0.75rem;
            margin-bottom: 1.25rem;
            border-bottom: 1px solid #282828;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        /* Center Column: Frameless Gutenberg Document Canvas */
        .gutenberg-canvas {
            background: transparent;
            padding: 1rem 1.5rem 6rem;
            width: 100%;
        }

        .canvas-title-input {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            color: #ffffff;
            font-family: Georgia, serif;
            font-size: 2.5rem;
            font-weight: 600;
            line-height: 1.25;
            resize: none;
            margin-bottom: 1.25rem;
            padding: 0;
        }
        .canvas-title-input::placeholder {
            color: #4a4a4a;
        }

        .canvas-excerpt-input {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            color: #a3a3a3;
            font-size: 1.1rem;
            line-height: 1.6;
            resize: none;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .canvas-excerpt-input::placeholder {
            color: #444444;
        }

        /* Sidebar Settings Form Elements */
        .sidebar-group {
            margin-bottom: 1.25rem;
        }
        .sidebar-group-title {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #c9a96e;
            margin-bottom: 0.4rem;
        }
        .sidebar-input, .sidebar-select, .sidebar-textarea {
            width: 100%;
            padding: 0.7rem 0.85rem;
            background: #222222;
            border: 1px solid #333333;
            border-radius: 6px;
            color: #ffffff;
            font-size: 0.88rem;
            transition: border-color 0.2s;
        }
        .sidebar-input:focus, .sidebar-select:focus, .sidebar-textarea:focus {
            outline: none;
            border-color: #c9a96e;
        }
        .sidebar-help {
            font-size: 0.72rem;
            color: #777777;
            margin-top: 0.35rem;
        }

        .publish-card {
            background: #202020;
            border: 1px solid #303030;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.25rem;
        }
        .checkbox-label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            color: #ffffff;
            font-size: 0.88rem;
        }

        .error-banner {
            background: #451a1a;
            color: #f87171;
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 1.5rem;
            border: 1px solid #7f1d1d;
        }
    </style>
</head>
<body>
    <form method="POST" action="" enctype="multipart/form-data" id="post-form">
        <!-- Hidden focus keywords input synced with Rank Math panel -->
        <input type="hidden" id="focus-keyword-input" name="focus_keyword" value="">

        <!-- Top Navigation Header -->
        <header class="studio-header">
            <div class="brand">
                <span>11:11 DECOR</span>
                <span class="brand-badge">Studio</span>
            </div>
            <div class="header-actions">
                <a href="dashboard.php" class="btn-cancel">&larr; Dashboard</a>
                <button type="submit" class="btn-publish-top">Publish Post &rarr;</button>
            </div>
        </header>

        <!-- 3-Column Workspace -->
        <div class="studio-3col-grid">
            <!-- Left Column: Document Settings Sidebar (Always Visible) -->
            <aside class="studio-sidebar studio-sidebar-left">
                <div class="sidebar-header-title">⚙️ Document Settings</div>

                <div class="publish-card">
                    <label class="checkbox-label" style="margin-bottom: 0.75rem;">
                        <input type="checkbox" name="published" value="1" checked style="width: 16px; height: 16px;">
                        <span>Publish live immediately</span>
                    </label>
                    <button type="submit" class="btn-publish-top" style="width: 100%;">Save Post &rarr;</button>
                </div>

                <div class="sidebar-group">
                    <div class="sidebar-group-title">URL Slug *</div>
                    <input type="text" id="slug" name="slug" required placeholder="e.g. luxury-wedding-trends-2026" class="sidebar-input">
                    <div class="sidebar-help">Permalink: /blog/[category]/[slug]/</div>
                </div>

                <div class="sidebar-group">
                    <div class="sidebar-group-title">Category *</div>
                    <select id="category" name="category" class="sidebar-select">
                        <?php foreach ($categories as $catKey => $catLabel): ?>
                            <option value="<?= $catKey ?>"><?= $catLabel ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="sidebar-group">
                    <div class="sidebar-group-title">Author Name</div>
                    <input type="text" id="author" name="author" value="1111 Decor Studio" class="sidebar-input">
                </div>

                <div class="sidebar-group">
                    <div class="sidebar-group-title">Estimated Read Time</div>
                    <input type="text" id="read_time" name="read_time" value="5 min read" class="sidebar-input">
                </div>

                <div class="sidebar-group" style="background: #202020; padding: 1rem; border-radius: 8px; border: 1px solid #303030;">
                    <div class="sidebar-group-title" style="color: #d4b883;">📷 Featured Main Image</div>
                    
                    <label style="font-size: 0.75rem; color: #a3a3a3; display: block; margin-bottom: 0.3rem;">Upload File (JPG, PNG, WebP)</label>
                    <input type="file" id="image_file" name="image_file" accept="image/jpeg,image/png,image/webp" style="margin-bottom: 0.8rem; font-size: 0.8rem; color: #fff;">

                    <label style="font-size: 0.75rem; color: #a3a3a3; display: block; margin-bottom: 0.3rem;">Or Image URL</label>
                    <input type="text" id="image_url" name="image_url" placeholder="https://images.unsplash.com/..." class="sidebar-input" style="margin-bottom: 0.8rem;">

                    <div id="featured-image-preview-wrapper" style="margin-bottom: 0.8rem; display: none;">
                        <div style="position: relative; border-radius: 6px; overflow: hidden; border: 1px solid #444; max-height: 160px; background: #111; display: flex; align-items: center; justify-content: center;">
                            <img id="featured-image-preview" src="" alt="Featured preview" style="width: 100%; height: auto; max-height: 160px; object-fit: cover; display: block;">
                            <button type="button" onclick="clearFeaturedImage()" title="Remove image" style="position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; width: 22px; height: 22px; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">&times;</button>
                        </div>
                    </div>

                    <label style="font-size: 0.75rem; color: #a3a3a3; display: block; margin-bottom: 0.3rem;">Feature Image Alt Text *</label>
                    <input type="text" id="image_alt" name="image_alt" placeholder="e.g. Luxury Wedding Floral Decor by 1111 Decor" class="sidebar-input">
                </div>

                <div class="sidebar-group">
                    <div class="sidebar-group-title">🔗 Recommended Service CTA (Optional)</div>
                    
                    <label style="font-size: 0.75rem; color: #c9a96e; display: block; margin-bottom: 0.3rem; font-weight: 600;">Service URL Slug</label>
                    <input type="text" id="related_service_slug" name="related_service_slug" placeholder="e.g. wedding-decoration" class="sidebar-input" style="margin-bottom: 0.25rem;">
                    <div class="sidebar-help" style="margin-bottom: 0.8rem;">Links to /services/[slug]/</div>

                    <label style="font-size: 0.75rem; color: #c9a96e; display: block; margin-bottom: 0.3rem; font-weight: 600;">Service Card Title</label>
                    <input type="text" id="related_service_name" name="related_service_name" placeholder="e.g. Wedding Decoration Services" class="sidebar-input" style="margin-bottom: 0.25rem;">
                    <div class="sidebar-help">Heading displayed in the bottom CTA card</div>
                </div>
            </aside>

            <!-- Center Column: Seamless Gutenberg Writing Canvas (Always Visible) -->
            <main class="gutenberg-canvas">
                <?php if (!empty($error)): ?>
                    <div class="error-banner"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>

                <!-- Frameless Title -->
                <textarea
                    id="title"
                    name="title"
                    rows="1"
                    required
                    placeholder="Add Title..."
                    oninput="autoExpandTextarea(this); autoSlug(this.value);"
                    class="canvas-title-input"
                ></textarea>

                <!-- Frameless Excerpt / Meta Description -->
                <textarea
                    id="excerpt"
                    name="excerpt"
                    rows="2"
                    required
                    placeholder="Add a brief excerpt / meta description for search engines and cards..."
                    oninput="autoExpandTextarea(this);"
                    class="canvas-excerpt-input"
                ></textarea>

                <!-- Seamless Block Editor Canvas -->
                <input type="hidden" name="content" id="content-field" value="">
                <div id="editor-root" data-initial-content="" data-input-id="content-field"></div>
            </main>

            <!-- Right Column: Rank Math SEO Live Panel (Always Visible) -->
            <aside class="studio-sidebar studio-sidebar-right">
                <div id="seo-panel-root" data-keyword=""></div>
            </aside>
        </div>
    </form>

    <script>
        function autoExpandTextarea(el) {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        }

        function autoSlug(text) {
            var slugInput = document.getElementById('slug');
            if (slugInput && !slugInput.dataset.manual) {
                slugInput.value = text.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }
        }

        document.getElementById('slug').addEventListener('input', function() {
            this.dataset.manual = 'true';
        });

        function normalizeImageUrl(url) {
            var clean = (url || '').trim();
            if (!clean) return '';
            if (!clean.startsWith('http://') && !clean.startsWith('https://') && !clean.startsWith('/') && !clean.startsWith('data:')) {
                clean = 'https://' + clean;
            }
            var match = clean.match(/unsplash\.com\/photos\/(?:[a-zA-Z0-9_-]*-+)?([a-zA-Z0-9_-]+)/i);
            if (match && match[1]) {
                var photoId = match[1].replace(/^-+/, '');
                return 'https://images.unsplash.com/photo-' + photoId + '?auto=format&fit=crop&w=1200&q=80';
            }
            return clean;
        }

        // Featured Image Preview Handlers
        var imageFileInput = document.getElementById('image_file');
        var imageUrlInput = document.getElementById('image_url');
        var imageAltInput = document.getElementById('image_alt');
        var previewWrapper = document.getElementById('featured-image-preview-wrapper');
        var previewImg = document.getElementById('featured-image-preview');

        if (imageFileInput) {
            imageFileInput.addEventListener('change', function(e) {
                var file = e.target.files && e.target.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function(evt) {
                        if (previewImg && previewWrapper) {
                            previewImg.src = evt.target.result;
                            previewImg.style.display = 'block';
                            previewWrapper.style.display = 'block';
                        }
                    };
                    reader.readAsDataURL(file);

                    if (imageAltInput && !imageAltInput.value.trim()) {
                        var kwInput = document.getElementById('focus-keyword-input');
                        var kw = kwInput ? kwInput.value.split(',')[0].trim() : '';
                        var cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ');
                        imageAltInput.value = kw ? kw + ' - ' + cleanName : cleanName;
                        imageAltInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }
            });
        }

        if (imageUrlInput) {
            imageUrlInput.addEventListener('input', function(e) {
                var url = normalizeImageUrl(e.target.value);
                if (url && previewImg && previewWrapper) {
                    previewImg.src = url;
                    previewImg.style.display = 'block';
                    previewWrapper.style.display = 'block';
                } else if (!url && previewWrapper && (!imageFileInput.files || !imageFileInput.files.length)) {
                    previewWrapper.style.display = 'none';
                }
            });

            imageUrlInput.addEventListener('blur', function(e) {
                var url = normalizeImageUrl(e.target.value);
                if (url) {
                    e.target.value = url;
                }
            });
        }

        function clearFeaturedImage() {
            if (imageFileInput) imageFileInput.value = '';
            if (imageUrlInput) {
                imageUrlInput.value = '';
                imageUrlInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (previewImg) previewImg.src = '';
            if (previewWrapper) previewWrapper.style.display = 'none';
        }
    </script>
    <script src="editor.bundle.js"></script>
</body>
</html>
