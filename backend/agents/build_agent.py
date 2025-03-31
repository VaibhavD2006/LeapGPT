import os
from typing import Dict, List, Any, Optional
import json
from datetime import datetime, timedelta
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Simulated RAG database functions
def rag_search(query: str, dataset: str) -> List[Dict[str, Any]]:
    """
    Search the RAG database for similar projects
    In a production environment, this would connect to a vector database like Weaviate
    """
    logger.info(f"RAG search for query: {query[:100]}...")
    # Simulated results for demonstration purposes
    if "app" in query.lower() or "platform" in query.lower():
        return [
            {
                "title": "Mobile Recipe App",
                "stack": ["React Native", "Firebase", "Node.js"],
                "timeline": {"mvp": 60, "beta": 90, "launch": 120},
                "resources": {"developers": 2, "designers": 1, "cost": "$15,000"}
            },
            {
                "title": "E-commerce Platform",
                "stack": ["Next.js", "MongoDB", "Express"],
                "timeline": {"mvp": 90, "beta": 120, "launch": 180},
                "resources": {"developers": 3, "designers": 2, "cost": "$28,000"}
            }
        ]
    elif "ai" in query.lower() or "ml" in query.lower():
        return [
            {
                "title": "AI Meal Planner",
                "stack": ["Python", "FastAPI", "React", "TensorFlow"],
                "timeline": {"mvp": 75, "beta": 120, "launch": 150},
                "resources": {"developers": 2, "data_scientists": 1, "designers": 1, "cost": "$22,000"}
            },
            {
                "title": "Document Analysis Tool",
                "stack": ["Python", "PyTorch", "Django", "React"],
                "timeline": {"mvp": 90, "beta": 135, "launch": 180},
                "resources": {"developers": 2, "data_scientists": 2, "designers": 1, "cost": "$35,000"}
            }
        ]
    else:
        return [
            {
                "title": "Subscription Service",
                "stack": ["Node.js", "Express", "React", "PostgreSQL"],
                "timeline": {"mvp": 45, "beta": 90, "launch": 120},
                "resources": {"developers": 2, "designers": 1, "cost": "$18,000"}
            },
            {
                "title": "Marketplace Platform",
                "stack": ["Ruby on Rails", "React", "PostgreSQL"],
                "timeline": {"mvp": 60, "beta": 105, "launch": 150},
                "resources": {"developers": 3, "designers": 1, "cost": "$25,000"}
            }
        ]

