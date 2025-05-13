export interface StockItem {
  ticker: string;
  target_from: string;
  target_to: string;
  company: string;
  action: string;
  brokerage: string;
  rating_from: string;
  rating_to: string;
  time: string;
  classifications: string[];
}

export interface StockResponse {
  items: StockItem[];
  page: number;
  totalRecords?: number;
  order_by: string;
}

export interface Response {
  data: StockResponse;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder?: number; // 1 for asc, -1 for desc
}

export interface StockQueryParams extends PaginationParams {
  filters?: Record<
    string,
    {
      value: any;
      matchMode: string;
    }
  >;
}