'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { createUniversityAction } from '@/actions/admin/university';
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

export default function CreateUniversityDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createUniversityAction, null);

  if (state?.success && open) {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Nueva Universidad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Agregar Universidad</DialogTitle>
          <DialogDescription>
            Creá una nueva institución raíz.
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
              placeholder="Universidad Nacional..."
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
              placeholder="Ej: UNMdP"
              className="col-span-3"
            />
          </div>
          
          {state?.message && !state.success && (
            <p className="text-red-500 text-sm text-center">{state.message}</p>
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