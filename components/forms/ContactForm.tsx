"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { track } from "@/lib/analytics";

const initial: ContactState = { status: "idle" };

type FieldDef = {
  name: "name" | "phone" | "email" | "business" | "location" | "website";
  label: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  inputMode?: "tel" | "email" | "url";
};

const fields: FieldDef[] = [
  { name: "name", label: "Your name", autoComplete: "name" },
  { name: "business", label: "Business name", autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", inputMode: "tel" },
  { name: "location", label: "Business location", autoComplete: "address-level2" },
  { name: "website", label: "Website URL", type: "url", autoComplete: "url", optional: true, inputMode: "url" },
];

const input =
  "mt-2 block w-full rounded-xs border border-graphite bg-obsidian px-4 py-3 text-white placeholder:text-titanium focus:border-teal focus:outline-none aria-[invalid=true]:border-[#ff7a6b]";

export function ContactForm({ source = "home" }: { source?: string }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const started = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      track("generate_lead", { form_source: source });
      track("qualified_inquiry", { form_source: source });
    }
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state, source]);

  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_source: source });
  };

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-teal/50 bg-obsidian p-8 focus:outline-none">
        <p className="mono-data text-teal">Message received</p>
        <p className="mt-4 font-display text-2xl font-semibold text-white">Thank you. We&rsquo;ll be in touch soon.</p>
        <p className="mt-3 text-titanium-light">
          A member of the NÜE team will review your note and reach out to set up a conversation.
        </p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const val = state.values ?? {};

  return (
    <form action={action} onInput={onFirstInput} noValidate className="grid gap-5 sm:grid-cols-2">
      {state.status === "error" && state.message && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-[#ff7a6b]/60 p-4 text-sm text-white sm:col-span-2 focus:outline-none">
          {state.message}
        </div>
      )}
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={`cf-${f.name}`} className="ui-text text-concrete">
            {f.label} {f.optional ? <span className="text-titanium">(optional)</span> : <span aria-hidden="true" className="text-teal">*</span>}
          </label>
          <input
            id={`cf-${f.name}`}
            name={f.name}
            type={f.type ?? "text"}
            inputMode={f.inputMode}
            autoComplete={f.autoComplete}
            required={!f.optional}
            defaultValue={val[f.name]}
            aria-invalid={err[f.name] ? true : undefined}
            aria-describedby={err[f.name] ? `cf-${f.name}-err` : undefined}
            className={input}
          />
          {err[f.name] && (
            <p id={`cf-${f.name}-err`} className="mt-2 text-sm text-[#ff9d92]">{err[f.name]}</p>
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="ui-text text-concrete">
          What are you having trouble with? <span aria-hidden="true" className="text-teal">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          defaultValue={val.message}
          aria-invalid={err.message ? true : undefined}
          aria-describedby={err.message ? "cf-message-err" : undefined}
          className={input}
        />
        {err.message && <p id="cf-message-err" className="mt-2 text-sm text-[#ff9d92]">{err.message}</p>}
      </div>
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-company-url">Leave this field empty</label>
        <input id="cf-company-url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="sheen ui-text inline-flex items-center gap-3 rounded-xs bg-teal px-7 py-4 font-semibold text-obsidian hover:bg-ice disabled:opacity-60"
        >
          {pending ? "Sending…" : "Start the Conversation"}
        </button>
        <p className="text-sm text-titanium-light">No obligation. Your details are only used to reply to you.</p>
      </div>
    </form>
  );
}
