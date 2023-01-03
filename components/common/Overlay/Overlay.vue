<template>
  <portal
    v-if="visible"
    to="overlay"
  >
    <transition name="fade" appear>
      <div class="overlay">
        <div
          v-on-clickaway="onClickAway"
          class="overlay__content"
        >
          <slot />
        </div>
      </div>
    </transition>
  </portal>
</template>

<script lang="ts" src="./Overlay.ts" />

<style lang="sass">
@import "Overlay"
</style>
