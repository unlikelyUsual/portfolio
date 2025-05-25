---
layout: ../../layouts/post.astro
title: "Build Rag with ChromaDb, Langchain and Hugging face"
pubDate: 2025-01-19
description: "Building a Smart Documentation Assistant"
author: "Prabhat"
excerpt: My personal content assistant that finds viral Reddit videos and posts them to Instagram automatically
image:
  src:
  alt:
tags:
  [
    "RAG",
    "LangChain",
    "Documentation",
    "Python",
    "MachineLearning",
    "DeveloperTools",
  ]
---

# Building a Smart Documentation Assistant: My Journey with RAG and read any Docs 🚀

_Or: How I taught my computer to become a Bun expert so I don't have to read docs anymore_

## The Problem: Documentation Overload 📚

Let's be honest - we've all been there. You're trying to learn a new technology (in this case, Bun, the blazingly fast JavaScript runtime), and you're faced with a mountain of documentation. You know the answer to your question is _somewhere_ in those docs, but finding it feels like searching for a needle in a haystack.

That's exactly what happened to me with Bun. Here I was, excited to try this new JavaScript runtime that promises to be 4x faster than Node.js, but I kept getting lost in the documentation maze. Questions like "How do I install this thing?" or "What's this bun-flavored TOML I keep hearing about?" required me to dig through multiple markdown files.

So, being a developer, I did what any reasonable person would do: I built a robot to read the docs for me! 🤖

## Enter RAG: Retrieval-Augmented Generation ✨

RAG isn't just a fancy acronym - it's like having a super-smart research assistant that can:

1. **Retrieve** relevant information from a knowledge base
2. **Augment** that information with context
3. **Generate** human-like responses based on what it found

Think of it as Google search + ChatGPT, but specifically trained on your documentation and way more accurate.

## The Tech Stack: My Weapons of Choice ⚔️

Here's what I used to build this documentation wizard:

### The Core Players

- **LangChain**: The orchestrator that ties everything together
- **ChromaDB**: My vector database for lightning-fast similarity search
- **HuggingFace**: For both embeddings and the language model
- **Python**: Because life's too short for complicated setups

### The Models

- **Embeddings**: `intfloat/multilingual-e5-large-instruct` (fancy name for "turns text into numbers that computers understand")
- **LLM**: `Qwen/Qwen3-32B` (the brain that generates human-like responses)

## The Architecture: How the Magic Happens 🎭

### Step 1: Document Ingestion (The Prep Work)

```python
# Load all those markdown files
loader = DirectoryLoader("docs/bun", glob="*.md")
documents = loader.load()

# Chop them into bite-sized chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=100,  # Some overlap to maintain context
)
chunks = text_splitter.split_documents(documents)
```

I split the Bun documentation into 300-character chunks with 100 characters of overlap. Why? Because AI models work better with smaller, focused pieces of information rather than entire documents. It's like the difference between asking someone to remember a paragraph vs. asking them to memorize a whole book.

### Step 2: Embedding Generation (The Translation)

```python
class CustomHuggingFaceEmbeddings(Embeddings):
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        embeddings = []
        for text in texts:
            result = _inference_client.feature_extraction(
                text,
                model="intfloat/multilingual-e5-large-instruct",
            )
            embeddings.append(result)
        return embeddings
```

This is where the magic starts. Each chunk of text gets converted into a vector (a list of numbers) that represents its meaning in mathematical space. Similar concepts end up close together in this vector space - it's like organizing books in a library, but in 1024 dimensions instead of just shelves!

### Step 3: Vector Storage (The Memory Bank)

```python
Chroma.from_documents(
    chunks, create_embedding(), persist_directory="chroma"
)
```

All these vectors get stored in ChromaDB, which is optimized for finding similar vectors quickly. When I ask "How do I install Bun?", it can instantly find all the chunks that are semantically similar to that question.

### Step 4: Query Processing (The Real-Time Magic)

```python
# Find similar chunks
results = db.similarity_search_with_relevance_scores(query_text, k=3)

# Only proceed if we're confident about the results
if len(results) == 0 or results[0][1] < 0.7:
    print("Unable to find matching results.")
    return

# Combine the context
context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
```

When you ask a question, the system:

