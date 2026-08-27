<?php
/**
 * 11:11 Decor — Edit Gallery Photo
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config.php';

$id = trim($_GET['id'] ?? '');
$photo = GalleryStore::find($id);

if (!$photo) {
    header('Location: gallery.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $category = trim($_POST['category'] ?? 'Weddings');
    $aspectRatio = trim($_POST['aspectRatio'] ?? 'landscape');
    $src = trim($_POST['src'] ?? '');
    $published = isset($_POST['published']) ? 1 : 0;

    if (empty($title)) {
        $error = 'Photo title is required.';
    } elseif (empty($src)) {
        $error = 'Please upload or provide an image URL.';
    } else {
        try {
            GalleryStore::save([
                'id' => $id,
                'title' => $title,
                'category' => $category,
                'aspectRatio' => $aspectRatio,
                'src' => $src,
                'published' => $published
            ]);
            header('Location: gallery.php');
            exit;
        } catch (Exception $e) {
            $error = 'Failed to update photo: ' . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Photo — 11:11 Decor</title>
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
        .container { max-width: 800px; margin: 0 auto; }
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
        input[type="text"], select {
            width: 100%;
            padding: 0.85rem 1rem;
            background: #242424;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            color: #ffffff;
            font-size: 0.95rem;
            font-family: inherit;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #c9a96e;
            box-shadow: 0 0 0 2px rgba(201, 169, 110, 0.2);
        }

        .dropzone-box {
            border: 2px dashed rgba(201, 169, 110, 0.3);
            border-radius: 8px;
            padding: 2rem;
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
            max-height: 220px;
            border-radius: 6px;
            margin-top: 1rem;
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
                <p style="color: #8a8275; font-size: 0.85rem;">Edit Gallery Photo</p>
            </div>
            <div>
                <a href="gallery.php" class="btn-secondary">&larr; Back to Gallery</a>
            </div>
        </header>

        <?php if (!empty($error)): ?>
            <div class="error-box"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST" class="form-card">
            <div class="form-group">
                <label for="title">Photo Title / Caption *</label>
                <input type="text" id="title" name="title" value="<?= htmlspecialchars($photo['title'] ?? '') ?>" required>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category">
                        <?php foreach (['Weddings', 'Corporate Events', 'Birthdays', 'Engagements', 'Décor', 'Stage Designs', 'Venue Designs'] as $cat): ?>
                            <option value="<?= $cat ?>" <?= ($photo['category'] ?? '') === $cat ? 'selected' : '' ?>><?= $cat ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-group">
                    <label for="aspectRatio">Aspect Ratio</label>
                    <select id="aspectRatio" name="aspectRatio">
                        <?php foreach (['landscape' => 'Landscape (Horizontal)', 'portrait' => 'Portrait (Vertical)', 'square' => 'Square (1:1)'] as $val => $lbl): ?>
                            <option value="<?= $val ?>" <?= ($photo['aspectRatio'] ?? '') === $val ? 'selected' : '' ?>><?= $lbl ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>

            <!-- Image Upload Dropzone -->
            <div class="form-group">
                <label>Image File *</label>
                <div class="dropzone-box" onclick="document.getElementById('photo-file-input').click()">
                    <p style="color: #a39c90; font-size: 0.9rem;">📁 Drag &amp; drop to replace image or click to browse</p>
                    <button type="button" class="btn-upload">Choose File</button>
                    <input type="file" id="photo-file-input" accept="image/*" style="display: none;" onchange="uploadImageFile(this.files[0], 'src', 'photo-preview')">
                    <?php if (!empty($photo['src'])): ?>
                        <img id="photo-preview" class="dropzone-preview" src="<?= htmlspecialchars($photo['src']) ?>" alt="Preview" style="display: block;">
                    <?php else: ?>
                        <img id="photo-preview" class="dropzone-preview" alt="Preview" style="display: none;">
                    <?php endif; ?>
                </div>
                <input type="text" id="src" name="src" value="<?= htmlspecialchars($photo['src'] ?? '') ?>" style="margin-top: 0.5rem;" oninput="updatePreviewFromUrl(this.value, 'photo-preview')">
            </div>

            <div class="form-group" style="display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem;">
                <input type="checkbox" id="published" name="published" value="1" <?= !empty($photo['published']) ? 'checked' : '' ?> style="width: 20px; height: 20px; accent-color: #c9a96e;">
                <label for="published" style="margin-bottom: 0; color: #ffffff; text-transform: none; font-size: 0.95rem; cursor: pointer;">
                    Publish immediately to public gallery
                </label>
            </div>

            <div style="margin-top: 2rem; display: flex; justify-content: flex-end;">
                <a href="gallery.php" class="btn-secondary">Cancel</a>
                <button type="submit" class="btn-primary">Update Photo</button>
            </div>
        </form>
    </div>

    <script>
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
    </script>
</body>
</html>
