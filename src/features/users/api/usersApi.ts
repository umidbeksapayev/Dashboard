import { axiosInstance } from "@/shared/api/axiosInstance";
import { endpoints } from "@/shared/api/endpoints";
import type { User, UsersResponse } from "@/entities/user/types";

export type UsersParams = {
  page: number;
  limit: number;
  q?: string;
  sort?: "firstName" | "email";
};

export async function getUsers(params: UsersParams): Promise<UsersResponse> {
  const skip = (params.page - 1) * params.limit;
  const hasQuery = Boolean(params.q?.trim());
  const url = hasQuery ? `${endpoints.users}/search` : endpoints.users;

  const { data } = await axiosInstance.get<UsersResponse>(url, {
    params: {
      q: params.q,
      limit: params.limit,
      skip,
      sortBy: params.sort,
      order: "asc"
    }
  });

  return data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await axiosInstance.get<User>(`${endpoints.users}/${id}`);
  return data;
}
