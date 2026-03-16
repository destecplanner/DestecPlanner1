<?php

namespace App\Modules\Payments\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;

class Subscription extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'business_id',
        'plan_id',
        'status',
        'billing_cycle',
        'trial_ends_at',
        'ends_at',
        'gateway_id',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class, 'plan_id');
    }
}
