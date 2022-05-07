<template>
  <nuxt-link
    class="tag"
    :to="localePath('/models/all?tag=' + tag)"
  >
    {{ tag }}
  </nuxt-link>
</template>

<script lang="ts" src="./Tag.ts" />

<style lang="sass">
@import 'Tag'
</style>
