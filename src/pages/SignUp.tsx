import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { signUp, signInWithGoogle } from '../lib/supabase';
import { signUpSchema, SignUpFormData } from '../lib/validations';

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
  <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-neutral via-support to-primary p-12 items-center justify-center relative overflow-hidden">
    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

    <div className="relative max-w-md text-center z-10">
      <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-primary via-accent to-secondary mb-8">
        <img
          src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Family connection illustration"
          className="w-full max-w-md mx-auto rounded-[1.875rem] shadow-2xl"
        />
      </div>
      <h2 className="text-3xl font-bold font-heading text-text-dark mb-4">
        Preserve Your Family's Legacy
      </h2>
      <p className="text-lg text-text-light">
        Create meaningful connections that last for generations
      </p>
    </div>

    <div className="absolute top-1/4 right-12 w-3 h-3 bg-accent rounded-full"></div>
    <div className="absolute top-1/3 left-12 w-2 h-2 bg-primary rounded-full"></div>
    <div className="absolute bottom-1/4 left-20 w-4 h-4 bg-secondary rounded-full opacity-60"></div>
    <div className="absolute bottom-1/3 right-24 w-2 h-2 bg-support rounded-full"></div>
  </div>
);

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    setFormError('');
    setIsLoading(true);

    try {
      await signUp(data);
      navigate('/');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold font-heading text-primary">TalkKin</span>
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading text-text-dark mb-2">
              Create account
            </h1>
            <p className="text-text-light">
              Interactive avatars, genuine connection
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full mb-6 flex items-center justify-center gap-3 border-2 hover:bg-gray-50"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <GoogleIcon />
            <span className="font-medium">Sign up with Google</span>
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
              <Label htmlFor="firstName" required>
                First name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                error={!!errors.firstName}
                disabled={isLoading}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" required>
                Email
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
                  placeholder="Create a password"
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
              {errors.password ? (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              ) : (
                <p className="mt-1 text-xs text-text-light">Must be at least 8 characters</p>
              )}
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
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-light">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline transition-all"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <IllustrationArea />
    </div>
  );
};
