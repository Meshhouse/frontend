<template>
  <div class="stepper">
    <header class="stepper__header">
      <div
        v-for="step, idx in steps"
        :key="`step-${idx}`"
        class="step"
        :class="{ 'step--active': selectedStep >= idx }"
      >
        <div class="step__avatar">
          {{ idx + 1 }}
        </div>
        <p class="step__title">
          {{ step }}
        </p>
      </div>
    </header>
    <main class="stepper__tabs">
      <slot />
    </main>
    <footer
      v-if="steps.length > 1"
      class="stepper__footer"
    >
      <button
        class="button button--primary"
        :disabled="selectedStep === 0"
        @click="$emit('previous-step')"
      >
        Previous
      </button>
      <button
        class="button button--primary"
        :disabled="selectedStep === steps.length - 1"
        @click="$emit('next-step')"
      >
        Next
      </button>
    </footer>
  </div>
</template>

<script lang="ts" src="./Stepper.ts" />

<style lang="sass">
@import 'Stepper'
</style>
