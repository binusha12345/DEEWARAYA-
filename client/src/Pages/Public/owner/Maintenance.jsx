import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  ArrowRight,
  Home,
  ShieldCheck,
  Boxes,
  Settings,
  LogOut,
} from "lucide-react";
import OwnerSidebar from "../../../components/OwnerSidebar";
import DashboardNav from "../../../components/DashboardNav";
import engine5 from "../../../assets/engine5.png";
import bodyparts5 from "../../../assets/bodyparts5.png";
import spareparts5 from "../../../assets/spareparts5.png";

const Maintenance = () => {
  const navigate = useNavigate();

  const maintenanceCards = [
    {
      title: "Engine",
      subtitle: "Monitor propulsion performance, fuel efficiency",
      //badge: "DIAGNOSTICS ACTIVE",
      image: engine5,     
      buttonText: "Inspect Module",
      route: "/maintenance/engine",
    },
    {
      title: "Body Parts",
      subtitle: "Manage hull maintenance, deck fittings",
      //badge: "STRUCTURAL INTEGRITY",
      image: bodyparts5,
      buttonText: "View Components",
      route: "/maintenance/body-parts",
    },
    {
      title: "Spare Parts",
      subtitle: "Real-time inventory tracking for gaskets, filters, pumps",
      //badge: "INVENTORY CONTROL",
      image: spareparts5, 
      buttonText: "Access Warehouse",
      route: "/maintenance/spare-parts",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <DashboardNav />

        {/* Page Body */}
        <main className="flex-1 min-h-0 overflow-y-auto px-2 lg:px-2 py-8">
          {/* Header */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs tracking-[0.3em] uppercase mb-2">
              <Wrench size={14} />
              <span>Precision Maintenance</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              Maintenance & Repair
            </h1>

          </div>

          {/* Top Cards */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {maintenanceCards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl min-h-[420px] shadow-md group"
              >
                <img 
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0  object-fit transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/35 to-transparent"></div>

                <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8 text-white">
                  

                  <h2 className="text-3xl font-bold ">{card.title}</h2>

                  <p className="text-[16px] text-slate-100/90 max-w-md leading-relaxed mb-6">
                    {card.subtitle}
                  </p>

                  <button
                    onClick={() => navigate(card.route)}
                    className=" inline-flex items-center gap-2 w-fit 
                    px-6 py-2 rounded-xl 
                    bg-blue-700 text-white font-semibold 
                    shadow-lg shadow-blue-900/30
                    hover:bg-blue-800 hover:scale-105 
                    transition-all duration-300 cursor-pointer"
                  >
                    {card.buttonText}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Spare Parts Wide Card */}
          <div className="max-w-4xl mx-auto mt-6">
            <div className="relative overflow-hidden rounded-2xl min-h-[280px] bg-white shadow-md flex flex-col lg:flex-row">
              {/* Text side */}
              <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-[#f7f9fc]">
                

                <h2 className="text-4xl font-bold text-slate-900 leading-tight max-w-md">
                  Spare Parts
                </h2>

                <p className="mt-4 text-slate-600 text-lg max-w-md leading-relaxed">
                  Real-time inventory tracking for gaskets, filters, pumps, and mission-critical hardware.
                </p>

                <button
                  onClick={() => navigate("/maintenance/spare-parts")}
                  className="mt-8 inline-flex items-center gap-2 w-fit 
                  px-6 py-2 rounded-xl 
                  bg-blue-700 text-white font-semibold 
                  shadow-lg shadow-blue-900/30
                  hover:bg-blue-800 hover:scale-105 
                  transition-all duration-300  cursor-pointer"
                >
                  Access Warehouse
                  <Home size={16} />
                </button>
              </div>

              {/* Image side */}
              <div className="lg:w-1/2 relative min-h-[240px]">
                <img
                  src={spareparts5}
                  alt="Spare Parts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Promo Banner */}

         

          
        
        </main>
      </div>
    </div>
  );
};

export default Maintenance;