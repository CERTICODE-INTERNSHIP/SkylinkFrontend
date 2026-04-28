import axiosClient from "./axiosClient";
import { handleApiError } from "./api.helpers";
import type { User } from "@/types";
import type {
  LoginFormValues,
  RegisterFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from "@/validation/auth.schemas";
import type { TokenResponse, MessageResponse } from "@/types/api.types";

export async function login(credentials: LoginFormValues): Promise<TokenResponse> {
  try {
    const res = await axiosClient.post<TokenResponse>("/auth/login", credentials);
    return res.data;
  } catch (err) {
    handleApiError(err);
    throw err;
  }
}

export async function register(payload: Omit<RegisterFormValues, "confirmPassword">): Promise<User> {
  try {
    const res = await axiosClient.post<User>("/auth/register", payload);
    return res.data;
  } catch (err) {
    handleApiError(err);
    throw err;
  }
}

export async function getProfile(): Promise<User> {
  try {
    const res = await axiosClient.get<User>("/auth/me");
    return res.data;
  } catch (err) {
    handleApiError(err);
    throw err;
  }
}

export async function forgotPassword(payload: ForgotPasswordFormValues): Promise<MessageResponse> {
  try {
    const res = await axiosClient.post<MessageResponse>("/auth/forgot-password", payload);
    return res.data;
  } catch (err) {
    handleApiError(err);
    throw err;
  }
}

export async function resetPassword(payload: Omit<ResetPasswordFormValues, "confirmPassword">): Promise<MessageResponse> {
  try {
    const res = await axiosClient.post<MessageResponse>("/auth/reset-password", payload);
    return res.data;
  } catch (err) {
    handleApiError(err);
    throw err;
  }
}

export async function resendVerification(email: string): Promise<MessageResponse> {
  try {
    const res = await axiosClient.post<MessageResponse>("/auth/resend-verification", { email });
    return res.data;
  } catch (err) {
    handleApiError(err);
    throw err;
  }
}