"use client"

import { University } from "@/generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { universitySchema, UniversityValues } from "@/lib/schemas/university";
import { updateUniversityAction } from "@/actions/admin/university";

interface EditUniversityFormProps {
  university: University;
}

export default function EditUniversityForm({ university }: EditUniversityFormProps) {
  const [isPending, startTransaction] = useTransition();

  const form = useForm<UniversityValues>({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: university.name,
      abbreviation: university.abbreviation || "",
      website: university.website || ""
    }
  });

  function onSubmit(values : UniversityValues) {
    startTransaction(async () => {
      try {
        const result = await updateUniversityAction(university.id, values);
        if (result.success) toast.success(result.message);
        else toast.error(result.message);
      } catch (error) {
        toast.error("Ocurrio un error inesperado");
        console.error(error);
      }
    });
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
                <FormLabel>Nombre de la Universidad</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="Universidad Nacional..." {...field} />
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
                  <Input disabled={isPending} placeholder="UNMDP, UBA..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Sitio Web</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="https://..." {...field} />
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