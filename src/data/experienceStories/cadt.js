export const cadtStory = {
    tagline: "Lead Researcher (Deep Learning & Infrastructure)",
    heroImage: "/images/ACET 2025/TrOCR_pipeline_architecture.jpg",
    overview: "Role: Lead Researcher | Project: CADT Capstone Project II | Location: Phnom Penh, Cambodia | Period: Oct 2025 - Dec 2025",
    sections: [
        {
            id: "mission",
            title: "Mission Log",
            icon: "Zap",
            content: [
                {
                    type: "narrative",
                    text: "Developed an end-to-end Transformer-based OCR pipeline (TrOCR) for low-resource Khmer handwriting."
                },
                {
                    type: "narrative",
                    text: "Replaced standard tokenizer with XLM-RoBERTa and fine-tuned on Lightning AI cloud infrastructure (H200 GPUs)."
                },
                {
                    type: "split-content",
                    src: "/images/ACET 2025/TrOCR_pipeline_architecture.jpg",
                    alt: "TrOCR Pipeline Architecture",
                    caption: "TrOCR Pipeline Architecture",
                    title: "Technical Achievement",
                    text: "Achieved a Character Error Rate (CER) of 0.87, significantly outperforming Tesseract (1.02). Implemented Optuna for hyperparameter optimization.",
                    reverse: false
                }
            ]
        },
        {
            id: "development",
            title: "Development Process",
            icon: "Cpu",
            content: [
                {
                    type: "narrative",
                    text: "This capstone project built upon my earlier IDRI internship work, addressing the limitations I had identified in the initial one-month sprint."
                },
                {
                    type: "highlight-box",
                    title: "Key Achievements",
                    items: [
                        "Developed an end-to-end Transformer-based OCR pipeline (TrOCR) for low-resource Khmer handwriting",
                        "Replaced standard tokenizer with XLM-RoBERTa and fine-tuned on Lightning AI cloud infrastructure (H200 GPUs)",
                        "Achieved a Character Error Rate (CER) of 0.87, significantly outperforming Tesseract (1.02)",
                        "Implemented Optuna for hyperparameter optimization"
                    ]
                },
                {
                    type: "narrative",
                    text: "The project demonstrated the power of modern deep learning approaches for low-resource languages, setting a new benchmark for Khmer OCR performance."
                }
            ]
        },
        {
            id: "impact",
            title: "Impact & Results",
            icon: "Zap",
            content: [
                {
                    type: "narrative",
                    text: "The successful completion of this capstone project validated the research direction established during my IDRI internship and demonstrated significant improvements in OCR accuracy for Khmer handwriting."
                },
                {
                    type: "narrative",
                    text: "By leveraging state-of-the-art transformer architecture and cloud GPU infrastructure, we achieved performance levels that make practical deployment feasible for real-world Khmer document digitization tasks."
                }
            ]
        }
    ]
}
