const me = {
    jobtitle: "Engineering Student & Hacker",
    description: "Hi 👋 ! My name is Leo, and I'm a french engineering student in second year at Télécom Saint-Etienne, in France 🇫🇷 . I'm particularly interested in computer science and cybersecurity 🖥️",
    long_description: "Hi 👋 ! My name is Leo, and I'm a french engineering student in second year at Télécom Saint-Etienne, in France 🇫🇷 . I'm particularly interested in computer science and cybersecurity 🖥️. Meanwhile, I also develop things on my free time, mostly in C / C++ and Python, but I always use and learn new tools and technologies."
}


const projects = [
    {
        title: "Game of Life",
        description: "A simple implementation of Conway's Game of Life",
        image: "/src/assets/projects/alex-tyson-2BAXJ7ha74s-unsplash.jpg",
        link: "https://github.com/leoraclet/game-of-life",
    },
    {
        title: "Unycoin",
        description: "A simple cryptocurrency implementation",
        image: "/src/assets/projects/angelica-teran-Bk9hpaXHK4o-unsplash.jpg",
        link: "https://github.com/leoraclet/unycoin"
    },
    {
        title: "Fractals Explorer",
        description: "A project to explore fractals using OpenGL",
        image: "/src/assets/projects/kseniia-zapiatkina-yATU3rg8tNI-unsplash.jpg",
        link: "https://github.com/leoraclet/fractals",
    }
]


const projectCategories = [
    {
        name: "🖥️ Computing",
        description: "Projects related to computing and algorithms",
        slug: "computing",
        items: [
            {
                name: "Game of Life",
                description: "A simple implementation of Conway's Game of Life",
                image: "game-of-life.jpg",
                links: [{
                    type: "github",
                    href: "https://github.com/leoraclet/game-of-life",
                }]
            },
            {
                name: "Unycoin",
                description: "A simple cryptocurrency implementation",
                image: "bitcoin-ethereum.jpeg",
                links: [{
                    type: "github",
                    href: "https://github.com/leoraclet/unycoin",
                }]
            },
            {
                name: "Fractals Explorer",
                description: "A project to explore fractals using OpenGL",
                image: "burning_ship.png",
                links: [{
                    type: "github",
                    href: "https://github.com/leoraclet/fractals",
                }]
            }
        ]
    },
    {
        name: "🤖 Robotics",
        description: "Projects related to robotics and automation",
        slug: "robotics",
        items: [
            {
                name: "Dynamixel Library",
                description: "A library for controlling Dynamixel motors",
                image: "",
                links: [{
                    type: "github",
                    href: "https://github.com/Projet-et-Tech/Dynamixel",
                }]
            },
            {
                name: "Moving Base",
                description: "A project to control a moving base robot",
                image: "",
                links: [{
                    type: "github",
                    href: "https://github.com/Projet-et-Tech/Moteur/tree/master"
                }]
            }
        ]
    },
    {
        name: "🎓 Learning",
        description: "Projects that are focused on learning and experimentation",
        slug: "learning",
        items: []
    },
    {
        name: " 😴 Unfinished",
        description: "Projects that are still in progress or not yet completed",
        slug: "unfinished",
        items: [
            {
                name: "Django Docker Template",
                description: "A template for Django applications using Docker",
                image: "",
                links: [{
                    type: "github",
                    href: "https://github.com/leoraclet/django-docker-template"
                }]
            }
        ]
    }
]


const education = [
    {
        title: "Engineering Degree in Electronics and Telecommunications",
        institution: "Télécom Saint- Etienne",
        date: "2023 - Today",
        achievements: [
            "President of the Robotics Club",
            "Participated in the French Cup of Robotics",
        ]
    },
    {
        title: "Integrated Preparatory Class",
        institution: "Télécom Saint- Etienne",
        date: "2021 - 2023",
        achievements: [
        ]
    }
]

const skills = [
    {
        category: "💻 Languages",
        items: ["JavaScript", "Python", "C++", "HTML", "CSS", "Bash", "OpenGL"]
    },
    {
        category: "☁️ Environments",
        items: ["Nixos", "Windows", "Arch Linux", "Raspeberry Pi OS"]
    },
    {
        category: "⚙️ Technologies",
        items: ["Git", "Docker", "PostgreSQL", "Grafana", "Git"]
    },
    {
        category: "🧰 Tools",
        items:["VS Code", "Neovim", "Arduino IDE", "Pycharm", "Altium Designer", "STM32CubeIDE"]
    }
]


const experiences = [
    {
        title: "Software Engineer at Example Corp",
        description: "Worked on building scalable web applications using React and Node.js.",
        date: "Dec 2022 - Nov 2023",
        achievements: [
            "Led a team of 5 developers to deliver a major feature ahead of schedule",
            "Improved application performance by optimizing database queries"
        ]
    },
    {
        title: "Intern at Tech Startup",
        description: "Assisted in developing a mobile application using React Native.",
        date: "Jun 2022 - Nov 2022",
        achievements: [
            "Improved app performance by 20%",
            "Implemented new features based on user feedback"
        ]
    }
]

const hobbies = [
    {
        name: "Hiking",
        description: "One of my favorite pastimes is hiking in nature, where I can immerse myself in the beauty of the outdoors.",
    },
    {
        name: "Cybersecurity",
        description: "I have a keen interest in cybersecurity, especially in cryptography, and I enjoy learning how our digital world works",
    },
    {
        name: "Reading",
        description: "I love reading books, particularly in the genres of science fiction and fantasy.",
    },
]

