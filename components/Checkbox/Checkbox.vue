<template>
  <label class="checkbox">
    <input
      class="checkbox__input"
      type="checkbox"
      :value="value"
      :checked="isCheckedValue"
      @change="handleChange"
    >
    <span class="checkbox__block">
      <font-awesome-icon icon="check" />
    </span>
    <span class="checkbox__label">
      <slot />
    </span>
    <span
      v-if="color !== ''"
      :style="`--sign-color: #${color}`"
      class="checkbox__color-sign"
    />
  </label>
</template>

<script lang="ts" src="./Checkbox.ts" />

<style lang="sass">
@import 'Checkbox'
</style>
