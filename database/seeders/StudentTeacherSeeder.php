<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class StudentTeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('student_teacher')->delete();
        for ($i = 0; $i < 10; $i++) {
            DB::table('student_teacher')->insert([
                'teacher_id'    => Teacher::inRandomOrder()->first()->id,
                'student_id'    => Student::inRandomOrder()->first()->id,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ]);
        }
    }
}
