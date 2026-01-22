import { useEffect, useState } from "react";

type Row = {
  url: string;
  title?: string;
  notes?: string;
  tag?: string;
  status?: string;
};

function loadInstagramEmbedsOnce() {
  const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
  if (existing) return;

  const s = document.createElement("script");
  s.async = true;
  s.defer = true;
  s.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(s);
}

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    const next = csv[i + 1];

    if (c === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((c === "\n" || c === "\r") && !inQuotes) {
      if (c === "\r" && next === "\n") i++;
      row.push(cell);
      cell = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else {
      cell += c;
    }
  }

  row.push(cell);
  if (row.some((x) => x.trim() !== "")) rows.push(row);

  return rows;
}

export default function Community() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  const csvUrl = (import.meta as any).env?.VITE_SUBMISSIONS_CSV_URL as string | undefined;
  const formUrl = (import.meta as any).env?.VITE_SUBMIT_FORM_URL as string | undefined;

  useEffect(() => {
    loadInstagramEmbedsOnce();
  }, []);

  useEffect(() => {
    async function run() {
      try {
        if (!csvUrl) {
          setError("Missing CSV URL (Netlify env var not set)");
          return;
        }

        const res = await fetch(csvUrl);
        const text = await res.text();

        const grid = parseCsv(text);
        const headers = grid[0].map((h) => h.toLowerCase());
        const data = grid.slice(1);

        const get = (r: string[], name: string) => {
          const i = headers.indexOf(name);
          return i >= 0 ? r[i] : "";
        };

        const parsed = data
          .map((r) => ({
            url: get(r, "instagram post url") || get(r, "url"),
            title: get(r, "title"),
            notes: get(r, "notes / why are you sharing this?"),
            tag: get(r, "category / tag"),
            status: get(r, "status"),
          }))
          .filter((r) => r.url && r.status === "approved");

        setRows(parsed);

        setTimeout(() => {
          (window as any).instgrm?.Embeds?.process?.();
        }, 500);
      } catch (e: any) {
        setError(e.message);
      }
    }

    run();
  }, [csvUrl]);

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <h2 className="text-3xl tracking-wide uppercase mb-4">Community</h2>

      {formUrl && (
        <a
          href={formUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block mb-8 px-6 py-3 bg-neutral-900 text-white uppercase tracking-wide text-sm"
        >
          Submit a link
        </a>
      )}

      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-16">
        {rows.map((r, i) => (
          <div key={i}>
            {r.title && <h3 className="text-xl mb-2">{r.title}</h3>}
            {r.notes && <p className="mb-4">{r.notes}</p>}

            <blockquote
              className="instagram-media"
              data-instgrm-permalink={r.url}
              data-instgrm-version="14"
            />

            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="block mt-2 underline"
            >
              Open on Instagram
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

