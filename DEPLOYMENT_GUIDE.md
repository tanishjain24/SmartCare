# IPD SmartCare Deployment Guide

This guide will help you deploy:
- **Frontend** on Vercel
- **Backend** on Render
- **NLP Service** on Render

## 📋 Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. Render account (sign up at https://render.com)
4. MongoDB Atlas account (for production database)
5. Git installed locally

---

## 🗂️ Part 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
cd c:\Users\TANISH\OneDrive\Documents\Desktop\IPD_SmarCare_SE\IPD_SmartCare
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `IPD_SmartCare`)
3. **DO NOT** initialize with README (you already have code)
4. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/IPD_SmartCare.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Part 2: Setup MongoDB Atlas (Database)

### 2.1 Create Database

1. Go to https://cloud.mongodb.com
2. Sign up/Login
3. Create a **FREE** M0 cluster
4. Choose your preferred region
5. Click "Create Cluster"

### 2.2 Configure Database Access

1. In MongoDB Atlas, go to **Database Access**
2. Click "Add New Database User"
3. Create a username and strong password (save these!)
4. Set privileges to "Read and write to any database"

### 2.3 Configure Network Access

1. Go to **Network Access**
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Render to connect
4. Confirm

### 2.4 Get Connection String

1. Go to **Database** → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<password>` with your actual password
6. Add your database name before the `?`: 
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartcare?retryWrites=true&w=majority`

---

## 🚀 Part 3: Deploy Backend to Render

### 3.1 Create Web Service

1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select `IPD_SmartCare` repository

### 3.2 Configure Service

**Basic Settings:**
- **Name**: `ipd-smartcare-backend` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 3.3 Add Environment Variables

Click "Advanced" → Add these environment variables:

```
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-random-string>
MASTER_KEY=<generate-random-string>
EMAIL_USER=<your-email-for-sending-otps>
EMAIL_PASS=<your-email-app-password>
MEGA_EMAIL=<your-mega-nz-email>
MEGA_PASSWORD=<your-mega-nz-password>
NLP_SUMMARY_URL=<will-add-after-nlp-deployment>
PORT=5000
HOST=0.0.0.0
FRONTEND_URL=<will-add-after-frontend-deployment>
```

**Important Notes:**
- For `EMAIL_PASS`: Use Gmail App Password (not your regular password)
  - Enable 2FA on Gmail → Generate App Password at https://myaccount.google.com/apppasswords
- For `JWT_SECRET` & `MASTER_KEY`: Generate random strings (32+ characters)
  - You can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Leave `NLP_SUMMARY_URL` and `FRONTEND_URL` empty for now

### 3.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your backend URL (e.g., `https://ipd-smartcare-backend.onrender.com`)
4. Test it by visiting `https://your-backend-url.onrender.com` - should see "Backend is Running"

---

## 🤖 Part 4: Deploy NLP Service to Render

### 4.1 Create Web Service

1. Go to Render Dashboard → "New +" → "Web Service"
2. Select `IPD_SmartCare` repository again

### 4.2 Configure Service

**Basic Settings:**
- **Name**: `ipd-smartcare-nlp` (or your choice)
- **Region**: Same as backend for lower latency
- **Branch**: `main`
- **Root Directory**: `NLP_Model/nlp_model/web-app`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements-minimal.txt`
- **Start Command**: `python app.py`
- **Instance Type**: `Free`

### 4.3 Add Environment Variables

```
GROQ_API_KEY=<your-groq-api-key>
PORT=5080
FLASK_DEBUG=false
FLASK_USE_RELOADER=false
```

**Get GROQ API Key:**
1. Go to https://console.groq.com
2. Sign up for free account
3. Go to API Keys section
4. Create new API key
5. Copy and save it

### 4.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment (may take 10-15 minutes for Python)
3. Copy your NLP URL (e.g., `https://ipd-smartcare-nlp.onrender.com`)

### 4.5 Update Backend Environment

1. Go back to your Backend service on Render
2. Go to "Environment" tab
3. Update `NLP_SUMMARY_URL` to: `https://your-nlp-url.onrender.com/summarize`
4. Click "Save Changes" (this will redeploy backend)

