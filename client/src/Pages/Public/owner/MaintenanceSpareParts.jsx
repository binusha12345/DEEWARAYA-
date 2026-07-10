import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Info,
  Clock3,
  MapPin,
  Phone,
  Settings,
  Wrench,
  AlertCircle,
  History,
  Box,
} from "lucide-react";

import OwnerSidebar from "../../../components/OwnerSidebar";
import DashboardNav from "../../../components/DashboardNav";

// Local assets

import francisImg from "../../../assets/francis.webp";
import kandjImg from "../../../assets/k and j.webp";
import WINWAYImg from "../../../assets/WINWAY.webp";

const MaintenanceSpareParts = () => {
  const navigate = useNavigate();

  const spareProviders = [
    {
      id: 1,
      name: "Francis Enterprises (Pvt) Ltd",
      address: "362 Old Galle Rd, Panadur",
      phone: "0779985961",
      action: "Call Now",
      mapUrl: "https://www.google.com/maps/place/Francis+Enterprises+(Pvt)+Ltd/@6.9397118,79.8529603,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae25949e3e77a5b:0x8f8bc48a2422224!8m2!3d6.9397118!4d79.8529603!16s%2Fg%2F11h06whw3f?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      image: francisImg,
    },
    {
      id: 2,
      name: "K and J Marine Traders",
      address: "no 13 4th cross St, Ambalangoda 80300",
      phone: "0912259627",
      action: "Call Now",
      mapUrl: "https://www.google.com/maps?vet=10CAAQoqAOahcKEwiI7fXs3JKVAxUAAAAAHQAAAAAQCA..i&sca_esv=c1fae25c624776a2&udm=1&pvq=CgwvZy8xaG00NzZqdGs&lqi=ChtmaXNoaW5nIGJvYXQgcmVwYWlyIG5lYXIgbWVIsYbNw8yPgIAIWikQABABEAIYARgDGAQiG2Zpc2hpbmcgYm9hdCByZXBhaXIgbmVhciBtZZIBDWZpc2hpbmdfc3RvcmU&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=lk&sa=X&ftid=0x3ae1818278bcb447:0xcbeac90801df40d8",
      image: kandjImg,
    },
    {
      id: 3,
      name: "WINWAY MARINE POWER (PVT) LTD.",
      address: "117/D , ASELA GARDENS, GANEARAMBA, Beruwala 12070",
      phone: "0715330330",
      action: "Call Now",
      mapUrl: "https://www.google.com/maps/place/WINWAY+MARINE+POWER+(PVT)+LTD./@6.4721947,79.9807552,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae22fa5d9f5fbb5:0xb383897c4bf3e986!8m2!3d6.4721947!4d79.9807552!16s%2Fg%2F11h08j1_xc?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
      image: WINWAYImg,
    },
  ];

const openGoogleMaps = (provider) => {
  window.open(provider.mapUrl, "_blank", "noopener,noreferrer");
};

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-slate-800 ">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Top Navbar */}
        <DashboardNav />

        <main className="flex-1 px-6 lg:px-10 py-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs tracking-[0.28em] uppercase mb-3">
                <Wrench size={14} />
                <span>Maintenance Console</span>
              </div>

              <h1 className="text-3xl font-black text-slate-900leading-tight">
                Maintenance & Repair
              </h1>

              <p className="mt-3 text-slate-700 text-lg text-[16px]">
                Manage your fleet's technical health and spare parts sourcing.
              </p>
            </div>

            {/* Section Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-10 bg-blue-700 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">Spare Parts</h2>
            </div>

            {/* Provider Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {spareProviders.map((provider) => (
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

                    <div className="absolute top-4 right-4 bg-teal-700 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      Open 24 hours
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h3 className="text-[18px] font-semibold text-slate-900 leading-tight mb-5">
                      {provider.name}
                    </h3>

                    <div className="space-y-4 text-slate-700">
                      <div className="flex gap-3">
                        <MapPin className="text-blue-500" size={24} />
                        <p className="leading-relaxed text-[14px]">{provider.address}</p>
                      </div>

                      <div className="flex gap-3 font-bold">
                        <Phone className="text-blue-500 shrink-0 mt-0.5" size={24} />
                        <p className="text-[14px]">{provider.phone}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
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

export default MaintenanceSpareParts;