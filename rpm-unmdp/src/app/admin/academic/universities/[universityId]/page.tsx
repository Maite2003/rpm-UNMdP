import { notFound } from 'next/navigation';
import EditUniversityForm from '@/components/admin/EditUniversityForm';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getUniversityById } from '@/services/university';
import CreateFacultyDialog from '@/components/admin/CreateFacultyDialog';
import FacultyList from '@/components/admin/FacultyList';

interface UniversityDetailPageProps {
  params: Promise<{
    universityId: string;
  }>;
}

export default async function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const { universityId } = await params;
  
  const university = await getUniversityById(universityId);

  if (!university) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <nav className="flex items-center text-sm text-muted-foreground">
        <Link href="/admin" className="hover:text-foreground">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/admin/academic/universities" className="hover:text-foreground">
          Universidades
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="font-medium text-foreground">{university.name}</span>
      </nav>

      <div className="border-b pb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Detalles de la Universidad</h2>
        <EditUniversityForm university={university} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Facultades</h2>
            <p className="text-sm text-muted-foreground">
              Gestioná las facultades de {university.name}.
            </p>
          </div>
          <CreateFacultyDialog universityId={university.id} />
        </div>
        
        <FacultyList faculties={university.faculties} universityId={university.id} />
      </div>
    </div>
  );
}