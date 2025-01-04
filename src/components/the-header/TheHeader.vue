<script setup lang="ts">
import { ToggleThemeButton } from '../toggle-theme-button'
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border">
    <div class="flex h-16 px-12 max-w-screen-2xl mx-auto items-center justify-between">
      <span class="flex items-center gap-2"
        ><Icon icon="ph:lightbulb-filament" width="24" height="24" />
        <h1 class="font-bold text-lg">StashSpot</h1></span
      >
      <ToggleThemeButton />
    </div>
  </header>
</template>
