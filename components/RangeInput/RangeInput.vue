<template>
  <div class="range-input">
    <div class="range-input__input">
      <client-only>
        <vue-slider
          v-model="modelValue"
          :min="ranges.min"
          :max="ranges.max"
          tooltip="none"
        />
      </client-only>
    </div>
    <div class="range-input__controls">
      <div class="range-input__block">
        <label for="from">From</label>
        <input
          id="from"
          v-model="value[0]"
          class="input"
          type="number"
          :min="ranges.min"
          :max="ranges.max"
          required
        >
      </div>
      <div class="range-input__block">
        <label for="to">To</label>
        <input
          id="to"
          v-model="value[1]"
          class="input"
          type="number"
          :min="ranges.min"
          :max="ranges.max"
          required
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./RangeInput.ts" />

<style lang="sass">
@import 'RangeInput'
</style>
