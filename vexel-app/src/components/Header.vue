<template>
  <header class="flex-shrink-0 h-16 bg-discord-dark-3 border-b border-glass-border flex items-center justify-between px-6 z-10">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <AppLogo />
        <h1 class="text-xl font-bold text-white tracking-tighter">Vexel</h1>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div 
        v-if="user" 
        @click="$emit('logout')" 
        class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
        title="Sign Out"
      >
        <img :src="user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full" />
        <div class="text-sm">
          <div class="font-semibold text-white">{{ user.username }}</div>
          <div class="text-xs text-gray-400">#{{ user.discriminator }}</div>
        </div>
      </div>
      <a 
        v-else
        :href="`${apiUrl}/api/auth/discord`"
        class="h-9 px-4 flex items-center gap-2 bg-discord-blurple text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
        <DiscordIcon />
        <span>Sign in with Discord</span>
      </a>
      <button 
        @click="$emit('sendWebhook')"
        :disabled="isSending"
        class="h-9 px-4 w-36 flex items-center justify-center gap-2 bg-gray-600/50 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div v-if="isSending" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <template v-else>
          <SendIcon />
          <span>Send Webhook</span>
        </template>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';
import { AppLogo, DiscordIcon, SendIcon } from './icons';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const apiUrl = import.meta.env.VITE_API_BASE_URL;

defineProps({
  isSending: {
    type: Boolean,
    default: false
  }
});
defineEmits(['logout', 'sendWebhook']);
</script>