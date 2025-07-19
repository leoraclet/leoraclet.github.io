const me = {
  jobtitle: 'Engineering Student & Hacker',
  motto: "Keep Learning, Keep Hacking",
  description:
    "Hi 👋 ! My name is Leo, and I'm a french engineering student in second year at Télécom Saint-Etienne, in France 🇫🇷 . I'm particularly interested in computer science and cybersecurity 🖥️",
  long_description:
    "Hi 👋 ! My name is Leo, and I'm a french engineering student in second year at Télécom Saint-Etienne, in France 🇫🇷 . I'm particularly interested in computer science and cybersecurity 🖥️. Meanwhile, I also develop things on my free time, mostly in C / C++ and Python, but I always use and learn new tools and technologies."
}

const projectHome = [
  {
    name: '👾 Game of Life',
    description: 'A cellular automaton simulation',
    image: 'game-of-life.jpg',
    links: [
      {
        type: 'github',
        href: 'https://github.com/leoraclet/game-of-life'
      }
    ]
  },
  {
    name: '🪙 Unycoin',
    description: 'A simple cryptocurrency implementation',
    image: 'bitcoin-ethereum.jpeg',
    links: [
      {
        type: 'github',
        href: 'https://github.com/leoraclet/unycoin'
      }
    ]
  },
  {
    name: '❄️ Fractals Explorer',
    description: 'A real-time colored fractals explorer',
    image: 'burning_ship.png',
    links: [
      {
        type: 'github',
        href: 'https://github.com/leoraclet/fractals'
      }
    ]
  }
]

const projectCategories = [
  {
    name: '🖥️ Computing',
    description: 'Projects related to computing and algorithms',
    slug: 'computing',
    items: [
      {
        name: '✍️ Django SaaS Template',
        description: 'A template for Django-based SaaS applications with Docker',
        image: 'default.jpg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/django-saas-template'
          }
        ]
      },
      {
        name: '🐧 NixOS Configuration',
        description: 'My NixOS Linux configuration, using Hyprland',
        image: 'default.jpg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/nixos-config'
          }
        ]
      },
      {
        name: '👾 Game of Life',
        description: 'A cellular automaton simulation',
        image: 'game-of-life.jpg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/game-of-life'
          }
        ]
      },
      {
        name: '🪙 Unycoin',
        description: 'A simple cryptocurrency implementation',
        image: 'bitcoin-ethereum.jpeg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/unycoin'
          }
        ]
      },
      {
        name: '❄️ Fractals Explorer',
        description: 'A real-time colored fractals explorer',
        image: 'burning_ship.png',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/fractals'
          }
        ]
      }
    ]
  },
  {
    name: '🤖 Robotics',
    description: 'Projects related to robotics and automation',
    slug: 'robotics',
    items: [
      {
        name: '🦾 Dynamixel Library',
        description: 'A library to control Dynamixel servos',
        image: 'dynamixel.png',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/dynamixel'
          }
        ]
      },
      {
        name: '🛞 Wheeled Base',
        description: 'Code of control of an 4-homniwheel robot',
        image: 'default.jpg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/wheeled-base'
          }
        ]
      }
    ]
  },
  {
    name: '🎓 Learning',
    description: 'Projects that are focused on learning and experimentation',
    slug: 'learning',
    items: [
      {
        name: '🔱 Hacking',
        description: 'My CTF Tools and Archives ',
        image: 'default.jpg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/hacking'
          }
        ]
      },
      {
        name: '🃏 SuperMemo',
        description: 'Anki-like Flashcard application build with Dear ImGui',
        image: 'default.jpg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/super-memo'
          }
        ]
      },
    ]
  },
  {
    name: '⚡ Electronics',
    description: 'Projects related to electronics and hardware',
    slug: 'electronics',
    items: []
  },
  {
    name: '📦 Utilities',
    description: 'Utility projects that help with various tasks',
    slug: 'utilities',
    items: []
  },
  {
    name: ' 😴 Unfinished',
    description: 'Projects that are still in progress or not yet completed',
    slug: 'unfinished',
    items: [
      {
        name: '⛏️ Minecraft Clone',
        description: 'A minecraft made from scratch in C++ with SFML',
        image: 'default.jpg',
        links: [
          {
            type: 'github',
            href: 'https://github.com/leoraclet/minecraft-alike'
          }
        ]
      }
    ]
  }
]

