<?php
/**
 * 11:11 Decor — Delete Venue Setting
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
        VenueStore::delete($id);
    } catch (Exception $e) {
        // Log error
    }
}

header('Location: venues.php');
exit;
