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

## 📸 Screenshots

| Screenshot 1 | Screenshot 2 | Screenshot 3 |
|--------------|--------------|--------------|
| <img src="https://github.com/user-attachments/assets/1d05c545-173e-4a22-be17-f1a52f45d117" width="250"/> | <img src="https://github.com/user-attachments/assets/a07dbf19-d2ae-479f-8590-65c45344405e" width="250"/> | <img src="https://github.com/user-attachments/assets/e0ab97f2-710d-4863-8c15-28b7b3c08a9a" width="250"/> |

| Screenshot 4 | Screenshot 5 |
|--------------|--------------|
| <img src="https://github.com/user-attachments/assets/1e29e47c-886b-49ee-a808-35ea2c2c112a" width="250"/> | <img src="https://github.com/user-attachments/assets/38890ec1-dd66-40dd-be69-f20334ed62de" width="250"/> |


✍️ Author
Arpit Rai

## 📬 Get in Touch

[![Email](https://img.shields.io/badge/email-arpitrai906@gmail.com-blue?style=flat&logo=gmail)](mailto:arpitrai906@gmail.com)
[![GitHub](https://img.shields.io/badge/github-Arpitrai073-181717?style=flat&logo=github)](https://github.com/Arpitrai073)

