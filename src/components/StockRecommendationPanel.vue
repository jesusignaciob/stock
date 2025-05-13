<template>
  <div v-if="stock" class="stock-details">

    <div class="card">
      <h2>{{ stock?.company }} ({{ stock?.ticker }})</h2>
      <Divider />
      <div class="grid-cols-1 gap-2 border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">

        <div class="font-semibold text-gray-700 text-sm uppercase tracking-wider pt-1 flex gap-2 flex-row align-middle">
          <span class="flex-1/2">Position</span>
          <Badge :value="stock.position" severity="info" />
        </div>

        <div class="font-semibold text-gray-700 text-sm uppercase tracking-wider pt-1 flex gap-2 flex-row align-middle">
          <span class="flex-1/2">Score</span>
          <Chip :label="stock.score.toString()" />
        </div>
      </div>
      <Divider />
      <h4>Analisys</h4>
      <Panel header="Análisis">
        <p class="text-lg">{{ stock.rationale }}</p>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StockRecommendation } from '@/types/recommendation';
import { computed } from 'vue';

const props = defineProps<{
  stock: StockRecommendation;
}>();

const scoreRange = computed(() => {
  if (props.stock.score >= 200) return 'high';
  if (props.stock.score >= 150) return 'medium';
  return 'low';
});
</script>

<style scoped>
.stock-details {
  line-height: 1.8;
}

.field {
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

:deep(.p-panel-header) {
  background-color: var(--surface-50);
  font-weight: 600;
}

.ticker-tag {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.score-chip {
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;

  &.score-high {
    background-color: var(--green-500);
  }

  &.score-medium {
    background-color: var(--blue-500);
  }

  &.score-low {
    background-color: var(--orange-500);
  }
}
</style>