const tools = [
    {
        category: "Development Tools",
        items: [
            {
                name: 'VS Code',
                description: 'IDE',
                href: 'https://code.visualstudio.com/',
                icon: import('@/assets/tools/vscode.svg?raw'),
            },
            {
                name: 'Neovim',
                description: 'IDE',
                href: 'https://neovim.io/',
                icon: import('@/assets/tools/neovim.svg?raw'),
            },
            {
                name: 'Arduino IDE',
                description: 'IDE',
                href: 'https://www.arduino.cc/en/software',
                icon: import('@/assets/tools/arduino.svg?raw'),
            },
            {
                name: 'Pycharm',
                description: 'Python IDE',
                href: 'https://www.jetbrains.com/pycharm/',
                icon: import('@/assets/tools/pycharm.svg?raw'),
            },
            {
                name: 'Altium Designer',
                description: 'PCB Design Software',
                href: 'https://www.altium.com/altium-designer/',
                icon: import('@/assets/tools/altium.svg?raw'),
            },
            {
                name: 'STM32CubeIDE',
                description: 'IDE for STM32 Microcontrollers',
                href: 'https://www.st.com/en/development-tools/stm32cubeide.html',
                icon: import('@/assets/tools/stm32cubeide.svg?raw'),
            }
        ]
    },
    {
        category: "Programming Languages",
        items: [
            {
                name: 'Python',
                description: 'Python Programming Language',
                href: '',
                icon: import('@/assets/tools/python.svg?raw'),
            },
            {
                name: 'C++',
                description: 'C++ Programming Language',
                href: '',
                icon: import('@/assets/tools/cpp.svg?raw'),
            },
            {
                name: 'JavaScript',
                description: 'JavaScript Programming Language',
                href: '',
                icon: import('@/assets/tools/javascript.svg?raw'),
            },
            {
                name: 'HTML',
                description: 'HTML Template Language',
                href: '',
                icon: import('@/assets/tools/html.svg?raw'),
            },
            {
                name: 'CSS',
                description: 'CSS Style Sheet Language',
                href: '',
                icon: import('@/assets/tools/css.svg?raw'),
            },
            {
                name: 'Bash',
                description: 'Bash Shell Scripting Language',
                href: '',
                icon: import('@/assets/tools/bash.svg?raw'),
            },
            {
                name: "OpenGL",
                description: 'OpenGL Graphics API',
                href: '',
                icon: import('@/assets/tools/opengl.svg?raw'),
            }
        ]
    },
    {
        category: "Environements & Platforms",
        items: [
            {
                name: 'Nixos 24.05',
                description: 'Linux Distribution',
                href: 'https://nixos.org/',
                icon: import('@/assets/tools/nixos.svg?raw'),
            },
            {
                name: 'Windows 11',
                description: 'Microsoft OS',
                href: 'https://news.microsoft.com/windows11-general-availability/',
                icon: import('@/assets/tools/windows11.svg?raw'),
            },
            {
                name: 'Arch Linux',
                description: 'Linux Distribution',
                href: 'https://www.archlinux.org/',
                icon: import('@/assets/tools/archlinux.svg?raw'),
            },
            {
                name: 'Raspberry Pi OS',
                description: 'Linux Distribution',
                href: 'https://www.raspberrypi.org/software/raspberry-pi-os/',
                icon: import('@/assets/tools/raspberrypi.svg?raw'),
            },
        ]
    },
    {
        category: "Technologies & Frameworks",
        items: [
            {
                name: 'Docker',
                description: 'Containerization Platform',
                href: 'https://www.docker.com/',
                icon: import('@/assets/tools/docker.svg?raw'),
            },
            {
                name: "PostgreSQL",
                description: 'Relational Database',
                href: 'https://www.postgresql.org/',
                icon: import('@/assets/tools/postgresql.svg?raw'),
            },
            {
                name: "Grafana",
                description: 'Monitoring and Visualization',
                href: 'https://grafana.com/',
                icon: import('@/assets/tools/grafana.svg?raw'),
            },
            {
                name: "Git",
                description: 'Version Control System',
                href: 'https://git-scm.com/',
                icon: import('@/assets/tools/git.svg?raw'),
            },
            {
                name: "Django",
                description: 'Web Framework',
                href: 'https://www.djangoproject.com/',
                icon: import('@/assets/tools/django.svg?raw'),
            }
        ]
    },
    {
        category: "Productivity",
        items: [
            {
                name: 'Firefox',
                description: 'Browser',
                href: 'https://www.mozilla.org/en-US/firefox',
                icon: import('@/assets/tools/firefox.svg?raw'),
            },
            {
                name: 'ChatGPT',
                description: 'LLM',
                href: 'https://chat.openai.com/',
                icon: import('@/assets/tools/chatgpt.svg?raw'),
            },
        ]
    }
]

const networks = [
    {
        platform: 'GitHub',
        icon: 'github',
        link: 'https://github.com/leoraclet',
        text: 'followers',
        api: 'github/leoraclet'
    },
    {
        platform: 'Twitter',
        icon: 'x',
        color: '#50769d',
        link: '',
        text: 'followers',
        api: 'twitter'
    }
]


const data = {
    projects,
    education,
    skills,
    me,
    experiences,
    hobbies,
    tools,
    networks,
    projectCategories,
}

export default data;