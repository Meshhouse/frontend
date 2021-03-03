<template>
  <div className="theme-selector">
    <font-awesome-icon icon="sun" />
    <vue-switch
      :checked="$store.state.theme === 'dark'"
      @change="handleSwitcher"
    />
    <font-awesome-icon icon="moon" />
  </div>
</template>

<script lang="ts" src="./ThemeSelector.ts" />
