# 🌐 11:11 Decor — GoDaddy Deployment Guide
### Complete Step-by-Step Beginner's Guide

---

> **IMPORTANT — Where to enter your real domain name:**
> Every time you see `YOUR-REAL-DOMAIN.com` in this guide, that is where you must type **your actual domain** (e.g., `elevenelevendecor.com`). There are **4 key places** — they are all clearly marked with a 🔴 symbol.

---

## 📋 What This Project Is Made Of

Before we start, here's a quick map so you understand what you're deploying:

| Part | What it is | Where it goes on GoDaddy |
|------|-----------|--------------------------|
| **Next.js Website** | The public-facing website (all pages) | Uploaded as HTML/CSS/JS files to `public_html/` |
| **PHP Admin Panel** | A private backend to write/edit blog posts | Uploaded to `public_html/php-admin/` |
| **MySQL Database** | Stores all your blog posts | Created inside GoDaddy cPanel |
| **PHP API** | Connects the website to the database | Part of the PHP admin upload |

---

## 🛒 PART 1 — GoDaddy Hosting Requirements

### Step 1.1 — What GoDaddy Plan You Need

You need a GoDaddy **cPanel Shared Hosting** plan (also called "Web Hosting"). Any of these plans work:
- Economy
- Deluxe  
- Ultimate ✅ *(Recommended — includes more MySQL databases)*

> **Do NOT** use GoDaddy's "Website Builder" product — that is a completely different product and won't work for this project. You need the classic **cPanel Web Hosting**.

### Step 1.2 — Make Sure PHP and MySQL Are Available

GoDaddy's cPanel hosting includes PHP and MySQL by default. You don't need to install anything extra. However, confirm the PHP version is **8.0 or higher**:

1. Log in to GoDaddy → go to **My Products**
2. Click **Manage** next to your hosting plan
3. Scroll to find **cPanel Admin** → click it to open cPanel
4. Inside cPanel, look for **"PHP Selector"** or **"MultiPHP Manager"**
5. Select **PHP 8.1** or **PHP 8.2** from the dropdown and save

---

## 🔨 PART 2 — Build the Website on Your Computer (One-Time Step)

This step converts the Next.js project into plain HTML files that GoDaddy can serve.

### Step 2.1 — Open a Terminal in the Project Folder

1. Open the folder `eleven_eleven_decor` on your Desktop
2. Right-click inside the folder → **"Open in Terminal"** (or open PowerShell and navigate there)

### Step 2.2 — Set the Environment Variable

Before building, you need to tell the website what your real domain is.

1. In the project folder, find the file `.env.example`
2. **Make a copy** of it and rename the copy to `.env.production`
3. Open `.env.production` in any text editor (Notepad is fine)
4. You will see this line:

```
NEXT_PUBLIC_SITE_URL=https://elevenelevendecor.com
```

🔴 **DOMAIN CHANGE #1** — Change `elevenelevendecor.com` to **your real domain**:
```
NEXT_PUBLIC_SITE_URL=https://YOUR-REAL-DOMAIN.com
```

5. Also set `NODE_ENV=production` in that same file
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
Options -MultiViews
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

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

5. Save the file

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

This includes:
- `api/` folder (with all `.php` files inside)
- `manage-7f3b9x2k/` folder (with the admin panel files inside)
- `data/` folder (can be empty)

> **Caution:** Do **NOT** upload `config.php` from your local machine — it has local/development settings. You will create a fresh one on the server in the next step.

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

// 🔴 DOMAIN CHANGE #2 — Replace with your real domain
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
🔴 DOMAIN CHANGE #3 — Use your real domain:
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

## 🌐 PART 8 — Connect Your Domain to GoDaddy Hosting

*Skip this section if your domain is already pointing to your hosting.*

### Step 8.1 — Point Your Domain to the Hosting

1. In GoDaddy, go to **My Products** → find your **Domain** → click **Manage**
2. Click **DNS** (or "Manage DNS")
3. Find the **A Record** (Type = A, Name = @)
4. Change its **Value** to your hosting server's IP address
   - Find your server IP in cPanel → **"Shared IP Address"** (shown on the cPanel home screen)
5. Also update the **CNAME** for `www` to point to `@` or your domain

> **Note:** DNS changes can take **up to 48 hours** to fully propagate worldwide, though usually it's much faster (under 1 hour).

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
| Static sitemap | `https://YOUR-DOMAIN.com/sitemap.xml` | Shows XML with all pages & blog categories |
| Blog posts sitemap | `https://YOUR-DOMAIN.com/php-admin/api/blog-sitemap.php` | Shows XML with all published blog posts |
| Sitemap index | `https://YOUR-DOMAIN.com/php-admin/api/sitemap-index.php` | Shows XML index pointing to both sitemaps above |

---

## 🔍 PART 11 — Google Search Console & Sitemaps

This project uses a **Sitemap Index** approach — one master file that points Google to two separate sitemaps. This is the industry-standard way to handle mixed static + dynamic content.

### The Three Sitemap Files Explained

