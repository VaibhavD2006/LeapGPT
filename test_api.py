import requests
import json

def test_root():
    try:
        response = requests.get("http://localhost:8000/")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error connecting to root endpoint: {e}")
        return False

def test_build_plan():
    try:
        data = {"idea": "An AI-powered fitness app for personalized workouts"}
        response = requests.post("http://localhost:8000/build-plan", json=data)
        print(f"Status code: {response.status_code}")
        if response.status_code == 200:
            print("Build plan API is working!")
            # Print just the first few keys to keep output manageable
            print(f"Response keys: {list(response.json().keys())}")
        else:
            print(f"Error response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error connecting to build-plan endpoint: {e}")
        return False

if __name__ == "__main__":
    print("Testing API connectivity...")
    root_ok = test_root()
    build_ok = test_build_plan()
    
    if root_ok and build_ok:
        print("All API tests passed!")
    else:
        print("Some API tests failed. See details above.") 