import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DashboardHome from "../components/Dashboard/Home/DashboardHome";
import ViewRequest from "../components/Dashboard/Request/ViewRequest";
import CreateUserAccount from "../components/Dashboard/CreateAccount/CreateUserAccount";
import ProtectedRoute from "../utils/ProtectedRoute";
import AddRequest from "../components/Dashboard/Request/AddRequest";
import ManageUsers from "../components/Dashboard/ViewUsers/ViewUsers";
import NotficationReports from "../components/Dashboard/Reports/NotficationsReport";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboardHome"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showRequest"
          element={
            <ProtectedRoute>
              <ViewRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addRequest"
          element={
            <ProtectedRoute>
              <AddRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createaccount"
          element={
            <ProtectedRoute>
              <CreateUserAccount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewusers"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
         <Route
          path="/notficationreport"
          element={
            <ProtectedRoute>
              <NotficationReports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
