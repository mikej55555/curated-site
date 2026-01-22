import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Project } from "@/app/components/ProjectCard";

interface SubmitProjectDialogProps {
  onClose: () => void;
  onSubmit: (project: Omit<Project, "id">) => void;
}

export function SubmitProjectDialog({ onClose, onSubmit }: SubmitProjectDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    projectUrl: "",
    architect: "",
    location: "",
    category: "architecture" as "architecture" | "landscape",
    sourceType: "image" as "image" | "instagram" | "linkedin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      if (formData.sourceType === "image" && !formData.imageUrl) {
        return;
      }
      if (formData.sourceType === "instagram" && !formData.instagramUrl) {
        return;
      }
      if (formData.sourceType === "linkedin" && !formData.linkedinUrl) {
        return;
      }
      
      const project = {
        title: formData.title,
        description: formData.description,
        architect: formData.architect,
        location: formData.location,
        category: formData.category,
        projectUrl: formData.projectUrl,
        ...(formData.sourceType === "image" 
          ? { imageUrl: formData.imageUrl }
          : formData.sourceType === "instagram"
          ? { instagramUrl: formData.instagramUrl }
          : { linkedinUrl: formData.linkedinUrl }
        ),
      };
      
      onSubmit(project);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl tracking-wide uppercase">Submit Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm tracking-wide uppercase text-neutral-600">
              Project Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="architect" className="block text-sm tracking-wide uppercase text-neutral-600">
              Architect / Designer
            </label>
            <input
              id="architect"
              type="text"
              value={formData.architect}
              onChange={(e) => setFormData({ ...formData, architect: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm tracking-wide uppercase text-neutral-600">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="projectUrl" className="block text-sm tracking-wide uppercase text-neutral-600">
              Project Link
            </label>
            <input
              id="projectUrl"
              type="url"
              value={formData.projectUrl}
              onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
            />
            <p className="text-xs text-neutral-400">
              Optional link to project details or website
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm tracking-wide uppercase text-neutral-600">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as "architecture" | "landscape" })}
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
            >
              <option value="architecture">Architecture</option>
              <option value="landscape">Landscape Architecture</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm tracking-wide uppercase text-neutral-600">
              Description *
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrl" className="block text-sm tracking-wide uppercase text-neutral-600">
              Image Source *
            </label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sourceType"
                  value="image"
                  checked={formData.sourceType === "image"}
                  onChange={(e) => setFormData({ ...formData, sourceType: e.target.value as "image" | "instagram" | "linkedin" })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Image URL</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sourceType"
                  value="instagram"
                  checked={formData.sourceType === "instagram"}
                  onChange={(e) => setFormData({ ...formData, sourceType: e.target.value as "image" | "instagram" | "linkedin" })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Instagram Post</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sourceType"
                  value="linkedin"
                  checked={formData.sourceType === "linkedin"}
                  onChange={(e) => setFormData({ ...formData, sourceType: e.target.value as "image" | "instagram" | "linkedin" })}
                  className="w-4 h-4"
                />
                <span className="text-sm">LinkedIn Post</span>
              </label>
            </div>

            {formData.sourceType === "image" ? (
              <>
                <div className="flex gap-2">
                  <input
                    id="imageUrl"
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 border border-neutral-300 hover:bg-neutral-50 transition-colors"
                    aria-label="Upload image"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-neutral-400">
                  Enter the URL of your project image
                </p>
              </>
            ) : formData.sourceType === "instagram" ? (
              <>
                <input
                  id="instagramUrl"
                  type="url"
                  required
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="https://www.instagram.com/p/..."
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
                />
                <p className="text-xs text-neutral-400">
                  Paste the Instagram post link (e.g., https://www.instagram.com/p/ABC123/)
                </p>
              </>
            ) : (
              <>
                <input
                  id="linkedinUrl"
                  type="url"
                  required
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://www.linkedin.com/posts/..."
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
                />
                <p className="text-xs text-neutral-400">
                  Paste the LinkedIn post link or embed URL
                </p>
              </>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-neutral-300 hover:bg-neutral-50 transition-colors tracking-wide uppercase text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors tracking-wide uppercase text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}