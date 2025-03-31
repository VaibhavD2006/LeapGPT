import os
from typing import Dict, List, Any, Optional
import json
from datetime import datetime, timedelta
import random

def analyze_google_trends(idea: str) -> Dict[str, Any]:
    """
    Analyze Google Trends for a given idea
    In a production environment, this would use the Google Trends API
    """
    # Simulated trend analysis
    keywords = idea.lower().split()
    
    trends = {}
    for keyword in keywords:
        if keyword in ['ai', 'machine', 'learning', 'ml', 'artificial']:
            trends[keyword] = {'score': random.uniform(75, 95), 'growth': random.uniform(1.3, 2.0)}
        elif keyword in ['blockchain', 'crypto', 'nft', 'web3']:
            trends[keyword] = {'score': random.uniform(50, 70), 'growth': random.uniform(0.7, 1.1)}
        elif keyword in ['health', 'wellness', 'fitness']:
            trends[keyword] = {'score': random.uniform(80, 90), 'growth': random.uniform(1.1, 1.5)}
        elif keyword in ['social', 'network', 'community']:
            trends[keyword] = {'score': random.uniform(60, 75), 'growth': random.uniform(0.8, 1.2)}
        else:
            trends[keyword] = {'score': random.uniform(40, 85), 'growth': random.uniform(0.9, 1.4)}
    
    # Calculate overall trend score (weighted average)
    overall_score = sum(data['score'] for data in trends.values()) / max(1, len(trends))
    overall_growth = sum(data['growth'] for data in trends.values()) / max(1, len(trends))
    
    trend_data = {
        'keywords': trends,
        'overall_score': round(overall_score, 1),
        'overall_growth': round(overall_growth, 2),
        'period': '5 years'
    }
    
    return trend_data

def find_analog(idea: str, dataset: str) -> Dict[str, Any]:
    """
    Find historical analogs for the idea
    In a production environment, this would search a database of historical market patterns
    """
    # Simplified pattern matching
    idea_lower = idea.lower()
    
    # Identify the market category
    if any(word in idea_lower for word in ['ai', 'machine learning', 'ml', 'algorithm']):
        category = "AI"
        historical_analog = {
            "name": "Voice Assistants (2016)",
            "peak_year": 2018,
            "plateau_year": 2021,
            "peak_adoption": 65,
            "market_cap": "$140B",
            "consolidation": True
        }
    elif any(word in idea_lower for word in ['crypto', 'blockchain', 'token', 'nft', 'web3']):
        category = "Blockchain"
        historical_analog = {
            "name": "Cryptocurrencies (2017)",
            "peak_year": 2021,
            "plateau_year": 2023,
            "peak_adoption": 35,
            "market_cap": "$2.5T",
            "consolidation": True
        }
    elif any(word in idea_lower for word in ['vr', 'ar', 'virtual reality', 'augmented']):
        category = "XR"
        historical_analog = {
            "name": "VR Headsets (2016)",
            "peak_year": 2022,
            "plateau_year": 2025,
            "peak_adoption": 28,
            "market_cap": "$80B",
            "consolidation": False
        }
    elif any(word in idea_lower for word in ['health', 'wellness', 'fitness', 'medical']):
        category = "Health Tech"
        historical_analog = {
            "name": "Fitness Trackers (2014)",
            "peak_year": 2019,
            "plateau_year": 2022,
            "peak_adoption": 55,
            "market_cap": "$60B",
            "consolidation": True
        }
    else:
        category = "Digital Services"
        historical_analog = {
            "name": "Subscription Apps (2018)",
            "peak_year": 2022,
            "plateau_year": 2025,
            "peak_adoption": 48,
            "market_cap": "$120B",
            "consolidation": False
        }
    
    return {
        "category": category,
        "historical_analog": historical_analog
    }

