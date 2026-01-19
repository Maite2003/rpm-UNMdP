'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { createFacultyAction } from '@/actions/admin/faculty';
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

interface createFacultyDialogProps {
  universityId: string
}

export default function CreateFacultyDialog({ universityId }: createFacultyDialogProps) {
  const [open, setOpen] = useState(false);
  const createWithId = createFacultyAction.bind(null, universityId);
  const [state, formAction, isPending] = useActionState(createWithId, null);

  if (state?.success && open) {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Facultad
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Facultad</DialogTitle>
          <DialogDescription>
            Agregá una nueva facultad a esta universidad.
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="abbreviation" className="text-right">
              Siglas
            </Label>
            <Input
              id="abbreviation"
              name="abbreviation"
              placeholder="Ej: FI"
              className="col-span-3"
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