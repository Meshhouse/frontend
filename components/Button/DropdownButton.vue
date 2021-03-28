<template>
  <div
    v-on-clickaway="away"
    class="dropdown"
  >
    <button
      class="button button--primary button--dropdown"
      :class="toggled ? 'button--dropdown-active' : ''"
      @click="toggle"
    >
      <font-awesome-icon
        v-if="prependIcon !== null && prependIcon !== ''"
        class="dropdown__prepend-icon"
        :icon="prependIcon"
      />
      <slot name="default" />
      <font-awesome-icon
        v-if="appendIcon !== null && appendIcon !== ''"
        class="dropdown__append-icon"
        :icon="appendIcon"
      />
      <font-awesome-icon
        v-if="!noCaret"
        class="dropdown__caret"
        icon="caret-down"
      />
    </button>
    <div
      class="dropdown__container"
      :class="toggled ? 'dropdown__container--active' : ''"
      :style="width !== null ? `min-width: ${width}px` : ''"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" src="./DropdownButton.ts" />

<style lang="sass">
@import 'DropdownButton'
</style>
