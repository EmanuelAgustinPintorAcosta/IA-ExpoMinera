<script lang="ts">
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import {
    currentUser,
    aiTools,
    selectedCategory,
    searchQuery,
  } from "../lib/stores";
  import Header from "../components/Header.svelte";
  import ToolCard from "../components/ToolCard.svelte";
  import { aiToolsData, toolCategories } from "../lib/data/aiTools";
  import { tutorialCatalog } from "../lib/data/tutorialCatalog";
  import type { AITool } from "../lib/types";

  // Mapeo: nombre de herramienta → key del catálogo de tutoriales
  const toolToCatalogKey: Record<string, keyof typeof tutorialCatalog> = {
    'NotebookLM': 'notebooklm',
    'ChatGPT': 'chatgpt',
    'Canva': 'canva',
    'MidJourney': 'magic',
    'Copilot de Microsoft': 'magic',
    'Quizizz': 'wayground',
    'Perplexity': 'perplexity',
  };

  let filteredTools: AITool[] = [];
  let currentPage: "dashboard" | "tools" | "tutorial" = "dashboard";
  let selectedTool: AITool | null = null;

  onMount(() => {
    aiTools.set(aiToolsData);
  });

  $: if ($aiTools.length > 0) {
    filteredTools = $aiTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes($searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes($searchQuery.toLowerCase()) ||
        tool.tags.some((tag) =>
          tag.toLowerCase().includes($searchQuery.toLowerCase()),
        );

      const matchesCategory =
        !$selectedCategory || tool.category === $selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  const tutorials = [
    {
      step: "01",
      title: "Elegí una herramienta",
      text: "Explorá por objetivo: explicar, crear material, evaluar o investigar.",
    },
    {
      step: "02",
      title: "Seguí el tutorial guiado",
      text: "Recorridos breves de 5 a 10 minutos con ejemplos reales de aula.",
    },
    {
      step: "03",
      title: "Aplicá en clase",
      text: "Llevate una actividad lista para usar o adaptar a tu contexto.",
    },
  ];

  let isTutorialOpen = false;
  let tutorialStep = 0;
  let currentTutorialSteps: {title: string; description: string; tip: string; image: string}[] = [];
  let currentTutorialLabel = "";
  let currentTutorialAccent = "";

  function selectTool(tool: AITool) {
    selectedTool = tool;
    currentPage = "tools";
  }

  function goBack() {
    currentPage = "dashboard";
    selectedTool = null;
  }

  // Verifica si la herramienta seleccionada tiene tutorial disponible
  $: hasTutorial = selectedTool ? !!toolToCatalogKey[selectedTool.name] : false;

  function openTutorial() {
    if (selectedTool) {
      const catalogKey = toolToCatalogKey[selectedTool.name];
      if (catalogKey && tutorialCatalog[catalogKey]) {
        const tutorial = tutorialCatalog[catalogKey];
        currentTutorialSteps = [...tutorial.steps];
        currentTutorialLabel = tutorial.label;
        currentTutorialAccent = tutorial.accent;
        isTutorialOpen = true;
        tutorialStep = 0;
        document.body.style.overflow = "hidden";
      } else {
        alert("Tutorial no disponible para esta herramienta.");
      }
    }
  }

  function closeTutorial() {
    isTutorialOpen = false;
    currentTutorialSteps = [];
    document.body.style.overflow = "";
  }

  function nextStep() {
    if (tutorialStep < currentTutorialSteps.length - 1) tutorialStep++;
  }

  function prevStep() {
    if (tutorialStep > 0) tutorialStep--;
  }

  $: tutorialProgress = currentTutorialSteps.length > 0 
    ? ((tutorialStep + 1) / currentTutorialSteps.length) * 100
    : 0;
</script>

{#if !$currentUser}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-lg min-[2000px]:text-4xl text-gray-800">Cargando...</p>
    </div>
  </div>
{:else if currentPage === "dashboard"}
  <Header title="IA Educativa" subtitle="Bienvenido/a, {$currentUser.name}">
    <svelte:fragment slot="right">
      <div class="flex items-center gap-2 md:gap-4 min-[2000px]:gap-8">
        <div class="text-right hidden sm:block">
          <p class="font-semibold text-gray-900 min-[2000px]:text-3xl">{$currentUser.name}</p>
          <p class="text-sm text-gray-700 min-[2000px]:text-xl">
            {$currentUser.role === "teacher" ? "Docente" : "Estudiante"}
          </p>
        </div>
        <div
          class="w-10 h-10 min-[2000px]:w-16 min-[2000px]:h-16 rounded-full bg-[#c41e3a] flex items-center justify-center text-white font-bold shrink-0 min-[2000px]:text-2xl"
        >
          {$currentUser.name[0]}
        </div>
      </div>
    </svelte:fragment>
  </Header>

  <main
    class="w-full max-w-[3840px] w-[95%] mx-auto px-4 md:px-8 min-[2000px]:px-16 py-6 md:py-12 2xl:py-16 min-[2000px]:py-24"
  >
    <div
      class="glass rounded-xl min-[2000px]:rounded-3xl p-6 md:p-8 2xl:p-14 min-[2000px]:p-20 min-[2560px]:p-28 mb-8 md:mb-12 min-[2000px]:mb-20 gradient-dark text-white flex flex-col md:flex-row items-center justify-between gap-8 min-[2000px]:gap-16"
    >
      <div class="flex-1">
        <h2
          class="text-2xl md:text-3xl 2xl:text-5xl min-[2000px]:text-7xl min-[2560px]:text-8xl font-bold mb-2 2xl:mb-6 min-[2000px]:mb-10 text-white"
        >
          Hola, {$currentUser.name}! 👋
        </h2>
        <p
          class="text-base md:text-lg 2xl:text-2xl min-[2000px]:text-4xl min-[2560px]:text-5xl text-white mb-6 2xl:mb-10 min-[2000px]:mb-14 max-w-5xl min-[2000px]:max-w-7xl min-[2560px]:max-w-full leading-relaxed"
        >
          {$currentUser.role === "teacher"
            ? "Descubre herramientas de IA para mejorar tu enseñanza y crear material educativo innovador."
            : "Aprende a usar herramientas de IA para potenciar tu aprendizaje y creatividad."}
        </p>

        <div class="grid md:grid-cols-3 gap-4 2xl:gap-8 min-[2000px]:gap-12">
          <div class="bg-white/10 backdrop-blur p-4 min-[2000px]:p-8 rounded-lg min-[2000px]:rounded-2xl">
            <div class="text-3xl min-[2000px]:text-6xl font-bold mb-1 min-[2000px]:mb-4">6+</div>
            <p class="text-sm min-[2000px]:text-2xl text-white/90">Herramientas disponibles</p>
          </div>
          <div class="bg-white/10 backdrop-blur p-4 min-[2000px]:p-8 rounded-lg min-[2000px]:rounded-2xl">
            <div class="text-3xl min-[2000px]:text-6xl font-bold mb-1 min-[2000px]:mb-4">2+</div>
            <p class="text-sm min-[2000px]:text-2xl text-white/90">Tutoriales interactivos</p>
          </div>
          <div class="bg-white/10 backdrop-blur p-4 min-[2000px]:p-8 rounded-lg min-[2000px]:rounded-2xl">
            <div class="text-3xl min-[2000px]:text-6xl font-bold mb-1 min-[2000px]:mb-4">∞</div>
            <p class="text-sm min-[2000px]:text-2xl text-white/90">Posibilidades de aprendizaje</p>
          </div>
        </div>
      </div>
      <div class="hidden md:block w-full md:w-1/3 xl:w-1/4 min-[2000px]:w-1/3">
        <img
          src="/src/assets/hero.png"
          alt="Hero Illustration"
          class="w-full h-auto object-contain opacity-90 drop-shadow-2xl brightness-110"
        />
      </div>
    </div>

    <!-- Sección Paso a Paso (Tutoriales) -->
    <div class="mb-12 min-[2000px]:mb-24">
      <div class="flex items-center gap-2 min-[2000px]:gap-4 mb-6 min-[2000px]:mb-10">
        <span class="text-2xl min-[2000px]:text-5xl">🚀</span>
        <h2 class="text-2xl min-[2000px]:text-5xl font-bold text-white">Paso a paso</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6 min-[2000px]:gap-12">
        {#each tutorials as item}
          <div
            class="bg-white border border-gray-200 p-6 min-[2000px]:p-10 rounded-xl min-[2000px]:rounded-3xl shadow-sm hover:shadow-md transition-shadow"
          >
            <p class="text-xs min-[2000px]:text-xl font-bold tracking-[0.2em] text-[#c41e3a] mb-2 min-[2000px]:mb-6">
              PASO {item.step}
            </p>
            <h3 class="text-lg min-[2000px]:text-3xl font-bold text-gray-900 mb-2 min-[2000px]:mb-4">{item.title}</h3>
            <p class="text-sm min-[2000px]:text-2xl text-gray-700 leading-relaxed">{item.text}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-10 min-[2000px]:mb-20">
      <div class="flex items-center gap-2 min-[2000px]:gap-4 mb-6 min-[2000px]:mb-10">
        <span class="text-2xl min-[2000px]:text-5xl">🛠️</span>
        <h2 class="text-2xl min-[2000px]:text-5xl font-bold text-white">Herramientas</h2>
      </div>
      <div class="mb-6 min-[2000px]:mb-12">
        <input
          type="text"
          placeholder="Busca herramientas de IA..."
          bind:value={$searchQuery}
          class="w-full px-6 py-4 min-[2000px]:px-10 min-[2000px]:py-8 min-[2000px]:text-3xl border border-gray-400 rounded-xl min-[2000px]:rounded-3xl focus:outline-none
                 focus:ring-2 focus:ring-[#c41e3a] transition-all shadow-sm text-gray-900"
        />
      </div>

      <div class="flex flex-wrap gap-3 min-[2000px]:gap-6">
        <button
          on:click={() => ($selectedCategory = null)}
          class="px-4 py-2 min-[2000px]:px-8 min-[2000px]:py-4 min-[2000px]:text-2xl rounded-full min-[2000px]:rounded-3xl transition-all {$selectedCategory ===
          null
            ? 'bg-[#c41e3a] text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
        >
          Todas
        </button>
        {#each toolCategories as category}
          <button
            on:click={() => {
              $selectedCategory =
                $selectedCategory === category.id ? null : category.id;
            }}
            class="px-4 py-2 min-[2000px]:px-8 min-[2000px]:py-4 min-[2000px]:text-2xl rounded-full min-[2000px]:rounded-3xl transition-all flex items-center gap-2 min-[2000px]:gap-4 {$selectedCategory ===
            category.id
              ? 'bg-[#c41e3a] text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
          >
            <span>{category.icon}</span>
            <span class="text-inherit">{category.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <div class="mb-6 2xl:mb-10 min-[2000px]:mb-16">
      <p class="text-gray-800 2xl:text-xl min-[2000px]:text-3xl">
        Mostrando <strong class="text-gray-900">{filteredTools.length}</strong>
        {filteredTools.length === 1 ? "herramienta" : "herramientas"}
      </p>
    </div>

    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[2000px]:grid-cols-5 min-[2560px]:grid-cols-6 gap-6 2xl:gap-10 min-[2000px]:gap-12"
    >
      {#each filteredTools as tool (tool.id)}
        <ToolCard {tool} onClick={() => selectTool(tool)} />
      {/each}
    </div>

    {#if filteredTools.length === 0}
      <div class="text-center py-12 min-[2000px]:py-24">
        <p class="text-2xl min-[2000px]:text-6xl mb-2 min-[2000px]:mb-6">🔍</p>
        <p class="text-gray-800 min-[2000px]:text-3xl">
          No se encontraron herramientas que coincidan con tu búsqueda.
        </p>
      </div>
    {/if}
  </main>
{:else if currentPage === "tools" && selectedTool}
  <Header
    title={selectedTool.name}
    subtitle={selectedTool.description}
    showBackButton={true}
    onBack={goBack}
  />

  <main class="w-full max-w-4xl 2xl:max-w-7xl min-[2000px]:max-w-[90%] mx-auto px-4 py-12 2xl:py-20 min-[2000px]:py-32">
    <div class="glass rounded-xl min-[2000px]:rounded-3xl p-8 2xl:p-14 min-[2000px]:p-24 mb-8 bg-white/95">
      <div class="grid md:grid-cols-3 gap-8 2xl:gap-16 min-[2000px]:gap-24">
        <div>
          <div class="text-7xl min-[2000px]:text-[10rem] mb-6 min-[2000px]:mb-12">{selectedTool.icon}</div>
          <div class="space-y-4 min-[2000px]:space-y-8">
            <div>
              <p class="text-sm min-[2000px]:text-2xl font-bold text-gray-800 mb-1 min-[2000px]:mb-3">Dificultad</p>
              <span
                class="inline-block px-3 py-1 min-[2000px]:px-6 min-[2000px]:py-3 rounded-full text-sm min-[2000px]:text-2xl font-bold {selectedTool.difficulty ===
                'beginner'
                  ? 'bg-green-200 text-green-900'
                  : selectedTool.difficulty === 'intermediate'
                    ? 'bg-yellow-200 text-yellow-900'
                    : 'bg-red-200 text-red-900'}"
              >
                {selectedTool.difficulty}
              </span>
            </div>
            <div>
              <p class="text-sm min-[2000px]:text-2xl font-bold text-gray-800 mb-1 min-[2000px]:mb-3">Costo</p>
              <p class="font-bold text-lg min-[2000px]:text-4xl text-gray-900">
                {selectedTool.isFree ? "🆓 Gratis" : "💵 Pago"}
              </p>
            </div>
            <div>
              <p class="text-sm min-[2000px]:text-2xl font-bold text-gray-800 mb-1 min-[2000px]:mb-3">Calificación</p>
              <div class="flex items-center gap-2 min-[2000px]:gap-4">
                <div class="flex min-[2000px]:text-4xl">
                  {#each Array(5) as _, i}
                    <span
                      class="text-lg min-[2000px]:text-4xl {i < Math.round(selectedTool.rating)
                        ? '⭐ text-[#ffb81c]'
                        : '☆ text-gray-400'}"
                    ></span>
                  {/each}
                </div>
                <span class="text-sm min-[2000px]:text-2xl text-gray-800 font-medium"
                  >({selectedTool.reviews})</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <h2 class="text-3xl min-[2000px]:text-7xl font-bold text-gray-900 mb-6 min-[2000px]:mb-12">
            {selectedTool.name}
          </h2>

          <div class="mb-8 min-[2000px]:mb-16">
            <h3 class="text-lg min-[2000px]:text-4xl font-bold text-gray-900 mb-3 min-[2000px]:mb-6">Casos de Uso</h3>
            <ul class="space-y-2 min-[2000px]:space-y-4">
              {#each selectedTool.useCases as useCase}
                <li class="flex items-start gap-3 min-[2000px]:gap-5">
                  <span class="text-[#c41e3a] font-bold mt-1 min-[2000px]:mt-2 min-[2000px]:text-3xl">✓</span>
                  <span class="text-gray-800 min-[2000px]:text-3xl leading-relaxed">{useCase}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="mb-8 min-[2000px]:mb-16">
            <h3 class="text-lg min-[2000px]:text-4xl font-bold text-gray-900 mb-3 min-[2000px]:mb-6">Etiquetas</h3>
            <div class="flex flex-wrap gap-2 min-[2000px]:gap-4">
              {#each selectedTool.tags as tag}
                <span
                  class="bg-gray-200 text-gray-900 px-3 py-1 min-[2000px]:px-6 min-[2000px]:py-3 rounded-full text-sm min-[2000px]:text-2xl font-medium"
                >
                  {tag}
                </span>
              {/each}
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-3 md:gap-4 min-[2000px]:gap-8">
            <a
              href={selectedTool.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-3 md:py-4 min-[2000px]:py-8 min-[2000px]:text-3xl bg-[#c41e3a] text-white rounded-lg min-[2000px]:rounded-2xl font-bold
                     hover:shadow-lg transition-all text-center hover:bg-[#a0182f]"
            >
              Visitar Sitio Oficial →
            </a>
            {#if hasTutorial}
              <button
                on:click={openTutorial}
                class="flex-1 py-3 md:py-4 min-[2000px]:py-8 min-[2000px]:text-3xl border-2 min-[2000px]:border-4 border-[#c41e3a] text-[#c41e3a] rounded-lg min-[2000px]:rounded-2xl font-bold
                       hover:bg-[#c41e3a] hover:text-white transition-all"
              >
                Ver Tutorial interactivo
              </button>
            {:else}
              <button
                disabled
                class="flex-1 py-3 md:py-4 min-[2000px]:py-8 min-[2000px]:text-3xl border-2 min-[2000px]:border-4 border-gray-300 text-gray-400 rounded-lg min-[2000px]:rounded-2xl font-bold
                       cursor-not-allowed opacity-60"
              >
                Tutorial (próximamente)
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}

{#if isTutorialOpen}
  <div
    class="fixed inset-0 z-[200] bg-black/90 p-0 md:p-8 min-[2000px]:p-16 flex items-center justify-center backdrop-blur-sm"
    transition:fade={{ duration: 250 }}
  >
    <div
      class="w-full h-full max-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden shadow-2xl md:rounded-3xl min-[2000px]:rounded-[3rem] border-0 md:border md:border-white/10"
      transition:scale={{ duration: 400, start: 0.95, opacity: 0 }}
    >
      <!-- Left Sidebar: Instructions -->
      <div
        class="w-full md:w-[400px] lg:w-[450px] min-[2000px]:w-[800px] min-[2560px]:w-[1000px] bg-slate-900 border-b md:border-b-0 md:border-r border-white/10 flex flex-col flex-1 md:flex-none"
      >
        <div
          class="px-6 py-4 md:px-7 md:py-6 min-[2000px]:px-12 min-[2000px]:py-10 border-b border-white/10 flex-none"
        >
          <div class="flex items-center justify-between mb-3 md:mb-5 min-[2000px]:mb-10">
            <div>
              <p
                class="text-xs min-[2000px]:text-2xl uppercase tracking-[0.2em] text-cyan-200 font-bold mb-1 min-[2000px]:mb-3"
              >
                {currentTutorialLabel} · Guiado
              </p>
              <h3 class="text-xl md:text-2xl min-[2000px]:text-5xl font-bold text-white">
                {selectedTool?.name || "Tutorial"}
              </h3>
            </div>
            <button
              on:click={closeTutorial}
              aria-label="Cerrar tutorial"
              class="p-2 min-[2000px]:p-4 hover:bg-white/10 rounded-lg min-[2000px]:rounded-2xl transition-colors text-white/70 hover:text-white"
            >
              <svg
                class="w-6 h-6 min-[2000px]:w-12 min-[2000px]:h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="space-y-2 min-[2000px]:space-y-4">
            <div class="flex justify-between text-sm min-[2000px]:text-2xl font-bold">
              <span class="text-white/60">Progreso</span>
              <span class="text-[#c41e3a]">{Math.round(tutorialProgress)}%</span>
            </div>
            <div class="h-1.5 min-[2000px]:h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-[#c41e3a] transition-all duration-500"
                style="width: {tutorialProgress}%"
              ></div>
            </div>
          </div>
        </div>

        <div
          class="flex-1 overflow-y-auto px-6 py-4 md:px-7 md:py-5 min-[2000px]:px-12 min-[2000px]:py-10 custom-scrollbar space-y-4 md:space-y-6 min-[2000px]:space-y-12"
        >
          <h4 class="text-2xl md:text-3xl min-[2000px]:text-6xl font-black leading-tight mb-4 min-[2000px]:mb-8">
            <span class="text-cyan-400">Paso {tutorialStep + 1}:</span>
            <span class="text-white"
              >{currentTutorialSteps[tutorialStep].title}</span
            >
          </h4>

          <p class="text-base md:text-lg min-[2000px]:text-3xl leading-snug text-white/80">
            {currentTutorialSteps[tutorialStep].description}
          </p>

          {#if currentTutorialSteps[tutorialStep].tip}
            <div
              class="bg-cyan-400/10 border border-cyan-400/30 p-4 md:p-6 min-[2000px]:p-10 rounded-2xl min-[2000px]:rounded-3xl mt-6 md:mt-8 min-[2000px]:mt-12"
            >
              <p
                class="text-sm md:text-base min-[2000px]:text-2xl font-medium leading-snug text-cyan-100 flex gap-2 md:gap-3 min-[2000px]:gap-6"
              >
                <span class="text-xl md:text-2xl min-[2000px]:text-4xl shrink-0">💡</span>
                {currentTutorialSteps[tutorialStep].tip}
              </p>
            </div>
          {/if}
        </div>

        <div
          class="p-4 md:p-6 min-[2000px]:p-10 bg-slate-950/50 border-t border-white/10 flex-none flex gap-2 md:gap-4 min-[2000px]:gap-8"
        >
          <button
            on:click={prevStep}
            disabled={tutorialStep === 0}
            class="flex-1 py-3 md:py-4 min-[2000px]:py-6 rounded-xl min-[2000px]:rounded-2xl border border-white/20 text-white font-bold text-sm md:text-base min-[2000px]:text-2xl hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            Anterior
          </button>

          {#if tutorialStep < currentTutorialSteps.length - 1}
            <button
              on:click={nextStep}
              class="flex-1 md:flex-2 py-3 md:py-4 min-[2000px]:py-6 px-4 md:px-8 min-[2000px]:px-12 rounded-xl min-[2000px]:rounded-2xl bg-white text-slate-950 font-black text-sm md:text-base min-[2000px]:text-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              Siguiente →
            </button>
          {:else}
            <button
              on:click={closeTutorial}
              class="flex-1 md:flex-2 py-3 md:py-4 min-[2000px]:py-6 px-4 md:px-8 min-[2000px]:px-12 rounded-xl min-[2000px]:rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm md:text-base min-[2000px]:text-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Finalizar
            </button>
          {/if}
        </div>
      </div>

      <!-- Right Side: Interactive Area / Image -->
      <div
        class="flex-1 bg-black relative flex items-center justify-center p-0 overflow-hidden"
      >
        <!-- Background pattern -->
        <div
          class="absolute inset-0 opacity-10 pointer-events-none"
          style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 30px 30px;"
        ></div>

        <!-- Close button for desktop -->
        <button
          on:click={closeTutorial}
          class="absolute top-6 right-6 min-[2000px]:top-12 min-[2000px]:right-12 z-50 hidden md:flex items-center justify-center w-10 h-10 min-[2000px]:w-20 min-[2000px]:h-20 min-[2000px]:text-4xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-full text-white font-bold transition-all backdrop-blur-md"
          aria-label="Cerrar tutorial"
        >
          ✕
        </button>

        <div class="w-full h-full relative p-2 md:p-4 min-[2000px]:p-12">
          <div
            class="relative w-full h-full bg-slate-800 rounded-xl min-[2000px]:rounded-3xl overflow-hidden shadow-2xl border border-white/5"
          >
            {#if currentTutorialSteps[tutorialStep].image}
              <img
                src={currentTutorialSteps[tutorialStep].image}
                alt="Escena del tutorial"
                class="w-full h-full object-contain select-none"
              />
            {:else}
              <div
                class="w-full h-full flex flex-col items-center justify-center text-white/20"
              >
                <span class="text-[10rem] min-[2000px]:text-[15rem] mb-4 min-[2000px]:mb-8">💻</span>
                <span class="text-2xl min-[2000px]:text-5xl font-bold">Sin previsualización</span>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .custom-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>