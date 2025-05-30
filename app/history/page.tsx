import { connectToDatabase } from "@/lib/mongodb";
import { Run } from "@/models/Run";
import React from "react";

export const dynamic = "force-dynamic";

interface RunType {
  _id: string;
  language: string;
  code: string;
  input?: string;
  output: string;
  createdAt: string;
}

export default async function HistoryPage() {
  await connectToDatabase();

  const runs = (await Run.find().sort({ createdAt: -1 }).lean()) as unknown as RunType[];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Execution History</h1>

      {runs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No runs yet.</p>
      ) : (
        <div className="space-y-6">
          {runs.map((run) => (
            <div key={run._id} className="p-4 border rounded shadow bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {run.language}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(run.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap mb-2">
                <strong>Code:</strong>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 mt-1 rounded">{run.code}</pre>
              </div>

              {run.input && (
                <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap mb-2">
                  <strong>Input:</strong>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 mt-1 rounded">{run.input}</pre>
                </div>
              )}

              <div className="text-sm text-gray-800 dark:text-green-400 whitespace-pre-wrap">
                <strong>Output:</strong>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 mt-1 rounded">{run.output}</pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
