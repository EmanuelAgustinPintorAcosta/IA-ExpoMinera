<script lang="ts">
  export let title = "IA Educativa";
  export let subtitle: string | null = null;
  export let showBackButton = false;
  export let onBack: (() => void) | null = null;
</script>

<header
  class="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
>
  <div
    class="w-full max-w-7xl 2xl:max-w-none mx-auto pl-6 pr-6 md:pl-16 md:pr-12 lg:pl-24 lg:pr-20 2xl:pl-40 2xl:pr-32 3xl:pl-80 3xl:pr-64 4xl:pl-96 4xl:pr-80 5xl:pl-[32rem] 5xl:pr-96 py-6 md:py-8 3xl:py-16 4xl:py-24 5xl:py-32 flex items-center justify-between"
  >
    <div class="flex items-center gap-3">
      {#if showBackButton && onBack}
        <button
          on:click={onBack}
          class="p-2 3xl:p-4 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Volver"
        >
          <svg
            class="w-6 h-6 3xl:w-16 3xl:h-16 4xl:w-24 4xl:h-24 5xl:w-32 5xl:h-32"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      {/if}
      <div>
        <h1 class="text-2xl 2xl:text-4xl 3xl:text-6xl 4xl:text-[80px] 5xl:text-[120px] font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        {#if subtitle}
          <p class="text-sm 2xl:text-xl 3xl:text-4xl 4xl:text-[50px] 5xl:text-[70px] text-gray-500 mt-1 3xl:mt-4 4xl:mt-6 5xl:mt-8">
            {subtitle}
          </p>
        {/if}
      </div>
    </div>
    <slot name="right" />
  </div>
</header>
