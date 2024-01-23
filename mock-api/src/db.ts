import { verbose } from "sqlite3";
import { insertUser } from "./users";

const DB_PATH = process.env.DB_PATH || "../users.db";
const sql = verbose();

const TABLE_CREATIONS = `
  CREATE TABLE IF NOT EXISTS Usuario(
    id INTEGER NOT NULL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role = 'USER' OR role = 'ADMIN') DEFAULT 'USER'
  );

  CREATE TABLE IF NOT EXISTS PessoaFisica(
    idPessoaFisica INTEGER NOT NULL PRIMARY KEY,
    rg TEXT NOT NULL,
    cpf TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    lastname TEXT NOT NULL,
    birthday DATETIME NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Endereco(
    idEndereco INTEGER NOT NULL PRIMARY KEY,
    state TEXT NOT NULL,
    number TEXT NOT NULL,
    cidade TEXT NOT NULL,
    street TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    complement TEXT NOT NULL,
    fkIdPessoaFisica INTEGER NOT NULL,
    FOREIGN KEY(fkIdPessoaFisica) REFERENCES PessoaFisica(idPessoaFisica) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS Contato(
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type = 'EMAIL' OR type = 'PHONE') DEFAULT 'email',
    fkIdPessoaFisica INTEGER NOT NULL,
    FOREIGN KEY(fkIdPessoaFisica) REFERENCES PessoaFisica(idPessoaFisica) ON DELETE CASCADE
  );
`;

export function initDb() {
  let db = new sql.Database(DB_PATH, (err) => {
    if (err) {
      console.error("[server]: Could not connect to db;", err.message);

      throw new Error(err.message);
    }

    console.log("[server]: Successfuly connected to DB");
  });

  db.serialize(() => {
    db.exec(TABLE_CREATIONS);
  });

  insertUser(db, {
    role: "ADMIN",
    email: "admin@admin.ai",
    password: "123",
    phone: "1",
    username: "admin",
  });

  insertUser(db, {
    role: "ADMIN",
    email: "jenifferlaila@protonmail.com",
    password: "123",
    phone: "31983077998",
    username: "jeniffer",
  });

  return db;
}
