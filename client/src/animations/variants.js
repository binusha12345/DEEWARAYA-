// ═══════════════════════════════════════════════════════════════
// 🎨 ANIMATION VARIANTS - Slower & Smoother
// ═══════════════════════════════════════════════════════════════

// ─── Fade Animations (SLOWER) ────────────────────────────────────
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.2, ease: "easeOut" },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: "easeOut" },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: "easeOut" },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.4, ease: "easeOut" },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.4, ease: "easeOut" },
};

// ─── Scale Animations (SLOWER) ───────────────────────────────────
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.2, ease: "easeOut" },
};

export const zoomOut = {
  initial: { scale: 1.2 },
  animate: { scale: 1 },
  transition: { duration: 3, ease: "easeOut" },
};

// ─── Stagger Container (SLOWER) ──────────────────────────────────
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,     // Slower delay between children
      delayChildren: 0.2,       // Longer initial wait
    },
  },
};

export const staggerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ─── Hover Effects (Keep hover snappy) ───────────────────────────
export const hoverScale = {
  whileHover: { scale: 1.05, y: -5 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300 },
};

export const hoverRotate = {
  whileHover: { rotate: 360 },
  transition: { duration: 0.8 },
};

export const hoverLift = {
  whileHover: { y: -8, scale: 1.02 },
  transition: { type: "spring", stiffness: 300 },
};

// ─── Continuous Animations (Floating) ────────────────────────────
export const floatUp = {
  animate: { y: [0, -15, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

export const floatDown = {
  animate: { y: [0, 15, 0] },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
    delay: 1.5,
  },
};

// ─── Viewport Config ─────────────────────────────────────────────
export const viewportConfig = {
  once: true,
  amount: 0.3,
};