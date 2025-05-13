<script setup lang="ts">
import { ref } from 'vue';
import DataTable, { type DataTableFilterEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { useStockStore } from '@/stores/stockStore';
import StockDetailsPanel from '@/components/StockDetailsPanel.vue'

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
const filterTimeout = ref<number>();

const onFilter = (event: DataTableFilterEvent) => {
    clearTimeout(filterTimeout.value);

    filterTimeout.value = setTimeout(() => {
        stockStore.setFilters(event.filters);
    }, 1000);
};

// Filter options
const filterMatchModes = ref([
    { label: 'Contains', value: 'contains' },
    { label: 'Equals', value: 'equals' },
    { label: 'Starts With', value: 'startsWith' },
    { label: 'Ends With', value: 'endsWith' }
]);

// Column filters
const filters = ref({
    ticker: { value: null, matchMode: 'contains' },
    company: { value: null, matchMode: 'contains' },
    brokerage: { value: null, matchMode: 'contains' },
    action: { value: null, matchMode: 'contains' }
});

// Clear all filters
const clearFilters = () => {
    filters.value = {
        ticker: { value: null, matchMode: 'contains' },
        company: { value: null, matchMode: 'contains' },
        brokerage: { value: null, matchMode: 'contains' },
        action: { value: null, matchMode: 'contains' }
    };

    clearTimeout(filterTimeout.value);

    filterTimeout.value = setTimeout(() => {
        stockStore.setFilters(filters.value);
    }, 1000);
};

const actionTypes = ref<string[]>([
    "reiterated by",
    "target lowered by",
    "initiated by",
    "upgraded by"
]);

const getSeverity = (status: string) => {
    switch (status) {
        case 'reiterated by':
            return 'danger';

        case 'target lowered by':
            return 'success';

        case 'initiated by':
            return 'info';

        case 'upgraded by':
            return 'warn';
    }
}

type StockClassification =
    // Por sector/industria
    | 'Tech'
    | 'Biotech'
    | 'Financial'
    | 'Energy'
    | 'Other Sector'

    // Por acción de precio objetivo
    | 'High-Risk Speculative'
    | 'Potential Growth'

    // Por acción de analistas
    | 'Bullish Signal'
    | 'Bearish Signal'
    | 'New Coverage'

    // Por rating
    | 'Analyst Positive'
    | 'Analyst Negative'

    // Clasificación por defecto
    | 'Neutral';

const ALL_CLASSIFICATIONS: StockClassification[] = [
    // Sectoriales
    'Tech',
    'Biotech',
    'Financial',
    'Energy',
    'Other Sector',

    // Precio objetivo
    'High-Risk Speculative',
    'Potential Growth',

    // Acciones analistas
    'Bullish Signal',
    'Bearish Signal',
    'New Coverage',

    // Ratings
    'Analyst Positive',
    'Analyst Negative',

    // Default
    'Neutral'
];

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const visible = ref(false);
const selectedStock = ref<any>(null);

const showDetails = (stock: any) => {
    selectedStock.value = stock;
    visible.value = true;
};
</script>

<template>
    <div class="card">
        <DataTable scrollable scrollHeight="600px" tableStyle="min-width: 126rem" :value="stockStore.stocks"
            :loading="stockStore.loading" :rows="stockStore.pagination.pageSize"
            :totalRecords="stockStore.pagination.totalRecords" lazy paginator removableSort @sort="onSort"
            :filters="filters" filterDisplay="row" :globalFilterFields="['ticker', 'company', 'brokerage', 'action']"
            @page="onPageChange" @filter="onFilter" class="p-datatable-sm">
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilters()" />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['company'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column class="w-12 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-eye" @click="showDetails(data)" severity="secondary" rounded></Button>
                </template>
            </Column>

            <Column class="w-24" field="ticker" header="Ticker" :showFilterMenu="false" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <div class="flex flex-col gap-2">
                        <Dropdown v-model="filterModel.matchMode" :options="filterMatchModes" optionLabel="label"
                            optionValue="value" placeholder="Filter Mode" class="p-col-12 p-mb-2" />
                        <InputText v-model="filterModel.value" @input="filterCallback" placeholder="Search"
                            class="w-full" />
                    </div>
                </template>
            </Column>

            <Column class="w-50" field="company" header="Company" :showFilterMenu="false" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <div class="flex flex-col gap-2">
                        <Dropdown v-model="filterModel.matchMode" :options="filterMatchModes" optionLabel="label"
                            optionValue="value" placeholder="Filter Mode" class="p-col-12 p-mb-2" />
                        <InputText v-model="filterModel.value" @input="filterCallback" placeholder="Search"
                            class="w-full" />
                    </div>
                </template>
            </Column>

            <Column class="w-50" field="brokerage" header="Brokerage" :showFilterMenu="false" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <div class="flex flex-col gap-2">
                        <Dropdown v-model="filterModel.matchMode" :options="filterMatchModes" optionLabel="label"
                            optionValue="value" placeholder="Filter Mode" class="p-col-12 p-mb-2" />
                        <InputText v-model="filterModel.value" @input="filterCallback" placeholder="Search"
                            class="w-full" />
                    </div>
                </template>
            </Column>

            <Column class="w-30" field="action" header="action" :showFilterMenu="false" sortable>
                <template #body="{ data }">
                    <Tag :value="data.action" :severity="getSeverity(data.action)" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="actionTypes"
                        placeholder="Select One" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>

            <Column class="w-50" field="rating_from" header="Rating" sortable>
                <template #body="{ data }">
                    {{ data.rating_from }} → {{ data.rating_to }}
                </template>
            </Column>

            <Column class="w-50" field="target_from" header="Target" sortable>
                <template #body="{ data }">
                    {{ data.target_from }} → {{ data.target_to }}
                </template>
            </Column>

            <Column class="w-24" field="time" header="Date" sortable>
                <template #body="{ data }">
                    {{ formatDate(data.time) }}
                </template>
            </Column>

            <Column class="w-60" field="classifications" header="Classifications">
                <template #body="{ data }">
                    <Chip v-for="(item, index) in data.classifications" :key="index" :label="item" class="mr-2 mb-2" />
                </template>
                <!-- <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="ALL_CLASSIFICATIONS"
                        placeholder="Select classifications" display="chip" />
                </template> -->
            </Column>

            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text @click="stockStore.fetchData" />
            </template>

            <template #paginatorend>
                <span class="text-sm text-color-secondary">
                    Showing {{ stockStore.stocks.length }} of {{ stockStore.pagination.totalRecords }} records
                </span>
            </template>
        </DataTable>

        <Dialog v-model:visible="visible" :header="selectedStock?.company || 'Details'"
            :style="{ width: 'min(90vw, 700px)' }" :modal="true">
            <StockDetailsPanel v-if="selectedStock" :stock="selectedStock" />

            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="visible = false" class="p-button-text" />
            </template>
        </Dialog>
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