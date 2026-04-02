🔥 Features
	•	🔐 User Authentication (JWT + Cookies)
	•	📋 Task CRUD (Create, Read, Update, Delete)
	•	🔄 Status Toggle (Pending ↔ Completed)
	•	🔍 Search & Filter Tasks
	•	📄 Pagination Support
	•	📅 Today Tasks API
	•	📆 Upcoming (7 Days) Tasks API
	•	📊 Dashboard API (Task Statistics)


    🛠️ Tech Stack
	•	Node.js
	•	Express.js
	•	MongoDB (Mongoose)
	•	JWT Authentication
	•	Cookie-parser

📦 API Endpoints

🔐 Auth Routes
	•	POST /api/auth/register → Register user
	•	POST /api/auth/login → Login user
	•	POST /api/auth/logout → Logout user



    📋 Task Routes
	•	POST /api/tasks → Create task
	•	GET /api/tasks → Get all tasks (pagination, search, filter)
	•	PATCH /api/tasks/:id/status → Toggle task status
	•	DELETE /api/tasks/:id → Delete task

    📅 Scheduling Routes
	•	GET /api/tasks/today → Get today’s tasks
	•	GET /api/tasks/upcoming → Get next 7 days tasks

    📊 Dashboard
	•	GET /api/tasks/dashboard → Task summary
