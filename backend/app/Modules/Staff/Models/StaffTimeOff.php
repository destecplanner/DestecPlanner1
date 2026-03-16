<?php

namespace App\Modules\Staff\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;

class StaffTimeOff extends Model
{
    use HasFactory, BelongsToTenant;

    protected $table = 'staff_time_off';

    protected $fillable = [
        'business_id',
        'staff_id',
        'start_time',
        'end_time',
        'reason',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
