import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from '../lib/mongodb';
import { Run } from '../models/Run';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const RAPID_API_KEY = process.env.JUDGE0_API_KEY!;

function getLanguageName(id: number): string {
  const map: Record<number, string> = {
    54: "C++",
    71: "Python",
    63: "Java",
    93: "JavaScript",
  };
  return map[id] || "Unknown";
}

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CodeZY API is running.' });
});

app.post('/api/run', async (req: Request, res: Response) => {
  try {
    const { code, languageId, input } = req.body;

    const response = await fetch(JUDGE0_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input,
      }),
    });

    const data = await response.json();

    // save to MongoDB
    await connectToDatabase();
    await Run.create({
      languageId,
      language: getLanguageName(languageId),
      code,
      input,
      output: data.stdout || data.compile_output || data.message || "No output",
    });

    res.json(data);
  } catch (err) {
    console.error("Run error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Mock Auth Route
app.post('/api/auth/login', (req: Request, res: Response) => {
  // In a real app this would use JWT and validate against MongoDB
  res.json({ token: "mock_jwt_token", user: { id: "1", name: "Mock User" } });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
