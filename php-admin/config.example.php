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
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isLocalDev = !empty($requestOrigin) && (
    strpos($requestOrigin, 'localhost') !== false ||
    strpos($requestOrigin, '127.0.0.1') !== false
);
define('CORS_ORIGIN', $isLocalDev ? $requestOrigin : 'https://elevenelevendecor.com');

// Admin Panel Password Hash (Generate using password_hash('YourSecretPassword', PASSWORD_BCRYPT))
// Default hash below is for password: "AdminPassword1111!"
define('ADMIN_PASSWORD_HASH', '$2y$10$w3U6R7Qo0dK1X9z8E4o3UeFhG7mQ5vK6y9n8p3X4r7a8B9c0D1e2F');

// Session Configuration
define('SESSION_LIFETIME', 7200); // 2 hours

// ─── Contact Form Email Settings ─────────────────────────────────────────────
// CONTACT_EMAIL    — The inbox that receives every form submission.
//                    Change to your real business email before deploying.
// CONTACT_FROM_EMAIL — The "From:" address GoDaddy uses when sending.
//                    MUST match a domain hosted on this GoDaddy account to avoid
//                    being silently blocked (e.g. noreply@yourdomain.com).
define('CONTACT_EMAIL',      'support1111decor@gmail.com');
define('CONTACT_FROM_EMAIL', 'noreply@1111decor.com');

// ─── SMTP Email Settings (Recommended for 99.9% Inbox Delivery) ─────────────
// Set to true to send through an authenticated SMTP provider (Gmail, GoDaddy, Outlook)
// instead of GoDaddy's default server mailer.
define('SMTP_ENABLED', false);
define('SMTP_HOST',    'smtp.gmail.com');             // For Gmail: smtp.gmail.com | For GoDaddy: smtpout.secureserver.net
define('SMTP_PORT',    587);                          // 587 (TLS) or 465 (SSL)
define('SMTP_SECURE',  'tls');                        // 'tls' or 'ssl'
define('SMTP_USER',    'your-email@gmail.com');       // Your full sending email address
define('SMTP_PASS',    'your-16-char-app-password');  // Google 16-letter App Password or mailbox password

/**
 * Resolves the active data storage directory.
 * When the TEST_DATA_DIR environment variable is set (e.g. during automated tests),
 * all data reads and writes are directed to that isolated directory instead of live production data.
 */
function get_data_dir() {
    $custom = getenv('TEST_DATA_DIR');
    $dir = !empty($custom) ? rtrim($custom, '/\\') : (__DIR__ . '/data');
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}

/**
 * Checks whether a given content section (blog, gallery, portfolio, venues)
 * is publicly visible according to data/page-visibility.json or environment overrides.
 */
function is_section_visible($section) {
    $envKey = 'VISIBILITY_' . strtoupper($section);
    $envVal = getenv($envKey);
    if ($envVal !== false && $envVal !== '') {
        return $envVal === '1' || $envVal === 'true';
    }
    $visFile = get_data_dir() . '/page-visibility.json';
    if (!file_exists($visFile)) {
        return false;
    }
    $data = json_decode(file_get_contents($visFile), true);
    if (!is_array($data)) {
        return false;
    }
    return !empty($data[$section]);
}

global $GLOBAL_TAGS_MAP;
$GLOBAL_TAGS_MAP = [
    'event-ideas' => 'Event Ideas',
    'event-planning' => 'Event Planning',
    'event-decoration' => 'Event Decoration',
    'event-management' => 'Event Management',
    'party-ideas' => 'Party Ideas',
    'party-decoration' => 'Party Decoration',
    'wedding-ideas' => 'Wedding Ideas',
    'wedding-decoration' => 'Wedding Decoration',
    'birthday-ideas' => 'Birthday Ideas',
    'birthday-decoration' => 'Birthday Decoration',
    'event-themes' => 'Event Themes',
    'decoration-ideas' => 'Decoration Ideas',
    'event-trends' => 'Event Trends',
    'celebration-ideas' => 'Celebration Ideas',
    'event-inspiration' => 'Event Inspiration',
];