def llm_predict_adoption(historical_analog: Dict[str, Any]) -> Dict[str, Any]:
    """
    Predict adoption curve based on historical analog
    In a production environment, this would use an LLM to generate predictions
    """
    # Simplified adoption curve generation
    analog = historical_analog["historical_analog"]
    category = historical_analog["category"]
    
    # Current year
    current_year = datetime.now().year
    
    # Generate adoption curve for the next 5 years
    adoption_curve = []
    max_adoption = analog["peak_adoption"] * random.uniform(0.8, 1.2)  # Vary the max adoption
    
    # Generate a 5-year curve
    for i in range(5):
        year = current_year + i
        
        # Simplified S-curve calculation
        if i <= 1:  # Early adoption phase
            adoption = max_adoption * (0.2 * (i+1))
        elif i == 2:  # Growth phase
            adoption = max_adoption * 0.5
        elif i == 3:  # Approaching peak
            adoption = max_adoption * 0.8
        else:  # Maturity phase
            adoption = max_adoption
        
        adoption_curve.append({
            "year": year,
            "adoption": round(adoption, 1)
        })
    
    # Calculate risk factors
    market_factors = [
        {
            "factor": "Competition Intensity",
            "score": random.randint(5, 10) if category in ["AI", "Digital Services"] else random.randint(3, 8),
            "impact": "high" if category in ["AI", "Digital Services"] else "medium"
        },
        {
            "factor": "Regulatory Risk",
            "score": random.randint(7, 10) if category in ["Health Tech", "AI"] else random.randint(2, 6),
            "impact": "high" if category in ["Health Tech"] else "medium"
        },
        {
            "factor": "Technology Obsolescence",
            "score": random.randint(6, 9) if category in ["XR"] else random.randint(3, 7),
            "impact": "high" if category in ["XR"] else "medium"
        }
    ]
    
    # Market saturation timeline
    years_to_saturation = random.randint(3, 7)
    saturation_threshold = random.randint(65, 90)
    
    return {
        "adoption_curve": adoption_curve,
        "market_factors": market_factors,
        "years_to_saturation": years_to_saturation,
        "saturation_threshold": saturation_threshold
    }

def predict_longevity(idea: str, additional_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Predict market longevity for a business idea
    
    Args:
        idea: The business idea to analyze
        additional_context: Additional context or requirements for the idea
        
    Returns:
        A dictionary containing the longevity prediction, adoption curve, market factors, etc.
    """
    # Trend analysis
    trend_score = analyze_google_trends(idea)
    
    # Compare to historical patterns (e.g., "VR in 2016")
    historical_analog = find_analog(idea, dataset="market_cycles")
    
    # Predict adoption curve
    curve = llm_predict_adoption(historical_analog)
    
    # Calculate longevity score (0-100)
    base_score = trend_score["overall_score"]
    growth_multiplier = trend_score["overall_growth"]
    competition_penalty = sum(factor["score"] for factor in curve["market_factors"]) / (10 * len(curve["market_factors"]))
    
    longevity_score = min(100, max(0, base_score * growth_multiplier * (1 - competition_penalty * 0.3)))
    
    # Generate marketing windows
    current_year = datetime.now().year
    marketing_windows = [
        {
            "phase": "Early Adopters",
            "year_range": f"{current_year}-{current_year + 1}",
            "strategy": "Focus on tech enthusiasts and innovators",
            "positioning": "Emphasize the novelty and cutting-edge nature"
        },
        {
            "phase": "Growth Phase",
            "year_range": f"{current_year + 2}-{current_year + 3}",
            "strategy": "Expand to mainstream audiences",
            "positioning": "Highlight practical benefits and ease of use"
        },
        {
            "phase": "Maturity",
            "year_range": f"{current_year + 4}+",
            "strategy": "Focus on differentiation and loyalty",
            "positioning": "Emphasize quality, reliability, and community"
        }
    ]
    
    # Combine all results
    return {
        "longevity_score": round(longevity_score, 1),
        "trend_data": trend_score,
        "historical_analog": historical_analog,
        "adoption_curve": curve["adoption_curve"],
        "market_factors": curve["market_factors"],
        "years_to_saturation": curve["years_to_saturation"],
        "saturation_threshold": curve["saturation_threshold"],
        "marketing_windows": marketing_windows
    } 