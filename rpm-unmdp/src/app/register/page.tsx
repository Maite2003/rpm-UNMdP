'use client';

import { useActionState } from 'react';
import { registerUser } from '@/actions/register';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const initialState = {
  message: '',
  success: false,
  errors: {}
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
          <CardDescription>
            Unite a la comunidad de rmp-UNMdP
          </CardDescription>
        </CardHeader>

        <CardContent>
          {state.message && (
            <div className={`mb-4 p-3 rounded-md text-sm font-medium ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {state.message}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" name="firstName" placeholder="Ej: Maite" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" name="lastName" placeholder="Ej: Perez" required />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/3 space-y-2">
                <Label htmlFor="docType">Tipo</Label>
                <select 
                  name="docType" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="DNI">DNI</option>
                  <option value="PASSPORT">Pas.</option>
                </select>
              </div>
              <div className="w-2/3 space-y-2">
                <Label htmlFor="docNumber">Documento</Label>
                <Input id="docNumber" name="docNumber" placeholder="12345678" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="alumno@gmail.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creando...' : 'Registrarse'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            ¿Ya tenés cuenta? <Link href="/login" className="text-primary hover:underline font-medium">Iniciar Sesión</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}