function item_matches_tag($item, $targetTag) {
    if (empty($targetTag)) return true;
    $rawTags = $item['tags'] ?? [];
    if (is_string($rawTags)) {
        $rawTags = array_map('trim', explode(',', $rawTags));
    }
    if (!is_array($rawTags)) return false;
    $target = strtolower(trim($targetTag));
    foreach ($rawTags as $t) {
        $tSlug = strtolower(trim($t));
        if ($tSlug === $target || str_replace(' ', '-', $tSlug) === $target) {
            return true;
        }
    }
    return false;
}

/**
 * File-based JSON Blog Store Helper for Local Dev & Staging
 */
class BlogStore {
    private static function getFilePath() {
        return get_data_dir() . '/posts.json';
    }

    public static function all($publishedOnly = true, $category = null, $tag = null) {
        $file = self::getFilePath();
        if (!file_exists($file)) return [];
        $json = file_get_contents($file);
        $posts = json_decode($json, true) ?: [];

        if ($publishedOnly) {
            $posts = array_filter($posts, function($p) {
                return !empty($p['published']);
            });
        }

        if ($category !== null && $category !== '') {
            $catLower = strtolower($category);
            $posts = array_filter($posts, function($p) use ($catLower) {
                $pCat = strtolower($p['category'] ?? '');
                $pCatName = strtolower($p['category_name'] ?? '');
                return $pCat === $catLower || str_replace(' ', '-', $pCatName) === $catLower;
            });
        }

        if ($tag !== null && $tag !== '') {
            $posts = array_filter($posts, function($p) use ($tag) {
                return item_matches_tag($p, $tag);
            });
        }

        return array_values($posts);
    }

    public static function findById($id) {
        $posts = self::all(false);
        foreach ($posts as $p) {
            if ((int)$p['id'] === (int)$id) return $p;
        }
        return null;
    }

    public static function findBySlug($slug) {
        $posts = self::all(false);
        foreach ($posts as $p) {
            if (strtolower($p['slug'] ?? '') === strtolower($slug)) return $p;
        }
        return null;
    }

    public static function extractFaqs($html) {
        if (empty($html) || !is_string($html)) return [];
        $faqs = [];
        if (preg_match_all('/<details[^>]*>([\s\S]*?)<\/details>/i', $html, $matches)) {
            foreach ($matches[1] as $inner) {
                if (preg_match('/<summary[^>]*>([\s\S]*?)<\/summary>/i', $inner, $sumMatch)) {
                    $q = trim(strip_tags($sumMatch[1]));
                    $withoutSummary = preg_replace('/<summary[^>]*>[\s\S]*?<\/summary>/i', '', $inner);
                    $a = trim(preg_replace('/\s+/', ' ', strip_tags($withoutSummary)));
                    if (!empty($q) && !empty($a)) {
                        $faqs[] = [
                            'question' => $q,
                            'answer' => $a,
                        ];
                    }
                }
            }
        }
        return $faqs;
    }

