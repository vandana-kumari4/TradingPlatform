import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GeneralContextProvider } from './components/GeneralContext';

// Landing page imports
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import HomePage from './landing_page/home/HomePage';
import AboutPage from './landing_page/about/AboutPage';
import PricingPage from './landing_page/pricing/PricingPage';
import ProductsPage from './landing_page/products/ProductsPage';
import Signup from './landing_page/signup/Signup';
import SupportPage from './landing_page/support/SupportPage';
import NotFound from './landing_page/NotFound';

// Dashboard imports
import Dashboard from './components/Dashboard';
import Holdings from './components/Holdings';
import Orders from './components/Orders';
import Positions from './components/Positions';
import Funds from './components/Funds';
import Apps from './components/Apps';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/signup" />;
  };

  return (
    <Router>
      <GeneralContextProvider>
        {!isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/support" element={<SupportPage />} />
          
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/holdings" element={<ProtectedRoute element={<Holdings />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
          <Route path="/positions" element={<ProtectedRoute element={<Positions />} />} />
          <Route path="/funds" element={<ProtectedRoute element={<Funds />} />} />
          <Route path="/apps" element={<ProtectedRoute element={<Apps />} />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isLoggedIn && <Footer />}
      </GeneralContextProvider>
    </Router>
  );
}

export default App;