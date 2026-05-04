<script lang="ts">
  export let title = 'IA Educativa';
  export let subtitle: string | null = null;
  export let showBackButton = false;
  export let onBack: (() => void) | null = null;
</script>

<header class="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
  <div class="max-w-7xl [@media(min-width:1921px)]:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-4 [@media(min-width:1921px)]:py-24 flex items-center justify-between">
    <div class="flex items-center gap-3 md:gap-5 [@media(min-width:1921px)]:gap-10">
      {#if showBackButton && onBack}
        <button
          on:click={onBack}
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Volver"
        >
          <svg class="w-6 h-6 [@media(min-width:1921px)]:w-12 [@media(min-width:1921px)]:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      {/if}
      
      <img 
        src="/logo.svg" 
        alt="Logo" 
        class="h-10 w-10 [@media(min-width:1921px)]:h-32 [@media(min-width:1921px)]:w-32 object-contain"
      />

      <div class="flex flex-col [@media(min-width:1921px)]:gap-4">
        <h1 class="header-title-giant text-2xl font-bold text-gray-900">{title}</h1>
        {#if subtitle}
          <p class="header-subtitle-giant text-sm text-gray-500">{subtitle}</p>
        {/if}
      </div>
    </div>
    <slot name="right" />
  </div>
</header>

<style>
  @media (min-width: 1900px) {
    .header-title-giant {
      font-size: 8rem !important;
      line-height: 1 !important;
      display: block !important;
    }
    .header-subtitle-giant {
      font-size: 3rem !important;
      margin-top: 1.5rem !important;
      display: block !important;
    }
  }
</style>
