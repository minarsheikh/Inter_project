from sentence_transformers import SentenceTransformer
import chromadb

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("docs")

def chunk_text(text, chunk_size=500):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def process_document(document_text, doc_id):
    chunks = chunk_text(document_text)
    embeddings = model.encode(chunks)
    for i, emb in enumerate(embeddings):
        collection.add(documents=[f"{doc_id}-{i}"], embeddings=[emb], metadatas=[{"doc_id": doc_id, "chunk": i}])
    return len(chunks)

def query_document(question, top_k=3):
    q_emb = model.encode([question])[0]
    results = collection.query(query_embeddings=[q_emb], n_results=top_k)
    return results["documents"][0]
