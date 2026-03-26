<script lang="ts">
  import { currentUser } from '../lib/stores';
  import { addNotification } from '../lib/stores';
  import type { UserRole } from '../lib/types';

  let currentPage: 'role' | 'form' = 'role';
  let selectedRole: UserRole | null = null;
  let formData = {
    name: '',
    email: '',
    grade: '',
    subject: '',
  };

  function selectRole(role: UserRole) {
    selectedRole = role;
    currentPage = 'form';
  }

  function submitForm() {
    if (!formData.name || !formData.email) {
      addNotification('Por favor completa todos los campos', 'error');
      return;
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      role: selectedRole!,
      name: formData.name,
      email: formData.email,
      grade: formData.grade,
      subject: formData.subject,
      createdAt: new Date(),
    };

    currentUser.set(newUser);
    addNotification(`¡Bienvenido, ${formData.name}!`, 'success');
  }

  function goBack() {
    currentPage = 'role';
    selectedRole = null;
  }
</script>

<div class="min-h-screen gradient-primary flex items-center justify-center p-4">
  <div class="max-w-2xl w-full">
    <!-- Role Selection -->
    {#if currentPage === 'role'}
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl font-bold mb-4">IA Educativa</h1>
        <p class="text-xl text-white/90 mb-2">ExpoMinera 2026 - San Juan</p>
        <p class="text-white/70">Descubre y aprende herramientas de IA para mejorar tu aprendizaje</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Teacher Card -->
        <button
          on:click={() => selectRole('teacher')}
          class="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transform
                 hover:-translate-y-2 transition-all duration-300"
        >
          <div class="text-6xl mb-4">👨‍🏫</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Soy Docente</h2>
          <p class="text-gray-600 mb-6">
            Planifica clases, crea material educativo y descubre herramientas para mejorar tu enseñanza.
          </p>
          <div class="flex flex-wrap gap-2 justify-center">
            <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">Planificación</span>
            <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Contenido</span>
            <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">Evaluación</span>
          </div>
          <div class="mt-6 inline-block px-6 py-3 bg-gradient-primary rounded-lg text-white
                      font-bold group-hover:shadow-lg transition-all">
            Continuar →
          </div>
        </button>

        <!-- Student Card -->
        <button
          on:click={() => selectRole('student')}
          class="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transform
                 hover:-translate-y-2 transition-all duration-300"
        >
          <div class="text-6xl mb-4">👨‍🎓</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Soy Estudiante</h2>
          <p class="text-gray-600 mb-6">
            Aprende a usar herramientas de IA para mejorar tu estudio y creatividad.
          </p>
          <div class="flex flex-wrap gap-2 justify-center">
            <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">Aprendizaje</span>
            <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Creatividad</span>
            <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">Investigación</span>
          </div>
          <div class="mt-6 inline-block px-6 py-3 bg-gradient-primary rounded-lg text-white
                      font-bold group-hover:shadow-lg transition-all">
            Continuar →
          </div>
        </button>
      </div>
    {/if}

    <!-- Form -->
    {#if currentPage === 'form' && selectedRole}
      <div class="bg-white rounded-2xl p-8 shadow-2xl animate-fade-in">
        <button
          on:click={goBack}
          class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Atrás
        </button>

        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Cuéntanos sobre ti
        </h2>
        <p class="text-gray-600 mb-8">
          {selectedRole === 'teacher'
            ? 'Información para personalizar tu experiencia como docente'
            : 'Información para personalizar tu experiencia de aprendizaje'}
        </p>

        <form on:submit|preventDefault={submitForm} class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
              Tu Nombre *
            </label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              placeholder="Ej: Juan García"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
                     focus:ring-2 focus:ring-red-600 transition-all"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Tu Email *
            </label>
            <input
              id="email"
              type="email"
              bind:value={formData.email}
              placeholder="ejemplo@correo.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
                     focus:ring-2 focus:ring-red-600 transition-all"
            />
          </div>

          {#if selectedRole === 'teacher'}
            <!-- Subject (for teachers) -->
            <div>
              <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
                Materia que enseñas
              </label>
              <select
                id="subject"
                bind:value={formData.subject}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-red-600 transition-all"
              >
                <option value="">Selecciona una materia</option>
                <option value="math">Matemáticas</option>
                <option value="language">Lengua y Literatura</option>
                <option value="science">Ciencias Naturales</option>
                <option value="social">Ciencias Sociales</option>
                <option value="english">Inglés</option>
                <option value="art">Artes Visuales</option>
                <option value="technology">Tecnología</option>
              </select>
            </div>

            <!-- Grade (for teachers) -->
            <div>
              <label for="grade" class="block text-sm font-semibold text-gray-700 mb-2">
                Nivel que enseñas
              </label>
              <select
                id="grade"
                bind:value={formData.grade}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-red-600 transition-all"
              >
                <option value="">Selecciona un nivel</option>
                <option value="primary">Primaria</option>
                <option value="secondary">Secundaria</option>
              </select>
            </div>
          {:else}
            <!-- Grade (for students) -->
            <div>
              <label for="grade" class="block text-sm font-semibold text-gray-700 mb-2">
                Tu Nivel
              </label>
              <select
                id="grade"
                bind:value={formData.grade}
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-red-600 transition-all"
              >
                <option value="">Selecciona tu nivel</option>
                <option value="primary">Primaria</option>
                <option value="secondary">Secundaria</option>
              </select>
            </div>
          {/if}

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-4 bg-gradient-primary text-white font-bold rounded-lg
                   hover:shadow-lg transform hover:scale-105 transition-all text-lg"
          >
            ¡Comenzar! 🚀
          </button>

          <p class="text-xs text-gray-500 text-center">
            Tu información será guardada localmente para personalizar tu experiencia.
          </p>
        </form>
      </div>
    {/if}
  </div>
</div>
