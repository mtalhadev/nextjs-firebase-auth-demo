# Next.js Firebase Authentication Demo

This is a simple authentication system built using **Next.js**, **Firebase Authentication**, and **API routes**. The project includes email/password and Google OAuth login, a logout function, and a protected API endpoint.

## Features

### Authentication

- Users can **sign in with email and password**.
- Users can **sign in with Google OAuth**.
- Users can **log out** from their account.

### API Implementation

- A **protected API endpoint** that:
  - Returns **"not authorized"** if the user is not authenticated.
  - Returns the **userId** and **auth token** for authenticated users.

## Tech Stack

- **Next.js**
- **Firebase Authentication**
- **Tailwind CSS** (for basic styling)

## Installation & Setup

### Prerequisites

Make sure you have **Node.js** and **npm/yarn** installed on your system.

### 1. Clone the repository

```sh
git clone https://github.com/mtalhadev/nextjs-firebase-auth-demo.git
cd nextjs-firebase-auth-demo
```

### 2. Install dependencies

```sh
npm install  # or yarn install
```

### 3. Configure Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable **Email/Password Authentication** and **Google Authentication** in the Firebase **Authentication** section.
4. Get your **Firebase Config** from Project Settings and create a `.env` file in the root of your project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=########################
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=########################
NEXT_PUBLIC_FIREBASE_PROJECT_ID=########################
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=########################
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=########################
NEXT_PUBLIC_FIREBASE_APP_ID=########################

FIREBASE_ADMIN_PROJECT_ID=########################
FIREBASE_ADMIN_CLIENT_EMAIL=########################
FIREBASE_ADMIN_PRIVATE_KEY=########################
```

### 4. Run the development server

```sh
npm run dev  # or yarn dev
```

The app will be running at **http://localhost:3000**.

## License

This project is open-source under the **MIT License**.

## Author

Developed by **Muhammad Talha**.

---

If you have any questions or suggestions, feel free to contribute or reach out!
