<script setup lang="ts">
import { Icon } from '@iconify/vue'

import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { BaseButton } from '@/components/ui/base-button'

import { defineProps } from 'vue'

defineProps({
  title: String,
  description: String,
  url: String,
})
</script>

<template>
  <CardContainer>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col justify-between min-h-32 gap-4">
      <CardDescription>
        {{ description }}
      </CardDescription>
      <BaseButton
        variant="outline"
        size="default"
        class="mt-auto w-fit"
        :href="url"
        as="a"
        target="_blank"
      >
        <Icon icon="radix-icons:external-link" />
        Visit
      </BaseButton>
    </CardContent>
  </CardContainer>
</template>
