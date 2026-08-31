# 🌐 11:11 Decor — GoDaddy Deployment Guide
### Complete Step-by-Step Beginner's Guide

---

> **IMPORTANT — Where to enter your real domain name:**
> Every time you see `YOUR-REAL-DOMAIN.com` in this guide, that is where you must type **your actual domain** (e.g., `elevenelevendecor.com`). There are **5 key places** — they are all clearly marked with a 🔴 symbol.

---

## 📋 What This Project Is Made Of

Before we start, here's a quick map so you understand what you're deploying:

| Part | What it is | Where it goes on GoDaddy |
|------|-----------|--------------------------|
| **Next.js Website** | The public-facing website (all pages) | Uploaded as HTML/CSS/JS files to `public_html/` |
| **PHP Admin Panel** | Unified backend to manage blogs, portfolio, venues, gallery, and page toggles | Uploaded to `public_html/php-admin/` |
| **MySQL Database** | Stores your dynamic blog posts | Created inside GoDaddy cPanel |
| **JSON Data Stores** | Fast zero-config storage for portfolio, venues, gallery photos, and inquiries | Saved in `public_html/php-admin/data/` |
| **PHP API** | Connects the website to database and data stores | Part of the PHP admin upload |

---

## 🛒 PART 1 — GoDaddy Hosting Requirements & Accessing cPanel

### Step 1.1 — How to Check Your Existing Hosting Plan

If you already have a GoDaddy account with services, you might already have a hosting plan that can host your new website for free:

1. Log into your GoDaddy account.
2. In the top-right corner, click on your account initials/avatar → select **"My Products"** (or visit `https://account.godaddy.com/products`).
3. Scroll down to find the section called **"Web Hosting"**:
   * Click the down arrow `∨` to expand the section (or click **"Manage All →"**).
4. Look at the **"Plan"** column for your hosting account:
   * **Deluxe or Ultimate Plan**: ✅ **Supports MULTIPLE websites!** You can host your new domain on this existing plan without paying for additional hosting.
   * **Economy Plan**: Supports only 1 website. If you already have a site on it, you will need to either upgrade to Deluxe or add an additional hosting plan.

> [!WARNING]
> **Avoid "Websites + Marketing / Airo AI Builder":** GoDaddy often shows an AI builder dashboard with buttons like "Try Airo Builder" or "Create a Site". That is a closed website builder product and **will not run custom Next.js + PHP code**. You must use classic **cPanel Web Hosting**.

---

### Step 1.2 — How to Open cPanel Admin

1. On the **Web Hosting** page (`My Hosting`), find your active hosting plan row.
2. Click the three dots **`...`** under the **Actions** column on the right side of the row (or click directly on your existing primary domain name).
3. Click **"Manage"**.
4. On the hosting management dashboard, look for the primary button labeled **"cPanel Admin"** (or **"cPanel"**).
5. Clicking **cPanel Admin** opens your full cPanel control center where your File Manager, MySQL Databases, and Domain settings live.

---

### Step 1.3 — Adding Your New Domain in cPanel (For Multi-Site / Deluxe Plans)

If you are adding your new website to an existing Deluxe or Ultimate hosting account:

1. Inside **cPanel**, scroll down to the **"Domains"** section.
2. Click on **"Domains"** (or **"Addon Domains"**).
3. Click the blue button labeled **"Create A New Domain"**.
4. In the **"Domain"** field, enter your new domain name:
   ```
   YOUR-NEW-DOMAIN.com
   ```
5. Leave the **Document Root** directory as suggested by cPanel (it will automatically assign a folder such as `YOUR-NEW-DOMAIN.com` or `public_html/YOUR-NEW-DOMAIN.com`).
   * *Note down this folder name — this is where you will upload your files in Part 3!*
6. Click **"Submit"**.

---

### Step 1.4 — Confirm PHP Version

Your cPanel hosting includes PHP and MySQL by default. Verify that PHP is set to **8.1 or 8.2**:

1. Inside **cPanel**, look for **"MultiPHP Manager"** or **"Select PHP Version"**.
2. Select your domain (`YOUR-NEW-DOMAIN.com`) from the list.
3. Choose **PHP 8.1** or **PHP 8.2** from the version dropdown and click **Apply / Save**.

---

## 🔨 PART 2 — Build the Website on Your Computer (One-Time Step)

This step converts the Next.js project into plain HTML files that GoDaddy can serve.

### Step 2.1 — Open a Terminal in the Project Folder

1. Open the folder `eleven_eleven_decor` on your Desktop
2. Right-click inside the folder → **"Open in Terminal"** (or open PowerShell and navigate there)

### Step 2.2 — Set the Environment Variables

Before building, you need to tell the website what your real domain is and configure your contact form endpoint:

1. In the project folder, find the file `.env.example`
2. **Make a copy** of it and rename the copy to `.env.production`
3. Open `.env.production` in any text editor (Notepad is fine)
4. Set your production domain in both of these lines:

🔴 **DOMAIN CHANGE #1** — Set your canonical site URL:
```env
NEXT_PUBLIC_SITE_URL=https://YOUR-REAL-DOMAIN.com
```

🔴 **DOMAIN CHANGE #2** — Set your contact form PHP endpoint:
```env
NEXT_PUBLIC_CONTACT_API_URL=https://YOUR-REAL-DOMAIN.com/php-admin/api/contact.php
```

