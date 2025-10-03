<template>
  <div class="flex-1 flex items-start justify-center bg-discord-dark-3 p-8 relative overflow-y-auto">
    <div class="w-full max-w-2xl text-white font-sans text-[16px] leading-relaxed">
      <div class="flex pt-4">
        <img :src="avatarUrl" alt="avatar" class="w-10 h-10 rounded-full mr-4"/>
        <div>
          <div class="flex items-baseline">
            <span class="font-semibold text-white mr-2">{{ username }}</span>
            <span class="text-xs text-gray-400">{{ timestampText }}</span>
          </div>
          <div v-if="messageData.content" class="text-discord-text">{{ messageData.content }}</div>
          <div class="mt-1 bg-discord-dark-2 rounded-lg flex" :style="{ borderColor: embedData.color, borderLeftWidth: embedData.color ? '4px' : '0px' }">
            <div class="p-4 flex-1">
              <div class="grid grid-cols-12 gap-x-4">
                <div class="col-span-12">
                  <div v-if="embedData.author.name" class="flex items-center mb-2">
                    <img v-if="embedData.author.icon_url" :src="embedData.author.icon_url" alt="author icon" class="w-6 h-6 rounded-full mr-2" />
                    <a v-if="embedData.author.url" :href="embedData.author.url" target="_blank" rel="noopener noreferrer" class="font-semibold text-sm hover:underline">{{ embedData.author.name }}</a>
                    <span v-else class="font-semibold text-sm">{{ embedData.author.name }}</span>
                  </div>
                  <div v-if="embedData.title" class="font-bold mb-1">
                    <a v-if="embedData.url" :href="embedData.url" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">{{ embedData.title }}</a>
                    <span v-else>{{ embedData.title }}</span>
                  </div>
                  <div v-if="embedData.description" class="text-sm text-discord-text whitespace-pre-wrap" v-html="renderDescription(embedData.description)"></div>
                  <div v-if="embedData.fields.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                    <template v-for="field in embedData.fields" :key="field.id">
                      <div v-if="field.name && field.value" :class="field.inline ? 'md:col-span-1' : 'col-span-full'">
                        <div class="font-semibold text-sm">{{ field.name }}</div>
                        <div class="text-sm text-discord-text">{{ field.value }}</div>
                      </div>
                    </template>
                  </div>
                </div>
                <div v-if="embedData.thumbnail.url" class="col-span-auto ml-4">
                  <img :src="embedData.thumbnail.url" alt="thumbnail" class="max-w-[80px] max-h-[80px] rounded-lg object-contain"/>
                </div>
              </div>
              <div v-if="embedData.image.url" class="mt-3">
                <img :src="embedData.image.url" alt="embed" class="max-w-full h-auto rounded-lg max-h-80 object-contain"/>
              </div>
              <div v-if="embedData.footer.text || embedData.timestamp" class="flex items-center text-xs text-gray-400 mt-2">
                <img v-if="embedData.footer.icon_url" :src="embedData.footer.icon_url" alt="footer icon" class="w-4 h-4 rounded-full mr-2"/>
                <span>{{ embedData.footer.text }}</span>
                <span v-if="embedData.footer.text && embedData.timestamp" class="mx-1">•</span>
                <span v-if="embedData.timestamp">{{ timestampText }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import type { EmbedData, MessageData } from '../types';

const props = defineProps({
  messageData: {
    type: Object as PropType<MessageData>,
    required: true,
  },
  embedData: {
    type: Object as PropType<EmbedData>,
    required: true
  }
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const getTimestamp = () => {
    const date = new Date();
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

const renderDescription = (text: string) => {
    if (!text) return '';
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    return text.replace(linkRegex, `<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">$1</a>`);
};

const username = computed(() => user.value ? user.value.username : props.messageData.username);
const avatarUrl = computed(() => user.value ? user.value.avatar : props.messageData.avatar_url);
const timestampText = computed(() => getTimestamp());
</script>