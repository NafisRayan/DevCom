import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register: React.FC = () => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await register(values.name, values.email, values.password);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md w-full space-y-8 p-8 bg-base-100 rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="mt-2 text-base-content/70">
            Join DevLeadConnect and start generating leads
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full name
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="form-error">{formik.errors.name}</div>
            )}
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="form-error">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Create account'
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
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-focus"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register; 