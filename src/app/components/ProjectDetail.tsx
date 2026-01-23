import { X, ExternalLink, Instagram } from "lucide-react";
import type { Project } from "./ProjectCard";

function safeUrl(url?: string) {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.toString();
  } catch {
    return undefined;
  }
}

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const projectUrl = safeUrl(project.projectUrl);
  const instagramUrl = safeUrl(project.instagramUrl);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-auto border border-neutral-200">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
              {project.category}
            </p>
            <h3 className="text-2xl mt-2">{project.title}</h3>
            <div className="mt-2 text-sm text-neutral-600">
              {[project.architect, project.location].filter(Boolean).join(" • ")}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-50 border border-neutral-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-neutral-100 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-[520px] object-cover"
            />
          </div>

          <div>
            <p className="text-neutral-700 leading-relaxed">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit website
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 hover:bg-neutral-50 transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  View Instagram
                </a>
              )}
            </div>

            <div className="mt-10 text-xs text-neutral-400 tracking-wider">
              Tip: keep Instagram URLs as full links (e.g. https://instagram.com/yourhandle)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
