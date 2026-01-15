# TaskFlow - Personal Task Management System 🚀

Hi! 👋

This is my submission for the **Ardentix Full Stack Developer Internship** assignment. I've built a robust, secure, and (hopefully you'll agree) beautiful task management application.

My goal was to create a system where users can securely log in and manage their tasks efficiently. I went a step further and added some premium features like a Kanban board, dark mode, and smooth animations to make it feel like a polished product you'd actually want to use daily.

> [!NOTE]
> **Google Authentication**: While you'll see the Google Login option, please note that it is currently under maintenance and might not work as expected due to domain verification updates. Standard email/password login is fully functional and secure!

## Live Demo & Repo
- **GitHub**: [https://github.com/mailech/Ardentix-Chore](https://github.com/mailech/Ardentix-Chore)
- **Live Demo**: https://ardentix-chore-6kk8.vercel.app/

## ✨ Key Features

I wanted to make sure this wasn't just another CRUD app. Here’s what makes it special:

*   **Kanban Board**: Visualize your workflow! You can drag and drop tasks between "To Do", "In Progress", and "Done". It’s super satisfying.
*   **Dark Mode**: First-class dark theme support. It auto-detects your system preference but you can toggle it manually too. Easy on the eyes for those late-night coding sessions.
*   **Dashboard Statistics**: A quick snapshot of your productivity right at the top of the dashboard.
*   **Responsive Design**: The layout looks great on everything from your laptop to your phone.
*   **Secure**: JWT-based authentication ensures your data stays yours.

## 🛠️ Tech Stack

I used the **MERN Stack** because it helps in building scalable full-stack apps efficiently.

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion (for those smooth entry animations), @hello-pangea/dnd (for the drag-and-drop magic).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose for modeling).
*   **Authentication**: JSON Web Tokens (JWT).

## 🚀 Getting Started

If you want to run this locally on your machine, here is how you do it:

### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed.

### 1. Clone the Repo
```bash
git clone https://github.com/mailech/Ardentix-Chore.git
cd Ardentix-Chore
```

### 2. Backend Setup
Go into the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following:
```env
MONGO_URI= your Mongo URL( ATLAS/ COMPASS) 
JWT_SECRET=your_super_secret_key
# GOOGLE_CLIENT_ID=your_google_client_id (Optional)
PORT=5000
```

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

---

## 💭 Final Thoughts
I really enjoyed working on this assignment. It gave me a chance to combine solid backend logic with a modern, interactive frontend. I paid special attention to the UI/UX because I believe tools should be enjoyable to use.

Thanks for taking the time to review my code. Looking forward to hearing from you!

Cheers!
