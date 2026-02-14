import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { verifyEmail } from '../services/api';

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully!');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Invalid or expired verification link');
      }
    };

    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
        
        {status === 'verifying' && (
          <>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #333',
              borderTop: '3px solid #fff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }} />
            <h2 style={{ color: '#fff' }}>Verifying your email...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ color: '#fff', marginBottom: '12px' }}>Email Verified!</h2>
            <p style={{ color: '#888', marginBottom: '24px' }}>{message}</p>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#fff',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              Continue to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
            <h2 style={{ color: '#fff', marginBottom: '12px' }}>Verification Failed</h2>
            <p style={{ color: '#888', marginBottom: '24px' }}>{message}</p>
            <Link
              to="/login"
              style={{
                color: '#fff',
                textDecoration: 'none'
              }}
            >
              ← Back to Login
            </Link>
          </>
        )}

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}