const education = [
  {
    title: '📐 Engineering Degree in Electronics and Telecommunications',
    link: 'https://www.telecom-st-etienne.fr/en/',
    institution: 'Télécom Saint-Etienne',
    date: '2023 - Today',
    achievements: [
      'President of the Robotics Club during the 2024-2026 school year',
      'Participated in the French Cup of Robotics in 2024 and 2025'
    ]
  },
  {
    title: '🥷 Integrated Preparatory Classes',
    link: 'https://www.telecom-st-etienne.fr/en/',
    institution: 'Télécom Saint-Etienne',
    date: '2021 - 2023',
    achievements: [
      'Programmed a "Tretis"-like game in C#',
      'Built in group a simple, autonomous line-following robot from scratch'
    ]
  }
]

const skills = [
  {
    category: '💻 Programming',
    items: ['Python', 'C / C++', 'HTML', 'CSS', 'JavaScript', 'Bash', 'OpenGL']
  },
  {
    category: '☁️ Environments',
    items: ['Nixos', 'Windows', 'Arch Linux', 'Raspeberry Pi OS']
  },
  {
    category: '⚙️ Technologies',
    items: ['Git', 'Github', 'Docker', 'PostgreSQL', 'Grafana', 'Bun']
  },
  {
    category: '🧰 Tools',
    items: ['VSCode', 'Quartus', 'Arduino IDE', 'Pycharm', 'Altium Designer', 'STM32CubeIDE']
  },
  {
    category: '📚 Frameworks',
    items: ['SFML', 'SDL', 'Django', 'Astro', 'Svelte', 'DaisyUI']
  }
]

const languages = [
  {
    name: '🇫🇷 French',
    level: 'Native'
  },
  {
    name: '🇬🇧 English',
    level: 'Fluent'
  },
  {
    name: '🇨🇳 Spanish',
    level: 'Intermediate'
  }
]

const events = [
  {
    title: '🏅 404CTF 4e',
    description: '2025 edition',
    where: '🌎 Online',
    date: '2025',
    link: '#',
    achievements: ['Rank: 67 / 2893', '5 428 pts']
  },
  {
    title: '👣 Tracs',
    description: '2024 edition',
    where: '🏛️ CentralSupelec',
    date: '2024',
    link: 'https://tracs.viarezo.fr/edition_results/show_student_ranking/2024/',
    achievements: ['Rank: 73 / 107 teams', '2 353 pts']
  },
  {
    title: '🦸 HeroCTF v6',
    description: '2025 edition',
    where: '🌎 Online',
    date: '2024',
    link: 'https://ctftime.org/team/190046',
    achievements: ['40 / 670 teams', '2 916 pts']
  },
  {
    title: '🏅 404CTF 3e',
    description: '2024 edition',
    where: '🌎 Online',
    date: '2024',
    link: 'https://www.404ctf.fr/ranking_2024.html',
    achievements: ['Rank: 63 / ~3000', '10 179 pts']
  },
  {
    title: '🦸 HeroCTF v4',
    description: '2022 edition',
    where: '🌎 Online',
    date: '2022',
    link: 'https://ctftime.org/team/190046',
    achievements: ['53 / 632 teams', '2 504 pts']
  }
]

