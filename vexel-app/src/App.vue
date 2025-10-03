<template>
  <div class="bg-discord-dark-3 text-discord-text font-sans w-screen h-screen overflow-hidden flex">
    <Sidebar :active-view="activeView" @update-active-view="handleUpdateActiveView" />
    <main class="flex-1 flex flex-col">
      <Header :is-sending="isSending" @send-webhook="() => handleSendWebhook(false)" @logout="handleLogout" />
      <div class="flex-1 flex overflow-hidden">
        <template v-if="activeView === 'builder'">
          <ControlPanel :message-data="messageData" :embed-data="embedData" />
          <Preview :message-data="messageData" :embed-data="embedData" />
        </template>
        <WebhookSettings v-else-if="activeView === 'webhook'" :webhook-url="webhookUrl" :is-sending="isSending" @update-webhook-url="handleUpdateWebhookUrl" @send-test="() => handleSendWebhook(true)" />
        <ProfileView v-else-if="activeView === 'profile'" @logout="handleLogout" />
        <SettingsView v-else-if="activeView === 'settings'" />
        <HelpView v-else-if="activeView === 'help'" />
        <div v-else class="flex-1 flex items-center justify-center bg-discord-dark-3 p-8">
            <div class="text-center">
                <h2 class="text-2xl font-bold text-white">Section Not Found</h2>
                <p class="text-gray-400 mt-2">Please select a valid section from the sidebar.</p>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from './stores/user';
import apiClient from './services/api';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import ControlPanel from './components/ControlPanel.vue';
import Preview from './components/Preview.vue';
import WebhookSettings from './components/WebhookSettings.vue';
import SettingsView from './components/SettingsView.vue';
import HelpView from './components/HelpView.vue';
import ProfileView from './components/ProfileView.vue';
import type { EmbedData, MessageData } from './types';

const userStore = useUserStore();
const activeView = ref('builder');
const webhookUrl = ref('');
const isSending = ref(false);

onMounted(() => {
  userStore.fetchUser();
  const savedUrl = localStorage.getItem('webhookUrl');
  if (savedUrl) {
    webhookUrl.value = savedUrl;
  }
});

const handleUpdateActiveView = (view: string) => {
  activeView.value = view;
};

const handleUpdateWebhookUrl = (url: string) => {
  webhookUrl.value = url;
};

const handleLogout = () => {
  userStore.logout();
  activeView.value = 'builder';
};

const messageData = reactive<MessageData>({
  username: "Vexel",
  avatar_url: "https://i.pinimg.com/736x/93/fe/83/93fe839a37bbf47c516078687a39ebdb.jpg",
  content: "This is a sample message!",
});

const embedData = reactive<EmbedData>({
  author: { name: "Author Name", url: "", icon_url: "https://picsum.photos/seed/author/32/32" },
  title: "Embed Title",
  url: "https://google.com",
  description: "This is the embed description. You can use markdown here!",
  color: "#5865F2",
  fields: [
    { id: '1', name: 'Field 1', value: 'Value 1', inline: true },
    { id: '2', name: 'Field 2', value: 'Value 2', inline: true },
    { id: '3', name: 'Field 3', value: 'Value 3', inline: false },
  ],
  thumbnail: { url: 'https://i.pinimg.com/1200x/0c/de/63/0cde63132bb456b13f5d6f28781b7b11.jpg' },
  image: { url: 'https://i.pinimg.com/736x/70/63/1e/70631e06295bae5b469cc9ed64f3c451.jpg' },
  footer: { text: "Footer Text", icon_url: "https://picsum.photos/seed/footer/32/32" },
  timestamp: true,
});

const buildCleanPayload = (msg: MessageData, embed: EmbedData) => {
  const cleanEmbed: any = {};
  if (embed.title) cleanEmbed.title = embed.title;
  if (embed.description) cleanEmbed.description = embed.description;
  if (embed.url) cleanEmbed.url = embed.url;
  if (embed.timestamp) cleanEmbed.timestamp = new Date().toISOString();
  if (embed.color) cleanEmbed.color = parseInt(embed.color.substring(1), 16);
  if (embed.footer?.text) cleanEmbed.footer = { text: embed.footer.text, icon_url: embed.footer.icon_url };
  if (embed.image?.url) cleanEmbed.image = { url: embed.image.url };
  if (embed.thumbnail?.url) cleanEmbed.thumbnail = { url: embed.thumbnail.url };
  if (embed.author?.name) cleanEmbed.author = { name: embed.author.name, url: embed.author.url, icon_url: embed.author.icon_url };
  const validFields = embed.fields.filter(f => f.name && f.value);
  if (validFields.length > 0) {
    cleanEmbed.fields = validFields.map(({name, value, inline}) => ({name, value, inline}));
  }
  const payload: any = {
      username: msg.username,
      avatar_url: msg.avatar_url,
      content: msg.content,
  };
  if (Object.keys(cleanEmbed).length > 0) {
      payload.embeds = [cleanEmbed];
  }
  return payload;
};

const handleSendWebhook = async (isTest: boolean = false) => {
  if (!webhookUrl.value) {
    alert("Please set a webhook URL in the Webhook tab first.");
    activeView.value = 'webhook';
    return;
  }
  isSending.value = true;
  let payload;
  if (isTest) {
    payload = {
      username: "Vexel Test",
      content: "This is a test message from Vexel!",
      embeds: [{
        title: "Webhook Connected!",
        description: "If you see this, your webhook URL is working correctly.",
        color: parseInt("00ff00", 16),
      }]
    }
  } else {
    payload = buildCleanPayload(messageData, embedData);
  }
  try {
    await apiClient.post('/api/send', {
      webhookUrl: webhookUrl.value,
      payload: payload,
    });
    alert("Webhook sent successfully!");
  } catch (error: any) {
    console.error("Webhook Error:", error);
    const errorDetails = error.response?.data?.details?.message || error.response?.data?.message || 'Unknown error.';
    alert(`Error sending webhook: ${errorDetails}`);
  } finally {
    isSending.value = false;
  }
};
</script>