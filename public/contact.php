<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed'
    ]);
    exit;
}

function clean_input(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$name = isset($_POST['name']) ? clean_input((string) $_POST['name']) : '';
$email = isset($_POST['email']) ? trim((string) $_POST['email']) : '';
$department = isset($_POST['department']) ? trim((string) $_POST['department']) : 'general';
$subject = isset($_POST['subject']) ? clean_input((string) $_POST['subject']) : '';
$message = isset($_POST['message']) ? trim((string) $_POST['message']) : '';

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email address'
    ]);
    exit;
}

if (
    strlen($name) > 120 ||
    strlen($email) > 180 ||
    strlen($department) > 50 ||
    strlen($subject) > 180 ||
    strlen($message) > 5000
) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Input too long'
    ]);
    exit;
}

$to = 'hello@jirehgrp.com';

if ($department === 'sales') {
    $to = 'sales@jirehgrp.com';
} elseif ($department === 'support') {
    $to = 'support@jirehgrp.com';
} else {
    $routeText = strtolower($subject . ' ' . $message);

    if (
        str_contains($routeText, 'price') ||
        str_contains($routeText, 'quote') ||
        str_contains($routeText, 'proposal') ||
        str_contains($routeText, 'cost')
    ) {
        $to = 'sales@jirehgrp.com';
    }

    if (
        str_contains($routeText, 'support') ||
        str_contains($routeText, 'help') ||
        str_contains($routeText, 'issue') ||
        str_contains($routeText, 'problem') ||
        str_contains($routeText, 'bug')
    ) {
        $to = 'support@jirehgrp.com';
    }
}

$mailSubject = '[Jirehgrp] New Inquiry — ' . $subject;
$replySubject = 'We received your message — Jirehgrp';

$safeName = esc($name);
$safeEmail = esc($email);
$safeDepartment = esc(strtoupper($department));
$safeSubject = esc($subject);
$safeMessage = nl2br(esc($message));
$safeIp = esc($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$safeAgent = esc($_SERVER['HTTP_USER_AGENT'] ?? 'unknown');
$sentAt = date('F j, Y \a\t H:i:s');

$adminBody = '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="color-scheme" content="dark">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#0b0a09;font-family:Arial,Helvetica,sans-serif;color:#f5f1e9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0b0a09;margin:0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:760px;background:#100e0c;border:1px solid #26221c;border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:36px 32px 24px 32px;border-bottom:1px solid #221e18;">
              <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#e6b257;margin-bottom:16px;">
                NEW INQUIRY // JIREHGRP.COM
              </div>
              <div style="font-family:Georgia,\'Times New Roman\',serif;font-size:44px;line-height:1.02;font-weight:700;letter-spacing:-1px;color:#f5f1e9;margin:0;">
                Start the<br>conversation.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 32px 4px 32px;">
              <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#e6b257;">
                Contact details
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 32px 8px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="width:50%;padding:0 8px 16px 0;vertical-align:top;">
                    <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:18px;">
                      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:8px;">Name</div>
                      <div style="font-size:16px;color:#f5f1e9;font-weight:600;">' . $safeName . '</div>
                    </div>
                  </td>
                  <td style="width:50%;padding:0 0 16px 8px;vertical-align:top;">
                    <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:18px;">
                      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:8px;">Email</div>
                      <div style="font-size:16px;color:#f5f1e9;font-weight:600;">' . $safeEmail . '</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 16px 32px;">
              <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:18px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:8px;">Department</div>
                <div style="font-size:16px;color:#e6b257;font-weight:600;">' . $safeDepartment . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 16px 32px;">
              <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:18px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:8px;">Project subject</div>
                <div style="font-size:16px;color:#f5f1e9;font-weight:600;">' . $safeSubject . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 28px 32px;">
              <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:20px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:12px;">Message</div>
                <div style="font-size:15px;line-height:1.8;color:#d8d2c6;">' . $safeMessage . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px 32px;">
              <div style="border-top:1px solid #221e18;padding-top:20px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#e6b257;margin-bottom:10px;">Meta</div>
                <div style="font-size:13px;line-height:1.8;color:#a8a096;">
                  <strong style="color:#f5f1e9;">Sent at:</strong> ' . esc($sentAt) . '<br>
                  <strong style="color:#f5f1e9;">IP:</strong> ' . $safeIp . '<br>
                  <strong style="color:#f5f1e9;">User agent:</strong> ' . $safeAgent . '
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;border-top:1px solid #221e18;background:#0d0b09;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#8c857a;">
                    Jirehgrp <span style="color:#e6b257;">//</span> Addis Ababa
                  </td>
                  <td align="right" style="font-size:12px;color:#8c857a;">
                    © 2026 JIREHGRP
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

$replyBody = '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="color-scheme" content="dark">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background:#0b0a09;font-family:Arial,Helvetica,sans-serif;color:#f5f1e9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0b0a09;margin:0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:760px;background:#100e0c;border:1px solid #26221c;border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:36px 32px;border-bottom:1px solid #221e18;">
              <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#e6b257;margin-bottom:16px;">
                MESSAGE RECEIVED
              </div>
              <div style="font-family:Georgia,\'Times New Roman\',serif;font-size:44px;line-height:1.02;font-weight:700;letter-spacing:-1px;color:#f5f1e9;margin:0 0 18px 0;">
                Thanks, ' . $safeName . '.
              </div>
              <div style="font-size:15px;line-height:1.8;color:#d8d2c6;">
                We&rsquo;ve received your inquiry and a member of the Jirehgrp team
                will get back to you shortly. Here&rsquo;s a copy for your records.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 32px 14px 32px;">
              <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#e6b257;">
                Inquiry summary
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 16px 32px;">
              <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:18px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:8px;">Department</div>
                <div style="font-size:16px;color:#e6b257;font-weight:600;">' . $safeDepartment . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 16px 32px;">
              <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:18px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:8px;">Subject</div>
                <div style="font-size:16px;color:#f5f1e9;font-weight:600;">' . $safeSubject . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px 32px;">
              <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:20px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:12px;">Your message</div>
                <div style="font-size:15px;line-height:1.8;color:#d8d2c6;">' . $safeMessage . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;border-top:1px solid #221e18;background:#0d0b09;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#8c857a;">
                    hello@jirehgrp.com
                  </td>
                  <td align="right" style="font-size:12px;color:#8c857a;">
                    © 2026 JIREHGRP
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Jirehgrp Contact <hello@jirehgrp.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$replyHeaders = [];
$replyHeaders[] = 'MIME-Version: 1.0';
$replyHeaders[] = 'Content-Type: text/html; charset=UTF-8';
$replyHeaders[] = 'From: Jirehgrp Contact <hello@jirehgrp.com>';
$replyHeaders[] = 'Reply-To: hello@jirehgrp.com';
$replyHeaders[] = 'X-Mailer: PHP/' . phpversion();

$success = mail(
    $to,
    '=?UTF-8?B?' . base64_encode($mailSubject) . '?=',
    $adminBody,
    implode("\r\n", $headers),
    '-fhello@jirehgrp.com'
);

if (!$success) {
    http_response_code(500);
    error_log('contact.php mail() failed for email: ' . $email);

    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to send message'
    ]);
    exit;
}

$replySent = mail(
    $email,
    '=?UTF-8?B?' . base64_encode($replySubject) . '?=',
    $replyBody,
    implode("\r\n", $replyHeaders),
    '-fhello@jirehgrp.com'
);

if (!$replySent) {
    error_log('contact.php auto-reply failed for: ' . $email);
}

echo json_encode([
    'status' => 'success',
    'message' => 'Message sent successfully'
]);