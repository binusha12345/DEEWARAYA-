// src/Pages/Public/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      toast.error(t('register.passwordMismatch'));
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

      toast.success(res.data.message || t('register.successMsg'));

      if (role === "owner") {
        navigate("/login");
      } else if (role === "driver") {
        navigate("/login");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || t('register.failedMsg'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-page h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(src/assets/registerfit.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{responsiveStyles}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-black/60 z-0"
      />

      <HomeNavBar />

      <div className="register-content relative z-10 flex-1 flex items-stretch w-full p-7.5 gap-16">

        {/* ✅ LEFT HERO */}
        <motion.div
          className="register-left flex-1 flex flex-col justify-center px-16 xl:px-24 py-16 text-white"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.h1
            variants={fadeInLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="register-heading text-[33px] font-extrabold leading-tight mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {t('register.welcomeTo')} <br />
            <motion.span
              className="register-brand text-blue-300 text-[54px] inline-block"
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

          <motion.p
            variants={fadeInLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="register-desc text-gray-300 text-[16px] mb-10 leading-relaxed max-w-200"
          >
            {t('register.description')}
          </motion.p>

          <motion.div
            className="register-features space-y-4"
            variants={{
              initial: {},
              animate: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {/* Fleet Command */}
            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="register-feature-item flex items-start gap-3 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 p-2 rounded-lg text-xl"
              >
                ⛵
              </motion.div>
              <div>
                <p className="font-bold text-[16px]">{t('register.feature1Title')}</p>
                <p className="register-feature-desc text-gray-300 text-[12px]">
                  {t('register.feature1Desc')}
                </p>
              </div>
            </motion.div>

            {/* Analytics */}
            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="register-feature-item flex items-start gap-3 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 p-2 rounded-lg text-xl"
              >
                📊
              </motion.div>
              <div>
                <p className="font-semibold text-[16px]">{t('register.feature2Title')}</p>
                <p className="register-feature-desc text-gray-300 text-[12px]">
                  {t('register.feature2Desc')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ✅ RIGHT REGISTER FORM */}
        <motion.div
          className="register-card w-[46%] rounded-2xl p-8 shadow-2xl bg-white/50 backdrop-blur-xl"
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.5,
                },
              },
            }}
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="register-card-title text-[28px] font-extrabold text-[#001e40] ml-50 mt-[-10px]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {t('register.title')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="register-card-sub text-black-500 text-[14px] mb-3 ml-48"
            >
              {t('register.subtitle')}
            </motion.p>

            <form data-tour="register-form" onSubmit={handleSubmit} className="space-y-4">

              {/* Role Selection */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <label className="register-label text-[14px] font-semibold tracking-widest uppercase text-black-500 block mb-1">
                  {t('register.selectRole')}
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
                    <span className="text-[14px] text-gray-800">{t('register.boatOwner')}</span>
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
                    <span className="text-[14px] text-black-800">{t('register.boatDriver')}</span>
                  </motion.label>
                </div>
              </motion.div>

              {/* Name */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}>
                <label className="register-label text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                  {t('register.nameLabel')}
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('register.namePlaceholder')}
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="register-input w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}>
                <label className="register-label text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                  {t('register.emailLabel')}
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('register.emailPlaceholder')}
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="register-input w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                />
              </motion.div>

              {/* Phone + NIC */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="register-field-row flex gap-3"
              >
                <div className="flex-1">
                  <label className="register-label text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    {t('register.phoneLabel')}
                  </label>
                  <motion.input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('register.phonePlaceholder')}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="register-input w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="register-label text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    {t('register.nicLabel')}
                  </label>
                  <motion.input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    placeholder={t('register.nicPlaceholder')}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="register-input w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </motion.div>

              {/* Address */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}>
                <label className="register-label text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                  {t('register.addressLabel')}
                </label>
                <motion.input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t('register.addressPlaceholder')}
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="register-input w-full bg-white rounded-xl px-4 py-2 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                />
              </motion.div>

              {/* Password + Confirm Password */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="register-field-row flex gap-3"
              >
                {/* PASSWORD */}
                <div className="flex-1">
                  <label className="register-label text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    {t('register.passwordLabel')}
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
                      className="register-input w-full bg-white rounded-xl px-4 py-2 pr-10 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
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
                  <label className="register-label text-[12px] font-semibold tracking-widest uppercase text-black-500 block">
                    {t('register.confirmPasswordLabel')}
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
                      className="register-input w-full bg-white rounded-xl px-4 py-2 pr-12 text-[12px] text-black-800 outline-none border-b-2 border-transparent focus:border-[#001e40] transition-all duration-200 placeholder-gray-400"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#001e40] transition-colors duration-200"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
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
                className="register-submit w-full bg-blue-800 text-white py-2 rounded-lg text-[16px] font-semibold hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    {t('register.registering')}
                  </>
                ) : (
                  <>
                    {t('register.registerBtn')}
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
                className="register-signin text-center text-[14px] text-black-500 mt-[-10px]"
              >
                {t('register.haveAccount')}{" "}
                <motion.span whileHover={{ scale: 1.1 }} className="inline-block">
                  <a href="/login" className="text-blue-900 font-bold hover:underline">
                    {t('register.signIn')}
                  </a>
                </motion.span>
              </motion.p>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="register-footer relative z-10 text-white/30 text-xs px-8 pb-5"
      >
        {t('register.copyright')}
      </motion.div>
    </div>
  );
};

