// pages/OAuthSuccess.jsx
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axiosInstance from '../utils/axiosInstance';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      navigate('/login');
      return;
    }

    // Save token
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // IMPORTANT: Your backend returns USER OBJECT DIRECTLY, not wrapped in .data
    axiosInstance.get('/auth/profile')
      .then(response => {
        console.log('User data received:', response.data); // Debug
        
        // ✅ FIX: response.data is the user object, not response.data.data
        const userData = response.data;
        
        // Call login from UserContext
        login(userData, token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('token');
        navigate('/login');
      });

  }, [navigate, login]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;