# IncidentTracker
Incident Tracker is a lightweight web application which allow users to submit incident reports and receive an estimated priority based on their responses. Future enhancements include integrating AI for smarter priority classification.
**Tech Stack**
Frontend:	React.js 
Backend:  Node.js , Express js
Docker: 	For containerization
GitHub , GitHub Actions:   Source control + deploy trigger
GitLab: 	CI to build & store image
AWS EC2:	Docker host running the app

_________________________________________________________________________
GitHub repo (Code)
      |
GitHub Actions (CI/CD)

 Build backend image (Github Actions) → push to GitLab Container Registry

 Build frontend image (Github Actions) → push to GitLab Container Registry

 SSH into EC2 → pull images → docker compose up 
     
On EC2:
  - mysql container already running (docker-compose)
  - backend and frontend pull images from GitLab registry

CI: Automatically builds and stores app images when you update your code.

CD: Automatically deploys those images to your server to run the app.
_________________________________________________________________________

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

└── .github/

    └── workflows/

        └── deploy.yml

