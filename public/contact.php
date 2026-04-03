<!-- public/contact.php -->

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
    mb_strlen($name) > 120 ||
    mb_strlen($email) > 180 ||
    mb_strlen($subject) > 180 ||
    mb_strlen($message) > 5000
) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Input too long'
    ]);
    exit;
}

$to = 'hello@jirehgrp.com';

if (stripos($subject, 'price') !== false || stripos($subject, 'quote') !== false) {
    $to = 'sales@jirehgrp.com';
}

if (stripos($subject, 'support') !== false || stripos($subject, 'help') !== false) {
    $to = 'support@jirehgrp.com';
}
$mailSubject = 'New Website Inquiry: ' . $subject;

$safeName = esc($name);
$safeEmail = esc($email);
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
  <meta name="color-scheme" content="dark light">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0a0a;margin:0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:760px;background:#111111;border:1px solid #232323;border-radius:20px;overflow:hidden;">
          
          <tr>
            <td style="padding:32px 32px 20px 32px;border-bottom:1px solid #1f1f1f;">
              <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8a8a;margin-bottom:14px;">
                READY_FOR_NEW_PROJECTS
              </div>

              <div style="font-size:40px;line-height:1.05;font-weight:700;color:#ffffff;margin:0 0 14px 0;">
                Start The<br>Conversation.
              </div>

              <div style="font-size:14px;line-height:1.7;color:#a1a1aa;">
                New contact form submission from jirehgrp.com
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 12px 32px;">
              <div style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a8a;margin-bottom:10px;">
                Contact Details
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 8px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="width:50%;padding:0 8px 16px 0;vertical-align:top;">
                    <div style="background:#161616;border:1px solid #27272a;border-radius:14px;padding:18px;">
                      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;margin-bottom:8px;">Name</div>
                      <div style="font-size:16px;color:#ffffff;font-weight:600;">' . $safeName . '</div>
                    </div>
                  </td>
                  <td style="width:50%;padding:0 0 16px 8px;vertical-align:top;">
                    <div style="background:#161616;border:1px solid #27272a;border-radius:14px;padding:18px;">
                      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;margin-bottom:8px;">Email</div>
                      <div style="font-size:16px;color:#ffffff;font-weight:600;">' . $safeEmail . '</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 16px 32px;">
              <div style="background:#161616;border:1px solid #27272a;border-radius:14px;padding:18px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;margin-bottom:8px;">Project Subject</div>
                <div style="font-size:16px;color:#ffffff;font-weight:600;">' . $safeSubject . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 28px 32px;">
              <div style="background:#161616;border:1px solid #27272a;border-radius:14px;padding:20px;">
                <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;margin-bottom:12px;">Message</div>
                <div style="font-size:15px;line-height:1.8;color:#e4e4e7;">' . $safeMessage . '</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #1f1f1f;padding-top:20px;">
                <tr>
                  <td style="padding-top:20px;">
                    <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;margin-bottom:10px;">Meta</div>
                    <div style="font-size:13px;line-height:1.8;color:#a1a1aa;">
                      <strong style="color:#ffffff;">Sent At:</strong> ' . esc($sentAt) . '<br>
                      <strong style="color:#ffffff;">IP:</strong> ' . $safeIp . '<br>
                      <strong style="color:#ffffff;">User Agent:</strong> ' . $safeAgent . '
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;border-top:1px solid #1f1f1f;background:#0d0d0d;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#8a8a8a;">
                    Hello • Sales • Support
                  </td>
                  <td align="right" style="font-size:12px;color:#8a8a8a;">
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

$additionalParams = '-f hello@jirehgrp.com';

$replySubject = 'We received your message — Jirehgrp';

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
    $additionalParams
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
    $additionalParams
);

if (!$replySent) {
    error_log('contact.php auto-reply failed for: ' . $email);
}

echo json_encode([
    'status' => 'success',
    'message' => 'Message sent successfully'
]);
