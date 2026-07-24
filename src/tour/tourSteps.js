// Each step:
//  path          -> route the tour will auto-navigate to
//  selector      -> CSS selector (data-tour attribute) of the element to spotlight
//  placement     -> where the tooltip box appears relative to the element
//  title/content -> the guidance text shown
//  requiresAuth  -> if true, the tour PAUSES on this step until the user
//                   actually logs in (AuthContext.user becomes truthy)
export const TOUR_STEPS = [
  {
    id: "welcome",
    path: "/",
    selector: '[data-tour="register-btn"]',
    placement: "bottom",
    title: "Welcome to Deewaraya 👋",
    content:
      "Let's take a quick tour. First, every new user needs an account — click 'Get Started' to register.",
  },
  {
    id: "register-form",
    path: "/register",
    selector: '[data-tour="register-form"]',
    placement: "left",
    title: "Create Your Account",
    content:
      "Fill in your name, email, password, and choose your role (Boat Owner or Boat Driver), then submit to register.",
  },
  {
    id: "login-form",
    path: "/login",
    selector: '[data-tour="login-form"]',
    placement: "left",
    title: "Log In",
    content:
      "Once registered, enter your email and password here to log in to your account.",
  },
  {
    id: "forgot-password",
    path: "/forgot-password",
    selector: '[data-tour="forgot-password"]',
    placement: "top",
    title: "Forgot Your Password?",
    content:
      "No problem — click here and we'll email you a secure link to reset it.",
  },
  {
    id: "profile-icon",
    path: "/",
    selector: '[data-tour="profile-icon"]',
    placement: "bottom",
    title: "Your Profile",
    requiresAuth: true,
    content:
      "Now that you're logged in, click your profile picture anytime to view or edit your account details.",
  },
  {
    id: "profile-page",
    path: "/profile",
    selector: '[data-tour="profile-page"]',
    placement: "bottom",
    requiresAuth: true,
    title: "Profile Page",
    content:
      "Here you can update your name, contact details, and password.",
  },
  {
    id: "dashboard",
    path: "/boatownerdashboard",
    selector: '[data-tour="dashboard-overview"]',
    placement: "bottom",
    requiresAuth: true,
    title: "Your Dashboard",
    content:
      "This is your command center — see your fleet at a glance: total boats, income, expenses, net profit, and maintenance alerts, all in one place.",
  },
  {
    id: "boats-list",
    path: "/boatownerboats",
    selector: '[data-tour="boats-list"]',
    placement: "bottom",
    requiresAuth: true,
    title: "Your Boats",
    content:
      "Every boat you own is listed here, with its registration, status, and quick actions.",
  },
  {
    id: "add-boat",
    path: "/addnewboat",
    selector: '[data-tour="add-boat-btn"]',
    placement: "left",
    requiresAuth: true,
    title: "Add a New Boat",
    content:
      "Click here to register a new boat — enter its name, registration number, type, and location so it starts showing up across the app.",
  },
  {
    id: "weather",
    path: "/weather",
    selector: '[data-tour="weather-page"]',
    placement: "top",
    requiresAuth: true,
    title: "Weather Dashboard",
    content:
      "Select a boat to see live weather and location shared by its driver — wind, rain, temperature, and a safety map, refreshing automatically.",
  },
  {
    id: "maintenance",
    path: "/maintenance",
    selector: '[data-tour="maintenance-page"]',
    placement: "top",
    requiresAuth: true,
    title: "Maintenance Tracking",
    content:
      "Log engine services, spare part changes, and repairs here, and get reminders before things become overdue.",
  },
  {
    id: "finance",
    path: "/owner/finance",
    selector: '[data-tour="finance-page"]',
    placement: "top",
    requiresAuth: true,
    title: "Finance Dashboard",
    content:
      "Log your daily fish income and expenses, see your monthly profit analysis, and get an emailed report — all right here. That's the full tour!",
  },
];