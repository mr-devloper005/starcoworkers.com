import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@starcoworkers.com'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="inline-flex items-center rounded-full border border-[#c3d5c5] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f6a3c]">
              Contact
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[#112b18]">We are here to help your listing grow</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#3e6149]">
              Reach out for listing support, profile verification, partnership requests, or account help. Our team will respond with clear next steps.
            </p>

            <div className="mt-7 space-y-3">
              {[
                { title: "Listing Support", body: "Get help adding or editing your business listing details." },
                { title: "Verification Team", body: "Request profile verification and trust badge activation." },
                { title: "Partnership Desk", body: "For local partnerships, promotions, and category collaborations." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.2rem] border border-[#d2e1d4] bg-white p-4">
                  <p className="font-semibold text-[#183623]">{item.title}</p>
                  <p className="mt-1 text-sm text-[#486652]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#cfe0d1] bg-white p-7 shadow-[0_22px_64px_rgba(16,34,20,0.08)]">
            <h2 className="text-2xl font-semibold text-[#173723]">Send a message</h2>
            <form className="mt-5 grid gap-4">
              <input className="h-12 rounded-xl border border-[#d4e2d6] bg-[#f7fbf7] px-4 text-sm text-[#173723]" placeholder="Your name" />
              <input className="h-12 rounded-xl border border-[#d4e2d6] bg-[#f7fbf7] px-4 text-sm text-[#173723]" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-[#d4e2d6] bg-[#f7fbf7] px-4 text-sm text-[#173723]" placeholder="Subject" />
              <textarea className="min-h-[180px] rounded-2xl border border-[#d4e2d6] bg-[#f7fbf7] px-4 py-3 text-sm text-[#173723]" placeholder="Tell us how we can help..." />
              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-[#123f26] px-6 text-sm font-semibold text-white transition hover:bg-[#195632]">
                Submit request
              </button>
            </form>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
