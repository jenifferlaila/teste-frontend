import { Database } from "sqlite3";

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

const GET_PEOPLE = "SELECT * FROM PessoaFisica";

const GET_PERSON_BY_ID = "SELECT * FROM PessoaFisica p WHERE p.id";

export async function getPeople(db: Database) {
  return new Promise<PhysicalPerson[]>((resolve, reject) => {
    db.all<PhysicalPerson>(GET_PEOPLE, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function getPersonById(db: Database, id: number) {
  return new Promise<PhysicalPerson | undefined>((resolve, reject) => {
    db.get<PhysicalPerson>(
      `${GET_PERSON_BY_ID} = '${id}'`,
      function (err, row) {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}
