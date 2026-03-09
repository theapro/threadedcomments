# Reddit-style Comment Section Demo

This folder is a **standalone Next.js app** that showcases a Reddit-style threaded comment section (hoverable thread lines, collapse toggle aligned to actions, nested replies).

## What’s included

- Single page demo (white background)
- Fake in-memory data (no backend)
- Components copied/adapted from the main app:
  - `CommentItem` (recursive thread UI + hover behavior)
  - `CommentForm` (add comment/reply)
  - `CommentVoteBar` (local vote state)
  - `ShareButton`, `ReportButton` (dummy actions)

## Run locally

From the repo root:

```bash
npm -C comment-demo install
npm -C comment-demo run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

- Import the repo in Vercel
- Set **Root Directory** to `comment-demo`
- Build Command: `npm run build`
- Output: default (Next.js)

## Files to look at

- UI page: `src/app/page.tsx`
- Threaded comments: `src/shared/components/CommentsSection.tsx`
- Thread item: `src/shared/components/CommentItem.tsx`
- Fake data: `src/shared/fake/comments.ts`

## Notes

- This demo keeps reply ordering stable: new replies are appended to the end of their parent thread.
- Hover effect is scoped: parent thread lines highlight when hovering the parent comment or its direct reply blocks, but hovering inside a nested reply-of-reply does **not** highlight the parent thread lines (Reddit-like).
