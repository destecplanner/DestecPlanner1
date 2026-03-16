<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Add timezone to businesses
        Schema::table('businesses', function (Blueprint $table) {
            $table->string('timezone')->default('Europe/Istanbul')->after('longitude');
        });

        // 2. Add breaks to working_hours
        Schema::table('working_hours', function (Blueprint $table) {
            $table->json('breaks')->nullable()->after('end_time');
        });

        // 3. Update business_schedules for staff-specific overrides and breaks
        Schema::table('business_schedules', function (Blueprint $table) {
            $table->foreignId('staff_id')->nullable()->after('business_id')->constrained()->onDelete('cascade');
            $table->json('breaks')->nullable()->after('end_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn('timezone');
        });

        Schema::table('working_hours', function (Blueprint $table) {
            $table->dropColumn('breaks');
        });

        Schema::table('business_schedules', function (Blueprint $table) {
            $table->dropConstrainedForeignId('staff_id');
            $table->dropColumn('breaks');
        });
    }
};
