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

