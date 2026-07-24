import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTour } from "../context/TourContext";
import { useAuth } from "../context/AuthContext";
import { X, ArrowLeft, ArrowRight, LogIn } from "lucide-react";

const TourOverlay = () => {
  const { isActive, currentStep, stepIndex, totalSteps, nextStep, prevStep, endTour, goToStep } =
    useTour();
  const { user } = useAuth();
  const location = useLocation();
  const [targetRect, setTargetRect] = useState(null);
  const [waitingForAuth, setWaitingForAuth] = useState(false);

  // The moment the user actually logs in, auto-resume a paused step
  useEffect(() => {
    if (isActive && currentStep?.requiresAuth && user) {
      setWaitingForAuth(false);
      goToStep(stepIndex); // re-runs navigation now that `user` exists
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Find & measure the target element on the page; retries because the
  // page we just navigated to may still be rendering
  useEffect(() => {
    if (!isActive || !currentStep) return;

    if (currentStep.requiresAuth && !user) {
      setWaitingForAuth(true);
      setTargetRect(null);
      return;
    }
    setWaitingForAuth(false);

    let attempts = 0;
    const findTarget = () => {
      const el = document.querySelector(currentStep.selector);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else if (attempts < 20) {
        attempts += 1;
        setTimeout(findTarget, 150);
      } else {
        setTargetRect(null); // fall back to centered card if never found
      }
    };
    findTarget();

    // Keep the spotlight glued to the element on scroll/resize
    const updateRect = () => {
      const el = document.querySelector(currentStep.selector);
      if (el) setTargetRect(el.getBoundingClientRect());
    };
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [isActive, currentStep, location.pathname, user]);

  if (!isActive || !currentStep) return null;

  const pad = 8;
  const box = targetRect
    ? {
        top: targetRect.top - pad,
        left: targetRect.left - pad,
        width: targetRect.width + pad * 2,
        height: targetRect.height + pad * 2,
      }
    : null;

  // Tooltip position based on `placement`
  const getTooltipStyle = () => {
    const tooltipWidth = 320; // matches w-80
    const tooltipHeight = 220; // approx
    const margin = 16;

    let top, left;

    if (!box) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }

    switch (currentStep.placement) {
      case "right":
        left = box.left + box.width + margin;
        top = box.top;
        break;
      case "left":
        left = box.left - tooltipWidth - margin;
        top = box.top;
        break;
      case "top":
        left = box.left;
        top = box.top - tooltipHeight - margin;
        break;
      default: // bottom
        left = box.left;
        top = box.top + box.height + margin;
    }

    // Clamp so the tooltip always stays fully inside the viewport
    left = Math.min(Math.max(margin, left), window.innerWidth - tooltipWidth - margin);
    top = Math.min(Math.max(margin, top), window.innerHeight - tooltipHeight - margin);

    return { top, left };
};
  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Dark backdrop with a spotlight cutout via 4 surrounding panels */}
      {box ? (
        <>
          <div className="fixed bg-black/60 transition-all duration-300" style={{ top: 0, left: 0, right: 0, height: Math.max(0, box.top) }} />
          <div className="fixed bg-black/60 transition-all duration-300" style={{ top: box.top + box.height, left: 0, right: 0, bottom: 0 }} />
          <div className="fixed bg-black/60 transition-all duration-300" style={{ top: box.top, left: 0, width: Math.max(0, box.left), height: box.height }} />
          <div className="fixed bg-black/60 transition-all duration-300" style={{ top: box.top, left: box.left + box.width, right: 0, height: box.height }} />
          {/* Glowing ring around the spotlighted element */}
          <div
            className="fixed rounded-xl ring-4 ring-cyan-400 shadow-[0_0_0_4px_rgba(34,211,238,0.4)] pointer-events-none transition-all duration-300"
            style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
          />
        </>
      ) : (
        <div className="fixed inset-0 bg-black/60" />
      )}

      {/* Tooltip / guidance card */}
      <div
        className="fixed w-80 bg-white rounded-2xl shadow-2xl p-5 z-[10000] transition-all duration-300"
        style={getTooltipStyle()}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <button onClick={endTour} className="text-slate-400 hover:text-slate-700" title="Skip tour">
            <X size={18} />
          </button>
        </div>

        {waitingForAuth ? (
          <>
            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <LogIn size={18} className="text-blue-600" /> Please Log In
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Log in with your account to continue the tour into your dashboard.
              The tour will resume automatically the moment you're logged in.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{currentStep.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{currentStep.content}</p>
          </>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="flex items-center gap-1 text-sm font-semibold text-slate-500 disabled:opacity-30 hover:text-slate-800"
          >
            <ArrowLeft size={14} /> Back
          </button>

          <button
            onClick={endTour}
            className="text-sm font-semibold text-slate-400 hover:text-slate-700"
          >
            Skip Tour
          </button>

          {!waitingForAuth && (
            <button
              onClick={nextStep}
              className="flex items-center gap-1 text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {stepIndex === totalSteps - 1 ? "Finish" : "Next"} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourOverlay;