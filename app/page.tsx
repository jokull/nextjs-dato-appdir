import { Image } from "~/app/components/image";
import { dato } from "~/cms";

export default async function Home() {
  const { allEmployees } = await dato.Employees();
  return (
    <div>
      <div className="mb-4 text-2xl font-bold">Employees</div>
      <div className="flex gap-4">
        {allEmployees.map((employee) => (
          <div key={employee.id}>
            {employee.profilePicture.responsiveImage ? (
              <Image
                objectFit="cover"
                data={employee.profilePicture.responsiveImage}
              />
            ) : null}
            <div>{employee.fullName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
