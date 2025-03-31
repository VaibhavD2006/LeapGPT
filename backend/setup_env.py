import os
import sys
import subprocess
import requests
import json

def check_openai_key():
    """Check if the OpenAI API key is set in the environment"""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("\n⚠️  OpenAI API key not found in environment variables.")
        print("You will need to set the OPENAI_API_KEY environment variable to use ChatGPT features.")
        print("The app will fall back to static templates if no API key is provided.\n")
        
        # Prompt user for API key
        key = input("Would you like to enter your OpenAI API key now? (paste key or leave empty to skip): ").strip()
        if key:
            os.environ["OPENAI_API_KEY"] = key
            print("✅ API key set for this session.")
            return True
        else:
            print("⚠️ No API key provided. Continuing with static templates.")
            return False
    else:
        print("✅ OpenAI API key found in environment variables.")
        return True

def run_backend_test():
    """Test the backend API"""
    try:
        print("\nTesting backend API...")
        response = requests.get("http://localhost:8000/")
        if response.status_code == 200:
            print("✅ Backend is running and accessible.")
            
            # Test build plan endpoint
            print("\nTesting build plan endpoint with ChatGPT...")
            data = {"idea": "An AI-powered fitness app for personalized workouts"}
            response = requests.post("http://localhost:8000/build-plan", json=data)
            
            if response.status_code == 200:
                result = response.json()
                print("✅ Build plan endpoint working.")
                
                # Check if using ChatGPT or fallback
                if result.get("source") == "chatgpt":
                    print("✅ ChatGPT integration is working correctly.")
                    print("\nSample of the response:")
                    content = result.get("content", "")
                    print(f"\n{content[:300]}...\n")
                else:
                    print("⚠️ Using fallback templates. ChatGPT integration not active.")
            else:
                print(f"❌ Build plan endpoint error: {response.status_code}")
                print(response.text)
        else:
            print(f"❌ Backend not accessible: {response.status_code}")
    except Exception as e:
        print(f"❌ Error testing backend: {str(e)}")

def main():
    """Main function to set up the environment"""
    print("====== LeapGPT Environment Setup ======")
    
    # Check for OpenAI API key
    has_api_key = check_openai_key()
    
    # Check if backend is running
    try:
        response = requests.get("http://localhost:8000/")
        backend_running = response.status_code == 200
    except:
        backend_running = False
    
    if not backend_running:
        print("\n⚠️ Backend server doesn't appear to be running.")
        start = input("Would you like to start the backend server now? (y/n): ").lower()
        if start.startswith('y'):
            print("\nStarting backend server...")
            print("(Note: This will open in a new terminal window/tab)")
            
            # Command to start backend server based on platform
            if sys.platform == 'win32':
                cmd = ["start", "cmd", "/c", "cd", "backend", "&&", "python", "-m", "uvicorn", "app:app", "--reload"]
                subprocess.run(cmd, shell=True)
            else:
                cmd = ["cd backend && python -m uvicorn app:app --reload"]
                subprocess.Popen(cmd, shell=True)
            
            print("\nBackend server starting...")
            print("Please wait a moment for the server to initialize.")
            input("Press Enter to continue when the server is running...")
            
            # Test the backend
            run_backend_test()
        else:
            print("\nSkipping backend server startup.")
    else:
        print("\n✅ Backend server is already running.")
        run_backend_test()
    
    print("\n====== Setup Complete ======")
    print("\nReminders:")
    print("1. Make sure both frontend and backend are running")
    print("2. Frontend should be accessible at: http://localhost:3000")
    print("3. Backend API is at: http://localhost:8000")
    if not has_api_key:
        print("4. ⚠️ Set OPENAI_API_KEY environment variable for full functionality")
    print("\nEnjoy using LeapGPT!")

if __name__ == "__main__":
    main() 