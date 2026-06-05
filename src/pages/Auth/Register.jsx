import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxious';

const Register = () => {
  const { register, handleSubmit, formState: { errors } = {} } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      // 🔵 Loading Alert
      Swal.fire({
        title: 'Creating account...',
        text: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // 1️⃣ Register user
      await registerUser(data.email, data.password);

      // 2️⃣ Upload image
      const formData = new FormData();
      formData.append('image', profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // 3️⃣ Save user to DB
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
      };

      await axiosInstance.post('/users', userInfo);

      // 4️⃣ Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      Swal.close();

      // 🟢 Success Alert
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome to LifeLog 🎉',
        confirmButtonColor: '#3085d6',
      });

      navigate(location.state || '/');

    } catch (error) {
      Swal.close();

      // 🔴 Error Alert
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to LifeLog</h3>
      <p className="text-center">Please Register</p>

      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">

          {/* Name */}
          <label className="label">Name</label>
          <input
            {...register('name', { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name && (
            Swal.fire('Error', 'Name is required', 'error')
          )}

          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input"
          />

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input"
            placeholder="Password"
          />

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            state={location.state}
            className="text-blue-400 underline"
          >
            Login
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
