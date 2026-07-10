import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";
import HomeNavBar from "../../components/HomeNavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  fadeInUp,
  fadeInLeft,
  staggerContainer,
} from "../../animations";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "owner",
    name: "",
    email: "",
    phone: "",
    nic: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", formData);
      const token = res.data.token;
      const user = res.data.user;
      const role = user?.role;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(res.data.message || "Registration successful!");

      if (role === "owner") {
        navigate("/login");
      } else if (role === "driver") {
        navigate("/login");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(src/assets/registerfit.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay - Quick fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-black/60 z-0"
      />

      <HomeNavBar />

      <div className="relative z-10 flex-1 flex items-stretch w-full p-7.5 gap-16">

        {/*  LEFT: HERO  */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-16 xl:px-24 py-16 text-white"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.15,   // Quick stagger
                delayChildren: 0.2,      // Short initial wait
              },
            },
          }}
        >
          {/* Main heading */}
          <motion.h1
            variants={fadeInLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[33px] font-extrabold leading-tight mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            WelCome To <br />
            <motion.span
              className="text-blue-300 text-[54px] inline-block"
              animate={{
                opacity: [1, 0.75, 1],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Deewaraya
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-gray-300 text-[16px] mb-10 leading-relaxed max-w-200"
          >
            Real Fishing Boat Management and Tracking System for Sri Lanka's Coastal Communities.
            Empowering boat owners and drivers with real-time insights, fleet management, and
            advanced analytics to navigate the seas with confidence.
          </motion.p>

          {/* Feature cards */}
          <motion.div
            className="space-y-4"
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {/* Fleet Command */}
            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex items-start gap-3 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 p-2 rounded-lg text-xl"
              >
                ⛵
              </motion.div>
              <div>
                <p className="font-bold text-[16px]">Fleet Command</p>
                <p className="text-gray-300 text-[12px]">
                  Real-time tracking and logistics management.
                </p>
              </div>
            </motion.div>

            {/* Analytics */}
            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex items-start gap-3 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 p-2 rounded-lg text-xl"
              >
                📊
              </motion.div>
              <div>
                <p className="font-semibold text-[16px]">Advanced Analytics</p>
                <p className="text-gray-300 text-[12px]">
                  Actionable insights from your vessel's telemetry.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/*  RIGHT: REGISTER FORM  */}
        <motion.div
          className="w-[46%] rounded-2xl p-8 shadow-2xl bg-white/50 backdrop-blur-xl"
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Card content stagger */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.08,   // Quick between fields
                  delayChildren: 0.5,      // Small wait after card slides in
                },
              },
            }}
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[28px] font-extrabold text-[#001e40] ml-50 mt-[-10px]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Register Now..!
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-black-500 text-[14px] mb-3 ml-48"
            >
              Begin your maritime journey today.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Role Selection */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <label className="text-[14px] font-semibold tracking-widest uppercase text-black-500 block mb-1">
                  Select User Role
                </label>
                <div className="flex gap-6">
                  <motion.label
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="role"
                      value="owner"
                      checked={formData.role === "owner"}
                      onChange={handleChange}
                      className="accent-[#001e40] w-4 h-4"
                    />
                    <span className="text-[14px] text-gray-800">Boat Owner</span>
                  </motion.label>
                  <motion.label
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="role"
                      value="driver"
                      checked={formData.role === "driver"}
                      onChange={handleChange}
                      className="accent-[#001e40] w-4 h-4"
                    />
                    <span className="text-[14px] text-black-800">Boat Driver</span>
                  </motion.label>
                </div>
              </motion.div>

              {/* Name */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                  Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                />
              </motion.div>

              {/* Phone + NIC */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex gap-3"
              >
                <div className="flex-1">
                  <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    Phone
                  </label>
                  <motion.input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    NIC
                  </label>
                  <motion.input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    placeholder="Enter NIC number"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                  Address
                </label>
                <motion.input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                />
              </motion.div>

              {/* Password + Confirm Password */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex gap-3"
              >
                {/* PASSWORD */}
                <div className="flex-1">
                  <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    Password
                  </label>
                  <div className="relative">
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-full bg-white rounded-xl px-4 py-2 pr-10 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#001e40] transition-colors duration-200"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </motion.button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="flex-1">
                  <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <motion.input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-full bg-white rounded-xl px-4 py-2 pr-12 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#001e40] transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: loading ? 1 : 1.03,
                  boxShadow: "0 10px 30px -5px rgba(30, 58, 138, 0.5)",
                }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="w-full bg-blue-800 text-white py-2 rounded-lg text-[16px] font-semibold hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Registering...
                  </>
                ) : (
                  <>
                    Register
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </motion.button>

              {/* Sign In Link */}
              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center text-[14px] text-black-500 mt-[-10px]"
              >
                Already have an account?{" "}
                <motion.span whileHover={{ scale: 1.1 }} className="inline-block">
                  <a href="/login" className="text-blue-900 font-bold hover:underline">
                    Sign In
                  </a>
                </motion.span>
              </motion.p>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 text-white/30 text-xs px-8 pb-5"
      >
        — HORIZON PERSPECTIVE © 2024
      </motion.div>
    </div>
  );
};

export default Register;