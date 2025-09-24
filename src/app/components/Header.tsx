"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },  
  { href: "/books", label: "Books" },  
  { href: "/about", label: "About" },  
  { href: "/contact", label: "Contact" },  
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 header-container">
                <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Book Boutique" width={200} height={100} />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-slate-700 hover:text-slate-900 font-medium"
                    >
                        {link.label}
                    </Link>
                    ))}
                </nav>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden rounded p-2 text-slate-700 hover:bg-slate-100"
                    aria-label="Toggle menu"
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                <nav className="flex flex-col px-4 py-3 space-y-2">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-slate-700 hover:text-slate-900 font-medium"
                        onClick={() => setOpen(false)}
                    >
                        {link.label}
                    </Link>
                    ))}
                </nav>
                </div>
            )}
            </header>
    );
}