import { fetchProjects } from "@/lib/fetchProjects";
import Explorer from "@/components/Explorer";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <main className="page">
      <Explorer projects={projects} />
    </main>
  );
}
