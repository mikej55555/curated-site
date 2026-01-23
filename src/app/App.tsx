"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { ProjectCard, Project } from "@/app/components/ProjectCard";
import { ProjectDetail } from "@/app/components/ProjectDetail";
import { SubmitProjectDialog } from "@/app/components/SubmitProjectDialog";

const API_URL = "/.netlify/functions/projects";

// Optional fallback projects if API is down.
// You can leave this empty if you want.
const initialProjects: Project[] = [
  {
    id: "1",
    title: "Modern Villa",
    description:
      "A contemporary residential project that seamlessly blends indoor and outdoor spaces. The design emphasizes clean lines, open floor plans, and an abundance of natural light.",
    imageUrl:
      "https://images.unsplash.com/photo-1519662978799-2f05096d3636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    architect: "Studio Architects",
    location: "Los Angeles, USA",
    category: "architecture",
    websiteUrl: "https://example.com/modern-villa",
    instagramUrl: "https://www.instagram.com/",
  },
];

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(API_URL, { method: "GET" });

  // If the function isn't deployed or errors, you will see a non-200 here
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to load projects (${res.status}). ${text || "Check function deployment."}`
    );
  }

  const data = await res.json().catch(() => ({}));
  const projects = Array.isArray((data as any).projects) ? (data as any).projects : [];

  // If API returns empty for any reason, you can optionally fall back
  if (!projects.length) return [];

  return projects.map((p: any) => ({
    id: String(p.id || ""),
    title: String(p.title || ""),
    description: String(p.description || ""),
    category: p.category === "landscape" ? "landscape" : "architecture",
    architect: p.architect ? String(p.architect) : undefined,
    location: p.location ? String(p.location) : undefined,
    imageUrl: p.imageUrl ? String(p.imageUrl) : undefined,
    instagramUrl: p.instagramUrl ? String(p.instagramUrl) : undefined,
    websiteUrl: p.websiteUrl ? String(p.websiteUrl) : undefined,
  }));
}

async function submitProject(newProject: Omit<Project, "id">): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // same-origin -> OK
    body: JSON.stringify(newProject),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || (data as any).ok === false) {
    throw new Error(
      (data as any).error || `Submit failed (${res.status}). Check function logs/env var.`
    );
  }
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [filterCategory, setFilterCategory] = useState<
    "all" | "architecture" | "landscape"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load projects from Netlify Function (which proxies Google Sheets)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const loaded = await fetchProjects();
        if (!cancelled) {
          // If sheet has content, use it; otherwise keep fallback initialProjects
          setProjects(loaded.length ? loaded : initialProjects);
        }
      } catch (e: any) {
        if (!cancelled) setLoadError(e?.message || "Failed to load projects");
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        filterCategory === "all" || project.category === filterCategory;

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.architect?.toLowerCase().includes(searchLower) ||
        project.location?.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [projects, filterCategory, searchQuery]);

  const handleSubmitProject = async (newProject: Omit<Project, "id">) => {
    // Optimistic UI: show immediately
    const optimistic: Project = { ...newProject, id: Date.now().toString() };
    setProjects((prev) => [optimistic, ...prev]);

    try {
      await submitProject(newProject);
      // Reload so it matches what everyone sees
      const loaded = await fetchProjects();
      setProjects(loaded.length ? loaded : initialProjects);
    } catch (e: any) {
      // Rollback optimistic item
      setProjects((prev) => prev.filter((p) => p.id !== optimistic.id));
      alert(e?.message || "Submit failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl tracking-[0.2em] uppercase">Curated</h1>
              <p className="text-xs text-neutral-500 tracking-wider mt-1">
                Architecture &amp; Landscape
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-end">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors w-64 text-sm"
                />
              </div>

              {/* Filter */}
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={`px-4 py-2 tracking-wide uppercase transition-colors ${
                    filterCategory === "all"
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterCategory("architecture")}
                  className={`px-4 py-2 tracking-wide uppercase transition-colors ${
                    filterCategory === "architecture"
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setFilterCategory("landscape")}
                  className={`px-4 py-2 tracking-wide uppercase transition-colors ${
                    filterCategory === "landscape"
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  Landscape
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => setShowSubmitDialog(true)}
                className="flex items-center gap-2 px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors tracking-wide uppercase text-sm"
              >
                <Plus className="w-5 h-5" />
                Submit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-[1600px] mx-auto px-6">
          {loading && (
            <div className="py-6">
              <p className="text-neutral-400 tracking-wide uppercase text-xs">
                Loading projects…
              </p>
            </div>
          )}

          {loadError && (
            <div className="py-6">
              <p className="text-red-600 text-sm">Could not load projects:</p>
              <p className="text-red-600 text-sm">{loadError}</p>

              <div className="mt-3 text-xs text-neutral-600 space-y-1">
                <div>
                  Check your Netlify Function URL works:
                  <code className="ml-2 px-1 border">
                    /.netlify/functions/projects
                  </code>
                </div>
                <div>
                  In Netlify env vars, you must set:
                  <code className="ml-2 px-1 border">PROJECTS_API_URL</code>{" "}
                  (Apps Script URL ending in <code>/exec</code>)
                </div>
                <div>
                  Then redeploy: <b>Trigger deploy → Clear cache and deploy</b>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-20">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-400 tracking-wide uppercase">
                No projects found
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-20">
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="flex justify-between items-center gap-6 flex-wrap">
            <p className="text-xs text-neutral-400 tracking-wider">
              © 2026 Curated. A platform for showcasing exceptional architecture.
            </p>
            <div className="flex gap-6 text-xs text-neutral-400 tracking-wider uppercase">
              <button className="hover:text-neutral-900 transition-colors">
                About
              </button>
              <button className="hover:text-neutral-900 transition-colors">
                Guidelines
              </button>
              <button className="hover:text-neutral-900 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {showSubmitDialog && (
        <SubmitProjectDialog
          onClose={() => setShowSubmitDialog(false)}
          onSubmit={handleSubmitProject}
        />
      )}
    </div>
  );
}
