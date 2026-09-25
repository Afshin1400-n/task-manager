# ✅ Task Manager

A modern, lightweight task management app built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.  
Create, edit, filter, and track your tasks — all in a clean, minimal UI with local persistence.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🔐 **Simple Authentication** — Register & login using `localStorage`
- ➕ **Create Tasks** — Add tasks with title, description, priority, status, and due date
- ✏️ **Edit Tasks** — Update any task on the fly
- 🗑️ **Delete Tasks** — Remove individual tasks or wipe them all
- 🔍 **Filter by Status** — To Do, In Progress, Done
- 🎯 **Filter by Priority** — Low, Medium, High
- 📊 **Live Task Counter** — See how many tasks match your filters
- 💾 **Local Persistence** — Tasks are saved per-user in `localStorage`
- 🎨 **Modern UI** — Gradient backgrounds, glassmorphism, smooth transitions
- 📱 **Fully Responsive** — Works great on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework (App Router + Turbopack) |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **React Hooks** | `useState`, `useEffect`, `useMemo` |

> **No backend required** — Everything runs client-side using `localStorage`.

---

## 📦 Installation

### Prerequisites

- Node.js **18+**
- npm / yarn / pnpm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Afshin1400-n/task-manager.git

# 2. Navigate into the project
cd task-manager

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev