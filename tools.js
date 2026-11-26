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
    id: "ai-agent",
    name: "AI Agent",
    tagline: "Free AI chat tool",
    description: "Free AI chat tool. Write Facebook posts, summarize text, translate Myanmar-English, generate captions. Bring your own free API key.",
    url: "https://hiat01.github.io/ai-agent/",
    category: "AI",
    icon: "🤖",
    date: "2026-11-26",
    badge: "NEW",
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
