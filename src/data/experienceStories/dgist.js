export const dgistStory = {
    tagline: "Summer in Daegu: The \"GE Wars\" & The AGIS Experience",
    heroImage: "/images/dgist/Cambodian-intern.png",
    overview: "Role: Research Intern (AGIS Scholar) | Lab: Privacy and Applied Cryptography Lab (PACL) | Location: DGIST, South Korea | Period: June – August 2025",
    sections: [
        {
            id: "journey",
            title: "1. The Journey Begins: From CADT to DGIST",
            icon: "Globe",
            content: [
                {
                    type: "split-content",
                    src: "/images/dgist/PACL-intern-grouppic.png",
                    alt: "Research Team",
                    caption: "The AGIS 2025 Cohort at DGIST",
                    title: "Arrival in Korea",
                    text: "In the summer of 2025, I was selected for the ASEAN Global Intern Scholarship (AGIS) program, a competitive initiative bringing top students to South Korea. Together with my peers from the Cambodia Academy of Digital Technology (CADT) and ITC, I traveled to Daegu to join the Privacy and Applied Cryptography Lab (PACL) at DGIST.",
                    reverse: false
                },
                {
                    type: "narrative",
                    text: "PACL, led by Professor Young-Sik Kim, is a world-class research group at the forefront of securing the post-quantum era. Their work spans Post-Quantum Cryptography (PQC), Fully Homomorphic Encryption (FHE), and Vehicular Security."
                },
                {
                    type: "split-content",
                    src: "/images/dgist/PACL-intern-with-professor.png",
                    alt: "Prof. Kim",
                    caption: "Meeting Professor Young-Sik Kim",
                    title: "Mentorship",
                    text: "Walking into the lab, I was introduced to my supervisors: Mr. Seunghyun Cho (Advisor) and Mr. Jae Ho Jeon (Technical Supervisor). Their guidance — balancing academic rigor with practical competition strategies — would be pivotal in the weeks to come.",
                    reverse: true
                }
            ]
        },
        {
            id: "pivot",
            title: "2. The Pivot: Why CHES 2025?",
            icon: "Target",
            content: [
                {
                    type: "narrative",
                    text: "Usually, an internship at PACL would involve deep research into Post-Quantum algorithms. However, Professor Kim identified a logistical challenge: we only had six weeks. Real research into quantum-safe cryptography often takes months to yield results. To maximize our short time, the Professor proposed a dynamic alternative: Competition."
                },
                {
                    type: "narrative",
                    text: "This wasn't just about winning; it was about learning fast. We pivoted from pure theoretical research to an intense, hands-on engineering sprint."
                }
            ]
        },
        {
            id: "battlefield",
            title: "3. The Battlefield: CHES 2025 & \"GE Wars\"",
            icon: "Swords",
            content: [
                {
                    type: "narrative",
                    title: "The Challenge: Deep Learning SCA Battle",
                    text: "Hosted by PACE@TL (Nanyang Technological University), the goal was to perform a Profiled Side-Channel Attack (SCA). We were given electromagnetic (EM) traces from a device, and our job was to train a Neural Network to recover the secret AES-128 key."
                },
                {
                    type: "split-content",
                    src: "/images/dgist/intern-lab.png",
                    alt: "Lab Environment",
                    caption: "The PACL Research Environment",
                    title: "The \"Boss Fight\": Raspberry Pi 4B",
                    text: "In previous years, challenges targeted simple microcontrollers. This year, the target was a Raspberry Pi 4B running a full Debian Linux OS. This introduced massive complexity: OS Noise (hundreds of background processes burying the signal) and Temporal Jitter (out-of-order execution creating timing misalignment).",
                    reverse: true
                },
                {
                    type: "highlight-box",
                    title: "The Objective & Scoring Metrics",
                    items: [
                        "Goal: Recover the first byte of the secret key.",
                        "Metric: Composite Score combining Guessing Entropy (GE) and Traces Needed.",
                        "The Penalty: Failing to recover the key (GE > 0) results in a massive +100,000 score penalty.",
                        "Evaluation: Models must generalize across 1 Public Dataset AND 3 Hidden Private Datasets."
                    ]
                }
            ]
        },
        {
            id: "technical",
            title: "4. The Technical Deep Dive",
            icon: "Cpu",
            content: [
                {
                    type: "narrative",
                    text: "Working closely with my technical supervisor Jae Ho Jeon and advisor Seunghyun Cho, I engineered a pipeline to participate under the team name \"Ott3rly Av3rag3\"."
                },
                {
                    type: "split-content",
                    src: "/images/dgist/mr-cho-explaining-aes.png",
                    alt: "Lab Work",
                    caption: "Mr. Cho Explaining AES",
                    title: "Phase 1: Smart Preprocessing",
                    text: "We were given 500,000 power traces, each with 7,000 sample points. Feeding this directly into a Deep Learning model would crash our GPU. I implemented a Signal-to-Noise Ratio (SNR) analysis to identify the 250 specific points where the device leaked the most information. This 96.4% reduction in data size was the foundation of our speed.",
                    reverse: false
                },
                {
                    type: "process-diagram",
                    title: "Attack Pipeline",
                    steps: [
                        "Raw Traces (500k)",
                        "SNR Analysis",
                        "Variance Check",
                        "POI Selection (250 pts)"
                    ]
                },
                {
                    type: "narrative",
                    title: "The Optimization Strategy: Working Smarter",
                    text: "Training Deep Learning models for SCA is extremely sensitive to hyperparameters. With limited time and only a single NVIDIA T4 GPU, a standard \"Grid Search\" would have taken months. Instead, I implemented a 'Two-Stage Bayesian Optimization' strategy using Weights & Biases (W&B)."
                },
                {
                    type: "highlight-box",
                    title: "Stage 1: The 'Scope Run' Hack",
                    items: [
                        "The Constraint: Training a full 256-class Identity model takes hours.",
                        "The Hack: I first trained on the simpler 9-class Hamming Weight (HW) model using only 50k traces.",
                        "The Result: These 'Scope Runs' were lightning-fast, allowing the optimizer to filter hundreds of bad architectures and find the 'Top 10' promising patterns in record time."
                    ]
                },
                {
                    type: "split-content",
                    src: "/images/dgist/composite-score-monitor.png",
                    alt: "W&B Chart",
                    caption: "Bayesian Search Finding the 'Cluster of Success'",
                    title: "Stage 2: The 'Sweet Spot'",
                    text: "Once the 'Scope Runs' identified the promising region, I launched the full intensive search. We optimized for a custom Composite Score that penalized failure heavily. The algorithm converged on a configuration human intuition would have missed: a tiny Learning Rate range (9e-5 to 1.1e-4) and a precise Dropout of 0.267.",
                    reverse: true
                },
                {
                    type: "narrative",
                    text: "The Composite Score Formula developed to prioritize cryptanalytic success:\nScore = (GE_final * 1,000,000) + NTGE.\nIf the key is found (GE=0), the score represents efficiency (traces needed). If not, it applies a massive penalty."
                },
                {
                    type: "insight-box",
                    title: "Why This Mattered",
                    text: "This two-stage approach effectively simulated having 10x the computing power. By pruning the search space with 'Scope Runs', we focused our limited GPU resources entirely on the 'Cluster of Success', ensuring our final CNN was mathematically optimized for the Raspberry Pi's specific noise profile."
                }
            ]
        },
        {
            id: "results",
            title: "5. The Results: Rank 28th Global",
            icon: "Trophy",
            content: [
                {
                    type: "chart-bar",
                    title: "Key Metrics",
                    data: [
                        { label: "Success Rate", value: 100, color: "#4CAF50" },
                        { label: "Guessing Entropy", value: 0, color: "#2196F3" },
                        { label: "Traces Needed", value: 3879, color: "#FFC107" }
                    ],
                    caption: "Perfect 0.0 Guessing Entropy with high efficiency."
                },
                {
                    type: "table",
                    title: "Official CHES 2025 Challenge Results",
                    headers: ["ID", "Type", "Public", "Priv 1", "Priv 2", "Priv 3", "Final Score"],
                    rows: [
                        ["#10", "CNN", "97,684", "200,001", "96,134", "87,133", "120,238"],
                        ["#12", "CNN", "99,774", "99,993", "200,033", "90,266", "122,516"],
                        ["#5", "CNN", "91,454", "200,005", "200,043", "79,337", "142,709"],
                        ["#4", "CNN", "97,412", "200,001", "200,037", "87,112", "146,140"],
                        ["#9", "CNN", "99,106", "200,002", "200,029", "86,531", "146,417"],
                        ["#6", "CNN", "98,863", "200,002", "200,022", "96,120", "148,751"],
                        ["#7", "CNN", "98,770", "200,011", "200,075", "94,759", "148,403"],
                        ["#11", "CNN", "97,222", "200,004", "200,005", "96,527", "148,439"],
                        ["#3", "CNN", "97,217", "200,009", "200,071", "98,288", "148,896"],
                        ["#8", "CNN", "96,431", "200,009", "200,077", "99,992", "149,127"],
                        ["#1", "MLP", "3,879", "200,105", "200,117", "200,054", "151,038"],
                        ["#0", "MLP", "8,446", "200,122", "200,110", "200,091", "152,192"]
                    ],
                    caption: "Results for Team 'Ott3rly Av3rag3'. Lower Score is Better."
                },
                {
                    type: "highlight-box",
                    title: "Data Analysis: The 'Overfitting' Trap",
                    items: [
                        "The 'Generalization' Winner (ID 10): Our best model wasn't the best on public data, but it was ROBUST. It solved Private Sets 2 & 3, proving it learned real features, not noise.",
                        "The MLP Trap (ID 1): Look at ID #1. It smashed the Public set (3,879 traces!) but FAILED every private set. This proves MLPs overfit to specific noise patterns and lack the translation invariance needed for real-world devices."
                    ]
                },
                {
                    type: "split-content",
                    src: "/images/dgist/PACL-mentor-intern-group.png",
                    alt: "Team Success",
                    caption: "Last day with PACL Mentors",
                    title: "Global Recognition",
                    text: "Our team 'Ott3rly Av3rag3' ranked 28th globally out of 110+ teams. The consistency of our CNN models (hovering around 90k-100k traces) was a direct result of our Bayesian Optimization. We didn't just get lucky; we engineered reliability.",
                    reverse: true
                }
            ]
        },
        {
            id: "life",
            title: "6. Life in Korea: Beyond the Code",
            icon: "Globe",
            content: [
                {
                    type: "split-content",
                    src: "/images/dgist/birth-day-suprise-by-mentor.png",
                    alt: "Birthday",
                    caption: "Surprise Birthday Party",
                    title: "The Community",
                    text: "The AGIS program wasn't just about the lab; it was about cultural immersion. One of the most touching moments was when my mentors organized a surprise birthday celebration for us. It truly felt like a family, bonding over late-night debugging and pizza.",
                    reverse: false
                },
                {
                    type: "highlight-box",
                    title: "The Adventure",
                    items: [
                        "Pohang: Toured the massive POSCO steel manufactory.",
                        "Daegu: Cable car up Apsan Park for sunset views.",
                        "Tradition: Learned patience through a dojang stamp-making class."
                    ]
                },
                {
                    type: "image-gallery",
                    title: "Cultural Immersion",
                    images: [
                        { src: "/images/dgist/polhang-accelarator-lab.png", alt: "Pohang", caption: "International Intern at Accelerator Lab" },
                        { src: "/images/dgist/apsan-park-on-top-mountain.png", alt: "Apsan", caption: "Top of Apsan Mountain" },
                        { src: "/images/dgist/chimac-festival.png", alt: "Chimac", caption: "Chimac Festival" },
                        { src: "/images/dgist/stamping-art.png", alt: "Stamping", caption: "Stamping Art" }
                    ]
                }
            ]
        },
        {
            id: "reflections",
            title: "Reflections",
            icon: "EyeOff",
            content: [
                {
                    type: "split-content",
                    src: "/images/dgist/traditional-outfit.png",
                    alt: "Traditional Outfit",
                    caption: "Embracing Korean Culture",
                    title: "Adaptability",
                    text: "This 6-week internship was a masterclass in adaptability. I learned that in research, constraints (like time) can drive creativity. I left DGIST not just with a completed project, but with a global network of mentors and friends.",
                    reverse: true
                }
            ]
        },
        {
            id: "archive",
            title: "Memory Archive",
            icon: "Database",
            content: [
                {
                    type: "narrative",
                    text: "A complete visual log of the AGIS 2025 Summer. Unfiltered and unforgettable."
                },
                {
                    type: "image-gallery",
                    title: "The Lab & Interns & Campus Life",
                    images: [
                        { src: "/images/dgist/PACL-intern.png", alt: "Interns", caption: "PACL Team" },
                        { src: "/images/dgist/PACL-mentor-intern2.png", alt: "Team", caption: "PACL male members" },
                        { src: "/images/dgist/intern-lab.png", alt: "Lab", caption: "Configuring the lab" },
                        { src: "/images/dgist/campus2.png", alt: "Campus", caption: "Campus Site" },
                        { src: "/images/dgist/campus3.png", alt: "Campus", caption: "Campus Site 2" },
                        { src: "/images/dgist/campus5.png", alt: "Campus", caption: "Campus Site 3" },
                        { src: "/images/dgist/campus6.png", alt: "Campus", caption: "Campus Site 4" },
                        { src: "/images/dgist/campus-inside.png", alt: "Inside Campus Building", caption: "Inside Campus Building" },
                        { src: "/images/dgist/cadt-student-at-cambodian-airport.png", alt: "Airport", caption: "Departure" },
                        { src: "/images/dgist/cadt-student-selfies.png", alt: "Selfies", caption: "CADT Student Selfies" },
                        { src: "/images/dgist/dinner-with-mentor.png", alt: "Dinner", caption: "Dinner with Mentor" }
                        
                    ]
                },
                {
                    type: "image-gallery",
                    title: "Adventures & Travel",
                    images: [
                        { src: "/images/dgist/busan-beach-selfies.png", alt: "Busan", caption: "Beach Day" },
                        { src: "/images/dgist/cambodians-intern-busan-mirror-selfies.png", alt: "Busan Mirror Selfies", caption: "Busan Mirror Selfies" },
                        { src: "/images/dgist/busan1.png", alt: "Busan", caption: "Coastal View" },
                        { src: "/images/dgist/busan2.png", alt: "Busan", caption: "Ocean Blue" },
                        { src: "/images/dgist/apsan-cable-car.png", alt: "Apsan", caption: "Cable Car Ride" },
                        { src: "/images/dgist/pacl-apsan-mountain-climb.png", alt: "Hiking", caption: "Mountain Climb" },
                        { src: "/images/dgist/chimac-hillwalking.png", alt: "Walking", caption: "Hill Walk" },
                        { src: "/images/dgist/pohang-accelerator.png", alt: "Pohang", caption: "Accelerator Facility" },
                        { src: "/images/dgist/pohang-university-of-science-and-technology-tour-pic.png", alt: "POSTECH", caption: "POSTECH Tour" },
                        { src: "/images/dgist/traditional-korean-temple.png", alt: "Temple", caption: "Temple Visit" },
                        { src: "/images/dgist/medicine-museum.png", alt: "Museum", caption: "Medicine Museum" },
                        { src: "/images/dgist/group-picture.png", alt: "Group", caption: "Art Gallery Selfies Booth" },
                        { src: "/images/dgist/downtown-dague.png", alt: "Downtown", caption: "Art Gallery Selfies Booth" },
                        { src: "/images/dgist/downtown-daegu.png", alt: "Downtown", caption: "Across the street" },
                    ]
                },
                {
                    type: "image-gallery",
                    title: "Daily Life & Culture",
                    images: [
                        { src: "/images/dgist/birthday-suprise3.png", alt: "bday", caption: "Celebration" },
                        { src: "/images/dgist/last-day-gift-giving-with-mentor.png", alt: "Gift", caption: "Farewell Gifts" },
                        { src: "/images/dgist/korean-clothe-cosplay.png", alt: "Hanbok", caption: "Trying Hanbok" },
                        { src: "/images/dgist/chimac-dance.png", alt: "Dance", caption: "Festival Dance" },
                        { src: "/images/dgist/korean-market.png", alt: "Market", caption: "Seomun Market" },
                        { src: "/images/dgist/campus-tunnel.png", alt: "Campus", caption: "DGIST tunnel" },
                        { src: "/images/dgist/laundry.png", alt: "Life", caption: "Dorm Life" },
                        { src: "/images/dgist/convenient-store-microwave-pizza.png", alt: "Microwave Pizza", caption: "Microwave Pizza" },
                        { src: "/images/dgist/shopping.png", alt: "Shopping", caption: "City Shopping" },
                        { src: "/images/dgist/train-station-picture-with-interns.png", alt: "Train", caption: "Navigating the train station" }
                    ]
                },

                {
                    type: "image-gallery",
                    title: "Food & Hangouts",
                    images: [
                        { src: "/images/dgist/busan-black-beans-noodle.png", alt: "Jajangmyeon", caption: "Black Bean Noodles" },
                        { src: "/images/dgist/korean-market2.png", alt: "Street Food", caption: "Street Snacks" },
                        { src: "/images/dgist/steet-food-market.png", alt: "Food Market", caption: "Market Feast" },
                        { src: "/images/dgist/buffet.png", alt: "Buffet", caption: "Team Dinner" },
                        { src: "/images/dgist/trio-korean-bbq.png", alt: "BBQ", caption: "Korean BBQ" },
                        { src: "/images/dgist/pizza-movie-night.png", alt: "Pizza", caption: "Movie Night" },
                        { src: "/images/dgist/cafe-selfies.png", alt: "Cafe", caption: "Cafe Hopping" },
                        { src: "/images/dgist/cafe.png", alt: "Cafe2", caption: "Cafe Hangout" },
                        { src: "/images/dgist/hangout1.png", alt: "Hangout", caption: "Weekend Vibes" },
                        { src: "/images/dgist/chimac-selfies.png", alt: "Chimac", caption: "Chicken & Beer" }
                    ]
                }
            ]
        }
    ],
    techStack: ["PyTorch", "W&B", "NumPy", "Python", "Side-Channel Analysis", "CNN", "MLOps"],
    links: {
        company: "https://sites.google.com/view/pacl/home?authuser=0",
        paper: "/pdf/GE-War-Korea-Report.pdf",
        challenge: "https://pace-tl.gitbook.io/ches-challenge-2025"
    }
}
