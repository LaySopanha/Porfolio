export const idriStory = {
    title: "IDRI Internship",
    tagline: "Building a Minimum Viable Product in a 1-Month Sprint",
    heroImage: "/images/idri/group-photo-defence-day.png",
    overview: "Role: Data Scientist Intern | Organization: Institute of Digital Research & Innovation (IDRI) | Location: Phnom Penh | Period: May 2025 (Accelerated)",
    sections: [
        {
            id: "context",
            title: "1. Context: The 'Sprint'",
            icon: "Clock",
            content: [
                {
                    type: "narrative",
                    text: "IDRI is Cambodia's leading public research institution for digital technology. I joined to contribute to their national digitization initiative."
                },
                {
                    type: "split-content",
                    src: "/images/idri/defence_day_opening_remark_by_dean-Dr-Cheab-Sovuthy.png",
                    alt: "IDRI Context",
                    caption: "Internship Opening Remarks",
                    title: "A Shift in Scope",
                    text: "Originally a 3-month term, my timeline was compressed into a 4-week intensive sprint due to my acceptance into the DGIST fellowship in Korea. The goal shifted from 'delivering a polished product' to 'architecting and proving a Minimum Viable Product (MVP)' that could serve as the foundation for future research.",
                    reverse: false
                }
            ]
        },
        {
            id: "challenge",
            title: "2. The Challenge: 'Mixed-Media' Chaos",
            icon: "EyeOff",
            content: [
                {
                    type: "narrative",
                    text: "The goal was to digitize Cambodian Birth Certificates. These documents are uniquely difficult for AI because they are Semi-Structured and Mixed-Media."
                },
                {
                    type: "split-content",
                    src: "/images/idri/original-birth-certificate.png",
                    alt: "Birth Certificate Sample",
                    caption: "Figure 1: Complex Mixed-Media Document",
                    title: "The 'Two-Font' Problem",
                    text: "Documents contain machine-printed template text alongside highly variable handwritten entries. Standard OCR engines (like Google Lens) fail here, attempting to read the handwriting as printed text, resulting in high Character Error Rates. Furthermore, unlike English, there are no massive, pre-labeled datasets for Khmer handwriting.",
                    reverse: true,
                    isLarge: true
                }
            ]
        },
        {
            id: "solution",
            title: "3. The Engineering Solution",
            icon: "Cpu",
            content: [
                {
                    type: "narrative",
                    text: "Due to the 1-month constraint, training a massive end-to-end model (like TrOCR) was infeasible. I engineered a Modular 'Divide-and-Conquer' Pipeline."
                },
                {
                    type: "split-content",
                    src: "/images/idri/Architecture-pipeline.jpg",
                    alt: "Pipeline Architecture",
                    caption: "Figure 2: The Modular Architecture",
                    title: "Divide & Conquer",
                    text: "Instead of one giant model, I split the task into three distinct stages: Layout Analysis, Classification, and Recognition. This modularity allowed me to swap out components (like the OCR engine) without breaking the entire system.",
                    reverse: false
                },
                {
                    type: "process-diagram",
                    title: "Workflow",
                    steps: [
                        "Input Scan",
                        "Layout Analysis (Paddle)",
                        "Classify (MobileNet)",
                        "Route to OCR"
                    ]
                },
                {
                    type: "split-content",
                    src: "/images/idri/detection-output.png",
                    alt: "Layout Analysis",
                    caption: "Figure 3: Layout Detection Output",
                    title: "Stage 1: Layout Analysis",
                    text: "I utilized PaddleOCR’s PP-DocLayout (pre-trained) to instantly 'see' the document structure. This allowed the system to ignore noise (seals, logos) and identify the specific bounding boxes of Tables, Cells, and Text Paragraphs.",
                    reverse: true,
                    isLarge: true
                },
                {
                    type: "highlight-box",
                    title: "Stage 2: The Core Innovation (Classifier)",
                    items: [
                        "The Problem: We needed a 'brain' to decide which OCR engine to use for each box.",
                        "The Model: I trained a custom MobileNetV3 classifier.",
                        "Performance: Achieved 99.1% Accuracy in distinguishing between Printed and Handwritten snippets.",
                        "Why: Computationally cheap and fast, suitable for government servers."
                    ]
                },
                {
                    type: "split-content",
                    src: "/images/idri/final-visual-output.jpg",
                    alt: "Final Output",
                    caption: "Figure 4: Final Prototype Output",
                    title: "Stage 3: Targeted Recognition",
                    text: "The pipeline acted as a traffic controller. Printed text (Blue boxes) was routed to Tesseract 5 (Khmer pack). Handwritten text (Red boxes) was detected, cropped, and saved for future processing, solving the 'mixed-media' confusion.",
                    reverse: false,
                    isLarge: true
                }
            ]
        },
        {
            id: "analysis",
            title: "4. Critical Analysis: Limitations",
            icon: "Target",
            content: [
                {
                    type: "narrative",
                    text: "While the prototype was functional, the compressed 1-month timeline meant specific trade-offs were made. In my final report, I identified three critical issues."
                },
                {
                    type: "highlight-box",
                    title: "The 'Small Data' Trap",
                    items: [
                        "Data Scarcity: I only annotated 20 documents (~1,600 snippets).",
                        "Overfitting: While accuracy was high (99%), the model likely overfit to the specific fonts of those 20 documents.",
                        "Handwriting Gap: The prototype could find handwriting, but not read it. Reading Khmer handwriting requires dataset scale I didn't have."
                    ]
                }
            ]
        },
        {
            id: "outcome",
            title: "5. The Outcome: Prototype to Publication",
            icon: "Zap",
            content: [
                {
                    type: "split-content",
                    src: "/images/idri/defence_jury.jpg",
                    alt: "Defence",
                    caption: "Prototype Defence",
                    title: "Proof of Concept",
                    text: "This internship proved that a Classification-First approach was the correct strategy for Khmer documents. I didn't let the limitations stand. After returning from Korea, I expanded the dataset and addressed the 'Handwriting Gap' using TrOCR.",
                    reverse: true
                },
                {
                    type: "insight-box",
                    title: "Connecting the Dots",
                    text: "This 1-month sprint served as the experimental basis for my paper 'An Efficient OCR Pipeline for Semi-Structured Khmer Documents,' which was subsequently accepted at the ACET 2025 Conference."
                },
                {
                    type: "image-gallery",
                    title: "Gallery",
                    images: [
                        { src: "/images/idri/student-attending-remark-opening.png", alt: "Community", caption: "IDRI Research Community" },
                        { src: "/images/idri/group-photo-defence-day.png", alt: "Team", caption: "Internship Cohort" },
                        { src: "/images/idri/ocr-birthcertificate-brainstorming.png", alt: "Brainstorming", caption: "Early Whiteboarding" }
                    ]
                }
            ]
        }
    ],
    techStack: ["PaddleOCR", "MobileNetV3", "Python", "Tesseract", "OpenCV", "Docker"],
    links: {
        company: "https://www.idri.edu.kh/",
        paper: "/pdf/IDRI-Internship-report.pdf"
    }
}
