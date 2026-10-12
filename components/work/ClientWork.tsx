import type { Project } from "@/lib/types";
import { ShowAllGrid } from "@/components/ui/ShowAllGrid";
import { ProjectCard } from "./ProjectCard";

/**
 * The client work grid: the first nine projects (three rows on desktop),
 * with the rest behind "Show all".
 */
export function ClientWork({ projects }: { projects: Project[] }) {
  return (
    <ShowAllGrid
      initialCount={9}
      items={projects.map((project) => ({
        key: project.slug,
        node: <ProjectCard project={project} />,
      }))}
    />
  );
}
