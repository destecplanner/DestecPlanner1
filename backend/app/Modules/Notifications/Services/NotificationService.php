<?php

namespace App\Modules\Notifications\Services;

use Illuminate\Support\Facades\Mail;
use App\Modules\Notifications\Models\NotificationLog;

class NotificationService
{
    /**
     * Send an email notification.
     */
    public function sendEmail(string $recipient, string $subject, string $message, ?int $businessId = null, ?int $userId = null)
    {
        try {
            // Using Resend (or configured driver) for production-grade delivery
            Mail::raw($message, function ($mail) use ($recipient, $subject) {
                $mail->to($recipient)->subject($subject);
            });

            $this->logNotification('email', $recipient, $subject, $message, 'sent', config('mail.default'), $businessId, $userId);
            return true;
        } catch (\Exception $e) {
            $this->logNotification('email', $recipient, $subject, $message, 'failed', config('mail.default'), $businessId, $userId, ['error' => $e->getMessage()]);
            return false;
        }
    }

    /**
     * Send an SMS notification (Disabled for v1).
     */
    public function sendSms(string $recipient, string $message, ?int $businessId = null, ?int $userId = null)
    {
        if (!env('SMS_ENABLED', false)) {
            $this->logNotification('sms', $recipient, null, $message, 'skipped', 'disabled', $businessId, $userId);
            return false;
        }

        // Integration Logic for Netgsm / Twilio would go here in v2
        $status = 'sent'; 
        $provider = 'mock_sms';

        $this->logNotification('sms', $recipient, null, $message, $status, $provider, $businessId, $userId);
        return true;
    }

    /**
     * Send a WhatsApp notification (Disabled for v1).
     */
    public function sendWhatsApp(string $recipient, string $message, ?int $businessId = null, ?int $userId = null)
    {
        if (!env('WHATSAPP_ENABLED', false)) {
            $this->logNotification('whatsapp', $recipient, null, $message, 'skipped', 'disabled', $businessId, $userId);
            return false;
        }

        // Integration Logic for WhatsApp Business API in v2
        $status = 'sent';
        $provider = 'mock_whatsapp';

        $this->logNotification('whatsapp', $recipient, null, $message, $status, $provider, $businessId, $userId);
        return true;
    }

    /**
     * Internal logging.
     */
    private function logNotification($type, $recipient, $subject, $message, $status, $provider, $businessId, $userId, $response = null)
    {
        NotificationLog::create([
            'business_id' => $businessId,
            'user_id' => $userId,
            'type' => $type,
            'recipient' => $recipient,
            'subject' => $subject,
            'message' => $message,
            'status' => $status,
            'provider' => $provider,
            'provider_response' => $response
        ]);
    }
}
