"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b bg-(--color-background) text-(--color-foreground)">
      <div className="max-w-dvw mx-auto  px-12 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link  href="/" className="flex items-center gap-2">
        <Image
            src="/logo.png"
            alt="Kaka Memorial Foundation"
            width={120}
            height={40}
            className="h-12 w-auto object-contain"
            priority
          />
          
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6  font-medium ">
          <Link href="/" className="hover:text-gray-600 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-600 transition">
            About
          </Link>
          <Link href="/causes" className="hover:text-gray-600 transition">
            Causes
          </Link>
          <Link href="/events" className="hover:text-gray-600 transition">
            Events
          </Link>
          <Link href="/join-us" className="hover:text-gray-600 transition">
            Join Us
          </Link>
          <Link href="/contacts" className="hover:text-gray-600 transition">
            Contact Us
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Link
            href="/donate"
            className="bg-(--color-secondary) text-(--color-light) px-6 py-2 rounded-lg hover:bg-(--color-secondary-dark) transition"
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}