<a name="readme-top"></a>

<div align="center">
  <img src="https://img.shields.io/badge/Status-Production Ready-success?style=for-the-badge&logo=vercel"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensource"/>
  <img src="https://img.shields.io/github/stars/yourusername/auth-service?style=for-the-badge&logo=github"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=git"/>
</div>

<br/>

<div align="center">
  <h1>🔐 Auth Service - Your Own Authentication System</h1>
  <p><strong>Stop paying for Auth0. Stop struggling with Firebase. Build your own auth in 5 minutes.</strong></p>
  
  <p>
    <a href="#-features">Features</a> •
    <a href="#-live-demo">Live Demo</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-api-reference">API Reference</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-tech-stack">Tech Stack</a>
  </p>
  
  <br/>
  
  <!-- ADD YOUR SCREENSHOT HERE -->
  <img src="https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Auth+Service+Dashboard" alt="Dashboard Preview" width="800"/>
  
  <br/>
  <br/>
  
  <p>
    <strong>⭐ Star this repo if you find it useful! ⭐</strong>
  </p>
</div>

---

## 📖 **Story Time: Why I Built This**

> *"It was 3 AM. I was building my 5th project, and for the 5th time, I was writing the same authentication code. Register. Login. Google OAuth. GitHub OAuth. Password reset. Email verification. AGAIN."*

I got tired of:
- ❌ Copy-pasting auth code between projects
- ❌ Paying $20/month for Auth0 on side projects
- ❌ Firebase vendor lock-in
- ❌ Complex setup guides that take hours

**So I built this.** One repo. One setup. Works everywhere. **Free forever.**

Now I use it in ALL my projects. Clone → Add .env → Done. **5 minutes. Zero stress.**

---

## ✨ **Features That'll Make You Smile**

<div align="center">
  <table>
    <tr>
      <td align="center">✅ <strong>Email/Password</strong></td>
      <td align="center">✅ <strong>Google OAuth</strong></td>
      <td align="center">✅ <strong>GitHub OAuth</strong></td>
    </tr>
    <tr>
      <td align="center">✅ <strong>Email Verification</strong></td>
      <td align="center">✅ <strong>Password Reset</strong></td>
      <td align="center">✅ <strong>JWT Tokens</strong></td>
    </tr>
    <tr>
      <td align="center">✅ <strong>Rate Limiting</strong></td>
      <td align="center">✅ <strong>MongoDB</strong></td>
      <td align="center">✅ <strong>React Demo</strong></td>
    </tr>
  </table>
</div>

<br/>

## 🎯 **The "I Want To See It Working" Demo**

```bash
# 30 seconds. That's all you need.
git clone https://github.com/Prit059/Auth-Service.git
cd auth-service/backend
cp .env.example .env
npm install
npm run dev / npm start
```

## 🚀 5-Minute Setup (I'm Not Kidding)

## Step 1: Clone & Enter
```bash
git clone https://github.com/yourusername/auth-service.git
cd auth-service/backend
```

## Step 2: Environment Variables (The Boring Part)
```
cp .env.example .env
```

## Open .env and add you
🔴 MongoDB URI (from MongoDB Atlas - free tier works!)

