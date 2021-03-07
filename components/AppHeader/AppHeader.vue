<template>
  <header class="header">
    <div class="header__top-block">
      <nav class="top-block__container">
        <div class="nav-item">
          <nuxt-link class="nav-link" :to="localePath('/how-to-use-models')">
            {{ $t('navigation.howto') }}
          </nuxt-link>
        </div>
        <div class="navbar__links">
          <div class="nav-item">
            <language-selector />
          </div>
          <div class="nav-item">
            <theme-selector />
          </div>
        </div>
      </nav>
    </div>
    <div class="header__navbar">
      <nav class="navbar__container">
        <nuxt-link class="navbar__brand" :to="localePath('/')">
          <img
            class="brand__image"
            src="/icons/logo-full.svg"
            alt="Meshhouse"
          >
        </nuxt-link>
        <header-categories />
        <search-box />
        <div class="navbar__links">
          <div class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('/news')">
              {{ $t('navigation.news') }}
            </nuxt-link>
          </div>
          <div class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('/application')">
              {{ $t('navigation.application') }}
            </nuxt-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" src="./AppHeader.ts" />

<style lang="sass">
@import './AppHeader'
</style>
