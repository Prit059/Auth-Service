import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { getProfile } from '../services/api';

export default function Dashboard() {
  const { user, clearUser } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        console.log('Profile data:', res.data);
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🔐</span>
              </div>
              <span className="text-white font-semibold text-lg">AuthService</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-red-600/20 border border-red-600 hover:bg-red-700/50 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gray-700/20 border border-gray-600 rounded-2xl p-8 mb-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Your authentication service is ready to use. Copy the setup instructions below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-700/20 rounded-2xl border border-gray-700 overflow-hidden shadow-xl sticky top-24">
              {/* Profile Header */}
              <div className="px-6 py-8 text-center">
                {profile?.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto border-4 border-white bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
                    {profile?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <h2 className="mt-4 text-xl font-bold text-white">{profile?.name}</h2>
                <p className="text-blue-100 text-sm">{profile?.email}</p>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300">Email Verified</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    profile?.emailverified 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {profile?.emailverified ? '✅ Verified' : '⏳ Pending'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300">Account Type</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                    {profile?.googleId ? 'Google' : profile?.githubId ? 'GitHub' : 'Email'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300">Member Since</span>
                  <span className="text-gray-300 text-sm">
                    {new Date(profile?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300">Last Login</span>
                  <span className="text-gray-300 text-sm">
                    {new Date(profile?.lastlogin).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Quick Copy Section */}
              <div className="border-t border-gray-700 p-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Copy</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => copyToClipboard('git clone https://github.com/yourusername/auth-service')}
                    className="w-full text-left px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors flex items-center justify-between group"
                  >
                    <span>Clone command</span>
                    <span className="text-xs text-gray-500 group-hover:text-gray-400">Copy</span>
                  </button>
                  {copied && (
                    <div className="text-xs text-green-400 animate-pulse">
                      ✅ Copied to clipboard!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Setup Instructions */}
          <div className="lg:col-span-2 space-y-6">
            {/* SECTION 1: QUICK START */}
            <div className="bg-gray-700/20 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
              <div className="border-b border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-xl">⚡</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">Quick Start (5 Minutes)</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Clone the Repository</h3>
                    <div className="relative group">
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-green-400 overflow-x-auto">
                        git clone https://github.com/Prit059/auth-service.git
                      </pre>
                      <button 
                        onClick={() => copyToClipboard('git clone https://github.com/yourusername/auth-service.git')}
                        className="absolute top-2 right-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Install Dependencies</h3>
                    <div className="relative group">
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-green-400">
                        cd frontend && npm install
                        <br />
                        cd backend && npm install
                      </pre>
                      <button 
                        onClick={() => copyToClipboard('cd backend && npm install')}
                        className="absolute top-2 right-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Environment Setup</h3>
                    <div className="relative group mb-2">
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-green-400">
                        cp .env.example .env
                      </pre>
                      <button 
                        onClick={() => copyToClipboard('cp .env.example .env')}
                        className="absolute top-2 right-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">Add your MongoDB URI and OAuth keys</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Start Frontend</h3>
                    <div className="relative group">
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-green-400">
                        npm run dev
                      </pre>
                      <button 
                        onClick={() => copyToClipboard('npm start')}
                        className="absolute top-2 right-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm font-bold">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Start Server</h3>
                    <div className="relative group">
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-green-400">
                        npm run dev
                      </pre>
                      <button 
                        onClick={() => copyToClipboard('npm start')}
                        className="absolute top-2 right-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-green-400 mt-2">✓ Server running on http://localhost:8000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: API DOCUMENTATION */}
            <div className="bg-gray-700/20 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
              <div className="border-b border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400 text-xl">📡</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">API Endpoints</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { method: 'POST', path: '/auth/register', desc: 'Register new user' },
                    { method: 'POST', path: '/auth/login', desc: 'Login user' },
                    { method: 'GET', path: '/auth/verify-email/:token', desc: 'Verify email' },
                    { method: 'POST', path: '/auth/forgot-password', desc: 'Request password reset' },
                    { method: 'POST', path: '/auth/reset-password/:token', desc: 'Reset password' },
                    { method: 'GET', path: '/auth/profile', desc: 'Get user profile' },
                    { method: 'GET', path: '/oauth/google', desc: 'Google OAuth login' },
                    { method: 'GET', path: '/oauth/github', desc: 'GitHub OAuth login' },
                  ].map((api, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                        api.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {api.method}
                      </span>
                      <code className="text-sm text-gray-300 font-mono flex-1">{api.path}</code>
                      <span className="text-xs text-gray-500">{api.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 3: ENVIRONMENT VARIABLES */}
            <div className="bg-gray-700/20 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
              <div className="border-b border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 text-xl">🔧</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">Environment Variables</h2>
                </div>
              </div>
              
              <div className="p-6">
                <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-green-400 overflow-x-auto">
                  {`PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173`}
                </pre>
                <button 
                  onClick={() => copyToClipboard(`PORT=8000\nMONGODB_URI=your_mongodb_uri\nJWT_SECRET=your_jwt_secret\nGOOGLE_CLIENT_ID=your_google_client_id\nGOOGLE_CLIENT_SECRET=your_google_secret\nGITHUB_CLIENT_ID=your_github_client_id\nGITHUB_CLIENT_SECRET=your_github_secret\nEMAIL_USER=your_email@gmail.com\nEMAIL_PASS=your_app_password\nCLIENT_URL=http://localhost:5173`)}
                  className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                >
                  Copy All Variables
                </button>
              </div>
            </div>

            {/* SECTION 4: SUCCESS CARD */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-2xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">🎉 Your Auth Service is Ready!</h3>
                  <p className="text-gray-300 mb-4">
                    No monthly fees · No vendor lock-in · Your database · Your control
                  </p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/Prit059/auth-service" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      View on GitHub
                    </a>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      ⭐ Star this Project
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE PLACEHOLDERS - Add your screenshots here */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">[Screenshot: Registration Page]</span>
                </div>
                <div className="p-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400">Add your registration page screenshot here</p>
                </div>
              </div>


              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">[Screenshot: Login Page]</span>
                </div>
                <div className="p-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400">Add your login page screenshot here</p>
                </div>
              </div>


              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">[Screenshot: OAuth Success]</span>
                </div>
                <div className="p-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400">Add your OAuth success screenshot here</p>
                </div>
              </div>


              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">[Screenshot: Dashboard]</span>
                </div>
                <div className="p-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400">Add your dashboard screenshot here</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}