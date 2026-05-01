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
    NotebookLM: "notebooklm",
    ChatGPT: "chatgpt",
    Canva: "canva",
    MidJourney: "magic",
    "Copilot de Microsoft": "magic",
    Quizizz: "wayground",
    Perplexity: "perplexity",
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
  let currentTutorialSteps: {
    title: string;
    description: string;
    tip: string;
    image: string;
  }[] = [];
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

  $: tutorialProgress =
    currentTutorialSteps.length > 0
      ? ((tutorialStep + 1) / currentTutorialSteps.length) * 100
      : 0;
</script>

{#if !$currentUser}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-lg text-gray-800">Cargando...</p>
    </div>
  </div>
{:else if currentPage === "dashboard"}
  <Header title="IA Educativa" subtitle="Bienvenido/a, {$currentUser.name}">
    <svelte:fragment slot="right">
      <div class="flex items-center gap-2 md:gap-4">
        <div class="text-right hidden sm:block">
          <p class="font-semibold text-gray-900">{$currentUser.name}</p>
          <p class="text-sm text-gray-700">
            {$currentUser.role === "teacher" ? "Docente" : "Estudiante"}
          </p>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-[#c41e3a] flex items-center justify-center text-white font-bold shrink-0"
        >
          {$currentUser.name[0]}
        </div>
      </div>
    </svelte:fragment>
  </Header>

  <!-- CAMBIO 1: Eliminamos max-w-[1920px]. Ahora es w-full con padding adaptativo y soporte para ultra-wide -->
  <main
    class="w-full px-6 md:px-12 lg:px-20 2xl:px-32 3xl:px-64 4xl:px-80 5xl:px-96 py-6 md:py-12 2xl:py-16 3xl:py-32"
  >
    <!-- Hero Section -->
    <div
      class="glass w-full rounded-2xl 3xl:rounded-[3rem] p-6 md:p-8 2xl:p-16 3xl:p-32 mb-8 md:mb-12 3xl:mb-24 gradient-dark text-white flex flex-col md:flex-row items-center justify-between gap-8 2xl:gap-16 3xl:gap-20"
    >
      <div class="flex-1 w-full">
        <h2
          class="text-4xl md:text-6xl 2xl:text-7xl 3xl:text-9xl 4xl:text-[10rem] font-black mb-4 2xl:mb-8 3xl:mb-16 text-white leading-tight"
        >
          Hola, {$currentUser.name}! 👋
        </h2>
        <!-- Permitimos que el texto respire ocupando más espacio -->
        <p
          class="text-lg md:text-xl 2xl:text-3xl 3xl:text-5xl 4xl:text-6xl text-white/90 mb-8 2xl:mb-12 3xl:mb-20 max-w-none lg:w-4/5 leading-relaxed"
        >
          {$currentUser.role === "teacher"
            ? "Descubre herramientas de IA para mejorar tu enseñanza y crear material educativo innovador."
            : "Aprende a usar herramientas de IA para potenciar tu aprendizaje y creatividad."}
        </p>

        <!-- Stats Grid con auto-fit para no deformarse en pantallas enormes -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 2xl:gap-8 3xl:gap-12">
          <div
            class="bg-white/10 backdrop-blur p-6 2xl:p-8 3xl:p-16 rounded-2xl"
          >
            <div
              class="text-4xl 2xl:text-6xl 3xl:text-8xl 4xl:text-9xl font-black mb-2"
            >
              6+
            </div>
            <p
              class="text-base 2xl:text-xl 3xl:text-3xl 4xl:text-4xl text-white/90 font-medium"
            >
              Herramientas disponibles
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur p-6 2xl:p-8 3xl:p-16 rounded-2xl"
          >
            <div
              class="text-4xl 2xl:text-6xl 3xl:text-8xl 4xl:text-9xl font-black mb-2"
            >
              2+
            </div>
            <p
              class="text-base 2xl:text-xl 3xl:text-3xl 4xl:text-4xl text-white/90 font-medium"
            >
              Tutoriales interactivos
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur p-6 2xl:p-8 3xl:p-16 rounded-2xl"
          >
            <div
              class="text-4xl 2xl:text-6xl 3xl:text-8xl 4xl:text-9xl font-black mb-2"
            >
              ∞
            </div>
            <p
              class="text-base 2xl:text-xl 3xl:text-3xl 4xl:text-4xl text-white/90 font-medium"
            >
              Posibilidades de aprendizaje
            </p>
          </div>
        </div>
      </div>

      <div
        class="hidden md:flex w-full md:w-1/3 xl:w-1/4 3xl:w-1/3 justify-center"
      >
        <img
          src="/src/assets/hero.png"
          alt="Hero Illustration"
          class="w-full max-w-[500px] 2xl:max-w-[700px] 3xl:max-w-[1000px] h-auto object-contain opacity-90 drop-shadow-2xl brightness-110"
        />
      </div>
    </div>

    <!-- Sección Paso a Paso (Tutoriales) -->
    <div class="mb-12 2xl:mb-20 3xl:mb-40 w-full">
      <div class="flex items-center gap-3 mb-6 2xl:mb-10 3xl:mb-20">
        <span class="text-3xl 2xl:text-5xl 3xl:text-8xl">🚀</span>
        <h2 class="text-2xl 2xl:text-5xl 3xl:text-8xl font-black text-white">
          Paso a paso
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-10 3xl:gap-16">
        {#each tutorials as item}
          <div
            class="bg-white border border-gray-200 p-6 2xl:p-10 3xl:p-20 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full"
          >
            <p
              class="text-xs 2xl:text-sm 3xl:text-2xl font-bold tracking-[0.2em] text-[#c41e3a] mb-3 2xl:mb-4 3xl:mb-10"
            >
              PASO {item.step}
            </p>
            <h3
              class="text-lg 2xl:text-3xl 3xl:text-5xl font-black text-gray-900 mb-3 3xl:mb-8"
            >
              {item.title}
            </h3>
            <p
              class="text-sm 2xl:text-xl 3xl:text-3xl text-gray-700 leading-relaxed"
            >
              {item.text}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Herramientas (Buscador) -->
    <div class="mb-10 2xl:mb-16 3xl:mb-32 w-full">
      <div class="flex items-center gap-3 mb-6 2xl:mb-8 3xl:mb-20">
        <span class="text-3xl 2xl:text-5xl 3xl:text-8xl">🛠️</span>
        <h2 class="text-2xl 2xl:text-5xl 3xl:text-8xl font-black text-white">
          Herramientas
        </h2>
      </div>
      <div class="mb-6 2xl:mb-10 3xl:mb-20">
        <input
          type="text"
          placeholder="Busca herramientas de IA..."
          bind:value={$searchQuery}
          class="w-full px-6 py-4 2xl:px-10 2xl:py-8 3xl:px-16 3xl:py-12 2xl:text-2xl 3xl:text-4xl border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#c41e3a] transition-all shadow-sm text-gray-900"
        />
      </div>

      <div class="flex flex-wrap gap-3 2xl:gap-5 3xl:gap-10">
        <button
          on:click={() => ($selectedCategory = null)}
          class="px-5 py-2.5 2xl:px-8 2xl:py-4 3xl:px-12 3xl:py-8 text-base 2xl:text-lg 3xl:text-4xl rounded-full transition-all font-black {$selectedCategory ===
          null
            ? 'bg-[#c41e3a] text-white shadow-xl scale-110'
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
            class="px-5 py-2.5 2xl:px-8 2xl:py-4 3xl:px-12 3xl:py-8 text-base 2xl:text-lg 3xl:text-4xl rounded-full transition-all flex items-center gap-2 3xl:gap-4 font-black {$selectedCategory ===
            category.id
              ? 'bg-[#c41e3a] text-white shadow-xl scale-110'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
          >
            <span>{category.icon}</span>
            <span class="text-inherit">{category.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Contador de herramientas -->
    <div class="mb-6 2xl:mb-10 w-full">
      <p class="text-gray-800 2xl:text-xl">
        Mostrando <strong class="text-gray-900">{filteredTools.length}</strong>
        {filteredTools.length === 1 ? "herramienta" : "herramientas"}
      </p>
    </div>

    <!-- CAMBIO 2: Grid mágico. auto-fill crea tantas columnas como entren en el ancho disponible de la pantalla. No más espacios vacíos. -->
    <div
      class="w-full grid gap-6 2xl:gap-10 3xl:gap-12"
      style="grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width, 320px), 1fr));"
    >
      <style>
        :root {
          --card-min-width: 320px;
        }
        @media (min-width: 1920px) {
          :root {
            --card-min-width: 450px;
          }
        }
        @media (min-width: 2560px) {
          :root {
            --card-min-width: 600px;
          }
        }
      </style>
      {#each filteredTools as tool (tool.id)}
        <ToolCard {tool} onClick={() => selectTool(tool)} />
      {/each}
    </div>

    {#if filteredTools.length === 0}
      <div class="text-center py-12 2xl:py-20 w-full">
        <p class="text-4xl 2xl:text-6xl mb-4">🔍</p>
        <p class="text-lg 2xl:text-2xl text-gray-800">
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

  <!-- CAMBIO 3: Vista de herramienta al ancho total con padding -->
  <main
    class="w-full px-4 md:px-8 lg:px-12 2xl:px-20 3xl:px-48 mx-auto py-12 2xl:py-20 3xl:py-32"
  >
    <div
      class="glass w-full rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl p-8 lg:p-12 2xl:p-20 3xl:p-32 mb-8 bg-white/95 shadow-xl"
    >
      <div class="grid md:grid-cols-3 gap-8 2xl:gap-16">
        <div>
          <div
            class="text-7xl 2xl:text-[8rem] 3xl:text-[12rem] mb-6 2xl:mb-10 3xl:mb-16"
          >
            {selectedTool.icon}
          </div>
          <div class="space-y-6 2xl:space-y-10 3xl:space-y-16">
            <div>
              <p
                class="text-sm 2xl:text-xl 3xl:text-3xl font-bold text-gray-800 mb-2 3xl:mb-4"
              >
                Dificultad
              </p>
              <span
                class="inline-block px-4 py-2 2xl:px-6 2xl:py-3 3xl:px-10 3xl:py-6 rounded-full text-sm 2xl:text-lg 3xl:text-3xl font-bold {selectedTool.difficulty ===
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
              <p class="text-sm 2xl:text-xl font-bold text-gray-800 mb-2">
                Costo
              </p>
              <p class="font-bold text-xl 2xl:text-3xl text-gray-900">
                {selectedTool.isFree ? "🆓 Gratis" : "💵 Pago"}
              </p>
            </div>
            <div>
              <p class="text-sm 2xl:text-xl font-bold text-gray-800 mb-2">
                Calificación
              </p>
              <div class="flex items-center gap-2">
                <div class="flex text-xl 2xl:text-3xl">
                  {#each Array(5) as _, i}
                    <span
                      class={i < Math.round(selectedTool.rating)
                        ? "⭐ text-[#ffb81c]"
                        : "☆ text-gray-400"}
                    ></span>
                  {/each}
                </div>
                <span class="text-sm 2xl:text-xl text-gray-800 font-medium"
                  >({selectedTool.reviews})</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-2 flex flex-col justify-center">
          <h2
            class="text-4xl 2xl:text-6xl 3xl:text-9xl font-bold text-gray-900 mb-8 2xl:mb-12 3xl:mb-20"
          >
            {selectedTool.name}
          </h2>

          <div class="mb-8 2xl:mb-12 3xl:mb-20">
            <h3
              class="text-xl 2xl:text-3xl 3xl:text-5xl font-bold text-gray-900 mb-4 2xl:mb-6 3xl:mb-10"
            >
              Casos de Uso
            </h3>
            <ul class="space-y-3 2xl:space-y-5 3xl:space-y-8">
              {#each selectedTool.useCases as useCase}
                <li class="flex items-start gap-3 2xl:gap-4 3xl:gap-6">
                  <span
                    class="text-[#c41e3a] font-bold mt-1 2xl:text-2xl 3xl:text-4xl"
                    >✓</span
                  >
                  <span
                    class="text-gray-800 2xl:text-2xl 3xl:text-4xl leading-relaxed"
                    >{useCase}</span
                  >
                </li>
              {/each}
            </ul>
          </div>

          <div class="mb-10 2xl:mb-16">
            <h3
              class="text-xl 2xl:text-3xl font-bold text-gray-900 mb-4 2xl:mb-6"
            >
              Etiquetas
            </h3>
            <div class="flex flex-wrap gap-3 2xl:gap-4">
              {#each selectedTool.tags as tag}
                <span
                  class="bg-gray-200 text-gray-900 px-4 py-2 2xl:px-6 2xl:py-3 rounded-full text-sm 2xl:text-lg font-medium"
                >
                  {tag}
                </span>
              {/each}
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4 2xl:gap-6">
            <a
              href={selectedTool.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-4 2xl:py-6 2xl:text-xl bg-[#c41e3a] text-white rounded-xl font-bold hover:shadow-lg transition-all text-center hover:bg-[#a0182f]"
            >
              Visitar Sitio Oficial →
            </a>
            {#if hasTutorial}
              <button
                on:click={openTutorial}
                class="flex-1 py-4 2xl:py-6 2xl:text-xl border-2 border-[#c41e3a] text-[#c41e3a] rounded-xl font-bold hover:bg-[#c41e3a] hover:text-white transition-all"
              >
                Ver Tutorial interactivo
              </button>
            {:else}
              <button
                disabled
                class="flex-1 py-4 2xl:py-6 2xl:text-xl border-2 border-gray-300 text-gray-400 rounded-xl font-bold cursor-not-allowed opacity-60"
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
    class="fixed inset-0 z-[200] bg-black/90 p-0 md:p-8 2xl:p-12 flex items-center justify-center backdrop-blur-sm"
    transition:fade={{ duration: 250 }}
  >
    <div
      class="w-full h-full max-h-[100vh] md:max-h-[90vh] bg-slate-950 flex flex-col md:flex-row overflow-hidden shadow-2xl md:rounded-3xl border-0 md:border md:border-white/10"
      transition:scale={{ duration: 400, start: 0.95, opacity: 0 }}
    >
      <!-- Menú Lateral -->
      <div
        class="w-full md:w-[400px] lg:w-[450px] 2xl:w-[600px] bg-slate-900 border-b md:border-b-0 md:border-r border-white/10 flex flex-col flex-1 md:flex-none"
      >
        <div
          class="px-6 py-4 md:px-7 md:py-6 2xl:px-10 2xl:py-8 border-b border-white/10 flex-none"
        >
          <div class="flex items-center justify-between mb-3 md:mb-5">
            <div>
              <p
                class="text-xs 2xl:text-sm uppercase tracking-[0.2em] text-cyan-200 font-bold mb-1"
              >
                {currentTutorialLabel} · Guiado
              </p>
              <h3 class="text-xl md:text-2xl 2xl:text-4xl font-bold text-white">
                {selectedTool?.name || "Tutorial"}
              </h3>
            </div>
            <button
              on:click={closeTutorial}
              aria-label="Cerrar tutorial"
              class="p-2 2xl:p-3 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <svg
                class="w-6 h-6 2xl:w-8 2xl:h-8"
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

          <div class="space-y-2">
            <div class="flex justify-between text-sm 2xl:text-base font-bold">
              <span class="text-white/60">Progreso</span>
              <span class="text-[#c41e3a]">{Math.round(tutorialProgress)}%</span
              >
            </div>
            <div
              class="h-1.5 2xl:h-2 w-full bg-white/10 rounded-full overflow-hidden"
            >
              <div
                class="h-full bg-[#c41e3a] transition-all duration-500"
                style="width: {tutorialProgress}%"
              ></div>
            </div>
          </div>
        </div>

        <div
          class="flex-1 overflow-y-auto px-6 py-4 md:px-7 md:py-5 2xl:px-10 2xl:py-8 custom-scrollbar space-y-4 md:space-y-6"
        >
          <h4
            class="text-2xl md:text-3xl 2xl:text-4xl font-black leading-tight mb-4"
          >
            <span class="text-cyan-400">Paso {tutorialStep + 1}:</span>
            <span class="text-white"
              >{currentTutorialSteps[tutorialStep].title}</span
            >
          </h4>

          <p
            class="text-base md:text-lg 2xl:text-2xl leading-snug text-white/80"
          >
            {currentTutorialSteps[tutorialStep].description}
          </p>

          {#if currentTutorialSteps[tutorialStep].tip}
            <div
              class="bg-cyan-400/10 border border-cyan-400/30 p-4 md:p-6 2xl:p-8 rounded-2xl mt-6 md:mt-8"
            >
              <p
                class="text-sm md:text-base 2xl:text-xl font-medium leading-snug text-cyan-100 flex gap-2 md:gap-3"
              >
                <span class="text-xl md:text-2xl 2xl:text-3xl shrink-0">💡</span
                >
                {currentTutorialSteps[tutorialStep].tip}
              </p>
            </div>
          {/if}
        </div>

        <div
          class="p-4 md:p-6 2xl:p-8 bg-slate-950/50 border-t border-white/10 flex-none flex gap-2 md:gap-4"
        >
          <button
            on:click={prevStep}
            disabled={tutorialStep === 0}
            class="flex-1 py-3 md:py-4 2xl:py-5 rounded-xl border border-white/20 text-white font-bold text-sm md:text-base 2xl:text-lg hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            Anterior
          </button>

          {#if tutorialStep < currentTutorialSteps.length - 1}
            <button
              on:click={nextStep}
              class="flex-1 md:flex-2 py-3 md:py-4 2xl:py-5 px-4 md:px-8 rounded-xl bg-white text-slate-950 font-black text-sm md:text-base 2xl:text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              Siguiente →
            </button>
          {:else}
            <button
              on:click={closeTutorial}
              class="flex-1 md:flex-2 py-3 md:py-4 2xl:py-5 px-4 md:px-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm md:text-base 2xl:text-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Finalizar
            </button>
          {/if}
        </div>
      </div>

      <!-- Imagen Interactiva -->
      <div
        class="flex-1 bg-black relative flex items-center justify-center p-0 overflow-hidden"
      >
        <div
          class="absolute inset-0 opacity-10 pointer-events-none"
          style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 30px 30px;"
        ></div>

        <button
          on:click={closeTutorial}
          class="absolute top-6 right-6 2xl:top-10 2xl:right-10 z-50 hidden md:flex items-center justify-center w-10 h-10 2xl:w-14 2xl:h-14 bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-full text-white font-bold 2xl:text-2xl transition-all backdrop-blur-md"
        >
          ✕
        </button>

        <div class="w-full h-full relative p-2 md:p-4 2xl:p-8">
          <div
            class="relative w-full h-full bg-slate-800 rounded-xl 2xl:rounded-2xl overflow-hidden shadow-2xl border border-white/5"
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
                <span class="text-[10rem] 2xl:text-[15rem] mb-4">💻</span>
                <span class="text-2xl 2xl:text-4xl font-bold"
                  >Sin previsualización</span
                >
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
