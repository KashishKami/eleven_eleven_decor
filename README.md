# 11:11 Decor — Luxury Wedding & Event Decor

A full-stack editorial platform for **11:11 Decor**, featuring a Next.js frontend with smooth GSAP animations and a lightweight, headless PHP content management backend and contact form API.

---

## Architecture Overview

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, GSAP + Lenis smooth scrolling, Tiptap editor.
- **Backend & Admin Panel**: Standalone PHP service (`php-admin/`) providing REST APIs (contact submissions, blog posts, gallery, portfolio) and an Editorial Blog Studio dashboard.

---

## 1. Prerequisites

Before getting started, make sure you have the following installed on your machine:

### Node.js (v18.x, v20.x, or later)
Verify your installation:
```bash
node --version
npm --version
```
If not installed, download from [nodejs.org](https://nodejs.org/).

### pnpm (Recommended Package Manager)
Install `pnpm` using any of the following methods:

**Cross-Platform (via Node Corepack):**
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

**Cross-Platform (via npm):**
```bash
npm install -g pnpm
```

**Windows (PowerShell):**
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**macOS / Linux:**
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

---

## 2. Installing PHP (v8.1 or later)

The backend requires PHP with common extensions (`curl`, `mbstring`, `openssl`, `pdo_mysql`, `fileinfo`).

### Windows

#### Option A: Using Windows Package Manager (`winget`)
Run in PowerShell:
```powershell
winget install PHP.PHP.8.3
```
*Note: If `winget` throws a 404 error due to an outdated package manifest URL, use Option B.*

#### Option B: Automated PowerShell Installer (Recommended if winget fails)
Run in project root PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File .\install-php.ps1
```
This automatically downloads official PHP 8.3, extracts to `C:\php`, configures `php.ini` with all required extensions, and adds it to your User `PATH`.

#### Option C: Using Chocolatey or Scoop
```powershell
# Using Chocolatey
choco install php -y

# Using Scoop
scoop install php
```

#### Option D: Manual Zip Installation
1. Download **VS16 x64 Thread Safe** or **Non Thread Safe** zip from [windows.php.net/download](https://windows.php.net/download/).
2. Extract to `C:\php`.
3. Add `C:\php` to your System `PATH` environment variable.
4. Rename `C:\php\php.ini-development` to `C:\php\php.ini` and uncomment extensions:
   - `extension_dir = "ext"`
   - `extension=curl`
   - `extension=fileinfo`
   - `extension=mbstring`
   - `extension=openssl`
   - `extension=pdo_mysql`

Verify on Windows:
```powershell
php --version
```

---

### macOS

Using [Homebrew](https://brew.sh/):
```bash
brew install php
brew services start php
```

Verify on macOS:
```bash
php --version
```

---

### Linux (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install -y php php-cli php-curl php-mbstring php-xml php-mysql php-zip
```

### Linux (Fedora / RHEL)

```bash
sudo dnf install -y php php-cli php-curl php-mbstring php-xml php-mysqlnd php-zip
```

Verify on Linux:
```bash
php --version
```

---

## 3. Windows PowerShell Script Execution Fix

If you encounter the error:
> `File ...\npm.ps1 cannot be loaded because running scripts is disabled on this system`

Run the following command once in PowerShell to allow signed scripts for your user account:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 4. Project Setup & Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/KashishKami/eleven_eleven_decor.git
cd eleven_eleven_decor
```

### Step 2: Configure Environment Variables

#### A. Frontend Configuration
Copy the template `.env.example` to `.env.local`:

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env.local
```

**macOS / Linux:**
```bash
cp .env.example .env.local
```

The default values in `.env.local` are preconfigured for local development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_API_URL=http://127.0.0.1:8080/api/contact.php
NEXT_PUBLIC_API_URL=
NODE_ENV=development
```

#### B. PHP Admin & API Configuration (Required)

Before starting the PHP backend or running tests, create `php-admin/config.php` from the template `php-admin/config.example.php`:

**Windows (PowerShell):**
```powershell
Copy-Item php-admin\config.example.php php-admin\config.php
```

**macOS / Linux:**
```bash
cp php-admin/config.example.php php-admin/config.php
```

##### What to Configure in `php-admin/config.php`:
1. **Contact Form & Notifications:**
   - `CONTACT_EMAIL`: The recipient email address where website inquiry submissions will be delivered.
   - `CONTACT_FROM_EMAIL`: The "From" address (e.g. `noreply@yourdomain.com`). Must belong to your hosting domain on production servers (like GoDaddy) to prevent delivery blocks.
2. **SMTP Email Delivery (Recommended):**
   - If using authenticated SMTP (Gmail, Outlook, GoDaddy SecureServer), set `SMTP_ENABLED` to `true` and provide your host, port, user, and app password.
3. **Admin Studio Password:**
   - Default login password is `AdminPassword1111!` (or `Admin1111Decor!`). You can set a custom bcrypt hash in `ADMIN_PASSWORD_HASH`.
4. **Data Storage:**
   - **Local Development:** Zero-config JSON storage (`php-admin/data/`) is enabled automatically without requiring MySQL.
   - **Production (Optional):** Fill in `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS` to connect to a MySQL database.
   - **Automated Tests:** The test suite uses isolated test fixture sandboxes (`TEST_DATA_DIR`), meaning any live posts, portfolio items, or venues you add or delete in the admin dashboard will never break your automated test suite.

### Step 3: Install Node Dependencies

Using **pnpm** (recommended):
```bash
pnpm install
```

Or using **npm**:
```bash
npm install
```

---

## 5. Starting the Development Servers

This application requires running two separate local servers concurrently:
1. **The PHP Backend Server** (port 8080)
2. **The Next.js Frontend Dev Server** (port 3000)

### Terminal 1: Start the PHP Backend Server

In your project root directory, run:

```bash
php -S 127.0.0.1:8080 -t php-admin
```

This starts the PHP server with `php-admin` as its document root.

### Terminal 2: Start the Next.js Frontend Server

In another terminal window at your project root, run:

```bash
pnpm dev
```
*(or `npm run dev`)*

---

## 6. Access Links & Default Credentials

| Service | URL | Credentials |
| :--- | :--- | :--- |
| **Main Website (Next.js)** | [http://localhost:3000](http://localhost:3000) | *Public* |
| **Editorial Blog Studio (Admin Panel)** | [http://127.0.0.1:8080/manage-7f3b9x2k/](http://127.0.0.1:8080/manage-7f3b9x2k/) | **Password:** `AdminPassword1111!`<br>*(or `Admin1111Decor!`)* |
| **Contact API Endpoint** | [http://127.0.0.1:8080/api/contact.php](http://127.0.0.1:8080/api/contact.php) | *API endpoint for Next.js forms* |
| **Blog Posts API** | [http://127.0.0.1:8080/api/blogs.php](http://127.0.0.1:8080/api/blogs.php) | *API endpoint for published articles* |

> **Note on Admin Password:**
> The default admin login password is `AdminPassword1111!` (an alternative fallback password is `Admin1111Decor!`). You can change this password by generating a new bcrypt hash and updating `ADMIN_PASSWORD_HASH` in [php-admin/config.php](php-admin/config.php).

---

## 7. Available Scripts

| Command | Purpose |
| :--- | :--- |
| `pnpm dev` / `npm run dev` | Runs the Next.js development server on `http://localhost:3000` |
| `pnpm build` / `npm run build` | Builds the production Next.js bundle |
| `pnpm build:editor` / `npm run build:editor` | Compiles the Tiptap rich text editor bundle for the admin studio |
| `pnpm start` / `npm run start` | Starts the production Next.js server |
| `pnpm lint` / `npm run lint` | Runs ESLint checks |
| `pnpm typecheck` / `npm run typecheck` | Runs TypeScript type verification without emitting files |
| `pnpm test:unit` / `npm run test:unit` | Executes unit tests with Vitest |
| `pnpm test:e2e` / `npm run test:e2e` | Runs Playwright end-to-end tests |
| `pnpm ci:quality` / `npm run ci:quality` | Full CI verification pipeline (lint, typecheck, unit, e2e, build) |