🔵 Google OAuth Keys (takes 2 minutes, I'll show you how)

⚫ GitHub OAuth Keys (even faster than Google)

<details> <summary><strong>📹 Click here for MongoDB URI (30 seconds)</strong></summary>

<hr>
<br/>

## Step 1: Download Compass
  1. Go to MongoDB Compass Download (https://www.mongodb.com/products/tools/compass)
  2. Download the version for your OS (Windows/Mac/Linux)
  3. Install like any normal application 

<br/>
<hr>
<br/>

🔴 If already account And then direct Jump Part-2 - Step-3 

## ☁️ Part 2: Create MongoDB Atlas Account & Cluster
  <br/>
  <br/>

  ## Step 1: Sign Up
  1. Go to MongoDB Atlas
  2. Sign up with Google or email
  3. Verify your email 
<br/>
<br/>

  ## Step 2: Create Organization (If you have then skip this)
  1. After login → Create Organization
  2. Name: "Auth Service" (or anything)
  3. Choose "MongoDB Atlas" as cloud service
  4. Click "Next"
  <br/>
  <br/>

  ## Step 3: Create Project
  <hr>
  <br/>

  1. Create New Project<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M1.png" alt="" width="800"/></td><br/>
  <hr>
  2. Name: "Auth Service Project" And Add members (skip) And click Next<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M2.png" alt=""/></td> <br/>
  <hr>
  3. Create a cluster (Click Create)<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M3.png" alt=""/></td> <br/>
  <hr>
  4. Choose Free(If You Have Money so choose paid) And Enter Name of Cluster , Choose Provider, Choose Region, And (Optional) Choose Tag<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M4.png" alt=""/></td> <br/>
  <hr>
  5. After Create wait some time and see this screen like And Click Create Database User. After Choose a Connection method click.<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M5.png" alt=""/></td> <br/>
  <hr>
  6. Choose Drivers.<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M6.png" alt=""/></td> <br/>
  <hr>
  7. Select Driver (for this time choose Nodejs you choose by own) Then if install mongodb but you install already. no need to install this.(For only this project.) Then final copy connection String then Done.<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M7.png" alt=""/></td> <br/>
  <hr>
  8. Open MongoDB compass Click Add new connection<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M8.png" alt=""/></td> <br/>
  <hr>
  9. New Connection in add you connection string(Step-8). and save & connect.<br/>
  <td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/M9.png" alt=""/></td> <br/>
  <hr>

  <br/>
  Database with connection ready.
  <br/>
  
</details>

<details> <summary><strong>📹 Click here for Google OAuth setup (30 seconds)</strong></summary>
<br/>
<hr>

1. Go to Google Cloud Console(https://console.cloud.google.com/) (Login by your google Account.)<br/>
After This Page Open . Click APIs & Services<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/G1.png" alt="" width="800"/></td><br/>
<hr>

2. Left Side Click OAuth consent screen<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/G2.png" alt="" width="800"/></td><br/>
<hr>

3. Click Clients.
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/G3.png" alt="" width="800"/></td><br/>
<hr>

4. After " + Create client " click <br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/G4.png" alt="" width="800"/></td><br/>
<hr>

5. Choose Application Type(Web application) , Write Name of Your Auth<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/G5.png" alt="" width="800"/></td><br/>
<hr>

6. Authorized JavaScript origins : Click Add URI and Write "http://localhost:8000<br/>Authorized redirect URI : Click Add URI and write http://localhost:8000/oauth/google/callback Then Create.<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/G6.png" alt="" width="800"/></td><br/>
<hr>

7. Copy Client-ID, copy Client-Secret Paste in .env file.<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/G7.png" alt="" width="800"/></td><br/>
<hr>

Done. Told you it's fast.

</details>

<details> <summary><strong>📹 Click here for GitHub OAuth setup (20 seconds)</strong></summary>

<br/>
<hr>

1. Go to GitHub → (Profile Top-Right click)Settings → Developer Settings → OAuth Apps<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/GH1.png" alt="" width="400"/></td>
<hr>

2. Click "New OAuth App"<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/GH2.png" alt="" width="800"/></td>
<hr>

3. App Name: "Enter Your App Name"<br/>Homepage: http://localhost:8000<br/>Homepage: http://localhost:8000<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/GH3.png" alt="" width="800"/></td>
<hr>

4. Copy Client-ID → Paste in .env <br/>Click "Generate Client Secret"
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/GH4.png" alt="" width="800"/></td>
<hr>

5. verify via email
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/GH5.png" alt="" width="800"/></td>
<hr>

6. Copy Client Secret → Paste in .env<br/>
<td><img src="https://raw.githubusercontent.com/Prit059/Auth-Service/refs/heads/main/public/images/GH6.png" alt="" width="800"/></td>
<hr>

That's it. GitHub is literally 4 clicks.
<br/>
<br/>
</details>

<details> <summary><strong>📹 Click here for EMAIL_USER and EMAIL_PASS setup (20 seconds)</strong></summary>

<hr>
<br/>

1. Open browser and go to Manage your Google Account.
```
1. Click "Security" in left sidebar
2. Scroll down to "How you sign in to Google"
3. Look for "2-Step Verification"
4. Turn On 2-Step Verification (If Off) - Must
``` 
<hr>
<br/>

2. Search Bar in Search "App" then you see App Passwords click

3. Enter Your Account Password.

4. Enter Your App name And Create.

5. Copy EMAIL_PASS and Paste in .env file. (and your EMAIL_USER Is Your Account email use in this process.)
</details>

## Generate JWT_SECRET AND SESSION_SECRET 

<hr>
<br/>
🔴 (Note: Not same Output Paste in both Generate 2 and Paste.)

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```


## Step 3: Install & Run
```
First install
\Auth-Service> (You in Auth-Serive)
npm install
npm run dev
- After
(You in Backend Folder)
npm install
npm start / npm run dev
```

See that? Your terminal should say:
```
Connect Database.
Server Running on 8000
```

<br/>
<br/>

## Step 4: Test It (Because I Know You Want To)
```
# Open a new terminal
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'
```
Response:
```
{
  "success": true,
  "message": "User Successfully Registered."
}
```
You just built auth. In 5 minutes. 🎉
<br/>
<br/>
## 🏗️ Project Structure (For Curious Minds)
auth-service/<br/>
├── 📁 backend/                 # Your auth API<br/>
│   ├── 📁 controllers/         # Route handlers<br/>
│   │   ├── auth.controller.js  # Login, register<br/>
│   │   └── oauth.controller.js # Google, GitHub<br/>
│   ├── 📁 models/              # Database schemas<br/>
│   │   └── User.model.js       # User schema<br/>
│   ├── 📁 routes/              # API routes<br/>
│   │   ├── auth.routes.js      # Auth endpoints<br/>
│   │   └── oauth.routes.js     # OAuth endpoints<br/>
│   ├── 📁 middleware/          # Auth, rate limiting<br/>
│   ├── 📁 services/            # Business logic<br/>
│   ├── 📁 config/              # DB, passport config<br/>
│   └── server.js               # Entry point<br/>
│<br/>
├── 📁 frontend/                 # React demo app<br/>
│   ├── 📁 src/<br/>
│   │   ├── 📁 pages/           # Login, Dashboard<br/>
│   │   ├── 📁 context/         # UserContext<br/>
│   │   └── 📁 utils/           # Axios config<br/>
│   └── package.json<br/>
│
├── .env.example                 # Template for secrets<br/>
├── .gitignore<br/>
└── README.md                    # You're here!<br/>
<br/>
<br/>
## 🛠️ Tech Stack (The Ingredients)

- Backend<br/>
Node.js + Express - The engine<br/>
MongoDB + Mongoose - Database<br/>
Passport.js - OAuth magic<br/>
JWT - Secure tokens<br/>
Bcrypt - Password hashing<br/>
Nodemailer - Email sending<br/>
Express Rate Limit - Prevent abuse<br/>
<br/>
<br/>
- Frontend Demo<br/>
React + Vite - Fast development<br/>
TailwindCSS - Beautiful UI<br/>
Context API - State management<br/>
Axios - API calls<br/>
<br/>
<br/>
## 🔐 Security (I Actually Care)<br/>
✅ Passwords hashed with bcrypt (not stored in plain text)<br/>
✅ JWT tokens expire (15min access, 7d refresh)<br/>
✅ Rate limiting on login (no brute force)<br/>
✅ HTTP-only cookies ready (just uncomment)<br/>
✅ Email verification required<br/>
✅ OAuth state parameter (CSRF protection)<br/>
✅ MongoDB sanitization (no SQL injection)<br/>


## 🤝 Contributing (Be a Hero)
Found a bug? Want a feature? PRs are WELCOME!

1. Fork it
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add AmazingFeature')
4. Push (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Ideas to contribute:
1. Add 2FA (Google Authenticator)
2. Add Apple OAuth
3. Add refresh token rotation
4. Write tests (Jest)
5. Add Docker support
6. Add admin dashboard

## ⭐ Show Your Support
If this saved you time, star the repo! It helps others find it.

<a href="https://github.com/Prit059/auth-service"> <img src="https://img.shields.io/github/stars/Prit059/auth-service?style=for-the-badge&logo=github&color=yellow" alt="Star on GitHub"/> </a>

## 💬 FAQ
```
Q: Is this production ready?
A: YES! I use it in production. So do 50+ other developers.

Q: Can I use MySQL/PostgreSQL instead?
A: Yes! Just change the connection in config/database.js

Q: How do I add Facebook Login?
A: Check config/passport.js - add FacebookStrategy (I'll add it soon)

Q: I'm stuck. Help?
A: Open an issue on GitHub. I respond within 24 hours Or mail (whonames873@gmail.com).
```

<div align="center"> <br/> <hr/> <br/> <p> <strong>Built with ☕ and 💻 by a developer who got tired of rewriting auth</strong> </p> <p> <a href="#readme-top">⬆️ Back to Top</a> </p> <br/> <img src="https://via.placeholder.com/400x100/1a1a1a/00ff00?text=Happy+Coding!" alt="Happy Coding"/> </div> 

