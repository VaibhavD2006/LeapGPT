import os
from typing import Dict, List, Any, Optional
import json
import random
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_segments(idea: str) -> List[Dict[str, Any]]:
    """
    Generate target market segments for the business idea
    """
    logger.info(f"Generating market segments for idea: {idea[:100]}...")
    
    # Base segments with variations based on the idea
    segments = []
    
    if "fitness" in idea.lower() or "health" in idea.lower() or "wellness" in idea.lower():
        segments = [
            {
                "name": "Health-Conscious Professionals",
                "age_range": "25-40",
                "gender_ratio": {"male": 45, "female": 55},
                "income": "Upper-middle to high",
                "market_size": 6500000,
                "market_percentage": 35,
                "targeting_priority": "High"
            },
            {
                "name": "Active Retirees",
                "age_range": "55-70",
                "gender_ratio": {"male": 40, "female": 60},
                "income": "Middle to upper-middle",
                "market_size": 4200000,
                "market_percentage": 22,
                "targeting_priority": "Medium"
            },
            {
                "name": "Fitness Enthusiasts",
                "age_range": "18-35",
                "gender_ratio": {"male": 50, "female": 50},
                "income": "Varied",
                "market_size": 8100000,
                "market_percentage": 43,
                "targeting_priority": "High"
            }
        ]
    elif "education" in idea.lower() or "learning" in idea.lower() or "students" in idea.lower():
        segments = [
            {
                "name": "College Students",
                "age_range": "18-24",
                "gender_ratio": {"male": 48, "female": 52},
                "income": "Low to middle",
                "market_size": 19500000,
                "market_percentage": 40,
                "targeting_priority": "High"
            },
            {
                "name": "Professional Learners",
                "age_range": "25-45",
                "gender_ratio": {"male": 55, "female": 45},
                "income": "Middle to high",
                "market_size": 24000000,
                "market_percentage": 50,
                "targeting_priority": "High"
            },
            {
                "name": "Lifelong Learners",
                "age_range": "46-65",
                "gender_ratio": {"male": 40, "female": 60},
                "income": "Upper-middle",
                "market_size": 4800000,
                "market_percentage": 10,
                "targeting_priority": "Medium"
            }
        ]
    else:
        segments = [
            {
                "name": "Early Adopters",
                "age_range": "25-40",
                "gender_ratio": {"male": 60, "female": 40},
                "income": "Upper-middle to high",
                "market_size": 5200000,
                "market_percentage": 32,
                "targeting_priority": "High"
            },
            {
                "name": "Mainstream Consumers",
                "age_range": "30-55",
                "gender_ratio": {"male": 50, "female": 50},
                "income": "Middle",
                "market_size": 9800000,
                "market_percentage": 58,
                "targeting_priority": "Medium"
            },
            {
                "name": "Value Seekers",
                "age_range": "35-65",
                "gender_ratio": {"male": 45, "female": 55},
                "income": "Middle to lower-middle",
                "market_size": 1800000,
                "market_percentage": 10,
                "targeting_priority": "Low"
            }
        ]
    
    return segments

