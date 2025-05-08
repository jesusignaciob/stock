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

export interface StockQueryParams {
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: number; // 1 for asc, -1 for desc
  filters?: Record<
    string,
    {
      value: any;
      matchMode: string;
    }
  >;
}

// Función mock - reemplaza con tu llamada API real
// export async function fetchStocks(
//   params: StockQueryParams
// ): Promise<StockResponse> {
//   console.log("Fetching stocks with params:", params);

//   // Simula un retraso de API
//   await new Promise((resolve) => setTimeout(resolve, 500));

//   // Datos mock
//   const mockData: StockItem[] = [
//     {
//       ticker: "MOMO",
//       target_from: "$13.00",
//       target_to: "$13.00",
//       company: "Hello Group",
//       action: "reiterated by",
//       brokerage: "Benchmark",
//       rating_from: "Buy",
//       rating_to: "Buy",
//       time: "2025-03-14T00:30:05.974622332Z",
//     },
//     {
//       ticker: "RMTI",
//       target_from: "$7.00",
//       target_to: "$3.00",
//       company: "Rockwell Medical",
//       action: "target lowered by",
//       brokerage: "HC Wainwright",
//       rating_from: "Buy",
//       rating_to: "Buy",
//       time: "2025-03-25T00:30:06.00066843Z",
//     },
//   ];

//   console.log("Mock data:", mockData);

//   const dataSorted = mockData.sort((a, b) => {
//     const fieldA = a[params.sortField as keyof StockItem];
//     const fieldB = b[params.sortField as keyof StockItem];
//     if (fieldA < fieldB) return params.sortOrder;
//     if (fieldA > fieldB) return -params.sortOrder;
//     return 0;
//   });
//   const start = (params.page - 1) * params.pageSize;
//   const end = start + params.pageSize;
//   const paginatedData = dataSorted.slice(start, end);
//   const totalRecords = dataSorted.length;
//   const paginatedResponse = {
//     items: paginatedData,
//     page: params.page,
//     totalRecords: totalRecords,
//     order_by: params.sortField,
//   };
//   console.log("Paginated response:", paginatedResponse);

//   return paginatedResponse;
// }

// Función real para conectarse a una API (ejemplo con axios)
import axios from 'axios';

export async function fetchStocks(params: StockQueryParams): Promise<StockResponse> {
  try {
    const response = await axios.get<Response>('/api/v1/stocks', {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        sortField: params.sortField,
        sortOrder: params.sortOrder,
        filters: JSON.stringify(params.filters)
      }
    });

    if (response.data.success) {
      console.log('Response from API:', response.data.data);
      return response.data.data;
    }

    throw new Error('Failed to fetch stocks');
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
}
