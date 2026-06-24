export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { PERSONAL_INFO } from "@/lib/constants";

// RATE LIMITING (future implementation)
// Add Upstash Redis rate limiting here to prevent form spam.
//
// 1. Install:  npm install @upstash/ratelimit @upstash/redis
//
// 2. Initialise outside the handler (module-level, reused across invocations):
//    import { Ratelimit } from "@upstash/ratelimit";
//    import { Redis } from "@upstash/redis";
//    const ratelimit = new Ratelimit({
//      redis: Redis.fromEnv(),                 // UPSTASH_REDIS_REST_URL + TOKEN in .env
//      limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per IP per hour
//      analytics: true,
//    });
//
// 3. Inside the POST handler, before Zod validation:
//    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
//    const { success, reset } = await ratelimit.limit(ip);
//    if (!success) {
//      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
//      return NextResponse.json(
//        { error: "Too many requests. Please try again later." },
//        { status: 429, headers: { "Retry-After": String(retryAfter) } }
//      );
//    }
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function buildHtmlEmail(name: string, email: string, message: string): string {
  // Escape user-supplied content to prevent HTML injection
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      // Preserve line breaks in the message body
      .replace(/\n/g, "<br />");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#0a0a0a 100%);border-radius:16px 16px 0 0;padding:36px 40px 32px;border:1px solid rgba(59,130,246,0.2);border-bottom:none;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#3b82f6;">Portfolio Contact</p>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">New Message Received</h1>
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="background-color:#111111;padding:32px 40px;border:1px solid rgba(255,255,255,0.06);border-top:none;border-bottom:none;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#1a1a1a;border:1px solid rgba(59,130,246,0.15);border-radius:12px;padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.06);">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#3b82f6;">From</p>
                          <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">${esc(name)}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:14px;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#3b82f6;">Reply-To</p>
                          <a href="mailto:${esc(email)}" style="font-size:15px;color:#93c5fd;text-decoration:none;font-weight:500;">${esc(email)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#3b82f6;">Message</p>
              <div style="background-color:#1a1a1a;border:1px solid rgba(255,255,255,0.06);border-left:3px solid #3b82f6;border-radius:0 12px 12px 0;padding:20px 24px;">
                <p style="margin:0;font-size:15px;line-height:1.75;color:#d1d5db;">${esc(message)}</p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${esc(email)}" style="display:inline-block;background-color:#3b82f6;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:50px;letter-spacing:0.02em;">Reply to ${esc(name)}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0d0d;border:1px solid rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.04);border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#4b5563;">
                Sent via <span style="color:#3b82f6;font-weight:600;">Ayan Pathak&apos;s Portfolio</span> Contact Form
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#374151;">
                <a href="mailto:${PERSONAL_INFO.email}" style="color:#374151;text-decoration:none;">${PERSONAL_INFO.email}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(req: Request) {
  // Resend client initialised inside handler so it only runs on actual
  // form submissions — avoids crashing the build when the key is missing.
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { name, email, message } = contactSchema.parse(body);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const data = await resend.emails.send({
      from: `Portfolio Contact <${fromAddress}>`,
      to: PERSONAL_INFO.email,
      subject: `New message from ${name} — Portfolio`,
      replyTo: email,
      // Plain-text fallback for clients that don't render HTML
      text: `New portfolio contact\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Ayan Pathak's Portfolio Contact Form`,
      html: buildHtmlEmail(name, email, message),
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}