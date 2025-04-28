import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import GiftAirtime from "./pages/GiftAirtime";
import GiftToken from "./pages/GiftToken";
import WalletContextProvider from "./components/walletConnect";
import NewPage from "./pages/NewPage";

function App() {
  return (
    <WalletContextProvider>
      <Router>
          <Routes>
            <Route path="/old" element={<Dashboard />} />
            <Route path="/" element={<NewPage />} />
            <Route
              path="/gift-airtime"
              element={
                <ProtectedRoute>
                  <GiftAirtime />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gift-token"
              element={
                <ProtectedRoute>
                  <GiftToken />
                </ProtectedRoute>
              }
            />
          </Routes>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
