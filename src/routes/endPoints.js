export const ENDPOINTS = Object.freeze({
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forget-password",
    SIGNIN: "/signin",
    SIGNIN_SUCCESS: "/signin-success",
    CHANGE_PASSWORD: "/change-password",
  },
  INDEX: "/",
  
  // Landing Page (Public)
  LANDING: {
    HOME: "/",
    COURSES: "/courses",
    NEWS: "/news",
    ABOUT: "/about",
    CONTACT: "/contact",
  },
  
  // Admin Panel
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PAYMENTS: "/admin/payments",
    USERS: "/admin/users",
    SETTINGS: "/admin/settings",
  },
  
  // Parent Panel
  PARENT: {
    DASHBOARD: "/parent/dashboard",
    CHILDREN: "/parent/children",
    REPORTS: "/parent/reports",
    SETTINGS: "/parent/settings",
  },
  
  // Student Panel
  STUDENT: {
    DASHBOARD: "/student/dashboard",
    COURSES: "/student/courses",
    ACHIEVEMENTS: "/student/achievements",
    CHATBOT: "/student/chatbot",
    SETTINGS: "/student/settings",
  },
  
  // Shared Features
  SHARED: {
    PROFILE: "/profile",
    SUBSCRIPTION: "/subscription",
    PAYMENT: "/payment",
    CHATBOT: "/chatbot",
  },

});
