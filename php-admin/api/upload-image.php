<?php
/**
 * 11:11 Decor — Inline Image Upload API for Block Editor
 */
session_start();

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error occurred']);
    exit;
}

$file = $_FILES['file'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5 MB

if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, and WebP are allowed.']);
    exit;
}

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File size exceeds 5MB limit.']);
    exit;
}

$uploadDir = dirname(__DIR__) . '/manage-7f3b9x2k/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$origName = pathinfo($file['name'], PATHINFO_FILENAME);
$cleanName = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $origName), '-'));
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = ($cleanName ? $cleanName : 'image') . '-' . uniqid() . '.' . $extension;
$destination = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $publicBase = dirname(__DIR__, 2) . '/public';
    $publicUploadDir = $publicBase . '/uploads/';
    $publicManageUploadDir = $publicBase . '/manage-7f3b9x2k/uploads/';
    
    if (is_dir($publicBase)) {
        if (!is_dir($publicUploadDir)) {
            @mkdir($publicUploadDir, 0755, true);
        }
        if (!is_dir($publicManageUploadDir)) {
            @mkdir($publicManageUploadDir, 0755, true);
        }
        @copy($destination, $publicUploadDir . $filename);
        @copy($destination, $publicManageUploadDir . $filename);
    }
    $url = '/manage-7f3b9x2k/uploads/' . $filename;
    echo json_encode(['url' => $url]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
}
