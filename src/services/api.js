import axios from 'axios';

// Base API configuration
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// Attach the token to each request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
  }
  return config;
});

// Login to obtain JWT token
export const login = (username, password) =>
  API.post('token/', { username, password });

// Fetch loan applications for Loan Providers
export const getLoanApplications = () => API.get('loan-providers/');

// Fetch loans for Loan Customers
export const getCustomerLoans = () => API.get('loan-customers/');

// Make a payment for a specific loan
export const makePayment = (loanId, amount) =>
  API.post(`loan-customers/${loanId}/make-payment/`, { amount });

// Fetch loan applications for Bank Personnel
export const getPersonnelApplications = () => API.get('bank-personnel/');
