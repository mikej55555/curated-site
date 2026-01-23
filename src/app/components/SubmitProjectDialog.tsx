import { useMemo, useState } from "react";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function SubmitProjectDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (project: {
    title: string;
    description: string;
    imageUrl?: string;
    instagramUrl?: string;
    architect?: string;
    location?: string;
    category: "architecture" | "landscape";
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [architect, setArchitect] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] =
    useState<"architecture" | "landscape">("architecture");

  const errors = useMemo(() => {
    const e: string[] = [];
    if (!title.trim()) e.push("Title is required.");
    if (!description.trim()) e.push("Description is required.");

    // Instagram required
    if (!instagramUrl.trim()) e.push("Instagram link is required.");
    if (instagramUrl.trim() && !isValidUrl(instagramUrl.trim()))
      e.push("Instagram link must be a valid URL.");

    // Image optional, but validate if present
    if (imageUrl.trim() && !isValidUrl(imageUrl.trim()))
      e.push("Image URL must be a valid URL.");

    return e;
  }, [title, description, imageUrl, instagramUrl]);

  const handleSubmit = () => {
    if (errors.length) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      instagramUrl: instagramUrl.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      architect: architect.trim() || undefined,
      location: location.trim() || undefined,
      category,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl p-6 border border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg uppercase tracking-wide">Submit Project</h2>
          <button onClick={onClose} className="px-3 py-2 border">
            Close
          </button>
        </div>

        <input
          placeholder="Title *"
          className="w-full border p-2 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description *"
          className="w-full border p-2 mb-3"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Instagram URL * (https://instagram.com/... or post link)"
          className="w-full border p-2 mb-3"
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
        />

        <input
          placeholder="Image URL (optional - https://...)"
          className="w-full border p-2 mb-3"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          placeholder="Architect (optional)"
          className="w-full border p-2 mb-3"
          value={architect}
          onChange={(e) => setArchitect(e.target.value)}
        />

        <input
          placeholder="Location (optional)"
          className="w-full border p-2 mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-4"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "architecture" | "landscape")
          }
        >
          <option value="architecture">Architecture</option>
          <option value="landscape">Landscape</option>
        </select>

        {errors.length > 0 && (
          <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-3">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white">
            Submit
          </button>
        </div>

        <p className="text-xs text-neutral-400 mt-3">
          Instagram is required. Image is optional (use it if you want a thumbnail on the feed).
        </p>
      </div>
    </div>
  );
}
