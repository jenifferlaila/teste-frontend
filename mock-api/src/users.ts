import { Database } from "sqlite3";
import { NewUser, User } from "./util";

const USER_CREATION = `
  INSERT INTO Usuario(email, phone, username, password, role)
  VALUES(?, ?, ?, ?, ?);
`;

const GET_USERS = "SELECT * FROM Usuario";

const GET_USER_BY_COLUMN = "SELECT * FROM Usuario u WHERE u";

const GET_EMAIL_OCCURRENCE_COUNT =
  "SELECT COUNT(*) FROM Usuario u WHERE u.email = ";

export function insertUser(db: Database, user: NewUser) {
  let res: Error | number = -1;

  db.run(
    USER_CREATION,
    [user.email, user.phone, user.username, user.password, user.role],
    function (err) {
      if (err) return (res = err);

      res = this.lastID;
    }
  );

  return res;
}

export function getUsers(db: Database) {
  return new Promise<User[]>((resolve, reject) => {
    db.all<User>(GET_USERS, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getUserByColumn(
  db: Database,
  value: string | number,
  column = "email"
) {
  return new Promise<User | undefined>((resolve, reject) => {
    db.get<User>(
      `${GET_USER_BY_COLUMN}.${column} = ${
        column === "id" ? value : `'${value}'`
      }`,
      function (err, row) {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

export function getEmailOccurrenceCount(db: Database, email: string) {
  return new Promise<number>((resolve, reject) => {
    db.get<number>(`${GET_EMAIL_OCCURRENCE_COUNT} '${email}'`, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}
