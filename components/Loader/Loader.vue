<template>
  <div class="loading__container" :class="loading || !init ? 'loading__container--visible' : ''">
    <div class="spinner-wrapper">
      <div class="spinner-logo">
        <img
          src="/icons/logo-icon.svg"
          alt="MeshHouse"
        >
      </div>
      <div class="spinner" />
    </div>
  </div>
</template>

<script lang="ts" src="./Loader.ts" />

<style lang="sass">
@import 'Loader'
</style>
