<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { BaseButton } from '@/components/ui/base-button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { BaseInput } from '@/components/ui/base-input'
import { BaseTextArea } from '@/components/ui/base-text-area'
import { useForm } from 'vee-validate'

const emit = defineEmits(['create-resource'])

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string()
      .min(3, {
        message: 'Please, provide a title with at least 3 characters.',
      })
      .max(50, {
        message: 'Please, provide a title with at most 50 characters.',
      }),
    description: z
      .string()
      .min(10, {
        message: 'Please, provide a description with at least 10 characters.',
      })
      .max(200, {
        message: 'Please, provide a description with at most 200 characters.',
      }),
    url: z
      .string()
      .url({
        message: 'Please, provide a valid URL.',
      })
      .min(3, {
        message: 'Please, provide a valid URL.',
      })
      .max(200, {
        message: 'Please, provide a URL with at most 200 characters.',
      }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  const newResource = {
    id: new Date().getTime().toString(),
    ...values,
  }

  emit('create-resource', newResource)

  form.resetForm()
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 mt-8 max-w-lg">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <BaseInput type="text" placeholder="Vue.js Documentation" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <BaseTextArea
            placeholder="This is the official documentation of Vue.js."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="url">
      <FormItem>
        <FormLabel>URL</FormLabel>
        <FormControl>
          <BaseInput type="url" placeholder="https://vuejs.org/" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <BaseButton type="submit" class="w-fit mt-4">Create</BaseButton>
  </form>
</template>
