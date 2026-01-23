import { useState } from "react";

export function SubmitProjectDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (project: {
    title: string;
    description: string;
    imageUrl: string;
    architect?: string;
    location?: string;
    category: "architecture" | "landscape";
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [architect, setArchitect] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] =
    useState<"architecture" | "landscape">("architecture");

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !imageUrl.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(), // ← this is what makes the image show up
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
          placeholder="Image URL * (https://...)"
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

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white">
            Submit
          </button>
        </div>

        <p className="text-xs text-neutral-400 mt-3">
          Tip: paste a direct image link (ends in .jpg/.png) or an Unsplash image URL.
        </p>
      </div>
    </div>
  );
}
