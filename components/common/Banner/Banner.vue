<template>
  <a
    v-if="type === 'static'"
    :href="href"
    class="banner"
    :class="`banner--${size}`"
    target="_blank"
    :aria-label="alt"
  >
    <img
      :src="imageContent"
      :alt="alt"
    >
  </a>
  <div
    v-else
    class="banner banner--interactive"
    :class="`banner--${size}`"
    v-html="scriptContent"
  />
</template>

<script lang="ts" src="./Banner.ts" />

<style lang="sass">
@import 'Banner'
</style>
