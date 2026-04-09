import time
from neo4j import GraphDatabase

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from rag_pipeline import load_documents, retrieve, generate_answer

# =========================
# NEO4J DRIVER
# =========================

driver = GraphDatabase.driver(
    "bolt://127.0.0.1:7687",
    auth=("neo4j", "12345678")
)

# =========================
# FASTAPI APP
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# REQUEST MODEL
# =========================

class Query(BaseModel):
    question: str
    top_k: int = 5

# =========================
# STARTUP
# =========================

@app.on_event("startup")
def start():
    load_documents()

# =========================
# CHAT
# =========================

@app.post("/chat")
def chat(q: Query):

    start_time = time.time()

    contexts, _, _ = retrieve(q.question, q.top_k)
    answer = generate_answer(q.question, contexts)

    return {
        "answer": answer,
        "contexts": contexts,
        "latency": round((time.time() - start_time) * 1000, 2)
    }

# =========================
# GRAPH
# =========================

@app.get("/graph")
def graph(query: str):

    center = query.strip().upper()

    def get_type(e):
        if e in ["IMO", "IALA"]:
            return "ORG"
        if e in ["AIS", "VTS", "GMDSS"]:
            return "SYSTEM"
        if e == "SOLAS":
            return "REGULATION"
        return "CONCEPT"

    GRAPH = {
        "SOLAS": [("IMO", "enforced_by"), ("GMDSS", "mandates"), ("AIS", "requires")],
        "IALA": [("VTS", "defines"), ("AIS", "standardizes")],
        "VTS": [("AIS", "uses"), ("IALA", "defined_by")],
        "GMDSS": [("IMO", "regulated_by")],
    }

    relations = GRAPH.get(center, [("IMO", "related_to"), ("IALA", "related_to")])

    nodes = [{
        "id": center,
        "type": get_type(center)
    }]

    links = []

    for target, rel in relations:
        nodes.append({
            "id": target,
            "type": get_type(target)
        })

        links.append({
            "source": center,
            "target": target,
            "relation": rel
        })

    return {
        "nodes": nodes,
        "links": links
    }

# =========================
# NODE INFO
# =========================

@app.get("/node-info")
def node_info(name: str):

    contexts, _, _ = retrieve(name + " definition maritime", top_k=2)

    return {
        "node": name,
        "contexts": [c["text"] for c in contexts]
    }

# =========================
# STATS (FIXED)
# =========================

@app.get("/stats")
def stats():
    try:
        with driver.session() as session:

            node_result = session.run(
                "MATCH (n) RETURN count(n) as count"
            ).single()

            edge_result = session.run(
                "MATCH ()-[r]->() RETURN count(r) as count"
            ).single()

            return {
                "nodes": node_result["count"] if node_result else 0,
                "edges": edge_result["count"] if edge_result else 0
            }

    except Exception as e:
        print("Stats error:", e)

        return {
            "nodes": 0,
            "edges": 0
        }