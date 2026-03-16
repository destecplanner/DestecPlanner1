<?php

namespace App\Modules\Staff\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;
use App\Modules\Users\Models\User;
use App\Modules\Businesses\Models\Business;
use App\Modules\Services\Models\Service;

class Staff extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'business_id',
        'user_id',
        'title',
        'bio',
        'is_active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function workingHours()
    {
        return $this->hasMany(WorkingHour::class, 'staff_id');
    }

    public function timeOffs()
    {
        return $this->hasMany(StaffTimeOff::class, 'staff_id');
    }

    public function appointments()
    {
        return $this->hasMany(\App\Modules\Bookings\Models\Appointment::class, 'staff_id');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_staff');
    }
}
