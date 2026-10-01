// Server-side helpers for the website forms that forward to Make.com.

// Keep what the visitor typed (apostrophes, quotes, words like "subscription")
// and only strip angle brackets so nothing renders as HTML in notification emails.
export function cleanText(input: unknown, maxLength = 200): string {
  if (typeof input !== 'string') {
    return '';
  }
  return input.trim().replace(/[<>]/g, '').slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Posts the submission to a Make.com webhook. If delivery fails, the full payload
// is logged under a fixed tag so the lead can be recovered from the Vercel logs.
export async function forwardToWebhook(
  webhookUrl: string | undefined,
  payload: Record<string, unknown>,
  formName: string
): Promise<boolean> {
  const logUndelivered = (reason: string) =>
    console.error(`[form-submission-undelivered] ${formName}: ${reason}`, JSON.stringify(payload));

  if (!webhookUrl) {
    logUndelivered('webhook URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      logUndelivered(`webhook responded ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    logUndelivered(`webhook request failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    return false;
  }
}