const experiences = [
  {
    title: '🤖 French Cup of Robotics 2024 & 2025',
    link: '#',
    description:
      'Participated in the French Cup of Robotics with the robotics club of Télécom Saint-Etienne.',
    date: '28 - 31 May 2024',
    achievements: [
      'Developed a full-autonomous robot from scratch that competed in the cup',
      'Collaborated with a team of 12 people',
      'Introducing newly arrived first year students to Robotics'
    ]
  },
  {
    title: '🚢 Intern at Alternatives Energies',
    link: 'https://www.alternativesenergies.com/en/',
    description: 'Built a data analytics web application for a maritime company.',
    date: 'May 2024 - Aug 2024',
    achievements: [
      'Built a web application using Django and PostgreSQL',
      'Set up a Debian server and deployed the application using Docker',
      'Implemented custom Grafana dashboards for fast and efficient data visualization',
    ]
  },
  {
    title: '🔬 Intern at Hubert Curien Laboratory',
    link: 'https://laboratoirehubertcurien.univ-st-etienne.fr/en/index.html',
    description:
      'Assisted in security research of post-quantum cryptography primitives on hardware.',
    date: 'Apr 2023 - Jul 2023',
    achievements: [
      'Implemented in VHDL and on FPGA, post-quantum cryptography primitives',
      'Wrote a Python script to interface with FPGA through the ChipWhisperer platform',
      'Conducted side-channel attacks on the implemented primitives'
    ]
  }
]

const hobbies = [
  {
    name: 'Hiking',
    description:
      'One of my favorite pastimes is hiking in nature, where I can immerse myself in the beauty of the outdoors.'
  },
  {
    name: 'Traveling',
    description:
      "I enjoy exploring new places and cultures. Thanks to my family, I've had the opportunity to travel to various countries, including England, Ireland, Scotland, Italy, China, and to visit many places in France."
  },
  {
    name: 'Cybersecurity',
    description:
      'I have a keen interest in cybersecurity, especially in cryptography, and I enjoy learning how our digital world works.'
  },
  {
    name: 'Reading',
    description: 'I love reading books, particularly in the genres of science fiction and fantasy.'
  }
]

const tools = [
  {
    category: 'Development Tools',
    items: [
      {
        name: 'VS Code',
        description: 'IDE',
        href: 'https://code.visualstudio.com/',
        icon: import('@/assets/tools/vscode.svg?raw')
      },
      {
        name: 'Neovim',
        description: 'IDE',
        href: 'https://neovim.io/',
        icon: import('@/assets/tools/neovim.svg?raw')
      },
      {
        name: 'Arduino IDE',
        description: 'IDE',
        href: 'https://www.arduino.cc/en/software',
        icon: import('@/assets/tools/arduino.svg?raw')
      },
      {
        name: 'Pycharm',
        description: 'Python IDE',
        href: 'https://www.jetbrains.com/pycharm/',
        icon: import('@/assets/tools/pycharm.svg?raw')
      },
      {
        name: 'Altium Designer',
        description: 'PCB Design Software',
        href: 'https://www.altium.com/altium-designer/',
        icon: import('@/assets/tools/altium.svg?raw')
      },
      {
        name: 'STM32CubeIDE',
        description: 'IDE for STM32 Microcontrollers',
        href: 'https://www.st.com/en/development-tools/stm32cubeide.html',
        icon: import('@/assets/tools/stm32cubeide.svg?raw')
      }
    ]
  },
  {
    category: 'Programming Languages',
    items: [
      {
        name: 'Python',
        description: 'Python Programming Language',
        href: '',
        icon: import('@/assets/tools/python.svg?raw')
      },
      {
        name: 'C++',
        description: 'C++ Programming Language',
        href: '',
        icon: import('@/assets/tools/cpp.svg?raw')
      },
      {
        name: 'JavaScript',
        description: 'JavaScript Programming Language',
        href: '',
        icon: import('@/assets/tools/javascript.svg?raw')
      },
      {
        name: 'HTML',
        description: 'HTML Template Language',
        href: '',
        icon: import('@/assets/tools/html.svg?raw')
      },
      {
        name: 'CSS',
        description: 'CSS Style Sheet Language',
        href: '',
        icon: import('@/assets/tools/css.svg?raw')
      },
      {
        name: 'Bash',
        description: 'Bash Shell Scripting Language',
        href: '',
        icon: import('@/assets/tools/bash.svg?raw')
      },
      {
        name: 'OpenGL',
        description: 'OpenGL Graphics API',
        href: '',
        icon: import('@/assets/tools/opengl.svg?raw')
      }
    ]
  },
  {
    category: 'Environements & Platforms',
    items: [
      {
        name: 'Nixos 24.05',
        description: 'Linux Distribution',
        href: 'https://nixos.org/',
        icon: import('@/assets/tools/nixos.svg?raw')
      },
      {
        name: 'Windows 11',
        description: 'Microsoft OS',
        href: 'https://news.microsoft.com/windows11-general-availability/',
        icon: import('@/assets/tools/windows11.svg?raw')
      },
      {
        name: 'Arch Linux',
        description: 'Linux Distribution',
        href: 'https://www.archlinux.org/',
        icon: import('@/assets/tools/archlinux.svg?raw')
      },
      {
        name: 'Raspberry Pi OS',
        description: 'Linux Distribution',
        href: 'https://www.raspberrypi.org/software/raspberry-pi-os/',
        icon: import('@/assets/tools/raspberrypi.svg?raw')
      }
    ]
  },
  {
    category: 'Technologies & Frameworks',
    items: [
      {
        name: 'Docker',
        description: 'Containerization Platform',
        href: 'https://www.docker.com/',
        icon: import('@/assets/tools/docker.svg?raw')
      },
      {
        name: 'PostgreSQL',
        description: 'Relational Database',
        href: 'https://www.postgresql.org/',
        icon: import('@/assets/tools/postgresql.svg?raw')
      },
      {
        name: 'Grafana',
        description: 'Monitoring and Visualization',
        href: 'https://grafana.com/',
        icon: import('@/assets/tools/grafana.svg?raw')
      },
      {
        name: 'Git',
        description: 'Version Control System',
        href: 'https://git-scm.com/',
        icon: import('@/assets/tools/git.svg?raw')
      },
      {
        name: 'Django',
        description: 'Web Framework',
        href: 'https://www.djangoproject.com/',
        icon: import('@/assets/tools/django.svg?raw')
      }
    ]
  },
  {
    category: 'Productivity',
    items: [
      {
        name: 'Firefox',
        description: 'Browser',
        href: 'https://www.mozilla.org/en-US/firefox',
        icon: import('@/assets/tools/firefox.svg?raw')
      },
      {
        name: 'ChatGPT',
        description: 'LLM',
        href: 'https://chat.openai.com/',
        icon: import('@/assets/tools/chatgpt.svg?raw')
      },
      {
        name: 'Obsidian',
        description: 'Note-taking App',
        href: 'https://obsidian.md/',
        icon: import('@/assets/tools/obsidian.svg?raw')
      }
    ]
  },
  {
    category: 'Hacking',
    items: [

    ]
  },
  {
    category: 'Hardware',
    items: [

    ]
  }
]

