import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "N£utr0nys",
  DESCRIPTION: "Welcome to my blog and portfolio for hackers and developers.",
  AUTHOR: "Keep Learning, Keep Hacking",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work Experiences",
  DESCRIPTION: "Professional Experiences at companies and schools",
}

// Education Page
export const EDUCATION: Page = {
  TITLE: "Education",
  DESCRIPTION: "Education, schools and diplomas",
}

// About Page
export const ABOUT: Page = {
  TITLE: "About Me",
  DESCRIPTION: "All you need to know ... but no more",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writings on topics I'm passionate about.",
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
  {
    TEXT: "Work",
    HREF: "/work",
  },
  {
    TEXT: "Education",
    HREF: "/education",
  },
  {
    TEXT: "About",
    HREF: "/about",
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "leo.raclet@gmail.com",
    HREF: "mailto:leo.raclet@gmail.com",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "N£utr0nys",
    HREF: "https://github.com/leoraclet"
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "Léo Raclet",
    HREF: "https://www.linkedin.com/in/leoraclet/",
  },
  {
    NAME: "Discord",
    ICON: "discord",
    TEXT: "Profile",
    HREF: "https://discordapp.com/users/454935749767200768",
  },
]

export const SHARE_LINKS: Socials = [
  {
    NAME: "WhatsApp",
    ICON: "whatsapp",
    TEXT: `Share this post via WhatsApp`,
    HREF: "https://wa.me/?text=",
  },
  {
    NAME: "Facebook",
    HREF: "https://www.facebook.com/sharer.php?u=",
    TEXT: `Share this post on Facebook`,
    ICON: "facebook",
  },
  {
    NAME: "X",
    HREF: "https://x.com/intent/post?url=",
    TEXT: `Share this post on X`,
    ICON: "twitter-x",
  },
  {
    NAME: "Telegram",
    HREF: "https://t.me/share/url?url=",
    TEXT: `Share this post via Telegram`,
    ICON: "telegram",
  },
  {
    NAME: "Pinterest",
    HREF: "https://pinterest.com/pin/create/button/?url=",
    TEXT: `Share this post on Pinterest`,
    ICON: "pinterest",
  },
  {
    NAME: "Mail",
    HREF: "mailto:?subject=See%20this%20post&body=",
    TEXT: `Share this post via email`,
    ICON: "email",
  },
]

