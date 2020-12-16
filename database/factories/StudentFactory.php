<?php

namespace Database\Factories;

use App\User;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;


class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id'       => User::factory(),
            'name'          => $this->faker->name,
            'email'         => $this->faker->unique()->safeEmail,
            'phone'         => $this->faker->phoneNumber,
            'instagram'     => $this->faker->url,
            'facebook'      => $this->faker->url,
            'youtube'       => $this->faker->url,
            'linkedin'      => $this->faker->url,
            'country'       => $this->faker->country,
            'state'         => $this->faker->state,
            'city'          => $this->faker->city,
            'level'         => "A1 Elementary",
            'about'         => $this->faker->text,
            'status'        => 1,
        ];
    }
}
