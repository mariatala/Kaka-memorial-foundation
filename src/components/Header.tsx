"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-dvw mx-auto  px-12 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link  href="/" className="flex items-center gap-2">
        <Image
            src="/logo.png"
            alt="Kaka Memorial Foundation"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
          
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium ">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-black transition">
            About
          </Link>
          <Link href="/causes" className="hover:text-black transition">
            Causes
          </Link>
          <Link href="/events" className="hover:text-black transition">
            Events
          </Link>
          <Link href="/join-us" className="hover:text-black transition">
            Join Us
          </Link>
          <Link href="/contacts" className="hover:text-black transition">
            Contact Us
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Link
            href="/donate"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}