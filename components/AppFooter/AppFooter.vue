<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="column">
        <nuxt-link
          class="brand brand--footer"
          :to="localePath('/')"
        >
          <img
            class="brand__image"
            src="/icons/logo-icon.svg"
            alt="Meshhouse"
          >
          <p class="brand__title">
            <b>esh</b>house
          </p>
        </nuxt-link>
        <p>
          &copy; {{ new Date().getFullYear() }} MeshHouse team
        </p>
      </div>
      <div class="column">
        <ul class="footer__links">
          <li>
            <nuxt-link :to="localePath('/models/all')">
              {{ $t('navigation.modelsAll') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/how-to-use-models')">
              {{ $t('navigation.howto') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/application')">
              {{ $t('navigation.application') }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="footer__links">
          <li>
            <nuxt-link :to="localePath('/terms-of-service')">
              {{ $t('navigation.tos') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/dmca-policy')">
              {{ $t('navigation.dmca') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/privacy-policy')">
              {{ $t('navigation.privacyPolicy') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('/contact-us')">
              {{ $t('navigation.contactUs') }}
            </nuxt-link>
          </li>
          <li>
            <a href="https://github.com/meshhouse" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./AppFooter.ts" />

<style lang="sass">
@import 'AppFooter'
</style>
