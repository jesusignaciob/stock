export interface StockRecommendationResponse {
  success: boolean;
  data: StockRecommendation[];
}

export interface StockRecommendation {
  position: number;
  ticker: string;
  company: string;
  score: number;
  rationale: string;
}

export interface RecommendationStoreState {
  recommendations: StockRecommendation[];
  loading: boolean;
  error: string | null;
  dialogVisible: boolean;
  selectedStock: StockRecommendation | null;
}
