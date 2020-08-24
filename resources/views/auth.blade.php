<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Scoolook') }}</title>


    <meta name="description" content="Scoolook&nbsp;is a social network tool for education designed to work with 3 different types of companies/individuals:&nbsp;Educational Centres,&nbsp;Agencies&nbsp;and Students. Find schools, courses, colleges, universities, educational centres world wide.">
    <link rel="shortcut icon" href="https://www.scoolook.com/favicon.ico">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    @yield('content')
</body>
</html>
