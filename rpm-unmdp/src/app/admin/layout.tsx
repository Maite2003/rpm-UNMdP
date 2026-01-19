import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/");
  }

  const user = session.user;

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      <aside className="hidden w-64 flex-col bg-slate-950 text-slate-50 md:flex">
        <div className="flex h-16 items-center border-b border-slate-800 px-6 font-bold text-lg tracking-tight">
          Admin Panel 🛡️
        </div>
        
        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          
          <MenuSection title="General">
            <MenuLink href="/admin">Dashboard</MenuLink>
            <MenuLink href="/admin/users">Usuarios</MenuLink>
            <MenuLink href="/admin/reports">Reportes</MenuLink>
          </MenuSection>

          <MenuSection title="Estructura Académica">
            <MenuLink href="/admin/academic/universities">Universidades</MenuLink>
          </MenuSection>

          <MenuSection title="Oferta">
            <MenuLink href="/admin/academic/professors">Profesores</MenuLink>
            <MenuLink href="/admin/academic/commissions">Comisiones</MenuLink>
          </MenuSection>

        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-slate-700">
              <AvatarFallback className="bg-indigo-600 text-white text-xs">
                {user.firstName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.firstName}</span>
              <Link href="/" passHref>
                <Button variant="link" className="h-auto p-0 text-xs text-slate-400 hover:text-white">
                  ← Volver al sitio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="block rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}