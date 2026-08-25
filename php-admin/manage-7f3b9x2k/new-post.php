<?php
/**
 * 11:11 Decor — Secret CMS: Create New Post with Live Gutenberg Editor & Rank Math SEO Analyzer
 */
require_once __DIR__ . '/../config.php';

session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

$error = '';
$categories = [
    'wedding-planning' => 'Wedding Planning',
    'floral-design' => 'Floral Design',
    'luxury-tablescapes' => 'Luxury Tablescapes',
    'corporate-galas' => 'Corporate Galas',
    'lighting-ambiance' => 'Lighting & Ambiance',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $slug = trim($_POST['slug'] ?? '');
    $focus_keyword = trim($_POST['focus_keyword'] ?? '');
    $category = trim($_POST['category'] ?? 'wedding-planning');
    $category_name = $categories[$category] ?? 'General';
    $excerpt = trim($_POST['excerpt'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $author = trim($_POST['author'] ?? '1111 Decor Team');
    $read_time = trim($_POST['read_time'] ?? '5 min read');
    $published = isset($_POST['published']) ? 1 : 0;
    $related_service_slug = trim($_POST['related_service_slug'] ?? '');
    $related_service_name = trim($_POST['related_service_name'] ?? '');
    $image_url = trim($_POST['image_url'] ?? '');
    $image_alt = trim($_POST['image_alt'] ?? '');

    // Auto-generate slug if left blank
    if (empty($slug) && !empty($title)) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title), '-'));
    }

    // Handle File Upload if provided
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
            $newFileName = $slug . '-' . uniqid() . '.' . $extension;
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
            // Handle optional FAQ items
            $faqs = [];
            if (!empty($_POST['faq_q']) && is_array($_POST['faq_q'])) {
                foreach ($_POST['faq_q'] as $idx => $q) {
                    $ans = $_POST['faq_a'][$idx] ?? '';
                    if (!empty(trim($q)) && !empty(trim($ans))) {
                        $faqs[] = ['question' => trim($q), 'answer' => trim($ans)];
                    }
                }
            }

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
                'faqs' => $faqs,
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
    <title>New Post — 11:11 Decor Studio Admin</title>
    <link rel="stylesheet" href="editor.bundle.css">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background-color: #0f0f0f;
            color: #e5e5e5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            min-height: 100vh;
            padding: 2rem 1.5rem;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1.25rem;
            border-bottom: 1px solid #262626;
        }
        .brand {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #c9a96e;
        }
        .editor-grid {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 2rem;
            align-items: start;
        }
        @media (max-width: 1100px) {
            .editor-grid {
                grid-template-columns: 1fr;
            }
        }
        .form-card {
            background: #171717;
            border: 1px solid #262626;
            border-radius: 12px;
            padding: 2rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.85rem;
            font-weight: 600;
            color: #c9a96e;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        input[type="text"],
        select,
        textarea {
            width: 100%;
            padding: 0.85rem 1rem;
            background: #222222;
            border: 1px solid #333333;
            border-radius: 6px;
            color: #ffffff;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        input[type="text"]:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: #c9a96e;
        }
        .row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
        }
        .row-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1.25rem;
        }
        @media (max-width: 768px) {
            .row, .row-3 {
                grid-template-columns: 1fr;
            }
        }
        .btn-submit {
            background: #c9a96e;
            color: #111111;
            font-weight: 700;
            padding: 1rem 2rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s;
        }
        .btn-submit:hover {
            background: #d4b883;
        }
        .btn-cancel {
            color: #a3a3a3;
            text-decoration: none;
            margin-left: 1rem;
            font-size: 0.95rem;
        }
        .error {
            background: #451a1a;
            color: #f87171;
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 1.5rem;
            border: 1px solid #7f1d1d;
        }
        .checkbox-label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            color: #ffffff;
            font-size: 0.95rem;
            text-transform: none;
            font-weight: normal;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <div class="brand">11:11 DECOR</div>
                <p style="color: #8a8275; font-size: 0.85rem;">New Editorial Post with Live SEO & Gutenberg Blocks</p>
            </div>
            <a href="dashboard.php" class="btn-cancel">&larr; Back to Dashboard</a>
        </header>

        <?php if (!empty($error)): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <div class="editor-grid">
            <div class="form-card">
                <form method="POST" action="" enctype="multipart/form-data" id="post-form">
                    <div class="form-group">
                        <label for="title">Article Title *</label>
                        <input type="text" id="title" name="title" required placeholder="e.g. Top Luxury Wedding Decor Trends Shaping 2026" oninput="autoSlug(this.value)">
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="focus-keyword-input">Focus Keyword (Target SEO Keyword) *</label>
                            <input type="text" id="focus-keyword-input" name="focus_keyword" placeholder="e.g. wedding decoration" value="">
                        </div>
                        <div class="form-group">
                            <label for="slug">URL Slug *</label>
                            <input type="text" id="slug" name="slug" required placeholder="e.g. luxury-wedding-trends-2026">
                        </div>
                    </div>

                    <div class="row-3">
                        <div class="form-group">
                            <label for="category">Category *</label>
                            <select id="category" name="category">
                                <?php foreach ($categories as $catKey => $catLabel): ?>
                                    <option value="<?= $catKey ?>"><?= $catLabel ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="author">Author Name</label>
                            <input type="text" id="author" name="author" value="1111 Decor Studio">
                        </div>
                        <div class="form-group">
                            <label for="read_time">Estimated Read Time</label>
                            <input type="text" id="read_time" name="read_time" value="5 min read">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="excerpt">Brief Excerpt (Meta Description on cards) *</label>
                        <textarea id="excerpt" name="excerpt" rows="3" required placeholder="Short 1-2 sentence overview of the article (120-160 chars recommended for SEO)..."></textarea>
                    </div>

                    <!-- FEATURE IMAGE SECTION (ABOVE ARTICLE BODY) -->
                    <div style="background: #1f1f1f; padding: 1.25rem; border-radius: 8px; border: 1px solid #333333; margin-bottom: 1.5rem;">
                        <label style="color: #d4b883; margin-bottom: 1rem; font-size: 0.9rem;">📷 Featured Main Image & SEO Alt Text</label>
                        
                        <div class="row">
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="image_file" style="font-size: 0.75rem; color: #a3a3a3;">Upload File (JPG, PNG, WebP)</label>
                                <input type="file" id="image_file" name="image_file" accept="image/jpeg,image/png,image/webp">
                            </div>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="image_url" style="font-size: 0.75rem; color: #a3a3a3;">Or Image URL (Unsplash / Cloud)</label>
                                <input type="text" id="image_url" name="image_url" placeholder="https://images.unsplash.com/photo-...">
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 0;">
                            <label for="image_alt" style="font-size: 0.75rem; color: #a3a3a3;">Feature Image Alt Text (SEO Description) *</label>
                            <input type="text" id="image_alt" name="image_alt" placeholder="e.g. Luxury Wedding Stage & Floral Arch Decor by 1111 Decor">
                        </div>
                    </div>

                    <!-- ARTICLE BODY (GUTENBERG BLOCK EDITOR) -->
                    <div class="form-group">
                        <label>Article Body (Gutenberg Block Editor — Type <code>/</code> for Slash Commands) *</label>
                        <input type="hidden" name="content" id="content-field" value="">
                        <div id="editor-root" data-initial-content="" data-input-id="content-field"></div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="related_service_slug">Related Service Link (Optional)</label>
                            <input type="text" id="related_service_slug" name="related_service_slug" placeholder="e.g. wedding-decoration">
                        </div>
                        <div class="form-group">
                            <label for="related_service_name">Related Service Label</label>
                            <input type="text" id="related_service_name" name="related_service_name" placeholder="e.g. Wedding Decoration Services">
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 1.5rem;">
                        <label class="checkbox-label">
                            <input type="checkbox" name="published" value="1" checked style="width: 18px; height: 18px;">
                            Publish live immediately to website
                        </label>
                    </div>

                    <div style="margin-top: 2rem;">
                        <button type="submit" class="btn-submit">Publish Article &rarr;</button>
                        <a href="dashboard.php" class="btn-cancel">Cancel</a>
                    </div>
                </form>
            </div>

            <!-- Rank Math Live SEO Panel -->
            <div id="seo-panel-root" data-keyword=""></div>
        </div>
    </div>

    <script>
        function autoSlug(val) {
            const slugInput = document.getElementById('slug');
            if (slugInput) {
                slugInput.value = val.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
            }
        }
    </script>
    <script src="editor.bundle.js"></script>
</body>
</html>
