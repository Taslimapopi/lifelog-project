import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate(location?.state || "/"))
      .catch((error) =>
        Swal.fire({ icon: "error", title: "Login failed", text: error.message })
      );
  };

  const handleDemoLogin = (email, label) => {
    signInUser(email, "12345678aA@")
      .then(() => {
        Swal.fire({ icon: "success", title: `${label} Login Successful`, timer: 1500, showConfirmButton: false });
        navigate(location?.state || "/");
      })
      .catch((error) =>
        Swal.fire({ icon: "error", title: "Login Failed", text: error.message })
      );
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-md bg-[#0f1f3d] rounded-2xl p-10 shadow-2xl border border-[#50E3C2]/10">

        {/* top accent */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#50E3C2] to-transparent rounded-b" />

        {/* brand */}
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#50E3C2] to-[#38b9a0] flex items-center justify-center text-lg">
            📖
          </div>
          <span className="font-serif text-xl font-bold text-white tracking-tight">
            Life<span className="text-[#50E3C2]">Log</span>
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Welcome back</h2>
        <p className="text-sm text-[#6b8ab0] mb-7">Sign in to continue sharing your story</p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* email */}
          <div>
            <label className="block text-[11px] font-semibold text-[#8aabcc] uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#3d5470] outline-none focus:border-[#50E3C2] focus:ring-2 focus:ring-[#50E3C2]/20 transition"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* password */}
          <div>
            <label className="block text-[11px] font-semibold text-[#8aabcc] uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#3d5470] outline-none focus:border-[#50E3C2] focus:ring-2 focus:ring-[#50E3C2]/20 transition"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            <div className="text-right mt-1.5">
              <a href="#" className="text-xs text-[#50E3C2] opacity-80 hover:opacity-100">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#50E3C2] to-[#38b9a0] text-[#0a1628] font-bold text-sm rounded-xl hover:opacity-90 active:scale-[0.98] transition"
          >
            Sign In
          </button>
        </form>

        {/* social login */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-[11px] text-[#3d5470] uppercase tracking-widest font-medium">or</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        <SocialLogin />

        {/* demo logins */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-[11px] text-[#3d5470] uppercase tracking-widest font-medium">Quick demo access</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        <p className="text-[11px] font-semibold text-[#6b8ab0] uppercase tracking-widest mb-2.5">
          Try without signing up
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Admin", role: "Full access", email: "lablu1@gmail.com" },
            { label: "Premium", role: "Paid plan", email: "pablu@gmail.com" },
            { label: "Free", role: "Basic plan", email: "ami@gmail.com" },
          ].map(({ label, role, email }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleDemoLogin(email, label)}
              className="py-2 px-1 bg-white/[0.04] border border-white/[0.09] rounded-lg text-[11px] font-semibold text-[#8aabcc] hover:border-[#50E3C2]/40 hover:text-[#50E3C2] hover:bg-[#50E3C2]/[0.06] transition text-center leading-snug"
            >
              {label}
              <span className="block text-[9px] font-normal opacity-60 uppercase tracking-wide mt-0.5">{role}</span>
            </button>
          ))}
        </div>

        {/* register */}
        <p className="text-center text-sm text-[#6b8ab0] mt-6">
          New to LifeLog?{" "}
          <Link state={location.state} to="/auth/register" className="text-[#50E3C2] font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;