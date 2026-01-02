## IT Service Management RASA Chatbot

<p align="center">
  <img width="853" height="463" alt="readme_pic1" src="https://github.com/user-attachments/assets/db192c5c-c3c0-4e76-9897-c54c36b4ccdb" />
</p>

This project involved developing an IT Helpdesk chatbot using the RASA framework, which serves as a user assistant for Information Technology Systems Management (TISM). The chatbot interacts with users to understand their requests and automate helpdesk operations.

The chatbot was built using Python and FastAPI to manage API endpoints and facilitate communication between the chatbot and users. All chat dialogs are stored in a PostgreSQL database for analysis and future chatbot performance improvements.
The project is containerized using Docker, with the RASA chatbot and API server running as Docker images. Docker Compose manages the deployment, ensuring smooth scalability and maintenance.

Features:
- Rasa Chatbot: User Assistance & Recommendations: Goal-oriented and conversational app.
- Helpdesk recommendation: It provides action recommendation based on user intent
- Custom action: It provides option and guidance for user for actions, eg. API calls, filling form
- Natural Language Understanding (NLU): Intent Recognition and Entity Extraction
- FastAPI & RASA integration: Handles interaction between the chatbot and the server using Python FastAPI framework.
- SQLAlchemy: Use for connecting with the database, (save chats, query objects)
- PostgreSQL: Relational database management system (RDBMS) for storing user database and dialog session
- Fully Containerized: The entire application is packaged using Docker and managed with Docker Compose for easy deployment.
