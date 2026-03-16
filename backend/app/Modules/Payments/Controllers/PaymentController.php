<?php

namespace App\Modules\Payments\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Payments\Models\Subscription;
use App\Modules\Payments\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Initialize subscription payment.
     */
    public function subscribe(Request $request)
    {
        if (!env('PAYMENTS_ENABLED', false)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Subscription payments are currently disabled for this platform version.'
            ], 503);
        }

        $businessId = config('app.active_business_id');
        $subscription = Subscription::where('business_id', $businessId)
            ->with(['plan', 'business.owner'])
            ->firstOrFail();

        $paymentData = $this->paymentService->startSubscriptionPayment($subscription);

        return response()->json([
            'status' => 'success',
            'data' => $paymentData
        ]);
    }

    /**
     * Payment provider callback.
     */
    public function callback(Request $request, $provider)
    {
        if (!env('PAYMENTS_ENABLED', false)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment callbacks are disabled for this platform version.'
            ], 403);
        }

        $success = $this->paymentService->finalizePayment($request->all());

        if ($success) {
            return response()->json(['status' => 'success', 'message' => 'Payment processed successfully.']);
        }

        return response()->json(['status' => 'error', 'message' => 'Payment failed.'], 422);
    }
}
