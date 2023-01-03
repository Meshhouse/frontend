<template>
  <div
    class="loading__container loading__container--slide loading__container--visible"
    :class="loaderClass"
  >
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

<script lang="ts" src="./LoaderSlider.ts" />

<style lang="sass">
@import 'Loader'
</style>
