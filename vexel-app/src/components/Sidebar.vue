<template>
  <nav class="w-16 h-full bg-discord-dark backdrop-blur-xl border-r border-glass-border flex flex-col items-center justify-between py-5">
    <div class="flex flex-col items-center gap-6">
      <button
        v-for="item in navItems"
        :key="item.id"
        :title="item.label"
        :class="['w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200', {
          'bg-discord-blurple text-white': activeView === item.id,
          'text-gray-400 hover:bg-glass-bg hover:text-white': activeView !== item.id
        }]"
        @click="$emit('updateActiveView', item.id)"
      >
        <component :is="item.icon" />
      </button>
    </div>
    <div class="flex flex-col items-center gap-6">
      <button
        v-for="item in bottomItems"
        :key="item.id"
        :title="item.label"
        :class="['w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200', {
          'bg-discord-blurple text-white': activeView === item.id,
          'text-gray-400 hover:bg-glass-bg hover:text-white': activeView !== item.id
        }]"
        @click="$emit('updateActiveView', item.id)"
      >
        <component :is="item.icon" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { MessageIcon, WebhookIcon, UserIcon, SettingsIcon, HelpIcon } from './icons.ts';

defineProps({
  activeView: {
    type: String,
    required: true
  }
});

defineEmits(['updateActiveView']);

const navItems = [
  { id: 'builder', icon: MessageIcon, label: 'Builder' },
  { id: 'webhook', icon: WebhookIcon, label: 'Webhook' },
  { id: 'profile', icon: UserIcon, label: 'Profile' },
];

const bottomItems = [
  { id: 'help', icon: HelpIcon, label: 'Help' },
  { id: 'settings', icon: SettingsIcon, label: 'Settings' },
];
</script>
