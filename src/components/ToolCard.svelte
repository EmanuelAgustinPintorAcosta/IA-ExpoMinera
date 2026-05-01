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
  class="glass p-6 3xl:p-10 rounded-xl hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col"
  on:click={onClick}
  on:keydown
  role="button"
  tabindex="0"
>
  <!-- Header -->
  <div class="flex items-start justify-between mb-3 3xl:mb-6">
    <div class="text-4xl 3xl:text-6xl">{tool.icon}</div>
    <div class="flex gap-2">
      <span
        class="inline-flex items-center gap-1 text-xs 3xl:text-lg px-2 py-1 3xl:px-4 3xl:py-2 rounded-full bg-amber-100 text-amber-800"
        aria-label={`Dificultad ${difficultyValue[tool.difficulty]} de 3`}
      >
        Dificultad
        <span class="flex">
          {#each Array(3) as _, i}
            <span class="3xl:text-xl"
              >{i < difficultyValue[tool.difficulty] ? "★" : "☆"}</span
            >
          {/each}
        </span>
      </span>
      {#if tool.isFree}
        <span
          class="inline-block text-xs 3xl:text-lg px-2 py-1 3xl:px-4 3xl:py-2 rounded-full bg-blue-100 text-blue-800"
        >
          Gratis
        </span>
      {/if}
    </div>
  </div>

  <!-- Title -->
  <h3
    class="text-xl 3xl:text-3xl font-bold text-gray-900 mb-2 3xl:mb-4 group-hover:text-red-600 transition-colors"
  >
    {tool.name}
  </h3>

  <!-- Description -->
  <p class="text-sm 3xl:text-xl text-gray-600 mb-4 3xl:mb-8 line-clamp-2">
    {tool.description}
  </p>

  <!-- Rating -->
  <div class="flex items-center gap-2 mb-4 3xl:mb-8">
    <div class="flex">
      {#each Array(5) as _, i}
        <span
          class="text-lg 3xl:text-2xl {i < Math.round(tool.rating)
            ? '⭐'
            : '☆'}"
        ></span>
      {/each}
    </div>
    <span class="text-sm 3xl:text-xl text-gray-500">({tool.reviews})</span>
  </div>

  <!-- Use Cases -->
  <div class="mb-4 3xl:mb-8">
    <p class="text-xs 3xl:text-lg font-semibold text-gray-700 mb-2 3xl:mb-4">
      Casos de uso:
    </p>
    <ul class="text-xs 3xl:text-lg text-gray-600 space-y-1 3xl:space-y-3">
      {#each tool.useCases.slice(0, 2) as useCase}
        <li>• {useCase}</li>
      {/each}
      {#if tool.useCases.length > 2}
        <li class="text-gray-400">+ {tool.useCases.length - 2} más</li>
      {/if}
    </ul>
  </div>

  <!-- Tags -->
  <div class="flex flex-wrap gap-1 3xl:gap-3">
    {#each tool.tags.slice(0, 2) as tag}
      <span
        class="text-xs 3xl:text-lg bg-gray-100 text-gray-700 px-2 py-1 3xl:px-4 3xl:py-2 rounded-full"
      >
        {tag}
      </span>
    {/each}
  </div>

  <!-- Button -->
  <button
    class="mt-auto w-full py-2 3xl:py-4 3xl:text-xl bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
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
    class="mt-2 w-full py-2 3xl:py-4 3xl:text-xl border rounded-lg font-semibold transition-all {tool.name ===
    'NotebookLM'
      ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
      : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed opacity-60'}"
  >
    {tool.name === "NotebookLM"
      ? "Ver Tutorial interactivo"
      : "Tutorial interactivo (próximamente)"}
  </button>
</div>
