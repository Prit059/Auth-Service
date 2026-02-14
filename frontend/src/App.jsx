import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserProvider from './context/UserContext';
import Login from "./Page/Login";
import Register from "./Page/Register";
import ResetPassword from "./Page/ResetPassword";
import ForgotPassword from './Page/ForgotPassword';
import Dashboard from "./Page/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmail from "./Page/VerifyEmail";
import OAuthSuccess from "./Page/OAuthSuccess"
function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <div style={{ 
          background: '#0a0a0a', 
          minHeight: '100vh',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
