<script setup lang="ts">
import { ref } from 'vue'

import { TabsContainer, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TheHeader } from '@/components/the-header'
import { ResourceCard } from '@/components/resource-card'
import ResourceForm from './components/resource-form/ResourceForm.vue'
import defaultResources from '../default-resources.json'
import { useLocalStorage } from '@vueuse/core'

type Resource = {
  id: string
  title: string
  description: string
  url: string
}

const resources = useLocalStorage('stashspot:resources', defaultResources)

const currentTab = ref('resources-list')

const onSubmit = (resource: Resource) => {
  resources.value.push(resource)
  currentTab.value = 'resources-list'
}

const handleTabChange = (tab: string | number) => {
  currentTab.value = String(tab)
}

const handleDeleteResource = (id: string) => {
  const index = resources.value.findIndex((resource) => resource.id === id)
  resources.value.splice(index, 1)
}
</script>

<template>
  <TheHeader />

  <main class="max-w-screen-2xl px-12 py-8 mx-auto">
    <TabsContainer
      default-value="resources-list"
      :model-value="currentTab"
      @update:model-value="handleTabChange"
    >
      <TabsList>
        <TabsTrigger value="resources-list">Resources</TabsTrigger>
        <TabsTrigger value="create-resource">Create a new resource</TabsTrigger>
      </TabsList>
      <TabsContent value="resources-list">
        <section class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ResourceCard
            v-for="resource in resources"
            :key="resource.id"
            :id="resource.id"
            :title="resource.title"
            :description="resource.description"
            :url="resource.url"
            @delete="handleDeleteResource(resource.id)"
          />
        </section>
      </TabsContent>
      <TabsContent value="create-resource">
        <ResourceForm @create-resource="onSubmit" />
      </TabsContent>
    </TabsContainer>
  </main>
</template>
