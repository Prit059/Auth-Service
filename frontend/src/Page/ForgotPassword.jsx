import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await forgotPassword(email);
      setSuccess('If an account exists with this email, a reset link has been sent.');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '12px' }}>
        <h1 style={{ color: '#fff', marginBottom: '8px' }}>Forgot Password?</h1>
        <p style={{ color: '#888', marginBottom: '32px' }}>
          Enter your email and we'll send you a reset link
        </p>

        {error && (
          <div style={{ background: '#ff3333', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: '#00cc66', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#444' : '#fff',
              color: loading ? '#888' : '#000',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#888' }}>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}