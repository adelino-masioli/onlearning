<?php

namespace Database\Factories;


use App\Models\LandingPageLayout;
use Illuminate\Database\Eloquent\Factories\Factory;


class LandingPageLayoutFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = LandingPageLayout::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid'        => $this->faker->uuid,
            'title'       => $this->faker->name,
            'description' => $this->faker->sentence($nbWords = 6, $variableNbWords = true),
            'thumbnail'   => "landing-page-default.jpg",
            'status'      => 1,
        ];
    }
}
