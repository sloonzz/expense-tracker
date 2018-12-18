<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @if (env('APP_ENV' == 'production'))
            <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
        @else
            <link href="{{ asset('css/app.css') }}" rel="stylesheet">            
        @endif
        <title>{{env('APP_NAME')}}</title>
    </head>
    <body>
        <div id="app">
            <Home></Home>
        </div>
        @if (env('APP_ENV') == 'production')
            <script src="{{ secure_asset('js/app.js') }}"></script>
        @else
            <script src="{{ asset('js/app.js') }}"></script>            
        @endif
    </body>
</html>
