🤖 AI-Powered Customer Support Chat Platform

A full-stack application that allows users to chat with an AI assistant trained on company FAQs or documents. Admins can upload documents to power contextual answers. Built with the MERN stack, styled using Tailwind CSS, and uses MobX for state management. AI responses are powered by Hugging Face's google/flan-t5-base model.

🔗 Live Demo
Coming soon...

🚀 Features
🧑‍💼 User Features
User registration and login

Real-time chat with AI assistant

Contextual answers based on uploaded documents

Fallback to general GPT responses when no context is matched

Chat history saved per user

🛠️ Admin Features
Admin login

Upload FAQs or PDF documents

View uploaded documents

🤖 AI Integration
Hugging Face google/flan-t5-base model

Dynamically generates responses based on documents

🧰 Tech Stack
Frontend	Backend	AI	State Management	Styling	Auth	Database
React (Vite)	Node.js + Express	Hugging Face (flan-t5-base)	MobX	Tailwind CSS	JWT	MongoDB

📁 Project Structure
project-root/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── main.jsx
├── .env
└── README.md

⚙️ Setup Instructions

📦 Prerequisites

Node.js (v16+)

MongoDB

Hugging Face API Token (for model inference)

Vite (frontend)

🛠 Backend Setup

cd backend

npm install

Create .env file:
env
PORT=5000

MONGO_URI=your_mongo_connection_string

JWT_SECRET=your_jwt_secret

HUGGINGFACE_API_TOKEN=your_huggingface_api_key

npm run dev

💻 Frontend Setup

cd frontend

npm install

npm run dev


📷 Screenshots

![Image](https://github.com/user-attachments/assets/7e301475-e010-4bc5-ab4f-264a20dad7f1)

✍️ Author
Arpit Rai

📧 Email

🌐 GitHub
