import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DashboardHome from '../components/Dashboard/Home/DashboardHome';
import ViewRequest from '../components/Dashboard/Request/ViewRequest';
import CreateUserAccount from '../components/Dashboard/CreateAccount/CreateUserAccount';

const AppRouter = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboardHome" element={<DashboardHome/>} />
        <Route path="/showRequest" element={<ViewRequest/>} />
        <Route path="/createaccount" element={<CreateUserAccount/>} />


        {/* Define other routes here */}
        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
