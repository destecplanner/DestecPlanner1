<?php

namespace App\Modules\Businesses\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Users\Models\User;
use App\Modules\Staff\Models\Staff;
use App\Modules\Services\Models\Service;

class Business extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'category_id',
        'name',
        'slug',
        'logo_url',
        'banner_url',
        'description',
        'phone',
        'address',
        'city',
        'district',
        'latitude',
        'longitude',
        'timezone',
        'status',
        'settings',
    ];

    protected $casts = [
        'settings' => 'json',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function category()
    {
        return $this->belongsTo(BusinessCategory::class, 'category_id');
    }

    public function staff()
    {
        return $this->hasMany(Staff::class, 'business_id');
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'business_id');
    }

    public function appointments()
    {
        return $this->hasMany(\App\Modules\Bookings\Models\Appointment::class, 'business_id');
    }
}
