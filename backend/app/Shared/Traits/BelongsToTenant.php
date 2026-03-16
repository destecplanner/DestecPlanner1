<?php

namespace App\Shared\Traits;

use App\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Model;

trait BelongsToTenant
{
    /**
     * Boot the trait.
     */
    protected static function bootBelongsToTenant(): void
    {
        static::addGlobalScope(new TenantScope);

        static::creating(function (Model $model) {
            if (!$model->business_id && config('app.active_business_id')) {
                $model->business_id = config('app.active_business_id');
            }
        });
    }

    /**
     * Relation to the business.
     */
    public function business()
    {
        return $this->belongsTo(\App\Modules\Businesses\Models\Business::class, 'business_id');
    }
}
