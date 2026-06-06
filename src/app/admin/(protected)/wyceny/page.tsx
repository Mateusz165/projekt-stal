import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import prisma from "@/lib/prisma";
import { AdminTable, StatusBadge } from "@/components/admin/AdminTable";

export const metadata: Metadata = { title: "Zapytania o wycenę" };

const statusMap = {
  new: { label: "Nowe", color: "bg-amber-500/10 text-amber-400" },
  contacted: { label: "Skontaktowano", color: "bg-blue-500/10 text-blue-400" },
  quoted: { label: "Wycenione", color: "bg-purple-500/10 text-purple-400" },
  accepted: { label: "Przyjęte", color: "bg-green-500/10 text-green-400" },
  rejected: { label: "Odrzucone", color: "bg-zinc-700 text-zinc-400" },
};

type QuoteRow = Record<string, unknown> & { id: number; name: string; email: string; phone: string; type: string; location: string; status: string; createdAt: Date };

export default async function QuotesPage() {
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  }) as QuoteRow[];

  const columns = [
    {
      key: "name",
      label: "Klient",
      render: (row: QuoteRow) => (
        <div>
          <div className="text-white font-medium">{row.name}</div>
          <div className="text-zinc-500 text-xs">{row.email}</div>
        </div>
      ),
    },
    { key: "type", label: "Typ", render: (row: QuoteRow) => <span className="text-zinc-300 capitalize">{row.type}</span> },
    { key: "location", label: "Lokalizacja", render: (row: QuoteRow) => <span className="text-zinc-400">{row.location}</span> },
    {
      key: "status",
      label: "Status",
      render: (row: QuoteRow) => <StatusBadge status={row.status} map={statusMap} />,
    },
    {
      key: "createdAt",
      label: "Data",
      render: (row: QuoteRow) => (
        <span className="text-zinc-500 text-xs">
          {new Date(row.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row: QuoteRow) => (
        <div className="flex items-center gap-2">
          <a href={`tel:${row.phone}`} className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors" title={row.phone}>
            <Phone size={13} />
          </a>
          <a href={`mailto:${row.email}`} className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors" title={row.email}>
            <Mail size={13} />
          </a>
          <QuoteStatusForm id={row.id} current={row.status} />
        </div>
      ),
    },
  ];

  const newCount = quotes.filter((q) => q.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Zapytania o wycenę</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {quotes.length} łącznie{newCount > 0 && <span className="text-amber-400 ml-1">· {newCount} nowych</span>}
          </p>
        </div>
      </div>

      <AdminTable columns={columns} data={quotes} emptyMessage="Brak zapytań o wycenę" />
    </div>
  );
}

function QuoteStatusForm({ id, current }: { id: number; current: string }) {
  return (
    <form action={`/api/admin/quotes/${id}/status`} method="POST">
      <select
        name="status"
        defaultValue={current}
        onChange={(e) => e.currentTarget.form?.submit()}
        className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500"
      >
        {Object.entries({ new: "Nowe", contacted: "Skontaktowano", quoted: "Wycenione", accepted: "Przyjęte", rejected: "Odrzucone" }).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </form>
  );
}
