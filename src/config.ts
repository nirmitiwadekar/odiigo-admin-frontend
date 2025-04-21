// Configuration file for the admin dashboard

// API URL - change this to your backend URL
export const API_URL = 'http://localhost:4000';

// Token storage key
export const TOKEN_KEY = 'adminToken';

// Admin info storage key
export const ADMIN_INFO_KEY = 'adminInfo';

// Other configuration options
export const CONFIG = {
  appName: 'Odiigo Admin Dashboard',
  tokenExpiryTime: 3600, // in seconds
  theme: {
    primary: '#4FDBC4',
    secondary: '#2A6887',
    error: '#FF5252',
    warning: '#FFC107',
    success: '#4CAF50',
    background: '#f5f5f5',
  }
};