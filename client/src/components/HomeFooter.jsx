import React from "react";
import { Link } from "react-router-dom";
import { 
  Ship, 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  ArrowUp,
  Anchor,
  Waves
} from "lucide-react";

const HomeFooter = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-root relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 overflow-hidden">
      <style>{responsiveStyles}</style>

      {/* Wave Top Border */}
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

      {/* ✅ Main Footer Content */}
      <div className="footer-container relative container mx-auto px-6 md:px-20 pt-24 pb-8">
        
        {/* ✅ Newsletter Section */}
        <div className="footer-newsletter mb-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 hover:scale-[1.01]">
          <div className="footer-newsletter-inner flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Newsletter Text */}
            <div className="footer-newsletter-text">
              <h3 className="footer-newsletter-heading text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Waves className="footer-newsletter-icon w-8 h-8 text-cyan-400 animate-bounce" />
                Stay Updated
              </h3>
              <p className="footer-newsletter-sub text-blue-200 text-sm">
                Subscribe to get maritime updates and safety alerts
              </p>
            </div>

            {/* Newsletter Input Row */}
            <div className="footer-newsletter-form flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-newsletter-input flex-1 md:w-72 px-4 py-3 rounded-lg bg-white/10 border border-blue-400/40 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all"
              />
              <button className="footer-newsletter-btn px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 group">
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Main Grid */}
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* ✅ Logo & Description Column */}
          <div className="footer-brand lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <span className="footer-brand-name text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Deewaraya
              </span>
            </div>
            <p className="footer-brand-desc text-blue-200 text-sm leading-relaxed mb-6 max-w-xs">
              Leading the digital transformation of maritime and fishing fleet
              management worldwide. Sail smart, sail safe.
            </p>
            <div className="footer-anchor-badge inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-cyan-300 text-xs font-semibold hover:bg-blue-500/30 transition-all cursor-pointer group">
              <Anchor className="w-3 h-3 group-hover:rotate-45 transition-transform duration-500" />
              Trusted by 10,000+ Sailors
            </div>
          </div>

          {/* ✅ Product Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading font-bold text-white mb-5 text-lg relative inline-block">
              Product
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
            </h4>
            <ul className="footer-col-list space-y-3 text-sm">
              {["Live Tracking", "Analytics", "Safety Notices", "Weather Alerts"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-blue-200 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Company Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading font-bold text-white mb-5 text-lg relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
            </h4>
            <ul className="footer-col-list space-y-3 text-sm">
              {["About Us", "Fleet Login", "Privacy Policy", "Careers"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-blue-200 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Contact Column */}
          <div className="footer-col">
            <h4 className="footer-col-heading font-bold text-white mb-5 text-lg relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
            </h4>
            <ul className="footer-contact-list space-y-4 text-sm text-blue-200">
              <li className="footer-contact-item flex items-start gap-3 group cursor-pointer hover:text-cyan-300 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="pt-1">No. 123, Hiriketiya, Sri Lanka</span>
              </li>
              <li className="footer-contact-item flex items-center gap-3 group cursor-pointer hover:text-cyan-300 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <span>+94 77 123 4567</span>
              </li>
              <li className="footer-contact-item flex items-center gap-3 group cursor-pointer hover:text-cyan-300 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span>info@deewaraya.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ✅ Copyright & Back to Top */}
        <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          
          <p className="footer-copyright text-xs text-blue-300">
            © {new Date().getFullYear()} <span className="font-bold text-white">DEEWARAYA</span>. All Rights Reserved.
          </p>

          <div className="footer-legal flex items-center gap-4 text-xs text-blue-300">
            <a href="#" className="hover:text-cyan-300 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-300 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-300 transition-colors">Cookies</a>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-backtop group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
          >
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            Back to Top
          </button>

        </div>
      </div>
    </footer>
  );
};


// ============================================================
// ✅ RESPONSIVE STYLES - Proper & Attractive
// ============================================================

