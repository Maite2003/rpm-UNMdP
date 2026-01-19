'use client'

import { updateFacultyAction } from "@/actions/admin/faculty";
import { Faculty } from "@/generated/prisma/client";
import { facultySchema, FacultyValues } from "@/lib/schemas/faculty";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";



export interface EditFacultyFormProps {
  faculty: Faculty,
  universityId: string
}

export default function EditFacultyForm({ faculty, universityId }: EditFacultyFormProps) {
  const [isPending, setTransaction] = useTransition();

  const form = useForm<FacultyValues>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: faculty.name,
      abbreviation: faculty.abbreviation || ""
    },
  });

  function onSubmit( values: FacultyValues ) {
    startTransition(async () => {
      try {
        const result = await updateFacultyAction(faculty.id, values, universityId);
        if (result.success) toast.success(result.message);
        else toast.error(result.message);
      } catch (error) {
        console.log(error);
        toast.error('Ocurrio un error inesperado');
      }
    })
  }

  const { isDirty } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Facultad</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="Facultad ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="abbreviation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Abreviación</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="FI..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !isDirty}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar Cambios
          </Button>
        </div>
      </form>
    </Form>
  );
}