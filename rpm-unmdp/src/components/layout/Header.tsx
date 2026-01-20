'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GraduationCap, Search, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Simular estado de autenticación - en producción vendría de tu sistema de auth
const useAuth = () => {
  // Cambiar a true para ver el estado logueado
  const [isLoggedIn] = useState(false);
  const [user] = useState({ firstName: 'Juan', lastName: 'Pérez' });
  return { isLoggedIn, user };
};

export function Header() {
  const { isLoggedIn, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <GraduationCap className="h-7 w-7" />
          <span className="hidden sm:inline">RMP-UNMdP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                Buscar
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <Link href="/buscar/profesor">Por Profesor</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/buscar/materia">Por Materia</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/buscar/comision">Por Comisión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.firstName} {user.lastName}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Registrarse</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4">
          <nav className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground px-2">Buscar por:</p>
            <Link
              href="/buscar/profesor"
              className="px-2 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profesor
            </Link>
            <Link
              href="/buscar/materia"
              className="px-2 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Materia
            </Link>
            <Link
              href="/buscar/comision"
              className="px-2 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comisión
            </Link>
            
            <div className="border-t border-border my-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/perfil"
                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Mi Perfil ({user.firstName})
                  </Link>
                  <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted transition-colors text-destructive w-full text-left">
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register">Registrarse</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
