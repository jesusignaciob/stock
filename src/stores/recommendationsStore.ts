import { defineStore } from "pinia";
import { ref } from "vue";
import type { StockRecommendation } from "@/types/recommendation";
import { fetchRecommendations } from "@/api/recommendationsApi";

interface RecommendationState {
  recommendations: StockRecommendation[];
  loading: boolean;
  error: string | null;
  dialogVisible: boolean;
  selectedStock: StockRecommendation | null;
}

export const useRecommendationStore = defineStore("recommendations", () => {
  // State
  const state = ref<RecommendationState>({
    recommendations: [],
    loading: false,
    error: null,
    dialogVisible: false,
    selectedStock: null,
  });

  const showDetails = (stock: StockRecommendation): void => {
    state.value.selectedStock = stock;
    state.value.dialogVisible = true;
  };

  const closeDialog = (): void => {
    state.value.dialogVisible = false;
    state.value.selectedStock = null;
  };

  const fetchData = async (): Promise<void> => {
    state.value.loading = true;
    state.value.error = null;

    try {
      const response = await fetchRecommendations();

      if (!response.success) {
        throw new Error("La respuesta del API no fue exitosa");
      }

      state.value.recommendations = response.data;
    } catch (error: unknown) {
      state.value.error =
        error instanceof Error
          ? error.message
          : "Error desconocido al obtener recomendaciones";
      console.error("Error en fetchRecommendations:", error);
    } finally {
      state.value.loading = false;
    }
  };

  return {
    state,
    showDetails,
    closeDialog,
    fetchData,
  };
});
