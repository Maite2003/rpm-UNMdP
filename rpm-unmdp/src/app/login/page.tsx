'use client';

import { useActionState } from 'react'
import { login } from '@/actions/login';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>Bienvenida de nuevo</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            
            {errorMessage && (
              <div className="p-3 bg-red-100 text-red-700 text-sm rounded-md font-medium">
                {errorMessage}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Entrando...' : 'Ingresar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            ¿No tenés cuenta? <Link href="/register" className="text-primary hover:underline font-medium">Registrate</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}