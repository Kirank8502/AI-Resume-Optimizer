import { useState } from "react";
import { analyzeResume } from "./api";

type AnalysisResult = {
  fileName: string;
  score: number;
  matched_keywords: string[];
  improvements: string[];
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const data = await analyzeResume(file);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", fontFamily: "system-ui" }}>
      <h1>AI Resume Optimizer (Rule-based)</h1>
      <p>Upload your resume (.txt for now) to get a score and improvement suggestions.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <button type="submit" disabled={!file || loading} style={{ marginLeft: "1rem" }}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "1.5rem" }}>
          <h2>Result for: {result.fileName}</h2>
          <p>
            <strong>Score:</strong> {result.score} / 100
          </p>

          <div>
            <strong>Matched Keywords:</strong>
            <ul>
              {result.matched_keywords.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Suggestions:</strong>
            <ul>
              {result.improvements.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
