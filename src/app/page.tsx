import CommentsSection from "../shared/components/CommentsSection";

export default function Page() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-50">
      {/* Scrollbar uslubi uchun maxsus klass qo'shilgan: scrollbar-thin */}
      <div className="mx-auto max-w-2xl px-6 py-16 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
        
        {/* Header: Matnlar iyerarxiyasi yaxshilandi */}
        <header className="mb-10 space-y-3">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            Reddit/YouTube style Comment Section
          </h1>
          
          <div className="space-y-2 text-sm leading-relaxed text-zinc-500">
            <p>
              You can write and interact with the comments (upvote/downvote, reply, collapse threads).
            </p>
            <p>
              Use this as a starting point for your own projects. Source code: {" "}
              <a 
                href="https://github.com/theapro/threadedcomments" 
                className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                GitHub
              </a>.
            </p>
          </div>
        </header>

        {/* Comments Area */}
        <section className="border-t border-zinc-100 pt-8">
          <CommentsSection />
        </section>

        {/* Footer: Minimalist va joylashuvi aniq */}
        <footer className="mt-20 -mb-10 pt-4 text-center border-t border-zinc-50">
          <p className="text-xs text-zinc-400">
            If you find this useful, please consider starring the repo on GitHub. 
            <br className="sm:hidden" /> 
            {" "}Made by{" "}
            <a 
              href="https://www.theapro.me" 
              className="font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 hover:text-blue-600 hover:decoration-blue-400 transition-all"
            >
              Theapro
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}