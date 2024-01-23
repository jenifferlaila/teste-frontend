import axios from "axios";
import { API_URL } from ".";

export type UserRole = "ADMIN" | "USER";

export type LoginInfo = {
  email: string;
  password: string;
};

export type NewUser = LoginInfo & {
  phone: string;
  username: string;
};

export type UserBasicInfo = LoginInfo & {
  id: string;
  role: UserRole;
};

export async function getUsers(
  action: (users: UserBasicInfo[], ok: boolean) => void
) {
  const users: UserBasicInfo[] = [];
  const res = await fetch(`${API_URL}/users`);

  const data = await res.json();

  if (res.ok && data && data.length) {
    users.push(...(data as UserBasicInfo[]));
  }

  action(users, res.ok);
}

export async function checkAuth(onFail: () => void) {
  const token = localStorage.getItem("token");

  if (!token) {
    return onFail();
  }

  try {
    const res = await axios.post(`${API_URL}/auth`, undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data, status } = res;

    if (status !== 200) onFail();

    return data as UserBasicInfo;
  } catch (e) {
    console.log(e);
  }
}

export async function login(
  userInfo: LoginInfo,
  onFail: () => void,
  onSuccess: () => void
) {
  const res = await axios.post(`${API_URL}/login`, userInfo);

  if (res.status !== 200) return onFail();

  try {
    localStorage.setItem("token", String(res.data));
  } catch (e) {
    console.error("Failed to save the auth token to localStorage", e);
  }

  onSuccess();
}

export async function signUp(
  user: NewUser & { role: UserRole },
  onFail: () => void,
  onSuccess: () => void
) {
  try {
    const { data, status } = await axios.post(`${API_URL}/signup`, user);

    if (status === 201) {
      localStorage.setItem("token", String(data));
      onSuccess();
    }
  } catch (e) {
    console.error("Could not create user", e);
    onFail();
  }
}
