'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { createCareerAction } from '@/actions/admin/career';

interface createCareerDialogProps {
  facultyId: string,
  universityId: string
}

export default function CreateCareerDialog({ facultyId, universityId }: createCareerDialogProps) {
  const [open, setOpen] = useState(false);
  const createWithId = createCareerAction.bind(null, facultyId, universityId);
  const [state, formAction, isPending] = useActionState(createWithId, null);

  if (state?.success && open) {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Carrera
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Carrera</DialogTitle>
          <DialogDescription>
            Agregá una nueva carrera a esta facultad.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Ingeniería..."
              className="col-span-3"
              required
            />
          </div>
          
          {state?.message && !state.success && (
            <p className="text-red-500 text-sm text-right col-span-4">{state.message}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}