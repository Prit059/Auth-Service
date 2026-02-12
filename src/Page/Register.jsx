import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import OAuthButtons from '../components/OAuthButtons';

export default function Register() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await register(form);
      setSuccess('Registration successful! Check your email for verification.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none'
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '12px' }}>
        <h1 style={{ color: '#fff', marginBottom: '8px' }}>Create Account</h1>
        <p style={{ color: '#888', marginBottom: '32px' }}>Get started with your account</p>

        {error && <div style={{ background: '#ff3333', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>{error}</div>}
        {success && <div style={{ background: '#00cc66', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px', display: 'block' }}>First Name</label>
              <input
                value={form.firstname}
                onChange={(e) => setForm({...form, firstname: e.target.value})}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Last Name</label>
              <input
                value={form.lastname}
                onChange={(e) => setForm({...form, lastname: e.target.value})}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
              minLength={6}
              style={inputStyle}
            />
            <p style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>At least 6 characters</p>
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
          <span style={{ color: '#666' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
        </div>

        <OAuthButtons />

        <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}