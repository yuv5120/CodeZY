
### 📄 `README.md`

````markdown
# 🚀 Codezy - Online Code Compiler

Codezy is a powerful, full-stack online code compiler inspired by platforms like CodeChef IDE.
It allows users to write, run, and view the history of code executions.
The app supports authentication, theme toggle, and a modern, clean UI.

## 🛠 Tech Stack Used

### Frontend:
- **Next.js 15** (App Router)
- **Tailwind CSS** – for styling
- **shadcn/ui** – prebuilt components
- **lucide-react** – icons
- **TypeScript**

### Backend & API:
- **MongoDB Atlas** – for storing run history
- **Mongoose** – ODM for MongoDB
- **NextAuth.js** – for authentication

### Code Execution:
- **Judge0 API** – to compile and execute code

### Deployment:
- **Vercel** – frontend/backend deployment
- **GitHub** – version control & CI

---

## 📸 Screenshots
<img width="1440" alt="Screenshot 2025-05-30 at 9 41 11 AM" src="https://github.com/user-attachments/assets/7a1a467b-825a-4c7f-8efd-62e8170ea1e4" />


---

## 📂 Features

- 🧑‍💻 Online Code Editor with syntax highlighting
- 🔐 Google Authentication via NextAuth
- 🌙 Light/Dark Theme toggle
- 📜 Execution History stored in MongoDB
- ⚙️ Supports multiple programming languages
- 💾 Code copy, share, and output view

---

## 🧪 Local Setup Instructions (Optional)

If you want to run it locally:

```bash
git clone https://github.com/yuv5120/Codezy.git
cd Codezy
npm install
````

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

Then run:

```bash
npm run dev
```

---

## 🚀 Deployment

Codezy is deployed using **Vercel**.

Steps:

1. Connect GitHub repo to Vercel.
2. Add environment variables in Vercel Dashboard.
3. Trigger the deployment or push code to main branch.

---

## 🤝 Contributing

Feel free to fork and contribute to this project. PRs are welcome!

---

## 📧 Contact

Created by [Yuvraj Singh Gour](https://www.linkedin.com/in/yuvraj-singh-gour-214424241/)

GitHub: [@yuv5120](https://github.com/yuv5120)

---

⭐ Star this repository if you like the project!

```

---

Let me know once you're ready with the screenshots and video — I’ll help you embed them properly into the README.
```
