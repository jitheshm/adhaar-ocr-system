# Aadhaar Ocr System 

## Overview

This is a full-stack MERN application. The frontend is built using React with Vite for fast development, and the backend is developed using Express. The project structure is organized with separate `frontend` and `backend` folders.


## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or later)
- npm

## Getting Started

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend

2. Install dependencies:

   ```bash
   npm install

3. Start the server:

   ```bash
   npm run dev

The server will run at port 3000.
You can change the port by adding PORT in .env file

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend

2. Install dependencies:

   ```bash
   npm install

3. Create a .env file in the frontend directory and add your environment variables. Remember to prefix them with VITE_:

   ```bash
   VITE_SERVER_URL=http://localhost:3000

3. Start the server:

   ```bash
   npm run dev

The application will run at port 5173.


Running the Application
After setting up both the backend and frontend, open your browser and navigate to http://localhost:5173. The frontend should interact with the backend API.
 
### Accessing the Deployed Version
The application is deployed, you can access it via the following URL:

[Live Link](https://adhaar-ocr-system.onrender.com/)


