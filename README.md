# Maritime AI Assistant (RAG + Knowledge Graph)

An intelligent system for semantic retrieval and context-aware question answering over maritime regulations, designed to transform complex documentation into structured, queryable knowledge.

---

## 🚀 Overview

The Maritime AI Assistant addresses the challenge of navigating dense maritime regulations by combining **retrieval-driven systems**, **language models**, and **knowledge graphs**.

Instead of static document search, it enables:
- Context-aware answers grounded in source documents  
- Structured exploration of maritime entities  
- Interactive querying over domain-specific knowledge  

---

## 🎯 Problem

Maritime documentation is:
- Highly fragmented across PDFs and manuals  
- Difficult to search semantically  
- Lacks structured relationships between entities  

Traditional search systems fail to provide:
- Contextual understanding  
- Relevant document chunks  
- Interconnected knowledge  

---

## 💡 Solution

This system implements a **Retrieval-Augmented Generation (RAG)** pipeline with hybrid retrieval and graph-based exploration.

It combines:
- Semantic + keyword retrieval  
- Context-aware LLM responses  
- Knowledge graph visualization  

---

## 🧠 Key Capabilities

- Hybrid Retrieval (FAISS + BM25 + reranking)  
- Context-grounded answer generation (LLaMA via Groq API)  
- Knowledge Graph integration using Neo4j  
- FastAPI backend for scalable querying  
- Interactive frontend with chat and graph exploration  

---

## ⚙️ System Flow

1. User query input  
2. Query preprocessing & expansion  
3. Hybrid retrieval (vector + keyword search)  
4. Reranking and filtering  
5. Context construction  
6. LLM-based response generation  
7. Knowledge graph exploration  

---

## 🔍 Retrieval System

The retrieval pipeline combines:

- **FAISS (dense retrieval)** for semantic similarity  
- **BM25 (sparse retrieval)** for keyword matching  
- **Cross-encoder reranking** for improved relevance  

This hybrid design improves:
- Top-k retrieval accuracy  
- Context relevance  
- Response grounding  

---

## 📊 Dataset

- 40+ maritime regulatory PDFs  
- Includes:
  - IALA training material  
  - Vessel Traffic Services (VTS) documentation  
  - AIS and navigation standards  

---

## 🧩 Tech Stack

- Python  
- FastAPI  
- FAISS  
- Neo4j  
- Next.js  
- HuggingFace Transformers  
- Groq API (LLaMA)  

---

## 📸 Demo

### Landing Page
![Landing Page](<img width="1919" height="891" alt="Screenshot 2026-03-25 133509" src="https://github.com/user-attachments/assets/94b5ac40-f0fa-4e6e-aa60-69da8f29b590" />)

### Authentication  Register Page
![Authentication  Register Page](<img width="1918" height="891" alt="Screenshot 2026-03-25 133548" src="https://github.com/user-attachments/assets/482fccc1-9c92-4999-999e-f0a654e2086a" />)

### Authentication Login Page
![Authentication Login Page](<img width="1919" height="893" alt="Screenshot 2026-03-25 133609" src="https://github.com/user-attachments/assets/527c6f83-af1c-4cf7-ae9d-e1d20fce9929" />)

### Chat Assitant Pages
![Chat Assitant Page 1](<img width="1917" height="890" alt="Screenshot 2026-03-24 174317" src="https://github.com/user-attachments/assets/080e630c-9cef-4ca3-8231-9acd5c790401" />)

![Chat Assitant Page 2](<img width="1919" height="962" alt="Screenshot 2026-03-24 174401" src="https://github.com/user-attachments/assets/82de70f1-4914-4c20-9171-10bfdfd9afc6" />)

### Knowledge Graph Pages
![Knowledge Graph Page 1](<img width="1915" height="881" alt="Screenshot 2026-03-27 002415" src="https://github.com/user-attachments/assets/2ab23717-2e42-43f4-87a9-2e4a27ffcf90" />)

![Knowledge Graph Page 2](<img width="1919" height="888" alt="Screenshot 2026-03-24 174528" src="https://github.com/user-attachments/assets/ea98ba5c-0749-461c-b478-f24b624f5bc5" />)

## ⚡ API Design

- `/chat` → query processing + response generation  
- `/graph` → knowledge graph visualization  
- `/node-info` → entity details  
- `/stats` → system metrics  

---

## 📈 Highlights

- Improves retrieval relevance using hybrid search  
- Enables semantic search over large document collections  
- Bridges unstructured documents with structured graph insights  

---

## 🚧 Limitations

- Limited reasoning over graph relationships  
- Depends on dataset quality  
- No real-time data ingestion  

---

## 🔮 Future Scope

- Agent-based retrieval workflows  
- Deeper graph reasoning integration  
- Real-time maritime data pipelines  

---
