<script lang="ts">
  import type { AITool } from "../lib/types";

  export let tool: AITool;
  export let onClick: (() => void) | null = null;

  const difficultyValue = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  } as const;

  const categoryIcons: Record<string, string> = {
    content: "📚",
    planning: "📋",
    assessment: "📊",
    personalization: "👤",
    research: "🔍",
  };
</script>

<div
  class="glass p-6 [@media(min-width:1921px)]:p-14 rounded-xl [@media(min-width:1921px)]:rounded-3xl hover:shadow-lg transition-all cursor-pointer group"
  on:click={onClick}
  on:keydown
  role="button"
  tabindex="0"
>
  <!-- Header -->
  <div class="flex items-start justify-between mb-3 [@media(min-width:1921px)]:mb-10">
    <div class="text-4xl [@media(min-width:1921px)]:text-8xl">{tool.icon}</div>
    <div class="flex gap-2 [@media(min-width:1921px)]:gap-6">
      <span
        class="inline-flex items-center gap-1 text-xs [@media(min-width:1921px)]:text-2xl px-2 [@media(min-width:1921px)]:px-6 py-1 [@media(min-width:1921px)]:py-3 rounded-full bg-amber-100 text-amber-800"
        aria-label={`Dificultad ${difficultyValue[tool.difficulty]} de 3`}
      >
        Dificultad
        <span class="[@media(min-width:1921px)]:text-3xl">
          {#each Array(3) as _, i}
            <span>{i < difficultyValue[tool.difficulty] ? "★" : "☆"}</span>
          {/each}
        </span>
      </span>
      {#if tool.isFree}
        <span
          class="inline-block text-xs [@media(min-width:1921px)]:text-2xl px-2 [@media(min-width:1921px)]:px-6 py-1 [@media(min-width:1921px)]:py-3 rounded-full bg-blue-100 text-blue-800"
        >
          Gratis
        </span>
      {/if}
    </div>
  </div>

  <!-- Title -->
  <h3
    class="text-xl [@media(min-width:1921px)]:text-5xl font-bold text-gray-900 mb-2 [@media(min-width:1921px)]:mb-6 group-hover:text-red-600 transition-colors"
  >
    {tool.name}
  </h3>

  <!-- Description -->
  <p class="text-sm [@media(min-width:1921px)]:text-3xl text-gray-600 mb-4 [@media(min-width:1921px)]:mb-10 line-clamp-2">{tool.description}</p>

  <!-- Rating -->
  <div class="flex items-center gap-2 [@media(min-width:1921px)]:gap-6 mb-4 [@media(min-width:1921px)]:mb-10">
    <div class="flex">
      {#each Array(5) as _, i}
        <span class="text-lg [@media(min-width:1921px)]:text-4xl {i < Math.round(tool.rating) ? '⭐' : '☆'}"></span>
      {/each}
    </div>
    <span class="text-sm [@media(min-width:1921px)]:text-2xl text-gray-500">({tool.reviews})</span>
  </div>

  <!-- Use Cases -->
  <div class="mb-4 [@media(min-width:1921px)]:mb-10">
    <p class="text-xs [@media(min-width:1921px)]:text-2xl font-semibold text-gray-700 mb-2 [@media(min-width:1921px)]:mb-6">Casos de uso:</p>
    <ul class="text-xs [@media(min-width:1921px)]:text-2xl text-gray-600 space-y-1 [@media(min-width:1921px)]:space-y-4">
      {#each tool.useCases.slice(0, 2) as useCase}
        <li>• {useCase}</li>
      {/each}
      {#if tool.useCases.length > 2}
        <li class="text-gray-400">+ {tool.useCases.length - 2} más</li>
      {/if}
    </ul>
  </div>

  <!-- Tags -->
  <div class="flex flex-wrap gap-1 [@media(min-width:1921px)]:gap-4">
    {#each tool.tags.slice(0, 2) as tag}
      <span class="text-xs [@media(min-width:1921px)]:text-2xl bg-gray-100 text-gray-700 px-2 [@media(min-width:1921px)]:px-8 py-1 [@media(min-width:1921px)]:py-3 rounded-full">
        {tag}
      </span>
    {/each}
  </div>

  <!-- Button -->
  <button
    class="mt-4 [@media(min-width:1921px)]:mt-12 w-full py-2 [@media(min-width:1921px)]:py-8 bg-gray-900 text-white rounded-lg [@media(min-width:1921px)]:rounded-2xl font-semibold [@media(min-width:1921px)]:text-4xl hover:bg-gray-800 transition-all"
  >
    Explorar
  </button>

  <!-- Tutorial Button -->
  <button
    on:click|stopPropagation={() => {
      if (tool.name === "NotebookLM") {
        onClick && onClick();
      }
    }}
    class="mt-2 [@media(min-width:1921px)]:mt-8 w-full py-2 [@media(min-width:1921px)]:py-8 border rounded-lg [@media(min-width:1921px)]:rounded-2xl font-semibold [@media(min-width:1921px)]:text-4xl transition-all {tool.name ===
    'NotebookLM'
      ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
      : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed opacity-60'}"
  >
    {tool.name === "NotebookLM"
      ? "Ver Tutorial interactivo"
      : "Tutorial interactivo (próximamente)"}
  </button>
</div>
