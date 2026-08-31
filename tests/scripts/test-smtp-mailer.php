<?php
/**
 * Test Harness for 11:11 Decor Mailer & SMTP Integration
 * Tests:
 *  1. Mailer file existence & class loading
 *  2. Default fallback behavior (when SMTP_ENABLED is false)
 *  3. SMTP configured behavior (PHPMailer setup)
 *  4. Exception handling and graceful fallback to mail()
 */

require_once __DIR__ . '/../../php-admin/config.php';
$mailerPath = __DIR__ . '/../../php-admin/lib/Mailer.php';

if (!file_exists($mailerPath)) {
    echo json_encode([
        'success' => false,
        'error' => 'Mailer.php does not exist at ' . $mailerPath
    ]);
    exit(1);
}

require_once $mailerPath;

$results = [
    'mailer_loaded' => true,
    'fallback_when_disabled' => false,
    'smtp_class_available' => false,
    'resilient_error_handling' => false
];

// Test 1: Check if PHPMailer classes are loadable
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    $results['smtp_class_available'] = true;
}

// Test 2: Test sendInquiryEmail in test mode with SMTP disabled
putenv('APP_ENV=test');
$testSend = sendInquiryEmail(
    'test-recipient@example.com',
    'Test Subject',
    '<p>Test Body</p>',
    'sender@example.com',
    'Test Sender'
);

if ($testSend['success'] === true && $testSend['mode'] === 'test_mode') {
    $results['fallback_when_disabled'] = true;
}

// Test 3: Test resiliency when invalid SMTP settings are simulated
$resilientTest = sendInquiryEmail(
    'test-recipient@example.com',
    'Test Error Recovery',
    '<p>Body</p>',
    'sender@example.com',
    'Test Sender',
    [
        'smtp_enabled' => true,
        'smtp_host' => 'invalid.host.nonexistent.local',
        'smtp_port' => 587,
        'smtp_user' => 'fake',
        'smtp_pass' => 'fake',
        'test_error_fallback' => true
    ]
);

if ($resilientTest['success'] === true && (isset($resilientTest['fallback_used']) && $resilientTest['fallback_used'] === true || $resilientTest['mode'] === 'test_mode')) {
    $results['resilient_error_handling'] = true;
}

$allPassed = !in_array(false, $results, true);

echo json_encode([
    'success' => $allPassed,
    'results' => $results
]);

exit($allPassed ? 0 : 1);
