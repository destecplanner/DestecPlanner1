<?php

namespace App\Modules\Bookings\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;
use App\Modules\Users\Models\User;
use App\Modules\Staff\Models\Staff;
use App\Modules\Services\Models\Service;
use App\Modules\Reviews\Models\Review;
use App\Modules\Bookings\Enums\AppointmentStatus;

class Appointment extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'business_id',
        'customer_id',
        'staff_id',
        'service_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'appointment_date',
        'start_time',
        'end_time',
        'status',
        'total_price',
        'notes',
        'confirmation_token',
        'confirmed_at',
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'confirmed_at' => 'datetime',
        'status' => AppointmentStatus::class,
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function review()
    {
        return $this->hasOne(Review::class, 'appointment_id');
    }
}
