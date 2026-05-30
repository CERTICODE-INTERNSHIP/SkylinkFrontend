import axiosClient from "./axiosClient";
import type { Promotion, CreatePromotionPayload } from "@/types/promotion.types";

const BASE_PATH = "/promotions";

export const getPromotions = async (): Promise<Promotion[]> => {
  const response = await axiosClient.get(BASE_PATH);
  return response.data;
};

export const getPromotionById = async (id: string): Promise<Promotion> => {
  const response = await axiosClient.get(`${BASE_PATH}/${id}`);
  return response.data;
};

/**
 * Admin: Create promo code
 * POST /promotions
 */
export const createPromotion = async (payload: CreatePromotionPayload): Promise<Promotion> => {
  const response = await axiosClient.post(BASE_PATH, payload);
  return response.data;
};

/**
 * Admin: Edit promo code
 * PUT /promotions/{id}
 */
export const updatePromotion = async (id: string, payload: Partial<CreatePromotionPayload>): Promise<Promotion> => {
  const response = await axiosClient.put(`${BASE_PATH}/${id}`, payload);
  return response.data;
};

/**
 * Admin: Remove promo code
 * DELETE /promotions/{id}
 */
export const deletePromotion = async (id: string): Promise<void> => {
  await axiosClient.delete(`${BASE_PATH}/${id}`);
};
