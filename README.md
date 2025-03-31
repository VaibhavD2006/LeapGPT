# LeapGPT - Business Intelligence & Entrepreneurship Assistant

LeapGPT is an AI-powered business intelligence platform that helps entrepreneurs, founders, and business leaders analyze markets, validate ideas, and build successful ventures.

## Features

### Core Functionality
- **Chat Interface**: Interact with the AI assistant using natural language
- **RAG-Based Knowledge**: Access insights from leading consulting firms and market research databases
- **User Authentication**: Secure login with Google OAuth

### Agent-Based Analysis
- **How To Build**: Transform business ideas into executable steps with timelines and resource estimates
- **Longevity Predictor**: Forecast market viability using trend analysis and historical patterns
- **Consumer Market Analysis**: Identify target customer segments and unmet market needs
- **Competitive Landscape**: Analyze incumbent solutions and competitive advantage opportunities
- **Additional Tools**: Investment opportunities, risk assessment, trend forecasting, and startup validation

## Tech Stack

### Frontend
- Next.js 13+ with App Router
- TailwindCSS for styling
- NextAuth.js for authentication
- TypeScript for type safety

### Backend
- FastAPI for the Python backend
- MongoDB for database storage
- Agent-based architecture for specialized analyses

## Setup Instructions

### Prerequisites
- Node.js 16+
- Python 3.9+
- MongoDB instance
- Google OAuth credentials
- OpenAI API key

### Environment Setup

#### Frontend (.env.local)
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Backend (.env)
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
```

### Installation

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

## API Endpoints

### Chat
- `POST /chat`: Process natural language queries

### Agent Endpoints
- `POST /build-plan`: Generate a build plan for a business idea
- `POST /longevity-prediction`: Predict market longevity for a business concept
- `POST /market-analysis`: Analyze target market segments and pain points

## License
MIT License
