<?php
/**
 * 11:11 Decor — Delete Gallery Photo
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config.php';

$id = trim($_GET['id'] ?? '');

if (!empty($id)) {
    try {
        GalleryStore::delete($id);
    } catch (Exception $e) {
        // Log error
    }
}

header('Location: gallery.php');
exit;
