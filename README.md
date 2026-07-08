# Arkan Engineering Consultant — Project Timeline

A single-page, multi-project Gantt/timeline tracker built for **Arkan Engineering Consultant W.L.L.** No build step, no backend, no account needed — it's one static HTML file that stores your projects and tasks entirely in your browser's `localStorage`.

## ✨ Features

- 📁 **Multiple projects**, each with its own color, description, and timeline
- ✅ **Tasks & subtasks** with status, phase, progress %, assignee, and notes
- 📊 **Gantt-style timeline view** with a "today" marker, filtering by status/phase, and collapsible subtasks
- 💾 **Local, private data** — everything is saved to your own browser via `localStorage`; nothing is sent to a server
- 🌓 Light/dark theme support (follows system preference)
- 📱 Fully responsive, no dependencies to install

## 🚀 Quick start

There's nothing to build or configure. Just open `index.html` in a browser (or visit your hosted URL) and start adding projects and tasks — the app comes pre-loaded with sample data to explore.

## 💾 How data is saved

All projects and tasks are saved to your browser's `localStorage` under these keys:

| Key | Contents |
|---|---|
| `arkan_timeline_projects` | Array of all projects |
| `arkan_timeline_tasks` | Array of all tasks/subtasks (subtasks reference their parent via `parentId`) |

**Important things to know:**
- Data is stored **per browser, per device** — it does not sync across devices or between different browsers, and clearing your browser's site data will erase it.
- This is a **single-user** app with no login and no real-time collaboration. If you need multiple people editing the same live data, you'd need to add a backend (e.g. Firebase, Supabase, or a small API) — this version intentionally keeps things simple and dependency-free for personal or single-device use.
- Use the **"Reset to demo data"** button in the sidebar to clear your changes and restore the original sample projects.

## 🌐 Deploying

Since this is a static file, you can host it anywhere:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root. Your app will be live at `https://<username>.github.io/<repo>/`.
- **Netlify, Vercel**, or any static host also work — just upload `index.html`.

## 🗂️ Project structure

```
.
├── index.html   # The entire application (HTML, CSS, and JS)
├── README.md
└── LICENSE
```

## 🛠️ Tech stack

- Vanilla HTML/CSS/JavaScript (no framework, no bundler)
- Browser `localStorage` for persistence
- [Tabler Icons](https://tabler.io/icons) (via CDN)

## 📄 License

Released under the [MIT License](./LICENSE).
