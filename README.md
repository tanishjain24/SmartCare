# 🏥 IPD SmartCare

A comprehensive healthcare management system with AI-powered medical document summarization.

## 📁 Project Structure

```
IPD_SmartCare/
├── backend/              # Node.js + Express API
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── middleware/      # Auth & validation
│
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── utils/       # API utilities
│   └── public/          # Static assets
│
└── NLP_Model/           # Python Flask NLP service
    └── nlp_model/
        └── web-app/     # Summarization API
```

## ⚡ Quick Start

### Local Development
See [LOCAL_SETUP.md](./LOCAL_SETUP.md) for detailed local setup instructions.

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend  
cd frontend && npm install && npm run dev

# NLP Service
cd NLP_Model/nlp_model/web-app && pip install -r requirements-minimal.txt && python app.py
```

## 🚀 Deployment

### Complete Deployment Guide
📖 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Full step-by-step deployment instructions

### Quick Reference
📋 **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - URLs, environment variables, and troubleshooting

### Deployment Checklist
✅ **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Track your deployment progress

## 🌐 Deployment Architecture

```
Frontend (Vercel)
    ↓
Backend (Render) ←→ NLP Service (Render)
    ↓
MongoDB Atlas
```

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **NLP Service**: Render (Python + Flask)
- **Database**: MongoDB Atlas

## ✨ Features

- 👤 User authentication (Doctors & Patients)
- 📄 Medical document upload and storage
- 🤖 AI-powered document summarization using GROQ
- 📊 Patient health records dashboard
- 🔐 Secure file encryption
- ✉️ OTP-based verification
- 📱 Responsive design

## 🔧 Technology Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)
- Nodemailer (OTP)

### NLP Service
- Python + Flask
- GROQ API
- PyMuPDF (PDF processing)

## 📝 Configuration Files

- **Frontend**: `frontend/.env.example` → Create as `.env.local`
- **Backend**: `backend/.env.example` → Create as `.env`
- **NLP**: `NLP_Model/nlp_model/web-app/.env.example` → Create as `.env`

## 🔐 Environment Variables

### Required for Frontend
```env
VITE_API_BASE=http://localhost:5000
```

### Required for Backend
```env
MONGO_URI=mongodb://localhost:27017/test
JWT_SECRET=your-secret-key
MASTER_KEY=your-master-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NLP_SUMMARY_URL=http://localhost:5080/summarize
```

### Required for NLP Service
```env
GROQ_API_KEY=your-groq-api-key
```

## 🧪 Testing

### Local Testing
1. Start all three services (backend, frontend, NLP)
2. Open http://localhost:5173
3. Sign up and test features

### Production Testing
1. Deploy all services following [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Test on your Vercel URL
3. Check logs for errors

## 📚 API Documentation

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Files
- `POST /api/files/upload` - Upload medical document
- `GET /api/files/:id` - Get file details

### Summarization
- `POST /api/summarize/text` - Summarize text
- `POST /api/summarize/doctor/patient/:patientId/file/:fileId` - Summarize patient file

### Requests
- `POST /api/requests` - Create access request
- `GET /api/requests/:id` - Get request details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

Having issues? Check these resources:

1. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Troubleshooting section
2. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Common fixes
3. Check service logs on Render/Vercel dashboards
4. Verify environment variables

## 🎯 Roadmap

- [ ] Add Redis caching
- [ ] Implement WebSocket notifications
- [ ] Add comprehensive testing
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 👥 Team

Developed as part of IPD (Intelligent Product Design) project.

---

**Getting Started?** → Read [LOCAL_SETUP.md](./LOCAL_SETUP.md)

**Ready to Deploy?** → Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Need Quick Info?** → Read [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

Made with ❤️ for better healthcare management
