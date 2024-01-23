import { API_URL } from ".";

export type PhysicalPerson = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  cpf: string;
  birthday: Date;
  rg: string;
};

export type Address = {
  id: number;
  street: string;
  complement: string;
  number: string;
  zipcode: string;
  city: string;
  state: string;
};

export async function getPeople(
  action: (people: PhysicalPerson[], ok: boolean) => void
) {
  const people: PhysicalPerson[] = [];
  const res = await fetch(`${API_URL}/people`);

  const data = await res.json();

  if (res.ok && data && data.length) {
    people.push(...(data as PhysicalPerson[]));
  }

  action(people, res.ok);
}

export async function getPersonById(
  id: number,
  action: (people: PhysicalPerson, ok: boolean) => void
) {
  const res = await fetch(`${API_URL}/person/${id}`);
  const data = await res.json();

  if (res.ok && data) {
    action(data, true);
  }
}
