<template>
  <div class="w-[400px] flex-shrink-0 h-full bg-discord-dark-2 backdrop-blur-lg border-r border-glass-border overflow-y-auto">
    <details class="border-b border-glass-border" open>
      <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Message Content</span>
        </div>
        <div class="flex items-center gap-2">
          <ChevronDownIcon class="text-gray-500 chevron-icon" />
        </div>
      </summary>
      <div class="p-4 space-y-4">
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1">Content</label>
          <textarea v-model="messageData.content" placeholder="Message content here..." rows="4" class="w-full bg-black/30 border border-glass-border rounded-md p-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none resize-y" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1">Username</label>
          <input type="text" v-model="messageData.username" class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1">Avatar URL</label>
          <input type="text" v-model="messageData.avatar_url" placeholder="https://..." class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" />
        </div>
      </div>
    </details>

    <details class="border-b border-glass-border">
      <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Embed Author</span>
        <ChevronDownIcon class="text-gray-500 chevron-icon" />
      </summary>
      <div class="p-4 space-y-4">
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Name</label><input type="text" v-model="embedData.author.name" class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Author URL</label><input type="text" v-model="embedData.author.url" placeholder="https://..." class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Icon URL</label><input type="text" v-model="embedData.author.icon_url" placeholder="https://..." class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
      </div>
    </details>

    <details class="border-b border-glass-border" open>
      <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Embed Body</span>
        <ChevronDownIcon class="text-gray-500 chevron-icon" />
      </summary>
      <div class="p-4 space-y-4">
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Title</label><input type="text" v-model="embedData.title" class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Title URL</label><input type="text" v-model="embedData.url" placeholder="https://..." class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea v-model="embedData.description" rows="4" class="w-full bg-black/30 border border-glass-border rounded-md p-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none resize-y" /></div>
        <div class="flex items-center gap-4">
          <label for="embedColor" class="block text-xs font-medium text-gray-400">Color</label>
          <input type="color" id="embedColor" v-model="embedData.color" class="w-8 h-8 rounded border border-glass-border" />
          <div class="flex-1"><input type="text" v-model="embedData.color" class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        </div>
      </div>
    </details>
    
    <details class="border-b border-glass-border">
      <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Fields</span>
        <div class="flex items-center gap-2">
          <button @click="addField" class="text-gray-400 hover:text-white"><PlusIcon /></button>
          <ChevronDownIcon class="text-gray-500 chevron-icon" />
        </div>
      </summary>
      <div class="p-4 space-y-4">
        <div v-for="(field, index) in embedData.fields" :key="field.id" class="p-3 bg-black/20 rounded-lg space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-semibold">Field {{ index + 1 }}</span>
            <button @click="removeField(field.id)" class="text-gray-500 hover:text-red-500"><TrashIcon /></button>
          </div>
          <div><label class="block text-xs font-medium text-gray-400 mb-1">Name</label><input type="text" v-model="field.name" class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
          <div><label class="block text-xs font-medium text-gray-400 mb-1">Value</label><input type="text" v-model="field.value" class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Inline</span>
            <button @click="field.inline = !field.inline" :class="['relative inline-flex h-5 w-9 items-center rounded-full transition-colors', field.inline ? 'bg-discord-blurple' : 'bg-gray-600']">
              <span :class="['inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform', field.inline ? 'translate-x-5' : 'translate-x-0.5']" />
            </button>
          </div>
        </div>
      </div>
    </details>

    <details class="border-b border-glass-border">
      <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Images</span>
        <ChevronDownIcon class="text-gray-500 chevron-icon" />
      </summary>
      <div class="p-4 space-y-4">
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Thumbnail URL</label><input type="text" v-model="embedData.thumbnail.url" placeholder="https://..." class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Image URL</label><input type="text" v-model="embedData.image.url" placeholder="https://..." class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
      </div>
    </details>

    <details class="border-b border-glass-border">
      <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Footer</span>
        <ChevronDownIcon class="text-gray-500 chevron-icon" />
      </summary>
      <div class="p-4 space-y-4">
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Footer Text</label><input type="text" v-model="embedData.footer.text" class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        <div><label class="block text-xs font-medium text-gray-400 mb-1">Footer Icon URL</label><input type="text" v-model="embedData.footer.icon_url" placeholder="https://..." class="w-full h-8 bg-black/30 border border-glass-border rounded-md px-2 text-sm focus:ring-2 focus:ring-discord-blurple focus:outline-none" /></div>
        <div class="flex items-center justify-between">
          <span class="text-sm">Timestamp</span>
          <button @click="embedData.timestamp = !embedData.timestamp" :class="['relative inline-flex h-5 w-9 items-center rounded-full transition-colors', embedData.timestamp ? 'bg-discord-blurple' : 'bg-gray-600']">
            <span :class="['inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform', embedData.timestamp ? 'translate-x-5' : 'translate-x-0.5']" />
          </button>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { ChevronDownIcon, PlusIcon, TrashIcon } from './icons.ts';
import type { EmbedData, MessageData, EmbedField } from '../App.vue';

const props = defineProps({
  messageData: {
    type: Object as PropType<MessageData>,
    required: true
  },
  embedData: {
    type: Object as PropType<EmbedData>,
    required: true
  }
});

const addField = () => {
  const newField: EmbedField = { id: Date.now().toString(), name: '', value: '', inline: false };
  props.embedData.fields.push(newField);
};

const removeField = (id: string) => {
  props.embedData.fields = props.embedData.fields.filter(f => f.id !== id);
};
</script>