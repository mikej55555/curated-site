import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  projectUrl?: string;
  architect?: string;
  location?: string;
  category: "architecture" | "landscape";
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
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
    <div 
      className="group cursor-pointer max-w-3xl mx-auto"
      onClick={onClick}
    >
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
              maxWidth: '540px',
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
            height="600"
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
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-neutral-100">
          <ImageWithFallback
            src={project.imageUrl || ''}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="mt-3 px-4 text-center">
        {project.projectUrl ? (
          <a 
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors inline-block"
          >
            {project.title}
            {project.architect && ` by ${project.architect}`}
            {project.location && ` — ${project.location}`}
          </a>
        ) : (
          <p className="text-sm text-neutral-600">
            {project.title}
            {project.architect && ` by ${project.architect}`}
            {project.location && ` — ${project.location}`}
          </p>
        )}
      </div>
    </div>
  );
}

// Extend window interface for Instagram embed
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}