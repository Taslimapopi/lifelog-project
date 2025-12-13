# 📘 LifeLog – Client Side

LifeLog একটি personal growth ও life experience sharing platform, যেখানে ব্যবহারকারীরা নিজেদের শেখা বিষয়, অভিজ্ঞতা ও লেসন শেয়ার করতে পারে। এই রিপোজিটরিটি LifeLog এর **Client Side (Frontend)** কোডের জন্য।

---

## 🚀 Live Demo

🔗 Live Site: https://lifelog-6d454.web.app/

---

## 🛠️ Technologies Used

* **React** (Vite)
* **React Router DOM**
* **Tailwind CSS**
* **TanStack React Query**
* **Axios**
* **React Hook Form**
* **Firebase Authentication**
* **Lottie React** (Animations)
* **Stripe** (Payment – Premium Access)

---

## ✨ Key Features

### 👤 Authentication

* Email & Password Login / Register
* Google Authentication
* Firebase Auth Integration

### 📚 Lessons

* Add new lessons with image upload
* Category & Emotional Tone based lessons
* Public / Private lesson support
* Free & Premium access control

### 💎 Premium System

* Stripe Payment Integration
* Premium users can access premium lessons
* Upgrade option for free users

### 🧑‍💼 Dashboard

* User Dashboard

  * My Lessons
  * Add Lesson
* Admin Dashboard

  * Platform analytics
  * Manage users
  * Monitor lessons

### 🎉 UX Enhancements

* Loading spinners
* Success Lottie animations
* Error handling pages

---

## 📂 Project Structure

```bash
lifelog-client/
│── src/
│   ├── assets/          # Images & Lottie JSON
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom hooks (useAuth, useAxios)
│   ├── layouts/         # Layout components
│   ├── pages/           # All pages
│   ├── routes/          # Router configuration
│   ├── utils/           # Helper functions (image upload etc.)
│   ├── App.jsx
│   └── main.jsx
│── public/
│── .env
│── package.json
│── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/lifelog-client.git
cd lifelog-client
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Project

```bash
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

## 🧪 Scripts

```bash
npm run dev      # Run development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🧑‍💻 Author

* **Name:** Taslima Popy
* **Role:** Frontend Developer (React)
* **Country:** Bangladesh 🇧🇩

---

## 📜 License

This project is for learning and educational purposes.

---

## 🤝 Acknowledgements

* React Documentation
* Firebase
* TanStack Query
* Stripe
* LottieFiles

---

⭐ If you like this project, feel free to give it a star!
