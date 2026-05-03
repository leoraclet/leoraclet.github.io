---
toc: false
comments: false
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD013 -->

<div class='hx:mx-auto hx:flex hx-max-w-[90rem]'>
    <div class="hx:flex hx:flex-col hx:items-start">
        <section id="home">
            <div class="-hx:mt-20">
                <div class="hx:font-semibold hero-intro-text">👋 Hi, I'm a</div>
                <div class="rotating-text-wrapper hx:font-semibold">
                    <h2 id="rotating-text"></h2>
                </div>
            </div>
            <div onclick="learnMore();" class="learn-more-btn bounce">
                Learn more
            </div>
        </section>
        <section id="about">
            <div class="hx:container hx:text-center">
                <h2 class="hx:text-4xl hx:font-bold hx:mb-4">What I do</h2>
                {{< hextra/hero-badge link="/about" >}} About Me !
                {{< /hextra/hero-badge >}}
                <p class="hx:text-lg">
                    In my free time, I enjoy developing projects, primarily using C/C++ and Python, but I'm always eager to explore and learn new tools & technologies. I also consistently train my hacking skills online, through platforms and CTF.
                </p>
                <div class="social-media hx:flex hx:flex-wrap hx:justify-center hx:gap-4 hx:mt-6">
                    {{< hextra/hero-badge link="https://github.com/leoraclet" >}} {{< icon name="github" attributes="width=30" >}}
                    {{< /hextra/hero-badge >}}
                    {{< hextra/hero-badge link="https://www.root-me.org/NLutr0nys" >}} {{< icon name="rootme" attributes="width=30" >}}
                    {{< /hextra/hero-badge >}}
                    {{< hextra/hero-badge link="https://cryptohack.org/user/Neutr0nys/" >}} {{< icon name="cryptohack" attributes="width=30" >}}
                    {{< /hextra/hero-badge >}}
                    {{< hextra/hero-badge link="https://linkedin.com/in/leoraclet/" >}} {{< icon name="linkedin" attributes="width=30" >}}
                    {{< /hextra/hero-badge >}}
                </div>
                <p class="hx:text-lg">
                    Throughout the development of my projects, I have gained experience with a variety of programming languages, technologies, and tools across different platforms.
                </p>
                <div class="tech-icons hx:mt-2">
                    <div class="icon-container">
                        {{< icon name="python" >}}
                        <span class="tooltip">Python</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="html" >}}
                        <span class="tooltip">HTML</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="css" >}}
                        <span class="tooltip">CSS</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="javascript" >}}
                        <span class="tooltip">JavaScript</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="mysql" >}}
                        <span class="tooltip">MySQL</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="bash" >}}
                        <span class="tooltip">Bash</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="react" >}}
                        <span class="tooltip">React</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="typescript" >}}
                        <span class="tooltip">TypeScript</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="prometheus" >}}
                        <span class="tooltip">Prometheus</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="docker" >}}
                        <span class="tooltip">Docker</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="grafana" >}}
                        <span class="tooltip">Grafana</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="postgresql" >}}
                        <span class="tooltip">PostgreSQL</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="fastapi" >}}
                        <span class="tooltip">FastAPI</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="kubernetes" >}}
                        <span class="tooltip">Kubernetes</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="opengl" >}}
                        <span class="tooltip">OpenGL</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="cmake" >}}
                        <span class="tooltip">Cmake</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="flask" >}}
                        <span class="tooltip">Flask</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="nixos" >}}
                        <span class="tooltip">NixOS</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="tailwindcss" >}}
                        <span class="tooltip">Tailwind CSS</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="archlinux" >}}
                        <span class="tooltip">Arch Linux</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="svelte" >}}
                        <span class="tooltip">Svelte</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="django" >}}
                        <span class="tooltip">Django</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="git" >}}
                        <span class="tooltip">Git</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="vhdl" >}}
                        <span class="tooltip">VHDL</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="verilog" >}}
                        <span class="tooltip">Verilog</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="glm" >}}
                        <span class="tooltip">GLM</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="c" >}}
                        <span class="tooltip">C</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="cpp" >}}
                        <span class="tooltip">C++</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="arduino" >}}
                        <span class="tooltip">Arduino</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="nodejs" >}}
                        <span class="tooltip">NodeJS</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="linux" >}}
                        <span class="tooltip">Linux</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="csharp" >}}
                        <span class="tooltip">C#</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="raspberrypi" >}}
                        <span class="tooltip">Raspberry PI</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="sqlite" >}}
                        <span class="tooltip">SQLite</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="matlab" >}}
                        <span class="tooltip">Matlab</span>
                    </div>
                    <div class="icon-container">
                        {{< icon name="vite" >}}
                        <span class="tooltip">Vite</span>
                    </div>
                </div>
                <br>
                and much more ...
            </div>
        </section>
    </div>
