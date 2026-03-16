<?php

namespace App\Modules\Payments\Services;

use App\Modules\Payments\Contracts\PaymentGatewayInterface;
use App\Modules\Payments\Models\PaymentLog;
use App\Modules\Payments\Models\Subscription;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    protected PaymentGatewayInterface $gateway;

    public function __construct(PaymentGatewayInterface $gateway)
    {
        $this->gateway = $gateway;
    }

    /**
     * Start a subscription payment.
     */
    public function startSubscriptionPayment(Subscription $subscription)
    {
        $plan = $subscription->plan;
        
        $data = [
            'id' => $subscription->id,
            'amount' => $plan->price_monthly,
            'currency' => 'TRY',
            'callback_url' => route('api.payments.callback', ['provider' => $this->gateway->getName()]),
            'customer' => [
                'name' => $subscription->business->owner->name,
                'email' => $subscription->business->owner->email,
            ]
        ];

        // 1. Log Intent
        PaymentLog::create([
            'business_id' => $subscription->business_id,
            'user_id' => $subscription->business->user_id,
            'provider' => $this->gateway->getName(),
            'event_type' => 'payment_intent',
            'status' => 'pending',
            'payload' => $data
        ]);

        return $this->gateway->initializePayment($data);
    }

    /**
     * Finalize payment from callback.
     */
    public function finalizePayment(array $params)
    {
        $result = $this->gateway->handleCallback($params);

        // 2. Log Result
        PaymentLog::create([
            'provider' => $this->gateway->getName(),
            'transaction_id' => $result['transaction_id'],
            'event_type' => 'callback',
            'status' => $result['status'],
            'response' => $result['raw_response'],
            'amount' => $result['amount'] ?? null
        ]);

        if ($result['status'] === 'success') {
            // Find subscription and activate
            // In a real app we'd link via transaction metadata or specific ID
            return true;
        }

        return false;
    }
}
