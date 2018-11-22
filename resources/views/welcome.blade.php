<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
        <title>{{env('APP_NAME')}}</title>
    </head>
    <body>
        <div id="app">
            <Home></Home>
        </div>
    <script src="{{secure_asset('js/app.js')}}"></script>
    </body>
</html>
