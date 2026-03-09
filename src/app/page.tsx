import CommentsSection from "../shared/components/CommentsSection";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="text-lg font-semibold">
          Reddit/Youtube style Comment Section
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          You can write and interact with the comments (upvote/downvote, reply, collapse
          threads)
        </p>

        <p className="mt-1 text-sm text-zinc-700">
          You can use this as a starting point for implementing a comment
          section in your own projects. The code is available on{" "}
          <a
            href="https://github.com/theapro/threadedcomments"
            className="text-blue-500 hover:underline"
          >
            GitHub.
          </a>
        </p>

        <div className="mt-8">
          <CommentsSection />
        </div>
        <div className="-mb-8 text-center">
          <p className="mt-1  text-xs mt-30 text-zinc-500">
            If you find this useful, please consider starring the repo on
            GitHub. Made by <span className="font-semibold">Theapro.</span> 
          </p>
        
        </div>
      </div>
    </main>
  );
}
