<template>
  <footer class="footer">
    <div
      v-if="!simple"
      class="footer-top"
    >
      <div class="footer-top__wrapper grid-container">
        <div class="footer-column">
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
        </div>
        <div class="footer-column">
          <b class="footer-column__title">{{ $t('footer.blocks.catalog') }}</b>
          <nav class="footer-column__links">
            <li>
              <nuxt-link :to="localePath('/models')">
                {{ $t('navigation.modelsAll') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/how-to-use-models')">
                {{ $t('navigation.howto') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/embed-models')">
                {{ $t('navigation.embed-models') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/licensing-policy')">
                {{ $t('navigation.licensing') }}
              </nuxt-link>
            </li>
          </nav>
        </div>
        <div class="footer-column">
          <b class="footer-column__title">{{ $t('footer.blocks.legal') }}</b>
          <nav class="footer-column__links">
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
          </nav>
        </div>
        <div class="footer-column">
          <b class="footer-column__title">{{ $t('footer.blocks.open-source') }}</b>
          <nav class="footer-column__links">
            <li>
              <nuxt-link :to="localePath('/application')">
                {{ $t('navigation.application') }}
              </nuxt-link>
            </li>
            <li>
              <a
                :href="apiDocsLink"
                target="_blank"
              >
                API
              </a>
            </li>
          </nav>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom__wrapper grid-container">
        <div class="footer-copy">
          &copy; {{ new Date().getFullYear() }} MeshHouse team
        </div>
        <div class="footer-warning">
          <div title="Can contains content for mature audience">
            <font-awesome-icon icon="1" />
            <font-awesome-icon icon="8" />
            <font-awesome-icon icon="plus" />
          </div>
          <div title="Forbidden to use content for teaching generative neural networks. Generative neural networks were not used to create content (such as Stable Diffusion)">
            <span class="fa-stack">
              <font-awesome-icon icon="microchip" class="fa-stack-1x" />
              <font-awesome-icon icon="ban" class="fa-stack-2x" />
            </span>
          </div>
        </div>
        <div class="footer-socials">
          <a
            href="https://github.com/meshhouse"
            target="_blank"
            rel="noreferrer"
            aria-label="MeshHouse Github"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <a
            href="https://boosty.to/meshhouse"
            target="_blank"
            rel="noreferrer"
            aria-label="MeshHouse Boosty"
          >
            <svg class="svg-inline--fa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.6 292.2" xml:space="preserve"><path d="M44.3 164.5 76.9 51.6H127l-10.1 35-.3.6L90 179.6h24.8l-24.3 60.9c-45.8-.5-58.6-33.3-47.4-72.1m47.6 72.2 60.4-86.9h-25.6L147.8 98c38.2 4 56.2 34.1 45.6 70.5-11.3 39.1-57.1 72.1-101.7 72.1h-1z" fill="#000" /></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./AppFooter.ts" />

<style lang="sass">
@import 'AppFooter'
</style>