1. Converts your question into a vector
2. Finds the 3 most similar chunks from the documentation
3. Only proceeds if the similarity score is above 0.7 (we don't want hallucinations!)
4. Combines the relevant chunks into context

### Step 5: Response Generation (The Grand Finale)

```python
PROMPT_TEMPLATE = """
Answer the question based only on the following context
context: {context}

---
Answer the question based on the above context: {question}
"""

completion = client.chat.completions.create(
    model="Qwen/Qwen3-32B",
    messages=[{"role": "user", "content": prompt}]
)
```

Finally, the LLM gets the question and the relevant context, and generates a human-like response. The key phrase here is "based only on the following context" - this prevents the model from making stuff up!

## The Data: Bun Documentation Deep Dive 📖

The system works with six key Bun documentation files:

- **`index.md`**: The main overview explaining what Bun is (spoiler: it's a Node.js replacement that's 4x faster)
- **`installation.md`**: How to get Bun running on your machine
- **`quickstart.md`**: Your first steps with Bun
- **`typescript.md`**: TypeScript support (because who writes vanilla JS anymore?)
- **`benchmarks.md`**: The performance numbers that make Node.js developers cry
- **`bun-flavored-toml.md`**: Bun's special configuration format

Each file gets chunked into ~300-character pieces, creating a searchable knowledge base that covers everything from basic installation to advanced configuration.

## Real-World Performance: The Numbers Don't Lie 📊

Here's what makes this system actually useful:

### Speed Metrics

- **Document Processing**: Splits 6 markdown files into manageable chunks in seconds
- **Query Response**: Sub-second responses for most queries
- **Relevance Threshold**: 0.7 minimum score ensures high-quality answers

### Accuracy Features

- **Source Attribution**: Every answer comes with source file references
- **Context Limitation**: Responses are based only on the provided documentation
- **Relevance Filtering**: No answer is better than a wrong answer

## Example Interactions: See It In Action 🎬

**Query**: "How do I install Bun?"

**Response**:

```
To install Bun, you can use the following methods:
1. Using curl: curl -fsSL https://bun.sh/install | bash
2. Using npm: npm install -g bun
3. Using Homebrew: brew install bun

Sources: ['docs/bun/installation.md']
```

**Query**: "What makes Bun faster than Node.js?"

**Response**:

```
Bun is faster than Node.js due to several key factors:
- Written in Zig and powered by JavaScriptCore (Safari's engine)
- Dramatically reduced startup times and memory usage
- Processes start 4x faster than Node.js
- Built from the ground-up with modern JavaScript ecosystem in mind

Sources: ['docs/bun/index.md', 'docs/bun/benchmarks.md']
```

## The Technical Challenges (And How I Solved Them) 🔧

### Challenge 1: Custom Embeddings

LangChain doesn't have built-in support for HuggingFace's Inference API, so I had to create a custom embedding class:

```python
class CustomHuggingFaceEmbeddings(Embeddings):
    def __init__(self, model_name: str = "intfloat/multilingual-e5-large-instruct"):
        self.model_name = model_name

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        # Custom implementation for HuggingFace Inference API
```

### Challenge 2: Relevance Filtering

Not all similarity matches are created equal. I implemented a 0.7 threshold to ensure the system only responds when it's confident:

```python
if len(results) == 0 or results[0][1] < 0.7:
    print("Unable to find matching results.")
    return
```

### Challenge 3: Context Management

Balancing chunk size (300 chars) with overlap (100 chars) to maintain context while keeping chunks focused.

## Lessons Learned: What I'd Do Differently 🎓

### What Worked Great

1. **Small chunk sizes**: 300 characters hit the sweet spot between context and specificity
2. **Relevance thresholds**: Prevented hallucinations and maintained accuracy
3. **Source attribution**: Made the system trustworthy and debuggable

### What I'd Improve

1. **Batch processing**: Currently processes embeddings one at a time (could be optimized)
2. **Caching**: Could cache embeddings for repeated queries
3. **Multi-document support**: Currently focused on Bun docs, but could easily extend to other documentation sets

## The Future: Where This Goes Next 🚀

This RAG system is just the beginning. Here's what's on my roadmap:

### Short-term Improvements

- **Better chunking strategies**: Semantic chunking instead of character-based
- **Query expansion**: Understanding synonyms and related terms
- **Conversation memory**: Multi-turn conversations with context

### Long-term Vision

- **Multi-modal support**: Images, diagrams, and code examples
- **Real-time updates**: Automatically sync with documentation changes
- **Community knowledge**: Incorporate Stack Overflow, GitHub issues, and community discussions

## Getting Your Hands Dirty: Try It Yourself 🛠️

Want to build your own documentation assistant? Here's the quick setup:

```bash
# Clone and setup
git clone <your-repo>
cd Langchain_rag
pip install -r requirements.txt

# Add your HuggingFace API key
echo "HUGGIN_FACE_KEY=your_key_here" > .env

# Process the documents
python database.py

# Start querying!
python main.py
```

The beauty of this system is its modularity. Want to use it for React docs instead of Bun? Just change the `DATA_PATH` in `database.py`. Want to use a different LLM? Swap out the model name in `main.py`. The architecture is flexible enough to adapt to any documentation set.

## The Bottom Line: Why This Matters 💡

In a world where documentation is growing exponentially and developer time is precious, RAG systems like this aren't just cool tech demos - they're productivity multipliers. Instead of spending 20 minutes hunting through docs, I can get accurate, sourced answers in seconds.

But more importantly, this project taught me that the future of developer tools isn't about replacing human intelligence - it's about augmenting it. The system doesn't think for me; it helps me find the information I need to think better.

And honestly? Building a robot that reads documentation so I don't have to feels like the most developer thing I've ever done. 😄

---

_Want to see the code? Check out the [GitHub repository](https://github.com/your-username/langchain-rag) and feel free to contribute! And if you build your own documentation assistant, I'd love to hear about it._
