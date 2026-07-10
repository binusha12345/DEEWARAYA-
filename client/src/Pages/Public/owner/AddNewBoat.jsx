import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Anchor,
  Info,
  Sliders,
  Upload,
  ShieldCheck,
  X,
  ArrowRight,
} from "lucide-react";
import OwnerSidebar from "../../../components/OwnerSidebar";
import DashboardNav from "../../../components/DashboardNav";
import api from "../../../services/api";

const initialFormData = {
  boatName: "",
  registrationNumber: "",
  boatType: "",
  modelYear: "",
  engineSerial: "",
  fuelCapacity: "",
  horsepower: "",
  imageFile: null,
  boatStatus: "ACTIVE",
};

const AddNewBoat = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (
    !formData.boatName ||
    !formData.registrationNumber ||
    !formData.boatType ||
    !formData.modelYear
  ) {
    setError("Boat Name, Registration Number, Boat Type, Model/Year needed.");
    return;
  }

  try {
    setLoading(true);

    const data = new FormData();
    data.append("boatName", formData.boatName);
    data.append("registrationNumber", formData.registrationNumber);
    data.append("boatType", formData.boatType);
    data.append("modelYear", formData.modelYear);
    data.append("engineSerial", formData.engineSerial);
    data.append("fuelCapacity", formData.fuelCapacity);
    data.append("horsepower", formData.horsepower);
    data.append("boatStatus", formData.boatStatus);

    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    const res = await api.post("/boats", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setSuccess(res.data.message || "Boat registered successfully");

    setTimeout(() => {
      navigate("/boatownerboats");
    }, 800);
  } catch (err) {
    console.log("Boat Save Error Full:", err);
    console.log("Boat Save Error Response:", err.response);
    console.log("Boat Save Error Data:", err.response?.data);

    setError(
      err.response?.data?.message ||
      err.message ||
      "Boat registration failed"
    );
  } finally {
    setLoading(false);
  }
};
  
  const handleSaveDraft = () => {
    localStorage.setItem("boatDraft", JSON.stringify(formData));
    setSuccess("Draft saved locally.");
  };

  const handleCancel = () => {
    navigate("/boatownerboats");
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <DashboardNav />

        {/* Scrollable Form Area */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Anchor size={16} />
              <p className="text-[11px] font-bold uppercase tracking-widest">
                Fleet Expansion
              </p>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-3">
              Register New Boat
            </h1>
            <p className="text-slate-600 max-w-2xl text-[14px] leading-relaxed">
              Complete the technical specifications to induct a new vessel into
              the Authority's monitoring network.
            </p>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-100 text-red-700 px-4 py-3 text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg bg-green-100 text-green-700 px-4 py-3 text-sm font-medium">
              {success}
            </div>
          )}

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Left: Input Sections */}
            <div className="flex-1 space-y-4">
              {/* Boat Information Card */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-[#0f2a4a] text-white rounded-lg flex items-center justify-center">
                    <Info size={20} />
                  </div>
                  <h3 className="font-bold text-[18px] text-slate-900">
                    Boat Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <FormInput 
                    
                    label="BOAT NAME"
                    name="boatName"
                    value={formData.boatName}
                    onChange={handleChange}
                    placeholder="e.g. Sea Guardian II"
                    
                  />

                  <FormInput
                    label="REGISTRATION NUMBER"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="MAR-990-234X"
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                      BOAT TYPE
                    </label>
                    <select
                      name="boatType"
                      value={formData.boatType}
                      onChange={handleChange}
                      className="bg-[#f8fafc] border border-slate-200 rounded-lg p-2 text-[12px] text-slate-600 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="">Select Category</option>
                      <option value="Ruvala">Ruvala</option>
                      <option value="One-day Boat">One-day Boat</option>
                      <option value="Tanker Boat">Tanker Boat</option>
                    </select>
                  </div>

                  <FormInput
                    label="BOAT MANUFACTURE YEAR"
                    name="modelYear"
                    value={formData.modelYear}
                    onChange={handleChange}
                    placeholder="2024"
                    type="number"
                  />
                </div>
              </div>

              {/* Engine & Technical Card */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Sliders size={20} />
                  </div>
                  <h3 className="font-bold text-[18px] text-slate-900">
                    Engine & Technical Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput
                    label="ENGINE SERIAL"
                    name="engineSerial"
                    value={formData.engineSerial}
                    onChange={handleChange}
                    placeholder="S/N 8839120"
                  />

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                  BOAT STATUS
                </label>
                <select
                  name="boatStatus"
                  value={formData.boatStatus}
                  onChange={handleChange}
                  className="bg-[#f8fafc] border border-slate-200 rounded-lg p-2 text-[12px] text-slate-600 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="NON-ACTIVE">NON-ACTIVE</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>
              </div>

                  <div className="relative">
                    <FormInput
                      label="FUEL CAPACITY (L) OF THE BOAT"
                      name="fuelCapacity"
                      value={formData.fuelCapacity}
                      onChange={handleChange}
                      placeholder="500"
                      type="number"
                    />
                    <span className="absolute right-12 bottom-4 text-[12px] font-bold text-slate-600 uppercase">
                      Liters
                    </span>
                  </div>

                  <div className="relative ">
                    <FormInput 
                      label="HORSEPOWER (HP)"
                      name="horsepower"
                      value={formData.horsepower}
                      onChange={handleChange}
                      placeholder="350"
                      type="number"
                    />
                    <span className="absolute right-12 bottom-4 text-[12px] font-bold text-slate-600 uppercase">
                      HP
                    </span>



                  </div>
                </div>
              </div>
            </div>

            {/* Right: Upload & Status */}
            <div className="w-full xl:w-80 space-y-6">
              {/* Vessel Imagery Card */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-[12px] font-bold text-slate-600 uppercase tracking-widest mb-4 ml-20">
                  Vessel Imagery
                </h3>

                <div className="border-2 border-dashed text-[14px] border-slate-400 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100/50 transition-colors group">
                  

                  <div className="w-full">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full px-2 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition cursor-pointer"
                  >
                    Choose Boat Image
                  </button>

                  <p className="text-[12px] text-slate-800 mt-2">
                    Select an image from your computer
                  </p>
                </div>
                </div>

                {/* Preview */}
                <div className="mt-6 rounded-xl overflow-hidden h-32 relative">
                  <img
                    src={
                      imagePreview ||
                      "https://images.unsplash.com/photo-15444053912wCEAAkGBxQTEhUTExIWFhUXGBobGBgYGRoaGBoXGBUXGBcYGBgaISggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLy0tLS0tLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLS0tLS0tLf-f925b34bc25e?w=400"
                    }
                    alt="Boat Preview"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center border border-white/20 bg-black/10">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      Preview Frame
                    </span>
                  </div>
                </div>
              </div>

              {/* Compliance Box */}
              <div className="bg-[#0f2a4a] rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>

                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <ShieldCheck size={18} className="text-blue-400" />
                  <h3 className="text-[12px] font-bold uppercase tracking-widest">
                    Regulatory Compliance
                  </h3>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed relative z-10 mb-6">
                  Registration details will be verified against the IMO Global
                  Integrated Shipping Information System. Ensure all technical
                  fields match manufacturer documentation.
                </p>

                <div className="flex justify-between items-center relative z-10 pt-4 border-t border-white/10">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                    Auth Code
                  </span>
                  <span className="text-[12px] font-mono text-blue-200">
                    NAV-AUTH-2024-X
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <footer className="mt-10 px-0 py-6 bg-white border-t border-slate-100 flex items-center justify-between rounded-xl">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 text-red-500 text-[14px] font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition cursor-pointer ml-10"
            >
              <X size={14} /> Cancel
            </button>

            <div className="flex gap-4">
              {/*<button
                type="button"
                onClick={handleSaveDraft}
                className="px-8 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-[16px] font-bold hover:bg-slate-200 transition cursor-pointer"
              >
                Save Draft
              </button>*/}

              <button
                type="submit"
                disabled={loading}
                className="px-10 py-2.5 mr-10 bg-[#1b416f] text-white rounded-lg text-[14px] font-bold hover:bg-slate-800 transition shadow-lg flex items-center gap-3 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Register Boat"}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
  inputClassName = "",
}) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`bg-[#f8fafc] border border-slate-200 rounded-lg p-2 text-[12px] focus:ring-1 focus:ring-blue-500 outline-none transition-all ${inputClassName}`}
    />
  </div>
);
export default AddNewBoat;