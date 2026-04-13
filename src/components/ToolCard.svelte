<script lang="ts">
  import type { AITool } from '../lib/types';

  export let tool: AITool;
  export let onClick: (() => void) | null = null;

  const difficultyValue = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  } as const;

  const categoryIcons: Record<string, string> = {
    content: '📚',
    planning: '📋',
    assessment: '📊',
    personalization: '👤',
    research: '🔍',
  };
</script>

<div
  class="glass p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer group"
  on:click={onClick}
  on:keydown
  role="button"
  tabindex="0"
>
  <!-- Header -->
  <div class="flex items-start justify-between mb-3">
    <div class="text-4xl">{tool.icon}</div>
    <div class="flex gap-2">
      <span
        class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800"
        aria-label={`Dificultad ${difficultyValue[tool.difficulty]} de 3`}
      >
        Dificultad
        <span>
          {#each Array(3) as _, i}
            <span>{i < difficultyValue[tool.difficulty] ? '★' : '☆'}</span>
          {/each}
        </span>
      </span>
      {#if tool.isFree}
        <span class="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800"> Gratis </span>
      {/if}
    </div>
  </div>

  <!-- Title -->
  <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
    {tool.name}
  </h3>

  <!-- Description -->
  <p class="text-sm text-gray-600 mb-4 line-clamp-2">{tool.description}</p>

  <!-- Rating -->
  <div class="flex items-center gap-2 mb-4">
    <div class="flex">
      {#each Array(5) as _, i}
        <span class="text-lg {i < Math.round(tool.rating) ? '⭐' : '☆'}"></span>
      {/each}
    </div>
    <span class="text-sm text-gray-500">({tool.reviews})</span>
  </div>

  <!-- Use Cases -->
  <div class="mb-4">
    <p class="text-xs font-semibold text-gray-700 mb-2">Casos de uso:</p>
    <ul class="text-xs text-gray-600 space-y-1">
      {#each tool.useCases.slice(0, 2) as useCase}
        <li>• {useCase}</li>
      {/each}
      {#if tool.useCases.length > 2}
        <li class="text-gray-400">+ {tool.useCases.length - 2} más</li>
      {/if}
    </ul>
  </div>

  <!-- Tags -->
  <div class="flex flex-wrap gap-1">
    {#each tool.tags.slice(0, 2) as tag}
      <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
        {tag}
      </span>
    {/each}
  </div>

  <!-- Button -->
  <button
    class="mt-4 w-full py-2 bg-gradient-primary text-white rounded-lg font-semibold
           hover:shadow-lg transform hover:scale-105 transition-all"
  >
    Explorar
  </button>
</div>
