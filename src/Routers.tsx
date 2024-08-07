import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProviderDetailView from "./components/ProviderDetailView";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider-details/:providerName" element={<ProviderDetailView />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
