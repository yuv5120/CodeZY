### 📄 `README.md`

# 🚀 Codezy - Online Code Compiler Setup

Codezy is a powerful code compiler platform. It allows users to write, run, and evaluate code executions. This repository contains the mobile application and the backend API handling authentication and execution.

## 🛠 Tech Stack Used

### Frontend (Mobile App):
- **React Native (Expo)**
- **TypeScript**

### Backend & API (Next.js):
- **Next.js 15 API Routes**
- **MongoDB Atlas**
- **Mongoose**
- **NextAuth.js**

### Code Execution:
- **Judge0 API**

---

## 📂 Features

- 🧑‍💻 Mobile Code Editor
- 🔐 API Authentication
- 📜 Execution History via MongoDB
- ⚙️ Supports multiple programming languages
- 💾 Easy local deployment

---

## 🧪 Local Setup Instructions

If you want to run the API locally:

```bash
git clone https://github.com/yuv5120/Codezy.git
cd Codezy
npm install
```

Create a `.env.local` file in the root and add:

```env
MONGODB_URI=your_mongodb_connection
NEXTAUTH_SECRET=your_random_string
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JUDGE0_API_URL=https://judge0.p.rapidapi.com
JUDGE0_API_KEY=your_api_key
```

Then run the Next.js API server:

```bash
npm run dev
```

To run the mobile app:
```bash
cd mobile
npm install
npm run start
```

---

## 🤝 Contributing

Feel free to fork and contribute to this project. PRs are welcome!

---

## 📧 Contact

Created by [Yuvraj Singh Gour](https://www.linkedin.com/in/yuvraj-singh-gour-214424241/)

GitHub: [@yuv5120](https://github.com/yuv5120)

---

⭐ Star this repository if you like the project!

