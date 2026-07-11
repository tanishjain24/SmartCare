# 🚀 Quick Deployment Reference

## 📍 Service URLs

| Service | Platform | URL Pattern | Purpose |
|---------|----------|-------------|---------|
| Frontend | Vercel | `https://your-app.vercel.app` | User interface |
| Backend | Render | `https://your-backend.onrender.com` | API server |
| NLP | Render | `https://your-nlp.onrender.com` | Text summarization |
| Database | MongoDB Atlas | `mongodb+srv://...` | Data storage |

---

## 🔗 How They Connect

```
┌─────────────┐
│   Browser   │
│  (User PC)  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│   Frontend (Vercel)                 │
│   - React + Vite                    │
│   - Env: VITE_API_BASE              │
└──────┬──────────────────────────────┘
       │ HTTP Requests
       ▼
┌─────────────────────────────────────┐
│   Backend (Render)                  │
│   - Node.js + Express               │
│   - Env: FRONTEND_URL (CORS)        │
│   - Env: NLP_SUMMARY_URL            │
│   - Env: MONGO_URI                  │
└──────┬───────────────┬──────────────┘
       │               │
       │               ▼
       │        ┌─────────────────────┐
       │        │  NLP Service        │
       │        │  (Render)           │
       │        │  - Python + Flask   │
       │        │  - Env: GROQ_API_KEY│
       │        └─────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   MongoDB Atlas                     │
│   - Cloud Database                  │
│   - Env: Connection String          │
└─────────────────────────────────────┘
```

---

## 🔐 Environment Variables Quick Reference

### Frontend (Vercel)
```env
VITE_API_BASE=https://your-backend.onrender.com
```

### Backend (Render)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartcare
JWT_SECRET=random-32-char-string
MASTER_KEY=random-32-char-string
EMAIL_USER=your@gmail.com
EMAIL_PASS=gmail-app-password
MEGA_EMAIL=mega@email.com
MEGA_PASSWORD=mega-password
NLP_SUMMARY_URL=https://your-nlp.onrender.com/summarize
PORT=5000
HOST=0.0.0.0
FRONTEND_URL=https://your-app.vercel.app
```

### NLP Service (Render)
```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
PORT=5080
FLASK_DEBUG=false
FLASK_USE_RELOADER=false
```

---

## 🛠️ Common Commands

### Deploy/Update
```bash
git add .
git commit -m "Update message"
git push origin main
# Auto-deploys to Vercel and Render!
```

### Generate Secrets
```bash
# JWT_SECRET and MASTER_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Locally
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# NLP
cd NLP_Model/nlp_model/web-app && python app.py
```

---

## 🔍 Troubleshooting Quick Fixes

### Frontend can't reach backend
1. Check `VITE_API_BASE` in Vercel environment variables
2. Verify backend URL is correct and accessible
3. Check browser console for CORS errors
4. Ensure `FRONTEND_URL` is set in backend

### Backend can't connect to database
1. Verify `MONGO_URI` is correct
2. Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
3. Test connection string in MongoDB Compass
4. Verify database user has read/write permissions

### NLP service not working
1. Check `GROQ_API_KEY` is valid
2. Verify `NLP_SUMMARY_URL` in backend is correct
3. Test NLP URL directly: `https://your-nlp.onrender.com/`
4. Check Render logs for Python errors

### 502 Bad Gateway or timeout
- Render free tier: Services sleep after 15 min inactivity
- First request takes 30-60 seconds (cold start)
- Solution: Wait 60 seconds and try again
- Or use UptimeRobot to keep services awake

---

## 📊 Platform Limits (Free Tiers)

| Platform | Limit | Impact |
|----------|-------|--------|
| Vercel | 100GB bandwidth/month | Should be enough for testing |
| Render | 750 hours/month | More than enough |
| Render | Sleeps after 15 min | Cold start delay |
| MongoDB Atlas | 512MB storage | Good for development |

---

## 🔗 Important Dashboard Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **GROQ Console**: https://console.groq.com
- **Gmail App Passwords**: https://myaccount.google.com/apppasswords

---

## 📱 Testing Checklist

After deployment, test these features:

- [ ] Homepage loads
- [ ] Sign up new user
- [ ] Login with credentials
- [ ] View dashboard
- [ ] Upload file
- [ ] Summarize document
- [ ] View requests (if doctor)
- [ ] Send request (if patient)

---

## 💡 Pro Tips

1. **Logs are your friend**: Always check logs first when debugging
2. **Test environment variables**: Print them (without sensitive data) in logs
3. **Use .env.example**: Never commit real .env files
4. **Cold starts**: Expect 30-60s delay on first request to Render
5. **CORS errors**: Usually means `FRONTEND_URL` not set in backend
6. **Database errors**: Usually MongoDB Atlas IP whitelist or wrong credentials

---

## 🆘 Emergency Contacts & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Vite Docs**: https://vitejs.dev
- **Express Docs**: https://expressjs.com

---

## 📈 Monitoring Your App

### Check Health
```bash
# Backend
curl https://your-backend.onrender.com/

# NLP Service
curl https://your-nlp.onrender.com/
```

### View Logs
- **Render**: Dashboard → Your Service → Logs tab
- **Vercel**: Dashboard → Your Project → Deployments → Function logs

---

## 🎯 Performance Optimization (Future)

1. Upgrade to Render paid plan ($7/month) - No cold starts
2. Add Redis for caching (Render add-on)
3. Use CDN for static assets
4. Enable Vercel Analytics
5. Set up error monitoring (Sentry)

---

## ✅ Success Indicators

Your deployment is successful if:

- ✅ All three services show "deployed" in green
- ✅ Frontend loads without errors in console
- ✅ Can sign up and login
- ✅ Can use NLP summarization
- ✅ No 502 or CORS errors

---

**Last Updated**: February 2026
**Version**: 1.0
