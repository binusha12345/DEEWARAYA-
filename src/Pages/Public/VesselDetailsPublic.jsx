// VesselDetailsPublic.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaShip, FaCheckCircle, FaTimesCircle, FaShieldAlt,
  FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt, FaIdCard,
  FaAnchor, FaExclamationTriangle, FaPrint, FaFileAlt,
  FaClock, FaLock, FaInfoCircle, FaFlag
} from 'react-icons/fa';
import { MdVerified, MdGpsFixed, MdEngineering } from 'react-icons/md';

const VesselDetailsPublic = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [vesselData, setVesselData] = useState(null);
  const [scanTime] = useState(new Date());

  // ==================== FETCH VESSEL DATA ====================
  useEffect(() => {
    const fetchVessel = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/vessels/public/${id}`);
        // const data = await response.json();

        setTimeout(() => {
          setVesselData({
            id: id || 'VES-0042',
            name: 'Sagara Kumari',
            registrationNumber: 'SL-DEW-2024-0042',
            engineNumber: 'ENG-YMH-4523-XK',
            engineModel: 'Yamaha F250 XCA',
            engineSerialNumber: 'YMH-2024-45231',
            homePort: 'Ambalangoda Harbour',
            emergencyContact: '+94 78 415 2744',
            licenseStatus: 'Active',
            licenseNumber: 'LIC-2024-4521',
            licenseIssueDate: '15/03/2024',
            licenseExpiry: '12/2026',
            registeredDate: '15/03/2024',
            vesselType: 'Multi-day Fishing Vessel',
            vesselCategory: 'Commercial Fishing',
            length: '45 ft',
            capacity: '8 tons',
            crewCapacity: '6 persons',
            hullMaterial: 'Fiberglass',
            flag: 'Sri Lanka',
            imoNumber: 'IMO-9876543',
            callSign: '4S7-ABC',
            mmsi: '419123456',
            verified: true,
            insuranceStatus: 'Valid',
            insuranceExpiry: '06/2026',
            safetyCertificate: 'Valid',
            safetyCertExpiry: '09/2026'
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching vessel:', error);
        setLoading(false);
      }
    };

    fetchVessel();
  }, [id]);

  // ==================== HANDLERS ====================
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // ==================== LOADING ====================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-blue-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 font-semibold">Loading Vessel Information...</p>
          <p className="text-xs text-slate-500 mt-2">Verifying with Deewaraya Database</p>
        </div>
      </div>
    );
  }

  // ==================== VESSEL NOT FOUND ====================
  if (!vesselData) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white border-l-4 border-red-600 rounded shadow-lg p-8 max-w-md">
          <div className="flex items-start gap-4">
            <FaTimesCircle className="text-4xl text-red-600 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Vessel Not Registered</h2>
              <p className="text-sm text-slate-600 mb-4">
                This QR code is not associated with any registered vessel in the Deewaraya database.
              </p>
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-xs text-red-800 font-semibold">Please report this to authorities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">

      {/* ===== 🏛️ OFFICIAL HEADER ===== */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md print:shadow-none">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center shadow-md">
                <FaShip className="text-2xl text-blue-900" />
              </div>
              <div>
                <div className="text-xs opacity-90 uppercase tracking-widest font-semibold">Official Verification</div>
                <div className="text-lg font-bold">DEEWARAYA FLEET SYSTEM</div>
                <div className="text-xs opacity-75">Ministry of Fisheries - Sri Lanka</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/30 px-3 py-1.5 rounded">
              <FaLock className="text-xs" />
              <span className="text-xs font-semibold uppercase tracking-wider">Secure Verification</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 🎖️ VERIFICATION STATUS BANNER ===== */}
      <div className={`${vesselData.verified ? 'bg-green-700' : 'bg-red-700'} text-white`}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center gap-3">
          {vesselData.verified ? (
            <>
              <MdVerified className="text-2xl" />
              <span className="font-bold text-sm uppercase tracking-wider">✓ Vessel Verified & Active</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-2xl" />
              <span className="font-bold text-sm uppercase tracking-wider">✗ Vessel Not Verified</span>
            </>
          )}
        </div>
      </div>

      {/* ===== 📄 MAIN CONTENT ===== */}
      <main className="max-w-4xl mx-auto px-4 py-6">

        {/* ===== 🚢 VESSEL IDENTIFICATION CARD ===== */}
        <div className="bg-white border border-slate-200 rounded shadow-sm mb-4 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaAnchor className="text-sm" />
              <h2 className="font-bold text-sm uppercase tracking-wider">Vessel Identification</h2>
            </div>
            <div className="text-xs opacity-75">Report #{vesselData.id}</div>
          </div>

          <div className="p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vessel Icon */}
              <div className="flex flex-col items-center justify-center bg-slate-50 rounded p-6 border border-slate-200">
                <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center shadow-lg mb-3">
                  <FaShip className="text-3xl text-white" />
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Vessel Name</div>
                <div className="text-lg font-bold text-slate-900 text-center">{vesselData.name}</div>
              </div>

              {/* Primary IDs */}
              <div className="md:col-span-2 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <InfoBlock
                    label="Vessel ID"
                    value={vesselData.id}
                    highlight
                  />
                  <InfoBlock
                    label="Registration No."
                    value={vesselData.registrationNumber}
                    highlight
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InfoBlock
                    label="Call Sign"
                    value={vesselData.callSign}
                  />
                  <InfoBlock
                    label="MMSI Number"
                    value={vesselData.mmsi}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InfoBlock
                    label="IMO Number"
                    value={vesselData.imoNumber}
                  />
                  <InfoBlock
                    label="Flag State"
                    value={
                      <span className="flex items-center gap-1.5">
                        <FaFlag className="text-red-600 text-xs" />
                        {vesselData.flag}
                      </span>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ⚙️ ENGINE & TECHNICAL DETAILS ===== */}
        <div className="bg-white border border-slate-200 rounded shadow-sm mb-4 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center gap-2">
            <MdEngineering className="text-lg" />
            <h2 className="font-bold text-sm uppercase tracking-wider">Engine & Technical Specifications</h2>
          </div>

          <div className="p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoBlock
                label="Engine Number"
                value={vesselData.engineNumber}
                highlight
              />
              <InfoBlock
                label="Engine Serial Number"
                value={vesselData.engineSerialNumber}
                highlight
              />
              <InfoBlock
                label="Engine Model"
                value={vesselData.engineModel}
              />
              <InfoBlock
                label="Vessel Type"
                value={vesselData.vesselType}
              />
              <InfoBlock
                label="Category"
                value={vesselData.vesselCategory}
              />
              <InfoBlock
                label="Hull Material"
                value={vesselData.hullMaterial}
              />
              <InfoBlock
                label="Length Overall"
                value={vesselData.length}
              />
              <InfoBlock
                label="Cargo Capacity"
                value={vesselData.capacity}
              />
              <InfoBlock
                label="Crew Capacity"
                value={vesselData.crewCapacity}
              />
              <InfoBlock
                label="Home Port"
                value={vesselData.homePort}
              />
            </div>
          </div>
        </div>

        {/* ===== 📋 LICENSE & CERTIFICATION ===== */}
        <div className="bg-white border border-slate-200 rounded shadow-sm mb-4 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center gap-2">
            <FaShieldAlt className="text-sm" />
            <h2 className="font-bold text-sm uppercase tracking-wider">License & Certification Status</h2>
          </div>

          <div className="p-5 md:p-6 space-y-3">
            {/* Fishing License */}
            <StatusRow
              icon={<FaIdCard />}
              title="Fishing License"
              status={vesselData.licenseStatus}
              details={[
                { label: 'License No.', value: vesselData.licenseNumber },
                { label: 'Issued', value: vesselData.licenseIssueDate },
                { label: 'Expires', value: vesselData.licenseExpiry }
              ]}
              isValid={vesselData.licenseStatus === 'Active'}
            />

            {/* Insurance */}
            <StatusRow
              icon={<FaFileAlt />}
              title="Insurance"
              status={vesselData.insuranceStatus}
              details={[
                { label: 'Expires', value: vesselData.insuranceExpiry }
              ]}
              isValid={vesselData.insuranceStatus === 'Valid'}
            />

            {/* Safety Certificate */}
            <StatusRow
              icon={<FaShieldAlt />}
              title="Safety Certificate"
              status={vesselData.safetyCertificate}
              details={[
                { label: 'Expires', value: vesselData.safetyCertExpiry }
              ]}
              isValid={vesselData.safetyCertificate === 'Valid'}
            />
          </div>
        </div>

        {/* ===== 📞 EMERGENCY CONTACT ===== */}
        <div className="bg-white border border-slate-200 rounded shadow-sm mb-4 overflow-hidden">
          <div className="bg-red-700 text-white px-5 py-3 flex items-center gap-2">
            <FaExclamationTriangle className="text-sm" />
            <h2 className="font-bold text-sm uppercase tracking-wider">Emergency Contact Information</h2>
          </div>

          <div className="p-5 md:p-6">
            <div className="flex items-center justify-between bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded flex items-center justify-center">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Primary Contact</div>
                  <div className="text-lg font-bold text-slate-900">{vesselData.emergencyContact}</div>
                </div>
              </div>
              <a
                href={`tel:${vesselData.emergencyContact}`}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-colors print:hidden"
              >
                Call Now
              </a>
            </div>

            {/* Government Emergency Numbers */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">
                Sri Lankan Emergency Services
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <EmergencyContact number="118" label="Sri Lanka Navy" />
                <EmergencyContact number="119" label="Police" />
                <EmergencyContact number="110" label="Fire & Rescue" />
                <EmergencyContact number="1990" label="Suwa Seriya" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== 📅 REGISTRATION INFO ===== */}
        <div className="bg-white border border-slate-200 rounded shadow-sm mb-4 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center gap-2">
            <FaCalendarAlt className="text-sm" />
            <h2 className="font-bold text-sm uppercase tracking-wider">Registration History</h2>
          </div>

          <div className="p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoBlock
                label="Registration Date"
                value={vesselData.registeredDate}
              />
              <InfoBlock
                label="Registration Authority"
                value="Department of Fisheries, Sri Lanka"
              />
            </div>
          </div>
        </div>

        {/* ===== 🖨️ ACTION BUTTONS ===== */}
        <div className="bg-white border border-slate-200 rounded shadow-sm p-5 mb-4 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <FaPrint />
            Print Verification Report
          </button>
        </div>

        {/* ===== 📊 SCAN INFORMATION ===== */}
        <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-slate-500 mt-0.5" />
            <div className="text-xs text-slate-600">
              <div className="font-semibold text-slate-700 mb-1">Verification Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <span className="text-slate-500">Scanned On:</span>{' '}
                  <span className="font-semibold text-slate-700">{formatDate(scanTime)}</span>
                </div>
                <div>
                  <span className="text-slate-500">Verification ID:</span>{' '}
                  <span className="font-mono font-semibold text-slate-700">
                    VER-{Date.now().toString().slice(-8)}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-slate-500">
                This information is retrieved in real-time from the official Deewaraya Fleet Management System database.
              </p>
            </div>
          </div>
        </div>

        {/* ===== 🚩 REPORT ISSUE ===== */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded p-4 print:hidden">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-amber-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-slate-800 text-sm mb-1">Report Suspicious Activity</div>
              <p className="text-xs text-slate-600 mb-2">
                If any information appears incorrect or suspicious, please report to authorities immediately.
              </p>
              <a
                href="mailto:report@deewaraya.lk?subject=Vessel%20Report%20-%20{vesselData.id}"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline"
              >
                Report to Deewaraya →
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ===== 🏛️ OFFICIAL FOOTER ===== */}
      <footer className="bg-slate-800 text-white mt-8 print:mt-4">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-sm font-bold mb-1">DEEWARAYA FLEET MANAGEMENT SYSTEM</div>
              <div className="text-xs text-slate-400">
                Authorized by Ministry of Fisheries, Sri Lanka
              </div>
            </div>
            <div className="text-center md:text-right text-xs text-slate-400">
              <div>© 2025 Deewaraya. All Rights Reserved.</div>
              <div className="mt-1">Official Vessel Verification System</div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-4 pt-4 text-center">
            <div className="text-xs text-slate-500">
              For official inquiries: <span className="text-slate-300">official@deewaraya.lk</span> |
              Support: <span className="text-slate-300">+94 78 415 2744</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ==================== HELPER COMPONENTS ====================

const InfoBlock = ({ label, value, highlight }) => {
  return (
    <div className={`${highlight ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'} border rounded p-3`}>
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">
        {label}
      </div>
      <div className={`text-sm font-bold ${highlight ? 'text-blue-900' : 'text-slate-800'} break-all`}>
        {value}
      </div>
    </div>
  );
};

const StatusRow = ({ icon, title, status, details, isValid }) => {
  return (
    <div className={`border ${isValid ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'} rounded p-4`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded flex items-center justify-center ${isValid ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {icon}
          </div>
          <div>
            <div className="font-bold text-slate-900">{title}</div>
            <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mt-0.5 ${isValid ? 'text-green-700' : 'text-red-700'}`}>
              {isValid ? <FaCheckCircle /> : <FaTimesCircle />}
              {status}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pl-13 ml-13">
        {details.map((detail, i) => (
          <div key={i} className="text-xs">
            <span className="text-slate-500">{detail.label}:</span>{' '}
            <span className="font-semibold text-slate-800">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmergencyContact = ({ number, label }) => {
  return (
    <a
      href={`tel:${number}`}
      className="flex items-center gap-2 bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50 rounded p-2 transition-colors"
    >
      <div className="w-9 h-9 bg-red-600 text-white rounded flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="text-xs">
        <div className="font-bold text-slate-800">{label}</div>
        <div className="text-slate-500">Emergency</div>
      </div>
    </a>
  );
};

export default VesselDetailsPublic;