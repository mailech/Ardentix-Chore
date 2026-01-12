# TaskFlow - Personal Task Management System 🚀

Hey there! 👋

This is my submission for the **Ardentix Full Stack Developer Internship** assignment. I've built a robust, secure, and (hopefully you'll agree) beautiful task management application. 

The goal was to create a system where users can securely log in and manage their tasks. I went a bit further and added some premium features like a Kanban board, dark mode, and smooth animations to make it feel like a polished product you'd actually want to use daily.

## Live Demo & Repo
- **GitHub**: [https://github.com/mailech/Ardentix-Chore](https://github.com/mailech/Ardentix-Chore)

## ✨ Key Features

I wanted to make sure this wasn't just another CRUD app. Here’s what makes it special:

*   **Kanban Board**: Visualize your workflow! You can drag and drop tasks between "To Do", "In Progress", and "Done". It’s super satisfying.
*   **Dark Mode**: First-class dark theme support. It auto-detects your system preference but you can toggle it manually too. easy on the eyes for those late-night coding sessions.
*   **Google Login**: One-click sign-in using your Google account. No need to remember another password.
*   **Dashboard Statistics**: A quick snapshot of your productivity at the top of the dashboard.
*   **Responsive Design**: formatting looks great on your laptop and your phone.
*   **Secure**: JWT-based authentication ensures your data stays yours.

## 🛠️ Tech Stack

I used the **MERN Stack** because it helps in building scalable full-stack apps efficiently.

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion (for those smooth entry animations), @hello-pangea/dnd (for the drag-and-drop magic).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose for modeling).
*   **Authentication**: JSON Web Tokens (JWT) & Google Identity Services.

## 🚀 Getting Started

If you want to run this locally on your machine, here is how you do it:

### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed.

### 1. Clone the Repo
```bash
git clone https://github.com/mailech/Ardentix-Chore.git
cd Ardentix-Chore
```

### 2. Backward Setup
Go into the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following:
```env
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
PORT=5000
```
*Note: You'll need your own Google Client ID if you want to test the generic Google Login.*

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, go to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the React app:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser, and you are good to go!

---

## 💭 Final Thoughts
I really enjoyed working on this assignment. It gave me a chance to combine solid backend logic with a modern, interactive frontend. I paid special attention to the UI/UX because I believe tools should be enjoyable to use.

Thanks for reviewing my code! Looking forward to hearing from you.

Cheers!
