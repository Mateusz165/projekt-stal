export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog – Schody stalowe, balustrady, inspiracje",
  description: "Blog Projekt-Stal – porady, inspiracje i aktualności ze świata nowoczesnych konstrukcji stalowych. Schody loftowe, balustrady, ogrodzenia.",
};

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="h-px w-8 bg-amber-400/60" />
              Blog
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-white mb-5 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Inspiracje
              <br />
              <span className="text-gradient-gold">i porady</span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-xl leading-relaxed">
              Artykuły o nowoczesnych konstrukcjach stalowych, trendach w projektowaniu i praktyczne poradniki.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 && (
            <div className="text-center py-20 text-zinc-500">Brak opublikowanych artykułów.</div>
          )}

          {/* Featured post */}
          {featured && (
            <AnimatedSection className="mb-10">
              <Link
                href={`/blog/${featured.slug}`}
                className="group flex flex-col lg:flex-row bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-300 hover-lift"
              >
                <div className="relative h-72 lg:h-auto lg:w-1/2 overflow-hidden">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800" />
                  )}
                  <div className="absolute top-4 left-4 bg-amber-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full">
                    Polecany artykuł
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center flex-1">
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    {featured.category}
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-black text-white mb-4 group-hover:text-amber-400 transition-colors leading-tight"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-zinc-400 mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-zinc-500 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(featured.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {estimateReadTime(featured.content)} czytania
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-300 hover-lift"
                  >
                    <div className="relative h-52 overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-zinc-800" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                          {post.category}
                        </span>
                        <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-amber-400 transition-colors" />
                      </div>
                      <h3
                        className="text-white font-bold text-base mb-2 group-hover:text-amber-400 transition-colors leading-snug"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-zinc-500 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(post.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {estimateReadTime(post.content)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
