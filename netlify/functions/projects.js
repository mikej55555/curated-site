export async function handler(event) {
  const API_URL = process.env.PROJECTS_API_URL;

  if (!API_URL) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Missing PROJECTS_API_URL" }),
    };
  }

  try {
    // GET -> list projects
    if (event.httpMethod === "GET") {
      const r = await fetch(API_URL, { method: "GET" });
      const text = await r.text();

      return {
        statusCode: r.status,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: text,
      };
    }

    // POST -> add project
    if (event.httpMethod === "POST") {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: event.body || "{}",
      });

      const text = await r.text();

      return {
        statusCode: r.status,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: text,
      };
    }

    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: "Proxy fetch failed",
        detail: String(err?.message || err),
      }),
    };
  }
}
