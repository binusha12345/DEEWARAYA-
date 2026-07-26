// FleetContact.jsx
import { useState } from 'react';
import {
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp,
  FaPaperPlane, FaCheckCircle, FaSpinner, FaChevronDown,
  FaAnchor, FaCircle, FaHeadset, FaHeart,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
  FaFish, FaShip, FaWater
} from 'react-icons/fa';
import { GiBoatFishing, GiFishingBoat, GiFishingHook, GiSailboat } from 'react-icons/gi';
import HomeNavBar from '../../components/HomeNavBar';

const FleetContact = () => {
  // ==================== STATE ====================
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  // ==================== DATA ====================
  const quickContacts = [
    {
      icon: <FaPhoneAlt />,
      label: 'Call Us',
      value: '+94 78 415 2744',
      href: 'tel:+94784152744',
      color: 'from-blue-700 via-blue-600 to-cyan-500',
      glow: 'shadow-blue-700/40'
    },
    {
      icon: <FaEnvelope />,
      label: 'Email Us',
      value: 'support@deewaraya.lk',
      href: 'mailto:support@deewaraya.lk',
      color: 'from-blue-800 via-blue-600 to-cyan-400',
      glow: 'shadow-blue-800/40'
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      value: 'Chat Instantly',
      href: 'https://wa.me/94784152744',
      color: 'from-cyan-600 via-cyan-500 to-blue-500',
      glow: 'shadow-cyan-600/40'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Visit Us',
      value: 'Ambalangoda Harbour',
      href: 'https://maps.google.com/?q=Ambalangoda+Fishery+Harbor',
      color: 'from-blue-900 via-blue-700 to-cyan-500',
      glow: 'shadow-blue-900/40'
    }
  ];

  const subjectOptions = [
    '🔧 Technical Support',
    '📡 GPS / Tracking Issue',
    '🚢 Vessel Management',
    '💳 Billing & Plans',
    '🎯 Request a Demo',
    '🤝 Partnership Inquiry',
    '💬 General Feedback'
  ];

  const faqData = [
    {
      question: 'Why is my vessel showing as offline?',
      answer: 'Vessels may show offline due to poor satellite coverage, device battery issues, or antenna obstructions. Check the device power indicator and ensure the antenna has clear sky visibility.'
    },
    {
      question: 'How often does the GPS location update?',
      answer: 'GPS locations update every 30 seconds when the vessel is in motion. When anchored, updates reduce to every 5 minutes to conserve battery.'
    },
    {
      question: 'How do I add a new boat to my fleet?',
      answer: 'Go to Dashboard > Fleet Management > Add Vessel. Enter the vessel details and tracking device ID to activate.'
    },
    {
      question: 'Can I track my fleet from a mobile device?',
      answer: 'Yes! Our mobile app is available on iOS and Android. Monitor vessels in real-time and receive alerts on your phone.'
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' }
  ];

  // ==================== HANDLERS ====================
  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('sent');
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('idle');
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/40 text-slate-800 overflow-x-hidden">

      {/* ===== INLINE STYLES ===== */}
      <style>{`
        /* 🌊 Wave Animation */
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-25px) translateY(-10px); }
        }

        /* 🐟 Fish Swim */
        @keyframes swim {
          0% { transform: translateX(-100vw) translateY(0) scaleX(1); }
          45% { transform: translateX(50vw) translateY(-20px) scaleX(1); }
          50% { transform: translateX(50vw) translateY(-20px) scaleX(-1); }
          95% { transform: translateX(-100vw) translateY(20px) scaleX(-1); }
          100% { transform: translateX(-100vw) translateY(0) scaleX(1); }
        }

        /* 🫧 Bubble Rise */
        @keyframes bubbleRise {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 0.8; transform: translateY(-20px) scale(1); }
          100% { transform: translateY(-500px) scale(0.3); opacity: 0; }
        }

        /* 🚢 Boat Rocking */
        @keyframes rock {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-5px); }
        }

        /* ⚓ Anchor Drop */
        @keyframes anchorDrop {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-10deg); }
        }

        /* ✨ Shimmer */
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* 🌊 Ocean Wave */
        @keyframes oceanWave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* 📡 Radar Pulse - Updated with royal blue */
        @keyframes radarPulse {
          0% { box-shadow: 0 0 0 0 rgba(29, 78, 216, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(29, 78, 216, 0); }
          100% { box-shadow: 0 0 0 0 rgba(29, 78, 216, 0); }
        }

        /* 🎣 Sway */
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        /* 🌊 Gradient Flow */
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Utility Classes */
        .animate-wave { animation: wave 8s ease-in-out infinite; }
        .animate-swim { animation: swim 25s linear infinite; }
        .animate-swim-slow { animation: swim 40s linear infinite; }
        .animate-bubble { animation: bubbleRise 6s ease-in infinite; }
        .animate-rock { animation: rock 4s ease-in-out infinite; }
        .animate-anchor { animation: anchorDrop 3s ease-in-out infinite; }
        .animate-ocean { animation: oceanWave 4s ease-in-out infinite; }
        .animate-radar { animation: radarPulse 2s infinite; }
        .animate-sway { animation: sway 3s ease-in-out infinite; }

        /* ✨ Shimmer text with royal blue */
        .shimmer-text {
          background: linear-gradient(90deg, #1e40af, #2563eb, #3b82f6, #06b6d4, #1e40af);
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* 🌊 Royal Ocean Gradient */
        .royal-ocean-gradient {
          background: linear-gradient(-45deg, #1e3a8a, #1e40af, #1d4ed8, #2563eb, #0891b2);
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
        }

        /* 🌊 Deep Ocean */
        .deep-ocean-gradient {
          background: linear-gradient(135deg, #0c1e42 0%, #1e3a8a 30%, #1e40af 60%, #1d4ed8 100%);
        }

        /* Wave Divider */
        .wave-divider {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
        }
      `}</style>

      <HomeNavBar />

      {/* ===== 🌊 HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Blue Ocean Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-full blur-3xl animate-ocean" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-700/20 to-cyan-500/20 rounded-full blur-3xl animate-ocean" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-blue-500/15 to-blue-800/15 rounded-full blur-3xl animate-ocean" style={{ animationDelay: '4s' }} />

        {/* 🐟 Swimming Fish */}
        <div className="absolute top-24 left-0 text-blue-500/40 text-3xl animate-swim pointer-events-none">
          <FaFish />
        </div>
        <div className="absolute top-40 left-0 text-blue-600/30 text-2xl animate-swim-slow pointer-events-none" style={{ animationDelay: '5s' }}>
          <FaFish />
        </div>
        <div className="absolute bottom-32 left-0 text-cyan-600/40 text-xl animate-swim pointer-events-none" style={{ animationDelay: '10s' }}>
          <FaFish />
        </div>

        {/* 🫧 Rising Bubbles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-blue-300/60 to-cyan-300/60 pointer-events-none animate-bubble"
            style={{
              left: `${[15, 30, 45, 60, 75, 90][i]}%`,
              bottom: '-20px',
              width: `${[15, 20, 12, 25, 18, 22][i]}px`,
              height: `${[15, 20, 12, 25, 18, 22][i]}px`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${5 + i}s`
            }}
          />
        ))}

        <div className="max-w-4xl mx-auto px-5 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 px-4 py-2 rounded-full mb-6 shadow-lg animate-radar">
            <FaCircle className="text-[6px] text-blue-700 animate-pulse" />
            <span className="text-xs font-semibold text-blue-800 tracking-wider">
              🌊 WE'RE HERE TO HELP
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-5">
            Let's Start a{' '}
            <span className="shimmer-text font-extrabold">
              Conversation
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-4">
            Have questions about your fleet? Need technical support? Our team is ready to help you navigate every challenge.
          </p>

          {/* Ocean icons */}
          <div className="flex items-center justify-center gap-6 mt-6 text-blue-700/60">
            <GiFishingBoat className="text-3xl animate-rock" />
            <FaWater className="text-2xl animate-wave" />
            <GiSailboat className="text-3xl animate-rock" style={{ animationDelay: '1s' }} />
            <FaAnchor className="text-2xl animate-anchor" />
            <GiFishingHook className="text-2xl animate-sway" />
          </div>
        </div>

        {/* 🌊 SVG Wave Divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-blue-200/60"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-blue-300/40"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-blue-400/50 animate-wave"
            />
          </svg>
        </div>
      </section>

      {/* ===== ⚡ QUICK CONTACT CARDS ===== */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 -mt-8 md:-mt-12 mb-16 md:mb-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {quickContacts.map((contact, i) => (
            <a
              key={i}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group relative bg-white border border-blue-100 rounded-2xl p-5 md:p-6 hover:border-transparent hover:shadow-2xl ${contact.glow} hover:-translate-y-2 transition-all duration-500 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-blue-100/50 to-transparent group-hover:left-full transition-all duration-1000" />

              <div className="relative z-10">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-lg md:text-xl shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {contact.icon}
                </div>
                <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">
                  {contact.label}
                </div>
                <div className="text-sm md:text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                  {contact.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ===== 💌 CONTACT FORM + INFO ===== */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 pb-16 md:pb-20 relative">
        <div className="absolute top-10 right-10 text-blue-300/30 text-6xl animate-sway pointer-events-none">
          <GiFishingHook />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* LEFT: Info Panel with Royal Ocean Gradient */}
          <div className="lg:col-span-2 space-y-6">
            <div className="royal-ocean-gradient rounded-3xl p-8 text-white shadow-2xl shadow-blue-800/40 relative overflow-hidden">
              {/* Decorations */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-ocean" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 animate-ocean" style={{ animationDelay: '2s' }} />

              {/* Fish */}
              <div className="absolute top-1/2 -left-10 text-white/20 text-2xl animate-swim">
                <FaFish />
              </div>

              {/* Bubbles */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/30 animate-bubble"
                  style={{
                    left: `${[20, 50, 70, 85][i]}%`,
                    bottom: '-10px',
                    width: `${[8, 12, 10, 14][i]}px`,
                    height: `${[8, 12, 10, 14][i]}px`,
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: `${5 + i}s`
                  }}
                />
              ))}

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 animate-radar">
                  <FaHeadset className="text-2xl" />
                </div>

                <h3 className="text-2xl font-bold mb-3">Get in Touch</h3>

                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  Fill out the form and we'll respond within 24 hours during business days.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/25 transition-all">
                    <div className="text-2xl font-bold mb-0.5">24/7</div>
                    <div className="text-xs text-blue-100">Support</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/25 transition-all">
                    <div className="text-2xl font-bold mb-0.5">&lt;24h</div>
                    <div className="text-xs text-blue-100">Response</div>
                  </div>
                </div>

                <a
                  href="tel:+94784152744"
                  className="flex items-center gap-3 bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/30 rounded-xl p-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center animate-radar shadow-lg shadow-red-500/50">
                    <FaPhoneAlt className="text-white text-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-blue-100">Emergency</div>
                    <div className="text-sm font-bold">+94 78 415 2744</div>
                  </div>
                  <GiFishingBoat className="text-white/60 text-2xl group-hover:text-white group-hover:scale-110 transition-all animate-rock" />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-100/50 to-transparent" />

              <h4 className="text-sm font-bold text-slate-800 mb-4 relative z-10 flex items-center gap-2">
                <FaShip className="text-blue-700 animate-rock" />
                Follow Us
              </h4>
              <div className="flex gap-3 relative z-10">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 hover:bg-gradient-to-br hover:from-blue-700 hover:to-cyan-500 hover:text-white hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-700/40 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-blue-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-blue-500/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-300/40 to-cyan-300/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-cyan-500 flex items-center justify-center animate-pulse">
                      <FaPaperPlane className="text-white text-xs" />
                    </div>
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                      Contact Form
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Send us a{' '}
                    <span className="shimmer-text">message</span>
                  </h2>
                  <p className="text-sm text-slate-500">
                    We'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block text-xs font-semibold text-slate-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        required
                        className="w-full px-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-slate-800 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:shadow-lg focus:shadow-blue-500/10 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-semibold text-slate-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-slate-800 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:shadow-lg focus:shadow-blue-500/10 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block text-xs font-semibold text-slate-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+94 78 415 2744"
                        className="w-full px-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-slate-800 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:shadow-lg focus:shadow-blue-500/10 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-semibold text-slate-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-slate-800 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:shadow-lg focus:shadow-blue-500/10 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Choose a subject...</option>
                        {subjectOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-semibold text-slate-700 mb-2 group-focus-within:text-blue-700 transition-colors">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-slate-800 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:shadow-lg focus:shadow-blue-500/10 placeholder:text-slate-400 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className={`relative w-full py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg overflow-hidden group ${
                      formStatus === 'sent'
                        ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 text-white shadow-green-500/40'
                        : 'royal-ocean-gradient text-white shadow-blue-700/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-700/60'
                    } ${formStatus === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-1000" />

                    <span className="relative z-10 flex items-center gap-2.5">
                      {formStatus === 'idle' && <><FaPaperPlane className="animate-pulse" /> Send Message</>}
                      {formStatus === 'sending' && <><FaSpinner className="animate-spin" /> Sending...</>}
                      {formStatus === 'sent' && <><FaCheckCircle /> Message Sent Successfully!</>}
                    </span>
                  </button>

                  <p className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-1">
                    🔒 Your information is safe with us.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ❓ FAQ SECTION ===== */}
      <section className="max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-20 relative">
        <div className="absolute top-20 -left-10 text-blue-300/40 text-4xl animate-swim pointer-events-none">
          <FaFish />
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 px-4 py-2 rounded-full mb-5 shadow-md">
            <FaCircle className="text-[6px] text-blue-700 animate-pulse" />
            <span className="text-xs font-semibold text-blue-800 tracking-wider">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
            Common{' '}
            <span className="shimmer-text">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            Quick answers to what you might be wondering
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-500 ${
                activeFaq === index
                  ? 'border-blue-400 shadow-xl shadow-blue-500/15 scale-[1.02]'
                  : 'border-blue-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-5 md:px-6 py-5 flex justify-between items-center text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all"
              >
                <div className="flex items-center gap-3 flex-1 pr-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 transition-all duration-300 ${
                    activeFaq === index
                      ? 'bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-lg shadow-blue-500/40'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    <FaAnchor className={activeFaq === index ? 'animate-pulse' : ''} />
                  </div>
                  <h4 className="text-sm md:text-base font-semibold text-slate-800">
                    {faq.question}
                  </h4>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  activeFaq === index
                    ? 'bg-gradient-to-br from-blue-700 to-cyan-500 text-white rotate-180 shadow-lg shadow-blue-500/30'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  <FaChevronDown className="text-xs" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeFaq === index ? 'max-h-60 pb-5 px-5 md:px-6' : 'max-h-0'
                }`}
              >
                <div className="pl-11 ml-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 🗺️ MAP SECTION ===== */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 px-4 py-2 rounded-full mb-5 shadow-md">
            <FaMapMarkerAlt className="text-xs text-blue-700 animate-bounce" />
            <span className="text-xs font-semibold text-blue-800 tracking-wider">
              VISIT OUR OFFICE
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
            Find Us at{' '}
            <span className="shimmer-text">
              Ambalangoda Harbour
            </span>
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/20 border-4 border-white h-[350px] md:h-[450px] group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-700 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10" />

          <iframe
            src="https://maps.google.com/maps?q=6.2345255,80.0525275&hl=en&z=17&output=embed"
            className="w-full h-full border-none"
            allowFullScreen
            loading="lazy"
            title="Deewaraya - Ambalangoda Harbour"
          />

          <div className="absolute top-5 left-5 md:top-8 md:left-8 bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-xl border-2 border-white max-w-xs z-20 hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-700/40 animate-anchor">
                <FaAnchor className="text-white text-sm" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Deewaraya HQ</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <GiFishingBoat className="text-blue-700" /> Marine Center
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              No.102/4 Heenatiya,<br />
              Balapitiya, Sri Lanka
            </p>
            <a
              href="https://maps.google.com/?q=Ambalangoda+Fishery+Harbor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent hover:from-blue-800 hover:to-cyan-600 transition-all"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 🎣 CTA SECTION - Deep Royal Ocean ===== */}
      <section className="max-w-4xl mx-auto px-5 md:px-10 pb-16">
        <div className="relative deep-ocean-gradient rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden shadow-2xl shadow-blue-900/50">
          {/* Blue glow orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-ocean" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-ocean" style={{ animationDelay: '2s' }} />

          {/* Fish */}
          <div className="absolute top-10 left-0 text-cyan-400/40 text-2xl animate-swim">
            <FaFish />
          </div>
          <div className="absolute bottom-10 left-0 text-blue-400/30 text-xl animate-swim-slow" style={{ animationDelay: '3s' }}>
            <FaFish />
          </div>

          {/* Bubbles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400/40 animate-bubble"
              style={{
                left: `${[10, 30, 50, 70, 90][i]}%`,
                bottom: '-20px',
                width: `${[10, 14, 8, 16, 12][i]}px`,
                height: `${[10, 14, 8, 16, 12][i]}px`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i}s`
              }}
            />
          ))}

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4 text-cyan-300">
              <GiFishingBoat className="text-3xl animate-rock" />
              <FaAnchor className="text-2xl animate-anchor" />
              <GiSailboat className="text-3xl animate-rock" style={{ animationDelay: '1s' }} />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Still have{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                questions?
              </span>
            </h3>
            <p className="text-blue-100 text-sm md:text-base mb-6 max-w-md mx-auto">
              Our friendly support crew is just a message away. We're here to help you navigate!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/94784152744"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#25d366] to-[#20bd5a] hover:from-[#20bd5a] hover:to-[#1ba851] px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/40"
              >
                <FaWhatsapp className="text-lg group-hover:scale-125 transition-transform" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+94784152744"
                className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <FaPhoneAlt className="group-hover:animate-pulse" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 💬 WHATSAPP FLOATING BUTTON ===== */}
      <a
        href="https://wa.me/94784152744"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-[#25d366] to-[#20bd5a] hover:from-[#20bd5a] hover:to-[#1ba851] text-white px-5 py-3.5 rounded-full font-semibold text-sm shadow-2xl shadow-green-500/50 transition-all hover:scale-110 hover:shadow-green-500/70 animate-radar group"
      >
        <FaWhatsapp className="text-xl group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Need Help?</span>
      </a>
    </div>
  );
};

export default FleetContact;