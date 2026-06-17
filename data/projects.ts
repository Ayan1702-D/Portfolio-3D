export type ProjectCategory = "All" | "NLP" | "Computer Vision" | "Agentic AI" | "Web";
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  image: string;
  youtubeId?: string; // For the modal embed
}
export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Neural Vision Classifier",
    description: "Real-time object detection model built from scratch using PyTorch.",
    fullDetails: "This project implements a custom CNN architecture capable of running at 60fps on edge devices. Trained on a customized COCO dataset, it heavily utilizes data augmentation and hyperparameter tuning to achieve 92% mAP.",
    category: "Computer Vision",
    techStack: ["PyTorch", "OpenCV", "Python", "NumPy"],
    githubUrl: "https://github.com/pytorch/vision", // Placeholder for actual fetch
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ", 
  },
  {
    id: "2",
    title: "Semantic Text Summarizer",
    description: "Transformer-based NLP pipeline for abstractive text summarization.",
    fullDetails: "Fine-tuned a BERT-based model using Hugging Face to summarize long-form legal documents. Built a RESTful API backend using FastAPI to serve the model inference.",
    category: "NLP",
    techStack: ["Hugging Face", "Transformers", "FastAPI", "Docker"],
    githubUrl: "https://github.com/huggingface/transformers",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Autonomous Trading Agent",
    description: "Reinforcement learning agent optimized for high-frequency simulated trading.",
    fullDetails: "Developed an Agentic AI system that utilizes proximal policy optimization (PPO) to make simulated trades based on historical market data and real-time sentiment analysis APIs.",
    category: "Agentic AI",
    techStack: ["Python", "Ray RLlib", "Pandas", "Scikit-Learn"],
    githubUrl: "https://github.com/ray-project/ray",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Scalable Analytics Dashboard",
    description: "Full-stack real-time data visualization platform.",
    fullDetails: "A scalable web dashboard built with Next.js and Django. It ingests thousands of data points per second via WebSockets and visualizes them using D3.js and Framer Motion.",
    category: "Web",
    techStack: ["Next.js", "Django", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/django/django",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Medical Image Segmentation",
    description: "U-Net architecture for precise MRI tumor boundary detection.",
    fullDetails: "Applied advanced image processing techniques to identify and segment anomalies in brain MRI scans. Integrated the model into a lightweight web interface for demonstration.",
    category: "Computer Vision",
    techStack: ["TensorFlow", "Keras", "Matplotlib", "Flask"],
    githubUrl: "https://github.com/tensorflow/tensorflow",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "LLM Orchestrator Framework",
    description: "Custom lightweight LangChain alternative for multi-agent tasks.",
    fullDetails: "Created a framework to chain multiple LLM calls together with automated state management, memory buffers, and custom tool execution for complex reasoning tasks.",
    category: "Agentic AI",
    techStack: ["TypeScript", "Node.js", "OpenAI API", "Redis"],
    githubUrl: "https://github.com/langchain-ai/langchain",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
  }
];