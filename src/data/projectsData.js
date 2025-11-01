const projectsData = [
    {
        id: 1,
        title: "FinologyX - Financial Calculator",
        description: "Mobile application offering a complete suite of financial and mathematical calculators using Flutter and MVC architecture. Features include compound interest, loan calculations, and investment planning tools.",
        fullDescription: "A comprehensive financial calculator mobile application built with Flutter, featuring over 20+ financial calculators including compound interest, EMI, SIP, tax calculators, and more. Implements clean MVC architecture with local data persistence and API integration for real-time currency conversion.",
        tags: ["Flutter", "Dart", "MVC", "API Integration", "Mobile"],
        category: "mobile",
        links: {
            live: "https://play.google.com/store/apps/details?id=com.app.finologyx",
            code: "https://github.com/tithi0126/finologyx"
        },
        image: "/Finology_logo.png",
        status: "live",
        featured: true,
        visibility: "public",
        isGithubPrivate: false // Public repo
    },
    {
        id: 2,
        title: "Inner Voice - Health Monitoring",
        description: "Smartwatch-based health monitoring system focused on mental wellness, integrating wearable hardware with mobile and web applications.",
        fullDescription: "An innovative IoT-based health monitoring system that combines smartwatch hardware with mobile and web applications. The system monitors vital signs, stress levels, and mental wellness indicators, providing real-time insights and alerts to users and healthcare providers.",
        tags: ["Arduino", "Flutter", "React.js", "REST API", "IoT", "Hardware"],
        category: ["iot", "mobile", "web", "ai"],
        links: {
            live: "#",
            code: "https://github.com/innervoicehealingconversation"
        },
        image: "/inner_voice_logo.png",
        status: "development",
        featured: true,
        visibility: "public",
        isGithubPrivate: true // Private repo
    },
    {
        id: 3,
        title: "Root Out - AI Weed Cutter",
        description: "AI-powered robotic weed cutter using Python (OpenCV, TensorFlow) and IoT to reduce herbicide use through precision weed identification.",
        fullDescription: "An AI-powered agricultural robot that uses computer vision and machine learning to identify and eliminate weeds with precision. The system reduces herbicide usage by 40% while maintaining crop health through selective weed removal. Features real-time image processing, GPS navigation, and IoT connectivity.",
        tags: ["Python", "OpenCV", "TensorFlow", "IoT", "AI/ML", "Robotics"],
        category: ["ai", "iot"],
        links: {
            live: "#",
            code: "#"
        },
        image: "/RootOut_Logo.png",
        status: "completed",
        featured: true,
        visibility: "public",
        isGithubPrivate: false // Public repo
    },
    {
        id: 4,
        title: "Rowan Decor",
        description: "Flutter-based application for home decor services with intuitive UI and seamless user experience.",
        fullDescription: "A comprehensive home decor service application built with Flutter, featuring catalog browsing, service booking, real-time chat with designers, augmented reality preview, and integrated payment gateway. Includes admin panel for service management.",
        tags: ["Flutter", "Dart", "UI/UX", "Firebase", "Payment Gateway"],
        category: "mobile",
        links: {
            live: "#",
            code: "https://github.com/rachna0206/rowan_user"
        },
        image:"/RowanDecor_Logo.jpg",
        status: "completed",
        featured: false,
        visibility: "public",
        isGithubPrivate: true // Private repo
    },
    {
        id: 5,
        title: "Borana Weaves",
        description: "Website for Borana, showcasing their services and portfolio.",
        fullDescription: "A professional website developed for Borana, providing information about their company, services, and contact details. Designed for a clean user experience and responsive across devices.",
        tags: ["Web Development", "HTML", "CSS", "JavaScript","Php"],
        category: "web",
        links: {
            live: "https://www.boranagroup.in/",
            code: "https://github.com/roshnirana-2/borana"
        },
        image: "/borana-weaves-logo.png", 
        status: "live",
        featured: false,
        visibility: "public",
        isGithubPrivate: false // Public repo
    },
    {
        id: 6,
        title: "The Cheelaya",
        description: "A website for a local business, 'The Cheelaya', showcasing their products and services.",
        fullDescription: "A responsive website built for 'The Cheelaya', a local business. The site features a product catalog, contact information, and an 'about us' section. Developed with modern web technologies to ensure a smooth user experience across all devices.",
        tags: ["Web Development", "HTML", "CSS", "JavaScript","React","Node.js","Express","MongoDB"],
        category: "web",
        links: {
            live: "https://the-cheelaya.onrender.com",
            code: "https://github.com/tithi0126/thecheelaya"
        },
        image: "/thecheelaya1.png",
        status: "live",
        featured: false,
        visibility: "public",
        isGithubPrivate: false // Public repo
    }
];

export default projectsData;
