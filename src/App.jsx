import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// MUI Date Picker Providers
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import PricingAnalysis from "./pages/AllPricingAnalysis/PricingAnalysis";
import MarketShares from "./pages/AllMarketShares/MarketShares";
import AvailablityAnalysis from "./pages/AllAvailablityAnalysis/AvailablityAnalysis";
import VisibilityAnalysis from "./pages/AllVisibilityAnalysis/VisibilityAnalysis";
import RulesPage from "./pages/AutomationRules/RulesPage";
import OverviewPage from "./pages/Overview/OverviewPage";
import HistoryPage from "./pages/History/HistoryPage";

import { FilterProvider } from "./utils/FilterContext";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { HelpProvider } from "./utils/HelpContext";
import HelpDrawer from "./components/CommonLayout/HelpDrawer";

function AppContent() {
  const { isLoggedIn, user } = useAuth();
  const sessionKey = isLoggedIn ? (user?.email || "authenticated") : "guest";

  return (
    <HelpProvider>
      <FilterProvider key={sessionKey}>
        <HashRouter>
          <Routes>
            {/* Default route redirects to Overview since Watch Tower is missing */}
            <Route path="/" element={<Navigate to="/overview" replace />} />

            <Route path="/overview" element={
              <ProtectedRoute>
                <OverviewPage />
              </ProtectedRoute>
            } />

            <Route path="/availability-analysis" element={
              <ProtectedRoute>
                <AvailablityAnalysis />
              </ProtectedRoute>
            } />

            <Route path="/visibility-analysis" element={
              <ProtectedRoute>
                <VisibilityAnalysis />
              </ProtectedRoute>
            } />

            <Route path="/pricing-analysis" element={
              <ProtectedRoute>
                <PricingAnalysis />
              </ProtectedRoute>
            } />

            <Route path="/market-share" element={
              <ProtectedRoute>
                <MarketShares />
              </ProtectedRoute>
            } />

            <Route path="/automation-rules" element={
              <ProtectedRoute>
                <RulesPage />
              </ProtectedRoute>
            } />

            <Route path="/history" element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            } />

            {/* Catch-all route redirects back to Overview */}
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </HashRouter>
      </FilterProvider>
      {isLoggedIn && <HelpDrawer userDbName={user?.dbName} />}
    </HelpProvider>
  );
}

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LocalizationProvider>
  );
}
