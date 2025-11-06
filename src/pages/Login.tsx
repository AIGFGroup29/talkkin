import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Checkbox } from '../components/ui/Checkbox';
import { signIn, signInWithGoogle } from '../lib/supabase';
import { loginSchema, LoginFormData } from '../lib/validations';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const IllustrationArea = () => (
  <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-neutral via-support to-primary/70 p-12 items-center justify-center relative overflow-hidden">
    <div className="absolute top-16 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    <div className="absolute bottom-24 left-24 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

    <div className="relative max-w-md text-center z-10">
      <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-accent via-secondary to-primary mb-8">
        <img
          src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Family video call connection"
          className="w-full max-w-md mx-auto rounded-[1.875rem] shadow-2xl"
        />
      </div>
      <h2 className="text-3xl font-bold font-heading text-text-dark mb-4">
        Welcome Back to TalkKin
      </h2>
      <p className="text-lg text-text-light">
        Continue your journey of meaningful conversations
      </p>
    </div>
  </div>
);

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedRememberMe = localStorage.getItem('talkkin_remember_me');
    if (savedRememberMe === 'true') {
      setRememberMe(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormError('');
    setIsLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem('talkkin_remember_me', 'true');
      } else {
        localStorage.removeItem('talkkin_remember_me');
      }

      await signIn(data);
      navigate('/');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError('');
    setIsLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to sign in with Google.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-[420px]">
          <Link to="/" className="inline-block mb-12">
            <div className="flex items-center gap-3">
              <img
                src="/AIGF_Logo_Transparent copy.png"
                alt="TalkKin Logo"
                className="h-12 w-12"
              />
              <span className="text-2xl font-semibold font-heading text-primary">
                T<span className="text-accent">a</span>lkK<span className="text-accent">i</span>n
              </span>
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading text-text-dark mb-2">
              Welcome back
            </h1>
            <p className="text-text-light">
              Please enter your details
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full mb-6 flex items-center justify-center gap-3 border-2 hover:bg-gray-50"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <GoogleIcon />
            <span className="font-medium">Sign in with Google</span>
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-text-light">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" required>
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                error={!!errors.email}
                disabled={isLoading}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" required>
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  error={!!errors.password}
                  disabled={isLoading}
                  className="pr-12"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  aria-label="Remember for 30 days"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-text-dark cursor-pointer select-none"
                >
                  Remember for 30 days
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary font-medium hover:underline transition-all"
              >
                Forgot password
              </Link>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {formError}
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full mt-6 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading || !isValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-light">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline transition-all"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <IllustrationArea />
    </div>
  );
};
