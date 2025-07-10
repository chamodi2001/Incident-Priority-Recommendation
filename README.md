# IncidentTracker
This project mimics a simplified internal tool used by SRE/DevOps/Monitoring teams to track real-time and historical incidents.

**Tech Stack**
Frontend:	React.js + Tailwind CSS / Material UI
Backend:  JSON Server (mock) OR Node.js OR Spring Boot
Docker: 	For containerization
GitHub:   Source control + deploy trigger
GitLab: 	CI to build & store image
AWS EC2:	Docker host running the app


[GitHub]
▼
Push Code ➝ GitHub Actions ➝ SSH into EC2 ➝ Pull Latest Docker Image

[GitLab]
▼
On commit ➝ Build Docker Image ➝ Push to GitLab Container Registry

[EC2]
▼
Docker Pull ➝ Docker Run (updated app)

/////////
With GitHub Actions, you’ll automate that process, plus add:

✅ Build Docker images for frontend + backend

✅ Push those Docker images to GitLab’s Container Registry

✅ SSH into your EC2 server and:

Pull new images

Restart the app using docker compose up -d






_____________________________________________________________
GitHub repo (Code)
     |
     v
GitHub Actions (CI/CD)
     |
     ├─> Build backend image → push to GitLab Container Registry
     ├─> Build frontend image → push to GitLab Container Registry
     └─> SSH into EC2 → pull code → docker compose up
     
On EC2:
  - mysql container already running (docker-compose)
  - backend and frontend pull images from GitLab registry

