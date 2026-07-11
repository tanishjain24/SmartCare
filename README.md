# SmartCare

SmartCare is a healthcare management system that allows patients and doctors to securely manage medical records. The project also includes AI-based medical report summarization to help doctors quickly understand patient reports.

## Features

- Patient and Doctor Login
- Secure Medical Record Upload
- AI-based Medical Report Summarization
- OTP Verification
- Patient Dashboard
- Secure File Encryption
- Responsive User Interface

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer
- Nodemailer

### AI/NLP
- Python
- Flask
- GROQ API
- PyMuPDF

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### NLP Service

```bash
cd NLP_Model/nlp_model/web-app
pip install -r requirements-minimal.txt
python app.py
```

## Environment Variables

### Backend

```env
MONGO_URI=
JWT_SECRET=
MASTER_KEY=
EMAIL_USER=
EMAIL_PASS=
NLP_SUMMARY_URL=
```

### Frontend

```env
VITE_API_BASE=
```

### NLP

```env
GROQ_API_KEY=
```

## Main Technologies

- React
- Node.js
- Express.js
- MongoDB
- Flask
- Python
- GROQ API
