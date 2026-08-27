<?php
/**
 * 11:11 Decor — Edit Portfolio Project with Live Slug & Image Upload
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config.php';

$id = trim($_GET['id'] ?? '');
$project = PortfolioStore::find($id);

if (!$project) {
    header('Location: portfolio.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $subtitle = trim($_POST['subtitle'] ?? '');
    $slug = trim($_POST['slug'] ?? '');
    if (empty($slug)) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title), '-'));
    } else {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $slug), '-'));
    }
    $category = trim($_POST['category'] ?? 'Weddings');
    $location = trim($_POST['location'] ?? '');
    $venue = trim($_POST['venue'] ?? '');
    $guestCount = (int)($_POST['guestCount'] ?? 0);
    $heroImage = trim($_POST['heroImage'] ?? '');
    $summary = trim($_POST['summary'] ?? '');
    $executionNotes = trim($_POST['executionNotes'] ?? '');
    $published = isset($_POST['published']) ? 1 : 0;

    $galleryImagesRaw = trim($_POST['galleryImages'] ?? '');
    $galleryImages = array_filter(array_map('trim', explode("\n", $galleryImagesRaw)));

    $planningDetailsRaw = trim($_POST['planningDetails'] ?? '');
    $planningDetails = array_filter(array_map('trim', explode("\n", $planningDetailsRaw)));

    $decorHighlightsRaw = trim($_POST['decorHighlights'] ?? '');
    $decorHighlights = array_filter(array_map('trim', explode("\n", $decorHighlightsRaw)));

    if (empty($title)) {
        $error = 'Project title is required.';
    } elseif (empty($slug)) {
        $error = 'Project URL slug is required.';
    } else {
        try {
            PortfolioStore::save([
                'id' => $id,
                'title' => $title,
                'subtitle' => $subtitle,
                'slug' => $slug,
                'category' => $category,
                'location' => $location,
                'venue' => $venue,
                'guestCount' => $guestCount,
                'heroImage' => $heroImage,
                'galleryImages' => array_values($galleryImages),
                'summary' => $summary,
                'planningDetails' => array_values($planningDetails),
                'decorHighlights' => array_values($decorHighlights),
                'executionNotes' => $executionNotes,
                'metaTitle' => $title . ' | 11:11 Decor Showcase',
                'metaDescription' => !empty($summary) ? substr($summary, 0, 160) : 'Luxury event showcase by 11:11 Decor.',
                'published' => $published
            ]);
            header('Location: portfolio.php');
            exit;
        } catch (Exception $e) {
            $error = 'Failed to update project: ' . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Project — 11:11 Decor</title>
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
        .container { max-width: 900px; margin: 0 auto; }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(201, 169, 110, 0.2);
            margin-bottom: 2rem;
        }
        .brand { font-family: Georgia, serif; font-size: 1.5rem; color: #c9a96e; }
        .form-card {
            background: #1a1a1a;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 2.5rem;
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; color: #c9a96e; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        input[type="text"], input[type="number"], select, textarea {
            width: 100%;
            padding: 0.85rem 1rem;
            background: #242424;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            color: #ffffff;
            font-size: 0.95rem;
            font-family: inherit;
        }
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #c9a96e;
            box-shadow: 0 0 0 2px rgba(201, 169, 110, 0.2);
        }

        .slug-input-wrapper {
            display: flex;
            align-items: center;
            background: #242424;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .slug-prefix {
            padding: 0.85rem 0.75rem;
            background: #1f1f1f;
            color: #8a8275;
            font-size: 0.85rem;
            border-right: 1px solid rgba(255,255,255,0.1);
            white-space: nowrap;
        }
        .slug-input-wrapper input {
            border: none;
            background: transparent;
            border-radius: 0;
        }

        .dropzone-box {
            border: 2px dashed rgba(201, 169, 110, 0.3);
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
            background: #1e1e1e;
            cursor: pointer;
            transition: all 0.2s;
        }
        .dropzone-box:hover {
            border-color: #c9a96e;
            background: rgba(201, 169, 110, 0.05);
        }
        .dropzone-preview {
            max-height: 180px;
            border-radius: 6px;
            margin-top: 0.75rem;
            object-fit: cover;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .btn-upload {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: #2a2a2a;
            color: #c9a96e;
            border: 1px solid #c9a96e;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 0.5rem;
        }

        .btn-primary {
            padding: 0.85rem 2rem;
            background: #c9a96e;
            color: #111111;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
        }
        .btn-secondary {
            padding: 0.85rem 1.5rem;
            background: #242424;
            color: #f5f0e8;
            text-decoration: none;
            border-radius: 8px;
            font-size: 0.95rem;
            border: 1px solid rgba(255,255,255,0.1);
            margin-right: 1rem;
        }
        .error-box {
            padding: 1rem;
            background: rgba(239, 68, 68, 0.15);
            border-left: 4px solid #ef4444;
            color: #fca5a5;
            margin-bottom: 1.5rem;
            border-radius: 4px;
        }
        .help-text { font-size: 0.78rem; color: #8a8275; margin-top: 0.35rem; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <div class="brand">11:11 DECOR</div>
                <p style="color: #8a8275; font-size: 0.85rem;">Edit Portfolio Project</p>
            </div>
            <div>
                <a href="portfolio.php" class="btn-secondary">&larr; Back to Portfolio</a>
            </div>
        </header>

        <?php if (!empty($error)): ?>
            <div class="error-box"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST" class="form-card">
            <div class="form-group">
                <label for="title">Project Title *</label>
                <input type="text" id="title" name="title" value="<?= htmlspecialchars($project['title'] ?? '') ?>" required>
            </div>

            <!-- Dedicated URL Slug Input -->
            <div class="form-group">
                <label for="slug">URL Slug * (Permanent Web Address)</label>
                <div class="slug-input-wrapper">
                    <span class="slug-prefix">/portfolio/</span>
                    <input type="text" id="slug" name="slug" value="<?= htmlspecialchars($project['slug'] ?? '') ?>" required>
                    <span class="slug-prefix">/</span>
                </div>
                <p class="help-text">Live link: <code>https://elevenelevendecor.com/portfolio/<span id="slug-preview"><?= htmlspecialchars($project['slug'] ?? '') ?></span>/</code></p>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="subtitle">Subtitle / Tagline</label>
                    <input type="text" id="subtitle" name="subtitle" value="<?= htmlspecialchars($project['subtitle'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category">
                        <?php foreach (['Weddings', 'Corporate', 'Birthdays', 'Engagements', 'Private', 'Destination'] as $cat): ?>
                            <option value="<?= $cat ?>" <?= ($project['category'] ?? '') === $cat ? 'selected' : '' ?>><?= $cat ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" id="location" name="location" value="<?= htmlspecialchars($project['location'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="venue">Venue Name</label>
                    <input type="text" id="venue" name="venue" value="<?= htmlspecialchars($project['venue'] ?? '') ?>">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="guestCount">Guest Count</label>
                    <input type="number" id="guestCount" name="guestCount" value="<?= htmlspecialchars((string)($project['guestCount'] ?? 0)) ?>">
                </div>
                
                <!-- Hero Image Upload with Direct File Picker & Dropzone -->
                <div class="form-group">
                    <label>Hero Cover Photo</label>
                    <div class="dropzone-box" onclick="document.getElementById('hero-file-input').click()">
                        <p style="color: #a39c90; font-size: 0.85rem;">📁 Drag &amp; drop to replace image or click to browse</p>
                        <button type="button" class="btn-upload">Choose File</button>
                        <input type="file" id="hero-file-input" accept="image/*" style="display: none;" onchange="uploadImageFile(this.files[0], 'heroImage', 'hero-preview')">
                        <?php if (!empty($project['heroImage'])): ?>
                            <img id="hero-preview" class="dropzone-preview" src="<?= htmlspecialchars($project['heroImage']) ?>" alt="Preview" style="display: block;">
                        <?php else: ?>
                            <img id="hero-preview" class="dropzone-preview" alt="Preview" style="display: none;">
                        <?php endif; ?>
                    </div>
                    <input type="text" id="heroImage" name="heroImage" value="<?= htmlspecialchars($project['heroImage'] ?? '') ?>" style="margin-top: 0.5rem;" oninput="updatePreviewFromUrl(this.value, 'hero-preview')">
                </div>
            </div>

            <div class="form-group">
                <label for="summary">Summary / Overview</label>
                <textarea id="summary" name="summary" rows="3"><?= htmlspecialchars($project['summary'] ?? '') ?></textarea>
            </div>

            <!-- Gallery Images with Multi-Uploader -->
            <div class="form-group">
                <label for="galleryImages">Gallery Images (One URL per line)</label>
                <div style="margin-bottom: 0.5rem;">
                    <label class="btn-upload" style="display: inline-block; cursor: pointer;">
                        + Upload Additional Photos to Gallery
                        <input type="file" multiple accept="image/*" style="display: none;" onchange="uploadMultipleGalleryFiles(this.files)">
                    </label>
                    <span id="gallery-upload-status" style="font-size: 0.8rem; color: #86efac; margin-left: 0.75rem;"></span>
                </div>
                <textarea id="galleryImages" name="galleryImages" rows="4" oninput="renderGalleryPreviews()"><?= htmlspecialchars(implode("\n", $project['galleryImages'] ?? [])) ?></textarea>
                <div id="gallery-preview-container" style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.75rem;"></div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="planningDetails">Planning Details (One per line)</label>
                    <textarea id="planningDetails" name="planningDetails" rows="3"><?= htmlspecialchars(implode("\n", $project['planningDetails'] ?? [])) ?></textarea>
                </div>
                <div class="form-group">
                    <label for="decorHighlights">Decor Highlights (One per line)</label>
                    <textarea id="decorHighlights" name="decorHighlights" rows="3"><?= htmlspecialchars(implode("\n", $project['decorHighlights'] ?? [])) ?></textarea>
                </div>
            </div>

            <div class="form-group">
                <label for="executionNotes">Execution &amp; Production Notes</label>
                <textarea id="executionNotes" name="executionNotes" rows="3"><?= htmlspecialchars($project['executionNotes'] ?? '') ?></textarea>
            </div>

            <div class="form-group" style="display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem;">
                <input type="checkbox" id="published" name="published" value="1" <?= !empty($project['published']) ? 'checked' : '' ?> style="width: 20px; height: 20px; accent-color: #c9a96e;">
                <label for="published" style="margin-bottom: 0; color: #ffffff; text-transform: none; font-size: 0.95rem; cursor: pointer;">
                    Publish immediately to live portfolio
                </label>
            </div>

            <div style="margin-top: 2rem; display: flex; justify-content: flex-end;">
                <a href="portfolio.php" class="btn-secondary">Cancel</a>
                <button type="submit" class="btn-primary">Update Project</button>
            </div>
        </form>
    </div>

    <script>
    document.getElementById('slug').addEventListener('input', function() {
        document.getElementById('slug-preview').textContent = this.value.trim() || 'project-slug';
    });

    async function uploadImageFile(file, inputId, previewId) {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('../api/upload-image.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.url) {
                document.getElementById(inputId).value = data.url;
                const preview = document.getElementById(previewId);
                preview.src = data.url;
                preview.style.display = 'block';
            } else {
                alert('Upload error: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            alert('Failed to upload image');
        }
    }

    async function uploadMultipleGalleryFiles(files) {
        if (!files || files.length === 0) return;
        const status = document.getElementById('gallery-upload-status');
        status.textContent = `Uploading ${files.length} images...`;
        const textarea = document.getElementById('galleryImages');

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            try {
                const res = await fetch('../api/upload-image.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.url) {
                    textarea.value = (textarea.value.trim() + '\n' + data.url).trim();
                    renderGalleryPreviews();
                }
            } catch (err) {
                console.error(err);
            }
        }
        status.textContent = 'Upload complete!';
        renderGalleryPreviews();
        setTimeout(() => { status.textContent = ''; }, 3000);
    }

    function renderGalleryPreviews() {
        const textarea = document.getElementById('galleryImages');
        const container = document.getElementById('gallery-preview-container');
        if (!textarea || !container) return;
        const urls = textarea.value.split('\n').map(u => u.trim()).filter(Boolean);
        container.innerHTML = '';
        urls.forEach((url, idx) => {
            const item = document.createElement('div');
            item.style.position = 'relative';
            item.style.width = '90px';
            item.style.height = '70px';
            item.style.borderRadius = '6px';
            item.style.overflow = 'hidden';
            item.style.border = '1px solid rgba(201, 169, 110, 0.4)';
            item.style.background = '#242424';
            
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.onerror = () => { img.style.display = 'none'; };
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.innerHTML = '&times;';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '2px';
            removeBtn.style.right = '2px';
            removeBtn.style.background = 'rgba(0,0,0,0.75)';
            removeBtn.style.color = '#ff6b6b';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '50%';
            removeBtn.style.width = '20px';
            removeBtn.style.height = '20px';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.fontSize = '14px';
            removeBtn.style.lineHeight = '1';
            removeBtn.title = 'Remove image';
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                urls.splice(idx, 1);
                textarea.value = urls.join('\n');
                renderGalleryPreviews();
            };
            
            item.appendChild(img);
            item.appendChild(removeBtn);
            container.appendChild(item);
        });
    }

    function updatePreviewFromUrl(url, previewId) {
        const preview = document.getElementById(previewId);
        if (!preview) return;
        if (url && (url.startsWith('http') || url.startsWith('/'))) {
            preview.src = url;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderGalleryPreviews();
    });
    </script>
</body>
</html>
