import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, School, AlertTriangle } from "lucide-react";

export default async function AdminPage() {
  const [usersCount, reviewsCount, universitiesCount, reportsCount] = await Promise.all([
    prisma.user.count(),
    prisma.review.count(),
    prisma.university.count(),
    prisma.review.count({ where: { status: "BANNED" } as any }), 
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
            <p className="text-xs text-muted-foreground">
              Estudiantes y admins
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reseñas Publicadas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewsCount}</div>
            <p className="text-xs text-muted-foreground">
              Opiniones activas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Universidades</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{universitiesCount}</div>
            <p className="text-xs text-muted-foreground">
              Instituciones cargadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{reportsCount}</div>
            <p className="text-xs text-muted-foreground">
              Requieren moderación
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}