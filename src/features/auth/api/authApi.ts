import axios from "axios";
import { axiosInstance } from "@/shared/api/axiosInstance";
import { endpoints } from "@/shared/api/endpoints";
import type { AuthUser } from "@/entities/user/types";

type LoginPayload = {
  identifier: string;
  password: string;
};

type LoginResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken?: string;
  token?: string;
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LocalRegisteredUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const LOCAL_USERS_KEY = "registered-users";
const DEMO_USER = {
  identifier: "emilys",
  password: "emilyspass",
  user: {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emilys@dummyjson.com"
  }
} as const;

function getLocalUsers(): LocalRegisteredUser[] {
  const raw = localStorage.getItem(LOCAL_USERS_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is LocalRegisteredUser =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as LocalRegisteredUser).id === "number" &&
        typeof (item as LocalRegisteredUser).firstName === "string" &&
        typeof (item as LocalRegisteredUser).lastName === "string" &&
        typeof (item as LocalRegisteredUser).email === "string" &&
        typeof (item as LocalRegisteredUser).password === "string"
    );
  } catch {
    return [];
  }
}

function setLocalUsers(users: LocalRegisteredUser[]): void {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function toAuthResult(user: LocalRegisteredUser): { token: string; user: AuthUser } {
  return {
    token: `local-token-${user.id}`,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  };
}

export async function loginRequest(payload: LoginPayload): Promise<{ token: string; user: AuthUser }> {
  const normalizedIdentifier = payload.identifier.trim().toLowerCase();

  try {
    const { data } = await axiosInstance.post<LoginResponse>(endpoints.login, {
      username: payload.identifier,
      password: payload.password
    });

    const token = data.accessToken ?? data.token;
    if (!token) {
      throw new Error("Token not found in login response");
    }

    return {
      token,
      user: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      }
    };
  } catch (error: unknown) {
    const matchedDemo =
      normalizedIdentifier === DEMO_USER.identifier && payload.password === DEMO_USER.password;
    if (matchedDemo) {
      return {
        token: `demo-token-${DEMO_USER.user.id}`,
        user: DEMO_USER.user
      };
    }

    if (axios.isAxiosError(error) && (error.response?.status === 400 || error.response?.status === 401)) {
      const matched = getLocalUsers().find(
        (item) => item.email.toLowerCase() === normalizedIdentifier && item.password === payload.password
      );

      if (matched) {
        return toAuthResult(matched);
      }
    }

    throw error;
  }
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthUser> {
  const localUsers = getLocalUsers();
  const existing = localUsers.find((item) => item.email.toLowerCase() === payload.email.toLowerCase());

  if (existing) {
    return {
      id: existing.id,
      firstName: existing.firstName,
      lastName: existing.lastName,
      email: existing.email
    };
  }

  const created: LocalRegisteredUser = {
    id: Date.now(),
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password
  };

  setLocalUsers([...localUsers, created]);

  return {
    id: created.id,
    firstName: created.firstName,
    lastName: created.lastName,
    email: created.email
  };
}
