<?php

namespace App\Modules\Payments\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;
use App\Modules\Bookings\Models\Appointment;

class Payment extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'business_id',
        'appointment_id',
        'transaction_id',
        'amount',
        'commission_amount',
        'currency',
        'status',
        'payment_method',
        'gateway_response',
    ];

    protected $casts = [
        'gateway_response' => 'json',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}
