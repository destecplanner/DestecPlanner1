<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('working_hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained('businesses')->onDelete('cascade');
            $table->foreignId('staff_id')->nullable()->constrained('staff')->onDelete('cascade');
            $table->unsignedSmallInteger('day_of_week'); // 0-6 (Sunday-Saturday)
            $table->time('start_time');
            $table->time('end_time');
            $table->boolean('is_closed')->default(false);
            $table->timestamps();

            $table->unique(['business_id', 'staff_id', 'day_of_week'], 'working_hours_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('working_hours');
    }
};
