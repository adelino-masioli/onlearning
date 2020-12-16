<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'teacher_id'  =>  Teacher::factory(),
            'uuid'        => $this->faker->uuid,
            'title'       => $this->faker->name,
            'price'       => $this->faker->numberBetween($min = 100, $max = 700),
            'weeks'       => $this->faker->numberBetween($min = 1, $max = 30),
            'hours'       => $this->faker->numberBetween($min = 15, $max = 25),
            'timetable'   => $this->faker->sentence($nbWords = 6, $variableNbWords = true),
            'age'         => 18,
            'size'        => 15,
            'description' => $this->faker->sentence($nbWords = 6, $variableNbWords = true),
            'level'       => "A1 Elementary",
            'cover'       => "cover-default.jpg",
            'show'        => 0,
            'status'      => 1,
        ];
    }
}
