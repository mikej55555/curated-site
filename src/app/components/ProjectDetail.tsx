import { X } from "lucide-react";
import { useEffect } from "react";
import { Project } from "@/app/components/ProjectCard";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    // Load Instagram embed script if there's an Instagram URL
    if (project.instagramUrl && !window.instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (project.instagramUrl && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [project.instagramUrl]);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={onClose}
          className="fixed top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mt-16 space-y-8">
          {project.instagramUrl ? (
            <div className="flex justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={project.instagramUrl}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: '0',
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '658px',
                  minWidth: '326px',
                  padding: '0',
                  width: 'calc(100% - 2px)',
                }}
              />
            </div>
          ) : project.linkedinUrl ? (
            <div className="flex justify-center">
              <iframe
                src={`https://www.linkedin.com/embed/feed/update/${project.linkedinUrl.includes('urn:li:') ? project.linkedinUrl : 'urn:li:share:' + project.linkedinUrl.split('/').pop()}`}
                height="700"
                width="504"
                frameBorder="0"
                allowFullScreen
                title="Embedded LinkedIn post"
                style={{
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
              />
            </div>
          ) : (
            <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
              <ImageWithFallback
                src={project.imageUrl || ''}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="max-w-2xl space-y-4">
            <div>
              <h1 className="text-3xl tracking-wide uppercase mb-2">{project.title}</h1>
              {project.architect && (
                <p className="text-lg text-neutral-600">{project.architect}</p>
              )}
              {project.location && (
                <p className="text-sm text-neutral-400 mt-1">{project.location}</p>
              )}
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <p className="text-neutral-700 leading-relaxed">{project.description}</p>
            </div>

            <div className="text-xs text-neutral-400 uppercase tracking-wider">
              {project.category}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}