def llm_extract_template(similar_projects: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Extract common patterns from similar projects
    In a production environment, this would use an LLM to analyze the projects
    """
    logger.info("Extracting template from similar projects")
    # Very simplified analysis logic
    avg_mvp_days = sum(p["timeline"]["mvp"] for p in similar_projects) // len(similar_projects)
    avg_beta_days = sum(p["timeline"]["beta"] for p in similar_projects) // len(similar_projects)
    avg_launch_days = sum(p["timeline"]["launch"] for p in similar_projects) // len(similar_projects)
    
    # Create timeline with actual dates
    today = datetime.now()
    mvp_date = (today + timedelta(days=avg_mvp_days)).strftime("%Y-%m-%d")
    beta_date = (today + timedelta(days=avg_beta_days)).strftime("%Y-%m-%d")
    launch_date = (today + timedelta(days=avg_launch_days)).strftime("%Y-%m-%d")
    
    # Extract common tech stack
    all_tech = []
    for project in similar_projects:
        all_tech.extend(project["stack"])
    
    # Count occurrences and get top technologies
    tech_count = {}
    for tech in all_tech:
        tech_count[tech] = tech_count.get(tech, 0) + 1
    
    recommended_stack = sorted(tech_count.items(), key=lambda x: x[1], reverse=True)
    recommended_stack = [tech for tech, _ in recommended_stack[:4]]
    
    # Generate steps
    steps = [
        {"name": "Market Research & Validation", "start": today.strftime("%Y-%m-%d"), 
         "end": (today + timedelta(days=14)).strftime("%Y-%m-%d")},
        {"name": "Design & Prototyping", "start": (today + timedelta(days=10)).strftime("%Y-%m-%d"), 
         "end": (today + timedelta(days=30)).strftime("%Y-%m-%d")},
        {"name": "MVP Development", "start": (today + timedelta(days=25)).strftime("%Y-%m-%d"), 
         "end": mvp_date},
        {"name": "Beta Testing", "start": mvp_date, 
         "end": beta_date},
        {"name": "Launch Preparation", "start": beta_date, 
         "end": launch_date},
    ]
    
    return {
        "steps": steps,
        "timeline": {
            "mvp": mvp_date,
            "beta": beta_date,
            "launch": launch_date,
            # Add for compatibility with frontend
            "mvp_weeks": avg_mvp_days // 7,
            "beta_weeks": (avg_beta_days - avg_mvp_days) // 7,
            "launch_weeks": (avg_launch_days - avg_beta_days) // 7,
        },
        "recommended_stack": recommended_stack
    }

def predict_resources(idea: str, mvp_template: Dict[str, Any]) -> Dict[str, Any]:
    """
    Predict resources needed for the project
    In a production environment, this would use ML models trained on project data
    """
    logger.info("Predicting resources")
    # Very simplified resource estimation
    timeline_days = (datetime.strptime(mvp_template["timeline"]["launch"], "%Y-%m-%d") - 
                    datetime.now()).days
    
    # Base calculations
    complexity_factor = 1.0
    if "ai" in idea.lower() or "ml" in idea.lower():
        complexity_factor = 1.5
    
    developers = max(1, int(timeline_days / 45 * complexity_factor))
    designers = max(1, developers // 2)
    data_scientists = 1 if "ai" in idea.lower() or "ml" in idea.lower() or "data" in idea.lower() else 0
    
    # Cost estimation (very simplistic)
    dev_cost_per_day = 400  # $400 per day per developer
    designer_cost_per_day = 350  # $350 per day per designer
    ds_cost_per_day = 500  # $500 per day per data scientist
    
    total_cost = (developers * dev_cost_per_day * timeline_days + 
                 designers * designer_cost_per_day * timeline_days + 
                 data_scientists * ds_cost_per_day * timeline_days)
    
    return {
        "team": {
            "developers": developers,
            "designers": designers,
            "data_scientists": data_scientists
        },
        "cost": total_cost,
        "timeline_days": timeline_days,
        # For compatibility with frontend
        "developers": developers,
        "designers": designers,
        "data_scientists": data_scientists
    }

def generate_build_plan(idea: str, additional_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Generate a build plan for a business idea
    
    Args:
        idea: The business idea to analyze
        additional_context: Additional context or requirements for the idea
        
    Returns:
        A dictionary containing the build plan, including steps, timeline, resources, etc.
    """
    try:
        logger.info(f"Generating build plan for idea: {idea[:100]}...")
        # Step 1: Query RAG for similar case studies
        similar_projects = rag_search(idea, dataset="startup_playbooks")
        
        # Step 2: Extract common patterns (e.g., MVP stack, timelines)
        mvp_template = llm_extract_template(similar_projects)
        
        # Step 3: Generate resource estimates
        resources = predict_resources(idea, mvp_template)
        
        # Generate potential pivots
        pivots = [
            {
                "trigger": "If customer acquisition cost exceeds $50",
                "suggestion": f"Pivot from B2C to B2B for '{idea}'",
                "probability": 0.65
            },
            {
                "trigger": "If development timeline exceeds 6 months",
                "suggestion": f"Consider starting with a simpler version focusing only on core features",
                "probability": 0.78
            }
        ]
        
        # Combine results
        result = {
            "steps": mvp_template["steps"],
            "timeline": mvp_template["timeline"],
            "resources": resources,
            "recommended_stack": mvp_template["recommended_stack"],
            "potential_pivots": [pivot["suggestion"] for pivot in pivots],  # Format for frontend compatibility
            "similar_projects": similar_projects,
            "tech_stack": mvp_template["recommended_stack"]  # For frontend compatibility
        }
        logger.info("Build plan generated successfully")
        return result
    except Exception as e:
        logger.error(f"Error generating build plan: {str(e)}")
        # Return a minimal valid response with error information
        return {
            "steps": [],
            "timeline": {"mvp": "N/A", "beta": "N/A", "launch": "N/A", "mvp_weeks": 0, "beta_weeks": 0, "launch_weeks": 0},
            "resources": {"team": {}, "cost": 0, "developers": 0, "designers": 0, "data_scientists": 0},
            "recommended_stack": [],
            "tech_stack": [],
            "potential_pivots": [],
            "similar_projects": [],
            "error": str(e)
        } 