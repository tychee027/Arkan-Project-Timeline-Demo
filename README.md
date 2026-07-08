# Arkan Engineering Consultant — Project Timeline

A single-page, real-time multi-project Gantt/timeline tracker built for **Arkan Engineering Consultant W.L.L.** No build step, no backend server — it's one static HTML file that talks directly to **Firebase Firestore** for live, multi-user data sync.

## ✨ Features

- 📁 **Multiple projects**, each with its own color, description, and timeline
- ✅ **Tasks & subtasks** with status, phase, progress %, assignee, and notes
- 📊 **Gantt-style timeline view** with a "today" marker, filtering by status/phase, and collapsible subtasks
- 🔒 **Simple edit locking** so two people don't overwrite each other's changes at the same time
- 🔥 **Live sync via Firestore** — every browser connected to the same Firebase project sees updates instantly
- 🧪 **Demo mode** — try the app with sample data and no Firebase project at all
- 🌓 Light/dark theme support (follows system preference)
- 📱 Fully responsive, no dependencies to install

## 🚀 Quick start

There's nothing to build. You can:

1. **Just open it** — double-click `index.html`, or click **"Try demo mode"** on first launch to explore with sample data (data resets on refresh, nothing is saved).
2. **Connect your own Firebase project** for real, persistent, multi-user data (see below).

## 🔧 Connecting Firebase (for real data)

The app never ships with any credentials baked in — you connect your own Firebase project the first time you open it, and the config is saved in your browser's `localStorage` from then on.

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a project (or use an existing one).
2. Enable **Cloud Firestore** (Build → Firestore Database → Create database). Start in test mode, then lock it down using the rules below.
3. Go to **Project settings → Your apps → Add app → Web (`</>`)**, register the app, and copy the `firebaseConfig` values.
4. Open `index.html` in your browser and paste the values into the setup screen: API Key, Auth Domain, Project ID, Storage Bucket, Messaging Sender ID, and App ID.

That's it — the app will create two collections automatically as you use it:

| Collection | Purpose |
|---|---|
| `projects` | One document per project |
| `tasks` | One document per task/subtask (subtasks reference their parent via `parentId`) |
| `meta/editLock` | A single document used to coordinate the "someone else is editing" lock |

### Recommended Firestore security rules

The starter/test-mode rules Firebase gives you allow anyone with your config to read and write your data. Since this app has no authentication layer, at minimum restrict access to your project, or add Firebase Auth if you need real per-user access control. A basic starting point is provided in [`firestore.rules`](./firestore.rules) — copy it into **Firestore → Rules** in the console and adjust to fit how you plan to restrict access (e.g. requiring sign-in, an allowlist, or App Check).

⚠️ **Note:** A Firebase Web API key is not a secret in the traditional sense (it identifies your project, it doesn't authorize access on its own), but your Firestore **security rules** are what actually protect your data. Don't skip configuring them for anything beyond a private/internal demo.

## 🌐 Deploying

Since this is a static file, you can host it anywhere:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root. Your app will be live at `https://<username>.github.io/<repo>/`.
- **Firebase Hosting**, Netlify, Vercel, or any static host also work — just upload `index.html`.

## 🗂️ Project structure

```
.
├── index.html        # The entire application (HTML, CSS, and JS)
├── firestore.rules    # Example Firestore security rules
├── README.md
└── LICENSE
```

## 🛠️ Tech stack

- Vanilla HTML/CSS/JavaScript (no framework, no bundler)
- [Firebase Firestore](https://firebase.google.com/docs/firestore) (compat SDK, loaded via CDN)
- [Tabler Icons](https://tabler.io/icons) (via CDN)

## 📄 License

Released under the [MIT License](./LICENSE).
