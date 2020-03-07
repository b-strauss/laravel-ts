<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <base href="/">

  {{--  <link rel="apple-touch-icon" sizes="180x180" href="{{mix('frontend/assets/favicons/apple-touch-icon.png', 'frontend')}}">--}}
  {{--  <link rel="icon" type="image/png" sizes="32x32" href="{{mix('frontend/assets/favicons/favicon-32x32.png', 'frontend')}}">--}}
  {{--  <link rel="icon" type="image/png" sizes="16x16" href="{{mix('frontend/assets/favicons/favicon-16x16.png', 'frontend')}}">--}}
  {{--  <link rel="manifest" href="{{mix('frontend/assets/favicons/site.webmanifest', 'frontend')}}">--}}
  {{--  <link rel="mask-icon" href="{{mix('frontend/assets/favicons/safari-pinned-tab.svg', 'frontend')}}" color="#5bbad5">--}}
  {{--  <link rel="shortcut icon" href="{{mix('frontend/assets/favicons/favicon.ico', 'frontend')}}">--}}
  {{--  <meta name="msapplication-TileColor" content="#da532c">--}}
  {{--  <meta name="msapplication-config" content="{{mix('frontend/assets/favicons/browserconfig.xml', 'frontend')}}">--}}
  {{--  <meta name="theme-color" content="#ffffff">--}}

  <title>{{config('app.name')}}</title>
</head>
<body>
<div id="app">
</div>
<script src="{{mix('frontend/js/runtime.js', 'frontend')}}"></script>
<script src="{{mix('frontend/js/vendor.js', 'frontend')}}"></script>
<script src="{{mix('frontend/js/main.js', 'frontend')}}"></script>
</body>
</html>
