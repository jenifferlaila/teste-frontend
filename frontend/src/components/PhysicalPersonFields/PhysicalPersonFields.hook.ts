import { useEffect, useState } from "react";
import { PhysicalPerson, getPersonById } from "../../util";

export default function usePhysicalPersonFields(personId: number) {
  const [physicalPerson, setPhysicalPerson] = useState<PhysicalPerson>();

  useEffect(() => {
    if (!personId || personId < 0) return;

    const action = async () => {
      await getPersonById(personId, setPhysicalPerson);
    };

    action();
  }, [personId]);

  return { physicalPerson };
}
