"use client";

import type { Dictionary } from "../types/dictionary";
import { Flag } from "lucide-react";

export default function ReportButton({
  commentId,
  dict,
}: {
  commentId: number | string;
  dict: Pick<Dictionary, "comment" | "post">;
}) {
  return (
    <button
      type="button"
      className="rounded-full h-8 px-3 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 text-gray-700 hover:bg-gray-100"
      onClick={() => {
        // Demo-only
        console.log("Report comment", commentId);
      }}
    >
      <Flag className="h-4 w-4" />
      <span>{dict.comment.report}</span>
    </button>
  );
}