const responsiveStyles = `

  /* ==============================
     TABLET LANDSCAPE (max-width: 1024px)
     ============================== */
  @media (max-width: 1024px) {

    .footer-container {
      padding-left: 2rem !important;
      padding-right: 2rem !important;
      padding-top: 5rem !important;
    }

    .footer-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 2rem !important;
    }

    .footer-brand {
      grid-column: span 2 !important;
    }

    .footer-newsletter {
      padding: 1.75rem !important;
      margin-bottom: 2.5rem !important;
    }
  }


  /* ==============================
     TABLET PORTRAIT (max-width: 768px)
     ============================== */
  @media (max-width: 768px) {

    .footer-container {
      padding-left: 1.5rem !important;
      padding-right: 1.5rem !important;
      padding-top: 4.5rem !important;
      padding-bottom: 1.5rem !important;
    }

    /* Newsletter */
    .footer-newsletter {
      padding: 1.5rem !important;
      margin-bottom: 2rem !important;
      border-radius: 1rem !important;
    }

    .footer-newsletter-inner {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 1.25rem !important;
    }

    .footer-newsletter-heading {
      font-size: 1.375rem !important;
    }

    .footer-newsletter-icon {
      width: 1.5rem !important;
      height: 1.5rem !important;
    }

    .footer-newsletter-sub {
      font-size: 0.8125rem !important;
    }

    .footer-newsletter-form {
      flex-direction: column !important;
      width: 100% !important;
      gap: 0.75rem !important;
    }

    .footer-newsletter-input {
      width: 100% !important;
      padding: 0.75rem 1rem !important;
      font-size: 0.875rem !important;
    }

    .footer-newsletter-btn {
      width: 100% !important;
      justify-content: center !important;
      padding: 0.75rem 1rem !important;
      font-size: 0.875rem !important;
    }

    /* Grid */
    .footer-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1.75rem !important;
    }

    .footer-brand {
      grid-column: span 2 !important;
    }

    /* Bottom */
    .footer-bottom {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 1rem !important;
      padding-top: 1.25rem !important;
    }
  }


  /* ==============================
     MOBILE (max-width: 640px)
     ============================== */
  @media (max-width: 640px) {

    .footer-container {
      padding-left: 1.25rem !important;
      padding-right: 1.25rem !important;
      padding-top: 4rem !important;
    }

    /* Newsletter */
    .footer-newsletter {
      padding: 1.25rem !important;
      margin-bottom: 1.75rem !important;
    }

    .footer-newsletter-heading {
      font-size: 1.25rem !important;
      gap: 0.5rem !important;
    }

    /* Grid - single column */
    .footer-grid {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }

    .footer-brand {
      grid-column: span 1 !important;
    }

    /* Brand */
    .footer-brand-name {
      font-size: 1.25rem !important;
    }

    .footer-brand-desc {
      font-size: 0.8125rem !important;
      margin-bottom: 1rem !important;
    }

    .footer-anchor-badge {
      font-size: 0.6875rem !important;
      padding: 0.375rem 0.75rem !important;
    }

    /* Column headings */
    .footer-col-heading {
      font-size: 0.9375rem !important;
      margin-bottom: 0.875rem !important;
    }

    /* Column list items */
    .footer-col-list li a {
      font-size: 0.8125rem !important;
    }

    /* Contact items */
    .footer-contact-item {
      font-size: 0.8125rem !important;
    }

    .footer-contact-item .p-2 {
      padding: 0.375rem !important;
    }

    .footer-contact-item .p-2 svg {
      width: 0.875rem !important;
      height: 0.875rem !important;
    }

    /* Bottom */
    .footer-copyright {
      font-size: 0.6875rem !important;
    }

    .footer-legal a,
    .footer-legal span {
      font-size: 0.6875rem !important;
    }

    .footer-backtop {
      font-size: 0.6875rem !important;
      padding: 0.4rem 0.875rem !important;
    }
  }


  /* ==============================
     SMALL MOBILE (max-width: 480px)
     ============================== */
  @media (max-width: 480px) {

    .footer-container {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
      padding-top: 3.5rem !important;
    }

    .footer-newsletter {
      padding: 1rem !important;
      margin-bottom: 1.5rem !important;
    }

    .footer-newsletter-heading {
      font-size: 1.125rem !important;
    }

    .footer-newsletter-input {
      padding: 0.625rem 0.875rem !important;
      font-size: 0.8125rem !important;
    }

    .footer-newsletter-btn {
      padding: 0.625rem 0.875rem !important;
      font-size: 0.8125rem !important;
    }

    .footer-grid {
      gap: 1.25rem !important;
    }

    .footer-brand-name {
      font-size: 1.125rem !important;
    }

    .footer-col-heading {
      font-size: 0.875rem !important;
    }

    .footer-col-list li a {
      font-size: 0.75rem !important;
    }

    .footer-contact-item {
      font-size: 0.75rem !important;
    }

    .footer-bottom {
      gap: 0.875rem !important;
    }
  }


  /* ==============================
     VERY SMALL (max-width: 360px)
     ============================== */
  @media (max-width: 360px) {

    .footer-container {
      padding-left: 0.75rem !important;
      padding-right: 0.75rem !important;
    }

    .footer-newsletter {
      padding: 0.875rem !important;
    }

    .footer-newsletter-heading {
      font-size: 1rem !important;
    }

    .footer-brand-name {
      font-size: 1rem !important;
    }

    .footer-brand-desc {
      font-size: 0.75rem !important;
    }

    .footer-col-heading {
      font-size: 0.8125rem !important;
    }

    .footer-col-list li a,
    .footer-contact-item {
      font-size: 0.6875rem !important;
    }

    .footer-copyright,
    .footer-legal a {
      font-size: 0.625rem !important;
    }

    .footer-backtop {
      font-size: 0.625rem !important;
      padding: 0.375rem 0.75rem !important;
    }
  }
`;

export default HomeFooter;