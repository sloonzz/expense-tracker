<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <title>Laravel</title>
    </head>
    <body>
        <div id="app">
            <div class="container">
                <h1>Welcome</h1>
                <router-view></router-view>
            </div>
        </div>
    <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
