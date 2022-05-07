<template>
  <div class="navbar-buttons">
    <!--<v-button
      color="secondary"
      icon
      size="lg"
      :title="$t('favorites')"
      :href="localePath('/favorites')"
    >
      <font-awesome-icon icon="heart" />
      <span
        v-if="favoritesCount > 0"
        class="badge badge--primary"
      >
        {{ favoritesString }}
      </span>
    </v-button>-->
    <user-box
      :title="$t('user')"
      @open-login="$emit('open-login')"
      @open-register="$emit('open-register')"
    />
  </div>
</template>

<i18n>
{
  "en": {
    "favorites": "Favorites",
    "user": "User settings"
  },
  "ru": {
    "favorites": "Список желаемого",
    "user": "Настройки пользователя"
  }
}
</i18n>

<script lang="ts" src="./NavbarButtons.ts" />

<style lang="sass">
@import 'NavbarButtons'
</style>
