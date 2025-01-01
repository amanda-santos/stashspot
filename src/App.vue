<script setup lang="ts">
import { TheHeader } from '@/components/the-header'
import { ResourceCard } from '@/components/resource-card'
import { reactive } from 'vue'

const resources = reactive([
  {
    id: 1,
    title: 'Vue Mastery',
    description: 'The ultimate learning resource for Vue developers.',
    url: 'https://www.vuemastery.com/',
  },
  {
    id: 2,
    title: 'Vue.js',
    description: 'The official documentation for Vue.js.',
    url: 'https://v3.vuejs.org/',
  },
  {
    id: 3,
    title: 'Vite',
    description:
      'A build tool that aims to provide a faster and leaner development experience for modern web projects.',
    url: 'https://vitejs.dev/',
  },
  {
    id: 4,
    title: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapidly building custom designs.',
    url: 'https://tailwindcss.com/',
  },
])
</script>

<template>
  <TheHeader />

  <main class="max-w-screen-2xl p-12">
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ResourceCard
        v-for="resource in resources"
        :key="resource.id"
        :title="resource.title"
        :description="resource.description"
        :url="resource.url"
      />
    </section>
  </main>
</template>
