import { config } from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings, ChatOllama } from "@langchain/ollama";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

config(); // Load .env variables


const prompt = ChatPromptTemplate.fromTemplate(`
    You are an assistant for question-answering tasks. Use the context below to answer the question.
    Be personal, friendly, and make the answer interesting and engaging.
    If unsure, respond with "I don't know."
    Question: {question}
    Context: {context}
    Answer:
  `);
  
  const llm = new ChatOllama({
    baseUrl: process.env.OLLAMA_BASE_URL,
    model: process.env.OLLAMA_MODEL,
    temperature: 0, // Ensure deterministic responses
  });

const loader = new CheerioWebBaseLoader("https://www.flightscope.com");
const docs = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,  // Define the size of each chunk
    chunkOverlap: 200, // Ensure continuity between chunks
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  
  const embeddings = new OllamaEmbeddings({
    baseUrl: process.env.OLLAMA_BASE_URL,
    model: process.env.OLLAMA_MODEL_EMBEDDINGS,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

  const retriever = vectorStore.asRetriever({
    k: 5, // Retrieve top 5 most relevant documents
  });

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const retrievedDocs = await retriever.invoke("What is FlightScope Mevo+?");
  const result = await ragChain.invoke({
    question: "What is FlightScope Mevo+?",
    context: retrievedDocs,
  });
  
  console.log(result);
  