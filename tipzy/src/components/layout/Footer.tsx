import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t bg-[--color-secondary]">
      <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-[--color-text]/70">
          © {year} Tipzy. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2 text-[--color-text]/70">
            <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden /> RBI Compliant (mock)
          </span>
          <Link href="/about" className="hover:text-[--color-primary]">About</Link>
          <Link href="/privacy" className="hover:text-[--color-primary]">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}


