"use client";

import { useMemo, useState } from "react";
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

  // Optional fields
  const [imageUrl, setImageUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [architect, setArchitect] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] =
    useState<Project["category"]>("architecture");

  const errors = useMemo(() => {
    const e: string[] = [];

    if (!title.trim()) e.push("Title is required.");
    if (!description.trim()) e.push("Description is required.");

    if (imageUrl.trim() && !isValidUrl(imageUrl.trim()))
      e.push("Image URL must be a valid URL.");

    if (instagramUrl.trim() && !isValidUrl(instagramUrl.trim()))
      e.push("Instagram URL must be a valid URL.");

    if (websiteUrl.trim() && !isValidUrl(websiteUrl.trim()))
      e.push("Website URL must be a valid URL.");

    return e;
  }, [title, description, imageUrl, instagramUrl, websiteUrl]);

  const handleSubmit = () => {
    if (errors.length) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,

      // Optional URLs
      imageUrl: imageUrl.trim() || undefined,
      instagramUrl: instagramUrl.trim() || undefined,
      websiteUrl: websiteUrl.trim() || undefined,

      // Optional meta
      architect: architect.trim() || undefined,
      location: location.trim() || undefined,
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

        <select
          className="w-full border p-2 mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value as Project["category"])}
        >
          <option value="architecture">Architecture</option>
          <option value="landscape">Landscape</option>
        </select>

        <input
          placeholder="Image URL (optional - https://...)"
          className="w-full border p-2 mb-3"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          placeholder="Instagram post/reel URL (optional - https://www.instagram.com/p/.../)"
          className="w-full border p-2 mb-3"
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
        />

        <input
          placeholder="Website URL (optional - https://...)"
          className="w-full border p-2 mb-3"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        <input
          placeholder="Architect (optional)"
          className="w-full border p-2 mb-3"
          value={architect}
          onChange={(e) => setArchitect(e.target.value)}
        />

        <input
          placeholder="Location (optional)"
          className="w-full border p-2 mb-4"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

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
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white"
          >
            Submit
          </button>
