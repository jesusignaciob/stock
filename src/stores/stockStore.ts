import { defineStore } from "pinia";
import { ref } from "vue";
import type { StockItem } from "@/api/stockApi";
import { fetchStocks } from "@/api/stockApi";

export const useStockStore = defineStore("stock", () => {
  const stocks = ref<StockItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    page: 1,
    pageSize: 10,
    totalRecords: 0,
  });
  const sortField = ref("ticker");
  const sortOrder = ref(1); // 1 for asc, -1 for desc
  const filters = ref<Record<string, any>>({});

  const fetchData = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await fetchStocks({
        page: pagination.value.page,
        pageSize: pagination.value.pageSize,
        sortField: sortField.value,
        sortOrder: sortOrder.value,
        filters: filters.value,
      });

      stocks.value = response.items;
      pagination.value.totalRecords =
        response.totalRecords || response.items.length;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch stocks";
    } finally {
      loading.value = false;
    }
  };

  const setPage = (page: number) => {
    pagination.value.page = page;
    fetchData();
  };

  const setSort = (field: string, order: number) => {
    sortField.value = field;
    sortOrder.value = order;
    fetchData();
  };

  const setFilters = (newFilters: Record<string, any>) => {
    filters.value = newFilters;
    pagination.value.page = 1; // Reset to first page when filters change
    fetchData();
  };

  return {
    stocks,
    loading,
    error,
    pagination,
    fetchData,
    setPage,
    setSort,
    setFilters,
  };
});
