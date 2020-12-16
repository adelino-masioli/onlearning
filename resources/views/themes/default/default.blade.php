<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

  <head>
    <title>{{$landing->title}}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Description here" />
    <meta name="keywords" content="Key here" />
    <meta name="author" content="Author here" />

    <link rel="shortcut icon" href="https://scoolook.com/favicon.ico">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('themes/default/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('themes/default/css/open-iconic-bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('themes/default/css/animate.css') }}">
    
    <link rel="stylesheet" href="{{ asset('themes/default/css/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('themes/default/css//owl.theme.default.min.css') }}">

    <link rel="stylesheet" href="{{ asset('themes/default/css/icomoon.css') }}">
    <link rel="stylesheet" href="{{ asset('themes/default/css/style.css') }}">
  </head>



  <body data-spy="scroll" data-target="#ftco-navbar" data-offset="200">
     <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div class="container">
          <a class="navbar-brand" href="/landing-page/{{$landing->slug}}">{{$landing->title}}</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="oi oi-menu"></span> Menu
          </button>
  
          <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active"><a href="#section-home" class="nav-link">Home</a></li>
              <li class="nav-item"><a href="#section-courses" class="nav-link">Courses</a></li>
              <li class="nav-item"><a href="#section-about" class="nav-link">About</a></li>
              <li class="nav-item"><a href="#section-contact" class="nav-link">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- END nav -->

      
    @yield('content')


    <!-- loader -->
    <div id="ftco-loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#4586ff"/></svg></div>


    <footer class="ftco-footer ftco-bg-dark">
        <div class="container">
          <div class="row mb-5">
            <div class="col-md-4 m-auto">
              <div class="row">
                <div class="col-md text-center">
                  <div class="ftco-footer-widget">
                    <ul class="list-unstyled">
                      <li><a href="#" class="py-2 d-block">Courses</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-md text-center">
                   <div class="ftco-footer-widget">
                    <ul class="list-unstyled">
                      <li><a href="#" class="py-2 d-block">About</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-md text-center">
                   <div class="ftco-footer-widget">
                    <ul class="list-unstyled">
                      <li><a href="#" class="py-2 d-block">Contact</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-4">
              <div class="ftco-footer-widget mb-4">
                <ul class="ftco-footer-social list-unstyled text-center float-lft">
                  <li><a href="#"><span class="icon-twitter"></span></a></li>
                  <li><a href="#"><span class="icon-facebook"></span></a></li>
                  <li><a href="#"><span class="icon-instagram"></span></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md text-center">
              <p>&copy; Scoolook {{date("Y")}}. All Rights Reserved.  Made with <span class="icon-heart text-danger"></span>  by <a href="https://scoolook.com/">Scoolook</a></p>
            </div>
          </div>
        </div>
      </footer>
</body>

<script src="{{ asset('themes/default/js/jquery.min.js') }}"></script>
<script src="{{ asset('themes/default/js/popper.min.js') }}"></script>
<script src="{{ asset('themes/default/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('themes/default/js/jquery.easing.1.3.js') }}"></script>
<script src="{{ asset('themes/default/js/jquery.waypoints.min.js') }}"></script>
<script src="{{ asset('themes/default/js/owl.carousel.min.js') }}"></script>
<script src="{{ asset('themes/default/js/jquery.animateNumber.min.js') }}"></script>
<script src="{{ asset('themes/default/js/main.js') }}"></script>
</html>
