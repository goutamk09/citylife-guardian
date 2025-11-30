# backend/app/ai.py
# Very small deterministic "classifier" - checks description/filename for keywords
def predict_category(description: str = "", filename: str = "") -> str:
    text = (description or "") + " " + (filename or "")
    t = text.lower()

    if any(k in t for k in ["pothole", "road", "crack", "hole"]):
        return "Pothole"
    if any(k in t for k in ["light", "lamp", "streetlight", "bulb"]):
        return "Streetlight"
    if any(k in t for k in ["garbage", "trash", "dump", "waste"]):
        return "Garbage"
    if any(k in t for k in ["water", "leak", "flood", "pipe"]):
        return "Water Leak"
    # fallback
    return "Other"
