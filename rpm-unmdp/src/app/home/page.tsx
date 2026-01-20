import { SearchHero } from '@/components/home/search-hero';
import { ProfessorCarousel } from '@/components/home/professor-carousel';
import { CommissionCarousel } from '@/components/home/commission-carousel';
import { Suspense } from 'react';
import Loading from '@/app/home/loading';

// Datos de ejemplo - en producción vendrían de la base de datos
const bestProfessors = [
  { id: '1', name: 'Dr. María García', department: 'Ingeniería de Software', rating: 4.9, reviewCount: 128 },
  { id: '2', name: 'Lic. Carlos Rodríguez', department: 'Matemática', rating: 4.8, reviewCount: 95 },
  { id: '3', name: 'Ing. Ana Martínez', department: 'Física', rating: 4.7, reviewCount: 82 },
  { id: '4', name: 'Dr. Luis Fernández', department: 'Química', rating: 4.7, reviewCount: 76 },
  { id: '5', name: 'Lic. Patricia López', department: 'Programación', rating: 4.6, reviewCount: 110 },
  { id: '6', name: 'Ing. Roberto Sánchez', department: 'Bases de Datos', rating: 4.6, reviewCount: 67 },
];

const worstProfessors = [
  { id: '7', name: 'Dr. Juan Pérez', department: 'Álgebra', rating: 1.8, reviewCount: 45 },
  { id: '8', name: 'Lic. Marta González', department: 'Análisis Matemático', rating: 2.0, reviewCount: 38 },
  { id: '9', name: 'Ing. Pablo Ruiz', department: 'Sistemas Operativos', rating: 2.1, reviewCount: 52 },
  { id: '10', name: 'Dr. Elena Torres', department: 'Redes', rating: 2.2, reviewCount: 29 },
  { id: '11', name: 'Lic. Diego Herrera', department: 'Estadística', rating: 2.3, reviewCount: 41 },
  { id: '12', name: 'Ing. Laura Díaz', department: 'Arquitectura de Computadoras', rating: 2.4, reviewCount: 33 },
];

const bestCommissions = [
  { id: '1', name: 'Comisión 1', subject: 'Programación I', professor: 'Lic. Patricia López', rating: 4.8, reviewCount: 56 },
  { id: '2', name: 'Comisión A', subject: 'Bases de Datos', professor: 'Ing. Roberto Sánchez', rating: 4.7, reviewCount: 42 },
  { id: '3', name: 'Comisión 2', subject: 'Ingeniería de Software', professor: 'Dr. María García', rating: 4.7, reviewCount: 38 },
  { id: '4', name: 'Comisión B', subject: 'Matemática Discreta', professor: 'Lic. Carlos Rodríguez', rating: 4.6, reviewCount: 51 },
  { id: '5', name: 'Comisión 1', subject: 'Física I', professor: 'Ing. Ana Martínez', rating: 4.5, reviewCount: 44 },
  { id: '6', name: 'Comisión A', subject: 'Química General', professor: 'Dr. Luis Fernández', rating: 4.5, reviewCount: 35 },
];

const worstCommissions = [
  { id: '7', name: 'Comisión 3', subject: 'Álgebra I', professor: 'Dr. Juan Pérez', rating: 1.9, reviewCount: 28 },
  { id: '8', name: 'Comisión B', subject: 'Análisis I', professor: 'Lic. Marta González', rating: 2.1, reviewCount: 31 },
  { id: '9', name: 'Comisión 2', subject: 'Sistemas Operativos', professor: 'Ing. Pablo Ruiz', rating: 2.2, reviewCount: 25 },
  { id: '10', name: 'Comisión A', subject: 'Redes de Computadoras', professor: 'Dr. Elena Torres', rating: 2.3, reviewCount: 19 },
  { id: '11', name: 'Comisión 1', subject: 'Probabilidad y Estadística', professor: 'Lic. Diego Herrera', rating: 2.4, reviewCount: 22 },
  { id: '12', name: 'Comisión B', subject: 'Arquitectura', professor: 'Ing. Laura Díaz', rating: 2.5, reviewCount: 17 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <Suspense fallback={<Loading />}>
          <SearchHero />
          
          <div className="container mx-auto px-4 pb-16 space-y-12">
            <ProfessorCarousel 
              title="Profesores Mejor Votados" 
              professors={bestProfessors} 
              variant="best" 
            />
            
            <ProfessorCarousel 
              title="Profesores Peor Votados" 
              professors={worstProfessors} 
              variant="worst" 
            />
            
            <CommissionCarousel 
              title="Mejores Comisiones" 
              commissions={bestCommissions} 
              variant="best" 
            />
            
            <CommissionCarousel 
              title="Comisiones con Peores Reseñas" 
              commissions={worstCommissions} 
              variant="worst" 
            />
          </div>
        </Suspense>
      </main>
      
    </div>
  );
}
