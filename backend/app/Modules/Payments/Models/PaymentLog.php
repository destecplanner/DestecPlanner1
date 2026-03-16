<?php

namespace App\Modules\Payments\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentLog extends Model
{
    protected $fillable = [
        'business_id',
        'user_id',
        'provider',
        'transaction_id',
        'event_type',
        'amount',
        'currency',
        'status',
        'payload',
        'response',
        'error_message',
    ];

    protected $casts = [
        'payload' => 'array',
        'response' => 'array',
    ];
}
