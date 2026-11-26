# Free Tools

A beautiful news-style homepage for free online tools. All tools are listed in one place, so visitors can find and open them from a single link. Free, no login, no payment, no server.

## What is on this page now

- **AI Agent** — Free AI chat tool. Write Facebook posts, summarize text, translate Myanmar-English, generate captions. Bring your own free API key.
- **Image Editor** — Free image editor. Crop, resize, rotate, filters, remove background, convert PNG / JPG / WebP.
- **Video Trimmer** — Free video trimmer. Trim clips, mute audio, change speed, extract thumbnails.

## How to add a new tool (no HTML editing needed)

Every tool lives in **one place only: `tools.js`**. The cards on the page are rendered automatically from the `TOOLS` array in that file. To add a new tool:

1. Open `tools.js`.
2. Copy one whole entry inside the `TOOLS` array (from `{` to `},`) and paste it after the last entry. Make sure entries are separated by commas.
3. Change the fields of your copy:
   - `id`: a short unique slug, e.g. `"pdf-tool"`
   - `name`: the display name, e.g. `"PDF Tool"`
   - `tagline`: one short line, e.g. `"Free PDF tool"`
   - `description`: 1–2 sentences about what the tool does
   - `url`: the full link to the tool, e.g. `"https://hiat01.github.io/pdf-tool/"`
   - `category`: `"AI"`, `"Image"`, `"Video"`, or a new category name — a filter button for a new category appears automatically
   - `icon`: one emoji, e.g. `"📄"`
   - `date`: the date added, `YYYY-MM-DD`, e.g. `"2026-11-27"`
   - `badge`: `""` for no badge, or `"NEW"` to feature it in the hero section
   - `features`: a short list, e.g. `["Merge PDFs", "Split PDFs"]`
4. Save the file. That is it — the new card, the search, the category filter, and the hero (if you set `badge: "NEW"`) update automatically.
5. If the tool has its own website, add its URL to `sitemap.xml` too (copy one `<url>` block and change the `<loc>`).
6. Commit and deploy. No HTML editing needed.

Example entry:

```js
{
  id: "pdf-tool",
  name: "PDF Tool",
  tagline: "Free PDF tool",
  description: "Free PDF tool. Merge, split and compress PDF files in your browser.",
  url: "https://hiat01.github.io/pdf-tool/",
  category: "AI",
  icon: "📄",
  date: "2026-11-27",
  badge: "NEW",
  features: ["Merge PDFs", "Split PDFs", "Compress PDFs"]
}
```

To remove a tool, delete its entry from `tools.js`. To feature a different tool in the hero, move `"NEW"` to that tool's `badge` field.

## How to use

1. Open `index.html` in a browser, or open the GitHub Pages link.
2. Use the search box to find a tool by name, or use the category buttons (All / AI / Image / Video).
3. Click **Open Tool →** to open a tool in a new tab.

## Deploy free on GitHub Pages

1. Create a new public repo on GitHub (for example `hub-website`).
2. Upload `index.html`, `style.css`, `app.js`, `tools.js`, `README.md`, `sitemap.xml`, and `robots.txt` to the repo root.
3. Go to the repo → **Settings → Pages** → **Build and deployment → Source: Deploy from a branch** → Branch: `main`, Folder: `/ (root)` → **Save**.
4. Wait a moment, then open the Pages link (`https://<username>.github.io/hub-website/`).

## Privacy

- No login, no payment, no server, no tracking.
- Your files stay on your device — the tools run in your browser.
- Tools that use an AI API only send text to the API provider you choose.

## Files

- `index.html` — page structure (no tool cards hardcoded here)
- `style.css` — design
- `app.js` — renders the hero, cards, search, and filters from `tools.js`
- `tools.js` — **the only place tools are listed — edit this file to add a tool**
- `sitemap.xml` — search-engine sitemap
- `robots.txt` — allows search engines to index the site
- `README.md` — this file
