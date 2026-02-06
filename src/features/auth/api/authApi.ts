import { axiosInstance } from "@/shared/api/axiosInstance";
import { endpoints } from "@/shared/api/endpoints";
import type { AuthUser } from "@/entities/user/types";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function loginRequest(payload: LoginPayload): Promise<{ token: string; user: AuthUser }> {
  const { data } = await axiosInstance.post<LoginResponse>(endpoints.login, payload);
  return {
    token: data.accessToken,
    user: {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    }
  };
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthUser> {
  const { data } = await axiosInstance.post<AuthUser>(endpoints.register, payload);
  return data;
}
