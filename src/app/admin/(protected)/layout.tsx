import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: { default: "Panel administracyjny", template: "%s | Admin Projekt-Stal" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <AdminHeader user={user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
