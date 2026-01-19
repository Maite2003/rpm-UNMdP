import CreateUniversityDialog from '@/components/admin/CreateUniversityDialog';
import UniversityList from '@/components/admin/UniversityList';
import { getUniversities } from '@/services/university';

export default async function UniversitiesPage() {
  const universities = await getUniversities();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Universidades</h1>
          <p className="text-muted-foreground">Gestioná las instituciones educativas.</p>
        </div>
        <CreateUniversityDialog />
      </div>

      <UniversityList universities={universities}/>
    </div>
  );
}