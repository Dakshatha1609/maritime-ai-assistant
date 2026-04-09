import re
from neo4j import GraphDatabase

# =========================
# NEO4J CONNECTION
# =========================

driver = GraphDatabase.driver(
    "bolt://127.0.0.1:7687",
    auth=("neo4j", "12345678")
)

# =========================
# DOMAIN ENTITIES
# =========================

KNOWN_ENTITIES = [
    "SOLAS", "IMO", "IALA",
    "VTS", "AIS", "GMDSS", "IAMSAR"
]

# =========================
# RELATION KEYWORDS
# =========================

REL_PATTERNS = {
    "mandates": ["mandate", "requires", "require"],
    "enforced_by": ["enforce", "regulated by"],
    "standardizes": ["standard", "define"],
    "uses": ["use", "utilize"],
    "supports": ["support"],
    "related_to": []
}

# =========================
# CLEAN TEXT
# =========================

def clean_text(text):
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip().upper()

# =========================
# EXTRACT ENTITIES FROM TEXT
# =========================

def extract_entities(text):

    found = []

    for entity in KNOWN_ENTITIES:
        if entity in text:
            found.append(entity)

    return list(set(found))

# =========================
# DETECT RELATION
# =========================

def detect_relation(text):

    for rel, keywords in REL_PATTERNS.items():
        for kw in keywords:
            if kw.upper() in text:
                return rel

    return "related_to"

# =========================
# BUILD GRAPH FROM CHUNKS
# =========================

def build_graph_from_chunks(docs):

    print("Clearing existing graph...")

    with driver.session() as session:
        session.run("MATCH (n) DETACH DELETE n")

    print("Building new graph...")

    edge_count = 0

    for doc in docs:

        text = clean_text(doc.page_content)

        entities = extract_entities(text)

        # skip weak chunks
        if len(entities) < 2:
            continue

        relation = detect_relation(text)

        # create edges between pairs
        for i in range(len(entities)):
            for j in range(i + 1, len(entities)):

                a = entities[i]
                b = entities[j]

                with driver.session() as session:
                    session.run(
                        """
                        MERGE (a:Entity {name:$a})
                        MERGE (b:Entity {name:$b})
                        MERGE (a)-[:RELATED_TO {type:$rel}]->(b)
                        """,
                        a=a,
                        b=b,
                        rel=relation
                    )

                edge_count += 1

    print(f"Graph built with {edge_count} relationships.")