export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  architect?: string;
  location?: string;
  category: "architecture" | "landscape";
  instagramUrl?: string;            // ← allow instagram link
};

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
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
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
              {project.category}
            </p>

            <h2 className="text-3xl mt-3 tracking-tight">
              {project.title}
            </h2>

            <div className="mt-4 text-sm text-neutral-600 space-y-1">
              {project.architect && <div>{project.architect}</div>}
              {project.location && <div>{project.location}</div>}
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
