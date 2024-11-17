import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import theme from './theme';
import Login from './components/Authentication/Login';
import LoanProviderDashboard from './components/LoanProvider/LoanProviderDashboard';
import LoanCustomerDashboard from './components/LoanCustomer/LoanCustomerDashboard';
import BankPersonnelDashboard from './components/BankPersonnel/BankPersonnelDashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  useEffect(() => {
    console.log('Token:', token);
    console.log('Role:', role); // Debug role value
    setRole(localStorage.getItem('role'));
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {token && (
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Loan Management System
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}
        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={!token ? <Login setToken={setToken} /> : <Navigate to={`/${role}`} />} />
            <Route
              path="/provider"
              element={
                token && role === 'provider' ? <LoanProviderDashboard /> : <Navigate to="/" />
              }
            />
            <Route
              path="/customer"
              element={
                token && role === 'customer' ? <LoanCustomerDashboard token={token} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/personnel"
              element={
                token && role === 'personnel' ? <BankPersonnelDashboard token={token} /> : <Navigate to="/" />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
