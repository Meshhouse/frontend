<template>
  <nuxt-link
    class="tag"
    :to="localePath('/models/all?tag=' + tag[`title_${$i18n.locale}`])"
  >
    {{ tag[`title_${$i18n.locale}`] }}
  </nuxt-link>
</template>

<script lang="ts" src="./Tag.ts" />

<style lang="sass">
@import 'Tag'
</style>
