@extends('auth')

@section('content')
<div class="auth">
    <div class="brand"><img src="{{asset("images/white-logo.png")}}" alt="Scoolook"></div>
    <div class="gradient"></div>
        <div class="col-md-3">

            <div class="card">
                <div class="card-header">{{ __('Reset Password') }}</div>

                <div class="card-body">
                    <h1>Enter your email to receive the link and reset your password</h1>

                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf

                        <div class="form-group row">

                            <div class="col-md-12">
                                <input id="email" type="email"  placeholder="Email"  class="form-control form-control-lg @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary btn-block ">
                                    {{ __('Send Password Reset Link') }}
                                </button>


                                <a class="btn   btn-block btn-light" href="{{ route('login') }}">
                                    {{ __('Sign in') }}
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</div>
@endsection
