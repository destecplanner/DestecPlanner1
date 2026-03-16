<?php

namespace App\Modules\Notifications\Models;

use Illuminate\Database\Eloquent\Model;
use App\Shared\Traits\BelongsToTenant;

class NotificationLog extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'business_id',
        'user_id',
        'type',
        'recipient',
        'subject',
        'message',
        'status',
        'provider',
        'provider_response'
    ];

    protected $casts = [
        'provider_response' => 'array'
    ];
}
