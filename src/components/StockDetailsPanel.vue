<template>
    <div class="card">
        <h2>Stock Details</h2>
        <p class="text-sm text-color-secondary">
            {{ stock?.company }} ({{ stock?.ticker }})
        </p>
        <p class="text-sm text-color-secondary">
            Last updated: {{ stock?.time }}
        </p>
        <Divider />
        <div class="grid-cols-1 gap-2 border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
            <!-- Fila 1 -->
            <div class="font-semibold text-gray-700 text-sm uppercase tracking-wider">
                Target Price
            </div>
            <div class="text-gray-600 text-sm pb-2 border-b border-gray-100">
                {{ stock?.target_from }} → {{ stock?.target_to }}
            </div>

            <!-- Fila 2 -->
            <div class="font-semibold text-gray-700 text-sm uppercase tracking-wider pt-2">
                Rating
            </div>
            <div class="text-gray-600 text-sm pb-2 border-b border-gray-100">
                {{ stock?.rating_from }} → {{ stock?.rating_to }}
            </div>

            <!-- Fila 3 -->
            <div class="font-semibold text-gray-700 text-sm uppercase tracking-wider pt-2">
                Brokerage
            </div>
            <div class="text-gray-600 text-sm">
                {{ stock?.brokerage }}
            </div>
        </div>
        <Divider />
        <h4>Classifications</h4>
        <div class="flex flex-wrap gap-2">
            <Tag v-for="(classification, index) in stock?.classifications" :key="index" :value="classification"
                severity="info" />
        </div>
    </div>
    <Divider />
</template>

<script setup lang="ts">
import type { StockItem } from '@/types/stock';

const props = defineProps<{
    stock: StockItem;
}>();

</script>