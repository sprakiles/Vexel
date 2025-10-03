<template>
  <div class="flex-1 flex items-start justify-center bg-discord-dark-3 p-8 overflow-y-auto">
    <div v-if="user" class="w-full max-w-2xl text-discord-text">
      <div class="flex items-center gap-6 bg-discord-dark-2 p-6 rounded-lg border border-glass-border mb-6">
        <img :src="user.avatar" alt="User Avatar" class="w-24 h-24 rounded-full border-4 border-discord-dark-3" />
        <div>
          <h1 class="text-3xl font-bold text-white">{{ user.username }}</h1>
          <p class="text-gray-400">#{{ user.discriminator }}</p>
          <p class="text-xs text-gray-500 mt-2">User ID: {{ user.id }}</p>
        </div>
      </div>
      <div class="bg-discord-dark-2 p-6 rounded-lg border border-glass-border mb-6">
        <h2 class="text-lg font-semibold text-white mb-4">Your Stats</h2>
        <div v-if="stats" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
                <p class="text-2xl font-bold text-discord-blurple">{{ stats.embeds_sent }}</p>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Embeds Sent</p>
            </div>
            <div>
                <p class="text-2xl font-bold text-discord-blurple">{{ stats.tests_sent }}</p>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Test Messages</p>
            </div>
        </div>
        <div v-else class="text-center text-gray-400 py-4">
            Loading stats...
        </div>
      </div>
      <div class="flex justify-center">
        <button @click="$emit('logout')" class="h-10 px-6 flex items-center justify-center bg-gray-600/50 text-white rounded-lg text-sm font-semibold hover:bg-red-800/80 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
    <div v-else class="text-center">
      <h2 class="text-2xl font-bold text-white">Profile</h2>
      <p class="text-gray-400 mt-2">Please sign in to view your profile.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';
import apiClient from '../services/api';

interface UserStats {
    embeds_sent: number;
    tests_sent: number;
}
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const stats = ref<UserStats | null>(null);

defineEmits(['logout']);

onMounted(async () => {
    if (user.value) {
        try {
            const response = await apiClient.get('/api/stats');
            stats.value = response.data;
        } catch (error) {
            console.error('Failed to fetch user stats:', error);
        }
    }
});
</script>