from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PolishRequest(BaseModel):
    idea: str
    mode: str

@app.post("/polish")
def polish_idea(req: PolishRequest):
    # This is mock logic. Replace with your logic as needed!
    if req.mode == "pitch":
        result = f"Polished Pitch: {req.idea}"
    elif req.mode == "slides":
        result = f"Slide Outline: {req.idea}"
    elif req.mode == "feedback":
        result = f"Feedback: {req.idea}"
    else:
        result = "Unknown mode."
    return {"result": result}