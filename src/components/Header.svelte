<script lang="ts">
  export let title = 'IA Educativa';
  export let subtitle: string | null = null;
  export let showBackButton = false;
  export let onBack: (() => void) | null = null;
</script>

<header class="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      {#if showBackButton && onBack}
        <button
          on:click={onBack}
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Volver"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      {/if}
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
        {#if subtitle}
          <p class="text-sm text-gray-500">{subtitle}</p>
        {/if}
      </div>
    </div>
    <slot name="right" />
  </div>
</header>
