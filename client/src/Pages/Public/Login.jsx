import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";
import HomeNavBar from "../../components/HomeNavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

// Import animations from central file
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  hoverScale,
  zoomOut,
} from "../../animations";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundImage: `url(src/assets/login.avif)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* DARK OVERLAY with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black/50 z-0"
      />

      {/* NAVBAR */}
      <HomeNavBar />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row justify-end items-start w-full h-full p-8 gap-8">

        {/* ═══════════ LEFT TEXT ═══════════ */}
        <motion.div
          className="flex-1 flex flex-col justify-center text-white px-6 md:px-16 py-6 md:py-16 text-center md:text-left mt-60"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInLeft}
            className="text-[55px] font-extrabold leading-normal mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Navigate The Digital <br /> Horizon{" "}
            <motion.span
              className="text-blue-300 inline-block"
              animate={{
                opacity: [1, 0.7, 1],
                scale: [1, 1.05, 1],
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

          <motion.p
            variants={fadeInLeft}
            className="text-gray-200 text-[16px] mt-[-10px]"
          >
            Experience the precision of modern maritime ledgering and intelligence with Deewaraya.
          </motion.p>
        </motion.div>

        {/*  RIGHT LOGIN CARD */}
        <motion.div
          className="w-[40%] h-auto min-h-[70vh] rounded-2xl p-18 shadow-2xl bg-white/50 backdrop-blur-xl"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          whileHover={{
            boxShadow: "0 25px 50px -12px rgba(0, 30, 64, 0.4)",
          }}
        >
          {/* Card content with stagger */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-[28px] font-extrabold text-[#001e40] mb-1 ml-40"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Login..!
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-black-500 text-[14px] mb-10 ml-28"
            >
              Access your maritime dashboard
            </motion.p>

            {/* ERROR with shake animation */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: [0, -10, 10, -10, 10, 0],
                }}
                transition={{ duration: 0.5 }}
                className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              {/* EMAIL FIELD */}
              <motion.div variants={fadeInUp}>
                <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block mb-2">
                  EMAIL
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="off"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full bg-white rounded-xl px-4 py-2 text-sm text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400 mb-2"
                />
              </motion.div>

              {/* PASSWORD FIELD */}
              <motion.div variants={fadeInUp}>
                <label className="text-[12px] font-semibold tracking-widest uppercase text-black-500 block mb-2">
                  PASSWORD
                </label>

                <div className="relative">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full bg-white rounded-xl px-4 py-2 pr-12 text-sm text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
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
              </motion.div>

              {/* SUBMIT BUTTON */}
              <motion.button
                variants={fadeInUp}
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: loading ? 1 : 1.03,
                  boxShadow: "0 10px 30px -5px rgba(30, 58, 138, 0.5)",
                }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Login
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                )}
              </motion.button>
            </form>

            {/* Forgot Password link */}
            <motion.div
              variants={fadeInUp}
              style={{ textAlign: "right", marginTop: "5px", marginBottom: "15px" }}
            >
              <motion.div whileHover={{ x: -5 }}>
                <Link
                  to="/forgot-password"
                  style={{
                    color: "#1e40af",
                    fontSize: "13px",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Forgot Password?
                </Link>
              </motion.div>
            </motion.div>

            {/* REGISTER LINK */}
            <motion.p
              variants={fadeInUp}
              className="text-center text-sm text-black-600 mt-2 text-[14px]"
            >
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="inline-block"
              >
                <Link to="/register" className="text-blue-900 font-bold hover:underline">
                  Sign Up
                </Link>
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;