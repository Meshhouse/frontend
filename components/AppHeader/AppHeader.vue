<template>
  <header class="header">
    <div class="header__top-block">
      <nav class="top-block__container">
        <div class="navbar__info">
          <div class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('/how-to-use-models')">
              {{ $t('navigation.howto') }}
            </nuxt-link>
          </div>
          <div class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('/embed-models')">
              {{ $t('navigation.embed-models') }}
            </nuxt-link>
          </div>
        </div>
      </nav>
    </div>
    <div class="header__navbar">
      <nav class="navbar__container">
        <nuxt-link class="brand brand--navbar" :to="localePath('/')">
          <img
            class="brand__image"
            src="/icons/logo-icon.svg"
            alt="Meshhouse"
          >
          <p class="brand__title">
            <b>esh</b>house
          </p>
        </nuxt-link>
        <header-categories />
        <search-box />
        <navbar-buttons
          @open-login="openLogin"
          @open-register="openRegister"
        />
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
    <overlay
      :visible="overlayVisible"
      @close="overlayVisible = false"
    >
      <component
        :is="overlayComponent"
        @redirect="onChangeOverlay"
        @close="overlayVisible = false"
      />
    </overlay>
  </header>
</template>

<script lang="ts" src="./AppHeader.ts" />

<style lang="sass">
@import './AppHeader'
</style>
