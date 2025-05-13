<template>
  <div class="card">
    <div class="prose max-w-none">
      <h3 class="mb-2 text-lg font-bold">Stock Classification System</h3>
      <p class="mb-3">This algorithm categorizes stocks into three distinct tiers based on quantitative and qualitative factors:</p>
      
      <div class="mt-4 space-y-3">
        <div class="flex items-start">
          <div>
            <h4 class="font-semibold"><Tag value="High" severity="success" /> Potential (200+ points)</h4>
            <p class="text-sm text-gray-600">Stocks demonstrating exceptional growth metrics, strong analyst consensus, and significant upside potential.</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <div>
            <h4 class="font-semibold"><Tag value="Medium" severity="info" /> Potential (150-199 points)</h4>
            <p class="text-sm text-gray-600">Stocks with solid fundamentals and moderate growth prospects, often with recent positive analyst actions.</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <div>
            <h4 class="font-semibold"><Tag value="Low" severity="warn" /> (<150 points)</h4>
            <p class="text-sm text-gray-600">Defensive stocks with lower volatility but limited growth potential, suitable for conservative portfolios.</p>
          </div>
        </div>
      </div>
    </div>

    <Divider />

    <div class="prose max-w-none">
      <h3 class="mb-2 text-lg font-bold">Ranking Calculation</h3>
      <p class="mb-3">The composite score (0-300 points) is calculated using:</p>
      
      <ul class="mb-4 list-disc pl-5 space-y-1">
        <li><strong>Growth Potential (50% weight)</strong>: Price target upside and revenue projections</li>
        <li><strong>Analyst Consensus (30% weight)</strong>: Rating upgrades/downgrades and target adjustments</li>
        <li><strong>Sector Strength (20% weight)</strong>: Industry outlook and competitive positioning</li>
      </ul>
      
      <div class="mt-4 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm font-medium text-blue-800">
          <span class="font-bold">Note:</span> The top stocks are selected based on the highest composite scores, with sector diversification constraints applied.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>