import os
import re
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer


# ============================================================
# CONFIG
# ============================================================

KNOWLEDGE_DIR = "knowledge"
MODEL_NAME = "BAAI/bge-m3"

TOP_K = 5


# ============================================================
# LOAD MODEL
# ============================================================

print("Loading embedding model...")

model = SentenceTransformer(MODEL_NAME)

print("Model loaded.")


# ============================================================
# CHUNK MARKDOWN
# ============================================================

def load_markdown_chunks(filepath):
    """
    Đọc file Markdown và tách thành các section.

    Ví dụ:

    # OFF_BY_ONE

    ## Definition
    ...

    ## Common Patterns
    ...

    sẽ trở thành:

    [
        {
            "filename": "off_by_one.md",
            "error_type": "OFF_BY_ONE",
            "section": "Definition",
            "text": "..."
        },
        ...
    ]
    """

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    filename = os.path.basename(filepath)

    # Lấy error type từ tên file
    error_type = os.path.splitext(filename)[0].upper()

    # Tách theo heading cấp 2: ##
    sections = re.split(r"\n(?=## )", content)

    chunks = []

    for section in sections:

        section = section.strip()

        if not section:
            continue

        lines = section.splitlines()

        # Nếu section bắt đầu bằng ## thì lấy tên section
        if lines[0].startswith("## "):
            section_name = lines[0][3:].strip()
        else:
            section_name = "Introduction"

        chunks.append({
            "filename": filename,
            "error_type": error_type,
            "section": section_name,
            "text": section
        })

    return chunks


# ============================================================
# LOAD KNOWLEDGE BASE
# ============================================================

documents = []

for filename in os.listdir(KNOWLEDGE_DIR):

    if not filename.endswith(".md"):
        continue

    filepath = os.path.join(KNOWLEDGE_DIR, filename)

    chunks = load_markdown_chunks(filepath)

    documents.extend(chunks)


print(f"Loaded {len(documents)} chunks")


# ============================================================
# SHOW CHUNKS
# ============================================================

print("\n========== KNOWLEDGE CHUNKS ==========")

for i, doc in enumerate(documents):

    print(
        f"[{i}] "
        f"{doc['error_type']} | "
        f"{doc['section']}"
    )


# ============================================================
# CREATE EMBEDDINGS
# ============================================================

texts = [
    doc["text"]
    for doc in documents
]

print("\nCreating embeddings...")

embeddings = model.encode(
    texts,
    normalize_embeddings=True,
    show_progress_bar=True
)

embeddings = np.asarray(
    embeddings,
    dtype="float32"
)

print("Embedding shape:", embeddings.shape)


# ============================================================
# CREATE FAISS INDEX
# ============================================================

dimension = embeddings.shape[1]

index = faiss.IndexFlatIP(dimension)

index.add(embeddings)

print("FAISS index size:", index.ntotal)


# ============================================================
# QUERY
# ============================================================

query = "for loop chạy dư một lần"

print("\nQuery:", query)

query_embedding = model.encode(
    [query],
    normalize_embeddings=True
)

query_embedding = np.asarray(
    query_embedding,
    dtype="float32"
)


# ============================================================
# SEARCH
# ============================================================

distances, indices = index.search(
    query_embedding,
    TOP_K
)


# ============================================================
# DISPLAY RESULT
# ============================================================

print("\n========== SEARCH RESULT ==========")

for rank, (idx, score) in enumerate(
    zip(indices[0], distances[0]),
    start=1
):

    document = documents[idx]

    print(f"\n#{rank}")

    print("Error type :", document["error_type"])
    print("Section    :", document["section"])
    print("File       :", document["filename"])
    print("Score      :", round(float(score), 4))

    print("Content:")
    print(document["text"][:500])