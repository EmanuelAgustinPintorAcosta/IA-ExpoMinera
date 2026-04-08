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
  import type { AITool } from "../lib/types";

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
  const notebookTutorialSteps = [
    {
      title: "Crear el espacio de trabajo",
      description:
        'Ingresá a NotebookLM con tu cuenta de Google. Hacé clic en el botón "+" o "Crear nuevo" para empezar. Dale un nombre claro a tu proyecto, por ejemplo: “Unidad 3: Geografía Argentina - 4° Año”.',
      tip: "Tip: Usá un bloc de notas distinto para cada unidad o proyecto para no mezclar temas.",
      image: "/paso1.png",
    },
    {
      title: 'Cargar la "materia prima"',
      description:
        'En el panel izquierdo vas a ver el menú "Fuentes". Ahí podés subir los PDFs con la bibliografía de tu materia, pegar links de artículos web o incluso enlaces a videos de YouTube que uses en clase.',
      tip: "Tip: Podés subir hasta 50 documentos distintos en un solo bloc de notas.",
      image: "/paso2.png",
    },
    {
      title: "Aprovechar el análisis automático",
      description:
        'Apenas termines de subir tus fuentes, NotebookLM genera automáticamente un "Resumen de las fuentes" y una guía de estudio inicial. Revisá este material base; es excelente para usar como introducción a la clase.',
      tip: 'Tip: Hacé clic en "Guía de estudio" arriba a la derecha para ver preguntas frecuentes sugeridas.',
      image: "/paso3.png",
    },
    {
      title: "Dialogar con tus documentos",
      description:
        'En la barra inferior tenés el cuadro de chat. A diferencia de ChatGPT, acá la IA solo responde basándose en los textos que vos le subiste. Pedile cosas específicas: "Armá 5 preguntas de comprensión lectora sobre el capítulo 2".',
      tip: "Tip: Si la IA te da un dato, te va a poner un numerito. Hacé clic ahí para ver en qué párrafo exacto de tu PDF sacó esa información.",
      image: "/paso4.png",
    },
    {
      title: "Guardar y armar la clase",
      description:
        "Cuando la IA te devuelva un material que te sirva (una rúbrica, una consigna, un resumen), hacé clic en el ícono del pin (la chinche) en la respuesta. Esto lo guarda como una nota fija en tu panel para que la copies y pegues en tu planificación.",
      tip: 'Tip: Juntá varias notas guardadas y pedile a la IA: "Usá estas notas para armarme la secuencia didáctica de la clase de hoy".',
      image: "/paso5.png",
    },
  ];

  function selectTool(tool: AITool) {
    selectedTool = tool;
    currentPage = "tools";
  }

  function goBack() {
    currentPage = "dashboard";
    selectedTool = null;
  }

  function openTutorial() {
    isTutorialOpen = true;
    tutorialStep = 0;
    document.body.style.overflow = "hidden";
  }

  function closeTutorial() {
    isTutorialOpen = false;
    document.body.style.overflow = "";
  }

  function nextStep() {
    if (tutorialStep < notebookTutorialSteps.length - 1) tutorialStep++;
  }

  function prevStep() {
    if (tutorialStep > 0) tutorialStep--;
  }

  $: tutorialProgress =
    ((tutorialStep + 1) / notebookTutorialSteps.length) * 100;
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
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="font-semibold text-gray-900">{$currentUser.name}</p>
          <p class="text-sm text-gray-700">
            {$currentUser.role === "teacher" ? "Docente" : "Estudiante"}
          </p>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-[#c41e3a] flex items-center justify-center text-white font-bold"
        >
          {$currentUser.name[0]}
        </div>
      </div>
    </svelte:fragment>
  </Header>

  <main class="max-w-7xl mx-auto px-4 py-12">
    <div class="glass rounded-xl p-8 mb-12 gradient-dark text-white">
      <h2 class="text-3xl font-bold mb-2 text-white">
        Hola, {$currentUser.name}! 👋
      </h2>
      <p class="text-lg text-white mb-6">
        {$currentUser.role === "teacher"
          ? "Descubre herramientas de IA para mejorar tu enseñanza y crear material educativo innovador."
          : "Aprende a usar herramientas de IA para potenciar tu aprendizaje y creatividad."}
      </p>

      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-white/10 backdrop-blur p-4 rounded-lg">
          <div class="text-3xl font-bold mb-1">6+</div>
          <p class="text-sm text-white/90">Herramientas disponibles</p>
        </div>
        <div class="bg-white/10 backdrop-blur p-4 rounded-lg">
          <div class="text-3xl font-bold mb-1">2+</div>
          <p class="text-sm text-white/90">Tutoriales interactivos</p>
        </div>
        <div class="bg-white/10 backdrop-blur p-4 rounded-lg">
          <div class="text-3xl font-bold mb-1">∞</div>
          <p class="text-sm text-white/90">Posibilidades de aprendizaje</p>
        </div>
      </div>
    </div>

    <!-- Sección Paso a Paso (Tutoriales) -->
    <div class="mb-12">
      <div class="flex items-center gap-2 mb-6">
        <span class="text-2xl">🚀</span>
        <h2 class="text-2xl font-bold text-gray-900">Paso a paso</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        {#each tutorials as item}
          <div
            class="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <p class="text-xs font-bold tracking-[0.2em] text-[#c41e3a] mb-2">
              PASO {item.step}
            </p>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p class="text-sm text-gray-700">{item.text}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-10">
      <div class="flex items-center gap-2 mb-6">
        <span class="text-2xl">🛠️</span>
        <h2 class="text-2xl font-bold text-gray-900">Herramientas</h2>
      </div>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Busca herramientas de IA..."
          bind:value={$searchQuery}
          class="w-full px-6 py-4 border border-gray-400 rounded-xl focus:outline-none
                 focus:ring-2 focus:ring-[#c41e3a] transition-all shadow-sm text-gray-900"
        />
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          on:click={() => ($selectedCategory = null)}
          class="px-4 py-2 rounded-full transition-all {$selectedCategory ===
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
            class="px-4 py-2 rounded-full transition-all flex items-center gap-2 {$selectedCategory ===
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

    <div class="mb-6">
      <p class="text-gray-800">
        Mostrando <strong class="text-gray-900">{filteredTools.length}</strong>
        {filteredTools.length === 1 ? "herramienta" : "herramientas"}
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredTools as tool (tool.id)}
        <ToolCard {tool} onClick={() => selectTool(tool)} />
      {/each}
    </div>

    {#if filteredTools.length === 0}
      <div class="text-center py-12">
        <p class="text-2xl mb-2">🔍</p>
        <p class="text-gray-800">
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

  <main class="max-w-4xl mx-auto px-4 py-12">
    <div class="glass rounded-xl p-8 mb-8 bg-white/95">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <div class="text-7xl mb-6">{selectedTool.icon}</div>
          <div class="space-y-4">
            <div>
              <p class="text-sm font-bold text-gray-800 mb-1">Dificultad</p>
              <span
                class="inline-block px-3 py-1 rounded-full text-sm font-bold {selectedTool.difficulty ===
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
              <p class="text-sm font-bold text-gray-800 mb-1">Costo</p>
              <p class="font-bold text-lg text-gray-900">
                {selectedTool.isFree ? "🆓 Gratis" : "💵 Pago"}
              </p>
            </div>
            <div>
              <p class="text-sm font-bold text-gray-800 mb-1">Calificación</p>
              <div class="flex items-center gap-2">
                <div class="flex">
                  {#each Array(5) as _, i}
                    <span
                      class="text-lg {i < Math.round(selectedTool.rating)
                        ? '⭐ text-[#ffb81c]'
                        : '☆ text-gray-400'}"
                    ></span>
                  {/each}
                </div>
                <span class="text-sm text-gray-800 font-medium"
                  >({selectedTool.reviews})</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            {selectedTool.name}
          </h2>

          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Casos de Uso</h3>
            <ul class="space-y-2">
              {#each selectedTool.useCases as useCase}
                <li class="flex items-start gap-3">
                  <span class="text-[#c41e3a] font-bold mt-1">✓</span>
                  <span class="text-gray-800">{useCase}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Etiquetas</h3>
            <div class="flex flex-wrap gap-2">
              {#each selectedTool.tags as tag}
                <span
                  class="bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              {/each}
            </div>
          </div>

          <div class="flex gap-4">
            <a
              href={selectedTool.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-4 bg-[#c41e3a] text-white rounded-lg font-bold
                     hover:shadow-lg transition-all text-center hover:bg-[#a0182f]"
            >
              Visitar Sitio Oficial →
            </a>
            <button
              on:click={openTutorial}
              class="flex-1 py-4 border-2 border-[#c41e3a] text-[#c41e3a] rounded-lg font-bold
                     hover:bg-[#c41e3a] hover:text-white transition-all"
            >
              Ver Tutorial →
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}

{#if isTutorialOpen}
  <div
    class="fixed inset-0 z-[200] bg-black/90 p-4 md:p-8 flex items-center justify-center backdrop-blur-sm"
    transition:fade={{ duration: 250 }}
  >
    <div
      class="w-full h-full bg-slate-950 flex flex-col md:flex-row overflow-hidden shadow-2xl rounded-3xl border border-white/10"
      transition:scale={{ duration: 400, start: 0.95, opacity: 0 }}
    >
      <!-- Left Sidebar: Instructions -->
      <div
        class="w-full md:w-[400px] lg:w-[450px] bg-slate-900 border-r border-white/10 flex flex-col"
      >
        <!-- Header Info -->
        <div class="p-8 border-b border-white/10">
          <div class="flex items-center justify-between mb-6">
            <div>
              <p
                class="text-xs font-black uppercase tracking-widest text-[#c41e3a] mb-1"
              >
                NotebookLM · Tutorial
              </p>
              <h3 class="text-2xl font-bold text-white">Guía Interactiva</h3>
            </div>
            <button
              on:click={closeTutorial}
              aria-label="Cerrar tutorial"
              class="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <svg
                class="w-6 h-6"
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
            <div class="flex justify-between text-sm font-bold">
              <span class="text-white/60">Progreso del paso</span>
              <span class="text-[#c41e3a]">{Math.round(tutorialProgress)}%</span
              >
            </div>
            <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-[#c41e3a] transition-all duration-500"
                style="width: {tutorialProgress}%"
              ></div>
            </div>
          </div>
        </div>

        <!-- Step Content -->
        <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div
            class="mb-2 inline-block px-3 py-1 bg-[#c41e3a]/10 border border-[#c41e3a]/20 rounded-md"
          >
            <span class="text-xs font-bold text-[#c41e3a]"
              >PASO {tutorialStep + 1} DE {notebookTutorialSteps.length}</span
            >
          </div>
          <h4 class="text-4xl font-black text-white mt-4 mb-6 leading-tight">
            {notebookTutorialSteps[tutorialStep].title}
          </h4>
          <p class="text-xl text-white/80 leading-relaxed mb-8">
            {notebookTutorialSteps[tutorialStep].description}
          </p>

          <div
            class="bg-blue-900/20 border border-blue-400/30 p-6 rounded-2xl relative overflow-hidden group mt-12"
          >
            <div
              class="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity"
            >
              <span class="text-4xl text-blue-400">💡</span>
            </div>
            <p
              class="text-base font-medium relative z-10 leading-relaxed text-blue-100"
            >
              {notebookTutorialSteps[tutorialStep].tip}
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <div class="p-8 bg-slate-950/50 border-t border-white/10 flex gap-4">
          <button
            on:click={prevStep}
            disabled={tutorialStep === 0}
            class="flex-1 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            Anterior
          </button>

          {#if tutorialStep < notebookTutorialSteps.length - 1}
            <button
              on:click={nextStep}
              class="flex-2 py-4 px-8 rounded-xl bg-white text-slate-950 font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              Siguiente →
            </button>
          {:else}
            <button
              on:click={closeTutorial}
              class="flex-2 py-4 px-8 rounded-xl bg-emerald-500 text-slate-950 font-black hover:scale-[1.02] active:scale-95 transition-all"
            >
              Finalizar Tutorial
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
          class="absolute top-8 right-8 z-50 hidden md:flex items-center gap-3 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-full text-white font-bold transition-all backdrop-blur-md"
        >
          <span class="text-sm">Salir del tutorial</span>
          <svg
            class="w-4 h-4"
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

        <div class="w-full h-full relative p-4 md:p-12">
          <div
            class="relative w-full h-full bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-white/5"
          >
            {#if notebookTutorialSteps[tutorialStep].image}
              <img
                src={notebookTutorialSteps[tutorialStep].image}
                alt="Escena del tutorial"
                class="w-full h-full object-contain select-none"
              />
            {:else}
              <div
                class="w-full h-full flex flex-col items-center justify-center text-white/20"
              >
                <span class="text-[10rem] mb-4">💻</span>
                <span class="text-2xl font-bold">Sin previsualización</span>
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
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
