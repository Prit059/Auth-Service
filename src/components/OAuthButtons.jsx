export default function OAuthButtons() {
  const handleGoogle = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  const handleGithub = () => {
    window.location.href = 'http://localhost:8000/auth/github';
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: '#0a0a0a',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <button onClick={handleGoogle} style={buttonStyle}>
        <span style={{ fontSize: '18px' }}>G</span> Continue with Google
      </button>
      <button onClick={handleGithub} style={buttonStyle}>
        <span style={{ fontSize: '18px' }}>⌨️</span> Continue with GitHub
      </button>
    </div>
  );
}