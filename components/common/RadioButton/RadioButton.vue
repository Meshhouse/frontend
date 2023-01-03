<template>
  <label class="radio">
    <input
      class="radio__input"
      type="radio"
      :value="value"
      :checked="isCheckedValue"
      :disabled="disabled"
      @change="$emit('change', $event.target.value)"
    >
    <span class="radio__block" />
    <span class="radio__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts" src="./RadioButton.ts" />

<style lang="sass">
@import "RadioButton"
</style>
