import AuthButtons from "@/components/AuthButton";
import CodeEditor from "@/components/Editor";

export default function Home() {
  return (
    <main className="px-6 pt-12 pb-6 bg-gradient-to-b from-sky-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Codezy
        </h1>
        <div className="flex space-x-4 items-center">
          <a
            href="/history"
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View History
          </a>
          <AuthButtons />
        </div>
      </div>
      <CodeEditor />
    </main>
  );
}