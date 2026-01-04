export const cvData = {
    personal: {
        name: "Lay Sopanha",
        title: "Data Science Researcher",
        email: "panhalay69420@gmail.com",
        location: "Phnom Penh, Cambodia",
        links: {
            linkedin: "https://www.linkedin.com/in/lay-sopanha-12a62b2b4/",
            github: "https://github.com/LaySopanha"
        }
    },
    education: [
        {
            school: "Cambodia Academy of Digital Technology (CADT)",
            degree: "Bachelor of Computer Science (Data Science Major)",
            date: "Expected Dec 2026",
            gpa: "4.0 / 4.0 (Year 3)",
            coursework: "Advanced Algorithms, Machine Learning, Cryptography, Distributed Systems, Cloud Computing, Big Data Analytics"
        }
    ],
    publications: [
        {
            title: "An Efficient OCR Pipeline for Semi-Structured Khmer Documents Using Layout Analysis and Text-Type Classification",
            authors: "L. Sopanha, V. Kao, S. Kong, M. Ang, and H. Va",
            venue: "Proceedings of the 2025 Annual Conference on Engineering and Technology (ACET)",
            year: "2025",
            link: "#"
        }
    ],
    experience: [
        {
            role: "DGIST Summer Research Intern",
            company: "Privacy & Applied Cryptography Lab (PACL), DGIST",
            location: "Daegu, South Korea",
            date: "Jun 2025 – Aug 2025",
            description: [
                "Selected for an intensive on-site research immersion to compete in the CHES 2025 'GE Wars' Challenge.",
                "Collaborated directly with lab PhDs to target AES implementations on Raspberry Pi 4B, developing models to overcome hardware jitter and noise.",
                "Trained CNN models on 500k profiling traces, successfully minimizing Guessing Entropy (GE)."
            ]
        },
        {
            role: "IDRI Research Internship",
            company: "Institute for Digital Research & Innovation (IDRI)",
            location: "Phnom Penh, Cambodia",
            date: "May 2025 – Jul 2025",
            description: [
                "Engineered a modular OCR pipeline for semi-structured documents (Khmer language).",
                "Trained custom text classifiers using MobileNetV3 and compared Tesseract vs. Transformer-based models (TrOCR).",
                "Managed experiments using Weights & Biases (MLOps); research findings contributed to ACET 2025."
            ]
        },
        {
            role: "Lead Researcher (Deep Learning & Infrastructure)",
            company: "CADT Capstone Project II",
            location: "Phnom Penh, Cambodia",
            date: "Oct 2025 – Dec 2025",
            description: [
                "Developed an end-to-end Transformer-based OCR pipeline (TrOCR) for low-resource Khmer handwriting.",
                "Replaced standard tokenizer with XLM-RoBERTa and fine-tuned on Lightning AI cloud infrastructure (H200 GPUs).",
                "Achieved a Character Error Rate (CER) of 0.87, significantly outperforming Tesseract (1.02).",
                "Implemented Optuna for hyperparameter optimization."
            ]
        },
        {
            role: "Lead Researcher",
            company: "Independent Research Project",
            location: "Phnom Penh, Cambodia",
            date: "Oct 2025 – Present",
            description: [
                "Developing deep learning models to interpret EEG/EMG biosignals for real-time robotic limb actuation.",
                "Implementing hybrid CNN/RNN architectures to decode signal patterns for human-AI interaction."
            ]
        }
    ],
    projects: [
        {
            name: "HPC Cloud Solution for Machine Learning",
            tech: "Kubernetes, Slurm, Ceph",
            date: "Dec 2024 – Jan 2025",
            description: "Deployed a full HPC cluster using Ceph and Slurm on Kubernetes. Optimized resource allocation for AI model training."
        },
        {
            name: "Social Media Sentiment Analysis Pipeline",
            tech: "Spark, Hadoop, NLP",
            date: "Nov 2024 – Dec 2024",
            description: "Architected a Big Data pipeline to ingest and process large-scale text data from Twitter/Reddit using Spark and Hadoop."
        },
        {
            name: "Multi-Model Disease Prediction System",
            tech: "Scikit-learn, Gradio",
            date: "Jan 2025 – Apr 2025",
            description: "Built an ensemble diagnostic system using Random Forest, CatBoost, and SVM. Engineered a Gradio interactive web interface."
        },
        {
            name: "Plane Ticket Accounting System",
            tech: "React, Laravel, Docker",
            date: "Jul 2025 – Sep 2025",
            description: "Developed a B2B full-stack system for a flight ticket distributor. Designed RESTful APIs and containerized with Docker."
        }
    ],
    skills: {
        "AI & Data Science": ["PyTorch", "TensorFlow", "MindSpore", "Scikit-learn", "MLOps (W&B)", "Computer Vision (OCR)", "NLP", "Spark", "Hadoop"],
        "Systems & Cloud": ["Kubernetes", "Slurm", "Ceph", "Docker", "Linux/Unix", "Git"],
        "Languages": ["Python (Advanced)", "C++", "SQL", "JavaScript/TypeScript", "PHP"],
        "Web Frameworks": ["FastAPI", "Django", "Laravel", "React", "Vue.js"]
    },
    honors: [
        {
            title: "Social Impact Award Winner – BMC 2025",
            issuer: "Embassy of Ireland",
            year: "2025",
            description: "Awarded a fully funded study trip to Dublin, Ireland."
        },
        {
            title: "Techo Digital Scholarship",
            issuer: "Cambodia Academy of Digital Technology",
            year: "2023 – Present",
            description: "Awarded full 4-year government scholarship based on academic merit."
        }
    ]
};
