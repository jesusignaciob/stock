import type { StockRecommendation, StockRecommendationResponse } from "@/types/recommendation";
import axios from "axios";

export async function fetchRecommendations(): Promise<StockRecommendationResponse> {
    try {
      const { data } = await axios.get<StockRecommendationResponse>('/api/v1/recommendations');
      
      if (!data.success) {
        throw new Error('La respuesta del API no fue exitosa');
      }

      return data;
    } catch (error: unknown) {
      console.error('Error en fetchRecommendations:', error);
      throw error
    }
  };