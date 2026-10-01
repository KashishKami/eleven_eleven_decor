<?php
/**
 * 11:11 Decor — Server Gateway & Real-Time Visibility Gatekeeper
 * Runs on GoDaddy Apache shared hosting.
 * Handles real-time 404 response codes for toggled OFF sections,
 * and routes dynamic new slugs (blogs, portfolio, venues) without requiring rebuilds.
 *
 * SEO Meta Injection: For new content items added via the CMS admin panel after
 * the last static build, this gateway reads the item data from the PHP data store
 * and injects the correct <title>, <meta description>, <link canonical>, Open Graph
 * tags, Twitter Card tags, and JSON-LD schema into the served HTML shell before
 * Googlebot (or any crawler) reads the page. Users see the correct page because
 * React fetches the live data on the client side regardless.
 */

$rootDir     = __DIR__;
$phpAdminDir = __DIR__ . '/php-admin';

// Load config and store classes if available
if (file_exists($phpAdminDir . '/config.php')) {
    require_once $phpAdminDir . '/config.php';
}

$uri   = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$uri   = trim($uri, '/');
$parts = array_values(array_filter(explode('/', $uri)));

$section = $parts[0] ?? '';
$slug    = !empty($parts) ? end($parts) : '';

$managedSections = ['blog', 'gallery', 'portfolio', 'venues'];

// ─── 1. Real-Time Visibility Gatekeeper ──────────────────────────────────────
if (in_array($section, $managedSections, true)) {
    $visFile = $phpAdminDir . '/data/page-visibility.json';
    if (file_exists($visFile)) {
        $visData = json_decode(file_get_contents($visFile), true);
        if (is_array($visData) && isset($visData[$section]) && empty($visData[$section])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) {
                include $rootDir . '/404.html';
            } else {
                echo "<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 — Section Disabled</h1></body></html>";
            }
            exit;
        }
    }
}

// ─── 2. Direct Static File Serving ───────────────────────────────────────────
// Top-level static pages baked into the build are served here directly.
// Dynamic detail pages (blog posts, portfolio, venues) bypass this to guarantee
// fresh real-time metadata, newly published articles, and FAQ schemas are always injected.
$isDynamicDetail = (
    ($section === 'blog' && count($parts) >= 3) ||
    ($section === 'portfolio' && !empty($slug) && $slug !== 'portfolio') ||
    ($section === 'venues' && !empty($slug) && $slug !== 'venues')
);

$cleanPath = $rootDir . '/' . $uri;
if (!$isDynamicDetail) {
    if (!empty($uri) && is_file($cleanPath)) {
        return false;
    }
    if (!empty($uri) && is_file($cleanPath . '/index.html')) {
        include $cleanPath . '/index.html';
        exit;
    }
    if (!empty($uri) && is_file($cleanPath . '.html')) {
        include $cleanPath . '.html';
        exit;
    }
}

// ─── SEO Meta Injection Helper ────────────────────────────────────────────────
/**
 * Reads a static HTML shell, replaces all key SEO meta tags with correct
 * per-item values, and injects JSON-LD schemas before </head>.
 * Safe on Next.js minified single-line HTML output.
 *
 * @param string $htmlFile  Absolute path to the static HTML shell to use as template.
 * @param array  $seo {
 *   title:       string  Full page <title> (will be HTML-escaped)
 *   description: string  Meta description (will be HTML-escaped)
 *   canonical:   string  Full canonical URL (https://...)
 *   ogType:      string  'article' | 'website' etc.
 *   ogImage:     string  Full image URL (optional)
 *   schemas:     array   Array of JSON-serialisable schema.org objects to inject
 * }
 * @return string  Modified HTML ready to echo, or empty string on failure.
 */
