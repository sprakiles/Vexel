<template>
  <div class="flex-1 flex items-start justify-center bg-discord-dark-3 p-8 overflow-y-auto">
      <div class="w-full max-w-2xl">
          <h1 class="text-3xl font-bold text-white mb-2">Webhook Settings</h1>
          <p class="text-gray-400 mb-8">
              Enter your Discord webhook URL here to send your created embed directly to a channel.
          </p>

          <div class="bg-discord-dark-2 p-6 rounded-lg border border-glass-border space-y-6">
              <div>
                  <label class="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Webhook URL</label>
                  <input 
                      type="text" 
                      :value="webhookUrl"
                      @input="onUrlInput"
                      placeholder="https://discord.com/api/webhooks/..." 
                      class="w-full h-10 bg-discord-dark border border-black/50 rounded-md px-3 text-base text-discord-text focus:ring-2 focus:ring-discord-blurple focus:outline-none transition-all" 
                  />
              </div>
              <div class="flex justify-end gap-4">
                  <button 
                      @click="handleSave"
                      class="h-10 px-5 w-28 flex items-center justify-center bg-gray-600/50 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors"
                  >
                  {{ saveStatus || 'Save URL' }}
                  </button>
                  <button 
                      @click="$emit('sendTest')"
                      :disabled="isSending"
                      class="h-10 px-5 w-44 flex items-center justify-center gap-2 bg-discord-blurple text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <div v-if="isSending" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <template v-else>
                        <SendIcon />
                        <span>Send Test Message</span>
                      </template>
                  </button>
              </div>
          </div>

          <div class="mt-8">
              <h2 class="text-xl font-bold text-white mb-2">How to get a Webhook URL?</h2>
              <ol class="list-decimal list-inside text-gray-400 space-y-2">
                  <li>Open your Discord server settings and go to the "Integrations" tab.</li>
                  <li>Click on "Webhooks" and then "New Webhook".</li>
                  <li>Customize the name and channel, then click "Copy Webhook URL".</li>
                  <li>Paste the URL in the input field above and save it.</li>
              </ol>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SendIcon } from './icons.ts';

const props = defineProps({
    webhookUrl: {
      type: String,
      required: true,
    },
    isSending: {
      type: Boolean,
      default: false,
    }
});

const emit = defineEmits(['updateWebhookUrl', 'sendTest']);

const saveStatus = ref('');

const handleSave = () => {
    localStorage.setItem('webhookUrl', props.webhookUrl);
    saveStatus.value = 'Saved!';
    setTimeout(() => saveStatus.value = '', 2000);
};

const onUrlInput = (event: Event) => {
    emit('updateWebhookUrl', (event.target as HTMLInputElement).value)
}
</script>
