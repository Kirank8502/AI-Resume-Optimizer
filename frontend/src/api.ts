export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function analyzeResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to analyze resume");
  }

  return res.json();
}
