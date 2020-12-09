<?php

namespace Database\Seeders;

use App\Models\LandingPageLayout;
use Illuminate\Database\Seeder;

class LandingPageLayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        LandingPageLayout::factory()->count(2)->create();
    }
}
