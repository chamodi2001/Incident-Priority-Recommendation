# Incident-Priority-Recommendation
Incident-Priority-Recommendation is a lightweight web application which allow users to submit the urgency and impact of an incident and automatically recommends a priority level. The app is containerized with Docker, with GitLab for handling image builds and storage, and GitHub Actions automating deployment to AWS EC2. Monitoring with CloudWatch alarm (billing and disk usage).


_**Tech Stack**_

**Frontend**:  React.js 

**Backend**:   Node.js , Express js

**Docker**:    For containerization

**GitHub , GitHub Actions**:   Source control + deploy trigger

**GitLab**:  CI to build & store image

**AWS EC2**: Docker host running the app

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

CI: Automatically builds and stores app images when update the code.

CD: Automatically deploys those images to the server to run the app.

Deploys the containers by running:

                    docker-compose pull

                    docker-compose up -d 
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
____________________________________________________________________________

Website Rendering,

1. Check EC2 Public IP or Domain

   Copy the EC2 instance's Public IPv4 address or Public DNS.

2. Visit the Site in Your Browser

http://<EC2_PUBLIC_IP>:<frontend_port>

