<?php
/**
 * 11:11 Decor — Contact Form Submission API
 * Endpoint: POST /php-admin/api/contact.php
 *
 * Responsibilities:
 *   1. Validate all incoming form fields
 *   2. Send a rich HTML email to the business inbox via PHP mail()
 *   3. Log every inquiry to data/inquiries.json as a backup lead store
 *   4. Return a clean JSON response to the Next.js frontend
 */

require_once __DIR__ . '/../config.php';

// ─── CORS Headers ────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Test-Mode');
header('Content-Type: application/json; charset=utf-8');

// Pre-flight OPTIONS request (browser CORS check)
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ─── Only allow POST ─────────────────────────────────────────────────────────
if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

// ─── Parse JSON Body ─────────────────────────────────────────────────────────
$rawBody = file_get_contents('php://input');
$data    = json_decode($rawBody, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON body.']);
    exit;
}

// ─── Sanitise & Validate ─────────────────────────────────────────────────────
$errors = [];

$name       = trim(strip_tags($data['name']       ?? ''));
$phone      = trim(strip_tags($data['phone']      ?? ''));
$email      = trim(strip_tags($data['email']      ?? ''));
$eventType  = trim(strip_tags($data['eventType']  ?? ''));
$eventDate  = trim(strip_tags($data['eventDate']  ?? ''));
$guestCount = trim(strip_tags($data['guestCount'] ?? ''));
$budget     = trim(strip_tags($data['budget']     ?? ''));
$message    = trim(strip_tags($data['message']    ?? ''));

if (empty($name))       $errors['name']       = 'Full name is required.';
if (empty($phone))      $errors['phone']      = 'Phone number is required.';
if (empty($email))      $errors['email']      = 'Email address is required.';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
if (empty($eventType))  $errors['eventType']  = 'Event type is required.';
if (empty($eventDate))  $errors['eventDate']  = 'Event date is required.';
if (empty($guestCount)) $errors['guestCount'] = 'Guest count is required.';
if (empty($message))    $errors['message']    = 'Please share your event vision with us.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// ─── Honeypot / Basic Spam Guard ─────────────────────────────────────────────
// The frontend form includes a hidden field "website"; any bot filling it in
// gets a silent 200 OK (so the bot thinks it succeeded) but no email is sent.
if (!empty($data['website'])) {
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit;
}

// ─── Build HTML Email ────────────────────────────────────────────────────────
$submittedAt = date('D, d M Y \a\t h:i A T');
$cleanPhone  = preg_replace('/[^0-9]/', '', $phone);

$htmlBody = "
<!DOCTYPE html>
<html lang=\"en\">
<head>
<meta charset=\"UTF-8\">
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
<title>New Inquiry — 11:11 Decor</title>
</head>
<body style=\"margin:0;padding:0;background:#f4efe8;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;\">
  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#f4efe8;padding:32px 12px;\">
    <tr>
      <td align=\"center\">
        <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5dcca;box-shadow:0 10px 35px rgba(0,0,0,0.06);\">

          <!-- Header -->
          <tr>
            <td style=\"background:#c9a96e;padding:26px 32px;text-align:center;\">
              <h1 style=\"margin:0;color:#111111;font-size:24px;font-weight:800;letter-spacing:2.5px;\">
                ✦ 11:11 DECOR ✦
              </h1>
              <p style=\"margin:5px 0 0;color:#2c2214;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;\">
                New Event Inquiry Received
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style=\"padding:32px 28px;background:#ffffff;\">
              <p style=\"margin:0 0 20px;color:#444444;font-size:14px;line-height:1.6;\">
                A new inquiry was submitted on <strong style=\"color:#8c6d37;\">{$submittedAt}</strong>. Full event requirements are listed below:
              </p>

              <!-- Detail Table -->
              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse;border:1px solid #ede5d8;border-radius:6px;overflow:hidden;\">
                " . _contact_row('Full Name',    $name) . "
                " . _contact_row('Phone',        $phone) . "
                " . _contact_row('Email',        $email) . "
                " . _contact_row('Event Type',   $eventType) . "
                " . _contact_row('Event Date',   $eventDate) . "
                " . _contact_row('Guest Count',  $guestCount) . "
                " . _contact_row('Budget Range', $budget ?: 'Not specified') . "
              </table>

              <!-- Message Block -->
              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:20px;border-collapse:collapse;\">
                <tr>
                  <td style=\"padding:16px 18px;background:#f9f6f0;border-left:4px solid #c9a96e;border-radius:0 6px 6px 0;\">
                    <p style=\"margin:0 0 6px;color:#8c6d37;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:800;\">
                      Event Vision / Client Message
                    </p>
                    <p style=\"margin:0;color:#222222;font-size:14px;line-height:1.7;white-space:pre-wrap;font-weight:500;\">" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</p>
                  </td>
                </tr>
              </table>

              <!-- Client Quick Actions -->
              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:24px;background:#faf8f5;border:1px solid #ebdcc5;border-radius:8px;\">
                <tr>
                  <td style=\"padding:16px 20px;\">
                    <p style=\"margin:0 0 10px;color:#8c6d37;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:800;\">
                      ⚡ Quick Response Actions
                    </p>
                    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">
                      <tr>
                        <td style=\"padding:4px 0;\">
                          <span style=\"color:#666666;font-size:13px;font-weight:600;\">Email: </span>
                          <a href=\"mailto:{$email}?subject=Re: Your 11:11 Decor Inquiry — {$eventType}\" style=\"color:#b38c47;font-size:14px;font-weight:700;text-decoration:underline;\">{$email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style=\"padding:4px 0;\">
                          <span style=\"color:#666666;font-size:13px;font-weight:600;\">Phone: </span>
                          <a href=\"tel:{$phone}\" style=\"color:#111111;font-size:14px;font-weight:700;text-decoration:none;\">{$phone}</a>
                          " . ($cleanPhone ? "<a href=\"https://wa.me/{$cleanPhone}\" style=\"display:inline-block;margin-left:10px;padding:3px 10px;background:#25D366;color:#ffffff;border-radius:4px;font-size:11px;font-weight:700;text-decoration:none;\">Chat on WhatsApp</a>" : "") . "
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style=\"padding:18px 28px;background:#f9f6f0;border-top:1px solid #ede5d8;text-align:center;\">
              <p style=\"margin:0;color:#777777;font-size:12px;line-height:1.5;\">
                This inquiry was submitted on the 11:11 Decor website.<br>
                Click <strong>Reply</strong> in your mail app to respond directly to <strong>{$name}</strong> ({$email}).
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
";

