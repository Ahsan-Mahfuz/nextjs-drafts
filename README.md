# GitHub Markdown Publisher

A Next.js app to create, edit, and publish Markdown posts to a GitHub repository.

## Features

- Fetch Markdown file from GitHub and render it as HTML
- Create, edit, delete, and manage drafts
- Save drafts in localStorage (persist across reloads)
- Publish all drafts to GitHub repo using REST API

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Octokit (GitHub API client)
- Remark + Rehype (Markdown parsing & sanitization)

## Installation & Setup

1. Clone the repo
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies
   npm install

3.Create a .env.local file and add:
GITHUB_TOKEN=your_personal_access_token
GITHUB_REPO=your-username/your-repo

4.Start development server
npm run dev

---

### 5. **Deployment**

If you deployed to Vercel/Netlify, add the live link.

```md
## Deployment

Live URL: [https://your-app.vercel.app](https://your-app.vercel.app)
```

## How It Works

1. App fetches Markdown file from GitHub
2. Users create & edit drafts
3. Drafts are saved locally
4. “Publish All” commits drafts as Markdown files to GitHub

## Checklist

- [x] Fetch Markdown from GitHub
- [x] Draft management (add, edit, delete)
- [x] Publish to GitHub
- [x] Secrets are hidden in env
- [x] Responsive UI

## Author

**Ahsan Mahfuz**  
GitHub: [@Ahsan-Mahfuz](https://github.com/Ahsan-Mahfuz)

# Title

Short description

## Features

## Tech Stack

## Installation & Setup

## Deployment

## How It Works (optional)

## Checklist (optional)

## Author
