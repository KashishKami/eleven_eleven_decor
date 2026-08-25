<?php
/**
 * 11:11 Decor — Admin Panel Login
 */
session_start();

if (file_exists(__DIR__ . '/../config.php')) {
    require_once __DIR__ . '/../config.php';
} else {
    die("config.php is missing. Please setup config.php first.");
}

$error = '';

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (password_verify($password, ADMIN_PASSWORD_HASH)) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_login_time'] = time();
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Invalid password. Please verify your credentials.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>11:11 Decor — Editorial Blog Studio</title>
    <meta name="robots" content="noindex, nofollow">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: #111111;
            color: #f5f0e8;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1.5rem;
        }
        .card {
            background: #1a1a1a;
            border: 1px solid rgba(201, 169, 110, 0.25);
            border-radius: 16px;
            width: 100%;
            max-width: 440px;
            padding: 2.5rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            text-align: center;
        }
        .brand {
            font-family: Georgia, serif;
            font-size: 1.85rem;
            color: #c9a96e;
            letter-spacing: 0.08em;
            margin-bottom: 0.5rem;
        }
        .subtitle {
            font-size: 0.85rem;
            color: #8a8275;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            margin-bottom: 2rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }
        label {
            display: block;
            font-size: 0.85rem;
            color: #c9a96e;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        input[type="password"] {
            width: 100%;
            padding: 0.85rem 1rem;
            background: #242424;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            color: #ffffff;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s;
        }
        input[type="password"]:focus {
            border-color: #c9a96e;
        }
        .btn {
            width: 100%;
            padding: 0.9rem;
            background: #c9a96e;
            color: #111111;
            border: none;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .btn:hover {
            background: #dfc28d;
        }
        .error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #fca5a5;
            padding: 0.75rem;
            border-radius: 8px;
            font-size: 0.85rem;
            margin-bottom: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="brand">11:11 DECOR</div>
        <div class="subtitle">Editorial Blog Studio</div>

        <?php if (!empty($error)): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="form-group">
                <label for="password">Admin Security Key</label>
                <input type="password" id="password" name="password" required autofocus placeholder="Enter your admin password">
            </div>
            <button type="submit" class="btn">Enter Studio &rarr;</button>
        </form>
    </div>
</body>
</html>
