import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 bg-hero p-8 text-center">
      <p className="text-sm font-semibold tracking-widest text-accent uppercase">
        Phase 2 · Design tokens
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Apps by Ben C
      </h1>
      <p className="max-w-md">
        The real page starts in Phase 3. For now, have a look at the style tile.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/style-tile"
          className="font-semibold text-accent underline underline-offset-4"
        >
          Open the style tile →
        </Link>
        <ThemeToggle />
      </div>
    </main>
  );
}
