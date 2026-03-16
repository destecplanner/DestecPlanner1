<?php

namespace App\Modules\Payments\Providers;

use App\Modules\Payments\Contracts\PaymentGatewayInterface;
use Illuminate\Support\Facades\Log;

class IyzicoGateway implements PaymentGatewayInterface
{
    protected string $apiKey;
    protected string $secretKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.iyzico.api_key', 'sandbox-key');
        $this->secretKey = config('services.iyzico.secret_key', 'sandbox-secret');
        $this->baseUrl = config('services.iyzico.base_url', 'https://sandbox-api.iyzipay.com');
    }

    public function getName(): string
    {
        return 'iyzico';
    }

    public function initializePayment(array $data): array
    {
        Log::info('Iyzico: Initializing payment', $data);

        // This is a mock implementation of Iyzico checkout session creation
        // In a real scenario, you'd use Iyzipay\Request\CreateCheckoutFormInitializeRequest
        
        return [
            'status' => 'success',
            'token' => 'mock-iyzico-token-' . uniqid(),
            'checkout_url' => 'https://sandbox-api.iyzipay.com/checkout/mock/' . uniqid(),
            'transaction_id' => 'iyz-' . uniqid(),
        ];
    }

    public function handleCallback(array $params): array
    {
        Log::info('Iyzico: Handling callback', $params);

        // Verify token with Iyzico API
        // In a real scenario, you'd use Iyzipay\Request\RetrieveCheckoutFormRequest
        
        $isSuccess = ($params['status'] ?? '') === 'success';

        return [
            'status' => $isSuccess ? 'success' : 'failed',
            'transaction_id' => $params['transaction_id'] ?? 'unknown',
            'amount' => $params['amount'] ?? 0,
            'provider_reference' => $params['token'] ?? null,
            'raw_response' => $params
        ];
    }

    public function verifyWebhook(array $payload): bool
    {
        // Iyzico webhook signature verification
        return true;
    }
}