5. Also ensure `NODE_ENV=production` is set in that same file
6. Save and close the file

### Step 2.3 — Install Dependencies (if not already done)

In the terminal, run:
```
pnpm install
```
Wait for it to finish (this may take a minute or two).

### Step 2.4 — Build the Static Website

Run this command:
```
pnpm build
```

> **Note:** This will take 1–3 minutes. You'll see a progress bar. When it finishes successfully, it will say "Export successful" or show a list of pages.

### Step 2.5 — Find Your Built Files

After the build, a new folder called **`out`** will appear inside `eleven_eleven_decor/`. This folder contains your complete website as plain HTML files ready to upload. **Do not modify anything inside `out/`.**

---

## ☁️ PART 3 — Upload the Website Files to GoDaddy

### Step 3.1 — Open cPanel File Manager

1. Log into [GoDaddy.com](https://godaddy.com) → **My Products** → **Manage** your hosting
2. Click **"cPanel Admin"** to open cPanel
3. In cPanel, find **"File Manager"** and click it
4. You will see a folder called **`public_html`** — this is where your website lives

### Step 3.2 — Clear the Default GoDaddy Files

> **Warning:** GoDaddy puts placeholder files in `public_html` by default. You should delete them before uploading.

Inside `public_html`, delete any existing files like `index.html`, `default.htm`, etc. (but do NOT delete the `public_html` folder itself).

### Step 3.3 — Upload the Built Website

1. Open the **`out`** folder on your computer (from Step 2.5)
2. Select **all files and folders** inside `out/` (Ctrl+A to select all)
3. In cPanel File Manager, make sure you're inside `public_html/`
4. Click **"Upload"** at the top
5. Upload all the files and folders from `out/`

> **Tip:** If uploading many files one-by-one is slow, zip the contents of the `out/` folder first, upload the zip to cPanel, then use the cPanel "Extract" button to unzip it. Make sure the contents end up directly inside `public_html/` (not inside a subfolder like `public_html/out/`).

### Step 3.4 — Create the `.htaccess` File

The project already has an `.htaccess` configuration for GoDaddy. You need to create one in `public_html/`:

1. Inside cPanel File Manager, navigate to `public_html/`
2. Click **"New File"** → name it `.htaccess` (with the dot at the start)
3. Right-click the new `.htaccess` file → **"Edit"**
4. Paste the following content:

```apache
# 11:11 Decor — Apache Configuration for GoDaddy Shared Hosting
Options -MultiViews
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Block direct access to hidden files and php-admin config
<FilesMatch "(^\.|\.json$|config\.php)">
    Order allow,deny
    Deny from all
</FilesMatch>

# Allow direct access to php-admin, api, assets, and uploads
RewriteCond %{REQUEST_URI} ^/(php-admin|_next|uploads|api) [NC]
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Route managed dynamic sections through gateway.php for live visibility 404s and zero-rebuild slugs
RewriteRule ^(blog|portfolio|venues|gallery)(/.*)?$ gateway.php [L,QSA]

# Serve existing files/directories directly
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Clean URLs for Next.js static HTML export
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L,QSA]

# Handle subdirectory index.html files
RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
RewriteRule ^(.*)/?$ /$1/index.html [L,QSA]

# Custom 404 page
ErrorDocument 404 /404.html
```

> **Tip:** Because `.htaccess` and `gateway.php` are already configured inside your project's `public/` folder, `pnpm build` automatically copies them directly into `out/`. When you upload all contents of `out/` in Step 3.3, `.htaccess` will already be there! Just right-click → Edit in cPanel to confirm its content matches above.

---

## 🗄️ PART 4 — Set Up the MySQL Database

### Step 4.1 — Create the Database

1. In cPanel, scroll down to find **"MySQL Databases"** and click it
2. Under **"Create New Database"**, type a name like: `elevendecor_blog`
3. Click **"Create Database"**

### Step 4.2 — Create a Database User

1. Still on the MySQL Databases page, scroll to **"MySQL Users"**
2. Under **"Add New User"**, fill in:
   - **Username:** `elevendecor_user`  
   - **Password:** Choose a strong password (use the generator) — **write it down!**
3. Click **"Create User"**

### Step 4.3 — Link the User to the Database

1. Scroll to the section **"Add User to Database"**
2. Select your user (`elevendecor_user`) and your database (`elevendecor_blog`)
3. Click **"Add"**
4. On the next page, check **"ALL PRIVILEGES"** → click **"Make Changes"**

> **Important:** GoDaddy often adds a prefix to your database name and username. For example, if your hosting account is `johndoe`, the actual database name might be `johndoe_elevendecor_blog`. **Check the exact names shown in cPanel** — you'll need them in the next step.

---

## 🐘 PART 5 — Upload and Configure the PHP Admin Panel

### Step 5.1 — Upload the PHP Files

1. In cPanel File Manager, navigate to `public_html/`
2. Create a new folder called `php-admin` (click **"New Folder"**)
3. Upload everything from your local `php-admin/` folder into `public_html/php-admin/`

This includes all 4 folders:
- **`api/` folder**: All JSON REST APIs and live XML sitemap generators (`contact.php`, `blogs.php`, `portfolio.php`, `venues.php`, `gallery.php`, `sitemap-index.php`, etc.).
- **`lib/` folder**: The backend engine containing `Mailer.php` and the `PHPMailer/` library (required for contact form email delivery).
- **`data/` folder**: Secure zero-config JSON data stores for portfolio, venues, gallery, inquiries, and visibility toggles.
- **`manage-7f3b9x2k/` folder**: The full Editorial Studio and Admin Dashboard interface.

> **Caution:** Do **NOT** upload `config.php` from your local machine — it has local/development settings. You will create a fresh, secure one directly on the server in the next step.

### Step 5.2 — Create the `config.php` File on the Server

1. In File Manager, navigate to `public_html/php-admin/`
2. Click **"New File"** → name it `config.php`
3. Right-click it → **"Edit"**
4. Paste and fill in the following (replace every placeholder value):

```php
<?php
/**
 * 11:11 Decor — PHP Blog Admin Configuration
 * This file is on the server only — never share this file!
 */

// MySQL Database Credentials (from Step 4 above)
define('DB_HOST', 'localhost');
define('DB_NAME', 'PASTE_YOUR_FULL_DATABASE_NAME_HERE');   // e.g., johndoe_elevendecor_blog
define('DB_USER', 'PASTE_YOUR_FULL_DATABASE_USER_HERE');   // e.g., johndoe_elevendecor_user
define('DB_PASS', 'PASTE_YOUR_DATABASE_PASSWORD_HERE');     // The password you created in Step 4.2

// 🔴 DOMAIN CHANGE #3 — Replace with your real domain
define('CORS_ORIGIN', 'https://YOUR-REAL-DOMAIN.com');

// Admin Panel Password
// This is the password you'll use to log into the blog admin panel.
// Change "MySecretAdminPassword!" to any strong password you want.
define('ADMIN_PASSWORD_HASH', password_hash('MySecretAdminPassword!', PASSWORD_BCRYPT));

// Session lifetime (seconds) — 7200 = 2 hours
define('SESSION_LIFETIME', 7200);

// 🔴 Contact Form Email Settings (see Part 15 for full explanation)
define('CONTACT_EMAIL',      'hello@YOUR-REAL-DOMAIN.com');      // ← Where you receive inquiries
define('CONTACT_FROM_EMAIL', 'noreply@YOUR-REAL-DOMAIN.com');    // ← Must be on YOUR hosted domain!
```

5. **Save the file**

> **Remember:** Write down the admin password you set above! You'll use it to log into the admin panel later.

### Step 5.3 — Protect the `data/` Folder

The `data/` folder stores JSON files. We need to prevent anyone from accessing it via browser.

1. Navigate to `public_html/php-admin/data/`
2. Create a new file called `.htaccess`
3. Edit it and paste:

```apache
Order allow,deny
Deny from all
```

4. Save

---

## 🗄️ PART 6 — Initialize the Database

### Step 6.1 — Run the Installer Script

Now we'll run the installer to create the database tables.

Open your browser and go to:

```
🔴 DOMAIN CHANGE #4 — Use your real domain:
https://YOUR-REAL-DOMAIN.com/php-admin/api/install.php
```

You should see a JSON response like:
```json
{
  "success": true,
  "message": "Database tables and sample seed records created successfully. PLEASE DELETE THIS install.php FILE NOW!"
}
```

If you see an error, double-check the database credentials in `config.php` from Step 5.2.

### Step 6.2 — DELETE the Installer File Immediately! ⚠️

> **CRITICAL — This is a security step!** The `install.php` file must be deleted after use. If left accessible, it could be used to wipe your database.

1. In cPanel File Manager, go to `public_html/php-admin/api/`
2. Find `install.php`
3. Right-click → **"Delete"** → confirm deletion

---

## 🔒 PART 7 — Secure the Admin Panel

### Step 7.1 — Verify the `.htaccess` in Admin Panel

The admin panel folder already has a `.htaccess` file that was uploaded in Step 5.1. Make sure it exists at:
`public_html/php-admin/manage-7f3b9x2k/.htaccess`

Open it and verify it has content (it protects config files and forces HTTPS).

### Step 7.2 — Set Correct File Permissions

In cPanel File Manager:
1. Right-click `public_html/php-admin/config.php` → **"Change Permissions"**
2. Set to **`600`** (owner read/write only) → Save

---

## 🌐 PART 8 — Connect Your Domain to Hosting (DNS Records Setup)

This connects your domain (`YOUR-NEW-DOMAIN.com`) to the cPanel hosting server where your website files and database live.

---

### Step 8.1 — Find Your Server's Shared IP Address in cPanel

Every hosting account has a unique server IP address:

1. Open your **cPanel Admin** (as described in Step 1.2).
2. On the main **cPanel Home** screen, look at the **right-hand sidebar** under the section titled **"General Information"**.
3. Locate the field labeled **"Shared IP Address"** (it is a series of four numbers separated by dots, for example: `198.51.100.25` or `YOUR_SHARED_IP_ADDRESS`).
4. **Copy this IP address** — you will paste it into your DNS records next.

---

### Step 8.2 — Open the DNS Management Page for Your Domain

1. Go to your GoDaddy account → **"My Products"** (`https://account.godaddy.com/products`).
2. Under the **"Domains"** section, find your website domain: `YOUR-NEW-DOMAIN.com`.
3. Click the three dots **`...`** next to your domain → select **"Manage DNS"** (or click **"DNS"**).
4. You will arrive at the **DNS Management** page.
   * *Note:* At the top of the page, GoDaddy may display promotional cards like *"Connect Your Domain in Minutes (Powered by Airo)"*. **Scroll past these cards** until you see the **"DNS Records"** table.

---

### Step 8.3 — Configure the Required DNS Records

In the **DNS Records** table, ensure the following two core records are configured:

| Type | Name | Value (Target) | TTL | Purpose |
|:---:|:---:|:---:|:---:|:---|
| **A** | `@` | `YOUR_SHARED_IP_ADDRESS` | `1/2 Hour` (or `600 seconds`) | Directs the root domain (`https://YOUR-NEW-DOMAIN.com`) to your cPanel web server |
| **CNAME** | `www` | `@` *(or `YOUR-NEW-DOMAIN.com`)* | `1 Hour` (or `Default`) | Directs visitors typing `www.YOUR-NEW-DOMAIN.com` to your main site |

#### How to edit the `A` Record:
1. In the records table, look for the row where **Type is `A`** and **Name is `@`**.
2. Click the **Edit** pencil icon (or the row itself).
3. In the **Value** box, replace the existing placeholder with your **`YOUR_SHARED_IP_ADDRESS`** (copied from Step 8.1).
4. Set TTL to **1/2 Hour** (or shortest available) so changes take effect quickly.
5. Click **Save**.

#### How to verify the `CNAME` Record:
1. In the same table, look for the row where **Type is `CNAME`** and **Name is `www`**.
2. Ensure its **Value** points to `@` (or `YOUR-NEW-DOMAIN.com`). If it does, leave it as is. If not, edit it and click **Save**.

---

### Step 8.4 — DNS Propagation

* Once saved, DNS updates typically take **15 to 45 minutes** to take effect (up to 24 hours in rare cases).
* You can check when your domain has successfully pointed to your IP by opening a terminal on your computer and running:
  ```bash
  nslookup YOUR-NEW-DOMAIN.com
  ```
  When it returns `YOUR_SHARED_IP_ADDRESS`, your domain is live and pointing to your hosting!

---

## 🔐 PART 9 — Enable Free SSL (HTTPS)

### Step 9.1 — Activate SSL Certificate

GoDaddy includes a free SSL certificate with hosting plans:

1. In cPanel, find **"SSL/TLS"** or look for **"Let's Encrypt SSL"**
2. Click it → select your domain → click **"Install"**
3. Wait a few minutes for it to activate

Once done, your site will be accessible at `https://` (not just `http://`).

### Step 9.2 — If You Don't See "Let's Encrypt SSL" in cPanel ⚠️

> GoDaddy sometimes hides or doesn't pre-enable the free SSL option depending on your plan or account age. **This is common — don't panic.** It takes 2 minutes to fix via their chat support.

**What to do:**

1. Go to [GoDaddy Support](https://www.godaddy.com/help) and click **"Chat with us"** (bottom-right of the page)
2. Tell the agent exactly this:
   > *"I'm on a cPanel Shared Hosting plan and I don't see the Let's Encrypt SSL or AutoSSL option in my cPanel. Can you please enable the free SSL certificate for my domain `YOUR-REAL-DOMAIN.com`?"*
3. The agent will enable it on the backend — it takes them under 2 minutes
4. Refresh your cPanel and the SSL option will now appear
5. Follow Step 9.1 above to install it

> **Note:** GoDaddy's chat is available 24/7. You can also call them if you prefer. Either way, activating the free SSL is a standard request they handle many times a day — no upselling required, just ask for AutoSSL or Let's Encrypt to be enabled.

---

## ✅ PART 10 — Final Verification Checklist

After completing all steps, test everything by visiting these URLs in your browser:

| Test | URL to visit | Expected result |
|------|-------------|-----------------|
| Homepage loads | `https://YOUR-DOMAIN.com` | 11:11 Decor homepage shows |
| Blog page loads | `https://YOUR-DOMAIN.com/blog/` | Blog listing page shows |
| Blog post loads | `https://YOUR-DOMAIN.com/blog/complete-wedding-decor-checklist/` | Full post shows |
| PHP API works | `https://YOUR-DOMAIN.com/php-admin/api/blogs.php` | Shows JSON list of posts |
| Admin panel | `https://YOUR-DOMAIN.com/php-admin/manage-7f3b9x2k/` | Login page shows |
| HTTPS redirect | `http://YOUR-DOMAIN.com` | Should auto-redirect to `https://` |
| Config protected | `https://YOUR-DOMAIN.com/php-admin/config.php` | Should show "Forbidden" (403 error) |
| Static sitemap | `https://YOUR-DOMAIN.com/sitemap.xml` | Shows XML with core static pages |
| Dynamic Blog sitemap | `https://YOUR-DOMAIN.com/php-admin/api/blog-sitemap.php` | Shows XML with all published blog posts |
| Dynamic Portfolio sitemap | `https://YOUR-DOMAIN.com/php-admin/api/portfolio-sitemap.php` | Shows XML with all published case studies |
| Dynamic Venues sitemap | `https://YOUR-DOMAIN.com/php-admin/api/venues-sitemap.php` | Shows XML with all published venues |
| Sitemap index (master) | `https://YOUR-DOMAIN.com/php-admin/api/sitemap-index.php` | Shows XML index pointing to all sitemaps above |

---

## 🔍 PART 11 — Google Search Console & Sitemaps
This project uses a **Sitemap Index** architecture — one master file that points Google to your static pages and all dynamic content sitemaps. This is the industry-standard way to handle modern hybrid websites.

### The Five Sitemap Files Explained

| File | URL on GoDaddy | What it contains | Updates when? |
|------|---------------|-----------------|---------------|
| **`sitemap.xml`** | `https://YOUR-DOMAIN.com/sitemap.xml` | Core static pages — Home, About, Services, Events, Packages, Testimonials, Contact | Only when you **rebuild and re-upload** the site |
| **`blog-sitemap.php`** | `https://YOUR-DOMAIN.com/php-admin/api/blog-sitemap.php` | Every **published blog post** individually | **Automatically** — the second you publish a post in Admin |
| **`portfolio-sitemap.php`** | `https://YOUR-DOMAIN.com/php-admin/api/portfolio-sitemap.php` | Every **published portfolio case study** individually | **Automatically** — the second you publish a project in Admin |
| **`venues-sitemap.php`** | `https://YOUR-DOMAIN.com/php-admin/api/venues-sitemap.php` | Every **published luxury venue** individually | **Automatically** — the second you publish a venue in Admin |
| **`sitemap-index.php`** | `https://YOUR-DOMAIN.com/php-admin/api/sitemap-index.php` | Master index pointing to all 4 sitemaps above | Always up to date |

> **Key point:** You do **NOT** need to submit 4 separate sitemaps to Google. You only submit `sitemap-index.php`. Google reads the index and crawls all 4 sub-sitemaps automatically!

---

### Step 11.1 — Submit to Google Search Console

Google Search Console is the free Google tool that tells Google about your website:

1. Go to [Google Search Console](https://search.google.com/search-console/) and sign in with your Google account.
2. Click **"Add Property"** → select **"URL prefix"** → type your full domain: `https://YOUR-DOMAIN.com`
3. Verify ownership — Google will give you an HTML verification file to upload to `public_html/` on GoDaddy (upload via cPanel File Manager).
4. Once verified, click **"Sitemaps"** in the left sidebar.
5. In the **"Add a new sitemap"** box, enter:

```
php-admin/api/sitemap-index.php
```

6. Click **"Submit"**.

Google will instantly recognize and crawl:
- All static pages (from `sitemap.xml`)
- All dynamic blog posts (from `blog-sitemap.php`)
- All dynamic portfolio case studies (from `portfolio-sitemap.php`)
- All dynamic venues (from `venues-sitemap.php`)

---

### Step 11.2 — Zero-Rebuild Workflow for Content Team

Here is what happens automatically whenever your content team publishes or updates anything in the Admin Panel:

1. You log into `https://YOUR-DOMAIN.com/php-admin/manage-7f3b9x2k/`.
2. You write and publish a new blog post, portfolio project, or venue.
3. **Instant Live Display:** The item immediately appears on the website directory grids (`/blog/`, `/portfolio/`, `/venues/`), and direct URLs (`/portfolio/slug/`, `/venues/slug/`, `/blog/cat/slug/`) render live via the dynamic SPA clients and server gateway.
4. **Instant Dynamic Sitemap:** The item immediately appears in its corresponding PHP XML sitemap with today's `<lastmod>` date.
5. **Instant Rich Schema:** Googlebot automatically detects the dynamically generated Schema.org structured data (`Article`, `CreativeWork`, or `EventVenue`) for rich snippets.

> **Zero Rebuild Guarantee:** Your content team **never** needs to rebuild, re-export, or re-upload files to add or edit blogs, portfolio case studies, venues, or gallery photos. Everything works 100% out of the box.

---

## 🔑 PART 12 — Admin Panel — Full Content Management & On/Off Toggles

Your website features a full, private Content Management System (CMS) located at:

🔴 **DOMAIN CHANGE #5** — Use your real domain in this URL:
```
https://YOUR-REAL-DOMAIN.com/php-admin/manage-7f3b9x2k/
```

* **Login:** Enter the admin password you configured in `config.php` (Step 5.2).
* **Storage Architecture Note**: Only **Blog Posts** use the MySQL database. **Portfolio, Venues, Gallery photos, and Page Visibility** use ultra-fast, zero-config JSON files stored securely in `php-admin/data/`. You **do NOT** need to create separate MySQL tables for them!

---

### What You Can Manage in the Admin Panel:

#### 1. 📝 Dynamic Blog Posts (`/blog`)
* **Create & Edit**: Rich WYSIWYG TipTap block editor with headings, image insertions, and quote formatting.
* **Metadata & SEO**: Customize author, excerpt, reading time, category, and related service links.
* **On/Off Toggle**: Set post to **Published** (visible live and included in sitemap) or **Draft** (hidden from visitors).

#### 2. 🏛️ Venues (`/venues`)
* **Add & Edit Venues**: Add luxury partner venues with space type (Palace, Heritage, Resort, Lawn), guest capacity, location, description, and photo galleries.
* **On/Off Toggle**: Every venue has an instant **Published / Draft toggle** — toggle any venue off at any time to temporarily hide it from the public directory.

#### 3. 📸 Portfolio Projects (`/portfolio`)
* **Manage Case Studies**: Add complete event case studies including event category, client name, event date, cover hero image, and project gallery.
* **On/Off Toggle**: Toggle projects between **Published** and **Draft** with one click.

#### 4. 🖼️ Gallery Photos (`/gallery`)
* **Upload & Organize Photos**: Upload new photography directly into the server's `uploads/` folder or paste image URLs.
* **Categories & Grid Styling**: Assign category tabs (*Weddings, Décor, Stage Designs, Birthdays*) and aspect ratios (*Landscape, Portrait, Square*).
* **On/Off Toggle**: Easily toggle photos between **Published** and **Draft** without deleting them.

#### 5. 👁️ Page & Section Visibility Toggles
* Use the **Visibility Manager** card in your dashboard to toggle entire main navigation sections (Blog, Portfolio, Venues, Gallery) on or off dynamically without needing to rebuild or re-upload your website.
* **Instant HTTP 404 Protection:** When you toggle a section OFF, the server gateway (`gateway.php`) immediately intercepts all traffic to that section and returns a true `HTTP 404 Not Found` header to browsers and search engine crawlers. Toggling it back ON instantly restores the page. No rebuild is ever required!

---

## 🆘 PART 13 — Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| Site shows "403 Forbidden" | Check that your files are in `public_html/` (not in a subfolder inside it) |
| Blog page shows no posts | Check the `config.php` database credentials are correct |
| `install.php` shows "config.php not found" | Make sure `config.php` is saved in `public_html/php-admin/` (not inside `api/`) |
| Admin panel shows blank page | Check PHP version is 8.0+ in cPanel MultiPHP Manager |
| Images not loading | For uploaded images, check the `uploads/` folder has permissions set to `755` |
| `http://` doesn't redirect to `https://` | Make sure SSL is installed (Part 9) and `.htaccess` is in place (Step 3.4) |
| "Access denied" database error | Re-check that the user has ALL PRIVILEGES on the database (Step 4.3) |
| `blog-sitemap.php` shows empty XML | The `config.php` on the server is missing or has wrong DB credentials |
| `sitemap-index.php` shows blank page | PHP error — check PHP version is 8.0+ and `config.php` exists in `public_html/php-admin/` |
| Blog post not showing in sitemap | Make sure the post is set to **Published** in the admin panel (drafts are excluded) |

---

## 📁 PART 14 — Summary — Final Folder Structure on GoDaddy

After everything is done, your `public_html/` on GoDaddy should look like this:

```
public_html/
├── .htaccess                        ← Created in Step 3.4
├── index.html                       ← Uploaded from out/ in Step 3.3
├── gateway.php                      ← Uploaded from out/ (real-time visibility 404 & dynamic routing)
├── about-us/
│   └── index.html
├── blog/
│   └── index.html
├── portfolio/
│   └── index.html
├── venues/
│   └── index.html
├── contact/
│   └── index.html
├── [... all other pages from out/ ...]
└── php-admin/
    ├── config.php                   ← Created fresh on server in Step 5.2 (NEVER upload from local)
    ├── api/
    │   ├── blogs.php
    │   ├── blog-post.php
    │   ├── portfolio.php
    │   ├── venues.php
    │   ├── gallery.php
    │   ├── upload-image.php
    │   ├── blog-sitemap.php          ← Dynamic blog posts XML sitemap
    │   ├── portfolio-sitemap.php     ← Dynamic portfolio projects XML sitemap
    │   ├── venues-sitemap.php        ← Dynamic venues XML sitemap
    │   └── sitemap-index.php        ← Master sitemap index (submit THIS to Google)
    │   (install.php → DELETED after Step 6.2)
    ├── data/
    │   └── .htaccess                ← Created in Step 5.3
    └── manage-7f3b9x2k/
        ├── .htaccess
        ├── index.php                ← Admin login page
        ├── dashboard.php
        └── [... other admin files ...]
```

---

## 🔴 Quick Reference — All 5 Domain Name Locations

### Sitemap URLs at a Glance

| Purpose | URL | Submit to Google? |
|---------|-----|-------------------|
| Static pages sitemap | `https://YOUR-DOMAIN.com/sitemap.xml` | No — Google finds it via the index |
| Blog posts sitemap | `https://YOUR-DOMAIN.com/php-admin/api/blog-sitemap.php` | No — Google finds it via the index |
| Portfolio projects sitemap | `https://YOUR-DOMAIN.com/php-admin/api/portfolio-sitemap.php` | No — Google finds it via the index |
| Luxury venues sitemap | `https://YOUR-DOMAIN.com/php-admin/api/venues-sitemap.php` | No — Google finds it via the index |
| **Sitemap index (master)** | `https://YOUR-DOMAIN.com/php-admin/api/sitemap-index.php` | **✅ YES — submit this one only** |

---

### Domain Name Locations

| # | Step | File / Location | What to change |
|---|------|----------------|----------------|
| **#1** | Step 2.2 | `.env.production` on your computer | `NEXT_PUBLIC_SITE_URL=https://YOUR-REAL-DOMAIN.com` |
| **#2** | Step 2.2 | `.env.production` on your computer | `NEXT_PUBLIC_CONTACT_API_URL=https://YOUR-REAL-DOMAIN.com/php-admin/api/contact.php` |
| **#3** | Step 5.2 | `config.php` created on GoDaddy server | `CORS_ORIGIN`, `CONTACT_EMAIL`, and `CONTACT_FROM_EMAIL` values |
| **#4** | Step 6.1 | Browser address bar | `https://YOUR-REAL-DOMAIN.com/php-admin/api/install.php` |
| **#5** | Step 12 | Admin panel login URL | `https://YOUR-REAL-DOMAIN.com/php-admin/manage-7f3b9x2k/` |

---

---

## 📬 PART 15 — Contact Form Email & SMTP Setup (99.9% Deliverability)

When a visitor submits the inquiry form on `/contact`, your website POSTs the data to `php-admin/api/contact.php`. That endpoint now features an **enterprise-grade, dual-engine mailer**:

1. **Authenticated SMTP Delivery (Recommended)**: Sends through a trusted mail provider (Google Workspace, Gmail, or GoDaddy webmail) using TLS encryption. Arrives in 1 to 2 seconds and avoids spam filters.
2. **Graceful Auto-Fallback**: If SMTP credentials are empty or if a network glitch occurs, the system automatically falls back to GoDaddy's native server mailer.
3. **Guaranteed Lead Backup**: Every lead is permanently recorded to `php-admin/data/inquiries.json` before sending, ensuring you **never** lose a customer inquiry even during server downtime.

---

### Step 15.1 — Choose Your Email Sending Method

You can choose either of the two methods below by editing `config.php`:

* **Option A: Authenticated SMTP (Strongly Recommended)** — Uses your real Gmail or GoDaddy email account. Emails arrive instantly in the inbox without getting spam-flagged.
* **Option B: GoDaddy Server Mail (Zero Config)** — Uses GoDaddy's built-in mailer (`mail()`). Requires no password, but may be subject to shared IP spam filters.

---

### Step 15.2 (Option A1) — If Using Gmail / Google Workspace: How to Generate an App Password

> [!TIP]
> You do **not** need Google Cloud Console or developer tools. You only generate a simple 16-letter **App Password** from your regular Google Account.

1. Open your browser and go to your Google Account: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Ensure **2-Step Verification** is turned **ON** (Google requires this before creating app passwords).
3. In the search bar at the very top of the page, type:
   ```
   App passwords
   ```
   and click on the search result **App passwords**.
4. In the "App name" input box, type:
   ```
   11:11 Decor Website
   ```
5. Click **Create**.
6. A pop-up box will appear showing a yellow highlighted **16-letter code** (for example: `abcd efgh ijkl mnop`).
7. **Copy this 16-letter code** (spaces don't matter, but you can paste it without spaces). This is your `SMTP_PASS`.

---

### Step 15.3 (Option A2) — If Using GoDaddy / Custom Domain Webmail

If you prefer sending from a custom domain address hosted on GoDaddy (e.g. `hello@elevenelevendecor.com`):

* **SMTP Server**: `smtpout.secureserver.net` (or `mail.YOUR-REAL-DOMAIN.com`)
* **SMTP Port**: `587` (TLS) or `465` (SSL)
* **SMTP Username**: Your full email address (e.g. `hello@YOUR-REAL-DOMAIN.com`)
* **SMTP Password**: Your normal webmail mailbox password

---

### Step 15.4 — Add Email & SMTP Settings to `config.php` on GoDaddy

When you create or edit `config.php` inside `public_html/php-admin/` in cPanel File Manager, configure the **Contact Form & SMTP** section:

#### For Gmail / Google Workspace:
```php
// ─── Contact Form & SMTP Settings (Gmail) ───────────────────────────────────
define('CONTACT_EMAIL',      'yourbusiness@gmail.com');   // Where you want to receive inquiries
define('CONTACT_FROM_EMAIL', 'yourbusiness@gmail.com');   // Matching sender address

define('SMTP_ENABLED', true);
define('SMTP_HOST',    'smtp.gmail.com');
define('SMTP_PORT',    587);
define('SMTP_SECURE',  'tls');
define('SMTP_USER',    'yourbusiness@gmail.com');
define('SMTP_PASS',    'abcdefghijklmnop');               // The 16-letter Google App Password
```

#### For GoDaddy Domain Webmail:
```php
// ─── Contact Form & SMTP Settings (GoDaddy Webmail) ─────────────────────────
define('CONTACT_EMAIL',      'hello@YOUR-REAL-DOMAIN.com');
define('CONTACT_FROM_EMAIL', 'noreply@YOUR-REAL-DOMAIN.com');

define('SMTP_ENABLED', true);
define('SMTP_HOST',    'smtpout.secureserver.net');
define('SMTP_PORT',    587);
define('SMTP_SECURE',  'tls');
define('SMTP_USER',    'noreply@YOUR-REAL-DOMAIN.com');
define('SMTP_PASS',    'YourMailboxPasswordHere');
```

#### For Native Server Mail (If you don't want SMTP):
```php
define('CONTACT_EMAIL',      'hello@YOUR-REAL-DOMAIN.com');
define('CONTACT_FROM_EMAIL', 'noreply@YOUR-REAL-DOMAIN.com');
define('SMTP_ENABLED', false); // Uses native mail() with backup logging
```

---

### Step 15.5 — Verify the Endpoint Works After Deploying

Once everything is uploaded, test the contact form by visiting:

```
https://YOUR-REAL-DOMAIN.com/contact/
```

Fill in the form and submit. Within seconds you will:

1. **See the luxury gold success banner** on the form: *"Thank You! Your Inquiry Has Been Received."*
2. **Receive an email in your inbox** featuring a responsive, branded HTML layout with all client inquiry details (name, phone, event date, guest count, budget, vision) and a one-click *"Reply to [Client]"* button.
3. **See the lead permanently saved** in `public_html/php-admin/data/inquiries.json` (viewable via cPanel File Manager → Edit).

---

### Step 15.6 — Accessing & Protecting Your Saved Leads

Even if your email server ever experiences an outage, **no customer lead is ever lost**.

* The `php-admin/data/` folder contains an `.htaccess` file that blocks all public browser access. No outside visitor can download or view your leads.
* To view your customer inquiries:
  1. Open GoDaddy cPanel → **File Manager**.
  2. Navigate to `public_html/php-admin/data/`.
  3. Right-click `inquiries.json` → **View** or **Edit**.

---

### Final `config.php` on GoDaddy — Complete Master Template

```php
<?php
/**
 * 11:11 Decor — Master Production Configuration
 */

// MySQL Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'YOUR_FULL_DATABASE_NAME');    // e.g. johndoe_elevendecor_blog
define('DB_USER', 'YOUR_FULL_DATABASE_USER');    // e.g. johndoe_elevendecor_user
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');

// 🔴 DOMAIN CHANGE #2
define('CORS_ORIGIN', 'https://YOUR-REAL-DOMAIN.com');

// Admin Panel Password (bcrypt hash)
define('ADMIN_PASSWORD_HASH', password_hash('YourAdminPassword!', PASSWORD_BCRYPT));

// Session lifetime (2 hours)
define('SESSION_LIFETIME', 7200);

// ─── Contact Form & SMTP Settings ────────────────────────────────────────────
define('CONTACT_EMAIL',      'hello@YOUR-REAL-DOMAIN.com');   // Where inquiries arrive
define('CONTACT_FROM_EMAIL', 'noreply@YOUR-REAL-DOMAIN.com'); // Outgoing sender

define('SMTP_ENABLED', true);
define('SMTP_HOST',    'smtp.gmail.com');             // or smtpout.secureserver.net
define('SMTP_PORT',    587);
define('SMTP_SECURE',  'tls');                        // 'tls' (587) or 'ssl' (465)
define('SMTP_USER',    'yourbusiness@gmail.com');
define('SMTP_PASS',    'your-16-char-app-password');  // Google App Password or Webmail password
```

---

### Troubleshooting Contact Form & Emails

| Problem | Cause | Fix |
|---------|-------|-----|
| Form shows "Submission Failed" | API path incorrect | Ensure `NEXT_PUBLIC_CONTACT_API_URL` is set to `https://YOUR-REAL-DOMAIN.com/php-admin/api/contact.php` in `.env.production` before building |
| Email never arrives | Invalid SMTP password | Verify your 16-letter Google App Password (ensure 2-step verification is active) |
| GoDaddy Webmail authentication error | Port or host mismatch | Use host `smtpout.secureserver.net` with port `587` (TLS) or port `465` (SSL) |
| Email arrives in Spam (when using `mail()`) | Missing SPF/DKIM records | Enable SMTP (`SMTP_ENABLED = true`) to route through verified Google/Webmail servers |
| Leads not saving to `inquiries.json` | Folder permissions | Set `php-admin/data/` folder permissions to `755` in cPanel File Manager |

---

## 📁 PART 15 Addendum — Updated Folder Structure on GoDaddy

After adding the contact form and mailer engine, your `public_html/php-admin/` directory on GoDaddy should look like this:

```
public_html/php-admin/
├── config.php                   ← Includes DB credentials, CORS, and SMTP settings
├── api/
│   ├── contact.php              ← Contact form submission endpoint
│   ├── blogs.php
│   ├── blog-post.php
│   ├── portfolio.php
│   ├── venues.php
│   ├── gallery.php
│   ├── upload-image.php
│   ├── blog-sitemap.php         ← Dynamic blog posts XML sitemap
│   ├── portfolio-sitemap.php    ← Dynamic portfolio projects XML sitemap
│   ├── venues-sitemap.php       ← Dynamic venues XML sitemap
│   └── sitemap-index.php       ← Master sitemap index (submit to Google)
├── lib/
│   ├── Mailer.php               ← Unified SMTP + Native Mailer service
│   └── PHPMailer/               ← Standalone PHPMailer engine
│       ├── Exception.php
│       ├── PHPMailer.php
│       └── SMTP.php
├── data/
│   ├── .htaccess                ← Blocks public web access to data files
│   ├── inquiries.json           ← Auto-created backup of all submitted inquiries
│   ├── page-visibility.json     ← On/off toggles for main navigation sections
│   ├── portfolio.json           ← Fast JSON data store for portfolio case studies
│   ├── venues.json              ← Fast JSON data store for luxury venues
│   ├── gallery.json             ← Fast JSON data store for gallery photography
│   └── posts.json
└── manage-7f3b9x2k/
    └── [... admin panel files ...]
```

---

*Guide created for: 11:11 Decor website — Next.js 14 static export + PHP/MySQL backend on GoDaddy cPanel Shared Hosting*
