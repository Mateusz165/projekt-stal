import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "Blog" };

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Blog</h1>
          <p className="text-zinc-500 text-sm mt-1">{posts.length} artykułów · {posts.filter((p) => p.published).length} opublikowanych</p>
        </div>
        <Link href="/admin/blog/nowy" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all">
          <Plus size={16} /> Nowy artykuł
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Artykuł</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Kategoria</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {posts.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-zinc-600">Brak artykułów</td></tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {post.image && (
                      <div className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${post.image}')` }} />
                    )}
                    <div>
                      <div className="text-white font-medium text-sm">{post.title}</div>
                      <div className="text-zinc-500 text-xs mt-0.5">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-zinc-400 text-sm">{post.category}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-green-500/10 text-green-400" : "bg-zinc-700 text-zinc-400"}`}>
                    {post.published ? "Opublikowany" : "Szkic"}
                  </span>
                </td>
                <td className="px-5 py-4 text-zinc-500 text-xs whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/blog/${post.slug}`} target="_blank"
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors" title="Podgląd">
                      <Eye size={13} />
                    </Link>
                    <Link href={`/admin/blog/${post.id}`}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors" title="Edytuj">
                      <Pencil size={13} />
                    </Link>
                    <form action={`/api/admin/posts/${post.id}/toggle`} method="POST">
                      <button type="submit" className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-amber-400 transition-colors"
                        title={post.published ? "Ukryj" : "Opublikuj"}>
                        {post.published ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
