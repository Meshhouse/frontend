<template>
  <button
    v-if="!href"
    class="button"
    :class="buttonClass"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </button>
  <nuxt-link
    v-else
    class="button"
    :to="href"
    :class="buttonClass"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </nuxt-link>
</template>

<script lang="ts" src="./Button.ts" />

<style lang="sass">
@import 'Button'
</style>