const responsiveStyles = `
  .register-page { min-height: 100vh; }

  @media (max-width: 1280px) {
    .register-card { width: 50% !important; padding: 1.75rem !important; }
    .register-left { padding-left: 3rem !important; padding-right: 2rem !important; }
    .register-heading { font-size: 1.75rem !important; }
    .register-brand { font-size: 2.75rem !important; }
    .register-card-title { margin-left: 0 !important; text-align: center !important; font-size: 1.5rem !important; }
    .register-card-sub { margin-left: 0 !important; text-align: center !important; }
  }

  @media (max-width: 1024px) {
    .register-page { height: auto !important; overflow-y: auto !important; }
    .register-content { flex-direction: column !important; align-items: center !important; justify-content: flex-start !important; padding: 1.5rem !important; padding-top: 5.5rem !important; gap: 2rem !important; height: auto !important; }
    .register-left { flex: none !important; width: 100% !important; padding: 1.5rem 1.5rem 0 !important; text-align: center !important; align-items: center !important; order: 1 !important; }
    .register-heading { font-size: 1.5rem !important; text-align: center !important; }
    .register-brand { font-size: 2.5rem !important; }
    .register-desc { font-size: 0.875rem !important; margin-bottom: 1.5rem !important; text-align: center !important; }
    .register-features { display: flex !important; flex-direction: row !important; gap: 1rem !important; }
    .register-feature-item { flex: 1 !important; background: rgba(255,255,255,0.08) !important; padding: 0.875rem !important; border-radius: 0.875rem !important; border: 1px solid rgba(255,255,255,0.15) !important; }
    .register-feature-desc { font-size: 0.6875rem !important; }
    .register-card { width: 100% !important; max-width: 560px !important; padding: 1.75rem !important; order: 2 !important; }
    .register-card-title { margin-left: 0 !important; text-align: center !important; font-size: 1.375rem !important; margin-top: 0 !important; }
    .register-card-sub { margin-left: 0 !important; text-align: center !important; font-size: 0.8125rem !important; }
  }

  @media (max-width: 768px) {
    .register-content { padding: 1.25rem !important; padding-top: 5rem !important; gap: 1.5rem !important; }
    .register-left { padding: 1rem !important; }
    .register-heading { font-size: 1.375rem !important; }
    .register-brand { font-size: 2.25rem !important; }
    .register-desc { font-size: 0.8125rem !important; margin-bottom: 1.25rem !important; }
    .register-features { flex-direction: column !important; gap: 0.75rem !important; }
    .register-feature-item { flex-direction: row !important; }
    .register-card { width: 100% !important; max-width: 100% !important; padding: 1.5rem !important; border-radius: 1rem !important; }
    .register-card-title { font-size: 1.25rem !important; }
    .register-field-row { flex-direction: column !important; gap: 0.75rem !important; }
    .register-input { font-size: 0.875rem !important; padding: 0.625rem 1rem !important; }
    .register-label { font-size: 0.625rem !important; }
    .register-submit { font-size: 0.9375rem !important; padding-top: 0.625rem !important; padding-bottom: 0.625rem !important; }
    .register-signin { font-size: 0.8125rem !important; }
  }

  @media (max-width: 640px) {
    .register-content { padding: 1rem !important; padding-top: 4.5rem !important; gap: 1.25rem !important; }
    .register-heading { font-size: 1.25rem !important; }
    .register-brand { font-size: 2rem !important; }
    .register-desc { font-size: 0.75rem !important; }
    .register-card { padding: 1.25rem 1rem !important; }
    .register-card-title { font-size: 1.125rem !important; }
    .register-card-sub { font-size: 0.75rem !important; margin-bottom: 0.75rem !important; }
    .register-input { font-size: 0.8125rem !important; padding: 0.5rem 0.875rem !important; border-radius: 0.625rem !important; }
    .register-label { font-size: 0.5625rem !important; }
    .register-submit { font-size: 0.875rem !important; }
  }

  @media (max-width: 480px) {
    .register-content { padding: 0.75rem !important; padding-top: 4.25rem !important; }
    .register-left { display: none !important; }
    .register-card { width: 100% !important; padding: 1.25rem 1rem !important; border-radius: 0.875rem !important; }
    .register-card-title { font-size: 1.0625rem !important; }
    .register-input { padding: 0.5rem 0.75rem !important; font-size: 0.75rem !important; }
    .register-submit { font-size: 0.8125rem !important; padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
    .register-signin { font-size: 0.75rem !important; }
    .register-footer { font-size: 0.625rem !important; padding-left: 1rem !important; }
  }

  @media (max-width: 360px) {
    .register-content { padding: 0.5rem !important; padding-top: 4rem !important; }
    .register-card { padding: 1rem 0.75rem !important; }
    .register-card-title { font-size: 1rem !important; }
    .register-input { padding: 0.4rem 0.625rem !important; font-size: 0.6875rem !important; }
    .register-label { font-size: 0.5rem !important; }
    .register-submit { font-size: 0.75rem !important; }
  }
`;

export default Register;