"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Images, FileText, ShoppingBag,
  MessageSquare, Star, ClipboardList, Package,
  ChevronRight, UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Realizacje", href: "/admin/realizacje", icon: Images },
  { label: "Sklep — produkty", href: "/admin/sklep", icon: Package },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Zamówienia", href: "/admin/zamowienia", icon: ShoppingBag },
  { label: "Zapytania o wycenę", href: "/admin/wyceny", icon: ClipboardList },
  { label: "Wiadomości", href: "/admin/wiadomosci", icon: MessageSquare },
  { label: "Opinie klientów", href: "/admin/opinie", icon: Star },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 border-b border-zinc-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-amber-500 rotate-45 rounded-sm" />
            <span className="absolute inset-0 flex items-center justify-center text-zinc-950 font-black text-xs z-10">PS</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">PROJEKT-STAL</div>
            <div className="text-amber-400 text-xs">Panel admina</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              )}
            >
              <Icon size={17} className="shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight size={13} className="text-amber-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        <Link
          href="/admin/profil"
          className={cn(
            "flex items-center gap-2 text-xs transition-colors px-2 py-1.5 rounded-lg",
            pathname === "/admin/profil"
              ? "text-amber-400 bg-amber-500/10"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
          )}
        >
          <UserCog size={14} /> Zmień hasło
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs transition-colors px-2 py-1.5"
        >
          <span>→</span> Podgląd strony
        </Link>
      </div>
    </aside>
  );
}
