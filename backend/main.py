from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from analyzer import analyze_text

app = FastAPI(
    title="AI Resume Optimizer (Rule-based)",
    description="Analyzes resumes for cloud, distributed systems, and microservices skills.",
)

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev; later you can restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    content_bytes = await file.read()
    content = content_bytes.decode("utf-8", errors="ignore")
    result = analyze_text(content)
    return {
        "fileName": file.filename,
        **result,
    }

@app.get("/health")
async def health():
    return {"status": "ok"}