    public static function save($postData) {
        $file = self::getFilePath();
        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $posts = self::all(false);

        if (empty($postData['faqs']) && !empty($postData['content'])) {
            $extracted = self::extractFaqs($postData['content']);
            if (!empty($extracted)) {
                $postData['faqs'] = $extracted;
            }
        }

        if (isset($postData['id']) && (int)$postData['id'] > 0) {
            $id = (int)$postData['id'];
            $found = false;
            $savedPost = null;
            foreach ($posts as $idx => $p) {
                if ((int)$p['id'] === $id) {
                    $posts[$idx] = array_merge($p, $postData);
                    $savedPost = $posts[$idx];
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $posts[] = $postData;
                $savedPost = $postData;
            }
        } else {
            $maxId = 0;
            foreach ($posts as $p) {
                if ((int)($p['id'] ?? 0) > $maxId) {
                    $maxId = (int)$p['id'];
                }
            }
            $postData['id'] = $maxId + 1;
            if (empty($postData['created_at'])) {
                $postData['created_at'] = date('Y-m-d H:i:s');
            }
            $posts[] = $postData;
            $savedPost = $postData;
        }

        file_put_contents($file, json_encode(array_values($posts), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $savedPost;
    }

    public static function delete($id) {
        $file = self::getFilePath();
        $posts = self::all(false);
        $filtered = array_filter($posts, function($p) use ($id) {
            return (int)$p['id'] !== (int)$id;
        });
        file_put_contents($file, json_encode(array_values($filtered), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return true;
    }
}

/**
 * File-based JSON Portfolio Store Helper
 */
class PortfolioStore {
    private static function getFilePath() {
        return get_data_dir() . '/portfolio.json';
    }

    public static function all($publishedOnly = true, $category = null, $tag = null) {
        $file = self::getFilePath();
        if (!file_exists($file)) return [];
        $json = file_get_contents($file);
        $items = json_decode($json, true) ?: [];

        if ($publishedOnly) {
            $items = array_filter($items, function($item) {
                return !empty($item['published']);
            });
        }

        if ($category !== null && $category !== '') {
            $catLower = strtolower($category);
            $items = array_filter($items, function($item) use ($catLower) {
                $itemCat = strtolower($item['category'] ?? '');
                return $itemCat === $catLower || str_replace(' ', '-', $itemCat) === $catLower;
            });
        }

        if ($tag !== null && $tag !== '') {
            $items = array_filter($items, function($item) use ($tag) {
                return item_matches_tag($item, $tag);
            });
        }

        return array_values($items);
    }

    public static function find($id) {
        return self::findById($id);
    }

    public static function findById($id) {
        $items = self::all(false);
        foreach ($items as $item) {
            if ((string)($item['id'] ?? '') === (string)$id) return $item;
        }
        return null;
    }

    public static function findBySlug($slug) {
        $items = self::all(false);
        foreach ($items as $item) {
            if (strtolower($item['slug'] ?? '') === strtolower($slug)) return $item;
        }
        return null;
    }

    public static function save($data) {
        $file = self::getFilePath();
        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $items = self::all(false);

        if (isset($data['id']) && !empty($data['id'])) {
            $id = (string)$data['id'];
            $found = false;
            foreach ($items as $idx => $item) {
                if ((string)($item['id'] ?? '') === $id) {
                    $data['updated_at'] = date('Y-m-d H:i:s');
                    $items[$idx] = array_merge($item, $data);
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $data['id'] = $id;
                $items[] = $data;
            }
        } else {
            $maxId = 0;
            foreach ($items as $item) {
                if ((int)($item['id'] ?? 0) > $maxId) {
                    $maxId = (int)$item['id'];
                }
            }
            $id = (string)($maxId + 1);
            $data['id'] = $id;
            if (empty($data['created_at'])) {
                $data['created_at'] = date('Y-m-d H:i:s');
            }
            $items[] = $data;
        }

        file_put_contents($file, json_encode(array_values($items), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return (string)$id;
    }

    public static function delete($id) {
        $file = self::getFilePath();
        $items = self::all(false);
        $filtered = array_filter($items, function($item) use ($id) {
            return (string)($item['id'] ?? '') !== (string)$id;
        });
        file_put_contents($file, json_encode(array_values($filtered), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return true;
    }
}

/**
 * File-based JSON Venue Store Helper
 */
class VenueStore {
    private static function getFilePath() {
        return get_data_dir() . '/venues.json';
    }

    public static function all($publishedOnly = true, $spaceType = null, $tag = null) {
        $file = self::getFilePath();
        if (!file_exists($file)) return [];
        $json = file_get_contents($file);
        $items = json_decode($json, true) ?: [];

        if ($publishedOnly) {
            $items = array_filter($items, function($item) {
                return !empty($item['published']);
            });
        }

        if ($spaceType !== null && $spaceType !== '') {
            $stLower = strtolower($spaceType);
            $items = array_filter($items, function($item) use ($stLower) {
                $itemSt = strtolower($item['spaceType'] ?? '');
                return stripos($itemSt, $stLower) !== false;
            });
        }

        if ($tag !== null && $tag !== '') {
            $items = array_filter($items, function($item) use ($tag) {
                return item_matches_tag($item, $tag);
            });
        }

        return array_values($items);
    }

    public static function find($id) {
        return self::findById($id);
    }

    public static function findById($id) {
        $items = self::all(false);
        foreach ($items as $item) {
            if ((string)($item['id'] ?? '') === (string)$id) return $item;
        }
        return null;
    }

    public static function findBySlug($slug) {
        $items = self::all(false);
        foreach ($items as $item) {
            if (strtolower($item['slug'] ?? '') === strtolower($slug)) return $item;
        }
        return null;
    }

    public static function save($data) {
        $file = self::getFilePath();
        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $items = self::all(false);

        if (isset($data['id']) && !empty($data['id'])) {
            $id = (string)$data['id'];
            $found = false;
            foreach ($items as $idx => $item) {
                if ((string)($item['id'] ?? '') === $id) {
                    $data['updated_at'] = date('Y-m-d H:i:s');
                    $items[$idx] = array_merge($item, $data);
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $data['id'] = $id;
                $items[] = $data;
            }
        } else {
            $maxId = 0;
            foreach ($items as $item) {
                if ((int)($item['id'] ?? 0) > $maxId) {
                    $maxId = (int)$item['id'];
                }
            }
            $id = (string)($maxId + 1);
            $data['id'] = $id;
            if (empty($data['created_at'])) {
                $data['created_at'] = date('Y-m-d H:i:s');
            }
            $items[] = $data;
        }

        file_put_contents($file, json_encode(array_values($items), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return (string)$id;
    }

    public static function delete($id) {
        $file = self::getFilePath();
        $items = self::all(false);
        $filtered = array_filter($items, function($item) use ($id) {
            return (string)($item['id'] ?? '') !== (string)$id;
        });
        file_put_contents($file, json_encode(array_values($filtered), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return true;
    }
}

/**
 * File-based JSON Gallery Store Helper
 */
class GalleryStore {
    private static function getFilePath() {
        return get_data_dir() . '/gallery.json';
    }

    public static function all($publishedOnly = true, $category = null, $tag = null) {
        $file = self::getFilePath();
        if (!file_exists($file)) return [];
        $json = file_get_contents($file);
        $items = json_decode($json, true) ?: [];

        if ($publishedOnly) {
            $items = array_filter($items, function($item) {
                return !empty($item['published']);
            });
        }

        if ($category !== null && $category !== '') {
            $catLower = strtolower($category);
            $items = array_filter($items, function($item) use ($catLower) {
                $itemCat = strtolower($item['category'] ?? '');
                return $itemCat === $catLower || str_replace(' ', '-', $itemCat) === $catLower;
            });
        }

        if ($tag !== null && $tag !== '') {
            $items = array_filter($items, function($item) use ($tag) {
                return item_matches_tag($item, $tag);
            });
        }

        return array_values($items);
    }

    public static function find($id) {
        return self::findById($id);
    }

    public static function findById($id) {
        $items = self::all(false);
        foreach ($items as $item) {
            if ((string)($item['id'] ?? '') === (string)$id) return $item;
        }
        return null;
    }

    public static function save($data) {
        $file = self::getFilePath();
        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $items = self::all(false);

        if (isset($data['id']) && !empty($data['id'])) {
            $id = (string)$data['id'];
            $found = false;
            foreach ($items as $idx => $item) {
                if ((string)($item['id'] ?? '') === $id) {
                    $data['updated_at'] = date('Y-m-d H:i:s');
                    $items[$idx] = array_merge($item, $data);
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $data['id'] = $id;
                $items[] = $data;
            }
        } else {
            $maxId = 0;
            foreach ($items as $item) {
                if ((int)($item['id'] ?? 0) > $maxId) {
                    $maxId = (int)$item['id'];
                }
            }
            $id = (string)($maxId + 1);
            $data['id'] = $id;
            if (empty($data['created_at'])) {
                $data['created_at'] = date('Y-m-d H:i:s');
            }
            $items[] = $data;
        }

        file_put_contents($file, json_encode(array_values($items), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return (string)$id;
    }

    public static function delete($id) {
        $file = self::getFilePath();
        $items = self::all(false);
        $filtered = array_filter($items, function($item) use ($id) {
            return (string)($item['id'] ?? '') !== (string)$id;
        });
        file_put_contents($file, json_encode(array_values($filtered), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return true;
    }
}

