<template>
  <div class="code-input">
    <input
      v-for="(cell, idx) in length"
      :key="idx"
      :ref="`input-${idx}`"
      :value="cells[idx]"
      v-bind="$attrs"
      class="input"
      type="number"
      @input="onInput($event, idx)"
    >
  </div>
</template>

<script lang="ts" src="./CodeInput.ts" />

<style lang="sass">
@import 'CodeInput'
</style>
