# EduAdaptive AI - Institutional & Personalized Learning Platform

An industry-grade educational ecosystem combining AI-driven curriculum generation with high-integrity proctored assessments.

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (3.10+)
- **Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
API_KEY=your_gemini_api_key_here
```

### 3. Frontend Installation & Run
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The app will be available at `http://localhost:3000` (or the port specified by your runner).

### 4. Backend Installation (Optional for Demo)
If you are running the FastAPI backend service:
```bash
# Navigate to backend directory (if applicable)
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

## 🛠 Features
- **Adaptive Onboarding**: Maps student cognitive profiles.
- **AI Architect**: Generates 5-module courses using Gemini 3.5.
- **Triple-Mode Proctoring**: High-integrity exam environments.
- **Teacher Suite**: Modular course builder and institutional classroom management.

---
© 2024 EduAdaptive AI. Empowering excellence through neural adaptation.

npm run dev

> dev
> vite