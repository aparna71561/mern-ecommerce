import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signupAsync, selectLoggedInUser, selectSignupStatus, selectSignupError, clearSignupError, resetSignupStatus } from '../AuthSlice';
import { toast } from 'react-toastify';

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'fullfilled') {
      toast.success('Account created successfully!');
      reset();
      navigate('/login');
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status]);

  const handleSignup = (data) => {
    const userData = { 
      name: data.name,
      fatherName: data.fatherName,
      dob: data.dob,
      branch: data.branch,
      rollNo: data.rollNo,
      section: data.section,
      address: data.address,
      mobileNo: data.mobileNo,
      password: data.password
    };
    dispatch(signupAsync(userData));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(handleSignup)}>
            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    {...register("name", { required: "Full name is required" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                  Father's Name *
                </label>
                <div className="mt-1">
                  <input
                    id="fatherName"
                    name="fatherName"
                    type="text"
                    {...register("fatherName", { required: "Father's name is required" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.fatherName && <p className="mt-2 text-sm text-red-600">{errors.fatherName.message}</p>}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">
                  Roll Number *
                </label>
                <div className="mt-1">
                  <input
                    id="rollNo"
                    name="rollNo"
                    type="text"
                    {...register("rollNo", { required: "Roll number is required" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.rollNo && <p className="mt-2 text-sm text-red-600">{errors.rollNo.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                  Branch *
                </label>
                <div className="mt-1">
                  <select
                    id="branch"
                    name="branch"
                    {...register("branch", { required: "Branch is required" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics</option>
                    <option value="ME">Mechanical</option>
                    <option value="EE">Electrical</option>
                    <option value="CE">Civil</option>
                  </select>
                  {errors.branch && <p className="mt-2 text-sm text-red-600">{errors.branch.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                  Section *
                </label>
                <div className="mt-1">
                  <select
                    id="section"
                    name="section"
                    {...register("section", { required: "Section is required" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                  {errors.section && <p className="mt-2 text-sm text-red-600">{errors.section.message}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth *
                </label>
                <div className="mt-1">
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    {...register("dob", { required: "Date of birth is required" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.dob && <p className="mt-2 text-sm text-red-600">{errors.dob.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                  Mobile Number *
                </label>
                <div className="mt-1">
                  <input
                    id="mobileNo"
                    name="mobileNo"
                    type="tel"
                    {...register("mobileNo", { 
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit mobile number"
                      }
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.mobileNo && <p className="mt-2 text-sm text-red-600">{errors.mobileNo.message}</p>}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  {...register("address", { required: "Address is required" })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: value => 
                        value === document.getElementById('password').value || "Passwords do not match"
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'pending'}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'pending' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};