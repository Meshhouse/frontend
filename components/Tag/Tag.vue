<template>
  <div
    class="tag"
    @click="onClick"
  >
    {{ tag[`title_${$i18n.locale}`] }}
  </div>
</template>

<script lang="ts" src="./Tag.ts" />

<style lang="sass">
@import 'Tag'
</style>
