<?php

namespace App\Shared\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class BelongsToBusiness implements ValidationRule
{
    protected string $table;
    protected int $businessId;

    public function __construct(string $table, int $businessId)
    {
        $this->table = $table;
        $this->businessId = $businessId;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = DB::table($this->table)
            ->where('id', $value)
            ->where('business_id', $this->businessId)
            ->exists();

        if (!$exists) {
            $fail("The selected {$attribute} is invalid or does not belong to this business.");
        }
    }
}
