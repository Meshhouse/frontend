<template>
  <div class="navbar-buttons">
    <v-button
      color="secondary"
      icon
      size="lg"
      :title="$t('navigation.favorites')"
      :href="localePath('/account/favorites')"
    >
      <font-awesome-icon icon="heart" />
      <div
        v-if="favoritesCount > 0"
        class="badge badge--primary"
      >
        {{ favoritesString }}
      </div>
    </v-button>
    <user-box
      :title="$t('navigation.user')"
      @open-login="$emit('open-login')"
      @open-register="$emit('open-register')"
    />
  </div>
</template>

<script lang="ts" src="./NavbarButtons.ts" />

<style lang="sass">
@import 'NavbarButtons'
</style>
