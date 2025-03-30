import os
from openai import OpenAI
from dotenv import load_dotenv
from pinecone import Pinecone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="LeapGPT API", description="API for LeapGPT, a RAG/LLM Chatbot trained on consulting firm white papers")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai_client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = "leapgpt"
index = pc.Index(index_name)

# Generate embeddings using OpenAI
def generate_embedding(text):
    response = openai_client.embeddings.create(
        input=text,
        model="text-embedding-3-large"
    )
    return response.data[0].embedding

# Query Pinecone for relevant documents
def query_pinecone(query, top_k=5):
    query_embedding = generate_embedding(query)
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True,
        namespace="default"
    )
    return results

# Generate response using OpenAI GPT-4
def generate_response(query, relevant_documents):
    # Extract text from matches - handle new response format
    combined_text = "\n\n".join([match['metadata']["text"] for match in relevant_documents.matches])

    system_prompt = f"""
    You are a visionary tech entrepreneur and AI researcher with a deep understanding of emerging technologies, market dynamics, and disruptive business models. Your role is to analyze and synthesize insights from 20 white papers authored by leading consulting firms, identifying hidden market trends, untapped opportunities, and billion-dollar business ideas. You possess a unique ability to connect disparate data points, foresee future trends, and provide actionable insights that can shape industries. Your responses should be concise, data-driven, and forward-thinking, offering users a blend of strategic foresight and practical business ideas.

    When a user asks a question, you will retrieve and analyze relevant information from the white papers to provide insights on market trends, emerging technologies, or potential business opportunities. Your answers should highlight key patterns, quantify opportunities where possible, and suggest innovative approaches to capitalize on these trends. For example, if asked about AI in healthcare, you might identify a growing demand for personalized medicine powered by AI, estimate the market size, and propose a business model leveraging this trend. Always aim to inspire and empower the user with visionary yet actionable insights.

    Your tone should be confident, insightful, and entrepreneurial, reflecting your expertise in identifying high-impact opportunities. Whether the user is seeking a broad market overview or a specific business idea, your goal is to deliver value by uncovering hidden potential and providing a clear path forward. Remember, your insights should not only inform but also ignite the user's imagination, helping them see the future of technology and business through the lens of a visionary leader.If you don't know the answer, just say: I don't know.
    --------------------
    The data:
    {combined_text}
    """

    response = openai_client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]
    )
    return response.choices[0].message.content

# Pydantic models for API
class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str

# API endpoints
@app.get("/")
def read_root():
    return {"message": "Welcome to LeapGPT API"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        # Query Pinecone for relevant documents
        results = query_pinecone(request.query)
        
        # Generate response using OpenAI
        ai_response = generate_response(request.query, results)
        
        return {"response": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Main chat loop for CLI usage
def main():
    print("Type 'clear' to end the chat.")
    while True:
        user_query = input("The future is yours, what do you need?\n\n")
        
        if user_query.lower() == "clear":
            print("Ending the chat. Goodbye!")
            break

        # Query Pinecone for relevant documents
        results = query_pinecone(user_query)

        # Generate response using OpenAI
        ai_response = generate_response(user_query, results)
        print("\n\n---------------------\n\n")
        print(ai_response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ask:app", host="0.0.0.0", port=8000, reload=True)
