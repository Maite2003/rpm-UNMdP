'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap } from 'lucide-react';

export function SearchHero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center space-y-8">
        {/* Logo y título */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Encontrá al profesor ideal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubrí qué dicen otros estudiantes sobre los profesores de la UNMdP.
            Compartí tu experiencia y ayudá a la comunidad.
          </p>
        </div>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar profesor, materia o comisión..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-6">
              Buscar
            </Button>
          </div>
        </form>

        {/* Stats rápidos */}
        <div className="flex flex-wrap justify-center gap-8 pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Profesores</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">2,000+</p>
            <p className="text-sm text-muted-foreground">Reseñas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">150+</p>
            <p className="text-sm text-muted-foreground">Materias</p>
          </div>
        </div>
      </div>
    </section>
  );
}
