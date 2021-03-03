<template>
  <label class="switch switch--small">
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change')"
    >
    <span class="slider" />
  </label>
</template>

<script lang="ts" src="./Switch.ts" />

<style lang="sass">
@import 'Switch'
</style>
