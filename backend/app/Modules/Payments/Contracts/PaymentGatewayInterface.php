<?php

namespace App\Modules\Payments\Contracts;

interface PaymentGatewayInterface
{
    /**
     * Initialize a payment intent/request.
     */
    public function initializePayment(array $data): array;

    /**
     * Handle the callback after payment is completed on provider's side.
     */
    public function handleCallback(array $params): array;

    /**
     * Verify and handle a webhook event.
     */
    public function verifyWebhook(array $payload): bool;

    /**
     * Get the provider name.
     */
    public function getName(): string;
}
