<?php

namespace App\Modules\Services\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;
use App\Modules\Businesses\Models\Business;
use App\Modules\Staff\Models\Staff;

class Service extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'business_id',
        'name',
        'description',
        'duration_minutes',
        'price',
        'buffer_time_before',
        'buffer_time_after',
        'is_active',
    ];

    public function appointments()
    {
        return $this->hasMany(\App\Modules\Bookings\Models\Appointment::class, 'service_id');
    }

    public function staff()
    {
        return $this->belongsToMany(Staff::class, 'service_staff');
    }
}
