import type { Metadata } from "next";
import { Phone, Mail, CheckCheck } from "lucide-react";
import prisma from "@/lib/prisma";
import { AdminTable, StatusBadge } from "@/components/admin/AdminTable";

export const metadata: Metadata = { title: "Wiadomości" };

type MsgRow = Record<string, unknown> & { id: number; name: string; email: string; phone?: string; subject: string; message: string; read: boolean; createdAt: Date };

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  }) as MsgRow[];

  const unread = messages.filter((m) => !m.read).length;

  const columns = [
    {
      key: "read",
      label: "",
      className: "w-8",
      render: (row: MsgRow) => (
        <div className={`w-2 h-2 rounded-full mx-auto ${!row.read ? "bg-blue-400" : "bg-transparent"}`} />
      ),
    },
    {
      key: "name",
      label: "Nadawca",
      render: (row: MsgRow) => (
        <div>
          <div className={`font-medium ${!row.read ? "text-white" : "text-zinc-300"}`}>{row.name}</div>
          <div className="text-zinc-500 text-xs">{row.email}</div>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Temat",
      render: (row: MsgRow) => <span className="text-zinc-300">{row.subject}</span>,
    },
    {
      key: "message",
      label: "Wiadomość",
      render: (row: MsgRow) => (
        <span className="text-zinc-500 text-xs line-clamp-1 max-w-xs">{row.message}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Data",
      render: (row: MsgRow) => (
        <span className="text-zinc-500 text-xs whitespace-nowrap">
          {new Date(row.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row: MsgRow) => (
        <div className="flex items-center gap-2">
          {row.phone && (
            <a href={`tel:${row.phone}`} className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors" title={row.phone}>
              <Phone size={13} />
            </a>
          )}
          <a href={`mailto:${row.email}?subject=Re: ${row.subject}`} className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
            <Mail size={13} />
          </a>
          {!row.read && (
            <form action={`/api/admin/messages/${row.id}/read`} method="POST">
              <button type="submit" className="p-1.5 bg-zinc-800 hover:bg-blue-500/20 rounded-lg text-zinc-400 hover:text-blue-400 transition-colors" title="Oznacz jako przeczytaną">
                <CheckCheck size={13} />
              </button>
            </form>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Wiadomości</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {messages.length} łącznie{unread > 0 && <span className="text-blue-400 ml-1">· {unread} nieprzeczytanych</span>}
        </p>
      </div>
      <AdminTable columns={columns} data={messages} emptyMessage="Brak wiadomości" />
    </div>
  );
}
