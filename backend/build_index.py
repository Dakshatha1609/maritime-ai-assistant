import os
import re
from pathlib import Path

from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

from graph_builder import build_graph_from_chunks


PDF_PATH = "../data/pdfs"
INDEX_PATH = "../data/faiss_index"

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def clean_text(text):
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


print("Loading PDFs...")

loader = PyPDFDirectoryLoader(PDF_PATH)
docs = loader.load()

print("Total pages:", len(docs))


print("Splitting documents...")

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150
)

documents = splitter.split_documents(docs)


# 🔥 ONLY MINIMAL CLEANING (NO AGGRESSIVE FILTER)
cleaned_docs = []

for doc in documents:

    text = clean_text(doc.page_content)

    # ❌ remove only empty or useless
    if len(text) < 50:
        continue

    doc.page_content = text

    # keep metadata
    doc.metadata["source"] = doc.metadata.get("source", "unknown")
    doc.metadata["page"] = doc.metadata.get("page", "N/A")

    cleaned_docs.append(doc)

print("Final clean chunks:", len(cleaned_docs))


print("Building FAISS index...")

vector_store = FAISS.from_documents(
    cleaned_docs,
    embedding_model
)

Path(INDEX_PATH).mkdir(parents=True, exist_ok=True)

vector_store.save_local(INDEX_PATH)

print("FAISS index ready.")


print("Building knowledge graph...")

build_graph_from_chunks(cleaned_docs)

print("Graph created successfully.")