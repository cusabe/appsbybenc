"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/contact";
import { Button } from "@/components/ui/Button";

const ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY ?? "";

type Field = "name" | "email" | "reason" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(data.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!data.reason) errors.reason = "Please choose one.";
  if (data.message.trim().length < 10)
    errors.message = "Please write a little more (at least 10 characters).";
  return errors;
}

const inputClass =
  "w-full rounded-xl border bg-bg px-4 py-3 text-text shadow-inner transition-colors placeholder:text-muted/70 focus:border-accent focus-visible:outline-offset-2";

/**
 * Contact form. Works on a static site: it posts straight to Web3Forms, which
 * emails the message on. Includes a hidden honeypot field for spam bots,
 * client-side validation, and clear sending, success and error states.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real people never see or fill this field.
    if (fd.get("botcheck")) return;

    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      reason: String(fd.get("reason") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const found = validate(data);
    setErrors(found);
    const firstError = (Object.keys(found) as Field[])[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    if (!ACCESS_KEY) {
      // Not configured yet (no NEXT_PUBLIC_FORM_ACCESS_KEY in .env.local).
      console.warn("Contact form: NEXT_PUBLIC_FORM_ACCESS_KEY is not set.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `appsbybenc.com: ${data.reason}`,
          from_name: "appsbybenc.com contact form",
          ...data,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-surface p-8 text-center shadow-soft"
      >
        <p className="font-heading text-2xl font-bold text-heading">
          {contact.success.title}
        </p>
        <p className="mt-2 text-muted">{contact.success.text}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-semibold text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const describe = (field: Field) =>
    errors[field] ? `${field}-error` : undefined;

  const errorText = (field: Field) =>
    errors[field] ? (
      <p
        id={`${field}-error`}
        className="mt-1.5 text-sm font-medium text-accent"
      >
        {errors[field]}
      </p>
    ) : null;

  const border = (field: Field) =>
    errors[field] ? "border-accent" : "border-border";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className={`${inputClass} ${border("name")}`}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className={`${inputClass} ${border("email")}`}
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="mb-1.5 block font-semibold">
          What are you getting in touch about?
        </label>
        <select
          id="reason"
          name="reason"
          defaultValue=""
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={describe("reason")}
          className={`${inputClass} ${border("reason")}`}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {contact.reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errorText("reason")}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe("message")}
          className={`${inputClass} ${border("message")} resize-y`}
        />
        {errorText("message")}
      </div>

      {/* Honeypot for spam bots: hidden from people and screen readers. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Leave this empty
          <input type="checkbox" name="botcheck" tabIndex={-1} />
        </label>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium"
        >
          {contact.error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "sending"}
        className="px-6 py-3 text-base"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
