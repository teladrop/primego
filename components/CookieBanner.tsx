"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only if user hasn't accepted yet
    const consent = localStorage.getItem("wm_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("wm_cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("wm_cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-white px-4 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-navy-deep">
            We use cookies 🍪
          </p>
          <p className="mt-1 text-sm text-muted">
            We use essential cookies to keep the site working and analytics cookies to understand how visitors use it. No personal data is sold or shared.{" "}
            <Link href="/contact" className="underline hover:text-orange">
              Learn more
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            onClick={decline}
            className="rounded-full border border-line px-5 py-2 text-sm font-medium text-muted transition hover:border-slate-400 hover:text-navy-deep"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-hot"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
