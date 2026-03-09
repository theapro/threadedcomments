"use client";

import { useMemo, useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

export default function CommentVoteBar({
  voteableId,
  initialUpvotes,
  initialDownvotes,
  userVote = 0,
}: {
  voteableId: number | string;
  initialUpvotes: number;
  initialDownvotes: number;
  userVote?: -1 | 0 | 1;
}) {
  const [vote, setVote] = useState<-1 | 0 | 1>(userVote);

  const score = useMemo(() => {
    const base = (initialUpvotes ?? 0) - (initialDownvotes ?? 0);
    return base + vote;
  }, [initialDownvotes, initialUpvotes, vote]);

  const up = () => setVote((v) => (v === 1 ? 0 : 1));
  const down = () => setVote((v) => (v === -1 ? 0 : -1));

  return (
    <div className="inline-flex items-center justify-center gap-1 rounded-full h-8 px-2 text-xs font-semibold text-gray-700 hover:bg-gray-100">
      
      <button
        type="button"
        aria-label={`Upvote ${voteableId}`}
        onClick={up}
        className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-white"
      >
        <ArrowBigUp className="h-4 w-4" />
      </button>

      <span className="flex items-center justify-center min-w-6 text-center tabular-nums leading-none">
        {score}
      </span>

      <button
        type="button"
        aria-label={`Downvote ${voteableId}`}
        onClick={down}
        className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-white"
      >
        <ArrowBigDown className="h-4 w-4" />
      </button>

    </div>
  );
}