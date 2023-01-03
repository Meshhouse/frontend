<template>
  <footer class="top-supporters">
    <div class="top-supporters__container">
      <h3 class="display-text display-text--h3">
        <span>{{ $t('footer["top-supporters"].title') }}</span>
      </h3>
      <div class="top-supporters__wrapper">
        <a
          v-for="supporter in supporters"
          :key="supporter.title"
          class="top-supporter"
          :href="supporter.url"
          rel="nofollow"
          :title="supporter.title"
        >
          <img
            class="top-supporter__image"
            :src="supporter.logo"
            :alt="supporter.title"
            :title="supporter.title"
          >
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./FooterTopSupporters.ts" />

<style lang="sass">
@import 'FooterTopSupporters'
</style>
