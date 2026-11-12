"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-orange uppercase">
          Message received
        </p>
        <h2 className="mt-3 text-2xl font-bold text-navy-deep">
          Thank you. A PrimeGo lead will come back to you shortly.
        </h2>
        <p className="mt-3 text-muted">
          For urgent site cover, call us and ask for the duty supervisor.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Full name
          <input
            required
            name="name"
            className="h-12 rounded-lg border border-line px-3 outline-none ring-orange/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Company
          <input
            required
            name="company"
            className="h-12 rounded-lg border border-line px-3 outline-none ring-orange/30 focus:ring-2"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            required
            type="email"
            name="email"
            className="h-12 rounded-lg border border-line px-3 outline-none ring-orange/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Phone
          <input
            required
            name="phone"
            className="h-12 rounded-lg border border-line px-3 outline-none ring-orange/30 focus:ring-2"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        How can we help?
        <select
          name="need"
          className="h-12 rounded-lg border border-line px-3 outline-none ring-orange/30 focus:ring-2"
          defaultValue="Industrial cleaning"
        >
          <option>Industrial cleaning</option>
          <option>Post-construction cleaning</option>
          <option>Commercial cleaning</option>
          <option>Facility management</option>
          <option>Janitorial services</option>
          <option>Careers</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-lg border border-line px-3 py-3 outline-none ring-orange/30 focus:ring-2"
        />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-orange px-6 font-semibold text-white transition hover:bg-orange-hot"
      >
        Send enquiry
      </button>
    </form>
  );
}
