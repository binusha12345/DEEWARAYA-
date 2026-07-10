import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Clock3,
  Wrench,
  Settings,
  AlertCircle,
} from "lucide-react";

import OwnerSidebar from "../../../components/OwnerSidebar";
import DashboardNav from "../../../components/DashboardNav";
import ssjImg from "../../../assets/ssj.webp";
import diyakawaImg from "../../../assets/diyakawa.webp";
import dolphinImg from "../../../assets/dolphine.webp";

const MaintenanceEngine = () => {
  const navigate = useNavigate();

  const engineProviders = [
    {
      id: 1,
      name: "SSJ marine service (Pvt) Ltd",
      rating: 4.9,
      address: "320/2/1 kahawa road meetiyagoda, Ambalangoda 80300",
      phone: "077 276 1047",
      open: "Open 24 hours",
      mapUrl: "https://www.google.com/maps?vet=10CAAQoqAOahcKEwiQgY_U2ZKVAxUAAAAAHQAAAAAQXw..i&sca_esv=c1fae25c624776a2&udm=1&pvq=Cg0vZy8xMXl0dzV2Z2Y4&lqi=Ch1maXNoaW5nIGJvYXQgcmVwYWlyIFNyaSBMYW5rYUio8_Sy572AgAhaKRAAEAEQAhgAGAIiHWZpc2hpbmcgYm9hdCByZXBhaXIgc3JpIGxhbmthkgEfc2hpcGJ1aWxkaW5nX2FuZF9yZXBhaXJfY29tcGFueZoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMXdibUZJVlhsWmJUVTFXakJuTVZwR2JIcGxWM04wVFVVNE1XVnRZeEFC-gEECAAQMQ&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=lk&sa=X&ftid=0x3ae1831834f92e41:0xe16faa46c7d458d7",
      image: ssjImg
      
    },
    {
      id: 2,
      name: "Diyakawa Marine Boat Manufacturers",
      rating: 4.7,
      address: "No 5, Moratuwa",
      phone: "071 415 5674",
      open: "Open 24 hours",
      mapUrl: "https://www.google.com/maps/place/Diyakawa+Marine+Boat+Manufacturers/@6.749828,79.893412,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae245c0ed9cbd73:0xc5fcb831c5ed88b7!8m2!3d6.749828!4d79.893412!16s%2Fg%2F1ptx9c4jd?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      image: diyakawaImg
    },
    {
      id: 3,
      name: "Dolphin Marine Lanka (Pvt) Ltd",
      rating: 4.8,
      address: "Industrial Estate, Wataraka, 182/8.",
      phone: "0112 830 831",
      open: "Open 24 hours",
      mapUrl: "https://www.google.com/maps?vet=10CAAQoqAOahcKEwj4__WA3JKVAxUAAAAAHQAAAAAQDw..i&pvq=Cg0vZy8xMWI2Y3EzZDU4IjAKKmZpc2hpbmcgYm9hdHMgYm9keSBwYXJ0cyBtYWludGVuYW5jZSBzaG9wcxACGAM&lqi=CjdmaXNoaW5nIGJvYXRzIGJvZHkgcGFydHMgbWFpbnRlbmFuY2Ugc2hvcHMgaW4gc3JpIGxhbmthSKjhhruZqoCACFpLEAAQARACEAMQBBAFGAAYARgIIjdmaXNoaW5nIGJvYXRzIGJvZHkgcGFydHMgbWFpbnRlbmFuY2Ugc2hvcHMgaW4gc3JpIGxhbmthkgEMYm9hdF9idWlsZGVy&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=lk&sa=X&ftid=0x3ae2531906742463:0xb162ca3456efb15f",
      image: dolphinImg
    },
  ];

const openGoogleMaps = (provider) => {
  window.open(provider.mapUrl, "_blank", "noopener,noreferrer");
};

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <DashboardNav />

        {/* Content */}
        <main className="flex-1 px-6 lg:px-10 py-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs tracking-[0.28em] uppercase mb-3">
                <Wrench size={14} />
                <span>Maintenance Console</span>
              </div>

              <h1 className="text-3xl font-black text-slate-900 leading-tight">
                Maintenance & Repair
              </h1>

              <div className="mt-3 w-20 h-1 bg-blue-950 rounded-full"></div>
            </div>

            {/* Section Title */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Settings className="text-blue-950" size={24} />
                <h2 className="text-3xl font-bold text-blue-950">Engine</h2>
              </div>


            </div>

            {/* Provider Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {engineProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-50 overflow-hidden">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    <div className="absolute top-4 right-4 bg-blue-800 text-white text-[11px] font-bold px-3 py-1 rounded-md">
                      VERIFIED EXPERT
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[18px] font-semibold text-slate-900 leading-tight">
                        {provider.name}
                      </h3>

                      <div className="flex items-center gap-1 text-orange-500 font-bold shrink-0">
                        <Star size={18} fill="currentColor" />
                        <span>{provider.rating}</span>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4 text-slate-700">
                      <div className="flex gap-3">
                        <MapPin className="text-red-500" size={25} />
                        <p className="text-[14px]">{provider.address}</p>
                      </div>

                      <div className="flex gap-3">
                        <Phone className="text-blue-500" size={25} />
                        <p className="font-bold text-[14px]">{provider.phone}</p>
                      </div>

                      <div className="flex gap-3">
                        <Clock3 className="text-green-500" size={25} />
                        <p className="text-green-600 font-bold text-[14px]">{provider.open}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6\ border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => openGoogleMaps(provider)}
                        className="flex-1 bg-blue-800 text-white font-semibold py-2 rounded-xl hover:bg-blue-900 transition cursor-pointer"
                      >
                        View Location
                      

                      
                
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            

            
          </div>
        </main>
      </div>
    </div>
  );
};

export default MaintenanceEngine;