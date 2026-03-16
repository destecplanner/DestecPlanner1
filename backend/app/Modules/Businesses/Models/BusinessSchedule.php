<?php

namespace App\Modules\Businesses\Models;

use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;

class BusinessSchedule extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'business_id',
        'staff_id',
        'date',
        'is_closed',
        'start_time',
        'end_time',
        'breaks',
        'note',
    ];

    protected $casts = [
        'date' => 'date',
        'is_closed' => 'boolean',
        'breaks' => 'json',
    ];
}
