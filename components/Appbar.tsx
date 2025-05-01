"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Music } from "lucide-react";

export function Appbar() {
  const session = useSession();

  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <Music className="h-6 w-6 transition-transform group-hover:scale-110 group-hover:text-primary" />
          <span className="inline-block font-bold transition-colors group-hover:text-primary">
            BeatNet
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link
            href="#features"
            className="flex items-center text-lg font-medium transition-colors hover:text-primary relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center text-lg font-medium transition-colors hover:text-primary relative group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="#testimonials"
            className="flex items-center text-lg font-medium transition-colors hover:text-primary relative group"
          >
            Community
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </nav>
      </div>

      <div className="flex justify-end pl-215">
        <div className="flex items-center space-x-4">
          <ModeToggle />

          {session.data?.user ? (
  <Button variant="outline" className="group" onClick={() => signOut()}>
    logout
    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 " />
  </Button>
) : (
  <Link href="/signup">
    <Button variant="outline" className="group">
      Signin
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 " />
    </Button>
  </Link>
)}

        </div>
      </div>
    </div>
  );
}