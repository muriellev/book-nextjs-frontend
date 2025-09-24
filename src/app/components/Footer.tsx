import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side: site info */}
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} Book Boutique. All rights reserved.
        </p>

        {/* Right side: nav / social links */}
        <nav className="flex gap-4 text-sm text-slate-600">
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-900">
            Terms
          </Link>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900"
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}