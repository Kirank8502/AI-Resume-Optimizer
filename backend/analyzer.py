KEYWORDS = {
    "aws": 10,
    "lambda": 6,
    "api gateway": 6,
    "dynamodb": 6,
    "microservices": 8,
    "distributed systems": 8,
    "serverless": 7,
    "python": 6,
    "node.js": 6,
    "react": 5,
    "docker": 5,
    "kubernetes": 5,
    "ci/cd": 5,
    "devops": 5,
    "postgreSQL": 4,
    "flask": 4,
    "grpc": 4,
}

def analyze_text(text: str) -> dict:
    lowered = text.lower()
    score = 0
    matched = []

    for word, weight in KEYWORDS.items():
        if word in lowered:
            score += weight
            matched.append(word)

    max_score = sum(KEYWORDS.values())
    pct = round((score / max_score) * 100, 1) if max_score else 0

    improvements = []
    for word in KEYWORDS.keys():
        if word not in matched:
            improvements.append(f"Consider mentioning {word} if it reflects your real experience.")

    return {
        "score": pct,
        "matched_keywords": matched,
        "improvements": improvements[:10],
    }
