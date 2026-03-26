import { writable } from 'svelte/store';
import type { User, AITool, Tutorial, Favorite } from '../types';

// Store del usuario actual
export const currentUser = writable<User | null>(null);

// Store de herramientas de IA
export const aiTools = writable<AITool[]>([]);

// Store de tutoriales
export const tutorials = writable<Tutorial[]>([]);

// Store de favoritos
export const favorites = writable<Favorite[]>([]);

// Store de estado de carga
export const isLoading = writable(false);

// Store de notificaciones
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const notifications = writable<Notification[]>([]);

// Helper para agregar notificación
export function addNotification(
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'info',
  duration = 3000
) {
  const id = Math.random().toString(36).substr(2, 9);
  notifications.update((n) => [...n, { id, message, type, duration }]);

  if (duration > 0) {
    setTimeout(() => {
      notifications.update((n) => n.filter((notif) => notif.id !== id));
    }, duration);
  }
}

// Store de búsqueda/filtrado
export const searchQuery = writable('');
export const selectedCategory = writable<string | null>(null);
export const selectedDifficulty = writable<string | null>(null);
