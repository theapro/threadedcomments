"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MessageCircleMore } from "lucide-react";
import type { Comment } from "../types/comment";
import type { Dictionary } from "../types/dictionary";
import { getAvatarSrc } from "../lib/avatar";
import CommentVoteBar from "./CommentVoteBar";
import CommentForm from "./CommentForm";
import ReportButton from "./ReportButton";
import ShareButton from "./ShareButton";

type CommentDict = Pick<Dictionary, "comment" | "post">;

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;

  return date.toLocaleDateString();
}

function CommentThread({
  comment,
  dict,
  onAddReply,
}: {
  comment: Comment;
  dict: CommentDict;
  onAddReply: (parentId: number, content: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const hoverBlockId = String(comment.id);
  const hoverActiveRef = useRef(false);
  const [isHoverActive, setIsHoverActive] = useState(false);

  const authorUsername = comment.author?.username ?? comment.username ?? "user";
  const authorAvatarUrl =
    comment.author?.avatar_url ?? comment.avatar_url ?? null;

  const hasReplies = comment.replies && comment.replies.length > 0;

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (next) setShowReplyBox(false);
      return next;
    });
  };

  const updateHoverFromTarget = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    const blockEl = el?.closest?.(
      "[data-thread-hover-block]",
    ) as HTMLElement | null;
    const blockId = blockEl?.getAttribute("data-thread-hover-block");
    const next = !(blockId && blockId !== hoverBlockId);

    if (hoverActiveRef.current !== next) {
      hoverActiveRef.current = next;
      setIsHoverActive(next);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    updateHoverFromTarget(e.target);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateHoverFromTarget(e.target);
  };

  const handleMouseLeave = () => {
    hoverActiveRef.current = false;
    setIsHoverActive(false);
  };

  const lineBgClass = isHoverActive ? "bg-zinc-400" : "bg-zinc-300";
  const borderHoverClass = isHoverActive
    ? "border-zinc-400"
    : "border-zinc-300";

  return (
    <div
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex w-full gap-2">
        {/* Thread column */}
        <div className="flex flex-col items-center w-8.5">
          {!collapsed && (
            <>
              {/* Avatar */}
              <Image
                src={getAvatarSrc(authorAvatarUrl)}
                alt={authorUsername}
                width={34}
                height={34}
                className="rounded-full object-cover"
                unoptimized
              />

              {hasReplies && (
                <div
                  className={`flex-1 w-px cursor-pointer ${lineBgClass}`}
                  onClick={toggleCollapsed}
                />
              )}
            </>
          )}
        </div>

        {/* Comment content */}
        <div className="flex-1 min-w-0">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="flex items-center gap-2 py-2 -ml-8 -mt-1 mb-6 text-xs text-zinc-500 hover:text-zinc-800 font-medium"
              type="button"
            >
              <span className="flex items-center justify-center w-4 h-4 text-[9px] rounded-full border border-zinc-300 text-zinc-400 bg-white">
                +
              </span>
              {authorUsername}
              {hasReplies && (
                <span className="opacity-60">
                  [+{comment.replies?.length} replies]
                </span>
              )}
            </button>
          ) : (
            <>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold hover:underline">
                  {authorUsername}
                </span>
                <span className="text-xs text-zinc-500">
                  • {formatTimeAgo(comment.created_at)}
                </span>
              </div>

              <div className="text-sm mb-2 mt-5 whitespace-pre-wrap leading-relaxed">
                {comment.content}
              </div>

              <div className="relative flex items-center flex-wrap gap-1 -ml-2 mb-2">
                {hasReplies && (
                  <button
                    onClick={toggleCollapsed}
                    className="absolute top-1/2 -translate-y-1/2 ml-2 z-10 flex items-center justify-center w-4 h-4 text-[9px] rounded-full border border-zinc-600 text-zinc-400 bg-white transition"
                    style={{ left: "-2.05rem" }}
                    type="button"
                    aria-label={collapsed ? "Expand thread" : "Collapse thread"}
                  >
                    {collapsed ? "+" : "−"}
                  </button>
                )}

                <CommentVoteBar
                  voteableId={comment.id}
                  initialUpvotes={comment.upvotes}
                  initialDownvotes={comment.downvotes}
                  userVote={comment.user_vote}
                />

                <button
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="rounded-full h-8 px-3 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 text-gray-700 hover:bg-gray-100"
                  type="button"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  <span>{dict.comment.reply}</span>
                </button>

                <ShareButton
                  type="comment"
                  id={comment.post_id}
                  slug={comment.id.toString()}
                  dict={dict}
                  className="rounded-full h-8 px-3 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 text-gray-700 hover:bg-gray-100"
                />

                <ReportButton commentId={comment.id} dict={dict} />
              </div>

              {showReplyBox && (
                <div className="mt-2 mb-4 max-w-xl">
                  <CommentForm
                    postId={comment.post_id}
                    parentId={comment.id}
                    onSubmit={(content) => {
                      onAddReply(comment.id, content);
                      setShowReplyBox(false);
                    }}
                    onCancel={() => setShowReplyBox(false)}
                    placeholder={dict.comment.reply}
                    buttonText={dict.comment.reply}
                    dict={dict}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Replies */}
      {!collapsed && hasReplies && (
        <div className="pl-10.5" data-thread-hover-block={hoverBlockId}>
          <div className="pl-0.5">
            {comment.replies!.map((reply, index) => {
              const isLast = index === comment.replies!.length - 1;

              return (
                <div
                  key={reply.id}
                  className={index === 0 ? "relative pt-2" : "relative"}
                >
                  {!isLast && (
                    <div
                      className={`absolute -left-7 top-0 bottom-0 w-px cursor-pointer ${lineBgClass}`}
                      onClick={toggleCollapsed}
                    />
                  )}

                  <div
                    className={`absolute -left-7 -top-[0.1px] h-5 w-7 border-l border-b rounded-bl-4xl cursor-pointer ${borderHoverClass}`}
                    onClick={toggleCollapsed}
                  />

                  <CommentThread
                    comment={reply}
                    dict={dict}
                    onAddReply={onAddReply}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommentItem({
  comment,
  dict,
  onAddReply,
}: {
  comment: Comment;
  dict: CommentDict;
  onAddReply: (parentId: number, content: string) => void;
}) {
  return (
    <div className="mb-4">
      <CommentThread comment={comment} dict={dict} onAddReply={onAddReply} />
    </div>
  );
}
