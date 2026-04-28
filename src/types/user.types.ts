// Matches backend role_id: 1 = admin, 2 = passenger
// "guest" is frontend-only — unauthenticated user, no DB record
export type UserRole = "guest" | "passenger" | "admin";

// Matches backend UserRead exactly
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: number;
  is_active: boolean;
  phone_number: string | null;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User | null;
}