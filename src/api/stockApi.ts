import type { Response } from '@/types/stock'

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
import type { PaginationParams, StockQueryParams, StockResponse } from '@/types/stock';
import axios from 'axios';

function buildPaginationQuery(params: PaginationParams): string {
  const { sortOrder, ...rest } = params;
  const searchParams = new URLSearchParams();
  
  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, String(value));
  });
  
  if (sortOrder) searchParams.append('sortOrder', String(sortOrder));
  
  return `?${searchParams.toString()}`;
}

function prepareFilters<T extends string>(
  rawFilters?: Record<T, { value: any; matchMode: string }>
): Partial<Record<T, { value: any; matchMode: string }>> | undefined {
  
  if (!rawFilters) return undefined;

  return (Object.keys(rawFilters) as T[]).reduce((acc, key) => {
    const filter = rawFilters[key];
    if (filter.value != null && filter.value !== '') {
      acc[key] = {
        value: filter.value,
        matchMode: filter.matchMode
      };
    }
    return acc;
  }, {} as Partial<Record<T, { value: any; matchMode: string }>>);
}

export async function fetchStocks(params: StockQueryParams): Promise<StockResponse> {
  try {
    const filters = prepareFilters(params.filters);
    const response = await axios.post<Response>(`/api/v1/stocks${buildPaginationQuery({ page: params.page, pageSize: params.pageSize, sortField: params.sortField, sortOrder: params.sortOrder })}`, {
      filters: filters
    });

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error('Failed to fetch stocks');
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
}
