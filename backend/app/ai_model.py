# backend/app/ai_model.py
# lightweight deterministic classifier (safe, fast).
# Later you can replace this with a real ML model.
def classify_image(description: str = "", filename: str = "") -> dict:
    text = (description or "") + " " + (filename or "")
    t = text.lower()
    # basic rules
    if any(k in t for k in ["pothole", "crack", "hole", "road"]):
        return {"category": "Pothole", "confidence": 0.90, "severity": 3, "model_version": "rule-v1"}
    if any(k in t for k in ["light", "lamp", "streetlight", "bulb"]):
        return {"category": "Streetlight", "confidence": 0.9, "severity": 2, "model_version": "rule-v1"}
    if any(k in t for k in ["garbage", "trash", "dump"]):
        return {"category": "Garbage", "confidence": 0.88, "severity": 1, "model_version": "rule-v1"}
    if any(k in t for k in ["water", "leak", "flood", "pipe"]):
        return {"category": "Water Leak", "confidence": 0.92, "severity": 4, "model_version": "rule-v1"}
    # default
    return {"category": "Other", "confidence": 0.5, "severity": 1, "model_version": "rule-v1"}
