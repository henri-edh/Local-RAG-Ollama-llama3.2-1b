# Local RAG Application with Ollama and LangChain
## by Henri Johnson - Founder/CEO FlightScope

This application demonstrates a **Retrieval Augmented Generation (RAG)** system using Ollama's local LLM and LangChain. It performs web scraping, text processing, and question answering using a local language model.

## Prerequisites

- Node.js installed on your system
- Ollama installed and running locally
- pnpm package manager (recommended)

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/henri-edh/Local-RAG-Ollama-llama3.2-1b.git
   ```

2. **Install dependencies**:

   ```bash
    pnpm init

    // Modify the package.json file to include the following type definition:
    "type": "module",

   pnpm install
   ```

3. **Create a `.env` file** in the root directory with the following content:

   ```env
   OLLAMA_MODEL=llama3.2:1b
   OLLAMA_MODEL_EMBEDDINGS=nomic-embed-text:latest
   OLLAMA_BASE_URL=localhost:11434
   ```

## Dependencies

The application uses several key packages:

- `@langchain/community`: For document loading and processing
- `@langchain/core`: Core LangChain functionality
- `@langchain/ollama`: Integration with Ollama
- `cheerio`: For web scraping
- `dotenv`: For environment variable management
- `langchain`: Main LangChain package

## Application Structure

The main application (`retrieval-chains.js`) implements a RAG pipeline with the following components:

1. **Web Scraping**: 
   Uses `CheerioWebBaseLoader` to load content from web pages.

2. **Text Processing**:
   Splits documents into manageable chunks using `RecursiveCharacterTextSplitter`.

3. **Vector Storage**:
   Creates embeddings and stores them in memory using `MemoryVectorStore`.

4. **Question Answering**:
   Implements a RAG chain that:
   - Retrieves relevant documents based on a query.
   - Uses a chat prompt template for structured responses.
   - Processes the response through the local Ollama model.

## Running the Application

1. **Ensure Ollama is running locally**.

2. **Execute the application**:

   ```bash
   node retrieval-chains.js
   ```

## Features

- Local LLM usage through Ollama
- Web content scraping and processing
- Vector-based document retrieval
- Configurable chunk sizes and overlap for text splitting
- Customizable prompt templates
- Memory-based vector storage
- Top-k document retrieval (currently set to retrieve top 5 documents)

## Configuration

The application can be configured through environment variables:

- `OLLAMA_MODEL`: The Ollama model to use for text generation
- `OLLAMA_MODEL_EMBEDDINGS`: The model to use for generating embeddings
- `OLLAMA_BASE_URL`: The URL where Ollama is running

## Example Usage

Output:
```bash
node retrieval-chains
```

```
The Mevo+ is an incredibly impressive launch monitor that's taken the golfing world by storm! It's a game-changer for serious golfers who want to take their swing to the next level. With its incredible accuracy, user-friendly interface, and robust features, it's no wonder FlightScope has received rave reviews from golf enthusiasts like you.

The Mevo+ is more than just a launch monitor - it's an all-in-one solution that helps you improve your game in countless ways. Whether you're practicing at home or simulating games on the course, this baby delivers top-notch performance data and features to help you refine your swing.

One of the standout aspects of the Mevo+ is its 3D view and face impact modules, which provide a unique perspective on your shots. And with its optimizer feature, you can fine-tune your swing for maximum accuracy and power.

But what really sets the Mevo+ apart is its affordability - it's an absolute steal at $1,839 compared to its competitors! So why wait? Get ready to take your golf game to new heights with FlightScope's incredible Mevo+ launch monitor.
```

The above is the output of the RAG system.

---

### Note:
The current implementation demonstrates querying about "FlightScope Mevo+" from the FlightScope website, but it can be modified to work with any website or question by adjusting the loader URL and query in the code.

