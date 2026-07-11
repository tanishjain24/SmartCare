# IPD SmartCare - Deployment Checklist

Use this checklist to ensure you've completed all deployment steps correctly.

## 📋 Pre-Deployment

- [ ] Code is committed to Git locally
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Render account created
- [ ] Vercel account created

---

## 🗄️ Database Setup

- [ ] MongoDB Atlas cluster created (free M0 tier)
- [ ] Database user created with password
- [ ] Network access set to 0.0.0.0/0 (allow all)
- [ ] Connection string copied and password replaced
- [ ] Database name added to connection string (e.g., `/smartcare`)

---

## 🚀 Backend Deployment (Render)

- [ ] New Web Service created on Render
- [ ] Repository connected
- [ ] Root directory set to `backend`
- [ ] Runtime set to Node
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] MASTER_KEY
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASS
  - [ ] MEGA_EMAIL
  - [ ] MEGA_PASSWORD
  - [ ] PORT=5000
  - [ ] HOST=0.0.0.0
  - [ ] NLP_SUMMARY_URL (add after NLP deployment)
  - [ ] FRONTEND_URL (add after frontend deployment)
- [ ] Service deployed successfully
- [ ] Backend URL copied (e.g., https://xxx.onrender.com)
- [ ] Tested by visiting URL (should show "Backend is Running")

---

## 🤖 NLP Service Deployment (Render)

- [ ] New Web Service created on Render
- [ ] Repository connected
- [ ] Root directory set to `NLP_Model/nlp_model/web-app`
- [ ] Runtime set to Python 3
- [ ] Build command: `pip install -r requirements-minimal.txt`
- [ ] Start command: `python app.py`
- [ ] GROQ API key obtained from https://console.groq.com
- [ ] Environment variables added:
  - [ ] GROQ_API_KEY
  - [ ] PORT=5080
  - [ ] FLASK_DEBUG=false
  - [ ] FLASK_USE_RELOADER=false
- [ ] Service deployed successfully
- [ ] NLP URL copied (e.g., https://xxx.onrender.com)
- [ ] Backend updated with NLP_SUMMARY_URL

---

## 🎨 Frontend Deployment (Vercel)

- [ ] New Project created on Vercel
- [ ] Repository imported
- [ ] Framework preset: Vite
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable added:
  - [ ] VITE_API_BASE=https://your-backend-url.onrender.com
- [ ] Deployed successfully
- [ ] Frontend URL copied (e.g., https://xxx.vercel.app)
- [ ] Backend updated with FRONTEND_URL

---

## 🔗 Final Connections

- [ ] Backend's NLP_SUMMARY_URL points to NLP service
- [ ] Backend's FRONTEND_URL points to Vercel deployment
- [ ] Frontend's VITE_API_BASE points to backend
- [ ] Backend CORS allows frontend domain
- [ ] All services redeployed with updated environment variables

---

## ✅ Testing

- [ ] Frontend loads correctly in browser
- [ ] Can navigate between pages
- [ ] Sign up functionality works
- [ ] Login functionality works
- [ ] Dashboard displays correctly
- [ ] File upload works
- [ ] NLP summarization works
- [ ] No CORS errors in browser console
- [ ] No 500 errors in network tab

---

## 🔍 Verification URLs

Write your deployment URLs here for reference:

**Frontend (Vercel):** ______________________________________

**Backend (Render):** ______________________________________

**NLP Service (Render):** ______________________________________

**MongoDB Atlas:** ______________________________________

---

## 📱 Share Your App

Once everything is working:

1. Share your Vercel URL with users
2. Consider setting up a custom domain (free on Vercel)
3. Monitor logs for any errors in first few days
4. Set up UptimeRobot to keep Render services awake (optional)

---

## 🎉 You're Done!

Congratulations on deploying your full-stack application!

### Next Steps

- Set up custom domain (optional)
- Configure email templates for better OTP emails
- Add monitoring and analytics
- Set up automated backups for MongoDB
- Consider upgrading to paid tiers for better performance

---

## 🔄 Future Updates

To update your deployed application:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Services will automatically redeploy!
```

---

## 📧 Important Notes

- **Free Tier Limitations**: Render services sleep after 15 min of inactivity
- **Cold Starts**: First request after sleep takes 30-60 seconds
- **Keep .env files secure**: Never commit them to Git
- **Backup Your Keys**: Save all environment variables safely

---

## 🆘 Having Issues?

1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) troubleshooting section
2. Review logs on Render/Vercel dashboards
3. Verify all environment variables are correct
4. Test each service independently
5. Check MongoDB Atlas connection

---

**Date Deployed:** ___________________

**Deployed By:** ___________________
