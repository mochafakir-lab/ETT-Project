import os
import shutil
import glob
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

CHROMA_PATH = "chroma"
DATA_PATH = "data"


def main():
    generate_data_store()


def generate_data_store():
    documents = load_documents()
    chunks = split_text(documents)
    save_to_chroma(chunks)


def load_documents():
    md_files = glob.glob(os.path.join(DATA_PATH, "*.md"))
    documents = []
    for path in md_files:
        loader = TextLoader(path, encoding="utf-8")
        documents.extend(loader.load())
    print(f"Loaded {len(documents)} documents from {len(md_files)} files.")
    return documents


def split_text(documents):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")
    if chunks:
        document = chunks[0]
        print(f"\nSample chunk content:\n{document.page_content[:200]}")
        print(f"\nSample chunk metadata: {document.metadata}")
    return chunks


def save_to_chroma(chunks):
    # Clear existing database.
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    print(f"\nLoading HuggingFace embedding model (this may take a moment)...")
    embedding_function = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-mpnet-base-v2"
    )

    # Create a new DB from the documents.
    db = Chroma.from_documents(
        chunks, embedding_function, persist_directory=CHROMA_PATH
    )
    print(f"\n✅ Saved {len(chunks)} chunks to ChromaDB at '{CHROMA_PATH}'.")


if __name__ == "__main__":
    main()
