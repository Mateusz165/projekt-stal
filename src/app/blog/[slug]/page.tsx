export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import prisma from "@/lib/prisma";
import CTASection from "@/components/home/CTASection";

type Props = { params: Promise<{ slug: string }> };

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });
  if (!post) return { title: "Artykuł nie znaleziony" };
  return {
    title: `${post.title} – Blog Projekt-Stal`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.image ? [post.image] : [] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } }).catch(() => null);
  if (!post) notFound();

  const related = await prisma.blogPost.findMany({
    where: { published: true, category: post.category, slug: { not: slug } },
    take: 3,
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-0 bg-zinc-950 overflow-hidden">
        {post.image ? (
          <div className="relative h-80 sm:h-96 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${post.image}')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
          </div>
        ) : (
          <div className="h-16" />
        )}
      </section>

      {/* Article */}
      <article className="bg-zinc-950 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-8 mt-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Wróć do bloga
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Tag size={10} /> {post.category}
            </span>
            <span className="text-zinc-500 text-xs flex items-center gap-1">
              <Calendar size={11} />
              {new Date(post.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="text-zinc-500 text-xs flex items-center gap-1">
              <Clock size={11} />
              {estimateReadTime(post.content)} czytania
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {post.title}
          </h1>

          <p className="text-zinc-300 text-xl leading-relaxed mb-10 border-l-4 border-amber-500/60 pl-5 italic">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="space-y-5">
            {paragraphs.map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-black text-white mt-10 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                    {para.slice(3)}
                  </h2>
                );
              }
              if (para.startsWith("# ")) {
                return (
                  <h2 key={i} className="text-3xl font-black text-white mt-10 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                    {para.slice(2)}
                  </h2>
                );
              }
              if (para.startsWith("- ") || para.startsWith("* ")) {
                const items = para.split("\n").filter((l) => l.startsWith("- ") || l.startsWith("* "));
                return (
                  <ul key={i} className="space-y-2 pl-4">
                    {items.map((item, j) => (
                      <li key={j} className="text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-amber-400 mt-1.5 shrink-0">▸</span>
                        {item.slice(2)}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (para.match(/^\d+\./)) {
                const items = para.split("\n").filter(Boolean);
                return (
                  <ol key={i} className="space-y-2 pl-4 list-decimal list-inside">
                    {items.map((item, j) => (
                      <li key={j} className="text-zinc-300 leading-relaxed">{item.replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="text-zinc-300 leading-relaxed text-base">{para}</p>;
            })}
          </div>

          {/* CTA box */}
          <div className="mt-16 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
            <h3 className="text-white font-black text-xl mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
              Masz pytania? Skontaktuj się z nami
            </h3>
            <p className="text-zinc-400 mb-6 text-sm">Bezpłatna wycena i doradztwo techniczne.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all">
                Napisz do nas
              </Link>
              <Link href="/kalkulator" className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-3 rounded-xl transition-all text-sm">
                Kalkulator wyceny
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-24 bg-zinc-950 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <h2 className="text-2xl font-black text-white mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
              Podobne artykuły
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all hover-lift"
                >
                  {p.image && (
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${p.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">{p.category}</span>
                    <h3 className="text-white font-bold text-sm mt-1 group-hover:text-amber-400 transition-colors leading-snug">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
