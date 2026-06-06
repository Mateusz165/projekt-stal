import type { Metadata } from "next";
import Link from "next/link";
import { Images, FileText, ShoppingBag, ClipboardList, MessageSquare, Star, Package, ArrowUpRight, TrendingUp } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  const [projects, posts, products, orders, quotes, messages, testimonials] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.quoteRequest.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.testimonial.count(),
  ]);

  const recentQuotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return { projects, posts, products, orders, quotes, messages, testimonials, recentQuotes, recentMessages };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Realizacje", value: stats.projects, icon: Images, href: "/admin/realizacje", color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Artykuły blog", value: stats.posts, icon: FileText, href: "/admin/blog", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Produkty", value: stats.products, icon: Package, href: "/admin/sklep", color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Zamówienia", value: stats.orders, icon: ShoppingBag, href: "/admin/zamowienia", color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Zapytania o wycenę", value: stats.quotes, icon: ClipboardList, href: "/admin/wyceny", color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Nowe wiadomości", value: stats.messages, icon: MessageSquare, href: "/admin/wiadomosci", color: "text-red-400", bg: "bg-red-500/10", highlight: stats.messages > 0 },
    { label: "Opinie", value: stats.testimonials, icon: Star, href: "/admin/opinie", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>Dashboard</h1>
        <p className="text-zinc-500 text-sm">Przegląd aktywności i statystyk</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group bg-zinc-900 border rounded-2xl p-5 hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5 ${card.highlight ? "border-red-500/40" : "border-zinc-800"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon size={18} className={card.color} />
                </div>
                <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                {card.value}
                {card.highlight && <span className="ml-2 text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">nowe</span>}
              </div>
              <div className="text-zinc-500 text-xs">{card.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent quotes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold">Ostatnie zapytania o wycenę</h2>
            <Link href="/admin/wyceny" className="text-amber-400 text-xs hover:text-amber-300 transition-colors">
              Zobacz wszystkie →
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentQuotes.length === 0 && (
              <p className="text-zinc-600 text-sm text-center py-4">Brak zapytań</p>
            )}
            {stats.recentQuotes.map((q) => (
              <div key={q.id} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ClipboardList size={13} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate">{q.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${q.status === "new" ? "bg-amber-500/10 text-amber-400" : "bg-zinc-700 text-zinc-400"}`}>
                      {q.status === "new" ? "nowe" : q.status}
                    </span>
                  </div>
                  <div className="text-zinc-500 text-xs mt-0.5">{q.type} · {q.location}</div>
                </div>
                <div className="text-zinc-600 text-xs shrink-0">
                  {new Date(q.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold">Ostatnie wiadomości</h2>
            <Link href="/admin/wiadomosci" className="text-amber-400 text-xs hover:text-amber-300 transition-colors">
              Zobacz wszystkie →
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentMessages.length === 0 && (
              <p className="text-zinc-600 text-sm text-center py-4">Brak wiadomości</p>
            )}
            {stats.recentMessages.map((m) => (
              <div key={m.id} className={`flex items-start gap-3 p-3 rounded-xl ${!m.read ? "bg-blue-500/5 border border-blue-500/20" : "bg-zinc-800/50"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${!m.read ? "bg-blue-500/10" : "bg-zinc-700/50"}`}>
                  <MessageSquare size={13} className={!m.read ? "text-blue-400" : "text-zinc-500"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate">{m.name}</span>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />}
                  </div>
                  <div className="text-zinc-500 text-xs mt-0.5 truncate">{m.subject}</div>
                </div>
                <div className="text-zinc-600 text-xs shrink-0">
                  {new Date(m.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