const networks = [
  {
    platform: 'GitHub',
    icon: 'github',
    color: '#181717',
    link: 'https://github.com/leoraclet',
    text: 'followers',
    api: 'github/leoraclet',
    count: 3
  }
]

const certifications = [
  {
    date: '2025-01-08',
    content: 'Top 67 - 404CTF 2025 4ème édition'
  },
  {
    date: '2025-01-08',
    content: 'TOEIC - 935/990 : Niveau B2/C1'
  },
  {
    date: '2024-05-28',
    content: 'Top 63 - 404CTF 2024 3ème édition'
  },
  {
    date: '2023-10-19',
    content: 'DUT GEII (Electrical Engineering and Industrial Computing)'
  },
  {
    date: "2021-07-01",
    content: "Baccalauréat Scientifique Mention Très Bien"
  }
]

const faq = [
  {
    question: 'What is your favorite programming language ?',
    answer:
      "I enjoy working with Python and C++, but I also like to experiment with new languages and technologies. I'd like to try 🦀 Rust and Go in the future."
  },
  {
    question: 'What do you love ?',
    answer: 'I love hiking, traveling, reading, and exploring new technologies in cybersecurity.'
  },
  {
    question: 'What is your favorite book ?',
    answer:
      "One of my favorite books series is 'Rules of Ascension' by David B. Coe. I also enjoy 'Crescent city ' by Sarah J. Maas"
  }
]

const data = {
  education,
  skills,
  me,
  experiences,
  hobbies,
  tools,
  networks,
  projectCategories,
  projectHome,
  languages,
  events,
  certifications,
  faq
}

export default data
