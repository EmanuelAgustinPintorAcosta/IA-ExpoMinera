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
  {
    id: '7',
    name: 'Perplexity',
    description: 'Buscador con IA que ofrece respuestas precisas con fuentes bibliográficas.',
    icon: '🔍',
    category: 'research',
    url: 'https://www.perplexity.ai',
    isFree: true,
    difficulty: 'beginner',
    useCases: [
      'Investigación rápida',
      'Verificación de fuentes',
      'Planificación de clases',
      'Resumen de información',
    ],
    tags: ['investigación', 'búsqueda', 'IA'],
    rating: 4.8,
    reviews: 1500,
  },
];

// Tutoriales de ejemplo
const notebookLMSteps: TutorialStep[] = [
  {
    id: 'step-1',
    title: 'Crear el espacio de trabajo',
    description: 'Ingresá a NotebookLM con tu cuenta de Google. Hacé clic en el botón "+" o "Crear nuevo" para empezar. Dale un nombre claro a tu proyecto, por ejemplo: “Unidad 3: Geografía Argentina - 4° Año”.',
    content: 'Configuración inicial del espacio de trabajo.',
    tip: 'Tip: Usá un cuaderno distinto para cada unidad o proyecto para no mezclar temas.',
    image: '/paso1.png',
  },
  {
    id: 'step-2',
    title: 'Cargar las fuentes',
    description: 'En el panel izquierdo vas a ver el menú "Fuentes". Ahí podés subir los PDFs con la bibliografía de tu materia, pegar links de artículos web o incluso enlaces a videos de YouTube que uses en clase.',
    content: 'Importación de materiales educativos.',
    tip: 'Tip: Podés subir hasta 50 documentos distintos en un solo bloc de notas.',
    image: '/paso2.png',
  },
  {
    id: 'step-3',
    title: 'Aprovechar el análisis automático',
    description: 'Apenas termines de subir tus fuentes, NotebookLM genera automáticamente un "Resumen de las fuentes" y una guía de estudio inicial. Revisá este material base; es excelente para usar como introducción a la clase.',
    content: 'Generación de material base.',
    tip: 'Tip: Hacé clic en "Guía de estudio" arriba a la derecha para ver preguntas frecuentes sugeridas.',
    image: '/paso3.png',
  },
  {
    id: 'step-4',
    title: 'Dialogar con tus documentos',
    description: 'En la barra inferior tenés el cuadro de chat. A diferencia de ChatGPT, acá la IA solo responde basándose en los textos que vos le subiste. Pedile cosas específicas: "Armá 5 preguntas de comprensión lectora sobre el capítulo 2".',
    content: 'Consulta interactiva con documentos.',
    tip: 'Tip: Si la IA te da un dato, te va a poner un numerito. Hacé clic ahí para ver en qué párrafo exacto de tu PDF sacó esa información.',
    image: '/paso4.png',
  },
  {
    id: 'step-5',
    title: 'Guardar y armar la clase',
    description: "Cuando la IA te devuelva un material que te sirva (una rúbrica, una consigna, un resumen), hacé clic en el ícono del pin (la chinche) en la respuesta. Esto lo guarda como una nota fija en tu panel para que la copies y pegues en tu planificación.",
    content: 'Organización de contenidos finales.',
    tip: 'Tip: Juntá varias notas guardadas y pedile a la IA: "Usá estas notas para armarme la secuencia didáctica de la clase de hoy".',
    image: '/paso5.png',
  },
];

