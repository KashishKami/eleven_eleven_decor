<?php
/**
 * 11:11 Decor — PHP Blog Admin Configuration Template
 * Rename this file to config.php on the GoDaddy server and fill in your MySQL credentials.
 */

// MySQL Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'elevendecor_blog');
define('DB_USER', 'elevendecor_user');
define('DB_PASS', 'YOUR_STRONG_DATABASE_PASSWORD');

// Allowed Origins for CORS (Public domain where your Next.js site lives)
define('CORS_ORIGIN', 'https://elevenelevendecor.com');

// Admin Panel Password Hash (Generate using password_hash('YourSecretPassword', PASSWORD_BCRYPT))
// Default hash below is for password: "AdminPassword1111!"
define('ADMIN_PASSWORD_HASH', '$2y$10$w3U6R7Qo0dK1X9z8E4o3UeFhG7mQ5vK6y9n8p3X4r7a8B9c0D1e2F');

// Session Configuration
define('SESSION_LIFETIME', 7200); // 2 hours
