<script lang="ts">
  import { notifications } from '../lib/stores';

  type NotificationType = 'success' | 'error' | 'info' | 'warning';

  const iconMap: Record<NotificationType, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  const colorMap: Record<NotificationType, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };
</script>

<div class="fixed bottom-0 right-0 p-4 space-y-2 max-w-md pointer-events-none">
  {#each $notifications as notif (notif.id)}
    <div
      class="border rounded-lg p-4 flex items-center gap-3 animate-fade-in-scale pointer-events-auto {colorMap[
        notif.type
      ]}"
    >
      <span class="text-xl">{iconMap[notif.type]}</span>
      <p class="text-sm font-medium flex-1">{notif.message}</p>
      <button
        on:click={() => {
          notifications.update((n) => n.filter((x) => x.id !== notif.id));
        }}
        class="text-xl opacity-70 hover:opacity-100"
      >
        ×
      </button>
    </div>
  {/each}
</div>
