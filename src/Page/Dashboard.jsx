import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { getProfile } from '../services/api';

export default function Dashboard() {
  const { user, clearUser } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    clearUser();
    window.location.href = '/login';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ color: '#fff' }}>Auth Service Demo</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* User Profile Card */}
      <div style={{
        background: '#1a1a1a',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #333',
        marginBottom: '40px'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Your Profile</h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#888', width: '120px' }}>Name:</span>
            <span style={{ color: '#fff' }}>
              {profile?.data?.firstname} {profile?.data?.lastname}
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#888', width: '120px' }}>Email:</span>
            <span style={{ color: '#fff' }}>{profile?.data?.email}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#888', width: '120px' }}>Verified:</span>
            <span style={{ color: profile?.data?.emailverified ? '#00cc66' : '#ff3333' }}>
              {profile?.data?.emailverified ? '✅ Verified' : '❌ Not verified'}
            </span>
          </div>
        </div>
      </div>

      {/* SETUP INSTRUCTIONS - THIS IS WHAT YOU WANT! */}
      <div style={{
        background: '#0a0a0a',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #333'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>⚡ 5-Minute Setup Guide</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#fff', marginBottom: '12px' }}>1. Clone the Repository</h3>
          <pre style={{
            background: '#000',
            color: '#00ff00',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            git clone https://github.com/yourusername/auth-service.git
            cd auth-service/backend
          </pre>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#fff', marginBottom: '12px' }}>2. Environment Setup</h3>
          <pre style={{
            background: '#000',
            color: '#00ff00',
            padding: '16px',
            borderRadius: '8px'
          }}>
            cp .env.example .env
            # Add your MongoDB URI, Google/GitHub OAuth keys
          </pre>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#fff', marginBottom: '12px' }}>3. Install & Run</h3>
          <pre style={{
            background: '#000',
            color: '#00ff00',
            padding: '16px',
            borderRadius: '8px'
          }}>
            npm install
            npm start
            # Server running on http://localhost:8000
          </pre>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#fff', marginBottom: '12px' }}>4. API Ready!</h3>
          <pre style={{
            background: '#000',
            color: '#00ff00',
            padding: '16px',
            borderRadius: '8px'
          }}>
            POST   /auth/register
            POST   /auth/login  
            GET    /auth/verify-email/:token
            POST   /auth/forgot-password
            POST   /auth/reset-password/:token
            GET    /auth/google
            GET    /auth/github
            GET    /auth/profile
          </pre>
        </div>

        <div style={{
          background: '#1a3300',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #336600'
        }}>
          <h3 style={{ color: '#fff', marginBottom: '8px' }}>🎯 Done! Your Auth is Ready</h3>
          <p style={{ color: '#ccc', marginBottom: '0' }}>
            No monthly fees. No vendor lock-in. Your database, your control.
          </p>
        </div>
      </div>
    </div>
  );
}