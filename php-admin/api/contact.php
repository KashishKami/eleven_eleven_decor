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
header('Access-Control-Allow-Headers: Content-Type');
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

$htmlBody = "
<!DOCTYPE html>
<html lang=\"en\">
<head>
<meta charset=\"UTF-8\">
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
<title>New Inquiry — 11:11 Decor</title>
</head>
<body style=\"margin:0;padding:0;background:#f5f0e8;font-family:'Helvetica Neue',Arial,sans-serif;\">
  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#f5f0e8;padding:30px 0;\">
    <tr>
      <td align=\"center\">
        <table width=\"620\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#1a1a1a;border-radius:10px;overflow:hidden;\">

          <!-- Header -->
          <tr>
            <td style=\"background:#c9a96e;padding:28px 36px;text-align:center;\">
              <h1 style=\"margin:0;color:#1a1a1a;font-size:26px;font-weight:700;letter-spacing:2px;\">
                ✦ 11:11 DECOR ✦
              </h1>
              <p style=\"margin:6px 0 0;color:#1a1a1a;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;\">
                New Event Inquiry Received
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style=\"padding:36px;\">
              <p style=\"margin:0 0 24px;color:#d0c8be;font-size:15px;line-height:1.6;\">
                A new event inquiry was submitted on <strong style=\"color:#c9a96e;\">{$submittedAt}</strong>. Full details are below.
              </p>

              <!-- Detail Table -->
              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse;\">
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
                  <td style=\"padding:14px 16px;background:#242424;border-left:3px solid #c9a96e;border-radius:0 6px 6px 0;\">
                    <p style=\"margin:0 0 6px;color:#c9a96e;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;\">
                      Event Vision / Message
                    </p>
                    <p style=\"margin:0;color:#e0d8ce;font-size:14px;line-height:1.7;white-space:pre-wrap;\">" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:30px;\">
                <tr>
                  <td align=\"center\">
                    <a href=\"mailto:{$email}?subject=Re: Your 11:11 Decor Inquiry — {$eventType}\"
                       style=\"display:inline-block;padding:14px 32px;background:#c9a96e;color:#1a1a1a;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:1px;border-radius:6px;\">
                      Reply to {$name} ↗
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style=\"padding:20px 36px;border-top:1px solid #2a2a2a;text-align:center;\">
              <p style=\"margin:0;color:#555;font-size:12px;\">
                This email was auto-generated by the 11:11 Decor contact form.<br>
                The inquiry has also been saved to your admin lead log.
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

// ─── Send Email ───────────────────────────────────────────────────────────────
$toEmail     = defined('CONTACT_EMAIL') ? CONTACT_EMAIL : 'hello@elevenelevendecor.com';
$fromEmail   = defined('CONTACT_FROM_EMAIL') ? CONTACT_FROM_EMAIL : 'noreply@elevenelevendecor.com';
$fromName    = '11:11 Decor Website';
$subject     = "✦ New Event Inquiry: {$eventType} — {$name}";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$fromName} <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$emailSent = @mail($toEmail, $subject, $htmlBody, $headers);

// ─── Log Inquiry to JSON (Safety Backup) ─────────────────────────────────────
$logFile = __DIR__ . '/../data/inquiries.json';
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
          <td style=\"padding:10px 14px;background:#242424;border-bottom:1px solid #2e2e2e;width:160px;vertical-align:top;\">
            <span style=\"color:#c9a96e;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;\">{$label}</span>
          </td>
          <td style=\"padding:10px 14px;background:#1e1e1e;border-bottom:1px solid #2e2e2e;vertical-align:top;\">
            <span style=\"color:#e0d8ce;font-size:14px;\">{$safeValue}</span>
          </td>
        </tr>";
}
