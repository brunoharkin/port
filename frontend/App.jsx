import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtmTrack) {
      window.gtmTrack('pageview', { page: location.pathname });
    }
  }, [location]);
  return null;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <PageViewTracker />
    </Router>
  );
} 