---

## 🎨 Part 5: Deploy Frontend to Vercel

### 5.1 Prepare Frontend

Before deploying, make sure your frontend is configured correctly.

### 5.2 Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository `IPD_SmartCare`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)

### 5.3 Add Environment Variable

Click "Environment Variables" and add:

```
VITE_API_BASE=https://your-backend-url.onrender.com
```

Replace with your actual backend URL from Part 3.

### 5.4 Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://ipd-smartcare.vercel.app`

### 5.5 Update Backend CORS

1. Go back to Render → Your Backend Service
2. Go to "Environment" tab
3. Update `FRONTEND_URL` to your Vercel URL: `https://ipd-smartcare.vercel.app`
4. Save Changes (backend will redeploy)

---

## 🔗 Part 6: Connect Everything

### 6.1 Update Backend CORS Configuration

The backend needs to allow requests from your Vercel frontend. I'll create an update for this.

### 6.2 Test the Connection

1. Visit your Vercel URL: `https://ipd-smartcare.vercel.app`
2. Try to sign up/login
3. Test NLP summarization features
4. Check browser console for any errors

---

## 🔍 Part 7: Troubleshooting

### Common Issues

**Backend won't start:**
- Check logs in Render dashboard
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**Frontend can't connect to backend:**
- Verify CORS settings
- Check `VITE_API_BASE` is correct
- Open browser DevTools → Network tab to see actual requests

**NLP service fails:**
- Check GROQ_API_KEY is valid
- Verify NLP_SUMMARY_URL in backend is correct
- Check Render logs for Python errors

**Database connection fails:**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check username and password in connection string
- Ensure database user has read/write permissions

### Checking Logs

**Render:**
- Go to your service → "Logs" tab
- Real-time logs show all console output

**Vercel:**
- Go to your deployment → "Functions" tab
- Click on any function to see logs

### Free Tier Limitations

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds (cold start)
- 750 hours/month free

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- No cold starts (always fast)

**Solution for Cold Starts:**
- Consider using a service like UptimeRobot to ping your services every 10 minutes
- Or upgrade to paid Render plan ($7/month per service)

---

## 📝 Part 8: Environment Variables Summary

### Backend (.env)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartcare
JWT_SECRET=your-random-secret-key-here
MASTER_KEY=your-master-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
MEGA_EMAIL=your-mega-email
MEGA_PASSWORD=your-mega-password
NLP_SUMMARY_URL=https://your-nlp-service.onrender.com/summarize
PORT=5000
HOST=0.0.0.0
FRONTEND_URL=https://your-app.vercel.app
```

### NLP Service (.env)
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
PORT=5080
FLASK_DEBUG=false
FLASK_USE_RELOADER=false
```

### Frontend (.env)
```env
VITE_API_BASE=https://your-backend.onrender.com
```

---

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Backend deployed on Render and accessible
- [ ] NLP service deployed on Render and accessible
- [ ] Frontend deployed on Vercel
- [ ] Backend environment updated with NLP_SUMMARY_URL
- [ ] Backend environment updated with FRONTEND_URL
- [ ] Frontend environment updated with VITE_API_BASE
- [ ] Backend CORS updated to allow Vercel domain
- [ ] Can access frontend and see the homepage
- [ ] Can register/login successfully
- [ ] Can test NLP summarization features

---

## 🔄 Updating Your Deployment

### To update any service:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Render and Vercel will automatically redeploy
4. Or manually redeploy from their dashboards

---

## 💡 Tips

1. **Environment Variables**: Never commit .env files to GitHub
2. **Secrets**: Keep your API keys and passwords secure
3. **Monitoring**: Check logs regularly for errors
4. **Backups**: MongoDB Atlas provides automatic backups
5. **Custom Domains**: Both Vercel and Render support custom domains (in free tier!)

---

## 📧 Need Help?

If you encounter issues:
1. Check the logs first (Render and Vercel dashboards)
2. Verify all environment variables are correct
3. Test each service independently
4. Check MongoDB Atlas connection

---

Good luck with your deployment! 🚀
