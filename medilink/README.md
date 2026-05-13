# MediLink — Healthcare Management System

A professional full-stack healthcare management dashboard built with:
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, App Router
- **Backend**: Flask, SQLite

---

## 📁 Project Structure

```
medilink/
├── backend/
│   ├── app.py               # Flask backend with all routes
│   ├── requirements.txt
│   └── medilink_dbms.db     # SQLite DB (auto-created on first run)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── patients/page.tsx
│   │   ├── doctors/page.tsx
│   │   ├── hospitals/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── availability/page.tsx
│   │   ├── prescriptions/page.tsx
│   │   ├── medicines/page.tsx
│   │   └── reports/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       └── index.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── auth.tsx
│   └── types/
│       └── index.ts
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Setup & Run

### 1. Backend (Flask)

```bash
cd medilink/backend

# Create virtual environment
python -m venv venv

# Activate (Linux/macOS)
source venv/bin/activate
# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

Backend will run at: **http://127.0.0.1:5000**

The SQLite database `medilink_dbms.db` is created automatically with all required tables on first run.

---

### 2. Frontend (Next.js)

```bash
cd medilink   # project root

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at: **http://localhost:3000**

---

## 🔑 Authentication

The current auth system uses localStorage for session persistence. Any email/password combination will work for login/signup. To add real authentication, connect `/auth/login` and `/auth/signup` endpoints in `backend/app.py` and update `src/lib/auth.tsx`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /stats | Dashboard statistics |
| GET/POST | /patients | List / Create patients |
| GET/PUT/DELETE | /patients/:id | Get / Update / Delete patient |
| GET/POST | /doctors | List / Create doctors |
| GET/PUT/DELETE | /doctors/:id | Get / Update / Delete doctor |
| GET/POST | /hospitals | List / Create hospitals |
| GET/PUT/DELETE | /hospitals/:id | Get / Update / Delete hospital |
| GET/POST | /slots | List / Create availability slots |
| DELETE | /slots/:id | Delete slot |
| GET/POST | /appointments | List / Book appointments |
| DELETE | /appointments/:id | Cancel appointment |
| GET | /prescriptions | List prescriptions |
| GET | /medicines | List medicines |
| GET | /reports/appointments | JOIN report: appointments |
| GET | /reports/prescriptions | JOIN report: prescriptions |

---

## 🎨 UI Features

- ✅ Fixed sidebar with active route highlighting
- ✅ Responsive header with search and notifications
- ✅ Professional teal/emerald healthcare color theme
- ✅ Stat cards on dashboard
- ✅ Full CRUD modals (create, edit, delete with confirm dialogs)
- ✅ Search/filter on all list pages
- ✅ Loading states and error handling throughout
- ✅ Empty states with call-to-action
- ✅ Card layout for hospitals
- ✅ Dynamic JOIN report tables
- ✅ Soft shadows, rounded cards, proper spacing
- ✅ DM Sans typography
