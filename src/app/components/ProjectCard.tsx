"use client";

import { InstagramEmbed } from "./InstagramEmbed";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  architect?: string;
  location?: string;
  category: "architecture" | "landscape";
};

function safeUrl(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).toString();
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
  const instagramUrl = safeUrl(project.instagramUrl);
  const websiteUrl = safeUrl(project.websiteUrl);

  return (
    <article
      className="group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image OR Instagram Embed OR Placeholder */}
        <div className="overflow-hidden bg-neutral-100">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-[520px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          ) : instagramUrl ? (
            <div className="p-3" onClick={(e) => e.stopPropagation()}>
              <InstagramEmbed url={instagramUrl} />
            </div>
          ) : (
            <div className="w-full h-[520px] flex items-center justify-center">
              <p className="text-xs tracking-[0.25em] uppercase text-neutral-400">
                No image / embed
              </p>
            </div>
          )}
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

            {/* Minimal links (text only) */}
            <div className="flex flex-col items-end gap-2">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs uppercase tracking-wider text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  Instagram →
                </a>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs uppercase tracking-wider text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  Website →
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
