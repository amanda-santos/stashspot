<script setup lang="ts">
import { Icon } from '@iconify/vue'

import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { BaseButton } from '@/components/ui/base-button'

import { defineProps } from 'vue'

defineProps({
  id: String,
  title: String,
  description: String,
  url: String,
})

defineEmits(['delete'])
</script>

<template>
  <CardContainer>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col justify-between gap-4 h-16">
      <CardDescription class="line-clamp-2">
        {{ description }}
      </CardDescription>
    </CardContent>
    <CardFooter class="flex gap-2">
      <BaseButton variant="outline" size="default" :href="url" as="a" target="_blank">
        <Icon icon="radix-icons:external-link" />
        Visit
      </BaseButton>
      <BaseButton variant="destructive" size="icon" @click="$emit('delete')">
        <Icon icon="tabler:trash" />
      </BaseButton>
    </CardFooter>
  </CardContainer>
</template>
