<?php
namespace Database\Factories;

use App\User;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TeacherFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Teacher::class;

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
            'description'   => $this->faker->text,
            'degree'        => $this->faker->jobTitle,
            'qualification' => $this->faker->word,
            'seo'           => $this->faker->word,
            'avatar'        => "",
        ];
    }
}
