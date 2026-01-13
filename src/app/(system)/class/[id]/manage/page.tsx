import { GetClass } from "@/app/_actions/class";
import ErrorBox from "@/components/custom-components/errorBox";
import GoBack from "@/components/custom-components/goBackButton";
import ManageClass from "@/components/feature/class/manage-class";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const classId = (await params).id;
  const sclass = await GetClass(Number(classId));
  return (
    <section>
      <h1 className="text-2xl font-semibold flex gap-5 items-center">
        <GoBack />
        <span>Manage Class - {sclass?.name}</span>
      </h1>
      <p className=" text-muted-foreground mb-5 ml-11">Assign subjects to a class.</p>
      {sclass ? <ManageClass sclass={sclass} /> : <ErrorBox />}
    </section>
  );
}
