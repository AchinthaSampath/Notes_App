# Notes App

A full-stack note-taking application built with the MERN stack. Users can create, edit, delete, search, and pin notes through a responsive and intuitive interface.

## Live Demo

🔗 https://notes-app-ly7k.onrender.com/


## Features

- Create new notes
- Edit existing notes
- Delete notes
- Pin and unpin important notes
- Search notes by title or content
- Rate limiting for API protection
- Responsive user interface
- Toast notifications for user feedback

---

## Screenshots
<img width="1241" height="603" alt="image" src="https://github.com/user-attachments/assets/f2516c28-6b95-4cb1-aeb3-5d258a45bf3f" />
<img width="1139" height="471" alt="image" src="https://github.com/user-attachments/assets/fca48463-d3d1-4e37-b872-d64ea49918ff" />

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- DaisyUI
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Deployment
- Render

---


## Getting Started

### Prerequisites

Before running this project, make sure you have:

- Node.js installed
- npm installed
- MongoDB Atlas account

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Achch4/Notes_App.git
cd notes-app
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### Create a `.env` file in the backend directory

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Start the Backend Server

```bash
npm run dev
```

---

### 3. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### Create a `.env` file in the frontend directory

```env
VITE_API_URL=http://localhost:5000/api
```

### Start the Frontend Development Server

```bash
npm run dev
```

---

## Usage

Open your browser and navigate to:

```text
http://localhost:5173
```

You can then:

- Create notes
- Edit notes
- Delete notes
- Pin important notes
- Search through existing notes

---


## License

This project is for educational and portfolio purposes.
