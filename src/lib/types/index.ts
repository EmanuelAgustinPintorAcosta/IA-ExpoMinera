// Tipos de usuarios
export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  grade?: string; // Nivel educativo
  subject?: string; // Para docentes
  createdAt: Date;
}

// Herramientas de IA
export type ToolCategory = 'content' | 'planning' | 'assessment' | 'personalization' | 'research';

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  url: string;
  isFree: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCases: string[];
  tags: string[];
  rating: number;
  reviews: number;
}

// Tutoriales
export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  content: string;
  screenshot?: string;
  action?: {
    type: 'click' | 'input' | 'scroll';
    target: string;
    value?: string;
  };
}

export interface Tutorial {
  id: string;
  toolId: string;
  title: string;
  description: string;
  duration: number; // en minutos
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: TutorialStep[];
  completed: boolean;
  progress: number;
}

// Recomendaciones
export interface Recommendation {
  id: string;
  toolId: string;
  userId: string;
  reason: string;
  matchPercentage: number;
  createdAt: Date;
}

// Favoritos
export interface Favorite {
  id: string;
  userId: string;
  toolId: string;
  addedAt: Date;
}

// Sesión de aprendizaje
export interface LearningSession {
  id: string;
  userId: string;
  toolId: string;
  tutorialId: string;
  startedAt: Date;
  completedAt?: Date;
  currentStep: number;
  duration: number; // en segundos
}

// Perfil de usuario
export interface UserProfile {
  user: User;
  favoriteTools: AITool[];
  completedTutorials: Tutorial[];
  recommendations: Recommendation[];
  learningStats: {
    totalToolsExplored: number;
    totalTutorialsCompleted: number;
    totalLearningHours: number;
    averageDifficulty: string;
  };
}
