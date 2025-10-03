<template>
  <div class="flex-1 flex items-start justify-center bg-discord-dark-3 p-8 overflow-y-auto">
    <div class="w-full max-w-2xl text-discord-text">
      <h1 class="text-3xl font-bold text-white mb-2">Help & FAQ</h1>
      <p class="text-gray-400 mb-8">
        Find answers to common questions about Vexel and Discord webhooks.
      </p>

      <div class="space-y-4">
        <details class="bg-discord-dark-2 p-4 rounded-lg border border-glass-border cursor-pointer">
          <summary class="flex items-center justify-between font-semibold text-white list-none">
            What is a Discord Webhook?
            <ChevronDownIcon class="chevron-icon text-gray-400" />
          </summary>
          <div class="mt-3 text-sm text-gray-300 border-t border-glass-border pt-3">
            A webhook is a simple way to post messages from other applications into a Discord channel. Think of it as a dedicated, secure URL that another service (like Vexel!) can send a message to, and it will appear in your chosen channel.
          </div>
        </details>

        <details class="bg-discord-dark-2 p-4 rounded-lg border border-glass-border cursor-pointer">
          <summary class="flex items-center justify-between font-semibold text-white list-none">
            How do I use Markdown in the description?
            <ChevronDownIcon class="chevron-icon text-gray-400" />
          </summary>
          <div class="mt-3 text-sm text-gray-300 border-t border-glass-border pt-3 space-y-2">
            <p>You can use standard Markdown to format text:</p>
            <ul class="list-disc list-inside space-y-1">
              <li><code class="bg-discord-dark px-1 rounded-sm">*Italic*</code> or <code class="bg-discord-dark px-1 rounded-sm">_Italic_</code> for *Italic* text.</li>
              <li><code class="bg-discord-dark px-1 rounded-sm">**Bold**</code> for **Bold** text.</li>
              <li><code class="bg-discord-dark px-1 rounded-sm">***Bold Italic***</code> for ***Bold Italic*** text.</li>
              <li><code class="bg-discord-dark px-1 rounded-sm">[Link Text](https://url.com)</code> for hyperlinks.</li>
            </ul>
          </div>
        </details>

        <details class="bg-discord-dark-2 p-4 rounded-lg border border-glass-border cursor-pointer">
          <summary class="flex items-center justify-between font-semibold text-white list-none">
            Where can I report a bug or suggest a feature?
            <ChevronDownIcon class="chevron-icon text-gray-400" />
          </summary>
          <div class="mt-3 text-sm text-gray-300 border-t border-glass-border pt-3">
            Vexel is an open-source project. The best place to report issues or suggest new ideas is on our <a href="#" class="text-discord-blurple hover:underline">GitHub Issues Page</a>. We appreciate all feedback!
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from './icons';
</script>