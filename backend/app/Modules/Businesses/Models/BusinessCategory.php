<?php

namespace App\Modules\Businesses\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Users\Models\User;

class BusinessCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'icon'];

    public function businesses()
    {
        return $this->hasMany(Business::class, 'category_id');
    }
}