const perplexitySteps: TutorialStep[] = [
  {
    id: 'perp-1',
    title: 'Ingresar e iniciar sesión',
    description: 'Entrá a la página oficial de Perplexity desde tu navegador y presioná el botón Iniciar sesión ubicado en la parte superior derecha.',
    content: 'Puedes ingresar con tu cuenta de Google, Apple o correo electrónico.',
    tip: 'Tip: Si vas a usarlo seguido para planificar clases, conviene iniciar sesión para conservar el historial.',
    image: '/perplexity.png'
  },
  {
    id: 'perp-2',
    title: 'Crear una nueva búsqueda',
    description: 'Hacé clic en la barra de búsqueda y escribí una consulta educativa completa, por ejemplo: "Actividades para enseñar el ciclo del agua en primaria".',
    content: 'Perplexity funciona mejor cuando se le hacen preguntas claras y específicas.',
    tip: 'Tip: En vez de escribir solo "ciclo del agua", hacé una pregunta completa para obtener mejores resultados.',
    image: '/perplexity.png'
  },
  {
    id: 'perp-3',
    title: 'Leer la respuesta y revisar fuentes',
    description: 'En pocos segundos aparecerá una respuesta organizada con información resumida y enlaces con las fuentes utilizadas.',
    content: 'Podés hacer clic en las fuentes para ampliar información o verificar que sea adecuada.',
    tip: 'Tip: Revisá siempre las fuentes antes de llevar la información al aula.',
    image: '/perplexity.png'
  },
  {
    id: 'perp-4',
    title: 'Mejorar la planificación con nuevas indicaciones',
    description: 'Debajo de la respuesta pedile ajustes como: "Adaptalo para tercer grado" o "Agregá una actividad grupal".',
    content: 'Perplexity mantiene el contexto y mejora la propuesta anterior.',
    tip: 'Tip: Cuanto más específica sea tu indicación, más útil será la respuesta.',
    image: '/perplexity.png'
  },
  {
    id: 'perp-5',
    title: 'Ejemplo práctico completo',
    description: 'Si necesitás una clase lista para usar, escribí: "Armame una clase de 40 minutos sobre el sistema solar para primaria con inicio, desarrollo y cierre".',
    content: 'Obtendrás una estructura completa que podés adaptar según tu curso.',
    tip: 'Tip: Usá la planificación como base y después personalizala según tus alumnos.',
    image: '/perplexity.png'
  }
];

const canvaSteps: TutorialStep[] = [
  {
    id: 'canva-1',
    title: 'Ingresar e iniciar sesión',
    description: 'Entrá a Canva y presioná el botón Registrarse o Iniciar sesión en la parte superior derecha.',
    content: 'Podés entrar con Google, correo electrónico o cuenta educativa.',
    tip: 'Tip: Si tu institución tiene cuenta educativa, usala para acceder a más recursos.',
    image: '/Canva.png'
  },
  {
    id: 'canva-2',
    title: 'Buscar una plantilla educativa',
    description: 'En la barra de búsqueda escribí: "Presentación escolar" o "Clase primaria". Elegí una plantilla y presioná Personalizar esta plantilla.',
    content: 'Canva mostrará muchas plantillas listas para usar.',
    tip: 'Tip: Elegí diseños simples y coloridos para captar mejor la atención en primaria.',
    image: '/Canva.png'
  },
  {
    id: 'canva-3',
    title: 'Editar textos e imágenes',
    description: 'Hacé clic sobre cualquier texto para cambiarlo y usá el panel Elementos para reemplazar imágenes.',
    content: 'Solo arrastrás la imagen al diseño.',
    tip: 'Tip: Usá frases cortas e imágenes grandes para facilitar la comprensión.',
    image: '/Canva.png'
  },
  {
    id: 'canva-4',
    title: 'Agregar nuevas diapositivas o actividades',
    description: 'Presioná + Agregar página para sumar nuevas hojas para actividades como Verdadero o Falso o Unir con flechas.',
    content: 'Así la presentación no solo explica, también hace participar a los alumnos.',
    tip: 'Tip: Alterná explicación con actividades para mantener la atención del grupo.',
    image: '/Canva.png'
  },
  {
    id: 'canva-5',
    title: 'Usar herramientas con IA (opcional)',
    description: 'En el menú lateral buscá opciones de IA para generación de texto o imágenes.',
    content: 'Pedile crear portadas o generar consignas divertidas.',
    tip: 'Tip: Usá la IA como apoyo, pero revisá siempre el contenido antes de usarlo.',
    image: '/Canva.png'
  },
  {
    id: 'canva-6',
    title: 'Guardar y presentar',
    description: 'Presioná Compartir para presentar en pantalla, descargar en PDF o compartir el enlace.',
    content: 'De esta forma ya queda listo para usar en clase.',
    tip: 'Tip: Si vas a imprimir, descargalo en PDF para conservar mejor el diseño.',
    image: '/Canva.png'
  }
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
    id: 'tut-3',
    toolId: '3',
    title: 'Canva para Docentes',
    description: 'Cómo crear una presentación atractiva para una clase',
    duration: 15,
    difficulty: 'beginner',
    steps: canvaSteps,
    completed: false,
    progress: 0,
  },
  {
    id: 'tut-7',
    toolId: '7',
    title: 'Perplexity para Docentes',
    description: 'Cómo preparar una clase rápida con ayuda de IA',
    duration: 10,
    difficulty: 'beginner',
    steps: perplexitySteps,
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
