<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class EventsController extends Controller
{
    public function index()
    {
        return Inertia::render('Event', []);
    }

    public function show($id)
    {
        return Inertia::render('Event/Show', [
            'event' => "Junior"
        ]);
    }
}
