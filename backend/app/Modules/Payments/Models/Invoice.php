<?php

namespace App\Modules\Payments\Models;

use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;

class Invoice extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'business_id',
        'invoice_number',
        'amount_total',
        'tax_total',
        'currency',
        'status',
        'due_date',
        'paid_at',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
        'due_date' => 'date',
        'paid_at' => 'datetime',
    ];
}
