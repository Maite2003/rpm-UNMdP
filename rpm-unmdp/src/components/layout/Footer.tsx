import Link from 'next/link';
import { GraduationCap, Mail, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <GraduationCap className="h-7 w-7" />
              <span>RMP-UNMdP</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Plataforma creada por estudiantes para estudiantes de la Universidad Nacional de Mar del Plata.
              Compartí tu experiencia y ayudá a otros a elegir mejor.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/buscar/profesor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Buscar Profesores
              </Link>
              <Link href="/buscar/materia" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Buscar Materias
              </Link>
              <Link href="/buscar/comision" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Buscar Comisiones
              </Link>
              <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Registrarse
              </Link>
            </nav>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Equipo de Desarrollo</h3>
            <div className="space-y-3">
              <a 
                href="mailto:contacto@rmp-unmdp.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                contacto@rmp-unmdp.com
              </a>
              <a 
                href="https://github.com/rmp-unmdp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                github.com/rmp-unmdp
              </a>
              <a 
                href="https://linkedin.com/company/rmp-unmdp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RMP-UNMdP. Hecho con cariño en Mar del Plata.
          </p>
        </div>
      </div>
    </footer>
  );
}
