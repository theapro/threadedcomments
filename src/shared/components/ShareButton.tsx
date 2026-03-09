"use client";

import type { Dictionary } from "../types/dictionary";
import { Share2, Check } from "lucide-react";

export default function ShareButton({
  dict,
  className,
}: {
  type: "comment";
  id: number | string;
  slug: string;
  dict: Pick<Dictionary, "comment" | "post">;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={
        className ??
        "rounded-full h-8 px-3 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 text-gray-700 hover:bg-gray-100"
      }
      onClick={() => {
        // Demo-only
        void navigator.clipboard?.writeText(window.location.href);
      }}
    >
      <Share2 className="h-4 w-4" />
      <span>{dict.comment.share}</span>
    </button>
  );
}
