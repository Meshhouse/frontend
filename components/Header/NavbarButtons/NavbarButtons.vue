<template>
  <div class="navbar-buttons">
    <nuxt-link
      class="button button--secondary button--icon button--icon-lg"
      :to="localePath('/favorites')"
    >
      <font-awesome-icon icon="heart" />
      <span
        v-if="favoritesCount > 0"
        class="badge badge--primary"
      >
        {{ favoritesString }}
      </span>
    </nuxt-link>
  </div>
</template>

<script lang="ts" src="./NavbarButtons.ts" />

<style lang="sass">
@import 'NavbarButtons'
</style>
