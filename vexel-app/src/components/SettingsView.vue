<template>
  <div class="flex-1 flex items-start justify-center bg-discord-dark-3 p-8 overflow-y-auto">
    <div class="w-full max-w-2xl text-discord-text">
      <h1 class="text-3xl font-bold text-white mb-2">Settings</h1>
      <p class="text-gray-400 mb-8">
        Manage your application settings and data.
      </p>
      <div class="bg-discord-dark-2 p-6 rounded-lg border border-glass-border mb-6">
        <h2 class="text-lg font-semibold text-white mb-4">Appearance</h2>
        <div class="flex items-center justify-between">
          <label for="theme-select" class="text-sm font-medium text-gray-300">Theme</label>
          <div class="relative">
            <select id="theme-select" class="w-48 h-10 bg-discord-dark border border-black/50 rounded-md pl-3 pr-8 text-base text-discord-text focus:ring-2 focus:ring-discord-blurple focus:outline-none appearance-none">
              <option>Vexel Dark</option>
              <option disabled>Light (Coming Soon)</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div class="bg-discord-dark-2 p-6 rounded-lg border border-glass-border">
        <h2 class="text-lg font-semibold text-white mb-4">Data Management</h2>
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-300">Clear Local Data</p>
            <p class="text-xs text-gray-400 mt-1">This will remove your saved webhook URL. This action cannot be undone.</p>
          </div>
          <button @click="clearLocalStorage" class="h-10 px-5 w-44 flex items-center justify-center bg-red-800/50 text-white rounded-lg text-sm font-semibold hover:bg-red-800/80 transition-colors">
            {{ clearStatus || 'Clear Data' }}
          </button>
        </div>
      </div>

      <div class="text-center mt-12 text-xs text-gray-500">
        Vexel Version 1.0.0
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDownIcon } from './icons';

const clearStatus = ref('');

const clearLocalStorage = () => {
  if (confirm('Are you sure you want to clear all saved data?')) {
    localStorage.removeItem('webhookUrl');
    clearStatus.value = 'Cleared!';
    setTimeout(() => {
      clearStatus.value = '';
      window.location.reload();
    }, 2000);
  }
};
</script>