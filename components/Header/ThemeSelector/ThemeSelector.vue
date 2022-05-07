<template>
  <div class="dropdown__item">
    <p>{{ $t('dark-theme') }}</p>
    <vue-switch
      :checked="$store.state.theme === 'dark'"
      @change="handleSwitcher"
    />
  </div>
</template>

<i18n>
{
  "en": {
    "dark-theme": "Dark theme"
  },
  "ru": {
    "dark-theme": "Темная тема"
  }
}
</i18n>

<script lang="ts" src="./ThemeSelector.ts" />
