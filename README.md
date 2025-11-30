
# CityLife Guardian

A Smart Issue Reporting & Monitoring System

CityLife Guardian is a full-stack web application that allows citizens to report city issues (potholes, garbage, streetlights, etc.), view issues on a map/heatmap, and allows admins to manage issue status. Volunteers can also register and update their live locations.

---

## Project Structure

```
citylife-guardian/
│
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── auth.py
│   │   ├── issues.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── crud.py
│   │   ├── ai_model.py
│   │   └── static/
│   │       └── images/      # Uploaded issue images
│   ├── venv/                # Python virtual environment
│   └── requirements.txt
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── CreateIssue.jsx
│   │   │   ├── ViewIssues.jsx
│   │   │   ├── MapPage.jsx
│   │   │   ├── Heatmap.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   ├── VolunteerRegister.jsx
│   │   │   └── VolunteerPanel.jsx
│   │   ├── components/
│   │   │   └── NavBar.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md                # Project description (this file)
```

---

## Features

### User

1 Create issues with image, description, category
2 Auto-detect user location
3 View all issues
4 View issues on map
5 Heatmap visualization

### Admin

1 Update issue status (open, in-progress, fixed, rejected)
2 View all issues

### Volunteer

1 Register as volunteer
2 Update real-time location
3 Volunteer dashboard

---

## Technologies Used

### **Backend**

* FastAPI
* SQLite database
* SQLAlchemy ORM
* CORS Middleware
* JWT Authentication
* Static image hosting

### **Frontend**

* React
* React Router
* Fetch API
* Leaflet.js (Map)
* Leaflet.heat (Heatmap)

---

## Backend Setup (FastAPI)

### 1 Activate virtual environment

```
cd backend
venv\Scripts\activate
```

### 2 Install dependencies

```
pip install -r requirements.txt
```

### 3 Run backend

```
uvicorn app.main:app --reload --port 8000
```

Backend will run on:
 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Frontend Setup (React)

### 1 Install node modules

```
cd frontend
npm install
```

### 2 Start frontend

```
npm run dev
```

Frontend runs on:
 [http://localhost:5173/](http://localhost:5173/)

---

## Admin Login

Default admin user:

```
email: admin@example.com
password: admin123
```

If not created, run:

```
python -m app.create_admin
```

---

## API Endpoints (Important)

### Auth

```
POST /api/auth/login
```

### Issues

```
POST /api/issues/create
GET  /api/issues/all
PUT  /api/issues/update-status/{id}?status=...
```

### Volunteers

```
POST /api/issues/volunteers/register
POST /api/issues/volunteers/{id}/location
GET  /api/issues/volunteers/available
```

---

## Image Storage

User-uploaded images are stored in:

```
backend/app/static/images/
```

They are served publicly via FastAPI:

```
/static/images/<filename>
```

---

## Map & Heatmap

Uses Leaflet.js and leaflet-heatmap plugin.

* `/map` → show issue markers
* `/heatmap` → aggregated issue density

---

## Deployment (Optional)

* Host backend on **Render / Railway / Azure**
* Host frontend on **Netlify / Vercel**
* Ensure CORS settings are updated in `main.py`

---


##  Author

**Your Name (Goutam)**
CityLife Guardian — 2025 Smart City Project

---

