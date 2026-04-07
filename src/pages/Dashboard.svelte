<script lang="ts">
  import { onMount } from 'svelte';
  import { currentUser, aiTools, selectedCategory, searchQuery } from '../lib/stores';
  import Header from '../components/Header.svelte';
  import ToolCard from '../components/ToolCard.svelte';
  import { aiToolsData, toolCategories } from '../lib/data/aiTools';
  import type { AITool } from '../lib/types';

  let filteredTools: AITool[] = [];
  let currentPage: 'dashboard' | 'tools' | 'tutorial' = 'dashboard';
  let selectedTool: AITool | null = null;

  onMount(() => {
    aiTools.set(aiToolsData);
  });

  $: if ($aiTools.length > 0) {
    filteredTools = $aiTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes($searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes($searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes($searchQuery.toLowerCase()));

      const matchesCategory = !$selectedCategory || tool.category === $selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  function selectTool(tool: AITool) {
    selectedTool = tool;
    currentPage = 'tools';
  }

  function goBack() {
    currentPage = 'dashboard';
    selectedTool = null;
  }
</script>

{#if !$currentUser}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-lg text-gray-800">Cargando...</p>
    </div>
  </div>
{:else if currentPage === 'dashboard'}
  <Header title="IA Educativa" subtitle="Bienvenido/a, {$currentUser.name}">
    <svelte:fragment slot="right">
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="font-semibold text-gray-900">{$currentUser.name}</p>
          <p class="text-sm text-gray-700">
            {$currentUser.role === 'teacher' ? 'Docente' : 'Estudiante'}
          </p>
        </div>
        <div class="w-10 h-10 rounded-full bg-[#c41e3a] flex items-center justify-center text-white font-bold">
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
        {$currentUser.role === 'teacher'
          ? 'Descubre herramientas de IA para mejorar tu enseñanza y crear material educativo innovador.'
          : 'Aprende a usar herramientas de IA para potenciar tu aprendizaje y creatividad.'}
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

    <div class="mb-10">
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
          class="px-4 py-2 rounded-full transition-all {$selectedCategory === null
            ? 'bg-[#c41e3a] text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
        >
          Todas
        </button>
        {#each toolCategories as category}
          <button
            on:click={() => {
              $selectedCategory = $selectedCategory === category.id ? null : category.id;
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
        {filteredTools.length === 1 ? 'herramienta' : 'herramientas'}
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
        <p class="text-gray-800">No se encontraron herramientas que coincidan con tu búsqueda.</p>
      </div>
    {/if}
  </main>
{:else if currentPage === 'tools' && selectedTool}
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
                {selectedTool.isFree ? '🆓 Gratis' : '💵 Pago'}
              </p>
            </div>
            <div>
              <p class="text-sm font-bold text-gray-800 mb-1">Calificación</p>
              <div class="flex items-center gap-2">
                <div class="flex">
                  {#each Array(5) as _, i}
                    <span class="text-lg {i < Math.round(selectedTool.rating) ? '⭐ text-[#ffb81c]' : '☆ text-gray-400'}"></span>
                  {/each}
                </div>
                <span class="text-sm text-gray-800 font-medium">({selectedTool.reviews})</span>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">{selectedTool.name}</h2>

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
                <span class="bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
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