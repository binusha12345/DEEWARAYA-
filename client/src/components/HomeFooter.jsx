import React from "react";
import { Link } from "react-router-dom";
import { 
  Ship, 
  MapPin, 
  Phone, 
  Mail, 
  //Facebook,
  //Twitter,
  //Instagram,
  //Linkedin,
  //Youtube,
  Send,
  ArrowUp,
  Anchor,
  Waves
} from "lucide-react";

const HomeFooter = () => {

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 overflow-hidden">
      
      {/* Animated Wave Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-16" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-blue-800/30 animate-pulse"
          />
        </svg>
      </div>

      {/* Animated Background Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

      {/*Main Footer Content */}
      <div className="relative container mx-auto px-6 md:px-20 pt-24 pb-8">
        
        {/* Newsletter Section - Top Highlight */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Waves className="w-8 h-8 text-cyan-400 animate-bounce" />
                Stay Updated
              </h3>
              <p className="text-blue-200 text-sm">
                Subscribe to get maritime updates and safety alerts
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-white/10 border border-blue-400/40 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 group">
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Logo & Description - Bigger Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Deewaraya
              </span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6 max-w-xs">
              Leading the digital transformation of maritime and fishing fleet
              management worldwide. Sail smart, sail safe.
            </p>

            {/*Animated Anchor Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-cyan-300 text-xs font-semibold hover:bg-blue-500/30 transition-all cursor-pointer group">
              <Anchor className="w-3 h-3 group-hover:rotate-45 transition-transform duration-500" />
              Trusted by 10,000+ Sailors
            </div>
          </div>

          {/* Product Links with Hover Animation */}
          <div>
            <h4 className="font-bold text-white mb-5 text-lg relative inline-block">
              Product
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {["Live Tracking", "Analytics", "Safety Notices", "Weather Alerts"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-blue-200 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-lg relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "Fleet Login", "Privacy Policy", "Careers"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-blue-200 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us with Icon Animations */}
          <div>
            <h4 className="font-bold text-white mb-5 text-lg relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
            </h4>
            <ul className="space-y-4 text-sm text-blue-200">
              <li className="flex items-start gap-3 group cursor-pointer hover:text-cyan-300 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="pt-1">No. 123, Hiriketiya, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:text-cyan-300 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:text-cyan-300 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span>info@deewaraya.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/*Social Media - Center Highlight 
        <div className="flex flex-col items-center gap-4 py-8 border-y border-blue-800/50">
          <p className="text-blue-200 text-sm font-medium">Follow Our Journey</p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, color: "hover:bg-blue-600" },
              { Icon: Twitter, color: "hover:bg-sky-500" },
              { Icon: Instagram, color: "hover:bg-pink-600" },
              { Icon: Linkedin, color: "hover:bg-blue-700" },
              { Icon: Youtube, color: "hover:bg-red-600" }
            ].map(({ Icon, color }, index) => (
              <a
                key={index}
                href="#"
                className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center text-white ${color} hover:scale-110 hover:rotate-6 hover:border-transparent transition-all duration-300`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>*/}

        {/* Copyright & Back to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-blue-300">
            © {new Date().getFullYear()} <span className="font-bold text-white">DEEWARAYA</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-blue-300">
            <a href="#" className="hover:text-cyan-300 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-300 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-300 transition-colors">Cookies</a>
          </div>

          {/*Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
          >
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            Back to Top
          </button>
        </div>

      </div>
    </footer>
  );
};

export default HomeFooter;