<?php
/**
 * Shared Page & Content Visibility Controls Card Component
 */
if (!isset($visibility)) {
    $visibilityFile = __DIR__ . '/../data/page-visibility.json';
    $visibility = [
        'blog' => false,
        'gallery' => false,
        'portfolio' => false,
        'venues' => false
    ];
    if (file_exists($visibilityFile)) {
        $rawVis = json_decode(file_get_contents($visibilityFile), true);
        if (is_array($rawVis)) {
            $visibility['blog'] = !empty($rawVis['blog']);
            $visibility['gallery'] = !empty($rawVis['gallery']);
            $visibility['portfolio'] = !empty($rawVis['portfolio']);
            $visibility['venues'] = !empty($rawVis['venues']);
        }
    }
}
?>
<!-- ── Page Visibility Controls Card ── -->
<div id="page-visibility-card" data-testid="page-visibility-card" class="visibility-card">
    <div class="visibility-header">
        <div style="display: flex; align-items: center;">
            <span class="visibility-title">Page &amp; Content Visibility Controls</span>
            <span id="visibility-status-msg" class="toast-success"></span>
        </div>
    </div>
    <p class="visibility-desc">
        Toggle sections ON or OFF to control public access, navigation links, and sitemap indexing. When hidden, pages return 404 and disappear from menus.
    </p>
    <div class="toggle-grid">
        <!-- Blog Toggle -->
        <div class="toggle-item">
            <div class="toggle-info">
                <h4>Blog Articles</h4>
                <p>/blog/ &amp; stories</p>
            </div>
            <label class="switch">
                <input type="checkbox" id="toggle-blog" name="visibility_blog" <?= $visibility['blog'] ? 'checked' : '' ?> onchange="updateVisibility('blog', this.checked)">
                <span class="slider"></span>
            </label>
        </div>

        <!-- Gallery Toggle -->
        <div class="toggle-item">
            <div class="toggle-info">
                <h4>Photo Gallery</h4>
                <p>/gallery/</p>
            </div>
            <label class="switch">
                <input type="checkbox" id="toggle-gallery" name="visibility_gallery" <?= $visibility['gallery'] ? 'checked' : '' ?> onchange="updateVisibility('gallery', this.checked)">
                <span class="slider"></span>
            </label>
        </div>

        <!-- Portfolio Toggle -->
        <div class="toggle-item">
            <div class="toggle-info">
                <h4>Portfolio Showcase</h4>
                <p>/portfolio/ &amp; projects</p>
            </div>
            <label class="switch">
                <input type="checkbox" id="toggle-portfolio" name="visibility_portfolio" <?= $visibility['portfolio'] ? 'checked' : '' ?> onchange="updateVisibility('portfolio', this.checked)">
                <span class="slider"></span>
            </label>
        </div>

        <!-- Venues Toggle -->
        <div class="toggle-item">
            <div class="toggle-info">
                <h4>Venues Archive</h4>
                <p>/venues/ &amp; detail pages</p>
            </div>
            <label class="switch">
                <input type="checkbox" id="toggle-venues" name="visibility_venues" <?= $visibility['venues'] ? 'checked' : '' ?> onchange="updateVisibility('venues', this.checked)">
                <span class="slider"></span>
            </label>
        </div>
    </div>
    <div class="build-notice">
        ⚠️ <strong>GoDaddy Static Build Notice:</strong> Changes update the server configuration immediately. Run <code>pnpm build</code> to re-export static files when publishing to production.
    </div>
</div>

<script>
async function updateVisibility(section, published) {
    const statusMsg = document.getElementById('visibility-status-msg');
    try {
        statusMsg.textContent = 'Updating...';
        statusMsg.style.display = 'inline-block';
        statusMsg.style.color = '#c9a96e';

        const res = await fetch('../api/page-visibility.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ section: section, published: published })
        });

        const data = await res.json();
        if (data.success) {
            statusMsg.textContent = 'Saved!';
            statusMsg.style.color = '#86efac';
            setTimeout(() => {
                statusMsg.style.display = 'none';
            }, 2500);
        } else {
            statusMsg.textContent = 'Error: ' + (data.error || 'Failed to save');
            statusMsg.style.color = '#f87171';
        }
    } catch (err) {
        statusMsg.textContent = 'Network error saving setting';
        statusMsg.style.color = '#f87171';
    }
}
</script>
