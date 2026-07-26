import { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import {
  FaShip, FaAnchor, FaQrcode, FaDownload, FaShareAlt,
  FaPrint, FaCopy, FaWhatsapp, FaEnvelope, FaFacebookF,
  FaTwitter, FaEdit, FaEye, FaEyeSlash, FaLock, FaUnlock,
  FaChartLine, FaHistory, FaMapMarkerAlt, FaPhoneAlt,
  FaCheckCircle, FaShieldAlt, FaCog, FaPalette, FaImage,
  FaExclamationTriangle, FaFish, FaWater, FaLifeRing,
  FaFileDownload, FaFilePdf, FaFileImage, FaSyncAlt,
  FaMobile, FaEnvelopeOpen, FaLink, FaTimes, FaCheck,
  FaCircle, FaRegClock, FaChevronRight, FaInfoCircle
} from 'react-icons/fa';
import { GiFishingBoat, GiSailboat, GiShipWheel } from 'react-icons/gi';
import { MdEngineering, MdVerified, MdDateRange } from 'react-icons/md';
import HomeNavBar from '../../components/HomeNavBar';

const VesselQRCode = () => {
  // ==================== STATE ====================
  const qrRef = useRef(null);
  const printRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [qrColor, setQrColor] = useState('#1e40af');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrStyle, setQrStyle] = useState('squares');
  const [showLogo, setShowLogo] = useState(true);


  const [privacySettings, setPrivacySettings] = useState({
    vesselName: true,
    registrationNumber: true,
    engineNumber: true,
    emergencyContact: true,
    homePort: true,
    licenseStatus: true,
    location: false,
    documents: false
  });

  // ==================== SAMPLE VESSEL DATA ====================
  const [vesselData] = useState({
    id: 'VES-0042',
    name: 'Sagara Kumari',
    registrationNumber: 'SL-DEW-2024-0042',
    engineNumber: 'ENG-YMH-4523-XK',
    engineModel: 'Yamaha F250 XCA',
    homePort: 'Ambalangoda Harbour',
    emergencyContact: '+94 78 415 2744',
    licenseStatus: 'Active',
    licenseExpiry: '12/2026',
    registeredDate: '15/03/2024',
    vesselType: 'Multi-day Fishing Vessel',
    length: '45 ft',
    capacity: '8 tons',
    verified: true,
    photo: null // Add vessel photo URL here
  });

  // ==================== SCAN ANALYTICS (Sample Data) ====================
  const scanStats = {
    total: 247,
    thisWeek: 15,
    lastScanned: '2 hours ago',
    topLocation: 'Ambalangoda Harbour',
    breakdown: {
      emergency: 3,
      inspection: 12,
      family: 232
    },
    recentScans: [
      { by: 'Coast Guard', date: '12/03/2025', type: 'Inspection', icon: <FaShieldAlt />, color: 'text-blue-600' },
      { by: 'Fisheries Dept', date: '10/03/2025', type: 'Inspection', icon: <FaShieldAlt />, color: 'text-cyan-600' },
      { by: 'Family Member', date: '08/03/2025', type: 'Family', icon: <FaLifeRing />, color: 'text-green-600' },
      { by: 'Insurance Officer', date: '05/03/2025', type: 'Verification', icon: <MdVerified />, color: 'text-purple-600' }
    ]
  };

  // ==================== QR DATA URL ====================
  const qrDataURL = `http://192.168.41.199:5174/vessel/${vesselData.id}`;

  // ==================== HANDLERS ====================

  // 📥 Download as PNG
  const downloadPNG = async () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        saveAs(blob, `${vesselData.name}-QR-${vesselData.id}.png`);
      });
    }
    setShowDownloadMenu(false);
  };

  // 📄 Download as PDF
  const downloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${vesselData.name}-Vessel-QR-Certificate.pdf`);

    setShowDownloadMenu(false);
  };

  // 🖨️ Print QR
  const handlePrint = () => {
    window.print();
    setShowDownloadMenu(false);
  };

  // 📋 Copy Link
  const copyLink = () => {
    navigator.clipboard.writeText(qrDataURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  // 💬 Share via WhatsApp
  const shareWhatsApp = () => {
    const message = `🚢 *${vesselData.name}* - Vessel Verification\n\n📋 ID: ${vesselData.id}\n⚙️ Engine: ${vesselData.engineNumber}\n📍 Port: ${vesselData.homePort}\n\n🔗 View Details: ${qrDataURL}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    setShowShareMenu(false);
  };

  // 📧 Share via Email
  const shareEmail = () => {
    const subject = `Vessel QR - ${vesselData.name}`;
    const body = `Hello,\n\nHere is the vessel information for ${vesselData.name}:\n\nVessel ID: ${vesselData.id}\nEngine Number: ${vesselData.engineNumber}\nHome Port: ${vesselData.homePort}\n\nView full details: ${qrDataURL}\n\nBest regards,\nDeewaraya Fleet Management`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowShareMenu(false);
  };

  // 📱 Share via SMS
  const shareSMS = () => {
    const message = `🚢 ${vesselData.name} - Vessel QR: ${qrDataURL}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
    setShowShareMenu(false);
  };

  // 🔄 Regenerate QR
  const regenerateQR = () => {
    if (confirm('Are you sure? The old QR code will be deactivated.')) {
      alert('QR Code regenerated successfully! ✅');
    }
  };

  // 🔒 Toggle Privacy Setting
  const togglePrivacy = (key) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/40 text-slate-800">

      <HomeNavBar />

      {/* ===== 🎯 PAGE HEADER ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-gradient-to-br from-blue-700/15 to-blue-400/15 rounded-full blur-3xl" />

        {/* Swimming Fish */}
        <div className="absolute top-20 left-0 text-blue-400/30 text-2xl animate-swim pointer-events-none">
          <FaFish />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-12 pb-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <a href="/dashboard" className="hover:text-blue-700 transition-colors">Dashboard</a>
            <FaChevronRight className="text-xs" />
            <a href="/vessels" className="hover:text-blue-700 transition-colors">My Vessels</a>
            <FaChevronRight className="text-xs" />
            <span className="text-blue-700 font-semibold">QR Code</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 px-4 py-2 rounded-full mb-4 shadow-md">
                <FaQrcode className="text-xs text-blue-700 animate-pulse" />
                <span className="text-xs font-semibold text-blue-800 tracking-wider">
                  VESSEL QR CODE
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                Your Vessel's{' '}
                <span className="shimmer-text">Digital Identity</span>
              </h1>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl">
                Generate, customize, and share unique QR codes for instant vessel verification and emergency access.
              </p>
            </div>

            {/* Verified Badge */}
            {vesselData.verified && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-5 py-3 rounded-2xl shadow-lg shadow-green-500/30">
                <MdVerified className="text-2xl" />
                <div>
                  <div className="text-xs font-semibold uppercase opacity-90">Verified</div>
                  <div className="text-sm font-bold">Active Vessel</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== 🎨 MAIN QR CODE SECTION ===== */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ========== LEFT: QR Code Display ========== */}
          <div className="qr-container rounded-3xl p-6 md:p-8 border-2 border-blue-100 relative overflow-hidden">
            {/* Decorative Bubbles */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-blue-300/30 animate-bubble pointer-events-none"
                style={{
                  left: `${[15, 40, 65, 85][i]}%`,
                  bottom: '-10px',
                  width: `${[10, 15, 8, 12][i]}px`,
                  height: `${[10, 15, 8, 12][i]}px`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${6 + i}s`
                }}
              />
            ))}

            <div id="print-area" ref={printRef} className="relative z-10">
              {/* QR Code Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl royal-ocean-gradient flex items-center justify-center shadow-lg">
                    <FaShip className="text-white text-lg" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-blue-600 font-semibold">DEEWARAYA</div>
                    <div className="text-xs text-slate-500">Fleet Management</div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{vesselData.name}</h2>
                <p className="text-sm text-slate-500 mt-1">Vessel ID: {vesselData.id}</p>
              </div>

              {/* QR Code Display */}
              <div
                ref={qrRef}
                className="bg-white rounded-2xl p-6 md:p-8 mx-auto max-w-sm border-4 border-blue-100 relative overflow-hidden shadow-xl"
              >
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-blue-600 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-blue-600 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-blue-600 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-blue-600 rounded-br-lg" />

                <div className="flex items-center justify-center">
                  <QRCodeCanvas
                    value={qrDataURL}
                    size={256}
                    fgColor={qrColor}
                    bgColor={qrBgColor}
                    level="H"
                    includeMargin={true}
                    imageSettings={showLogo ? {
                      src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzFlNDBhZiI+PHBhdGggZD0iTTIwIDIxYy0xLjM5IDAtMi43OC0uNDctNC0xLjMyLTIuNDQgMS43MS01LjU2IDEuNzEtOCAwQzYuNzggMjAuNTMgNS4zOSAyMSA0IDIxSDJ2Mmg0YzEuMzggMCAyLjc0LS4zNSA0LTFjMi41MiAxLjMxIDUuNDggMS4zMSA4IDBjMS4yNi42NiAyLjYyIDEgNCAxaDR2LTJoLTJNMy45NSAxOUg0Yy4wOSAwIC4yLS4wMy4yOS0uMDJDMTAuMTggMTkuNyAxNC42IDE4IDIwIDE1LjZjLjA2LS4wMy4xLS4wNi4xNi0uMDlWMTNjLjItLjE1LjMzLS40Ljk4LS40Ljk4IDBWNGgtNGwtLjA0LjA4YTUuOTIgNS45MiAwIDAgMC00LTIuMDhoLTFhNS45MyA1LjkzIDAgMCAwLTQgMi4wOEwxMS41IDRINEwzLjk4IDEyLjYyYzIuMDMuNTggMy45MiAyLjExIDMuOTIgNC4zOFYxOWMuMDIgMCAuMDMgMCAuMDUuMDF6TTEyIDRhMy41IDMuNSAwIDAgMSAzLjMzIDIuNUgxMi4xNGwtLjE0LS41LTEuNSAxaC0xLjgzQzguODMgNS41IDEwLjMxIDQgMTIgNHoiLz48L3N2Zz4=',
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    } : undefined}
                  />
                </div>

                <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                  📱 Scan to verify vessel
                </p>
              </div>

              {/* Vessel Info Below QR */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                  <div className="text-xs text-blue-600 font-semibold uppercase mb-1">Registration</div>
                  <div className="text-sm font-bold text-slate-800">{vesselData.registrationNumber}</div>
                </div>
                <div className="bg-cyan-50 rounded-xl p-3 text-center border border-cyan-100">
                  <div className="text-xs text-cyan-600 font-semibold uppercase mb-1">Engine No.</div>
                  <div className="text-sm font-bold text-slate-800">{vesselData.engineNumber}</div>
                </div>
              </div>
            </div>

            {/* ⚡ Quick Action Buttons */}
            <div className="mt-6 grid grid-cols-4 gap-2">
              {/* Download Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowDownloadMenu(!showDownloadMenu);
                    setShowShareMenu(false);
                  }}
                  className="w-full flex flex-col items-center gap-1 bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-400 text-blue-700 px-3 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md group"
                >
                  <FaDownload className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Download</span>
                </button>

                {/* Download Dropdown */}
                {showDownloadMenu && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:min-w-[200px] bg-white rounded-xl shadow-2xl border border-blue-100 py-2 z-30">
                    <button
                      onClick={downloadPNG}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-slate-700 text-sm transition-colors"
                    >
                      <FaFileImage className="text-blue-600" />
                      <span>Download as PNG</span>
                    </button>
                    <button
                      onClick={downloadPDF}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-slate-700 text-sm transition-colors"
                    >
                      <FaFilePdf className="text-red-500" />
                      <span>Download as PDF</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowShareMenu(!showShareMenu);
                    setShowDownloadMenu(false);
                  }}
                  className="w-full flex flex-col items-center gap-1 bg-white hover:bg-cyan-50 border border-cyan-200 hover:border-cyan-400 text-cyan-700 px-3 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md group"
                >
                  <FaShareAlt className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Share</span>
                </button>

                {/* Share Dropdown */}
                {showShareMenu && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:min-w-[200px] bg-white rounded-xl shadow-2xl border border-cyan-100 py-2 z-30">
                    <button
                      onClick={shareWhatsApp}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 text-slate-700 text-sm transition-colors"
                    >
                      <FaWhatsapp className="text-green-500" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={shareEmail}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-slate-700 text-sm transition-colors"
                    >
                      <FaEnvelope className="text-blue-600" />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={shareSMS}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 text-slate-700 text-sm transition-colors"
                    >
                      <FaMobile className="text-purple-500" />
                      <span>SMS</span>
                    </button>
                    <button
                      onClick={copyLink}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 text-sm transition-colors"
                    >
                      <FaLink className="text-slate-500" />
                      <span>{copied ? '✓ Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="flex flex-col items-center gap-1 bg-white hover:bg-purple-50 border border-purple-200 hover:border-purple-400 text-purple-700 px-3 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md group"
              >
                <FaPrint className="text-lg group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Print</span>
              </button>

              {/* Regenerate Button */}
              <button
                onClick={regenerateQR}
                className="flex flex-col items-center gap-1 bg-white hover:bg-orange-50 border border-orange-200 hover:border-orange-400 text-orange-700 px-3 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md group"
              >
                <FaSyncAlt className="text-lg group-hover:scale-110 transition-transform group-hover:rotate-180 duration-500" />
                <span className="text-xs font-semibold">Regenerate</span>
              </button>
            </div>

            {/* Copied Notification */}
            {copied && (
              <div className="fixed top-24 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-float">
                <FaCheckCircle /> Link copied to clipboard!
              </div>
            )}
          </div>

          {/* ========== RIGHT: Vessel Details Card ========== */}
          <div className="space-y-6">
            {/* Vessel Info Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-blue-100 shadow-xl shadow-blue-500/5 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <GiFishingBoat className="text-blue-600 animate-rock" />
                    Vessel Details
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 group">
                    <FaEdit /> Edit
                  </button>
                </div>

                {/* Details Grid */}
                <div className="space-y-4">
                  <DetailRow
                    icon={<FaShip />}
                    label="Vessel Name"
                    value={vesselData.name}
                    color="blue"
                  />
                  <DetailRow
                    icon={<FaQrcode />}
                    label="Vessel ID"
                    value={vesselData.id}
                    color="cyan"
                  />
                  <DetailRow
                    icon={<MdVerified />}
                    label="Registration Number"
                    value={vesselData.registrationNumber}
                    color="green"
                  />
                  <DetailRow
                    icon={<MdEngineering />}
                    label="Engine Number"
                    value={vesselData.engineNumber}
                    subValue={vesselData.engineModel}
                    color="purple"
                  />
                  <DetailRow
                    icon={<FaMapMarkerAlt />}
                    label="Home Port"
                    value={vesselData.homePort}
                    color="red"
                  />
                  <DetailRow
                    icon={<FaPhoneAlt />}
                    label="Emergency Contact"
                    value={vesselData.emergencyContact}
                    color="orange"
                  />
                  <DetailRow
                    icon={<GiShipWheel />}
                    label="Vessel Type"
                    value={vesselData.vesselType}
                    color="indigo"
                  />
                  <DetailRow
                    icon={<FaShieldAlt />}
                    label="License Status"
                    value={
                      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <FaCheckCircle /> {vesselData.licenseStatus}
                      </span>
                    }
                    subValue={`Expires: ${vesselData.licenseExpiry}`}
                    color="green"
                  />
                  <DetailRow
                    icon={<MdDateRange />}
                    label="Registered Date"
                    value={vesselData.registeredDate}
                    color="slate"
                  />
                </div>

                {/* Additional Specs */}
                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
                    <div className="text-xs text-blue-600 font-semibold uppercase mb-1">Length</div>
                    <div className="text-lg font-bold text-slate-800">{vesselData.length}</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-3 border border-cyan-100">
                    <div className="text-xs text-cyan-600 font-semibold uppercase mb-1">Capacity</div>
                    <div className="text-lg font-bold text-slate-800">{vesselData.capacity}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 🎨 CUSTOMIZATION SECTION ===== 
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-blue-100 shadow-xl shadow-blue-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <FaPalette className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Customize QR Code</h3>
              <p className="text-sm text-slate-500">Personalize the look of your QR code</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* QR Color 
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                QR Code Color
              </label>
              <div className="flex flex-wrap gap-2">
                {['#1e40af', '#0891b2', '#059669', '#dc2626', '#7c3aed', '#000000'].map(color => (
                  <button
                    key={color}
                    onClick={() => setQrColor(color)}
                    className={`w-10 h-10 rounded-lg transition-all hover:scale-110 ${
                      qrColor === color ? 'ring-4 ring-offset-2 ring-blue-400' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-slate-200"
                />
              </div>
            </div>

            {/* Background Color 
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Background Color
              </label>
              <div className="flex flex-wrap gap-2">
                {['#ffffff', '#f0f9ff', '#ecfeff', '#f0fdf4', '#fef3c7'].map(color => (
                  <button
                    key={color}
                    onClick={() => setQrBgColor(color)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                      qrBgColor === color ? 'ring-4 ring-offset-2 ring-blue-400 border-slate-300' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Logo Toggle 
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Center Logo
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowLogo(!showLogo)}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    showLogo ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all shadow-md ${
                      showLogo ? 'left-7' : 'left-0.5'
                    }`}
                  />
                </button>
                <span className="text-sm text-slate-600">
                  {showLogo ? 'Logo Visible' : 'Logo Hidden'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ===== 🔒 PRIVACY & SECURITY SECTION ===== */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-blue-100 shadow-xl shadow-blue-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
              <FaLock className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Privacy Settings</h3>
              <p className="text-sm text-slate-500">Control what info is visible when scanned</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(privacySettings).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    value ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {value ? <FaEye /> : <FaEyeSlash />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xs text-slate-500">
                      {value ? 'Public - Anyone can see' : 'Hidden - Login required'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => togglePrivacy(key)}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    value ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-md ${
                      value ? 'left-6' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 📊 SCAN ANALYTICS SECTION ===== */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="royal-ocean-gradient rounded-2xl p-6 text-white shadow-xl shadow-blue-700/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <FaChartLine />
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    Total Scans
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1">{scanStats.total}</div>
                <div className="text-sm text-blue-100">All time scans</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-md">
                <div className="text-xs text-blue-600 font-semibold uppercase mb-1">This Week</div>
                <div className="text-2xl font-bold text-slate-800">{scanStats.thisWeek}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-cyan-100 shadow-md">
                <div className="text-xs text-cyan-600 font-semibold uppercase mb-1">Last Scan</div>
                <div className="text-sm font-bold text-slate-800 mt-1">{scanStats.lastScanned}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-xs font-semibold text-slate-500 uppercase">Top Location</span>
              </div>
              <div className="text-sm font-bold text-slate-800">{scanStats.topLocation}</div>
            </div>

            {/* Scan Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-md">
              <div className="text-xs font-semibold text-slate-500 uppercase mb-3">Scan Types</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500 text-xs" /> Emergency
                  </span>
                  <span className="text-sm font-bold text-slate-800">{scanStats.breakdown.emergency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <FaShieldAlt className="text-blue-500 text-xs" /> Inspection
                  </span>
                  <span className="text-sm font-bold text-slate-800">{scanStats.breakdown.inspection}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <FaLifeRing className="text-green-500 text-xs" /> Family
                  </span>
                  <span className="text-sm font-bold text-slate-800">{scanStats.breakdown.family}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-blue-100 shadow-xl shadow-blue-500/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <FaHistory className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Recent Scans</h3>
                  <p className="text-xs text-slate-500">Latest scan activity</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {scanStats.recentScans.map((scan, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ${scan.color}`}>
                      {scan.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{scan.by}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <FaRegClock /> {scan.date}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {scan.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 💡 HOW TO USE SECTION ===== */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-8 pb-16">
        <div className="royal-ocean-gradient rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-blue-700/40 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          {/* Fish */}
          <div className="absolute top-1/2 -left-10 text-white/10 text-4xl animate-swim">
            <FaFish />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <FaInfoCircle className="text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">How to Use Your QR Code</h3>
                <p className="text-blue-100 text-sm">Simple steps to get started</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  icon: <FaDownload />,
                  title: 'Download',
                  desc: 'Download your QR code as PNG or PDF for printing or sharing digitally.'
                },
                {
                  step: '02',
                  icon: <FaPrint />,
                  title: 'Print & Stick',
                  desc: 'Print the QR code and stick it on your boat, ID card, or documents.'
                },
                {
                  step: '03',
                  icon: <FaShareAlt />,
                  title: 'Share',
                  desc: 'Share the QR with authorities, family, or fish market buyers for instant verification.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-white/40">{item.step}</span>
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-blue-100 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== HELPER COMPONENT ====================
const DetailRow = ({ icon, label, value, subValue, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    cyan: 'bg-cyan-100 text-cyan-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    slate: 'bg-slate-100 text-slate-700'
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="text-sm font-bold text-slate-800 truncate">
          {value}
        </div>
        {subValue && (
          <div className="text-xs text-slate-500 mt-0.5">{subValue}</div>
        )}
      </div>
    </div>
  );
};

export default VesselQRCode;