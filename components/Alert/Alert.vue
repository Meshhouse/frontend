<template>
  <div class="alert" :class="`alert--${type}`">
    <div class="alert__icon">
      <font-awesome-icon :icon="fontAwesomeIcon" />
    </div>
    <div class="alert__content">
      <b
        v-if="title !== '' && title !== null"
        class="alert__title"
      >
        {{ title }}
      </b>
      <p class="alert__text">
        <slot />
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./Alert.ts" />

<style lang="sass">
@import 'Alert'
</style>
