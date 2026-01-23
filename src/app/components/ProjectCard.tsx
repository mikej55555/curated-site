import { ExternalLink, Instagram } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  architect?: string;
  location?: string;
  category: "architecture" | "landscape";
  projectUrl?: string;
  instagramUrl?: string;
};

function safeUrl(url?: string) {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.toString();
  } catch {
    return undefined;
  }
}

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const projectUrl = safeUrl(project.projectUrl);
  const instagramUrl = safeUrl(project.instagramUrl);

  return (
    <article
      className="group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="overflow-hidden bg-neutral-100">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-[520px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="pt-2">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                {project.category}
              </p>
              <h2 className="text-3xl mt-3 tracking-tight">{project.title}</h2>

              <div className="mt-4 text-sm text-neutral-600 space-y-1">
                {project.architect && <div>{project.architect}</div>}
                {project.location && <div>{project.location}</div>}
              </div>
            </div>

            {/* Links (don’t trigger card click) */}
            <div className="flex items-center gap-2">
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-neutral-300 hover:bg-neutral-50 transition-colors text-xs uppercase tracking-wider"
                  aria-label="Open project website"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-neutral-300 hover:bg-neutral-50 transition-colors text-xs uppercase tracking-wider"
                  aria-label="Open Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              )}
            </div>
          </div>

          <p className="mt-8 text-neutral-700 leading-relaxed line-clamp-6">
            {project.description}
          </p>

          <div className="mt-10">
            <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 group-hover:text-neutral-900 transition-colors">
              View details →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
