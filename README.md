# IncidentTracker
Incident Tracker is a lightweight web application which allow users to submit incident reports and receive an estimated priority based on their responses. Future enhancements include integrating AI for smarter priority classification.
**Tech Stack**
Frontend:	React.js 
Backend:  Node.js , Express js
Docker: 	For containerization
GitHub , GitHub Actions:   Source control + deploy trigger
GitLab: 	CI to build & store image
AWS EC2:	Docker host running the app


**GitHub Actions (CI/CD runner):**
**Build Docker images for frontend + backend**
  Build backend Docker image → Push to GitLab Registry
  Build frontend Docker image → Push to GitLab Registry
  SSH into EC2 → Run docker compose pull → up
  Restart the app using docker compose up -d

**On EC2 Instance**
 mysql container (Dockerized, running always)
 backend and frontend containers (fetched from GitLab Container Registry)


_____________________________________________________________
GitHub repo (Code)
      |
GitHub Actions (CI/CD)

     |
     ├─> Build backend image → push to GitLab Container Registry
     ├─> Build frontend image → push to GitLab Container Registry
     └─> SSH into EC2 → pull images → docker compose up
     
On EC2:
  - mysql container already running (docker-compose)
  - backend and frontend pull images from GitLab registry

_____________________________________________________________

**Structure**
incident-tracker/
├── frontend/
│   ├── Dockerfile
│   └── ...
├── backend/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
├── .env
├── .github/
│   └── workflows/
│       └── deploy.yml

