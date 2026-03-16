<?php

namespace Database\Seeders;

use App\Modules\Users\Models\User;
use App\Modules\Businesses\Models\Business;
use App\Modules\Businesses\Models\BusinessCategory;
use App\Modules\Staff\Models\Staff;
use App\Modules\Services\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@destecplanner.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Create Categories
        $barber = BusinessCategory::create(['name' => 'Barber', 'slug' => 'barber']);
        $spa = BusinessCategory::create(['name' => 'Spa & Wellness', 'slug' => 'spa']);

        // 3. Create Business 1
        $owner1 = User::create([
            'name' => 'Business Owner 1',
            'email' => 'owner1@example.com',
            'password' => Hash::make('password'),
            'role' => 'owner',
        ]);

        $business1 = Business::create([
            'owner_id' => $owner1->id,
            'category_id' => $barber->id,
            'name' => 'Lux Barber Shop',
            'slug' => 'lux-barber',
            'city' => 'Istanbul',
        ]);

        // 4. Create Business 2
        $owner2 = User::create([
            'name' => 'Business Owner 2',
            'email' => 'owner2@example.com',
            'password' => Hash::make('password'),
            'role' => 'owner',
        ]);

        $business2 = Business::create([
            'owner_id' => $owner2->id,
            'category_id' => $spa->id,
            'name' => 'Serenity Spa',
            'slug' => 'serenity-spa',
            'city' => 'Ankara',
        ]);

        // 5. Seed Staff and Services (Multi-tenant check)
        // Set context to Business 1
        config(['app.active_business_id' => $business1->id]);

        $staffUser1 = User::create([
            'name' => 'John Doe (Barber)',
            'email' => 'john@luxbarber.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        Staff::create([
            'business_id' => $business1->id,
            'user_id' => $staffUser1->id,
            'title' => 'Master Barber',
        ]);

        Service::create([
            'business_id' => $business1->id,
            'name' => 'Haircut',
            'duration_minutes' => 30,
            'price' => 150.00,
        ]);

        // Set context to Business 2
        config(['app.active_business_id' => $business2->id]);

        $staffUser2 = User::create([
            'name' => 'Jane Smith (Therapist)',
            'email' => 'jane@serenityspa.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        Staff::create([
            'business_id' => $business2->id,
            'user_id' => $staffUser2->id,
            'title' => 'Senior Therapist',
        ]);

        Service::create([
            'business_id' => $business2->id,
            'name' => 'Massage',
            'duration_minutes' => 60,
            'price' => 500.00,
        ]);
        
        // Reset context
        config(['app.active_business_id' => null]);
    }
}
