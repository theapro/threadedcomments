"use client";

import { useMemo, useRef, useState } from "react";
import type { Comment } from "../types/comment";
import type { Dictionary } from "../types/dictionary";
import { initialComments } from "../fake/comments";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

type ThreadedComment = Comment & { replies: ThreadedComment[] };

function buildThreadedComments(comments: Comment[]): ThreadedComment[] {
  const byId = new Map<string, ThreadedComment>();
  const order = new Map<string, number>();
  let seq = 0;

  const ingest = (comment: Comment, impliedParentId?: Comment["id"]) => {
    const key = String(comment.id);
    if (!order.has(key)) order.set(key, seq++);

    const existing = byId.get(key);
    const merged: ThreadedComment = {
      ...(existing ?? {}),
      ...comment,
      parent_id: comment.parent_id ?? impliedParentId ?? existing?.parent_id,
      replies: existing?.replies ?? [],
    };

    byId.set(key, merged);

    const nestedReplies = comment.replies ?? [];
    for (const reply of nestedReplies) {
      ingest(reply, comment.id);
    }
  };

  for (const comment of comments) ingest(comment);

  const childIdsByParent = new Map<string, Set<string>>();
  const roots: ThreadedComment[] = [];

  for (const node of byId.values()) {
    const parentId = node.parent_id;
    const parentKey = parentId != null ? String(parentId) : null;
    const nodeKey = String(node.id);

    if (parentKey && byId.has(parentKey) && parentKey !== nodeKey) {
      const parent = byId.get(parentKey)!;
      let set = childIdsByParent.get(parentKey);
      if (!set) {
        set = new Set<string>();
        childIdsByParent.set(parentKey, set);
      }

      if (!set.has(nodeKey)) {
        parent.replies.push(node);
        set.add(nodeKey);
      }
    } else {
      roots.push(node);
    }
  }

  const getCreatedAtMs = (c: ThreadedComment) => {
    const t = Date.parse(String(c.created_at ?? ""));
    return Number.isFinite(t) ? t : null;
  };

  const sortRepliesRecursive = (items: ThreadedComment[], isRoot: boolean) => {
    if (isRoot) {
      items.sort(
        (a, b) =>
          (order.get(String(a.id)) ?? 0) - (order.get(String(b.id)) ?? 0),
      );
    } else {
      items.sort((a, b) => {
        const aT = getCreatedAtMs(a);
        const bT = getCreatedAtMs(b);
        if (aT != null && bT != null) return aT - bT;
        return (order.get(String(a.id)) ?? 0) - (order.get(String(b.id)) ?? 0);
      });
    }

    for (const item of items) {
      if (item.replies.length > 0) sortRepliesRecursive(item.replies, false);
    }
  };

  sortRepliesRecursive(roots, true);
  return roots;
}

function appendReply(
  root: Comment[],
  parentId: number,
  reply: Comment,
): Comment[] {
  const walk = (items: Comment[]): boolean => {
    for (const item of items) {
      if (item.id === parentId) {
        if (!item.replies) item.replies = [];
        item.replies.push(reply);
        return true;
      }
      if (item.replies && walk(item.replies)) return true;
    }
    return false;
  };

  walk(root);
  return root;
}

export default function CommentsSection() {
  const dict = useMemo<Pick<Dictionary, "comment" | "post">>(
    () => ({
      post: { joinconversation: "Join the conversation" },
      comment: {
        addComment: "Add comment",
        reply: "Reply",
        cancel: "Cancel",
        noComments: "No comments yet",
        share: "Share",
        report: "Report",
      },
    }),
    [],
  );

  const nextIdRef = useRef(10_000);
  const [comments, setComments] = useState<Comment[]>(() => initialComments);

  const threadedComments = useMemo(
    () => buildThreadedComments(comments ?? []),
    [comments],
  );

  const addRootComment = (content: string) => {
    const id = nextIdRef.current++;
    const newComment: Comment = {
      id,
      post_id: 101,
      parent_id: null,
      created_at: new Date().toISOString(),
      content,
      upvotes: 0,
      downvotes: 0,
      user_vote: 0,
      author: { username: "you" },
      replies: [],
    };

    setComments((prev) => [...prev, newComment]);
  };

  const addReply = (parentId: number, content: string) => {
    const id = nextIdRef.current++;
    const reply: Comment = {
      id,
      post_id: 101,
      parent_id: parentId,
      created_at: new Date().toISOString(),
      content,
      upvotes: 0,
      downvotes: 0,
      user_vote: 0,
      author: { username: "you" },
      replies: [],
    };

    setComments((prev) => {
      // Clone shallowly to keep React state updates reliable
      const cloned = structuredClone(prev);
      return appendReply(cloned, parentId, reply);
    });
  };

  return (
    <section className="w-full">
      <div>
        <h2 className="text-base font-semibold text-zinc-900">
          {dict.post.joinconversation}
        </h2>
      </div>

      <div className="pt-4 pb-4">
        <CommentForm
          postId={101}
          placeholder={dict.comment.addComment}
          buttonText={dict.comment.addComment}
          dict={dict}
          onSubmit={addRootComment}
        />
      </div>

      <div className="pt-4">
        {threadedComments.length === 0 ? (
          <p className="text-center text-zinc-500 py-8">
            {dict.comment.noComments}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {threadedComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                dict={dict}
                onAddReply={addReply}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
