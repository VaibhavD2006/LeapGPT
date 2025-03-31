from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Any, Optional
import json
import os
import traceback
import logging
import openai

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import agents
from agents.build_agent import generate_build_plan
from agents.longevity_agent import predict_longevity
from agents.market_agent import analyze_market

# Configure OpenAI API
openai.api_key = os.environ.get("OPENAI_API_KEY", "")
if not openai.api_key:
    logger.warning("OPENAI_API_KEY environment variable not set. ChatGPT features will not work.")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input models
class ChatRequest(BaseModel):
    query: str

class IdeaRequest(BaseModel):
    idea: str
    additional_context: Optional[Dict[str, Any]] = None
    conversation_history: Optional[List[Dict[str, Any]]] = None  # Chat history for context

def call_chatgpt_api(prompt, system_message=None, conversation_history=None):
    """Call the ChatGPT API with the given prompt and return the response."""
    try:
        if not openai.api_key:
            return {"error": "OpenAI API key not configured"}
        
        messages = []
        
        # Add system message if provided
        if system_message:
            messages.append({"role": "system", "content": system_message})
            
        # Add conversation history if provided
        if conversation_history:
            for message in conversation_history:
                if message.get("role") and message.get("content"):
                    messages.append({
                        "role": message["role"],
                        "content": message["content"]
                    })
        
        # Add the main prompt
        messages.append({"role": "user", "content": prompt})
        
        # Call the API
        response = openai.chat.completions.create(
            model="gpt-4-turbo",  # Use an appropriate model
            messages=messages,
            temperature=0.7,
            max_tokens=2500
        )
        
        return {"response": response.choices[0].message.content}
    except Exception as e:
        logger.error(f"Error calling ChatGPT API: {str(e)}")
        return {"error": str(e)}

@app.get("/")
def read_root():
    return {"message": "Welcome to LeapGPT API"}

@app.post("/chat")
async def chat(request: ChatRequest):
    """
    Process a chat message and return a response.
    """
    try:
        logger.info(f"Chat request received: {request.query[:100]}...")
        # In a production environment, this would connect to a chat model
        sample_responses = [
            "Based on my analysis, there are three key market opportunities in this space...",
            "The technology landscape is rapidly evolving in this sector, with AI integration being a key differentiator...",
            "Several venture capital firms have shown interest in this market recently, indicating growing investor confidence...",
            "Consumer trends suggest a shift towards more personalized and sustainable options in this category..."
        ]
        
        # Simple response for now - would be replaced with actual NLP/chatbot logic
        import random
        response_text = random.choice(sample_responses)
        logger.info("Chat response generated successfully")
        
        return {"response": response_text}
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/build-plan")
async def build_plan(request: IdeaRequest):
    """
    Generate a build plan for a business idea using ChatGPT
    """
    try:
        logger.info(f"Build plan request received for idea: {request.idea[:100]}...")
        
        # If ChatGPT is enabled, use it for dynamic analysis
        if openai.api_key:
            system_message = """You are a business and startup expert who provides detailed, actionable build plans.
            Analyze the business idea and provide a comprehensive plan for building the business from scratch. 
            Include: 
            1. Timelines with specific durations for MVP, beta, and launch phases
            2. Step-by-step instructions with clear phases
            3. Recommended technology stack and tools
            4. Resources required (team members, estimated costs)
            5. Similar projects or case studies for reference
            6. Potential pivots or alternative strategies
            
            Format your response in a clean, structured markdown format with clear headings and bullet points.
            Make it specific to the exact type of business (tech startup, service business, retail, etc.).
            For tech businesses, include specific technologies. For physical businesses, include regulatory and location considerations."""
            
            # Build context from conversation history if available
            context = ""
            if request.conversation_history:
                for message in request.conversation_history:
                    if message.get("role") == "user" and message.get("content"):
                        context += f"User mentioned: {message['content']}\n"
            
            # Create the prompt
            prompt = f"""Business Idea: {request.idea}

            {context if context else ""}
            
            Please create a detailed build plan for this business idea, following the format specified in the system message.
            Include specific steps, timelines, resources needed, and technologies required."""
            
            result = call_chatgpt_api(prompt, system_message, request.conversation_history)
            
            # Check if there's an error
            if "error" in result:
                logger.error(f"Error calling ChatGPT: {result['error']}")
                # Fall back to the static template
                result = generate_build_plan(request.idea, request.additional_context)
                result["source"] = "fallback_template"
            else:
                # Process the ChatGPT response
                content = result["response"]
                result = {
                    "source": "chatgpt",
                    "content": content,
                    "raw_content": content
                }
            
        else:
            # Use the static template as fallback
            result = generate_build_plan(request.idea, request.additional_context)
            result["source"] = "static_template"
        
        logger.info("Build plan generated successfully")
        return result
    except Exception as e:
        logger.error(f"Error in build-plan endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/longevity-prediction")
