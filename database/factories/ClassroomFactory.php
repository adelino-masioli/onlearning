<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\Teacher;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;


class ClassroomFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Classroom::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $course = Course::inRandomOrder()->first();
        return [
            'teacher_id'  => $course->teacher_id,
            'course_id'   => $course->id,
            'uuid'        => $this->faker->uuid,
            'title'       => $this->faker->name,
            'description' => $this->faker->sentence(6,  true),
            'video'       => $this->faker->url,
            'download'    => $this->faker->url,
            'meet'        => $this->faker->slug,
            'status'      => 1,
        ];
    }
}