def calculate_market_size(segments: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Calculate the total addressable market size based on segments
    """
    logger.info("Calculating market size")
    
    total_users = sum(segment["market_size"] for segment in segments)
    
    # Generate ARPU (Average Revenue Per User) based on segments
    high_income_segments = [s for s in segments if "high" in s["income"].lower()]
    middle_income_segments = [s for s in segments if "middle" in s["income"].lower()]
    
    base_arpu = 10  # Base ARPU value
    
    # Adjust ARPU based on income levels in segments
    if high_income_segments and len(high_income_segments) / len(segments) > 0.5:
        arpu = base_arpu * 2.5  # Higher ARPU for high-income segments
    elif middle_income_segments and len(middle_income_segments) / len(segments) > 0.5:
        arpu = base_arpu * 1.5  # Medium ARPU for middle-income segments
    else:
        arpu = base_arpu  # Lower ARPU for other segments
    
    # Calculate TAM (Total Addressable Market)
    tam = total_users * arpu
    
    return {
        "total_users": total_users,
        "arpu": arpu,
        "tam": tam,
        "currency": "USD"
    }

def identify_pain_points(idea: str) -> List[Dict[str, Any]]:
    """
    Identify common pain points for the business idea
    """
    logger.info(f"Identifying pain points for idea: {idea[:100]}...")
    
    # Generic pain points
    generic_pain_points = [
        {
            "issue": "Time constraints",
            "sentiment_score": -7.2,
            "frequency": 450,
            "impact": "High",
            "typical_quote": "I never have enough time to properly research and compare options."
        },
        {
            "issue": "Cost concerns",
            "sentiment_score": -6.8,
            "frequency": 380,
            "impact": "High",
            "typical_quote": "Existing solutions are too expensive for what they offer."
        },
        {
            "issue": "Complexity",
            "sentiment_score": -7.5,
            "frequency": 320,
            "impact": "Medium",
            "typical_quote": "Current tools are too complicated and have a steep learning curve."
        }
    ]
    
    # Custom pain points based on idea keywords
    custom_pain_points = []
    
    if "fitness" in idea.lower() or "health" in idea.lower() or "workout" in idea.lower():
        custom_pain_points = [
            {
                "issue": "Lack of personalization",
                "sentiment_score": -8.1,
                "frequency": 520,
                "impact": "High",
                "typical_quote": "Generic workout plans don't account for my specific goals and limitations."
            },
            {
                "issue": "Motivation challenges",
                "sentiment_score": -7.8,
                "frequency": 480,
                "impact": "High",
                "typical_quote": "It's hard to stay motivated without proper guidance and accountability."
            }
        ]
    elif "education" in idea.lower() or "learning" in idea.lower():
        custom_pain_points = [
            {
                "issue": "Information overload",
                "sentiment_score": -7.3,
                "frequency": 410,
                "impact": "High",
                "typical_quote": "There's too much content and I don't know which sources to trust."
            },
            {
                "issue": "Lack of practical application",
                "sentiment_score": -8.2,
                "frequency": 350,
                "impact": "High",
                "typical_quote": "Most courses focus on theory without enough real-world application."
            }
        ]
    elif "ai" in idea.lower() or "machine learning" in idea.lower():
        custom_pain_points = [
            {
                "issue": "Technical barriers",
                "sentiment_score": -8.4,
                "frequency": 490,
                "impact": "High",
                "typical_quote": "AI tools require too much technical knowledge to use effectively."
            },
            {
                "issue": "Trust and reliability concerns",
                "sentiment_score": -7.6,
                "frequency": 430,
                "impact": "High",
                "typical_quote": "I'm not sure I can trust the outputs or understand how decisions are made."
            }
        ]
    
    # Combine generic and custom pain points
    pain_points = generic_pain_points + custom_pain_points
    
    return pain_points

def get_geographic_insights(idea: str) -> Dict[str, Any]:
    """
    Generate geographic insights for the business idea
    """
    logger.info(f"Generating geographic insights for idea: {idea[:100]}...")
    
    # Base countries with variations
    base_countries = [
        {
            "country": "United States",
            "region": "North America",
            "market_potential": 85,
            "growth_rate": "12% annually"
        },
        {
            "country": "United Kingdom",
            "region": "Europe",
            "market_potential": 78,
            "growth_rate": "9% annually"
        },
        {
            "country": "Germany",
            "region": "Europe",
            "market_potential": 76,
            "growth_rate": "7% annually"
        },
        {
            "country": "Australia",
            "region": "Oceania",
            "market_potential": 72,
            "growth_rate": "8% annually"
        },
        {
            "country": "Canada",
            "region": "North America",
            "market_potential": 79,
            "growth_rate": "10% annually"
        }
    ]
    
    # Customize based on the idea
    if "global" in idea.lower() or "international" in idea.lower():
        additional_countries = [
            {
                "country": "Japan",
                "region": "Asia",
                "market_potential": 81,
                "growth_rate": "6% annually"
            },
            {
                "country": "Singapore",
                "region": "Asia",
                "market_potential": 84,
                "growth_rate": "14% annually"
            },
            {
                "country": "Brazil",
                "region": "South America",
                "market_potential": 68,
                "growth_rate": "15% annually"
            }
        ]
        top_countries = base_countries + additional_countries
        # Randomize and take top 5
        random.shuffle(top_countries)
        top_countries = sorted(top_countries, key=lambda x: x["market_potential"], reverse=True)[:5]
    else:
        top_countries = base_countries[:5]
    
    return {
        "top_countries": top_countries,
        "emerging_markets": ["India", "Brazil", "Indonesia"],
        "saturated_markets": ["United States", "United Kingdom"]
    }

def generate_feature_recommendations(pain_points: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Generate feature recommendations based on pain points
    """
    logger.info("Generating feature recommendations based on pain points")
    
    recommendations = []
    
    for pain in pain_points:
        if "time" in pain["issue"].lower():
            recommendations.append({
                "feature": "One-click automation",
                "pain_point": pain["issue"],
                "priority": "High",
                "expected_impact": "Time savings of 30-40%"
            })
        elif "cost" in pain["issue"].lower():
            recommendations.append({
                "feature": "Tiered pricing model",
                "pain_point": pain["issue"],
                "priority": "Medium",
                "expected_impact": "Increased affordability for 40% more users"
            })
        elif "personalization" in pain["issue"].lower() or "generic" in pain["typical_quote"].lower():
            recommendations.append({
                "feature": "AI-powered customization",
                "pain_point": pain["issue"],
                "priority": "High",
                "expected_impact": "90% satisfaction increase in personalization metrics"
            })
        elif "motivation" in pain["issue"].lower():
            recommendations.append({
                "feature": "Gamification and rewards system",
                "pain_point": pain["issue"],
                "priority": "Medium",
                "expected_impact": "65% improvement in user retention"
            })
        elif "technical" in pain["issue"].lower():
            recommendations.append({
                "feature": "No-code interface",
                "pain_point": pain["issue"],
                "priority": "High",
                "expected_impact": "Opens product to 3x larger audience"
            })
        elif "trust" in pain["issue"].lower() or "reliability" in pain["issue"].lower():
            recommendations.append({
                "feature": "Transparent AI explanations",
                "pain_point": pain["issue"],
                "priority": "High",
                "expected_impact": "70% increase in user trust metrics"
            })
        else:
            recommendations.append({
                "feature": "24/7 Customer Support",
                "pain_point": pain["issue"],
                "priority": "Medium",
                "expected_impact": "50% reduction in customer complaints"
            })
    
    return recommendations

def get_sentiment_overview() -> Dict[str, int]:
    """
    Generate a simulated sentiment overview
    """
    logger.info("Generating sentiment overview")
    
    return {
        "Positive": 42,
        "Neutral": 31,
        "Negative": 18,
        "Extremely Positive": 6,
        "Extremely Negative": 3
    }

def analyze_market(idea: str, additional_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Analyze the consumer market for a business idea
    
    Args:
        idea: The business idea to analyze
        additional_context: Additional context or requirements for the idea
        
    Returns:
        A dictionary containing the market analysis, including segments, pain points, etc.
    """
    try:
        logger.info(f"Analyzing market for idea: {idea[:100]}...")
        
        # Generate target market segments
        segments = generate_segments(idea)
        
        # Calculate market size
        market_size = calculate_market_size(segments)
        
        # Identify common pain points
        pain_points = identify_pain_points(idea)
        
        # Generate geographic insights
        geographic_insights = get_geographic_insights(idea)
        
        # Generate feature recommendations based on pain points
        feature_recommendations = generate_feature_recommendations(pain_points)
        
        # Generate sentiment overview
        sentiment_overview = get_sentiment_overview()
        
        # Combine results
        result = {
            "segments": segments,
            "market_size": market_size,
            "pain_points": pain_points,
            "geographic_insights": geographic_insights,
            "feature_recommendations": feature_recommendations,
            "sentiment_overview": sentiment_overview
        }
        
        logger.info("Market analysis generated successfully")
        return result
    except Exception as e:
        logger.error(f"Error analyzing market: {str(e)}")
        # Return a minimal valid response with error information
        return {
            "segments": [],
            "market_size": {"total_users": 0, "arpu": 0, "tam": 0, "currency": "USD"},
            "pain_points": [],
            "geographic_insights": {"top_countries": []},
            "feature_recommendations": [],
            "sentiment_overview": {},
            "error": str(e)
        } 