export const config = {
  discordId: "274973338676494347",
  hero_words: [
    "Web Developer",
    " Frontend Developer",
    " Backend Developer",
    " Fullstack Developer",
  ],
  projects: [
    {
      name: "Observer Bot",
      url: "https://github.com/ComparatorCraftSMP/observer-bot-ts",
      featured: false,
      btnName: "Repo",
      thumbnail:
        "/project-observer-bot.png",
      description: `Observer Bot is a Discord bot I built for my Minecraft server in
      Discord.js. This bot mainly queries stats from a Minecraft server
      with ServerTAP installed and shows them in a Discord embed. I made
      this because a lot of other solutions to do this sucked so I
      thought I would make one myself. The bot also shows information
      about the Discord server it is on, and members in the Discord
      server. And soon it will be able to show stats about the Minecraft
      server.`,
      tags: [
        "Discord.js",
        "Typescript",
        "Node.js",
        "Minecraft",
        "REST-API",
        "SQLite",
      ],
    },
    {
      name: "Analog",
      url: "https://github.com/analog-org",
      featured: true,
      btnName: "Repo",
      thumbnail:
        "/project-analog.png",
      description: `Analog will be a fullstack, self hosted Discord bot with a web dashboard built in Svelte-Kit.`,
      tags: [
        "Discord.js",
        "Typescript",
        "Prisma",
        "MySQL",
        "SvelteKit",
        "TailwindCSS",
      ],
    },
    {
      name: "S.I.M.P.S",
      url: "https://github.com/simpsmc",
      featured: false,
      btnName: "Repo",
      thumbnail:
        "/project-simps.png",
      description: `S.I.M.P.S. stands for Server Integrated Multi Punishment System,
      aims to be an innovative and new global ban list of problematic
      players in smaller Minecraft SMP communities. I built them a
      Discord bot that admins can use to add, edit, and view the database of
      players from Discord. This bot is functional but the repo is private at the moment.`,
      tags: [
        "Discord.js",
        "Typescript",
        "REST-APIs",
        "Prisma",
        "MySQL",
        "Minecraft",
      ],
    },
    {
      name: "Discord Link Embed",
      url: "https://discord-link-kappa.vercel.app/",
      featured: true,
      btnName: "Website",
      thumbnail:
        "/project-embed.png",
      description: `This website allows you to dynamically create an embed on Discord only using a URL.`,
      tags: ["Next.JS", "Typescript", "TailwindCSS"],
    },
  ],
  languages: [
    {
      type: "Front-End",
      languages: [
        {
          name: "React",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "NextJS",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "TailwindCSS",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        },
        {
          name: "HTML",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
        {
          name: "Javascript",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "Typescript",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Svelte",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
        },
      ],
    },
    {
      type: "Backend",
      languages: [
        {
          name: "Node.JS",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "MySQL",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "Prisma",
          img: "https://seeklogo.com/images/P/prisma-logo-3805665B69-seeklogo.com.png",
        },
        {
          name: "Discord.JS",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg",
        },
        {
          name: "Python",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
        {
          name: "Java",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "C++",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        },
        {
          name: "Docker",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg",
        },
        {
          name: "GraphQL",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-original.svg",
        },
      ],
    },
    {
      type: "Tools",
      languages: [
        {
          name: "Git",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "VSCode",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        },
        {
          name: "Linux",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        },
        {
          name: "Figma",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        },
        {
          name: "Github",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        },
        {
          name: "IntelliJ",
          img: "https://resources.jetbrains.com/storage/products/company/brand/logos/IntelliJ_IDEA_icon.svg",
        },
      ],
    },
    {
      type: "Productivity",
      languages: [
        {
          name: "Trello",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
        },
        {
          name: "Notion",
          img: "https://media.discordapp.net/attachments/965985896967077888/1024337530247729162/notion-logo-no-background.png",
        },
      ],
    },
  ],
};
