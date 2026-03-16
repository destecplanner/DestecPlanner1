<?php

namespace App\Modules\Reviews\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;
use App\Modules\Users\Models\User;
use App\Modules\Bookings\Models\Appointment;

class Review extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'business_id',
        'customer_id',
        'appointment_id',
        'rating',
        'comment',
        'reply',
        'is_published',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}
