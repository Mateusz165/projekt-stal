"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, ChevronDown } from "lucide-react";

interface AdminHeaderProps {
  user: { name: string; email: string; role: string };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
      <div className="text-zinc-400 text-sm">
        Panel administracyjny <span className="text-zinc-600">·</span>{" "}
        <span className="text-white font-medium">Projekt-Stal</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-3 py-1.5 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <User size={12} className="text-amber-400" />
          </div>
          <span className="text-white text-sm font-medium">{user.name}</span>
          <ChevronDown size={13} className="text-zinc-400" />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-zinc-700">
              <p className="text-white text-sm font-medium">{user.name}</p>
              <p className="text-zinc-400 text-xs">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-red-400 transition-colors"
            >
              <LogOut size={14} />
              Wyloguj się
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
