<template>
  <modal-basic
    class="header-mobile"
    size="full-page"
    contentless
    @close="$emit('close')"
  >
    <template slot="header">
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
    </template>
    <div class="header-mobile__wrapper">
      <div class="header-mobile__search">
        <search-box />
      </div>
      <div class="header-mobile__catalog-button">
        <v-button
          color="primary"
          :title="$t('navigation.modelsCatalog')"
          @click="$emit('redirect', 'HeaderMobileCategories')"
        >
          <span>{{ $t('navigation.modelsCatalog') }}</span>
          <font-awesome-icon icon="bars" style="min-width: 0.875rem; flex: 0 0 0.875rem" />
        </v-button>
      </div>
      <div class="header-mobile__user user-box">
        <user-box-content
          compact
          @open-login="$emit('redirect', 'AuthLogin')"
          @open-register="$emit('redirect', 'AuthRegister')"
        />
      </div>
      <div class="header-mobile__footer">
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
        <div class="nav-item">
          <nuxt-link class="nav-link" :to="localePath('/licensing-policy')">
            {{ $t('navigation.licensing') }}
          </nuxt-link>
        </div>
        <div class="nav-item">
          <nuxt-link class="nav-link" :to="localePath('/api-docs')">
            API
          </nuxt-link>
        </div>
        <div class="nav-item">
          <nuxt-link class="nav-link" :to="localePath('/terms-of-service')">
            {{ $t('navigation.tos') }}
          </nuxt-link>
        </div>
        <div class="nav-item">
          <nuxt-link class="nav-link" :to="localePath('/dmca-policy')">
            {{ $t('navigation.dmca') }}
          </nuxt-link>
        </div>
        <div class="nav-item">
          <nuxt-link class="nav-link" :to="localePath('/privacy-policy')">
            {{ $t('navigation.privacyPolicy') }}
          </nuxt-link>
        </div>
      </div>
      <div class="header-mobile__settings">
        <language-selector />
        <theme-selector />
      </div>
      <div class="header-mobile__socials">
        <div class="nav-item">
          <a class="nav-link" href="https://github.com/meshhouse" target="_blank" rel="noreferrer">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
        </div>
        <div class="nav-item">
          <a class="nav-link" href="https://boosty.to/meshhouse" target="_blank" rel="noreferrer">
            <svg class="svg-inline--fa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.6 292.2" xml:space="preserve"><path d="M44.3 164.5 76.9 51.6H127l-10.1 35-.3.6L90 179.6h24.8l-24.3 60.9c-45.8-.5-58.6-33.3-47.4-72.1m47.6 72.2 60.4-86.9h-25.6L147.8 98c38.2 4 56.2 34.1 45.6 70.5-11.3 39.1-57.1 72.1-101.7 72.1h-1z" fill="#000"/></svg>
          </a>
        </div>
      </div>
    </div>
  </modal-basic>
</template>

<script lang="ts" src="./HeaderMobile.ts" />

<style lang="sass">
@import './HeaderMobile'
</style>
