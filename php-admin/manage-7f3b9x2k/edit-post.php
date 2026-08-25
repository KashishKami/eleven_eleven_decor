<?php
/**
 * 11:11 Decor — Edit Blog Post
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
$categories = [
    'wedding-planning' => 'Wedding Planning',
    'event-planning' => 'Event Planning',
    'decoration-ideas' => 'Decoration Ideas',
    'corporate-events' => 'Corporate Events',
    'venue-destination-events' => 'Venue & Destination Events',
];

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

    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $id]);
    $post = $stmt->fetch();

    if (!$post) {
        header('Location: dashboard.php');
        exit;
    }
} catch (Exception $e) {
    die("Database error: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $slug = trim($_POST['slug'] ?? '');
    $category = trim($_POST['category'] ?? 'wedding-planning');
    $category_name = $categories[$category] ?? 'General';
    $excerpt = trim($_POST['excerpt'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $author = trim($_POST['author'] ?? '1111 Decor Team');
    $read_time = trim($_POST['read_time'] ?? '5 min read');
    $published = isset($_POST['published']) ? 1 : 0;
    $related_service_slug = trim($_POST['related_service_slug'] ?? '');
    $related_service_name = trim($_POST['related_service_name'] ?? '');
    $image_url = trim($_POST['image_url'] ?? $post['image']);

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
            $newFileName = $slug . '-' . uniqid() . '.' . $extension;
            $destPath = $uploadDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $destPath)) {
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
            $updateStmt = $pdo->prepare("UPDATE blog_posts SET title = :title, slug = :slug, category = :category, category_name = :category_name, excerpt = :excerpt, content = :content, author = :author, image = :image, read_time = :read_time, published = :published, related_service_slug = :related_service_slug, related_service_name = :related_service_name WHERE id = :id");

            $updateStmt->execute([
                ':title' => $title,
                ':slug' => $slug,
                ':category' => $category,
                ':category_name' => $category_name,
                ':excerpt' => $excerpt,
                ':content' => $content,
                ':author' => $author,
                ':image' => $image_url,
                ':read_time' => $read_time,
                ':published' => $published,
                ':related_service_slug' => $related_service_slug,
                ':related_service_name' => $related_service_name,
                ':id' => $id,
            ]);

            header('Location: dashboard.php?updated=1');
            exit;
        } catch (PDOException $e) {
            $error = 'Database update error: ' . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Post #<?= $id ?> — 11:11 Decor</title>
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
            max-width: 900px;
            margin: 0 auto;
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(201, 169, 110, 0.2);
            margin-bottom: 2rem;
        }
        .brand {
            font-family: Georgia, serif;
            font-size: 1.5rem;
            color: #c9a96e;
        }
        .form-card {
            background: #1a1a1a;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 2rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        label {
            display: block;
            font-size: 0.85rem;
            color: #c9a96e;
            margin-bottom: 0.5rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        input[type="text"], select, textarea {
            width: 100%;
            padding: 0.85rem;
            background: #242424;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            color: #ffffff;
            font-size: 0.95rem;
            outline: none;
            font-family: inherit;
        }
        input:focus, select:focus, textarea:focus {
            border-color: #c9a96e;
        }
        textarea {
            resize: vertical;
        }
        .btn-submit {
            padding: 0.9rem 2rem;
            background: #c9a96e;
            color: #111111;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-cancel {
            padding: 0.9rem 1.5rem;
            background: transparent;
            color: #8a8275;
            text-decoration: none;
            font-size: 0.95rem;
            margin-left: 1rem;
        }
        .error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #fca5a5;
            padding: 0.85rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        .checkbox-label {
            display: flex;
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
                <p style="color: #8a8275; font-size: 0.85rem;">Edit Article #<?= $id ?></p>
            </div>
            <a href="dashboard.php" class="btn-cancel">&larr; Back to Dashboard</a>
        </header>

        <?php if (!empty($error)): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <div class="form-card">
            <form method="POST" action="" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="title">Article Title *</label>
                    <input type="text" id="title" name="title" required value="<?= htmlspecialchars($post['title']) ?>">
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="slug">URL Slug *</label>
                        <input type="text" id="slug" name="slug" required value="<?= htmlspecialchars($post['slug']) ?>">
                    </div>
                    <div class="form-group">
                        <label for="category">Category *</label>
                        <select id="category" name="category">
                            <?php foreach ($categories as $catKey => $catLabel): ?>
                                <option value="<?= $catKey ?>" <?= $post['category'] === $catKey ? 'selected' : '' ?>><?= $catLabel ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="author">Author Name</label>
                        <input type="text" id="author" name="author" value="<?= htmlspecialchars($post['author']) ?>">
                    </div>
                    <div class="form-group">
                        <label for="read_time">Estimated Read Time</label>
                        <input type="text" id="read_time" name="read_time" value="<?= htmlspecialchars($post['read_time']) ?>">
                    </div>
                </div>

                <div class="form-group">
                    <label for="excerpt">Brief Excerpt *</label>
                    <textarea id="excerpt" name="excerpt" rows="3" required><?= htmlspecialchars($post['excerpt']) ?></textarea>
                </div>

                <div class="form-group">
                    <label for="content">Full Article Body *</label>
                    <textarea id="content" name="content" rows="12" required><?= htmlspecialchars($post['content']) ?></textarea>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="image_file">Replace Feature Image</label>
                        <input type="file" id="image_file" name="image_file" accept="image/jpeg,image/png,image/webp">
                    </div>
                    <div class="form-group">
                        <label for="image_url">Image URL</label>
                        <input type="text" id="image_url" name="image_url" value="<?= htmlspecialchars($post['image']) ?>">
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="related_service_slug">Related Service Slug</label>
                        <input type="text" id="related_service_slug" name="related_service_slug" value="<?= htmlspecialchars($post['related_service_slug'] ?? '') ?>">
                    </div>
                    <div class="form-group">
                        <label for="related_service_name">Related Service Label</label>
                        <input type="text" id="related_service_name" name="related_service_name" value="<?= htmlspecialchars($post['related_service_name'] ?? '') ?>">
                    </div>
                </div>

                <div class="form-group" style="margin-top: 1.5rem;">
                    <label class="checkbox-label">
                        <input type="checkbox" name="published" value="1" <?= $post['published'] ? 'checked' : '' ?> style="width: 18px; height: 18px;">
                        Published live on website
                    </label>
                </div>

                <div style="margin-top: 2rem;">
                    <button type="submit" class="btn-submit">Save Changes &rarr;</button>
                    <a href="dashboard.php" class="btn-cancel">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