</div>

<script>
const texts = [
  "CTF Player",
  "Hobby Software Developer",
  "Cyber Security Enthusiast",
  "Privacy Advocate",
  "Student",
  "Proud NixOS User"
];

let currentIndex = 0;
const rotatingText = document.getElementById("rotating-text");

function rotateText() {
  rotatingText.style.opacity = 0;
  rotatingText.style.transform = "translateY(-10px)";

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % texts.length;
    rotatingText.textContent = texts[currentIndex];

    rotatingText.style.transform = "translateY(10px)";
    rotatingText.style.opacity = 0;

    void rotatingText.offsetWidth;

    rotatingText.style.opacity = 1;
    rotatingText.style.transform = "translateY(0)";
  }, 500);
}

if (rotatingText) {
  rotatingText.textContent = texts[currentIndex];
  rotatingText.style.opacity = 1;
  setInterval(rotateText, 1750);
}

// Learn more
const aboutSectionId = document.getElementById("about");
function learnMore() {
  if (aboutSectionId) {
    aboutSectionId.scrollIntoView(
      {
        behavior: "smooth",
        block: "nearest",
      },
      history.pushState(null, null, `#about`),
    );
  }
}
</script>

<style>
    /* Hero */
    section {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .hero-intro-text {
        font-size: 4rem;
    }

    .rotating-text-wrapper {
        height: 4rem;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }

    #rotating-text {
        transition: all 0.5s ease;
        opacity: 1;
        transform: translateY(0);
    }

    .rotating-text-wrapper h2 {
        transform: translateY(-10%);
        font-size: 4rem;
        font-weight: bold;
        color: #006ce8;
        position: absolute;
        transition: transform 0.5s ease, opacity 0.5s ease;
        opacity: 0;
        text-align: center;
    }
    .rotating-text-wrapper h2:is(html[class~="dark"] *) {
        color: #10C050;
    }

    .learn-more-btn {
        margin-top: 25vh;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 2rem;
        background-color: rgba(16, 107, 192, 0.1);
        color: #006ce8;
        text-decoration: none;
        font-size: 1.1rem;
        border: 2px solid #006ce8;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .learn-more-btn:is(html[class~="dark"] *) {
        background-color: rgba(16, 192, 80, 0.1);
        color: #10C050;
        border: 2px solid #10C050;
    }

    .learn-more-btn:hover {
        background-color: rgba(16, 107, 192, 0.2);
        transform: translateY(3px);
    }
    .learn-more-btn:is(html[class~="dark"] *) {
        background-color: rgba(16, 192, 80, 0.2);
    }

    .learn-more-btn::after {
        content: "↓";
        display: inline-block;
        transition: transform 0.3s ease;
        margin-left: 10px;
    }

    .learn-more-btn:hover::after {
        transform: translateY(3px);
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    .bounce {
        animation: bounce 1.5s infinite;
    }

    /* About */
    .tech-icons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .icon-container {
        position: relative;
        display: inline-block;
        margin: 10px;
    }

    .tooltip {
        visibility: hidden;
        width: 100px;
        background-color: black;
        color: white;
        text-align: center;
        border-radius: 10px;
        padding: 5px;
        font-size: 14px;
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        margin-top: 5px;
    }

    .tooltip::after {
        position: absolute;
        top: -10px;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent var(--color-black) transparent;
    }

    .icon-container:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }

    .tech-icons svg {
        width: 4.5rem;
        height: 4.5rem;
        padding: 10px;
        display: inline;
        transition: ease-in-out 0.2s;
    }

    .tech-icons svg:hover {
        scale: 1.2;
    }

    @media only screen and (max-width: 850px) {
        section {
            height: auto;
            width: 90vw;
        }

        #home {
            height: 100vh;
        }

        .hero-intro-text {
            font-size: 2.25rem;
        }

        .rotating-text-wrapper h2 {
            font-size: 2.25rem;
        }
    }
</style>
