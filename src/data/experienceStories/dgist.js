export const dgistStory = {
    tagline: "CHES 2025 Challenge | Deep Learning Side-Channel Analysis",
    heroImage: "/images/dgist/Cambodian-intern.png",
    overview: "A summer of intense research at DGIST, South Korea, engaged in the global CHES 2025 Challenge: breaking AES encryption on a Raspberry Pi 4B using Deep Learning.",
    sections: [
        {
            id: "context",
            title: "The Arena: CHES 2025 & PACL",
            icon: "Globe",
            content: [
                {
                    type: "narrative",
                    text: "The Conference on Cryptographic Hardware and Embedded Systems (CHES) is the premier venue for hardware security. The 2025 Challenge, 'GE Wars', tasked researchers with a 'Profiled Side-Channel Attack' against a Raspberry Pi 4B running Linux. The goal: recover the secret AES key despite massive noise and jitter."
                },
                {
                    type: "highlight-box",
                    title: "About PACL (Privacy & Applied Cryptography Lab)",
                    items: [
                        "Located at DGIST (Daegu Gyeongbuk Institute of Science and Technology)",
                        "Led by Prof. Young-Sik Kim",
                        "Focus Areas: Post-Quantum Crypto (PQC), Fully Homomorphic Encryption (FHE), Side-Channel Analysis (SCA)"
                    ]
                }
            ]
        },
        {
            id: "mission",
            title: "The Technical Mission",
            icon: "Target",
            content: [
                {
                    type: "narrative",
                    text: "My role was to architect an end-to-end Deep Learning pipeline capable of recovering the key from 100,000 attack traces."
                },
                {
                    type: "challenge-cards",
                    challenges: [
                        {
                            title: "High Noise (SNR)",
                            description: "Linux background processes buried the leakage signal.",
                            icon: "Radio"
                        },
                        {
                            title: "Jitter",
                            description: "CPU out-of-order execution caused massive temporal misalignment.",
                            icon: "Clock"
                        },
                        {
                            title: "Dimensionality",
                            description: "7,000 points per trace required 96% reduction via POI selection.",
                            icon: "Database"
                        }
                    ]
                },
                {
                    type: "image",
                    src: "/images/dgist/intern-lab.png",
                    alt: "PACL Lab Environment",
                    caption: "The PACL research environment where we developed the attack pipeline."
                }
            ]
        },
        {
            id: "implementation",
            title: "Engineering the Attack",
            icon: "Code",
            content: [
                {
                    type: "narrative",
                    text: "I eschewed standard accuracy metrics for a custom 'Attack-Driven' training loop that prioritized key recovery."
                },
                {
                    type: "implementation-steps",
                    steps: [
                        {
                            number: "01",
                            title: "Preprocessing",
                            description: "SNR-based Point-of-Interest (POI) selection reduced traces from 7,000 to 250 points, isolating leakage.",
                            result: "96.4% Data Reduction",
                            tech: ["NumPy", "SciPy", "SNR Analysis"]
                        },
                        {
                            number: "02",
                            title: "Deep Learning Model",
                            description: "Custom 1D-CNN designed to be invariant to temporal jitter. Optimized with Bayesian Search (W&B).",
                            result: "Robust Pattern Recognition",
                            tech: ["PyTorch", "CNN", "W&B"]
                        }
                    ]
                }
            ]
        },
        {
            id: "results",
            title: "Competition Results",
            icon: "Trophy",
            content: [
                {
                    type: "narrative",
                    text: "Our team 'Ott3rly Av3rag3' achieved perfect key recovery (GE=0.0) with high efficiency. We ranked 28th globally out of 110+ teams."
                },
                {
                    type: "result-table",
                    title: "Official CHES 2025 Setup - Top Models",
                    headers: ["Submission ID", "Model", "Public Traces", "Final Score"],
                    rows: [
                        ["Ott3rly Av3rag3 10", "CNN", "97,684", "120,238.00"],
                        ["Ott3rly Av3rag3 12", "CNN", "99,774", "122,516.50"],
                        ["Ott3rly Av3rag3 5", "CNN", "91,454", "142,709.75"],
                        ["Ott3rly Av3rag3 1", "MLP", "3,879", "151,038.75"]
                    ]
                },
                {
                    type: "insight-box",
                    title: "Success Factor",
                    text: "The MLP model (Submission 1) was incredibly efficient, needing only 3,879 traces to break the key, highlighting the power of simple architectures on well-processed data."
                }
            ]
        },
        {
            id: "experience",
            title: "Life in Daegu",
            icon: "Globe",
            content: [
                {
                    type: "narrative",
                    text: "The internship was more than just code. It was an immersion into Korean culture, from the bustle of Daegu to the coastal beauty of Busan."
                },
                {
                    type: "narrative",
                    text: "The lab environment at DGIST was collaborative and welcoming. We had regular movie nights, team dinners, and cultural excursions."
                },
                {
                    type: "image-gallery",
                    images: [
                        { src: "/images/dgist/PACL-intern-grouppic.png", alt: "PACL Team", caption: "PACL Team" },
                        { src: "/images/dgist/birthday-suprise.png", alt: "Birthday", caption: "Lab Birthday Party" },
                        { src: "/images/dgist/pizza-movie-night.png", alt: "Movie Night", caption: "Pizza & Movie Night" },
                        { src: "/images/dgist/stamping-art.png", alt: "Culture Class", caption: "Traditional Art Class" }
                    ]
                }
            ]
        },
        {
            id: "travel",
            title: "Exploration & Travel",
            icon: "Camera",
            content: [
                {
                    type: "image-gallery",
                    images: [
                        { src: "/images/dgist/busan1.png", alt: "Busan", caption: "Busan Coast" },
                        { src: "/images/dgist/apsan-park-on-top-mountain.png", alt: "Apsan", caption: "Apsan Mountain View" },
                        { src: "/images/dgist/traditional-korean-temple.png", alt: "Temple", caption: "Historical Temple" },
                        { src: "/images/dgist/chimac-festival.png", alt: "Festival", caption: "Daegu Chimac Festival" }
                    ]
                }
            ]
        }
    ],
    techStack: ["PyTorch", "W&B", "NumPy", "Python", "Side-Channel Analysis", "CNN", "MLOps"],
    links: {
        challenge: "https://ches.iacr.org/2025/challenge.php"
    }
}
