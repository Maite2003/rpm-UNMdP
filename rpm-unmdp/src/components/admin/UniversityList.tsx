"use client"

import { Edit, Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { deleteUniversityAction } from "@/actions/admin/university";


interface UniversityData {
  id: string;
  name: string;
  abbreviation: string | null;
  website: string | null;
  _count: {
    faculties: number;
  };
}

interface UniversityListProps {
  universities: UniversityData[],
}

export default function UniversityList({ universities }: UniversityListProps) {
  const [isPending, startTransaction] = useTransition();

  const handleDelete = async (universityId: string) => {
    if (!confirm("¿Estás seguro de que querés borrar esta facultad? Se borrarán también sus carreras.")) return;

    startTransaction(async () => {
      const result = await deleteUniversityAction(universityId);
      if (result.success) {
        toast.success("Universidad eliminada");
      } else {
        toast.error("Error al eliminar");
      }
    });
  }

  if (universities.length == 0) {
    return (
      <div className="border rounded-md p-8 text-center bg-muted/10 text-muted-foreground border-dashed">
        <p>No hay universidades cargadas.</p>
        <p className="text-sm mt-1">Hacé clic en "Agregar Universidad" para empezar.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Facultades</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities.map((uni) => (
            <TableRow key={uni.id}>
              <TableCell className="font-medium">{uni.id}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{uni.name}</span>
                  {uni.abbreviation && (
                    <span className="text-xs text-muted-foreground">{uni.abbreviation}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>{uni._count.faculties}</TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                
                <Link href={`/admin/academic/universities/${uni.id}`}>
                  <Button variant="ghost" size="icon" title="Editar">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  title="Borrar"
                  disabled={isPending}
                  onClick={() => handleDelete(uni.id)}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>

              </TableCell>
            </TableRow>
          ))}
          {universities.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No hay universidades cargadas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}