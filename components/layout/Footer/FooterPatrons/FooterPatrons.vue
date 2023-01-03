<template>
  <footer class="patrons">
    <div class="patrons__container">
      <h3 class="display-text display-text--h3">
        <span>{{ $t('footer.patrons.title') }}</span>
      </h3>
      <div class="patrons__wrapper">
        <span
          v-for="(patron, idx) in patrons"
          :key="`patron-${idx}`"
          class="patron"
          :class="`patron--${patron.level}`"
        >
          {{ patron.title }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./FooterPatrons.ts" />

<style lang="sass">
@import 'FooterPatrons'
</style>
