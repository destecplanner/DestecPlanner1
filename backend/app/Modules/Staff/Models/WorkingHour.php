<?php

namespace App\Modules\Staff\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;

class WorkingHour extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'business_id',
        'staff_id',
        'day_of_week',
        'start_time',
        'end_time',
        'is_closed',
        'breaks',
    ];

    protected $casts = [
        'is_closed' => 'boolean',
        'breaks' => 'json',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
