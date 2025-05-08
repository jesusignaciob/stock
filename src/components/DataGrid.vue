<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { useStockStore } from '@/stores/stockStore';

const stockStore = useStockStore();

// Initial fetch
stockStore.fetchData();

// Pagination
const onPageChange = (event: any) => {
    stockStore.setPage(event.page + 1); // Paginator is 0-based, our API is 1-based
};

// Sorting
const onSort = (event: any) => {
    console.log('Sorting', event);
    stockStore.setSort(event.sortField, event.sortOrder);
};

// Filters
const filterValues = ref<Record<string, any>>({});
const filterTimeout = ref<number>();

const filterOptions = [
    { label: 'Contains', value: 'contains' },
    { label: 'Equals', value: 'equals' },
    { label: 'Starts With', value: 'startsWith' },
    { label: 'Ends With', value: 'endsWith' }
];

const onFilter = (field: string, value: any, matchMode: string) => {
    clearTimeout(filterTimeout.value);

    filterTimeout.value = setTimeout(() => {
        const newFilters = { ...filterValues.value };

        if (value === null || value === '') {
            delete newFilters[field];
        } else {
            newFilters[field] = { value, matchMode };
        }

        filterValues.value = newFilters;
        stockStore.setFilters(newFilters);
    }, 500);
};

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};
</script>

<template>
    <ThemeSwitcher />
    <div class="card">
        <DataTable :value="stockStore.stocks" :loading="stockStore.loading" :rows="stockStore.pagination.pageSize"
            :totalRecords="stockStore.pagination.totalRecords" lazy paginator removableSort @sort="onSort"
            @page="onPageChange" class="p-datatable-sm">
            <Column field="ticker" header="Ticker" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <div class="flex gap-2">
                        <Dropdown v-model="filterModel.matchMode" :options="filterOptions" optionLabel="label"
                            optionValue="value" placeholder="Match Mode" class="w-10rem" />
                        <InputText v-model="filterModel.value" @input="filterCallback" placeholder="Search"
                            class="w-full" />
                    </div>
                </template>
            </Column>

            <Column field="company" header="Company" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback" placeholder="Search"
                        class="w-full" />
                </template>
            </Column>

            <Column field="brokerage" header="Brokerage" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback" placeholder="Search"
                        class="w-full" />
                </template>
            </Column>

            <Column field="action" header="Action" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback" placeholder="Search"
                        class="w-full" />
                </template>
            </Column>

            <Column field="rating_from" header="Rating" sortable>
                <template #body="{ data }">
                    {{ data.rating_from }} → {{ data.rating_to }}
                </template>
            </Column>

            <Column field="target_from" header="Target" sortable>
                <template #body="{ data }">
                    {{ data.target_from }} → {{ data.target_to }}
                </template>
            </Column>

            <Column field="time" header="Date" sortable>
                <template #body="{ data }">
                    {{ formatDate(data.time) }}
                </template>
            </Column>

            <template #empty>
                <div class="text-center py-4">
                    No records found
                </div>
            </template>

            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text @click="stockStore.fetchData" />
            </template>

            <template #paginatorend>
                <span class="text-sm text-color-secondary">
                    Showing {{ stockStore.stocks.length }} of {{ stockStore.pagination.totalRecords }} records
                </span>
            </template>
        </DataTable>
    </div>
</template>

<style scoped>
.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}
</style>