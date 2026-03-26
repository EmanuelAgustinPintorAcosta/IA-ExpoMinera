import type { AITool, Tutorial, TutorialStep } from '../types';

// Herramientas de IA de ejemplo
export const aiToolsData: AITool[] = [
  {
    id: '1',
    name: 'NotebookLM',
    description: 'Crea documentos interactivos y colaborativos con IA para facilitar el aprendizaje.',
    icon: '📓',
    category: 'content',
    url: 'https://notebooklm.google.com',
    isFree: true,
    difficulty: 'beginner',
    useCases: [
      'Crear resúmenes de textos',
      'Generar preguntas de estudio',
      'Producir podcasts educativos',
      'Hacer análisis de documentos',
    ],
    tags: ['generación de contenido', 'análisis de textos', 'podcast'],
    rating: 4.8,
    reviews: 245,
  },
  {
    id: '2',
    name: 'ChatGPT',
    description: 'Asistente de IA conversacional para explicar conceptos y generar ideas.',
    icon: '💬',
    category: 'content',
    url: 'https://chat.openai.com',
    isFree: true,
    difficulty: 'beginner',
    useCases: [
      'Explicar conceptos difíciles',
      'Generar actividades educativas',
      'Brainstorming de ideas',
      'Corrección de textos',
    ],
    tags: ['conversacional', 'explicación', 'generación de contenido'],
    rating: 4.7,
    reviews: 5000,
  },
  {
    id: '3',
    name: 'Canva',
    description: 'Herramienta de diseño intuitiva para crear materiales visuales atractivos.',
    icon: '🎨',
    category: 'content',
    url: 'https://www.canva.com',
    isFree: true,
    difficulty: 'beginner',
    useCases: ['Crear presentaciones', 'Diseñar infografías', 'Hacer carteles', 'Tarjetas educativas'],
    tags: ['diseño', 'presentaciones', 'visual'],
    rating: 4.6,
    reviews: 3200,
  },
  {
    id: '4',
    name: 'MidJourney',
    description: 'Generador de imágenes con IA para crear ilustraciones personalizadas.',
    icon: '🖼️',
    category: 'content',
    url: 'https://www.midjourney.com',
    isFree: false,
    difficulty: 'intermediate',
    useCases: [
      'Generar ilustraciones',
      'Crear visualizaciones',
      'Diseño de materiales',
      'Conceptos visuales',
    ],
    tags: ['generación de imágenes', 'arte', 'diseño'],
    rating: 4.9,
    reviews: 1800,
  },
  {
    id: '5',
    name: 'Copilot de Microsoft',
    description: 'Asistente de IA para Office que ayuda en la creación de documentos y presentaciones.',
    icon: '🤖',
    category: 'planning',
    url: 'https://www.microsoft.com/copilot',
    isFree: true,
    difficulty: 'beginner',
    useCases: [
      'Crear planes de clase',
      'Generar presentaciones',
      'Redactar documentos',
      'Sugerencias de contenido',
    ],
    tags: ['productividad', 'planificación', 'office'],
    rating: 4.5,
    reviews: 2100,
  },
  {
    id: '6',
    name: 'Quizizz',
    description: 'Plataforma de cuestionarios interactivos con IA para evaluación formativa.',
    icon: '📝',
    category: 'assessment',
    url: 'https://quizizz.com',
    isFree: true,
    difficulty: 'beginner',
    useCases: [
      'Crear cuestionarios',
      'Evaluaciones interactivas',
      'Juegos educativos',
      'Seguimiento de aprendizaje',
    ],
    tags: ['evaluación', 'cuestionarios', 'gamificación'],
    rating: 4.7,
    reviews: 2800,
  },
];

// Tutoriales de ejemplo
const notebookLMSteps: TutorialStep[] = [
  {
    id: 'step-1',
    title: 'Acceder a NotebookLM',
    description: 'Haz clic en el enlace para ir a NotebookLM',
    content: 'Dirígete a notebooklm.google.com y asegúrate de tener una cuenta de Google.',
  },
  {
    id: 'step-2',
    title: 'Crear un nuevo Notebook',
    description: 'Haz clic en "Create New" para empezar',
    content: 'Verás un botón azul "Create New" en la página principal. Haz clic para comenzar.',
  },
  {
    id: 'step-3',
    title: 'Subir tu documento',
    description: 'Sube un PDF o texto para analizar',
    content: 'Puedes arrastrar y soltar archivos o hacer clic para seleccionar desde tu computadora.',
  },
  {
    id: 'step-4',
    title: 'Explorar características',
    description: 'Descubre todas las opciones disponibles',
    content:
      'Utiliza el panel lateral para crear resúmenes, generar preguntas, podcasts y más.',
  },
];

const chatgptSteps: TutorialStep[] = [
  {
    id: 'cgpt-step-1',
    title: 'Acceder a ChatGPT',
    description: 'Ve a chat.openai.com',
    content:
      'Abre tu navegador y dirígete a chat.openai.com. Si es tu primera vez, crea una cuenta.',
  },
  {
    id: 'cgpt-step-2',
    title: 'Iniciar una conversación',
    description: 'Escribe tu primer mensaje',
    content:
      'En la caja de texto inferior, escribe lo que deseas que ChatGPT haga. Presiona Enter.',
  },
  {
    id: 'cgpt-step-3',
    title: 'Dar instrucciones claras',
    description: 'Sé específico con lo que necesitas',
    content: 'Cuanto más detallado seas en tu solicitud, mejores serán los resultados.',
  },
  {
    id: 'cgpt-step-4',
    title: 'Refinar respuestas',
    description: 'Continúa la conversación para mejorar',
    content:
      'Puedes hacer preguntas de seguimiento o pedir que ajuste la respuesta a lo que necesitas.',
  },
];

export const tutorialsData: Tutorial[] = [
  {
    id: 'tut-1',
    toolId: '1',
    title: 'Introducción a NotebookLM',
    description: 'Aprende los conceptos básicos de NotebookLM en 10 minutos',
    duration: 10,
    difficulty: 'beginner',
    steps: notebookLMSteps,
    completed: false,
    progress: 0,
  },
  {
    id: 'tut-2',
    toolId: '2',
    title: 'Primeros pasos con ChatGPT',
    description: 'Domina lo básico de ChatGPT para tareas educativas',
    duration: 8,
    difficulty: 'beginner',
    steps: chatgptSteps,
    completed: false,
    progress: 0,
  },
];

// Categorías de herramientas
export const toolCategories = [
  { id: 'content', label: 'Contenido', icon: '📚', color: 'bg-blue-500' },
  { id: 'planning', label: 'Planificación', icon: '📋', color: 'bg-green-500' },
  { id: 'assessment', label: 'Evaluación', icon: '📊', color: 'bg-purple-500' },
  { id: 'personalization', label: 'Personalización', icon: '👤', color: 'bg-pink-500' },
  { id: 'research', label: 'Investigación', icon: '🔍', color: 'bg-orange-500' },
];

// Niveles educativos
export const educationLevels = [
  { id: 'primary', label: 'Primaria' },
  { id: 'secondary', label: 'Secundaria' },
  { id: 'teacher', label: 'Docente' },
];

// Materias
export const subjects = [
  { id: 'math', label: 'Matemáticas' },
  { id: 'language', label: 'Lengua y Literatura' },
  { id: 'science', label: 'Ciencias Naturales' },
  { id: 'social', label: 'Ciencias Sociales' },
  { id: 'english', label: 'Inglés' },
  { id: 'art', label: 'Artes Visuales' },
  { id: 'technology', label: 'Tecnología' },
];
