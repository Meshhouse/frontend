<template>
  <div
    v-on-clickaway="away"
    class="dropdown"
    :class="dropdownClass"
  >
    <v-button
      :class="[toggled ? 'button--dropdown-active' : '']"
      :disabled="disabled"
      :icon="iconOnly"
      :size="iconOnly ? 'lg' : 'md'"
      :color="color"
      dropdown
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
    </v-button>
    <div
      class="dropdown__container"
      :class="containerClass"
      :style="width !== null ? `min-width: ${width}px` : ''"
      @click="toggleContainer"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" src="./DropdownButton.ts" />

<style lang="sass">
@import 'DropdownButton'
</style>
