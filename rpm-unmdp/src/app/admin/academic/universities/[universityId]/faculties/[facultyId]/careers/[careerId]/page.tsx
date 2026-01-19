import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getCareerWithPlansById } from "@/services/career";
import PlanSwitcher from "@/components/admin/PlanSwitcher";
import EditCareerForm from "@/components/admin/EditCareerForm";
import EditPlanForm from "@/components/admin/EditPlanForm";
import SubjectList from "@/components/admin/SubjectList";
import CreateSubjectDialog from "@/components/admin/CreateSubjectDialog";

interface CareerPageProps {
  params: Promise<{
    universityId: string;
    facultyId: string;
    careerId: string;
  }>;
  searchParams: Promise<{
    planId?: string;
  }>;
}

export default async function CareerPage({ params, searchParams }: CareerPageProps) {
  const { universityId, facultyId, careerId } = await params;
  const { planId } = await searchParams;

  const data = await getCareerWithPlansById(careerId, planId);

  if (!data) notFound();

  const { career, selectedPlan } = data;

  

  return (
    <div className="space-y-8">
      <nav className="flex items-center text-sm text-muted-foreground flex-wrap">
        <Link href="/admin" className="hover:text-foreground"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href={`/admin/academic/universities/${universityId}`} className="hover:text-foreground">
             {career.faculty.university.name}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href={`/admin/academic/universities/${universityId}/faculties/${facultyId}`} className="hover:text-foreground">
             {career.faculty.name}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="font-medium text-foreground">{career.name}</span>
      </nav>

      <div className="border-b pb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Detalles de la Carrera</h2>
        <EditCareerForm career={career} />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end border-b pb-4">
          <div>
            <h3 className="text-lg font-semibold">Plan de Estudio</h3>
            <p className="text-sm text-muted-foreground">
              Seleccioná el plan vigente para gestionar sus datos y materias.
            </p>
          </div>
          <PlanSwitcher 
            plans={career.studyPlans} 
            selectedPlanId={selectedPlan?.id!} 
            careerId={career.id}
            universityId={universityId}
            facultyId={facultyId}
          />
        </div>

        {selectedPlan ? (
          <>
            <div className="bg-slate-50 p-6 rounded-lg border">
                <h4 className="font-medium mb-4">Configuración del Plan {selectedPlan.year}</h4>
                <EditPlanForm plan={selectedPlan} />
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                    Materias <span className="text-muted-foreground text-base font-normal">({selectedPlan._count.subjects})</span>
                </h3>
                <CreateSubjectDialog 
                    planId={selectedPlan.id} 
                    universityId={universityId}
                    facultyId={facultyId}
                    careerId={careerId}
                />
              </div>
              
              <SubjectList subjects={selectedPlan.subjects} />
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-muted/10 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-medium">No hay planes de estudio</h3>
            <p className="text-muted-foreground">
              Para agregar materias, primero debés crear un Plan de Estudio (ej: "Plan 2024").
            </p>
          </div>
        )}
      </div>
    </div>
  );
}