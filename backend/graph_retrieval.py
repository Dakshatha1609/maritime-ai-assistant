from neo4j import GraphDatabase
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# =========================
# NEO4J CONNECTION
# =========================

driver = GraphDatabase.driver(
    "bolt://127.0.0.1:7687",
    auth=("neo4j", "12345678")
)

# =========================
# LOAD VECTOR STORE
# =========================

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vector_store = FAISS.load_local(
    "../data/faiss_index",
    embedding_model,
    allow_dangerous_deserialization=True
)

# =========================
# SIMPLE ENTITY EXTRACTION
# =========================

def extract_main_entity(query):
    return query.strip().upper()

# =========================
# REAL GRAPH FETCH (MULTI-HOP)
# =========================

def fetch_graph(entity):

    cypher = """
    MATCH (n:Entity)
    WHERE toLower(n.name) CONTAINS toLower($name)

    MATCH path = (n)-[*1..2]-(m)

    UNWIND relationships(path) AS r

    RETURN DISTINCT
        startNode(r).name AS source,
        endNode(r).name AS target,
        type(r) AS relation
    LIMIT 100
    """

    nodes = set()
    links = []

    with driver.session() as session:

        result = session.run(cypher, name=entity)

        for record in result:

            src = record["source"]
            tgt = record["target"]
            rel = record["relation"]

            nodes.add(src)
            nodes.add(tgt)

            links.append({
                "source": src,
                "target": tgt,
                "relation": rel
            })

    return {
        "nodes": [{"id": n} for n in nodes],
        "links": links
    }

# =========================
# FINAL GRAPH PIPELINE
# =========================

def build_graph_from_query(query):

    # 🔥 Step 1: Get main entity
    entity = extract_main_entity(query)

    # 🔥 Step 2: Fetch graph
    graph = fetch_graph(entity)

    return graph