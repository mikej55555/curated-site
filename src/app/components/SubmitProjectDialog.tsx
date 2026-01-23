import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { Project } from "./ProjectCard";

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
  onSubmit: (project: Omit<Project, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [architect, setArchitect] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<Project["category"]>("architecture");
  const [projectUrl, setProjectUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const errors = useMemo(() => {
    const e: string[] = [];
    if (!title.trim()) e.push("Title is required.");
    if (!description.trim()) e.push("Description is required.");
    if (!imageUrl.trim()) e.push("Image URL is required.");
    if (imageUrl.trim() && !isValidUrl(imageUrl.trim()))
      e.push("Image URL must be a valid URL.");
    if (projectUrl.trim() && !isValidUrl(projectUrl.trim()))
      e.push("Project URL must be a valid URL.");
    if (instagramUrl.trim() && !isValidUrl(instagramUrl.trim()))
      e.push("Instagram URL must be a valid URL.");
    return e;
  }, [title, description, imageUrl, projectUrl, instagramUrl]);

  const handleSubmit = () => {
    if (errors.length) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      architect: architect.trim() || undefined,
      location: location.trim() || undefined,
      category,
      projectUrl: projectUrl.trim() || undefined,
      instagramUrl: instagramUrl.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl border border-neutral-200">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h3 className="text-lg tracking-wide uppercase">Submit Project</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-50 border border-neutral-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm">
              <div className="text-neutral-600 mb-1">Title *</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              />
            </label>

            <label className="text-sm">
              <div className="text-neutral-600 mb-1">Category *</div>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Project["category"])
                }
                className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              >
                <option value="architecture">Architecture</option>
                <option value="landscape">Landscape</option>
              </select>
            </label>
          </div>

          <label className="text-sm block">
            <div className="text-neutral-600 mb-1">Description *</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
            />
          </label>

          <label className="text-sm block">
            <div className="text-neutral-600 mb-1">Image URL *</div>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm">
              <div className="text-neutral-600 mb-1">Architect</div>
              <input
                value={architect}
                onChange={(e) => setArchitect(e.target.value)}
                className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              />
            </label>

            <label className="text-sm">
              <div className="text-neutral-600 mb-1">Location</div>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm">
              <div className="text-neutral-600 mb-1">Project URL</div>
              <input
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              />
            </label>

            <label className="text-sm">
              <div className="text-neutral-600 mb-1">Instagram URL</div>
              <input
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              />
            </label>
          </div>

          {errors.length > 0 && (
            <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 hover:bg-neutral-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
