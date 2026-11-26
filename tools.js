// Free Tools — the ONLY place tools are listed.
// To add a new tool: copy one entry below, change the fields, save, commit. Done.
// No HTML editing needed. Fields:
//   id: short unique slug, e.g. "pdf-tool"
//   name: display name, e.g. "PDF Tool"
//   tagline: one short line shown on the card
//   description: 1-2 sentences about what the tool does
//   url: full link to the tool's website
//   category: "AI", "Image", "Video", or a new category name
//   icon: one emoji shown on the card
//   date: date added, YYYY-MM-DD (newest first is shown in the hero)
//   badge: "" or "NEW" — shown as a badge on the card and hero
//   features: short list of things the tool can do

const TOOLS = [
  {
    id: "multi-ai",
    name: "Multi-AI",
    tagline: "Ask several AIs at once",
    description: "Ask several AIs at once and get one best answer. Connect your own API keys, compare answers side by side, let an AI judge merge the best parts.",
    url: "https://hiat01.github.io/multi-ai/",
    category: "AI",
    icon: "🧠",
    date: "2026-11-26",
    badge: "NEW",
    features: ["Ask all AIs at once", "Compare answers", "AI judge best answer", "OpenRouter & FreeModel presets"]
  },
  {
    id: "movie-recap",
    name: "Movie Recap",
    tagline: "Free AI movie recap generator",
    description: "Free AI movie recap generator in English, Myanmar and Chinese. Write recap scripts, break down scenes with timecodes, get title and hook ideas.",
    url: "https://hiat01.github.io/movie-recap/",
    category: "Movie",
    icon: "🎥",
    date: "2026-11-26",
    badge: "",
    features: ["AI recap scripts", "English / Myanmar / Chinese", "Scene breakdown", "Title & hook ideas", "Character list"]
  },
  {
    id: "coding-agent",
    name: "Coding Agent",
    tagline: "Free AI coding assistant",
    description: "Free AI coding assistant. Write, explain, fix and optimize code, plus a JavaScript playground, JSON formatter, regex tester and more developer utilities.",
    url: "https://hiat01.github.io/coding-agent/",
    category: "AI",
    icon: "💻",
    date: "2026-11-26",
    badge: "",
    features: ["Write & explain code", "Fix & debug code", "Code playground", "JSON formatter", "Regex tester", "Snippet library"]
  },
  {
    id: "ai-agent",
    name: "AI Agent",
    tagline: "Free AI chat tool",
    description: "Free AI chat tool. Write Facebook posts, summarize text, translate Myanmar-English, generate captions. Bring your own free API key.",
    url: "https://hiat01.github.io/ai-agent/",
    category: "AI",
    icon: "🤖",
    date: "2026-11-26",
    badge: "",
    features: ["Write Facebook posts", "Summarize text", "Translate Myanmar-English", "Generate captions"]
  },
  {
    id: "image-tool",
    name: "Image Editor",
    tagline: "Free image editor",
    description: "Free image editor. Crop, resize, rotate, filters, remove background, convert PNG / JPG / WebP.",
    url: "https://hiat01.github.io/image-tool/",
    category: "Image",
    icon: "🖼️",
    date: "2026-11-26",
    badge: "",
    features: ["Crop & resize", "Rotate & flip", "Filters", "Remove background", "Convert PNG / JPG / WebP"]
  },
  {
    id: "video-tool",
    name: "Video Trimmer",
    tagline: "Free video trimmer",
    description: "Free video trimmer. Trim clips, mute audio, change speed, extract thumbnails.",
    url: "https://hiat01.github.io/video-tool/",
    category: "Video",
    icon: "🎬",
    date: "2026-11-26",
    badge: "",
    features: ["Trim clips", "Mute audio", "Change speed", "Extract thumbnails"]
  }
];
