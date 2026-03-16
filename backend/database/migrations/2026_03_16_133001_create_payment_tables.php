<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('provider'); // iyzico, stripe, etc.
            $table->string('transaction_id')->nullable();
            $table->string('event_type'); // payment_intent, callback, webhook
            $table->decimal('amount', 15, 2)->nullable();
            $table->string('currency', 3)->default('TRY');
            $table->string('status'); // success, failed, pending
            $table->json('payload')->nullable();
            $table->json('response')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamps();
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->onDelete('cascade');
            $table->string('invoice_number')->unique();
            $table->decimal('amount_total', 15, 2);
            $table->decimal('tax_total', 15, 2)->default(0);
            $table->string('currency', 3)->default('TRY');
            $table->string('status'); // draft, paid, cancelled
            $table->date('due_date');
            $table->date('paid_at')->nullable();
            $table->json('items')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_logs');
        Schema::dropIfExists('invoices');
    }
};
