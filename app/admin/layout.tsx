import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminUser();

  // No session = login page (middleware already blocks other unauthenticated routes)
  if (!session) return <>{children}</>;

  const user = await prisma.user.findUnique({ where: { id: session.userId } });

  return (
    <div className="flex h-screen bg-[#111111] text-foreground overflow-hidden">
      <AdminSidebar userName={user?.name ?? "Admin"} userEmail={user?.email ?? ""} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
