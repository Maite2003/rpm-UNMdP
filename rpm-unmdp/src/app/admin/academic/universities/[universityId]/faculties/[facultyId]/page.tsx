import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getFacultyById } from '@/services/faculty';
import CreateCareerDialog from '@/components/admin/CreateCareerDialog';
import EditFacultyForm from '@/components/admin/EditFacultyForm';
import CareerList from '@/components/admin/CareerList';

interface FacultyDetailPageProps {
  params: Promise<{
    facultyId: string;
    universityId: string;
  }>;
}

export default async function FacultyDetailPage({ params }: FacultyDetailPageProps) {
  const { facultyId, universityId } = await params;
  
  const faculty = await getFacultyById(facultyId);

  if (!faculty || universityId !== faculty.universityId) {
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
        <Link href={`/admin/academic/universities/${universityId}`} className="hover:text-foreground">
          {faculty.university.name}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="font-medium text-foreground">{faculty.name}</span>
      </nav>

      <div className="border-b pb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Detalles de la Facultad</h2>
        <EditFacultyForm faculty={faculty} universityId={universityId}/>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Carreras</h2>
            <p className="text-sm text-muted-foreground">
              Gestioná las carreras de {faculty.name}.
            </p>
          </div>
          <CreateCareerDialog facultyId={faculty.id} universityId={universityId} />
        </div>
        
        <CareerList careers={faculty.careers} facultyId={faculty.id} universityId={universityId} />
      </div>
    </div>
  );
}