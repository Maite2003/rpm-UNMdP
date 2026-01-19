'use client'

import { deleteCareerAction } from "@/actions/admin/career";
import { useTransition } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Link, Edit, Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";


interface CareerData {
  id: string,
  name: string,
  _count: {
    studyPlans: number
  }
}

export interface CareerListProps {
  careers: CareerData[],
  facultyId: string,
  universityId: string
}

export default function CareerList({ careers, facultyId, universityId }: CareerListProps) {
  const [isPending, startTransaction] = useTransition();

  const handleDelete = async (careerId: string) => {
    if (!confirm("¿Estás seguro de que querés borrar esta carrera?. Se borraran sus planes correspondientes")) return;

    startTransaction(async () => {
      const result = await deleteCareerAction(careerId, facultyId, universityId);
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  if (careers.length == 0) {
    return (
      <div className="border rounded-md p-8 text-center bg-muted/10 text-muted-foreground border-dashed">
        <p>No hay carreras cargadas en esta facultad.</p>
        <p className="text-sm mt-1">Hacé clic en "Agregar Carreras" para empezar.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Planes de estudio</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {careers.map((career) => (
            <TableRow key={career.id}>
              <TableCell className="font-medium">{career.name}</TableCell>
              <TableCell>
                {career._count.studyPlans}
              </TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                
                <Link href={`/admin/universities/${universityId}/faculties/${facultyId}/careers/${career.id}`}>
                  <Button variant="ghost" size="icon" title="Ver Carreras">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  disabled={isPending}
                  onClick={() => handleDelete(career.id)}
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