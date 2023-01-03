<template>
  <div class="dropdown__item">
    <p>{{ $t('common["dark-theme"]') }}</p>
    <vue-switch
      :checked="$store.state.theme === 'dark'"
      @change="handleSwitcher"
    />
  </div>
</template>

<script lang="ts" src="./ThemeSelector.ts" />
