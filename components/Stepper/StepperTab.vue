<template>
  <div
    v-if="active"
    class="stepper__tab"
  >
    <slot />
  </div>
</template>

<script lang="ts" src="./StepperTab.ts">
