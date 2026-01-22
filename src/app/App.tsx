import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { ProjectCard, Project } from "@/app/components/ProjectCard";
import { ProjectDetail } from "@/app/components/ProjectDetail";
import { SubmitProjectDialog } from "@/app/components/SubmitProjectDialog";

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Modern Villa",
    description: "A contemporary residential project that seamlessly blends indoor and outdoor spaces. The design emphasizes clean lines, open floor plans, and an abundance of natural light. Large glass panels create a transparent boundary between the interior and the surrounding landscape.",
    imageUrl: "https://images.unsplash.com/photo-1519662978799-2f05096d3636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY4ODc3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    architect: "Studio Architects",
    location: "Los Angeles, USA",
    category: "architecture",
    projectUrl: "https://example.com/modern-villa",
  },
  {
    id: "2",
    title: "Urban Garden",
    description: "An innovative landscape design that transforms an urban rooftop into a verdant oasis. The project incorporates sustainable water management, native plantings, and creates peaceful spaces for reflection and community gathering in the heart of the city.",
    imageUrl: "https://images.unsplash.com/photo-1642833465562-f81525657851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY4OTA2MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    architect: "Green Space Design",
    location: "Copenhagen, Denmark",
    category: "landscape",
    projectUrl: "https://example.com/urban-garden",
  },
  {
    id: "3",
    title: "Minimalist Residence",
    description: "A study in simplicity and restraint, this residence showcases the beauty of minimal design. Every element serves a purpose, creating spaces that are both functional and serene. The neutral palette and careful material selection emphasize form and light.",
    imageUrl: "https://images.unsplash.com/photo-1602128110234-2d11c0aaadfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2ODkzNTIxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    architect: "Minimal Studio",
    location: "Tokyo, Japan",
    category: "architecture",
    projectUrl: "https://example.com/minimalist-residence",
  },
  {
    id: "4",
    title: "Contemporary Tower",
    description: "A striking addition to the urban skyline, this tower redefines modern office space. The facade features a dynamic interplay of glass and metal, while interior spaces prioritize flexibility, sustainability, and occupant wellbeing.",
    imageUrl: "https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBidWlsZGluZ3xlbnwxfHx8fDE3Njg5NDYyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    architect: "Tower Architects",
    location: "Singapore",
    category: "architecture",
    projectUrl: "https://example.com/contemporary-tower",
  },
  {
    id: "5",
    title: "Urban Plaza",
    description: "A vibrant public space that serves as a gathering point for the community. The design balances hardscape and softscape elements, creating flexible zones for events, leisure, and circulation while incorporating art installations and sustainable features.",
    imageUrl: "https://images.unsplash.com/photo-1548566862-2c9b1fed780a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njg4OTY4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    architect: "Urban Design Collective",
    location: "Barcelona, Spain",
    category: "landscape",
    projectUrl: "https://example.com/urban-plaza",
  },
  {
    id: "6",
    title: "Botanical Garden",
    description: "A thoughtfully curated collection of native and exotic plantings organized to create distinct spatial experiences. The design weaves together pathways, water features, and seating areas, inviting visitors to explore and connect with nature.",
    imageUrl: "https://images.unsplash.com/photo-1681465766418-6474cfdcbb3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzY4OTc0NTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    architect: "Landscape Atelier",
    location: "Melbourne, Australia",
    category: "landscape",
    projectUrl: "https://example.com/botanical-garden",
  },
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [filterCategory, setFilterCategory] = useState<"all" | "architecture" | "landscape">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    // Category filter
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.architect?.toLowerCase().includes(searchLower) ||
      project.location?.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  const handleSubmitProject = (newProject: Omit<Project, "id">) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
    };
    setProjects([project, ...projects]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl tracking-[0.2em] uppercase">Curated</h1>
              <p className="text-xs text-neutral-500 tracking-wider mt-1">
                Architecture & Landscape
              </p>
            </div>

            <div className="flex items-center gap-4">
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
        <div className="space-y-20">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 tracking-wide uppercase">No projects found</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-20">
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <p className="text-xs text-neutral-400 tracking-wider">
              © 2026 Curated. A platform for showcasing exceptional architecture.
            </p>
            <div className="flex gap-6 text-xs text-neutral-400 tracking-wider uppercase">
              <button className="hover:text-neutral-900 transition-colors">About</button>
              <button className="hover:text-neutral-900 transition-colors">Guidelines</button>
              <button className="hover:text-neutral-900 transition-colors">Contact</button>
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