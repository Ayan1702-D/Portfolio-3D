export type ProjectCategory = "All" | "NLP" | "Computer Vision" | "Agentic AI" | "Web";
export type ProjectStatus = "live" | "wip" | "archived";

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
  youtubeId?: string;
  status?: ProjectStatus;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Driver Drowsiness Monitoring System",
    description:
      "Real-time fatigue and distraction detection system for driver safety using facial geometry analysis.",
    fullDetails:
      "Developed a high-performance real-time safety system using Python, OpenCV, and Dlib. Implements Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) metrics combined with 3D Head Pose Estimation (SolvePnP) to detect drowsiness, yawning, and distraction. Features PERCLOS-based fatigue assessment over a 300-frame sliding window — an industry-standard metric — and CLAHE image enhancement for robust performance in low-light cabin environments. Multi-threaded async audio alerts prevent video feed freezes.",
    category: "Computer Vision",
    techStack: ["Python", "OpenCV", "Dlib", "NumPy", "Threading"],
    githubUrl: "https://github.com/Ayan1702-D/Driver-DMS",
    demoUrl: "",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
    status: "live",
  },
  {
    id: "2",
    title: "Autonomous Pothole Detection System",
    description:
      "End-to-end AI road audit solution with real-time YOLOv8 detection, GPS logging, and automated reporting.",
    fullDetails:
      "Custom-trained YOLOv8 model optimized with TFLite (FP16/FP32) and ONNX formats achieving 30+ FPS on CPU. Uses Centroid Tracking with 5-frame Temporal Stability to count unique potholes without duplication. Integrates GPS coordinate logging and generates an interactive road_audit_map.html with markers. Outputs a structured road_audit_report.csv for infrastructure teams.",
    category: "Computer Vision",
    techStack: ["Python", "YOLOv8", "TensorFlow Lite", "OpenCV", "Folium"],
    githubUrl: "https://github.com/Ayan1702-D/Pothole-Detection-System",
    demoUrl: "",
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
    status: "live",
  },
  {
    id: "3",
    title: "Risk & Anomaly Management System (RAMS)",
    description:
      "Automated risk assessment platform processing 30M+ loan records using Isolation Forest anomaly detection.",
    fullDetails:
      "Built during my internship at Aurionpro Solutions. Processes over 30 million LendingClub loan records using Scikit-Learn's Isolation Forest across 20+ financial features (DTI, FICO, Revolving Utility). Detected $467.2M in high-risk loan volume during validation with a 5% anomaly flag rate. Features a human-in-the-loop Case Management Dashboard, DTI Hard-Rule Override (forcing Critical status on DTI > 100%), automated batch ingestion pipeline, and a permanent audit log for regulatory compliance. Applied categorical encoding to cut memory footprint by 80%.",
    category: "Agentic AI",
    techStack: ["Python", "Scikit-Learn", "Django", "PostgreSQL", "Pandas"],
    githubUrl: "https://github.com/Ayan1702-D/RAMS-LendingClub",
    demoUrl: "",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    status: "archived",
  },
  {
    id: "4",
    title: "FinSight AI — Banking Intelligence Suite",
    description:
      "Natural language to SQL banking BI platform powered by Gemini/Qwen, reducing decision latency from hours to seconds.",
    fullDetails:
      "A next-generation banking intelligence platform built during my internship at Aurionpro Solutions. Users query complex PostgreSQL banking schemas (clients, accounts, loans, transactions) in plain English and receive instant Chart.js visualizations. Uses OpenRouter to orchestrate Google Gemini 2.0 Flash and Qwen3-Coder for Text-to-SQL generation with a 94% success rate for non-technical users. Features a dark glassmorphism UI, transparent SQL audit terminal, AI analyst summaries, and SQL injection protection via keyword blocking.",
    category: "Agentic AI",
    techStack: ["Django", "PostgreSQL", "Python", "Chart.js", "OpenRouter API"],
    githubUrl: "https://github.com/Ayan1702-D/Finsight-AI",
    demoUrl: "",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    status: "archived",
  },
  {
    id: "5",
    title: "Energy Consumption Forecasting",
    description:
      "LSTM-based time-series forecasting model for predicting future energy usage patterns and peak-load optimization.",
    fullDetails:
      "Built a deep learning forecasting pipeline using LSTM networks to model temporal energy consumption patterns. Enables peak-load optimization and energy efficiency analysis, providing actionable insights for resource management. The pipeline covers data preprocessing, sequence generation, model training, and multi-step ahead prediction with evaluation metrics for operational deployment.",
    category: "NLP",
    techStack: ["Python", "TensorFlow", "Keras", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/Ayan1702-D/Energy-Consumption-Prediction",
    demoUrl: "",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    status: "live",
  },
  {
    id: "6",
    title: "Workbook Converter & Merger",
    description:
      "FastAPI service to securely merge multiple Excel and CSV files into a single workbook, deployed on Render.",
    fullDetails:
      "A production-deployed FastAPI backend that authenticates users and merges multiple Excel (.xlsx, .xls) and CSV files into a single formatted workbook. Implements intelligent furnace-cycle metadata extraction, date/shift detection from raw Excel headers, and CORS-enabled streaming file responses. No files are stored server-side — everything streams directly to the client. The React frontend features drag-and-drop upload, real-time feedback, and a clean Tailwind UI.",
    category: "Web",
    techStack: ["FastAPI", "Python", "Pandas", "OpenPyXL", "Tailwind CSS"],
    githubUrl: "https://github.com/Ayan1702-D/Workbook-Converter",
    demoUrl: "https://workbook-converter.onrender.com",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop",
    status: "live",
  },
];
// export type ProjectCategory = "All" | "NLP" | "Computer Vision" | "Agentic AI" | "Web";
// export interface Project {
//   id: string;
//   title: string;
//   description: string;
//   fullDetails: string;
//   category: ProjectCategory;
//   techStack: string[];
//   githubUrl: string;
//   demoUrl: string;
//   image: string;
// }
// export const PROJECTS: Project[] = [
//   {
//     id: "1",
//     title: "Neural Vision Classifier",
//     description: "Real-time object detection model built from scratch using PyTorch.",
//     fullDetails: "This project implements a custom CNN architecture capable of running at 60fps on edge devices. Trained on a customized COCO dataset, it heavily utilizes data augmentation and hyperparameter tuning to achieve 92% mAP.",
//     category: "Computer Vision",
//     techStack: ["PyTorch", "OpenCV", "Python", "NumPy"],
//     githubUrl: "https://github.com/pytorch/vision", // Placeholder for actual fetch
//     demoUrl: "https://demo.com",
//     image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: "2",
//     title: "Semantic Text Summarizer",
//     description: "Transformer-based NLP pipeline for abstractive text summarization.",
//     fullDetails: "Fine-tuned a BERT-based model using Hugging Face to summarize long-form legal documents. Built a RESTful API backend using FastAPI to serve the model inference.",
//     category: "NLP",
//     techStack: ["Hugging Face", "Transformers", "FastAPI", "Docker"],
//     githubUrl: "https://github.com/huggingface/transformers",
//     demoUrl: "https://demo.com",
//     image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: "3",
//     title: "Autonomous Trading Agent",
//     description: "Reinforcement learning agent optimized for high-frequency simulated trading.",
//     fullDetails: "Developed an Agentic AI system that utilizes proximal policy optimization (PPO) to make simulated trades based on historical market data and real-time sentiment analysis APIs.",
//     category: "Agentic AI",
//     techStack: ["Python", "Ray RLlib", "Pandas", "Scikit-Learn"],
//     githubUrl: "https://github.com/ray-project/ray",
//     demoUrl: "https://demo.com",
//     image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: "4",
//     title: "Scalable Analytics Dashboard",
//     description: "Full-stack real-time data visualization platform.",
//     fullDetails: "A scalable web dashboard built with Next.js and Django. It ingests thousands of data points per second via WebSockets and visualizes them using D3.js and Framer Motion.",
//     category: "Web",
//     techStack: ["Next.js", "Django", "PostgreSQL", "Tailwind CSS"],
//     githubUrl: "https://github.com/django/django",
//     demoUrl: "https://demo.com",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: "5",
//     title: "Medical Image Segmentation",
//     description: "U-Net architecture for precise MRI tumor boundary detection.",
//     fullDetails: "Applied advanced image processing techniques to identify and segment anomalies in brain MRI scans. Integrated the model into a lightweight web interface for demonstration.",
//     category: "Computer Vision",
//     techStack: ["TensorFlow", "Keras", "Matplotlib", "Flask"],
//     githubUrl: "https://github.com/tensorflow/tensorflow",
//     demoUrl: "https://demo.com",
//     image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: "6",
//     title: "LLM Orchestrator Framework",
//     description: "Custom lightweight LangChain alternative for multi-agent tasks.",
//     fullDetails: "Created a framework to chain multiple LLM calls together with automated state management, memory buffers, and custom tool execution for complex reasoning tasks.",
//     category: "Agentic AI",
//     techStack: ["TypeScript", "Node.js", "OpenAI API", "Redis"],
//     githubUrl: "https://github.com/langchain-ai/langchain",
//     demoUrl: "https://demo.com",
//     image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
//   }
// ];