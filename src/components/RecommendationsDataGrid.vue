<script setup lang="ts">
import { useRecommendationStore } from '@/stores/recommendationsStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { storeToRefs } from 'pinia';
import type { StockRecommendation } from '@/types/recommendation';
import StockRecommendationPanel from './StockRecommendationPanel.vue';

const store = useRecommendationStore();
const { showDetails, closeDialog, fetchData } = store;
const { state } = storeToRefs(store);

// Initial fetch
fetchData();

const getScoreRange = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 200) return 'high';
    if (score >= 150) return 'medium';
    return 'low';
};

const scoreClasses = {
  high: 'bg-green-500 text-white font-bold px-3 py-1 rounded-full',
  medium: 'bg-yellow-500 text-gray-800 font-bold px-3 py-1 rounded-full',
  low: 'bg-red-500 text-white font-bold px-3 py-1 rounded-full'
};
</script>

<template>
    <div class="recommendations-container">
        <Card>
            <template #content>
                <ProgressBar v-if="state.loading" mode="indeterminate" class="mb-4" />

                <Message v-if="state.error" severity="error" class="mb-4">
                    {{ state.error }}
                </Message>

                <DataTable :value="state.recommendations" :paginator="true" :rows="10" :loading="state.loading"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" stripedRows>
                    <template #header>
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="text-xl font-bold">Best Investments</span>
                            <Button icon="pi pi-refresh" rounded raised @click="fetchData" :loading="state.loading" />
                        </div>
                    </template>

                    <Column style="width: 120px">
                        <template #body="{ data }: { data: StockRecommendation }">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-outlined"
                                @click="showDetails(data)" v-tooltip.top="'Ver detalles'" />
                        </template>
                    </Column>

                    <Column field="position" header="#" sortable>
                        <template #body="{ data }: { data: StockRecommendation }">
                            <Badge :value="data.position" severity="info" />
                        </template>
                    </Column>

                    <Column field="ticker" header="Ticker" sortable>
                    </Column>

                    <Column field="company" header="Company" sortable />

                    <Column field="score" header="Score" sortable>
                        <template #body="{ data }: { data: StockRecommendation }">
                            <Chip :label="data.score.toString()"
                                :class=scoreClasses[getScoreRange(data.score)] />
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

        <Dialog v-model:visible="state.dialogVisible" :header="state.selectedStock?.company || 'Detalles'"
            :style="{ width: 'min(90vw, 700px)' }" :modal="true">
            <StockRecommendationPanel v-if="state.selectedStock" :stock="state.selectedStock" />

            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>


.recommendations-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
}

.ticker-tag {
    background-color: var(--primary-color);
    color: white;
    min-width: 70px;
    text-align: center;
    font-weight: bold;
}

.score-chip {
    color: white;
    font-weight: bold;
    min-width: 60px;
}

:deep(.p-card-title) {
    font-size: 1.5rem;
    font-weight: 600;
}
</style>