function injectSeoMeta(string $htmlFile, array $seo): string
{
    $html = file_get_contents($htmlFile);
    if ($html === false) {
        return '';
    }

    $title       = htmlspecialchars($seo['title']       ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $description = htmlspecialchars($seo['description'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $canonical   = htmlspecialchars($seo['canonical']   ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $ogType      = htmlspecialchars($seo['ogType']      ?? 'article', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $ogImage     = htmlspecialchars($seo['ogImage']     ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');

    // ── Core meta tags ────────────────────────────────────────────────────────
    $html = preg_replace('/<title>[^<]*<\/title>/', '<title>' . $title . '</title>', $html, 1);
    $html = preg_replace('/<meta name="description" content="[^"]*"\/>/', '<meta name="description" content="' . $description . '"/>', $html, 1);
    $html = preg_replace('/<link rel="canonical" href="[^"]*"\/>/', '<link rel="canonical" href="' . $canonical . '"/>', $html, 1);

    // ── Open Graph ────────────────────────────────────────────────────────────
    $html = preg_replace('/<meta property="og:title" content="[^"]*"\/>/', '<meta property="og:title" content="' . $title . '"/>', $html, 1);
    $html = preg_replace('/<meta property="og:description" content="[^"]*"\/>/', '<meta property="og:description" content="' . $description . '"/>', $html, 1);
    $html = preg_replace('/<meta property="og:url" content="[^"]*"\/>/', '<meta property="og:url" content="' . $canonical . '"/>', $html, 1);
    $html = preg_replace('/<meta property="og:type" content="[^"]*"\/>/', '<meta property="og:type" content="' . $ogType . '"/>', $html, 1);
    if (!empty($ogImage)) {
        if (preg_match('/<meta property="og:image"/', $html)) {
            $html = preg_replace('/<meta property="og:image" content="[^"]*"\/>/', '<meta property="og:image" content="' . $ogImage . '"/>', $html, 1);
        } else {
            // OG image tag not present in this shell — insert it before </head>
            $html = str_replace('</head>', '<meta property="og:image" content="' . $ogImage . '"/></head>', $html);
        }
    }

    // ── Twitter Card ─────────────────────────────────────────────────────────
    $html = preg_replace('/<meta name="twitter:title" content="[^"]*"\/>/', '<meta name="twitter:title" content="' . $title . '"/>', $html, 1);
    $html = preg_replace('/<meta name="twitter:description" content="[^"]*"\/>/', '<meta name="twitter:description" content="' . $description . '"/>', $html, 1);
    if (!empty($ogImage)) {
        $html = preg_replace('/<meta name="twitter:image" content="[^"]*"\/>/', '<meta name="twitter:image" content="' . $ogImage . '"/>', $html, 1);
    }

    // ── JSON-LD Schema Injection ──────────────────────────────────────────────
    // Injected right before </head> so Googlebot reads them immediately.
    // Multiple JSON-LD blocks on a page are fully valid per the schema.org spec.
    if (!empty($seo['schemas'])) {
        $schemaBlocks = '';
        foreach ($seo['schemas'] as $schema) {
            $schemaBlocks .= '<script type="application/ld+json">'
                . json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
                . '</script>';
        }
        $html = str_replace('</head>', $schemaBlocks . '</head>', $html);
    }

    return $html;
}

// ─── 3. Dynamic Slugs — SEO-Aware Fallback Serving ───────────────────────────

// ── PORTFOLIO ─────────────────────────────────────────────────────────────────
if ($section === 'portfolio' && !empty($slug) && $slug !== 'portfolio') {
    $item = null;
    if (class_exists('PortfolioStore')) {
        $item = PortfolioStore::findBySlug($slug);
        if (!$item || empty($item['published'])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) include $rootDir . '/404.html';
            exit;
        }
    }

    // Prefer the static file shell or an existing detail page as the HTML shell template
    $shellFile = null;
    if (is_file($cleanPath . '/index.html')) {
        $shellFile = $cleanPath . '/index.html';
    } elseif (is_file($cleanPath . '.html')) {
        $shellFile = $cleanPath . '.html';
    } else {
        $detailFiles = glob($rootDir . '/portfolio/*/index.html');
        if (!empty($detailFiles)) {
            $shellFile = $detailFiles[0];
        } elseif (file_exists($rootDir . '/portfolio/index.html')) {
            $shellFile = $rootDir . '/portfolio/index.html';
        }
    }

    if ($shellFile && $item) {
        $baseUrl   = rtrim(defined('CORS_ORIGIN') && CORS_ORIGIN !== '*' ? CORS_ORIGIN : 'https://1111decor.com', '/');
        $canonical = $baseUrl . '/portfolio/' . $item['slug'] . '/';
        $metaTitle = $item['metaTitle']       ?? (($item['title'] ?? $slug) . ' | 11:11 Decor Showcase');
        $metaDesc  = $item['metaDescription'] ?? ($item['summary'] ?? '');
        $ogImage   = $item['heroImage']       ?? '';

        $schemas = [
            [
                '@context'    => 'https://schema.org',
                '@type'       => 'CreativeWork',
                'name'        => $item['title'] ?? $slug,
                'description' => $metaDesc,
                'url'         => $canonical,
                'creator'     => ['@type' => 'Organization', 'name' => '11:11 Decor', 'url' => $baseUrl],
            ],
            [
                '@context'        => 'https://schema.org',
                '@type'           => 'BreadcrumbList',
                'itemListElement' => [
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home',      'item' => $baseUrl . '/'],
                    ['@type' => 'ListItem', 'position' => 2, 'name' => 'Portfolio', 'item' => $baseUrl . '/portfolio/'],
                    ['@type' => 'ListItem', 'position' => 3, 'name' => $item['title'] ?? $slug, 'item' => $canonical],
                ],
            ],
        ];
        if (!empty($ogImage)) {
            $schemas[0]['image'] = $ogImage;
        }

        $modifiedHtml = injectSeoMeta($shellFile, [
            'title'       => $metaTitle,
            'description' => $metaDesc,
            'canonical'   => $canonical,
            'ogType'      => 'website',
            'ogImage'     => $ogImage,
            'schemas'     => $schemas,
        ]);
        echo $modifiedHtml;
        exit;
    }

    // Fallback: serve shell without SEO modification (better than nothing)
    if ($shellFile) { include $shellFile; exit; }
    if (file_exists($rootDir . '/portfolio/index.html')) { include $rootDir . '/portfolio/index.html'; exit; }
}

// ── VENUES ────────────────────────────────────────────────────────────────────
if ($section === 'venues' && !empty($slug) && $slug !== 'venues') {
    $item = null;
    if (class_exists('VenueStore')) {
        $item = VenueStore::findBySlug($slug);
        if (!$item || empty($item['published'])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) include $rootDir . '/404.html';
            exit;
        }
    }

    // Prefer the static file shell or an existing venue detail page as the HTML shell template
    $shellFile = null;
    if (is_file($cleanPath . '/index.html')) {
        $shellFile = $cleanPath . '/index.html';
    } elseif (is_file($cleanPath . '.html')) {
        $shellFile = $cleanPath . '.html';
    } else {
        $detailFiles = glob($rootDir . '/venues/*/index.html');
        if (!empty($detailFiles)) {
            $shellFile = $detailFiles[0];
        } elseif (file_exists($rootDir . '/venues/index.html')) {
            $shellFile = $rootDir . '/venues/index.html';
        }
    }

    if ($shellFile && $item) {
        $baseUrl   = rtrim(defined('CORS_ORIGIN') && CORS_ORIGIN !== '*' ? CORS_ORIGIN : 'https://1111decor.com', '/');
        $canonical = $baseUrl . '/venues/' . $item['slug'] . '/';
        $metaTitle = $item['metaTitle']       ?? (($item['name'] ?? $slug) . ' | 11:11 Decor Curated Venues');
        $metaDesc  = $item['metaDescription'] ?? ($item['summary'] ?? '');
        $ogImage   = $item['heroImage']       ?? '';

        $schemas = [
            [
                '@context'    => 'https://schema.org',
                '@type'       => 'Place',
                'name'        => $item['name'] ?? $slug,
                'description' => $metaDesc,
                'url'         => $canonical,
            ],
            [
                '@context'        => 'https://schema.org',
                '@type'           => 'BreadcrumbList',
                'itemListElement' => [
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home',   'item' => $baseUrl . '/'],
                    ['@type' => 'ListItem', 'position' => 2, 'name' => 'Venues', 'item' => $baseUrl . '/venues/'],
                    ['@type' => 'ListItem', 'position' => 3, 'name' => $item['name'] ?? $slug, 'item' => $canonical],
                ],
            ],
        ];
        if (!empty($ogImage)) {
            $schemas[0]['image'] = $ogImage;
        }
        if (!empty($item['location'])) {
            $schemas[0]['address'] = $item['location'];
        }

        $modifiedHtml = injectSeoMeta($shellFile, [
            'title'       => $metaTitle,
            'description' => $metaDesc,
            'canonical'   => $canonical,
            'ogType'      => 'website',
            'ogImage'     => $ogImage,
            'schemas'     => $schemas,
        ]);
        echo $modifiedHtml;
        exit;
    }

    // Fallback: serve shell without SEO modification (better than nothing)
    if ($shellFile) { include $shellFile; exit; }
    if (file_exists($rootDir . '/venues/index.html')) { include $rootDir . '/venues/index.html'; exit; }
}

// ── BLOG ──────────────────────────────────────────────────────────────────────
if ($section === 'blog' && !empty($slug) && $slug !== 'blog') {
    $item = null;
    if (class_exists('BlogStore')) {
        $item = BlogStore::findBySlug($slug);
        if (!$item || empty($item['published'])) {
            http_response_code(404);
            if (file_exists($rootDir . '/404.html')) include $rootDir . '/404.html';
            exit;
        }
    }

    // 3-segment URL = individual post: /blog/[category]/[slug]/
    if (count($parts) >= 3) {
        // Prefer the static file shell or an existing blog post detail page as the HTML shell template
        $shellFile = null;
        if (is_file($cleanPath . '/index.html')) {
            $shellFile = $cleanPath . '/index.html';
        } elseif (is_file($cleanPath . '.html')) {
            $shellFile = $cleanPath . '.html';
        } else {
            $detailFiles = glob($rootDir . '/blog/*/*/index.html');
            if (!empty($detailFiles)) {
                $shellFile = $detailFiles[0];
            }
        }

        if ($shellFile && $item) {
            $baseUrl       = rtrim(defined('CORS_ORIGIN') && CORS_ORIGIN !== '*' ? CORS_ORIGIN : 'https://1111decor.com', '/');
            $rawCategory   = $item['category'] ?? 'blog';
            $categorySlug  = strtolower(preg_replace('/\s+/', '-', $rawCategory));
            $categoryName  = $item['category_name'] ?? ucwords(str_replace('-', ' ', $categorySlug));
            $canonical     = $baseUrl . '/blog/' . $categorySlug . '/' . $item['slug'] . '/';
            $metaTitle     = !empty($item['meta_title']) ? $item['meta_title'] : (($item['title'] ?? $slug) . ' | 11:11 Decor');
            $metaDesc      = !empty($item['meta_description']) ? $item['meta_description'] : ($item['excerpt'] ?? '');
            $ogImage       = $item['image']      ?? '';
            $author        = $item['author']     ?? '11:11 Decor Studio';
            $datePublished = $item['created_at'] ?? date('Y-m-d');

            $schemas = [
                [
                    '@context'      => 'https://schema.org',
                    '@type'         => 'Article',
                    'headline'      => $item['title'] ?? $slug,
                    'description'   => $metaDesc,
                    'url'           => $canonical,
                    'datePublished' => $datePublished,
                    'author'        => ['@type' => 'Person', 'name' => $author],
                    'publisher'     => ['@type' => 'Organization', 'name' => '11:11 Decor', 'url' => $baseUrl],
                ],
                [
                    '@context'        => 'https://schema.org',
                    '@type'           => 'BreadcrumbList',
                    'itemListElement' => [
                        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home',         'item' => $baseUrl . '/'],
                        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blog',         'item' => $baseUrl . '/blog/'],
                        ['@type' => 'ListItem', 'position' => 3, 'name' => $categoryName,  'item' => $baseUrl . '/blog/' . $categorySlug . '/'],
                        ['@type' => 'ListItem', 'position' => 4, 'name' => $item['title'] ?? $slug, 'item' => $canonical],
                    ],
                ],
            ];
            if (!empty($ogImage)) {
                $schemas[0]['image'] = $ogImage;
            }

            $faqs = $item['faqs'] ?? [];
            if (empty($faqs) && !empty($item['content']) && class_exists('BlogStore')) {
                $faqs = BlogStore::extractFaqs($item['content']);
            }
            if (!empty($faqs) && is_array($faqs)) {
                $mainEntity = [];
                foreach ($faqs as $f) {
                    if (!empty($f['question']) && !empty($f['answer'])) {
                        $mainEntity[] = [
                            '@type' => 'Question',
                            'name'  => $f['question'],
                            'acceptedAnswer' => [
                                '@type' => 'Answer',
                                'text'  => $f['answer'],
                            ],
                        ];
                    }
                }
                if (!empty($mainEntity)) {
                    $schemas[] = [
                        '@context'   => 'https://schema.org',
                        '@type'      => 'FAQPage',
                        'mainEntity' => $mainEntity,
                    ];
                }
            }

            $modifiedHtml = injectSeoMeta($shellFile, [
                'title'       => $metaTitle,
                'description' => $metaDesc,
                'canonical'   => $canonical,
                'ogType'      => 'article',
                'ogImage'     => $ogImage,
                'schemas'     => $schemas,
            ]);
            echo $modifiedHtml;
            exit;
        }

        // Fallback: serve any existing blog post shell without modification
        if ($shellFile) { include $shellFile; exit; }
    }

    // 2-segment URL = category archive: /blog/[category]/
    // These normally exist as static files and are caught at step 2 above.
    // This handles any edge case of a category not yet in the static build.
    $catFiles = glob($rootDir . '/blog/*/index.html');
    if (!empty($catFiles) && file_exists($catFiles[0])) {
        include $catFiles[0];
        exit;
    }
    if (file_exists($rootDir . '/blog/index.html')) {
        include $rootDir . '/blog/index.html';
        exit;
    }
}

// ─── 4. Default 404 ───────────────────────────────────────────────────────────
http_response_code(404);
if (file_exists($rootDir . '/404.html')) {
    include $rootDir . '/404.html';
} else {
    echo "<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 — Page Not Found</h1></body></html>";
}
exit;
