import { nanoid } from "nanoid"

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export type SearchProviders = {
  // Not necessary, but why not?
  short: string
  name: string
  icon: string
  baseUrl: string
}

export const searchProviders = [
  {
    short: "d",
    name: "Duck",
    icon: "mdi:duck",
    baseUrl: "https://duckduckgo.com/html?q=",
  },
  {
    short: "b",
    name: "Brave",
    icon: "simple-icons:brave",
    baseUrl: "https://search.brave.com/search?q=",
  },
  {
    short: "e",
    name: "Ecosia",
    icon: "simple-icons:ecosia",
    baseUrl: "https://ecosia.org/search?method=index&q=",
  },
  {
    short: "g",
    name: "Google",
    icon: "akar-icons:google-fill",
    baseUrl: "https://google.com/search?q=",
  },
  {
    short: "yt",
    name: "YouTube",
    icon: "simple-icons:youtube",
    baseUrl: "https://youtube.com/results?search_query=",
  },
] satisfies SearchProviders[]

// ------------
// Apps Section
// ------------

export type App = {
  id: string
  name: string
  icon: string
  url: string
}

export const aiTools = [
  { name: "ChatGPT", icon: "ph:open-ai-logo", url: "chatgpt.com" },
  { name: "Gemini", icon: "ri:gemini-fill", url: "gemini.google.com/app" },
  { name: "Copilot", icon: "lineicons:copilot", url: "copilot.microsoft.com" },
  { name: "Perplexity", icon: "ri:perplexity-fill", url: "perplexity.ai" },
].map((a) => ({ ...a, id: nanoid() })) satisfies App[]

export const drawerApps = [
  {
    name: "P-Mail",
    icon: "lineicons:proton-mail-symbol",
    url: "proton.me/mail",
  },
  { name: "Gmail", icon: "mdi:gmail", url: "mail.google.com" },
  {
    name: "Translate",
    icon: "material-symbols:g-translate",
    url: "translate.google.com",
  },
  { name: "YouTube", icon: "simple-icons:youtube", url: "youtube.com" },
  {
    name: "YTMusic",
    icon: "simple-icons:youtubemusic",
    url: "music.youtube.com",
  },
  { name: "Drive", icon: "ri:drive-fill", url: "drive.google.com" },
  { name: "Maps", icon: "simple-icons:googlemaps", url: "maps.google.com" },
  {
    name: "Docs",
    icon: "material-symbols:docs",
    url: "docs.google.com/document",
  },
  { name: "Reddit", icon: "ic:baseline-reddit", url: "reddit.com" },
  { name: "AniList", icon: "simple-icons:anilist", url: "anilist.co" },
  { name: "Type", icon: "simple-icons:monkeytype", url: "monkeytype.com" },
  { name: "Spotify", icon: "mdi:spotify", url: "open.spotify.com" },
  { name: "WhatsApp", icon: "ic:baseline-whatsapp", url: "web.whatsapp.com" },
  { name: "Pixiv", icon: "fa6-brands:pixiv", url: "pixiv.net" },
  {
    name: "Icons",
    icon: "simple-icons:iconify",
    url: "https://icon-sets.iconify.design",
  },
  {
    name: "Colors",
    icon: "mdi:tailwind",
    url: "https://tailwindcss.com/docs/customizing-colors",
  },
].map((a) => ({ ...a, id: nanoid() })) satisfies App[]

export const dockApps = drawerApps.filter(({ name }) =>
  [
    "AniList",
    "YouTube",
    "Reddit",
    "Anilist",
    "Type",
    "Spotify",
    "WhatsApp",
  ].includes(name),
)