| File | URL on GoDaddy | What it contains | Updates when? |
|------|---------------|-----------------|---------------|
| **`sitemap.xml`** | `https://YOUR-DOMAIN.com/sitemap.xml` | All static pages — Home, About, Services, Events, Portfolio, Venues, Gallery, Contact, Blog category pages | Only when you **rebuild and re-upload** the site |
| **`blog-sitemap.php`** | `https://YOUR-DOMAIN.com/php-admin/api/blog-sitemap.php` | Every **published blog post** individually | **Automatically** — the second you publish a new post |
| **`sitemap-index.php`** | `https://YOUR-DOMAIN.com/php-admin/api/sitemap-index.php` | Just a master index pointing to the two files above | Always up to date |

> **Key point:** `sitemap.xml` will NOT show individual blog posts — that is by design. Blog posts live in the PHP sitemap which updates automatically.

---

### Step 11.1 — Submit to Google Search Console

Google Search Console is the free Google tool that tells Google about your website. Here's how to set it up:

1. Go to [Google Search Console](https://search.google.com/search-console/) and sign in with a Google account
2. Click **"Add Property"** → select **"URL prefix"** → type your full domain: `https://YOUR-DOMAIN.com`
3. Verify ownership — Google will give you an HTML file to upload to `public_html/` on GoDaddy (just upload it via File Manager)
4. Once verified, click **"Sitemaps"** in the left sidebar
5. In the **"Add a new sitemap"** box, type:

```
php-admin/api/sitemap-index.php
```

6. Click **"Submit"**

That's it! Google will now automatically discover:
- All your static pages (from `sitemap.xml`)
- All your blog posts (from `blog-sitemap.php`)

> **Note:** You only submit the **sitemap index URL** — Google follows the links inside it to find both sitemaps automatically.

---

### Step 11.2 — What Happens When You Publish a New Blog Post

Here's the full picture of what happens automatically once the site is live on GoDaddy:

1. You log into `https://YOUR-DOMAIN.com/php-admin/manage-7f3b9x2k/`
2. You write and publish a new blog post
3. The post immediately appears on the live website at `https://YOUR-DOMAIN.com/blog/category/post-slug/`
4. The post **immediately** appears in `blog-sitemap.php` (no rebuild needed)
5. The next time Google crawls your sitemap index, it will find the new post and index it

> **You never need to rebuild or re-upload the site just to add a new blog post.** The PHP backend handles it entirely.

---

## 🔑 PART 12 — Admin Panel — How to Use It

Once everything is set up, you can manage blog posts at:

🔴 **DOMAIN CHANGE #4** — Use your real domain in this URL:
```
https://YOUR-REAL-DOMAIN.com/php-admin/manage-7f3b9x2k/
```

- **Login:** Enter the admin password you set in Step 5.2
- From the dashboard you can: create new posts, edit existing posts, upload images, publish/unpublish posts

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
├── about-us/
│   └── index.html
├── blog/
│   └── index.html
├── contact/
│   └── index.html
├── [... all other pages from out/ ...]
└── php-admin/
    ├── config.php                   ← Created fresh on server in Step 5.2 (NEVER upload from local)
    ├── api/
    │   ├── blogs.php
    │   ├── blog-post.php
    │   ├── upload-image.php
    │   ├── blog-sitemap.php          ← NEW: Dynamic blog posts XML sitemap
    │   └── sitemap-index.php        ← NEW: Master sitemap index (submit THIS to Google)
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

## 🔴 Quick Reference — All 4 Domain Name Locations

### Sitemap URLs at a Glance

| Purpose | URL | Submit to Google? |
|---------|-----|-------------------|
| Static pages sitemap | `https://YOUR-DOMAIN.com/sitemap.xml` | No — Google finds it via the index |
| Blog posts sitemap | `https://YOUR-DOMAIN.com/php-admin/api/blog-sitemap.php` | No — Google finds it via the index |
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

## 📬 PART 15 — Contact Form Email Setup

When a visitor submits the enquiry form on `/contact`, your website POSTs the data to `php-admin/api/contact.php`. That PHP script does two things:

1. **Sends an HTML email** directly to your business inbox via GoDaddy's built-in mail server.
2. **Saves the lead** to `php-admin/data/inquiries.json` as a permanent backup (so you never lose an inquiry even if an email goes to spam).

---

### Step 15.1 — Set Your Business Email in `config.php`

When you create (or edit) `config.php` on the GoDaddy server (see Step 5.2), you must add **two extra lines** alongside the other settings:

```php
// ─── Contact Form Email Settings ─────────────────────────────────────────────
// CONTACT_EMAIL    — where incoming inquiries land in your inbox
// CONTACT_FROM_EMAIL — the "From:" address GoDaddy uses to send the email
//                      ⚠ MUST be an address on your hosted domain (e.g. noreply@yourdomain.com)
//                      GoDaddy BLOCKS emails where "From" is a random address.

define('CONTACT_EMAIL',      'hello@YOUR-REAL-DOMAIN.com');
define('CONTACT_FROM_EMAIL', 'noreply@YOUR-REAL-DOMAIN.com');
```

🔴 **Replace `YOUR-REAL-DOMAIN.com` with your actual domain** (e.g. `elevenelevendecor.com`).

> **Why two addresses?**
> - `CONTACT_EMAIL` is *where you receive the email* (can be any Gmail, Outlook, or business address).
> - `CONTACT_FROM_EMAIL` must be a mailbox **on the same domain as your GoDaddy hosting** (e.g. `noreply@elevenelevendecor.com`). GoDaddy's outgoing mail server will silently reject emails where the `From:` header doesn't match a hosted domain. The **visitor's own email** is placed in the `Reply-To:` header automatically, so you can reply directly to them with one click.

---

### Step 15.2 — Create the `noreply@` Mailbox on GoDaddy (One-Time)

GoDaddy requires a real mailbox to exist before using it as the `From:` address.

1. Log into GoDaddy → **My Products** → find your domain → click **Manage** under Email
2. Click **Create** (or **Add Mailbox**)
3. Enter `noreply` as the mailbox name → it becomes `noreply@yourdomain.com`
4. Set any password (you won't need to log into this mailbox; it's only used for sending)
5. Click **Create**

> **Note:** If you already have a mailbox like `hello@yourdomain.com`, you can use that as `CONTACT_FROM_EMAIL` instead. It just must exist on GoDaddy.

---

### Step 15.3 — Verify the Endpoint Works After Deploying

Once everything is uploaded, test the contact form by visiting:

```
https://YOUR-REAL-DOMAIN.com/contact/
```

Fill in the form and submit. Within a few seconds you should:

1. **See the gold success banner** on the form ("Thank You! Your Inquiry Has Been Received.")
2. **Receive an email** in your `CONTACT_EMAIL` inbox with the full inquiry details and a one-click "Reply to [Name]" button.
3. **See the lead logged** in `public_html/php-admin/data/inquiries.json` (viewable via cPanel File Manager).

---

### Step 15.4 — Protect the `inquiries.json` Log File

The `data/` folder already has an `.htaccess` that blocks browser access (from Step 5.3). This means `inquiries.json` is **never publicly accessible** — it is only readable by your PHP scripts on the server.

> You can view saved leads at any time by opening `public_html/php-admin/data/inquiries.json` in cPanel → File Manager → Edit.

---

### Final `config.php` on GoDaddy — Complete Template

After all setup steps, your server-side `config.php` should look like this:

```php
<?php
// MySQL Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'YOUR_FULL_DATABASE_NAME');    // e.g. johndoe_elevendecor_blog
define('DB_USER', 'YOUR_FULL_DATABASE_USER');    // e.g. johndoe_elevendecor_user
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');

// 🔴 DOMAIN CHANGE #2
define('CORS_ORIGIN', 'https://YOUR-REAL-DOMAIN.com');

// Admin Panel Password (bcrypt hash)
define('ADMIN_PASSWORD_HASH', password_hash('YourAdminPassword!', PASSWORD_BCRYPT));

// Session lifetime
define('SESSION_LIFETIME', 7200);

// 🔴 Contact Form Email Settings
define('CONTACT_EMAIL',      'hello@YOUR-REAL-DOMAIN.com');       // ← Your real inbox
define('CONTACT_FROM_EMAIL', 'noreply@YOUR-REAL-DOMAIN.com');     // ← Must be on this domain
```

---

### Troubleshooting Contact Form Emails

| Problem | Fix |
|---------|-----|
| Form shows "Submission Failed" | Check that `php-admin/api/contact.php` was uploaded correctly to GoDaddy |
| Email never arrives | Check Spam/Junk folder first. Then verify `CONTACT_FROM_EMAIL` matches your hosted domain |
| `CONTACT_EMAIL` not defined error | You forgot to add the two new constants to `config.php` on the GoDaddy server |
| Email arrives but "From" is wrong | Change `CONTACT_FROM_EMAIL` to a real mailbox on your GoDaddy domain |
| Leads not appearing in `inquiries.json` | Check that `php-admin/data/` folder has permissions `755` in cPanel |
| Form works locally but not on GoDaddy | Set `NEXT_PUBLIC_CONTACT_API_URL=https://YOUR-REAL-DOMAIN.com/php-admin/api/contact.php` in `.env.production` before rebuilding |

---

## 📁 PART 15 Addendum — Updated Folder Structure on GoDaddy

After adding the contact form, your `public_html/php-admin/` should look like this:

```
public_html/php-admin/
├── config.php                   ← Now also includes CONTACT_EMAIL + CONTACT_FROM_EMAIL
├── api/
│   ├── contact.php              ← NEW: Contact form endpoint (email + lead log)
│   ├── blogs.php
│   ├── blog-post.php
│   ├── upload-image.php
│   ├── gallery.php
│   ├── venues.php
│   ├── blog-sitemap.php
│   └── sitemap-index.php
├── data/
│   ├── .htaccess                ← Blocks browser access to all files below
│   ├── inquiries.json           ← NEW: Auto-created on first form submission
│   └── posts.json
└── manage-7f3b9x2k/
    └── [... admin panel files ...]
```

---

*Guide created for: 11:11 Decor website — Next.js 14 static export + PHP/MySQL backend on GoDaddy cPanel Shared Hosting*
