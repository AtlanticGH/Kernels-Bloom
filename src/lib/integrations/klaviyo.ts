// Klaviyo adapter. Subscribes an email to the configured list when
// KLAVIYO_API_KEY + NEXT_PUBLIC_KLAVIYO_LIST_ID are set; otherwise no-ops so
// local development works without credentials.

export async function subscribeToNewsletter(email: string): Promise<{
  ok: boolean;
  live: boolean;
}> {
  const apiKey = process.env.KLAVIYO_API_KEY;
  const listId = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    // Local / preview mode — pretend success so the UI flow is testable.
    console.info("[klaviyo] stub: would subscribe", email);
    return { ok: true, live: false };
  }

  const res = await fetch(
    `https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/`,
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        "Content-Type": "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: { data: [{ type: "profile", attributes: { email } }] },
          },
          relationships: {
            list: { data: { type: "list", id: listId } },
          },
        },
      }),
    }
  );

  return { ok: res.ok, live: true };
}
