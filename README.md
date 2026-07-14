# TASKFLOW

A simple task and project management app. Built with Node.js, Express, and JWT authentication, with data stored in a local JSON file — no external database needed.
 
## Features
 
- Register and log in (passwords hashed with bcrypt, sessions via JWT)
- Create, update, and delete tasks with status and priority
- Organize tasks into projects
- Admin panel: manage users and view system activity
## Tech Stack
 
- **Backend:** Node.js, Express
- **Auth:** JWT, bcrypt
- **Data:** JSON file (`data/db.json`)
- **Frontend:** Static HTML/CSS/JS
## Getting Started
 
```bash
git clone https://github.com/safa-2186/TaskFlow.git
cd TaskFlow
npm install
```
 
Create a `.env` file in the root:
 
```env
PORT=5000
JWT_SECRET=your_secret_here
```
 
Run it:
 
```bash
npm start
```
 
Then open `http://localhost:5000` in your browser.
 
## Project Structure
 
```
TaskFlow/
├── server.js              # Starts the app, sets up routes
├── db.js                  # Reads/writes data/db.json
├── data/db.json           # Stored data (users, tasks, projects)
├── controllers/           # Logic for auth, tasks, projects, admin
├── middleware/             # JWT auth check
├── routes/                 # API endpoints
└── frontend/index.html     # The UI
```
 
## How It Works
 
1. A request hits a **route** (e.g. `POST /tasks`)
2. **Middleware** checks the JWT to confirm the user is logged in
3. The **controller** runs the logic (validates input, decides what to do)
4. **`db.js`** reads or writes `data/db.json`
5. A response goes back to the frontend
## API Quick Reference
 
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, get a token |
| GET | `/tasks` | List your tasks |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/projects` | List your projects |
| POST | `/projects` | Create a project |
 
All routes except register/login require an `Authorization: Bearer <token>` header.
 
## Notes
 
- Never commit your `.env` file — it holds secrets.
- Set a strong `JWT_SECRET` before deploying anywhere real.