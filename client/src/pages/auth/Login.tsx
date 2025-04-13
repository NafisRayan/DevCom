import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login: React.FC = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md w-full space-y-8 p-8 bg-base-100 rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-base-content/70">
            Sign in to your DevLeadConnect account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="form-error">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="form-error">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-base-content/70"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary hover:text-primary-focus"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Sign in'
            )}
          </button>

          <div className="divider">OR</div>

          <div className="grid grid-cols-3 gap-3">
            <button type="button" className="btn btn-outline">
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
            </button>
            <button type="button" className="btn btn-outline">
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/475654/github-color.svg"
                alt="GitHub"
              />
            </button>
            <button type="button" className="btn btn-outline">
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/475647/linkedin-color.svg"
                alt="LinkedIn"
              />
            </button>
          </div>

          <p className="text-center text-sm text-base-content/70">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary-focus"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; 