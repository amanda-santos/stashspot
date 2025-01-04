<script lang="ts" setup>
import type { LabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { BaseLabel } from '@/components/ui/base-label'
import { cn } from '@/lib/utils'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>

<template>
  <BaseLabel :class="cn(error && 'text-destructive', props.class)" :for="formItemId">
    <slot />
  </BaseLabel>
</template>
