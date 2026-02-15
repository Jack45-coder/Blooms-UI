import React, { useState } from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaLock, FaBirthdayCake, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import api from "../api/apiClient";

// Add this CSS for the float animation
const styles = `
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(10px, -15px) rotate(2deg); }
  66% { transform: translate(-8px, 10px) rotate(-1deg); }
}
`;

// Simple Particle Component with improved movement
const Particle = ({ index }) => {
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 8 + 4;
  const delay = Math.random() * 2;

  return (
    <div
      className="absolute rounded-full bg-blue-400/30"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${duration}s infinite ease-in-out ${delay}s`,
        boxShadow: '0 0 8px 1px rgba(59, 130, 246, 0.4)',
      }}
    />
  );
};

// Simple Floating Shape Component with improved movement
const FloatingShape = ({ index }) => {
  const size = Math.random() * 120 + 60;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 5;

  const shapes = ['rounded-full', 'rounded-[40%]', 'rounded-lg'];
  const colors = [
    'bg-gradient-to-br from-cyan-500/15 to-blue-500/15',
    'bg-gradient-to-br from-purple-500/15 to-pink-500/15',
    'bg-gradient-to-br from-emerald-500/15 to-teal-500/15',
  ];

  return (
    <div
      className={`absolute blur-2xl ${shapes[index % shapes.length]} ${colors[index % colors.length]}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${duration}s infinite ease-in-out ${delay}s`,
      }}
    />
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    age: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const payload = {
        ...formData,
        age: Number(formData.age)
      };

      const response = await api.post("/account/signup", payload);

      if (response.data.success) {
        setMessage("Registration Successful! You can now login.");

        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
          age: ""
        });

      } else {
        setError(response.data.message);
      }

    } catch (err) {
      setError("Something went wrong. Please try again!");
    }
  };

  return (
    <>
      {/* Inject the CSS for float animation */}
      <style>{styles}</style>

      <div className="relative flex justify-center items-center min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 overflow-hidden font-sans p-4">

        {/* Background Effects Container - Fixed movement */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-black to-purple-900/10"></div>
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 to-transparent"></div>
          </div>

          {/* Grid Pattern with slight movement */}
          <div className="absolute inset-0 opacity-10 animate-pulse" style={{
            animationDuration: '8s',
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.1) 49px, rgba(255,255,255,0.1) 50px),
                             repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.1) 49px, rgba(255,255,255,0.1) 50px)`,
            backgroundSize: '50px 50px'
          }}></div>

          {/* Floating Particles with more movement */}
          {Array.from({ length: 40 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}

          {/* Floating Shapes with more movement */}
          {Array.from({ length: 6 }).map((_, i) => (
            <FloatingShape key={i} index={i} />
          ))}

          {/* Glow Spots with movement */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '25s', animationDelay: '0s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '30s', animationDelay: '5s' }}></div>
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
        </div>

        {/* Register Form - Optimized height */}
        <div className="relative w-full max-w-112.5 z-10">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/5 backdrop-blur-xl p-6 md:p-7 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/20 w-full transform transition-all duration-500"            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(59, 130, 246, 0.5) transparent' }}
          >
            <div className="space-y-4 md:space-y-5">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-black mb-1 tracking-tight bg-linear-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-gray-400 text-xs md:text-sm">
                  Join our community today!
                </p>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`p-3 text-xs text-center rounded-xl font-medium ${message.includes('✅') ? 'bg-linear-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 text-green-400 border border-green-500/20' : 'bg-linear-to-r from-red-500/20 via-rose-500/20 to-red-500/20 text-red-400 border border-red-500/20'}`}>
                  {message}
                </div>
              )}

              {error && (
                <div className={`p-3 text-xs text-center rounded-xl font-medium ${error.includes('✅') ? 'bg-linear-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 text-green-400 border border-green-500/20' : 'bg-linear-to-r from-red-500/20 via-rose-500/20 to-red-500/20 text-red-400 border border-red-500/20'}`}>
                  {error}
                </div>
              )}

              {/* Grid Layout for Name and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Name Input */}
                <div className="relative group">
                  <label className="text-gray-300 text-xs font-semibold mb-1.5 block ml-1">Full Name</label>
                  <div className="relative flex items-center">
                    <FaUser className="absolute left-3 text-gray-500 text-sm group-hover:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 p-2.5 pl-9 w-full rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 group-hover:border-blue-400/30 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Age Input */}
                <div className="relative group">
                  <label className="text-gray-300 text-xs font-semibold mb-1.5 block ml-1">Age</label>
                  <div className="relative flex items-center">
                    <FaBirthdayCake className="absolute left-3 text-gray-500 text-sm group-hover:text-blue-400 transition-colors" />
                    <input
                      type="number"
                      name="age"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 p-2.5 pl-9 w-full rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 group-hover:border-blue-400/30 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Phone Input */}
              <div className="relative group">
                <label className="text-gray-300 text-xs font-semibold mb-1.5 block ml-1">Phone Number</label>
                <div className="relative flex items-center">
                  <FaPhoneAlt className="absolute left-3 text-gray-500 text-sm group-hover:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 p-2.5 pl-9 w-full rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 group-hover:border-blue-400/30 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative group">
                <label className="text-gray-300 text-xs font-semibold mb-1.5 block ml-1">Email Address</label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-3 text-gray-500 text-sm group-hover:text-blue-400 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 p-2.5 pl-9 w-full rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 group-hover:border-blue-400/30 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="text-gray-300 text-xs font-semibold mb-1.5 block ml-1">Password</label>
                <div className="relative flex items-center">
                  <FaLock className="absolute left-3 text-gray-500 text-sm group-hover:text-blue-400 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 p-2.5 pl-9 pr-10 w-full rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 group-hover:border-blue-400/30 text-sm"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 cursor-pointer text-gray-500 hover:text-white transition-colors bg-transparent border-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-3.5 h-3.5 mr-2 mt-0.5 shrink-0 rounded bg-white/5 border-white/20 focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="text-gray-400 text-xs leading-tight">
                  I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms & Conditions</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] text-white font-bold w-full py-2.5 rounded-xl shadow-lg active:scale-95 transition-all duration-200 uppercase tracking-wider text-xs relative overflow-hidden group mt-2"
              >
                <span className="relative z-10">Create Account</span>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Separator */}
              <div className="flex items-center my-3">
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="px-2 text-gray-500 text-[10px]">OR SIGN UP WITH</span>
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Social Buttons */}
              <div className="flex gap-3">
                <button type="button" className="flex-1 flex justify-center items-center py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-linear-to-r hover:from-red-500/20 hover:to-red-600/20 hover:border-red-500/30 transition-all text-white text-sm group">
                  <FaGoogle className="group-hover:scale-110 transition-transform" />
                </button>
                <button type="button" className="flex-1 flex justify-center items-center py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-linear-to-r hover:from-gray-800/20 hover:to-gray-900/20 hover:border-gray-500/30 transition-all text-white text-sm group">
                  <FaGithub className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-2">
                <span className="text-gray-400 text-xs">Already have an account? </span>
                <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors text-xs">Login</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;