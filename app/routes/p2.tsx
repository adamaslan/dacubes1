import React, { Suspense, lazy } from "react";
import Navbar from "~/components/navbar";
import type { MetaFunction } from "@remix-run/node";

// Lazy load the `cam` component to ensure it only runs on the client
const Cam = lazy(() => import("../components/cam1"));

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index2() {
  const navLinks = [
    { href: "#home", text: "Home" }, // Example links
    { href: "#about", text: "About" },
    { href: "#contact", text: "Contact" },
  ];

  const logo = <div>My Logo</div>; // Example logo

  return (
    <div>
      <Navbar links={navLinks} logo={logo} />
      <div className="flex h-screen items-center justify-center pt-20"> {/* Added top padding */}
        <div className="flex flex-col items-center gap-16">
          <header className="flex flex-col items-center gap-9">
            <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
              ThreeJS <span className="sr-only">Remix</span>
            </h1>
            <div className="h-[144px] w-[434px]">
              {/* Your image or other content here */}
            </div>
          </header>
          <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
            <p className="leading-6 text-gray-700 dark:text-gray-200">
              What&apos;s next?
            </p>
            <Suspense fallback={<div>Loading...</div>}>
              {/* The `Cam` component will load only on the client */}
              <Cam />
            </Suspense>
          </nav>
        </div>
      </div>
    </div>
  );
}
