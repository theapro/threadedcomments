"use client";

import { useState } from "react";
import type { Dictionary } from "../types/dictionary";

export default function CommentForm({
  placeholder,
  buttonText,
  onCancel,
  onSubmit,
  dict,
}: {
  postId: number | string;
  parentId?: number | string;
  placeholder: string;
  buttonText: string;
  dict: Pick<Dictionary, "comment" | "post">;
  onCancel?: () => void;
  onSubmit: (content: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        const content = value.trim();
        if (!content) return;
        onSubmit(content);
        setValue("");
      }}
    >
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-24 resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 pb-12 text-sm outline-none focus:border-zinc-400"
        />

        {/* buttons inside textarea */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full h-7 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              {dict.comment.cancel}
            </button>
          )}

          <button
            type="submit"
            className="rounded-full h-7 px-3 text-xs font-semibold text-white bg-[#0fd6a0] hover:bg-[#0db887] transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}