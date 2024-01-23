import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  LoginInfo,
  NewUser,
  User,
  authenticateToken,
  getAccessToken,
  isThisLoginInfoValid,
} from "./util";
import { initDb } from "./db";
import {
  getUsers,
  getUserByColumn,
  getEmailOccurrenceCount,
  insertUser,
} from "./users";
import { PhysicalPerson, getPeople, getPersonById } from "./physicalPerson";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3001;

if (!JWT_SECRET) {
  throw new Error("Missing value 'JWT_SECRET' in the .env");
}

const db = initDb();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (_, res) => {
  try {
    const users = await getUsers(db);
    console.log(users);

    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.post("/signup", async (req, res) => {
  const data = req.body as NewUser;

  if (!isThisLoginInfoValid(data) || !data.role) {
    res.sendStatus(400);
    return;
  }

  const user: NewUser = { ...data, role: "USER" };
  const ok = await insertUser(db, user);

  if (ok) {
    res.status(201).send({ token: getAccessToken(user, JWT_SECRET) });
  } else {
    res.sendStatus(400);
  }
});

app.post("/login", async (req, res) => {
  const data = req.body as LoginInfo;

  if (!isThisLoginInfoValid(data)) {
    res.sendStatus(401);
    return;
  }

  const user = await getUserByColumn(db, data.email);

  if (!user || user.password !== data.password) {
    res.sendStatus(403);
    return;
  }

  delete user.token;
  user.token = getAccessToken(user, JWT_SECRET);

  res.send(user.token);
});

app.post(
  "/auth",
  async (req, res, next) => authenticateToken(req, res, next, db),
  (req, res) => {
    res.status(200).send(req.body ? req.body.user : null);
  }
);

app.post(
  "/refresh",
  async (req, res, next) => authenticateToken(req, res, next, db),
  async (req, res) => {
    const user = req.body.user as User;

    const actualUser = await getUserByColumn(db, user.email);

    if (!actualUser) {
      return res.sendStatus(404);
    }

    res.send(getAccessToken(user, JWT_SECRET));
  }
);

app.patch(
  "/edit",
  async (req, res, next) => authenticateToken(req, res, next, db),
  async (req, res) => {
    const user = req.body.user as User;
    const data = req.body.data as Partial<NewUser>;
    const id = +(req.query.id ?? -1);

    if (!user || !user.role || user.role !== "ADMIN") return res.send(403);
    if (id < 0) return res.sendStatus(400);

    let actualUser = await getUserByColumn(db, id, "id");
    if (!actualUser) return res.sendStatus(404);

    // email is being updated but is already in use
    if (
      data.email &&
      data.email !== actualUser.email &&
      (await getEmailOccurrenceCount(db, data.email)) > 0
    ) {
      return res.sendStatus(401);
    }

    actualUser = { ...actualUser, ...data };

    const { token: _, ...rest } = actualUser;
    res.send(rest);
  }
);

app.get(
  "/people",
  async (req, res, next) => authenticateToken(req, res, next, db),
  async (_, res) => {
    const people = await getPeople(db);

    res.send(people);
  }
);

app.get(
  "/person/:id",
  async (req, res, next) => authenticateToken(req, res, next, db),
  async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) return res.sendStatus(400);

    const person = await getPersonById(db, id);
    if (!person) return res.sendStatus(404);

    res.send(person);
  }
);

app.post(
  "/person",
  async (req, res, next) => authenticateToken(req, res, next, db),
  async (req, res) => {
    const user = req.body.user as User;
    const data = req.body.data as Omit<PhysicalPerson, "id">;

    if (!user) return res.send(401);

    res.send(data);
  }
);

app.listen(PORT, () => {
  console.log(`[server]: Listening on ${PORT}`);
});
