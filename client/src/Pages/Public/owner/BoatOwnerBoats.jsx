import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, QrCode, Eye, Loader2 } from "lucide-react";
import OwnerSidebar from "../../../components/OwnerSidebar";
import DashboardNav from "../../../components/DashboardNav";
import api from "../../../services/api";

const BoatOwnerBoats = () => {
  const navigate = useNavigate();

  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const getBoatImageUrl = (boat) => {
  if (!boat.imageUrl) return "https://via.placeholder.com/400x250";

  if (boat.imageUrl.startsWith("http")) return boat.imageUrl;

  return `http://localhost:5000${boat.imageUrl}`;
};

  const fetchBoats = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/boats");
      
      // If backend returns array directly:
      setBoats(res.data);

      // If backend returns object like { boats: [...] }
      // then use this instead:
      // setBoats(res.data.boats);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load boats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoats();
  }, []);

  const handleAddBoat = () => {
    navigate("/addnewboat");
  };

  const handleViewDetails = (boatId) => {
    navigate(`/boatdetails/${boatId}`);
  };

  const handleQr = (boatId) => {
    navigate(`/boatqr/${boatId}`);
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <DashboardNav />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-10">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Fleet / <span className="text-blue-600">Vessel List</span>
              </p>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">
                Boats Management
              </h1>
            </div>

            <button
              onClick={handleAddBoat}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#2056d3] text-white rounded-lg text-sm font-bold hover:bg-blue-900 transition cursor-pointer"
            >
              <Plus size={18} />
              Add New Boat
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-3 text-slate-600">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading boats...</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="p-4 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* No Boats */}
          {!loading && !error && boats.length === 0 && (
            <div className="p-6 rounded-xl bg-white border border-slate-200 text-slate-500 text-sm">
              No boats found. Click <span className="font-bold">Add New Boat</span> to register your first boat.
            </div>
          )}

          {/* Boats Grid */}
          {!loading && !error && boats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boats.map((boat) => (
                <div
                  key={boat._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100"
                >
                  <div className="relative h-48">
                        <img
                          src={getBoatImageUrl(boat)}
                          alt={boat.boatName}
                          className="w-full h-full object-cover"
                        />
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-md text-[9px] font-black tracking-widest ${
                          boat.boatStatus === "ACTIVE"
                            ? "bg-blue-100 text-blue-700"
                            : boat.boatStatus === "MAINTENANCE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {boat.boatStatus}

                      </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-[24px] font-bold text-slate-900 mb-1">
                        Boat: {boat.boatName}
                      </h3>

                      <p className="text-[16px] text-slate-600 font-medium">
                        {boat.boatType} • IMO {boat.registrationNumber}
                      </p>

                      <p className="text-[14px] text-slate-600 mt-2">
                        Model/Year: {boat.modelYear}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(boat._id)}
                        className="flex-1 bg-[#2b4fa9] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#004a75] transition flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>

                      <button
                        onClick={() => handleQr(boat._id)}
                        className="p-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition"
                      >
                        <QrCode size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BoatOwnerBoats;