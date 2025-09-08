import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the API key from environment variables
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("Error: GEMINI_API_KEY not found in environment variables.")
    model = None
else:
    try:
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')
    except Exception as e:
        print(f"Error configuring Generative AI: {e}")
        model = None

class AspirationRequest(BaseModel):
    aspiration: str

@app.post("/generate-roadmap")
async def generate_roadmap(request: AspirationRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Generative AI model not initialized. Check your API key.")

    prompt = f"""
    I want to achieve the following aspiration: "{request.aspiration}"

    Please provide a detailed roadmap to achieve this goal.
    Include:
    - Key steps and milestones
    - Recommended resources (books, websites, courses)
    - Important skills to learn
    - Suggested timeline for each step
    - Tips for staying motivated and overcoming common challenges

    Format the response in a clear, structured way. Use markdown for formatting.
    """
    try:
        response = model.generate_content(prompt)
        return {"roadmap": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred with the AI service: {e}")