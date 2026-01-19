"use client"

import { deleteFacultyAction } from "@/actions/admin/faculty";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import Link from "next/link";


interface FacultyData {
  id: string;
  name: string;
  abbreviation: string | null;
  _count: {
    careers: number;
  };
}

interface FacultyListProps {
  faculties: FacultyData[],
  universityId: string
}

export default function FacultyList({ faculties, universityId }: FacultyListProps) {
  const [isPending, startTransaction] = useTransition();

  const handleDelete = async (facultyId: string) => {
    if (!confirm("¿Estás seguro de que querés borrar esta facultad? Se borrarán también sus carreras.")) return;

    startTransaction(async () => {
      const result = await deleteFacultyAction(facultyId, universityId);
      if (result.success) toast.success("Facultad eliminada");
      else toast.error("Error al eliminar");
    });
  }

  if (faculties.length == 0) {
    return (
      <div className="border rounded-md p-8 text-center bg-muted/10 text-muted-foreground border-dashed">
        <p>No hay facultades cargadas en esta universidad.</p>
        <p className="text-sm mt-1">Hacé clic en "Agregar Facultad" para empezar.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Siglas</TableHead>
            <TableHead>Carreras</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faculties.map((faculty) => (
            <TableRow key={faculty.id}>
              <TableCell className="font-medium">{faculty.name}</TableCell>
              <TableCell>
                {faculty.abbreviation ? (
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {faculty.abbreviation}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                {faculty._count.careers || 0}
              </TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                
                <Link href={`/admin/academic/universities/${universityId}/faculties/${faculty.id}`}>
                  <Button variant="ghost" size="icon" title="Ver Carreras">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  disabled={isPending}
                  onClick={() => handleDelete(faculty.id)}
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}