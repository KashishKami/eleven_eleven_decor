<?php
/**
 * 11:11 Decor — Delete Blog Post Handler
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

require_once __DIR__ . '/../config.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id > 0) {
    try {
        BlogStore::delete($id);
    } catch (Exception $e) {
        // Silently redirect
    }
}

header('Location: dashboard.php?deleted=1');
exit;
