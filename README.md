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

## 📁 Project Structure

The repository is organized to separate backend processing, frontend interface, and data handling:
```bash
maritime-ai-assistant/
├── backend/
│ ├── main.py # FastAPI backend with API endpoints
│ ├── rag_pipeline.py # Core RAG pipeline (retrieval + generation)
│ ├── graph_builder.py # Builds Neo4j knowledge graph
│ ├── graph_retrieval.py # Graph-based querying logic
│ ├── build_index.py # PDF processing and FAISS index creation
│ └── requirements.txt # Backend dependencies
│
├── frontend/
│ ├── app/ # Next.js pages (chat, graph, auth)
│ ├── components/ # UI components (Chat, Graph, Sidebar)
│ ├── public/ # Static assets
│ └── package.json # Frontend dependencies
│
├── data/ # Maritime PDFs and vector index
├── notebooks/ # Experiments and evaluations
└── README.md # Project documentation
```


The backend handles retrieval, reranking, and response generation, while the frontend enables interactive querying and knowledge graph visualization.  
This modular structure ensures scalability, maintainability, and clear separation of concerns.

## ⚙️ SYSTEM EXECUTION WORKFLOW

The execution workflow of Maritime AI Assistant consists of the following steps:
1.	The user enters a query through the frontend interface
2.	The query is sent to the FastAPI backend
3.	The query is processed and cleaned
4.	The FAISS vector database retrieves relevant document chunks
5.	Filtering removes irrelevant or noisy content
6.	A cross-encoder reranks the retrieved results
7.	Top-K contexts are passed to the LLaMA 3.1 model
8.	The model generates a final response
9.	The response and supporting context are displayed to the user
10.	Optionally, the user can explore related entities using the knowledge graph

This workflow ensures efficient retrieval, accurate response generation, and interactive exploration of maritime knowledge.

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
<img width="1919" height="891" alt="Screenshot 2026-03-25 133509" src="https://github.com/user-attachments/assets/94b5ac40-f0fa-4e6e-aa60-69da8f29b590" />

### Authentication  Register Page
<img width="1918" height="891" alt="Screenshot 2026-03-25 133548" src="https://github.com/user-attachments/assets/482fccc1-9c92-4999-999e-f0a654e2086a" />

### Authentication Login Page
<img width="1919" height="893" alt="Screenshot 2026-03-25 133609" src="https://github.com/user-attachments/assets/527c6f83-af1c-4cf7-ae9d-e1d20fce9929" />

### Chat Assitant Pages
<img width="1917" height="890" alt="Screenshot 2026-03-24 174317" src="https://github.com/user-attachments/assets/080e630c-9cef-4ca3-8231-9acd5c790401" />

<img width="1919" height="962" alt="Screenshot 2026-03-24 174401" src="https://github.com/user-attachments/assets/82de70f1-4914-4c20-9171-10bfdfd9afc6" />

### Knowledge Graph Pages
<img width="1915" height="881" alt="Screenshot 2026-03-27 002415" src="https://github.com/user-attachments/assets/2ab23717-2e42-43f4-87a9-2e4a27ffcf90" />

<img width="1919" height="888" alt="Screenshot 2026-03-24 174528" src="https://github.com/user-attachments/assets/ea98ba5c-0749-461c-b478-f24b624f5bc5" />

## ⚡ API Design

The system exposes REST endpoints using FastAPI for real-time interaction:

- **POST /chat** → Processes user queries and returns context-grounded answers  
- **GET /graph** → Retrieves knowledge graph data for entity relationships  
- **GET /node-info** → Provides detailed information about selected entities  

These APIs enable seamless communication between the frontend and backend, supporting interactive querying and structured exploration of maritime knowledge.

Supports real-time query processing with hybrid retrieval and LLM-based response generation.

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
