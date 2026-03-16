<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained('businesses')->onDelete('cascade');
            $table->foreignId('customer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('staff_id')->constrained('staff')->onDelete('cascade');
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');
            
            // Customer Info for public bookings or guest checkout
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            
            $table->date('appointment_date');
            $table->time('start_time');
            $table->time('end_time');
            
            $table->string('status')->default('pending'); // pending, confirmed, cancelled, completed, no_show
            $table->decimal('total_price', 10, 2);
            $table->text('notes')->nullable();
            
            $table->string('confirmation_token')->unique()->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();

            $table->index(['business_id', 'appointment_date', 'status']);
            $table->index(['staff_id', 'appointment_date']);
            $table->index(['customer_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
