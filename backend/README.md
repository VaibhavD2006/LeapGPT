# LeapGPT Backend

This is the backend for LeapGPT, a RAG/LLM Chatbot trained on data from consulting firms, focusing on white papers containing information about consumer markets, future billion-dollar markets, and product market fit ideas.

## Getting Started

Follow these instructions to set up and run the backend API.

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- OpenAI API key
- Pinecone API key and index

### Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up environment variables:

Create a `.env` file in the backend directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

3. Run the FastAPI server:

```bash
uvicorn ask:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at http://localhost:8000.

## API Endpoints

- `GET /` - Health check
- `POST /chat` - Chat endpoint
  - Request body: `{ "query": "Your question here" }`
  - Response: `{ "response": "AI response here" }`

## Features

- RAG (Retrieval-Augmented Generation) architecture
- Integration with OpenAI's GPT model
- Vector search using Pinecone
- FastAPI for efficient API development

## Data

The system uses a collection of white papers from consulting firms stored in vector embeddings in Pinecone. The data has already been processed and stored in the Pinecone index. 