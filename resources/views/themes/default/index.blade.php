@extends('themes/default/default')

@section('content')

<section class="ftco-cover ftco-slant" style="background-image: url({{ asset('uploads/landingpages/pages/'.$landing->cover) }});" id="section-home">
    <div class="filter-gradient"></div>
    <div class="container">
      <div class="row align-items-center justify-content-center text-center ftco-vh-100">
        <div class="col-md-10">
          <h1 class="ftco-heading ftco-animate">{{$landing->title}}</h1>
          <h2 class="h5 ftco-subheading mb-5 ftco-animate">{{$landing->description}}</h2>    
          <p><a href="#section-courses"  class="btn btn-primary ftco-animate go-to-courses">Get Started</a></p>
        </div>
      </div>
    </div>
  </section>


  <section class="ftco-section bg-light  ftco-slant ftco-slant-white" id="section-courses">
    <div class="container">
      
      <div class="row">
        <div class="col-md-12 text-center mb-5 ftco-animate">
          <h2 class="text-uppercase ftco-uppercase">Our Awesome Courses</h2>
          <div class="row justify-content-center">
            <div class="col-md-7">
              <p class="lead">{{$landing->description}}</p>
            </div>
          </div>
        </div>

        @foreach ($courses as $course)
        <div class="col-lg-4 col-md-6">
          <div class="media d-block mb-4 text-center ftco-media ftco-animate box-course open-moda-course">
            
            <div class="course-img"><img src="{{asset("uploads/teachers/covers/thumbnail/".$course->cover)}}" alt="{{$course->title}}" class="img-fluid"></div>
           
            <div class="media-body p-md-5 p-4">
              <h5 class="mt-0 title">{{$course->title}}</h5>
              <p class="mb-5 description">{{$course->description}}</p>
              <p class="mb-0"><a href="#" class="btn btn-primary btn-sm"  data-course-uuid="{{$course->uuid}}">Booking now</a></p>
            </div>
          </div>
        </div>
        @endforeach
        
        
      </div>
    </div>
  </section>
  <!-- END section -->


  {{-- About --}}
  <section class="ftco-section ftco-slant ftco-slant-light" id="section-about">
    <div class="container">

      <div class="row mb-2">
        <div class="col-md-12 text-center ftco-animate">
          <h2 class="text-uppercase ftco-uppercase">About Us</h2>
          <div class="row justify-content-center mb-2">
            <div class="col-md-12  mb-1 text-center">
              @if($landing->teacher->avatar)
                <span class="teacher-thumbnail m-auto">
                  <img src="{{ asset('uploads/teachers/avatars/thumbnail/'.$landing->teacher->avatar) }}" alt="{{$landing->teacher->name}}" class="img-fluid rounded-circle ">
                </span>
              @endif
              <p class="lead"><small>{!!$landing->teacher->name!!}</small></p>
            </div>
            <div class="col-md-7">
              <p class="lead">{!!$landing->teacher->description!!} <a href="#section-contact" class="go-to-contact">Contact us</a></p>
            </div>
          </div>
        </div>
      </div>
      <!-- END row -->

    </div>
  </section>
   {{-- End About --}}




  <section class="ftco-section bg-light ftco-slant ftco-slant-white" id="section-counter">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 text-center ftco-animate">
          <h2 class="text-uppercase ftco-uppercase">Fun Facts</h2>
          <div class="row justify-content-center mb-5">
            <div class="col-md-7">
              <p class="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- END row -->
      <div class="row">
        <div class="col-md ftco-animate">
          <div class="ftco-counter text-center">
            <span class="ftco-number" data-number="{{$landing->teacher->students->count()}}">0</span>
            <span class="ftco-label">Students</span>
          </div>
        </div>
        <div class="col-md ftco-animate">
          <div class="ftco-counter text-center">
            <span class="ftco-number" data-number="{{$courses->count()}}">0</span>
            <span class="ftco-label">Courses</span>
          </div>
        </div>
        <div class="col-md ftco-animate">
          <div class="ftco-counter text-center">
            <span class="ftco-number" data-number="{{$landing->teacher->classrooms->count()}}">0</span>
            <span class="ftco-label">Classrooms</span>
          </div>
        </div>    
      </div>
    </div>
    
  </section>


  <section class="ftco-section bg-white ftco-slant ftco-slant-dark" id="section-contact">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 text-center ftco-animate">
          <h2 class="text-uppercase ftco-uppercase">Contact</h2>
          <div class="row justify-content-center mb-5">
            <div class="col-md-7">
              <p class="lead">If you have any questions, queries, feedback or suggestions, please do not hesitate to contact us. You can also use the contact form provied below:</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">

        <div class="col-md pr-md-5 mb-5">
          <form method="POST" action="{{ route('landing-page-contact') }}" class="form-landing-page-contact">
            @csrf
            <div class="form-group">
              <label for="name" class="sr-only">Name</label>
              <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" required>
            </div>
            <div class="form-group">
              <label for="email" class="sr-only">Email</label>
              <input type="text" class="form-control" id="email" name="email" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
              <label for="subject" class="sr-only">Subject</label>
              <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject" required>
            </div>
            <div class="form-group">
              <label for="message" class="sr-only">Message</label>
              <textarea name="message" id="message" name="message" cols="30" rows="10" class="form-control" placeholder="Write your message" required></textarea>
            </div>
            <div class="form-group">
              <label for="question-security" class="sr-only">The capital of England?</label>
              <input type="text" class="form-control" id="question-security" name="question_security" placeholder="The capital of England?" required>
            </div>

            <input type="hidden" name="teacher" value="{{$landing->teacher->id}}">

           
            <div class="form-group">
              <input type="button" class="btn btn-primary btn-send-mail" value="Send Message">
            </div>
            <div class="alert alert-validation-contact  mb-0" role="alert"></div>
          </form>
        </div>
      </div>
    </div>
  </section>

  



    <div class="modal fade" id="courseModal" tabindex="-1" aria-labelledby="courseModallLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="courseModallLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-img"></div>
            <div class="modal-description"></div>

            <form method="POST" action="{{ route('landing-page-booking') }}" class="form-booking-course">
              @csrf
              <div class="form-group">
                <label for="name">Full name</label>
                <input type="text" class="form-control" id="name" name="name" aria-describedby="name" placeholder="Full name" required autofocus>
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" name="email" aria-describedby="email" placeholder="Email address" required>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password"  placeholder="Password" required>
              </div>
              <div class="form-group">
                <label for="confirmpassword">Confirm password</label>
                <input type="password" class="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm password" required>
              </div>

              <input type="hidden" name="profile" value="{{Hash::make('student')}}" >
              <input type="hidden" name="course_uuid"  class="modal-course-uuid" >

            </form>

            
            <div class="alert alert-validation  mb-0" role="alert"></div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-sm btn-primary confirm-submit">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  

@endsection