// ─── Test Mode Detection ─────────────────────────────────────────────────────
// When running automated tests (Playwright, CI, or test suite), redirect inquiries
// to inquiries_test.json to protect real leads and prevent git diff pollution.
$isTest = (getenv('APP_ENV') === 'test')
    || (!empty($_SERVER['HTTP_X_TEST_MODE']))
    || (isset($_SERVER['HTTP_X_PLAYWRIGHT_TEST']))
    || (isset($data['_test_mode']) && $data['_test_mode'] === true)
    || (isset($email) && strpos($email, '@example.com') !== false);

// ─── Send Email (skipped in test mode to prevent SMTP hangs) ──────────────────
require_once __DIR__ . '/../lib/Mailer.php';

$toEmail   = defined('CONTACT_EMAIL') ? CONTACT_EMAIL : 'hello@elevenelevendecor.com';
$subject   = "✔ New Event Inquiry: {$eventType} — {$name}";
$emailSent = false;

if (!$isTest) {
    $mailResult = sendInquiryEmail($toEmail, $subject, $htmlBody, $email, $name);
    $emailSent  = !empty($mailResult['success']);
}

// ─── Log Inquiry to JSON (Safety Backup) ─────────────────────────────────────
$logFile = $isTest
    ? get_data_dir() . '/inquiries_test.json'
    : get_data_dir() . '/inquiries.json';
$logDir  = dirname($logFile);

if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}

$existing = [];
if (file_exists($logFile)) {
    $existing = json_decode(file_get_contents($logFile), true) ?: [];
}

$maxId = 0;
foreach ($existing as $entry) {
    if ((int)($entry['id'] ?? 0) > $maxId) {
        $maxId = (int)$entry['id'];
    }
}

$newEntry = [
    'id'          => $maxId + 1,
    'name'        => $name,
    'phone'       => $phone,
    'email'       => $email,
    'eventType'   => $eventType,
    'eventDate'   => $eventDate,
    'guestCount'  => $guestCount,
    'budget'      => $budget,
    'message'     => $message,
    'submitted_at' => date('Y-m-d H:i:s'),
    'email_sent'  => $emailSent,
];

$existing[] = $newEntry;
file_put_contents($logFile, json_encode(array_values($existing), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// ─── Response ─────────────────────────────────────────────────────────────────
echo json_encode([
    'success'    => true,
    'message'    => 'Your inquiry has been received. We will be in touch shortly.',
    'email_sent' => $emailSent,
]);

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Renders a single label/value row for the HTML email table.
 */
function _contact_row(string $label, string $value): string {
    $safeValue = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    return "
        <tr>
          <td style=\"padding:12px 16px;background:#fcfaf7;border-bottom:1px solid #ede5d8;width:150px;vertical-align:top;\">
            <span style=\"color:#8c6d37;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:800;\">{$label}</span>
          </td>
          <td style=\"padding:12px 16px;background:#ffffff;border-bottom:1px solid #ede5d8;vertical-align:top;\">
            <span style=\"color:#111111;font-size:14px;font-weight:600;\">{$safeValue}</span>
          </td>
        </tr>";
}
