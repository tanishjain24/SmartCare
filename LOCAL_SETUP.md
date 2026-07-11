# Quick Setup Commands for Local Development

## Prerequisites
- Node.js 16+ installed
- Python 3.8+ installed
- MongoDB installed and running locally
- Git installed

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd IPD_SmartCare
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend runs at: http://localhost:5000

### 3. Setup Frontend (in new terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
# Verify VITE_API_BASE points to backend
npm run dev
```

Frontend runs at: http://localhost:5173

### 4. Setup NLP Service (in new terminal)
```bash
cd NLP_Model/nlp_model/web-app
pip install -r requirements-minimal.txt
cp .env.example .env
# Edit .env with your GROQ_API_KEY
python app.py
```

NLP service runs at: http://localhost:5080

## Local Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/test
JWT_SECRET=dev-jwt-secret-change-in-production
MASTER_KEY=dev-master-key-change-in-production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
MEGA_EMAIL=your-mega@gmail.com
MEGA_PASSWORD=your-mega-password
NLP_SUMMARY_URL=http://localhost:5080/summarize
PORT=5000
HOST=127.0.0.1
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_BASE=http://localhost:5000
```

### NLP (.env)
```
GROQ_API_KEY=your-groq-key-here
PORT=5080
FLASK_DEBUG=true
FLASK_USE_RELOADER=true
```

## Testing

1. Open http://localhost:5173 in browser
2. Try signing up and logging in
3. Test file upload and summarization
4. Check console for any errors

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.

## Project Structure

```
IPD_SmartCare/
├── backend/           # Node.js + Express API
├── frontend/          # React + Vite frontend
└── NLP_Model/         # Python Flask NLP service
    └── nlp_model/
        └── web-app/   # Flask app
```

## Useful Commands

### Backend
- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run populate` - Populate database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### NLP
- `python app.py` - Start Flask server

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod` or check service status
- Check .env file exists and has correct values
- Verify Node.js version: `node --version` (should be 16+)

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check VITE_API_BASE in .env.local
- Check browser console for CORS errors

### NLP service fails
- Verify Python version: `python --version` (should be 3.8+)
- Check GROQ_API_KEY is valid
- Install missing packages: `pip install -r requirements-minimal.txt`

## Need Help?

Check the logs in each respective terminal window for detailed error messages.
