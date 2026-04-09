import os
import re

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

from sentence_transformers import CrossEncoder

from neo4j import GraphDatabase
from groq import Groq

INDEX_PATH = "../data/faiss_index"

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

embedding_model = None
reranker = None
vector_store = None

driver = GraphDatabase.driver(
    "bolt://127.0.0.1:7687",
    auth=("neo4j", "12345678")
)

def load_models():
    global embedding_model, reranker

    if embedding_model is None:
        embedding_model = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        reranker = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

def clean_text(text):
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

# 🔥 FINAL SMART FILTER
def is_valid_text(text):
    t = text.lower()

    # remove garbage
    if any(x in t for x in ["tel:", "fax", "www.", "http", "@"]):
        return False

    # remove training junk (CRITICAL FIX)
    BAD = [
        "learning objective",
        "syllabus",
        "training",
        "module",
        "course",
        "exercise",
        "assessment"
    ]

    if any(b in t for b in BAD):
        return False

    if len(t) < 60:
        return False

    return True

def load_documents():
    global vector_store

    load_models()

    vector_store = FAISS.load_local(
        INDEX_PATH,
        embedding_model,
        allow_dangerous_deserialization=True
    )

    print("FAISS loaded")

# 🔥 FINAL RETRIEVAL
def retrieve(query, top_k=5):

    load_models()

    query_clean = clean_text(query)

    # force definition intent
    if "what is" in query.lower():
        query_clean += "official definition SOLAS convention maritime safety definition"
    if "solas" in query.lower():
        query_clean += " SOLAS convention international maritime organization safety of life at sea"

    # boost important terms
    important_terms = [w.upper() for w in query_clean.split() if len(w) > 3]

    boosted_query = query_clean + " " + " ".join(important_terms)

    dense_docs = vector_store.similarity_search(
        boosted_query,
        k=top_k * 10
    )

    filtered = []

    for d in dense_docs:
        txt = clean_text(d.page_content)

        if not is_valid_text(txt):
            continue

        filtered.append(d)

    if not filtered:
        filtered = dense_docs[:top_k]

    # rerank
    pairs = [(query_clean, d.page_content[:500]) for d in filtered]
    scores = reranker.predict(pairs)

    ranked = sorted(
        zip(scores, filtered),
        key=lambda x: x[0],
        reverse=True
    )

    results = ranked[:top_k]

    contexts = []

    for i, (score, doc) in enumerate(results):
        text = clean_text(doc.page_content)

        contexts.append({
            "rank": i + 1,
            "text": text[:250],
            "score": round(float(score), 2),
            "source": doc.metadata.get("source", "unknown"),
            "page": doc.metadata.get("page", "N/A")
        })

    return contexts, [], []

def generate_answer(question, contexts):

    context_text = "\n\n".join([c["text"] for c in contexts[:3]])

    prompt = f"""
Answer clearly in 2 sentences.
Do not copy context.

Context:
{context_text}

Question:
{question}

Answer:
"""

    res = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=120
    )

    return res.choices[0].message.content.strip()