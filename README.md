# Maritime AI Assistant (RAG + Knowledge Graph)

An end-to-end AI system for semantic retrieval and context-aware question answering over maritime regulations and domain-specific documents.

---

## 🚀 Overview

The Maritime AI Assistant is designed to simplify access to complex maritime regulations by combining **retrieval-based systems** with **language models** and **knowledge graphs**.

It enables users to query large maritime documents and receive accurate, context-grounded responses, along with structured exploration of related entities.

---

## 🧠 Key Features

- Hybrid Retrieval Pipeline (FAISS + BM25 + Reranking)
- Context-aware Answer Generation using LLM (LLaMA via Groq API)
- Knowledge Graph integration using Neo4j
- FastAPI backend for real-time querying
- Interactive frontend with chat interface and graph visualization

---

## ⚙️ System Architecture

The system follows a modular pipeline:

1. User Query Input  
2. Query Processing & Expansion  
3. Hybrid Retrieval (FAISS + BM25)  
4. Filtering and Reranking  
5. Context Selection  
6. LLM-based Answer Generation  
7. Knowledge Graph Exploration  

---

## 🔍 Retrieval Pipeline

- Dense Retrieval using FAISS (vector search)
- Sparse Retrieval using BM25
- Cross-encoder reranking for improved relevance
- Query expansion and preprocessing

This hybrid approach improves top-k retrieval relevance and reduces irrelevant results.

---

## 📊 Dataset

- 40+ maritime PDF documents
- Includes:
  - IALA training materials  
  - VTS documentation  
  - AIS and navigation guidelines  

---

## 🧩 Tech Stack

- Python  
- FastAPI  
- FAISS  
- Neo4j  
- Next.js  
- HuggingFace Transformers  
- LLaMA (via Groq API)  

---

## 📸 Demo

### Chat Interface
![Chat](screenshots/chat.png)

### Knowledge Graph Visualization
![Graph](screenshots/graph.png)

### Retrieval Output
![Output](screenshots/output.png)

---

## ⚡ API Endpoints

- `/chat` → query processing and response generation  
- `/graph` → knowledge graph visualization  
- `/node-info` → retrieve node details  
- `/stats` → system statistics  

---

## 📈 Highlights

- Improved retrieval relevance using hybrid search pipeline  
- Supports semantic search over large document collections  
- Enables structured exploration using knowledge graphs  

---

## 🚧 Limitations

- Depends on dataset quality  
- Limited reasoning over knowledge graph  
- No real-time data ingestion  

---

## 🔮 Future Work

- Agent-based retrieval systems  
- Enhanced graph-based reasoning  
- Real-time maritime data integration  

---

## 🧑‍💻 Author

Dakshatha Urs MS  
MSc Data Science, Christ University  

---
