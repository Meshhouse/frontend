<template>
  <div
    v-on-clickaway="away"
    class="dropdown"
    @click="toggle"
  >
    <button class="button button--primary button--dropdown">
      <slot name="default" />
    </button>
    <div
      class="dropdown__container"
      :class="toggled ? 'dropdown__container--active' : ''"
      tabindex="0"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" src="./DropdownButton.ts" />

<style lang="sass">
@import 'DropdownButton'
</style>
