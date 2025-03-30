import os
from openai import OpenAI
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pinecone import Pinecone, ServerlessSpec

# Load environment variables
load_dotenv()

# Set paths
DATA_PATH = os.path.join(os.path.dirname(__file__), "data")

# Ensure data directory exists
os.makedirs(DATA_PATH, exist_ok=True)

# Initialize OpenAI client
openai_client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = "leapgpt"

# Create or connect to Pinecone index
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=1536,  # 1536 is the dimension of OpenAI embeddings
        metric='cosine',
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'
        )
    )
index = pc.Index(index_name)

# Load and split PDFs
def load_and_split_pdfs():
    loader = PyPDFDirectoryLoader(DATA_PATH)
    raw_documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        length_function=len,
        is_separator_regex=False,
    )
    return text_splitter.split_documents(raw_documents)

# Generate embeddings using OpenAI
def generate_embedding(text):
    response = openai_client.embeddings.create(
        input=text,
        model="text-embedding-3-large"
    )
    return response.data[0].embedding

# Insert documents into Pinecone
def fill_pinecone():
    chunks = load_and_split_pdfs()
    
    # Prepare vectors in batches of 100 to avoid potential request size limits
    batch_size = 100
    for i in range(0, len(chunks), batch_size):
        batch_chunks = chunks[i:i+batch_size]
        vectors_to_upsert = []
        
        for j, chunk in enumerate(batch_chunks):
            embedding = generate_embedding(chunk.page_content)
            vector_id = f"id_{i+j}"
            vectors_to_upsert.append({
                "id": vector_id,
                "values": embedding,
                "metadata": {
                    "text": chunk.page_content,
                    "source": chunk.metadata.get("source", "unknown")
                }
            })
        
        # Upsert the batch
        if vectors_to_upsert:
            index.upsert(vectors=vectors_to_upsert, namespace="default")
            print(f"Upserted batch of {len(vectors_to_upsert)} vectors")
    
    print(f"Inserted {len(chunks)} chunks into Pinecone.")

if __name__ == "__main__":
    fill_pinecone()