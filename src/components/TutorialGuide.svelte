<script lang="ts">
  export let currentStep: number;
  export let totalSteps: number;
  export let stepTitle: string;
  export let stepDescription: string;
  export let stepContent: string;
  export let onNext: (() => void) | null = null;
  export let onPrevious: (() => void) | null = null;
  export let onComplete: (() => void) | null = null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
</script>

<div class="max-w-2xl mx-auto">
  <!-- Progress Bar -->
  <div class="mb-8">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-bold text-white">Paso {currentStep + 1} de {totalSteps}</h2>
      <span class="text-sm text-white/70">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-gradient-primary h-2 rounded-full transition-all duration-300"
        style="width: {((currentStep + 1) / totalSteps) * 100}%"
      ></div>
    </div>
  </div>

  <!-- Step Content -->
  <div class="glass p-8 rounded-xl mb-8">
  <h3 class="text-2xl font-bold text-white mb-2">{stepTitle}</h3>
  <p class="text-white/70 mb-6">{stepDescription}</p>
    <div class="bg-gray-50 p-6 rounded-lg mb-6 border-l-4 border-red-600">
      <p class="text-gray-700 whitespace-pre-wrap">{stepContent}</p>
    </div>
  </div>

  <!-- Navigation Buttons -->
  <div class="flex justify-between gap-4">
    <button
      disabled={isFirstStep}
      on:click={onPrevious}
      class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold
             hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
             transition-all"
    >
      ← Anterior
    </button>

    <div class="flex gap-4">
      <button
        on:click={() => {}}
        class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold
               hover:bg-gray-50 transition-all"
      >
        Saltar Tutorial
      </button>

      <button
        on:click={isLastStep ? onComplete : onNext}
        class="px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold
               hover:shadow-lg transform hover:scale-105 transition-all"
      >
        {isLastStep ? '✓ Completar' : 'Siguiente →'}
      </button>
    </div>
  </div>
</div>
