import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "Realizacje" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Realizacje</h1>
          <p className="text-zinc-500 text-sm mt-1">{projects.length} projektów w galerii</p>
        </div>
        <Link
          href="/admin/realizacje/nowa"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all"
        >
          <Plus size={16} /> Dodaj realizację
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => {
          const images = JSON.parse(project.images) as string[];
          return (
            <div key={project.id} className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-200">
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                {images[0] ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${images[0]}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-600 text-xs">Brak zdjęcia</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                {project.featured && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-zinc-950 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={10} className="fill-zinc-950" /> Wyróżniona
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">{project.category}</span>
                <h3 className="text-white font-semibold text-sm mt-0.5 mb-1">{project.title}</h3>
                <div className="text-zinc-500 text-xs">📍 {project.location} · {project.year}</div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <Link
                  href={`/admin/realizacje/${project.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium py-2 rounded-lg transition-colors"
                >
                  <Pencil size={12} /> Edytuj
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeleteProjectButton({ id, title }: { id: number; title: string }) {
  return (
    <form action={`/api/admin/projects/${id}`} method="POST">
      <input type="hidden" name="_method" value="DELETE" />
      <button
        type="submit"
        onClick={(e) => { if (!confirm(`Usuń "${title}"?`)) e.preventDefault(); }}
        className="p-2 bg-zinc-800 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-zinc-500 hover:text-red-400 rounded-lg transition-all duration-150"
      >
        <Trash2 size={13} />
      </button>
    </form>
  );
}
