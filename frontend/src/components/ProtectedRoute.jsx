import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" />;
}