async def longevity_prediction(request: IdeaRequest):
    """
    Predict the market longevity of a business idea using ChatGPT
    """
    try:
        logger.info(f"Longevity prediction request received for idea: {request.idea[:100]}...")
        
        # If ChatGPT is enabled, use it for dynamic analysis
        if openai.api_key:
            system_message = """You are a market research and trend analysis expert who provides detailed longevity predictions for business ideas.
            Analyze the business idea and predict its market longevity, providing a comprehensive analysis.
            Include:
            1. Overall longevity score (out of 100)
            2. Market windows and optimal timing
            3. Trend analysis with data points
            4. Historical analogs or similar business trajectories
            5. Adoption curve prediction over 5 years
            6. Market factors that could affect longevity
            
            Format your response in a clean, structured markdown format with clear headings and bullet points.
            Use a data-driven approach with specific metrics and predictions."""
            
            # Build context from conversation history if available
            context = ""
            if request.conversation_history:
                for message in request.conversation_history:
                    if message.get("role") == "user" and message.get("content"):
                        context += f"User mentioned: {message['content']}\n"
            
            # Create the prompt
            prompt = f"""Business Idea: {request.idea}

            {context if context else ""}
            
            Please create a detailed market longevity prediction for this business idea, following the format specified in the system message.
            Include specific metrics, trend analysis, and predictions."""
            
            result = call_chatgpt_api(prompt, system_message, request.conversation_history)
            
            # Check if there's an error
            if "error" in result:
                logger.error(f"Error calling ChatGPT: {result['error']}")
                # Fall back to the static template
                result = predict_longevity(request.idea, request.additional_context)
                result["source"] = "fallback_template"
            else:
                # Process the ChatGPT response
                content = result["response"]
                result = {
                    "source": "chatgpt",
                    "content": content,
                    "raw_content": content
                }
                
        else:
            # Use the static template as fallback
            result = predict_longevity(request.idea, request.additional_context)
            result["source"] = "static_template"
        
        logger.info("Longevity prediction generated successfully")
        return result
    except Exception as e:
        logger.error(f"Error in longevity-prediction endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/market-analysis")
async def market_analysis(request: IdeaRequest):
    """
    Analyze the market for a business idea using ChatGPT
    """
    try:
        logger.info(f"Market analysis request received for idea: {request.idea[:100]}...")
        
        # If ChatGPT is enabled, use it for dynamic analysis
        if openai.api_key:
            system_message = """You are a consumer market analysis expert who provides detailed market analysis for business ideas.
            Analyze the business idea and provide a comprehensive market analysis.
            Include:
            1. Target market segments with demographics
            2. Total addressable market size and value
            3. Consumer pain points and needs
            4. Geographic insights and regional opportunities
            5. Feature recommendations based on market needs
            6. Consumer sentiment overview
            
            Format your response in a clean, structured markdown format with clear headings and bullet points.
            Use a data-driven approach with specific metrics and insights."""
            
            # Build context from conversation history if available
            context = ""
            if request.conversation_history:
                for message in request.conversation_history:
                    if message.get("role") == "user" and message.get("content"):
                        context += f"User mentioned: {message['content']}\n"
            
            # Create the prompt
            prompt = f"""Business Idea: {request.idea}

            {context if context else ""}
            
            Please create a detailed consumer market analysis for this business idea, following the format specified in the system message.
            Include specific demographics, market sizes, pain points, and recommendations."""
            
            result = call_chatgpt_api(prompt, system_message, request.conversation_history)
            
            # Check if there's an error
            if "error" in result:
                logger.error(f"Error calling ChatGPT: {result['error']}")
                # Fall back to the static template
                result = analyze_market(request.idea, request.additional_context)
                result["source"] = "fallback_template"
            else:
                # Process the ChatGPT response
                content = result["response"]
                result = {
                    "source": "chatgpt",
                    "content": content,
                    "raw_content": content
                }
                
        else:
            # Use the static template as fallback
            result = analyze_market(request.idea, request.additional_context)
            result["source"] = "static_template"
        
        logger.info("Market analysis generated successfully")
        return result
    except Exception as e:
        logger.error(f"Error in market-analysis endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True) 