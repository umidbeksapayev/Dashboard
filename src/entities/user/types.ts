export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  email: string;
  phone: string;
  role?: string;
};

export type AuthUser = Pick<User, "id" | "firstName" | "lastName" | "email">;

export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};
