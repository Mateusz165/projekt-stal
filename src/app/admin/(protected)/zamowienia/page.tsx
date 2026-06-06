import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

export const metadata: Metadata = { title: "Zamówienia" };

const statusConfig: Record<string, { label: string; cls: string; Icon: React.ElementType }> = {
  pending:    { label: "Oczekujące",    cls: "bg-yellow-500/10 text-yellow-400", Icon: Clock },
  processing: { label: "W realizacji",  cls: "bg-blue-500/10 text-blue-400",     Icon: Package },
  shipped:    { label: "Wysłane",       cls: "bg-purple-500/10 text-purple-400", Icon: Truck },
  completed:  { label: "Zrealizowane",  cls: "bg-green-500/10 text-green-400",   Icon: CheckCircle },
  cancelled:  { label: "Anulowane",     cls: "bg-red-500/10 text-red-400",       Icon: XCircle },
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>Zamówienia</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {orders.length} zamówień · przychód: <span className="text-amber-400 font-semibold">{formatPrice(totalRevenue)}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(statusConfig).map(([status, { label, cls, Icon }]) => {
          const count = orders.filter((o) => o.status === status).length;
          return (
            <div key={status} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={cls.split(" ")[1]} />
                <span className="text-zinc-400 text-xs">{label}</span>
              </div>
              <div className="text-white font-bold text-xl">{count}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">ID / Klient</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Produkty</th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">Wartość</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <Package className="mx-auto mb-3 text-zinc-700" size={32} />
                  <div className="text-zinc-600">Brak zamówień</div>
                </td>
              </tr>
            )}
            {orders.map((order) => {
              const conf = statusConfig[order.status] ?? statusConfig.pending;
              return (
                <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-zinc-400 text-xs font-mono mb-1">#{order.orderNumber}</div>
                    <div className="text-white font-medium text-sm">{order.name}</div>
                    <div className="text-zinc-500 text-xs">{order.email}</div>
                    {order.phone && <div className="text-zinc-500 text-xs">{order.phone}</div>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-zinc-300 text-sm">{order.items.length} pozycji</div>
                    <div className="text-zinc-600 text-xs mt-0.5">
                      {order.items.slice(0, 2).map((item) => item.product.name).join(", ")}
                      {order.items.length > 2 && ` +${order.items.length - 2}`}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="text-amber-400 font-bold">{formatPrice(order.total)}</div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${conf.cls}`}>
                      {conf.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-zinc-500 text-xs whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })}
                    <div className="text-zinc-700 text-xs">
                      {new Date(order.createdAt).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
